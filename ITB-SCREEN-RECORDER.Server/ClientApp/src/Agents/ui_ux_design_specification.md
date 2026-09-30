# 🎛️ Design Specification: ITB Recording Center — Main Dashboard Refactor

## 1. Executive Summary & Objective

This specification details the comprehensive UI/UX overhaul of the **ITB Recording Center** primary dashboard. The objective is to elevate the system from a static, rigid "dark-box" telemetry screen into a **vibrant, high-end tactical command interface (C2/NOC)**.

Key transformations:
* **Injecting Operational Vitality ("Living UI"):** Ambient radar pulses, active telemetry micro-bars, fluid transitions, and responsive empty states.
* **Modern Look & Feel:** Consistent $8\text{px} - 16\text{px}$ rounded corner radii, soft surface elevation layers, subtle glassmorphism backdrops, and removal of harsh neon outlines.
* **Streamlined Telemetry & Navigation:** Integrated header cards with unified progress indicators, seamless tab-to-canvas connections, and an intuitive docking system.

---

## 2. Color Palette & Design Tokens System

```css
:root {
  /* Surface Elevation Hierarchy */
  --bg-app:                #070A10; /* Deepest canvas background */
  --surface-header:        #0D131F; /* Sticky Top command header */
  --surface-panel:         #0F172A; /* Main dashboard work area / pane */
  --surface-card:          #151E2E; /* Individual telemetry tiles & widgets */
  --surface-card-hover:    #1B273D; /* Interactive element hover state */
  --surface-glass:         rgba(15, 23, 42, 0.72); /* Floating docks & toolbars */

  /* Borders & Separation (Subtle, non-distracting) */
  --border-subtle:         rgba(148, 163, 184, 0.12); /* Default boundaries */
  --border-card:           rgba(148, 163, 184, 0.20); /* Cards and inner wells */
  --border-active-cyan:    rgba(6, 182, 212, 0.45);   /* Focus & active tabs */
  --border-active-emerald: rgba(16, 185, 129, 0.50);  /* Health highlight */

  /* Semantic Accents (Vibrant yet Soft) */
  --accent-cyan:           #06B6D4; /* Primary action / selection */
  --accent-cyan-light:     #38BDF8; /* Cyan hover / links */
  --accent-cyan-glow:      rgba(6, 182, 212, 0.25);

  --accent-emerald:        #10B981; /* Live streaming, healthy nodes, nominal clock */
  --accent-emerald-glow:   rgba(16, 185, 129, 0.25);

  --accent-rose:           #F43F5E; /* Critical drops, faults, stop action */
  --accent-rose-glow:      rgba(244, 63, 94, 0.30);

  --accent-amber:          #F59E0B; /* Warnings, offline standby, degradation */

  /* Typography Colors */
  --text-primary:          #F8FAFC; /* Slate-50: Main values, clocks, headers */
  --text-secondary:        #94A3B8; /* Slate-400: Subtitles, metrics labels */
  --text-muted:            #64748B; /* Slate-500: Placeholders, units (Mb, %, FPS) */

  /* Radii */
  --radius-xs:             4px;
  --radius-sm:             6px;
  --radius-md:             8px;
  --radius-lg:             12px;
  --radius-xl:             16px;
  --radius-full:           9999px;
}
```

---

## 3. Structural Components & UX Improvements

### 3.1 Top Command Header (War Room Telemetry Bar)
* **Background & Shell:** High-performance frosted backdrop (`--surface-header`, `backdrop-filter: blur(14px)`), `border-radius: var(--radius-xl)`, soft bottom separator.
* **Branding (Left):** 
  * Emblem with breathing pulse aura: an ambient green ring that pulses rhythmically ($2.4\text{s}$ interval) to confirm agent receiver daemon health.
  * Typography: `ITB` in bold Cyan, `RECORDING CENTER` in Slate-50, subtitle `LIVE AGENT OPERATIONS` in Slate-400 monospace.
* **Central Mission Clock:**
  * Displays high-contrast local time (`23:18:31`) with a soft emerald glow, flanked by UTC timestamp and dynamic system uptime badge (`UP: 0h 42m`).
* **Server Health & Load Metrics (Right Group):**
  * Replace crowded text rows with **Compact Telemetry Cards**:
    1. **Recording Agents Card:** Shows `0 / 0 LIVE` with a dynamic status pill (`NOMINAL` in green, `DEGRADED` in yellow).
    2. **CPU Load Card:** Host & Process CPU usage with a miniature horizontal fill bar ($4\text{px}$ height, `rounded-full`).
    3. **RAM Usage Card:** Visual memory gauge with total vs. used RAM.
    4. **Network Throughput Card:** TX/RX dual micro-bars reflecting real-time stream bandwidth.

---

