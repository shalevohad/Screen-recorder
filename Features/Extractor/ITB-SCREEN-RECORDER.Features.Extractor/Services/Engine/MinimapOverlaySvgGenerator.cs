using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using ITB_SCREEN_RECORDER.Core.Contracts.Topology;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services.Engine
{
    /// <summary>
    /// Implements Rule 13 Persistent Tactical Minimap HUD Overlay SVG Generator.
    /// Produces frame-accurate vector HUD graphics for burning into exported videos.
    /// </summary>
    public class MinimapOverlaySvgGenerator : IMinimapOverlaySvgGenerator
    {
        public string GenerateMinimapSvg(
            StationDisplayTopologyDto topology, 
            string activeDisplayId, 
            int canvasWidth = 180, 
            int canvasHeight = 90)
        {
            var displays = topology?.Displays ?? new List<DisplayMetadataDto>();
            if (displays.Count == 0)
            {
                return string.Empty;
            }

            int minX = int.MaxValue, minY = int.MaxValue, maxX = int.MinValue, maxY = int.MinValue;
            foreach (var d in displays)
            {
                minX = Math.Min(minX, d.X);
                minY = Math.Min(minY, d.Y);
                maxX = Math.Max(maxX, d.X + d.Width);
                maxY = Math.Max(maxY, d.Y + d.Height);
            }

            double totalW = Math.Max(1, maxX - minX);
            double totalH = Math.Max(1, maxY - minY);

            // Compute inner box area padding
            double pad = 12.0;
            double availW = canvasWidth - (pad * 2);
            double availH = canvasHeight - (pad * 2) - 16.0; // 16px header area

            double scale = Math.Min(availW / totalW, availH / totalH);
            double offsetX = pad + (availW - (totalW * scale)) / 2.0;
            double offsetY = pad + 16.0 + (availH - (totalH * scale)) / 2.0;

            var sb = new StringBuilder();
            sb.Append($"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"{canvasWidth}\" height=\"{canvasHeight}\" viewBox=\"0 0 {canvasWidth} {canvasHeight}\">");

            // Tactical HUD Dark-Glass Container
            sb.Append($"<rect x=\"1\" y=\"1\" width=\"{canvasWidth - 2}\" height=\"{canvasHeight - 2}\" rx=\"8\" fill=\"#0F172A\" fill-opacity=\"0.75\" stroke=\"#38BDF8\" stroke-width=\"1.5\" stroke-opacity=\"0.4\" />");

            // Header Badge
            string activeUpper = (activeDisplayId ?? "mon-0").ToUpperInvariant();
            sb.Append($"<circle cx=\"16\" cy=\"14\" r=\"3.5\" fill=\"#22D3EE\" />");
            sb.Append($"<text x=\"26\" y=\"17\" font-family=\"monospace\" font-size=\"9\" font-weight=\"bold\" fill=\"#22D3EE\" letter-spacing=\"0.05em\">HUD: {activeUpper}</text>");

            // Render each display box
            for (int i = 0; i < displays.Count; i++)
            {
                var d = displays[i];
                double x = offsetX + ((d.X - minX) * scale);
                double y = offsetY + ((d.Y - minY) * scale);
                double w = Math.Max(6, d.Width * scale);
                double h = Math.Max(6, d.Height * scale);

                bool isActive = string.Equals(d.DisplayId, activeDisplayId, StringComparison.OrdinalIgnoreCase);

                string strokeColor = isActive ? "#06B6D4" : "#475569";
                double strokeWidth = isActive ? 2.5 : 1.2;
                string fillColor = isActive ? "#06B6D4" : "#1E293B";
                double fillOpacity = isActive ? 0.35 : 0.65;
                string textColor = isActive ? "#FFFFFF" : "#94A3B8";

                sb.Append($"<rect x=\"{x.ToString("F1", CultureInfo.InvariantCulture)}\" y=\"{y.ToString("F1", CultureInfo.InvariantCulture)}\" width=\"{(w - 2).ToString("F1", CultureInfo.InvariantCulture)}\" height=\"{(h - 2).ToString("F1", CultureInfo.InvariantCulture)}\" rx=\"3\" fill=\"{fillColor}\" fill-opacity=\"{fillOpacity.ToString("F2", CultureInfo.InvariantCulture)}\" stroke=\"{strokeColor}\" stroke-width=\"{strokeWidth.ToString("F1", CultureInfo.InvariantCulture)}\" />");

                double textX = x + (w / 2.0);
                double textY = y + (h / 2.0) + 3.0;
                sb.Append($"<text x=\"{textX.ToString("F1", CultureInfo.InvariantCulture)}\" y=\"{textY.ToString("F1", CultureInfo.InvariantCulture)}\" text-anchor=\"middle\" font-family=\"monospace\" font-size=\"10\" font-weight=\"bold\" fill=\"{textColor}\">{i + 1}</text>");
            }

            sb.Append("</svg>");
            return sb.ToString();
        }
    }
}
