using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Moq;
using Swashbuckle.AspNetCore.Swagger;
using Xunit;
using ITB_SCREEN_RECORDER.Features.Extractor.Controllers;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Controllers;

namespace ITB_SCREEN_RECORDER.Tests.Routing;

public class ApiRouteAndSwaggerIntegrityTests
{
    private IServiceProvider CreateTestServiceProvider(bool resolveConflicts = false)
    {
        var services = new ServiceCollection();
        services.AddLogging();

        var envMock = new Mock<IWebHostEnvironment>();
        envMock.Setup(e => e.ApplicationName).Returns("ITB-SCREEN-RECORDER.Server");
        services.AddSingleton(envMock.Object);

        services.AddMvcCore()
            .AddApiExplorer()
            .AddApplicationPart(typeof(ITB_SCREEN_RECORDER.Server.Program).Assembly)
            .AddApplicationPart(typeof(ExtractorController).Assembly)
            .AddApplicationPart(typeof(ExtractorAdvancedController).Assembly);

        services.AddSwaggerGen(options =>
        {
            options.CustomSchemaIds(type => type.FullName ?? type.Name);
            if (resolveConflicts)
            {
                options.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
            }
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "ITB Screen Recorder API",
                Version = "v1"
            });
        });

        return services.BuildServiceProvider();
    }

    [Fact]
    public void Swagger_Generator_BuildsDocumentSuccessfully_WithConflictResolver()
    {
        var sp = CreateTestServiceProvider(resolveConflicts: true);
        var swaggerProvider = sp.GetRequiredService<ISwaggerProvider>();

        // Must succeed without throwing Swashbuckle Conflicting method/path exception
        var doc = swaggerProvider.GetSwagger("v1");

        Assert.NotNull(doc);
        Assert.NotNull(doc.Paths);

        // Verify key endpoints exist
        Assert.True(doc.Paths.ContainsKey("/api/v1/extractor/export"), "Missing /api/v1/extractor/export in Swagger paths");
        Assert.True(doc.Paths.ContainsKey("/api/v1/extractor-advanced/cut"), "Missing /api/v1/extractor-advanced/cut in Swagger paths");
    }

    [Fact]
    public void Swagger_Generator_StrictRouteDesign_HasZeroConflictingActionsEvenWithoutResolver()
    {
        // Configure Swagger WITHOUT ResolveConflictingActions to strictly enforce zero route collisions across all controllers
        var sp = CreateTestServiceProvider(resolveConflicts: false);
        var swaggerProvider = sp.GetRequiredService<ISwaggerProvider>();

        // If any two actions in Server or Feature modules share the same HTTP method and route,
        // Swashbuckle will throw InvalidOperationException here.
        var doc = swaggerProvider.GetSwagger("v1");

        Assert.NotNull(doc);
        Assert.NotNull(doc.Paths);
    }

    [Fact]
    public void ApiExplorer_DetectsZeroConflictingMethodAndPathCombinationsAcrossAllControllers()
    {
        var sp = CreateTestServiceProvider(resolveConflicts: false);
        var apiExplorer = sp.GetRequiredService<IApiDescriptionGroupCollectionProvider>();

        var allEndpoints = apiExplorer.ApiDescriptionGroups.Items
            .SelectMany(g => g.Items)
            .ToList();

        // Group by (HttpMethod, RelativePath)
        var collisions = allEndpoints
            .GroupBy(e => (Method: e.HttpMethod?.ToUpperInvariant() ?? "GET", Path: (e.RelativePath ?? "").Trim('/').ToLowerInvariant()))
            .Where(g => g.Count() > 1)
            .Select(g => new
            {
                Key = g.Key,
                Actions = g.Select(x => x.ActionDescriptor.DisplayName).ToList()
            })
            .ToList();

        if (collisions.Count > 0)
        {
            string errorDetails = string.Join("; ", collisions.Select(c =>
                $"{c.Key.Method} {c.Key.Path} => [{string.Join(", ", c.Actions)}]"));

            Assert.Fail($"Detected conflicting API endpoints across controllers: {errorDetails}");
        }
    }
}