### 3.2 Main Content Workspace (The "Canvas")
* **Background Styling:** 
  * Replace the harsh, stark grid with an ultra-subtle tactical dot-matrix pattern or deep obsidian gradient (`background: radial-gradient(circle at 50% 20%, #0F172A 0%, #070A10 100%)`).
* **Seamless Folder Tabs (Top Flank):**
  * The active tab (`ALL (0)`) must physically anchor into the main pane:
    * Active tab background matches the canvas background (`var(--surface-panel)`).
    * Active tab has no bottom border line, seamlessly "opening" into the stage.
    * Inactive tabs remain semi-transparent with muted labels.
* **The "+ New Filter Tab" Button:** Styled as a clean ghost pill button with a smooth tooltip on hover.

---

### 3.3 Dynamic "Living" Empty State (When 0 Agents Connected)
* **Problem in Current Screen:** The center is a dead static box with a single yellow dot and a negative message (`NO AGENTS CONNECTED TO THIS TAB`).
* **The Redesign Solution ("Active Radar Listener"):**
  * **Concentric Radar Sweep Animation:** An ambient circular sonar wave radiating outwards from the center beacon, visually communicating that the server is actively listening for incoming RTMP/WebRTC streams.
  * **Status Text Hierarchy:**
    * Primary: `LISTENING FOR INCOMING AGENT STREAMS` (Clean bold slate font).
    * Secondary: `Port 8889 (WebRTC) & Port 1935 (RTMP) Active • 0 Endpoints detected`.
  * **Actionable Prompt (CTA):** A rounded secondary button: `[ 📡 Open Station Pool / Import Config ]`, guiding the operator towards resolution rather than a dead end.

---

### 3.4 Left Vertical Dock (Quick Tools & Filters)
* **Dimensions & Alignment:** $48\text{px}$ wide, self-aligning to the top-left of the workspace shell, `rounded-xl` with glass effect.
* **Grouped Action Architecture:**
  * **Top Cluster (View & Filter Modes):**
    * Quick Search Shelf toggle (`Tactical Search`).
    * Filter presets (All, Streaming, Alerts, Offline).
    * View Mode Switcher (Multi-Tile Grid ⊞ vs. Dense Telemetry Table ☰).
  * **Separator:** $1\text{px}$ subtle slate line.
  * **Bottom Cluster (Fleet Operations):**
    * Global Start All Recordings (Emerald ring).
    * Global Stop All Recordings (Rose ring with double-click guard).

---

### 3.5 Floating Responsive Fleet Zoom Pill (Bottom Dock)
* **Ergonomics & Behavior:**
  * Anchored at `fixed bottom-6 left-1/2 -translate-x-1/2`.
  * **Smart Visibility:** Renders at `opacity: 0.35` in an inactive state when no stations are connected, smoothly animating to `opacity: 1` upon detecting the first agent stream.
  * Capsule styling: `rounded-full`, backdrop blur ($16\text{px}$), discrete tactile zoom steps (`1` to `5`), and an `AUTO` fit toggle.

---

## 4. UI "Liveliness" & Micro-Interactions Blueprint

| Element | Interaction / Trigger | Visual Behavior |
| :--- | :--- | :--- |
| **Server Clock** | Every 1 second tick | Subtle digit brightness pulse; second hand divider blinking smoothly. |
| **Agent Detection** | New stream connects | Slide-in animation from top with a momentary cyan highlight border. |
| **Metric Progress Bars** | Data telemetry payload | Smooth CSS transition `width 0.4s cubic-bezier(0.4, 0, 0.2, 1)`. |
| **Radar Center Beacon** | Continuous (Empty state) | Expanding ripple ring with fading opacity ($0.8 \to 0$) over $2.0\text{s}$. |
| **Left Dock Buttons** | Hover / Active | Gentle $1\text{px}$ elevation lift with a soft glow matching the button's accent tone. |

---

## 5. Acceptance Criteria for Developers & AI Agents

1. [ ] **Eliminate Harsh Outlines:** Remove all high-contrast electric-blue borders surrounding the main shell and header. Replace with `var(--border-subtle)` ($1\text{px}$).
2. [ ] **Enforce Curvature Tokens:** All cards must use `rounded-xl` ($12\text{px}$), buttons `rounded-lg` ($8\text{px}$), and status indicators `rounded-full`.
3. [ ] **Implement Telemetry Progress Bars:** Convert CPU, RAM, and NET values in the top bar from raw text numbers into clean horizontal progress bars with aligned percentage readouts.
4. [ ] **Active Sonar Empty State:** Replace the static black box with the animated radar sonar container and clear diagnostic status text.
5. [ ] **Folder Tab Continuity:** Ensure the active tab seamlessly merges into the workspace without a separating bottom border.
6. [ ] **Conditional Zoom Bar:** Ensure the bottom zoom pill dims or stays discreetly dormant when zero agents are displayed on screen.