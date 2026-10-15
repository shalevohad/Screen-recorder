namespace ITB_SCREEN_RECORDER.Server.Controllers;

using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Server.Services.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

public record UpdateRoleAliasRequest(string? RoleAlias);
public record ApplyMappingRequest(List<StationRoleMappingEntry> Mappings);
public record StationRoleMappingEntry(string Hostname, string? RoleAlias);

[ApiController]
[Route("api/v1/stations/roles")]
public class StationRolesController : ControllerBase
{
    private readonly StationRolesService _stationRolesService;

    public StationRolesController(StationRolesService stationRolesService)
    {
        _stationRolesService = stationRolesService;
    }

    [HttpGet]
    [AuthorizePermission(PermissionKeys.StationsView)]
    public async Task<IActionResult> GetAllRoles()
    {
        var mappings = await _stationRolesService.GetAllRolesAsync();
        return Ok(mappings);
    }

    [HttpPost("{hostname}")]
    [AuthorizePermission(PermissionKeys.StationsManage)]
    public async Task<IActionResult> SetRoleAlias(string hostname, [FromBody] UpdateRoleAliasRequest request)
    {
        if (string.IsNullOrWhiteSpace(hostname)) return BadRequest("Hostname is required.");

        await _stationRolesService.SetRoleAliasAsync(hostname.Trim(), request?.RoleAlias?.Trim());
        return Ok(new { Hostname = hostname, RoleAlias = request?.RoleAlias?.Trim(), Success = true });
    }

    [HttpPost("upload-mapping")]
    [AuthorizePermission(PermissionKeys.StationsManage)]
    public async Task<IActionResult> UploadMappingPreview(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("CSV file is required.");
        }

        await using var stream = file.OpenReadStream();
        var diff = await _stationRolesService.PreviewCsvMappingAsync(stream);
        return Ok(diff);
    }

    [HttpPost("apply-mapping")]
    [AuthorizePermission(PermissionKeys.StationsManage)]
    public async Task<IActionResult> ApplyMapping([FromBody] ApplyMappingRequest request)
    {
        if (request?.Mappings == null || request.Mappings.Count == 0)
        {
            return BadRequest("No mappings provided to apply.");
        }

        var list = new List<(string Hostname, string? RoleAlias)>();
        foreach (var m in request.Mappings)
        {
            if (!string.IsNullOrWhiteSpace(m.Hostname))
            {
                list.Add((m.Hostname.Trim(), string.IsNullOrWhiteSpace(m.RoleAlias) ? null : m.RoleAlias.Trim()));
            }
        }

        await _stationRolesService.ApplyMappingAsync(list);
        return Ok(new { Success = true, UpdatedCount = list.Count });
    }

    [HttpGet("export-mapping")]
    [AuthorizePermission(PermissionKeys.StationsManage)]
    public async Task<IActionResult> ExportMapping()
    {
        byte[] bytes = await _stationRolesService.ExportMappingCsvAsync();
        return File(bytes, "text/csv", $"station_roles_{DateTime.UtcNow:yyyyMMdd_HHmmss}.csv");
    }
}