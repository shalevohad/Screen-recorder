namespace ITB_SCREEN_RECORDER.Tests.Server.Security;

using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Server.Controllers;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using ITB_SCREEN_RECORDER.Server.Models.Security;
using ITB_SCREEN_RECORDER.Server.Services.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

public class WindowsSsoAuthenticationTests
{
    private readonly Mock<ISecurityService> _mockSecurityService;
    private readonly Mock<ICatalogRepository> _mockRepository;
    private readonly LdapAuthenticationProvider _ldapAuth;

    public WindowsSsoAuthenticationTests()
    {
        _mockSecurityService = new Mock<ISecurityService>();
        _mockRepository = new Mock<ICatalogRepository>();
        _ldapAuth = new LdapAuthenticationProvider(_mockRepository.Object);
    }

    [Fact]
    public async Task WindowsSso_WhenNoIdentityDetected_ReturnsUnauthorized()
    {
        // Arrange
        _mockRepository.Setup(r => r.GetSecurityPolicyAsync())
            .ReturnsAsync(new SecurityPolicyStateDto(AuthMode.Open, false, null, 389, null, false, 0));

        var controller = new AuthController(_mockSecurityService.Object, _mockRepository.Object, _ldapAuth);
        var httpContext = new DefaultHttpContext();
        controller.ControllerContext = new ControllerContext { HttpContext = httpContext };

        // Act
        var result = await controller.WindowsSso();

        // Assert
        var unauthorized = Assert.IsType<UnauthorizedObjectResult>(result);
        Assert.NotNull(unauthorized.Value);
    }

    [Fact]
    public async Task WindowsSso_WithRemoteUserHeader_AuthenticatesAndReturnsJwt()
    {
        // Arrange
        var policy = new SecurityPolicyStateDto(AuthMode.Open, false, null, 389, null, false, 0);
        _mockRepository.Setup(r => r.GetSecurityPolicyAsync())
            .ReturnsAsync(policy);

        var mappings = new List<LdapGroupMappingDto>
        {
            new LdapGroupMappingDto("map_1", "Domain Users", "role_operator", 0)
        };
        _mockRepository.Setup(r => r.GetAllLdapGroupMappingsAsync())
            .ReturnsAsync(mappings);

        _mockSecurityService.Setup(s => s.CalculateAllUserPermissionsAsync(
                It.IsAny<string>(),
                It.IsAny<IEnumerable<string>>(),
                It.IsAny<bool>()))
            .ReturnsAsync(new List<string> { "stations.view", "playback.view" });

        _mockSecurityService.Setup(s => s.GenerateJwtToken(
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<IEnumerable<string>>(),
                It.IsAny<IReadOnlyList<string>>(),
                It.IsAny<bool>()))
            .Returns("mock_jwt_token_sso");

        var controller = new AuthController(_mockSecurityService.Object, _mockRepository.Object, _ldapAuth);
        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers["X-Remote-User"] = @"CORP\john.doe";
        controller.ControllerContext = new ControllerContext { HttpContext = httpContext };

        // Act
        var result = await controller.WindowsSso();

        // Assert
        var ok = Assert.IsType<OkObjectResult>(result);
        dynamic val = ok.Value!;
        Assert.NotNull(val);
    }

    [Fact]
    public async Task WindowsSso_WhenUserPrincipalNameInClaims_ResolvesCleanUsername()
    {
        // Arrange
        var policy = new SecurityPolicyStateDto(AuthMode.Open, false, null, 389, null, false, 0);
        _mockRepository.Setup(r => r.GetSecurityPolicyAsync()).ReturnsAsync(policy);
        _mockRepository.Setup(r => r.GetAllLdapGroupMappingsAsync())
            .ReturnsAsync(new List<LdapGroupMappingDto>());

        _mockSecurityService.Setup(s => s.CalculateAllUserPermissionsAsync(
                It.IsAny<string>(),
                It.IsAny<IEnumerable<string>>(),
                It.IsAny<bool>()))
            .ReturnsAsync(new List<string> { "stations.view" });

        _mockSecurityService.Setup(s => s.GenerateJwtToken(
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<IEnumerable<string>>(),
                It.IsAny<IReadOnlyList<string>>(),
                It.IsAny<bool>()))
            .Returns("token_ok");

        var controller = new AuthController(_mockSecurityService.Object, _mockRepository.Object, _ldapAuth);
        var httpContext = new DefaultHttpContext();
        var claims = new[] { new Claim(ClaimTypes.Name, @"HQ\jane.smith") };
        httpContext.User = new ClaimsPrincipal(new ClaimsIdentity(claims, "Negotiate"));
        controller.ControllerContext = new ControllerContext { HttpContext = httpContext };

        // Act
        var result = await controller.WindowsSso();

        // Assert
        var ok = Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(ok.Value);
    }
}
