using ITB_SCREEN_RECORDER.Core.Contracts.Topology;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services.Engine
{
    public interface IMinimapOverlaySvgGenerator
    {
        /// <summary>
        /// Generates a vector SVG overlay representing the workstation's physical monitor topology
        /// with radiant highlight on the active display for Rule 13 HUD rendering.
        /// </summary>
        string GenerateMinimapSvg(
            StationDisplayTopologyDto topology, 
            string activeDisplayId, 
            int canvasWidth = 180, 
            int canvasHeight = 90);
    }
}
