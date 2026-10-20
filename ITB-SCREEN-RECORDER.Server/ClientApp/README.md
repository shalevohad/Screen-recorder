# 🎛️ ITB Recording Center — Tactical C2 Web Dashboard

The frontend command-and-control (C2 / NOC) web interface for the **ITB-SCREEN-RECORDER** platform. Built with **React 18**, **Vite**, and **SASS**, it provides real-time fleet surveillance, sub-second WebRTC video streaming, live telemetry diagnostics, and forensic DVR timeline playback for 70–100+ endpoints.

---

## 🚀 Key Features

- **Fleet Surveillance Grid**: Real-time grid of all managed workstations with live status indicators, active windows, CPU/GPU loads, and audio meters.
- **Sub-Second WebRTC WHEP Player**: Glass-to-glass latency under 500ms using WebRTC HTTP Egress Protocol (WHEP) via MediaMTX, with transparent fallback to Low-Latency HLS (`hls.js`).
- **Tactical "Living UI" Experience**: Built to NOC/C2 operational standards with ambient radar pulses, micro-telemetry bars, fluid transitions, and dark glassmorphic styling (defined in [`ui_ux_design_specification.md`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/ClientApp/src/Agents/ui_ux_design_specification.md)).
- **Forensic DVR Timeline Scrubbing**: Real-time time scrubbing across recording chunks, allowing operators to jump backward into recent hot chunks (5–15 min ago) while live recording continues uninterrupted.
- **Keystroke Intelligence Panel**: Real-time and historical keystroke log inspection synchronized with video playback.
- **Station Management & Custom Tabs**: Flexible categorization of stations into mission-specific multi-station tabs and override configurations.

---

## 🎨 Design System & Color Palette

The interface adheres strictly to the design token hierarchy in `src/styles/`:

| Token | Value | Usage |
| :--- | :--- | :--- |
| `--bg-app` | `#070A10` | Deepest canvas background |
| `--surface-panel` | `#0F172A` | Primary container and docking area |
| `--surface-card` | `#151E2E` | Station telemetry cards and widgets |
| `--accent-cyan` | `#06B6D4` | Primary brand accent, selected tabs, focus outlines |
| `--accent-emerald` | `#10B981` | Active recording, live streaming, healthy node status |
| `--accent-rose` | `#F43F5E` | Disconnected nodes, recording drops, critical alerts |
| `--accent-amber` | `#F59E0B` | Standby states, warning thresholds, high disk load |

---

## 📁 Source Code Structure

```text
ClientApp/src/
├── Agents/               # Technical UX/UI design specifications
├── adapters/             # REST API, SignalR hub, and WebRTC WHEP connection adapters
├── assets/               # SVGs, icons, and static assets
├── components/
│   ├── Auth/             # AD / Local login modal and auth guard
│   ├── Dashboard/        # Fleet summary widgets, global health bar
│   ├── Fleet/            # Multi-station grid, search, and filter toolbars
│   ├── Keystroke/        # Synchronized keystroke subtitle display
│   ├── Layout/           # Sticky tactical header, sidebar navigation, status bar
│   ├── Player/           # WebRTCPlayer.jsx (WHEP + HLS.js dual-engine player)
│   ├── Plugins/          # Dynamic plugin containers (Extractor, ExtractorAdvanced)
│   ├── Settings/         # Server configuration, retention rules, encoder overrides
│   ├── Station/          # StationCard, FullscreenModal, AudioLevelMeter
│   ├── Telemetry/        # Resource charts, CPU/Memory gauges, live telemetry bars
│   └── UI/               # Reusable buttons, badges, modals, sliders, and tooltips
├── context/              # FleetStateContext, TelemetryContext, AuthContext
├── styles/               # SCSS variables, animations, and mixins
├── App.jsx               # Root application coordinator and view routing
├── main.jsx              # React DOM entry point
└── index.scss            # Base reset, typography, and CSS token declarations
```

---

## 💻 Development & Build Scripts

### Prerequisites
- Node.js 18.x or later
- npm 9.x or later

### Install Dependencies
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```
Starts the Vite dev server (typically on `http://localhost:5173`). API requests are proxied to the backend .NET Server via `vite.config.js`.

### Production Build
```bash
npm run build
```
Generates optimized, minified production assets into `ITB-SCREEN-RECORDER.Server/wwwroot`, ready to be served directly by the ASP.NET Core host.

### Linting
```bash
npm run lint
```
Runs ESLint against all `.jsx` and `.js` source files.
