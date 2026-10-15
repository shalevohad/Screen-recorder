import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def set_slide_background(slide, color):
    bg_shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
    bg_shape.fill.solid()
    bg_shape.fill.fore_color.rgb = color
    bg_shape.line.fill.background()
    return bg_shape

def add_header(slide, tag_text, title_text, subtitle_text, tag_color, tag_bg):
    # Tag Badge
    tag_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(4.0), Inches(0.4))
    tf_tag = tag_box.text_frame
    tf_tag.word_wrap = True
    p_tag = tf_tag.paragraphs[0]
    p_tag.text = tag_text.upper()
    p_tag.font.size = Pt(10)
    p_tag.font.bold = True
    p_tag.font.color.rgb = tag_color
    p_tag.font.name = "Arial"

    # Title
    title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.7), Inches(11.7), Inches(0.6))
    tf_title = title_box.text_frame
    tf_title.word_wrap = True
    p_title = tf_title.paragraphs[0]
    p_title.text = title_text
    p_title.font.size = Pt(24)
    p_title.font.bold = True
    p_title.font.color.rgb = RGBColor(255, 255, 255)
    p_title.font.name = "Segoe UI"

    # Subtitle
    sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.3), Inches(11.7), Inches(0.5))
    tf_sub = sub_box.text_frame
    tf_sub.word_wrap = True
    p_sub = tf_sub.paragraphs[0]
    p_sub.text = subtitle_text
    p_sub.font.size = Pt(12)
    p_sub.font.color.rgb = RGBColor(148, 163, 184)
    p_sub.font.name = "Segoe UI"

def add_card(slide, left, top, width, height, title, items, bg_color, border_color, title_color=RGBColor(255, 255, 255)):
    # Card Background Shape
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    card.fill.solid()
    card.fill.fore_color.rgb = bg_color
    card.line.color.rgb = border_color
    card.line.width = Pt(1.5)

    # Content Text Box inside card
    pad = Inches(0.2)
    tb = slide.shapes.add_textbox(left + pad, top + pad, width - (pad * 2), height - (pad * 2))
    tf = tb.text_frame
    tf.word_wrap = True
    
    # Title
    p_title = tf.paragraphs[0]
    p_title.text = title
    p_title.font.size = Pt(14)
    p_title.font.bold = True
    p_title.font.color.rgb = title_color
    p_title.font.name = "Segoe UI"
    p_title.space_after = Pt(8)

    # Bullet items
    for item in items:
        p = tf.add_paragraph()
        p.text = "• " + item
        p.font.size = Pt(11)
        p.font.color.rgb = RGBColor(203, 213, 225)
        p.font.name = "Segoe UI"
        p.space_after = Pt(6)

def add_table_slide(slide, left, top, width, height, headers, rows, col_widths=None):
    num_rows = len(rows) + 1
    num_cols = len(headers)
    table_shape = slide.shapes.add_table(num_rows, num_cols, left, top, width, height)
    table = table_shape.table

    if col_widths and len(col_widths) == num_cols:
        for i, w in enumerate(col_widths):
            table.columns[i].width = w

    # Headers
    for c_idx, h in enumerate(headers):
        cell = table.cell(0, c_idx)
        cell.fill.solid()
        cell.fill.fore_color.rgb = RGBColor(30, 41, 59)
        p = cell.text_frame.paragraphs[0]
        p.text = h
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = RGBColor(6, 182, 212)
        p.font.name = "Segoe UI"

    # Data Rows
    for r_idx, row in enumerate(rows):
        for c_idx, val in enumerate(row):
            cell = table.cell(r_idx + 1, c_idx)
            cell.fill.solid()
            cell.fill.fore_color.rgb = RGBColor(22, 32, 50) if r_idx % 2 == 0 else RGBColor(17, 24, 39)
            p = cell.text_frame.paragraphs[0]
            p.text = str(val)
            p.font.size = Pt(10)
            p.font.color.rgb = RGBColor(226, 232, 240)
            p.font.name = "Segoe UI"

# ==============================================================================
# 1. BUILD TECHNICAL PRESENTATION (21 SLIDES)
# ==============================================================================
def create_technical_presentation(output_path):
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    bg_dark = RGBColor(10, 14, 23)
    card_bg = RGBColor(22, 32, 50)
    card_border = RGBColor(31, 45, 66)
    accent_cyan = RGBColor(6, 182, 212)
    accent_blue = RGBColor(59, 130, 246)
    accent_amber = RGBColor(245, 158, 11)
    accent_green = RGBColor(16, 185, 129)

    # Slide 1: Title
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Engineering Specification", "ITB-SCREEN-RECORDER Architecture Deep-Dive", 
               "Air-Gapped Enterprise Fleet Video Streaming, Continuous Capture & Non-Linear Forensic Extraction", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "🎯 Mission-Critical Engineering Goals", [
        "High-Density Fleet Capture: 100+ endpoints streaming screen, dual-audio (mic + speakers), and keystrokes 24/7.",
        "Zero Workstation Overhead: Real-time GPU acceleration (NVIDIA NVENC & Intel QuickSync) yields <1% client CPU.",
        "Strict Air-Gap Compliance: 100% self-hosted on-premises deployment with zero cloud or internet dependencies.",
        "Sub-Second Live Telemetry: Low-latency WebRTC (WHEP) and HLS streaming to command consoles.",
        "Deterministic Time Precision: Wall-clock chunking eliminates cumulative drift across long-running streams."
    ], card_bg, accent_cyan, accent_cyan)
    
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "🏗️ Core Subsystem Assemblies", [
        "ITB.AgentService (.NET 8): Windows Session 0 supervisor & user logon watchdog.",
        "ITB.AgentWorker (.NET 8): Session 1 interactive capture engine (DirectX DDA, WASAPI, FFmpeg pipeline).",
        "ITB.Server (ASP.NET Core 8): Fleet C2, scheduler, SQLite WAL catalog, path resolution.",
        "MediaMTX v1.15.4 (Pinned): Dedicated low-latency streaming hub (:19350 RTMP, :8889 WHEP).",
        "Features.Extractor & ExtractorAdvanced: Non-linear multi-track synchronized cutting & spritesheet caching.",
        "Web Client (React 18 + Vite): Multi-screen fleet wall & browser NLE studio."
    ], card_bg, accent_blue, accent_blue)

    # Slide 2: Invariants
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "System Invariants", "Architectural Invariants & Hard Design Constraints", 
               "Core design rules governing deterministic synchronization, zero data loss, and resource governance.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(3.7), Inches(4.7), "⏱️ Wall-Clock Determinism", [
        "Rule 1 Enforcement: Chunks split on exact UTC multiples of Storage.ChunkIntervalMinutes (default: 5 min).",
        "Chunk boundaries land strictly on 00:00, 00:05, 00:10 regardless of when stream started.",
        "Eliminates cumulative timer drift across all 100+ stations.",
        "Enables instant multi-track alignment in forensic extraction."
    ], card_bg, card_border)
    add_card(s, Inches(4.8), Inches(2.1), Inches(3.7), Inches(4.7), "🛡️ Dual-Path Storage Failover", [
        "Rule 2 Enforcement: Primary destination is enterprise NetApp UNC path.",
        "Active path probe tests NetApp availability every chunk boundary with 3s timeout.",
        "Automated fallback to local NVMe path (C:\\ProgramData\\...\\Recordings) upon UNC timeout.",
        "Self-healing: Reconnects to NetApp seamlessly once storage path returns."
    ], card_bg, card_border)
    add_card(s, Inches(8.8), Inches(2.1), Inches(3.7), Inches(4.7), "⚡ Tri-Tier GPU Offloading", [
        "Rule 8 Enforcement: Dynamic hardware probe at stream initialization.",
        "Priority 1: NVIDIA NVENC (p2 ll, forced-idr).",
        "Priority 2: Intel QuickSync (QSV, veryfast, -37% CPU).",
        "Priority 3: Software CPU libx264 (ultrafast, zerolatency safety fallback).",
        "Ensures operator workstation GUI never drops below 60 FPS."
    ], card_bg, card_border)

    # Slide 3: Topology Schema
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Network Topology", "End-to-End System Connectivity & Wiring Schema", 
               "Physical and logical interconnects between endpoints, central servers, storage, and clients.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(3.6), Inches(4.7), "1. Managed Workstation", [
        "AgentService (Session 0 SYSTEM):",
        " • User logon watchdog & token duplication",
        " • Spawns Worker via Win32 CreateProcessAsUser",
        "AgentWorker (Session 1 User GUI):",
        " • DirectX DDA screen capture",
        " • WASAPI dual audio mixer",
        " • Local offline failover buffer (.mp4/.key)",
        " • Outgoing RTMP stream to port :19350",
        " • Outgoing C2 HTTP/WS telemetry to :5090"
    ], card_bg, accent_cyan)
    add_card(s, Inches(4.8), Inches(2.1), Inches(4.2), Inches(4.7), "2. Central Recording Server", [
        "MediaMTX Core (v1.15.4 Pinned):",
        " • RTMP Ingest Listener (:19350)",
        " • WebRTC / WHEP Server (:8889)",
        " • Control REST API (:9997)",
        "ASP.NET Core 8 Web Host (:5090):",
        " • RecordingChunkScheduler (Wall-Clock cut)",
        " • MediaMtxSupervisorWorker (Process recovery)",
        " • StorageScannerService (Covering Index sync)",
        " • SQLite DB (WAL mode, 256MB mmap)",
        " • Extractor & ExtractorAdvanced (NLE Engine)"
    ], card_bg, accent_blue)
    add_card(s, Inches(9.3), Inches(2.1), Inches(3.2), Inches(4.7), "3. Storage & Clients", [
        "Storage Targets:",
        " • NetApp UNC Share (Primary)",
        "   \\\\netapp\\recordings\\live",
        " • Local Disk Fallback (Failover)",
        "   C:\\ProgramData\\...\\Recordings",
        "Operations Clients:",
        " • React 18 Fleet C2 Grid",
        " • Low-latency WebRTC WHEP",
        " • Synchronized NLE Studio",
        " • Multi-Track Forensic Exporter"
    ], card_bg, accent_green)

    # Slide 4: Component Diagram
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Architecture Modeling", "System UML Component Architecture", 
               "Assembly dependency model and contract decoupling across solutions.", accent_cyan, bg_dark)
    headers = ["Component Assembly", "Key Namespaces & Classes", "Primary Role & Isolation Boundary"]
    rows = [
        ["ITB-SCREEN-RECORDER.Core", "Abstractions, Contracts, Configuration, Diagnostics", "Zero-dependency shared contracts, DTOs, IPC models, config schemas."],
        ["ITB.AgentService", "AgentSupervisorService, Infrastructure.Win32", "Session 0 Windows Service. Watches user logon, duplicates token, launches worker."],
        ["ITB.AgentWorker", "WorkerEngine, VideoPipeline, AudioPacer, FfmpegManager", "Session 1 interactive capture engine. Direct3D DDA, WASAPI loopback, high-priority."],
        ["ITB.Server", "RecordingChunkScheduler, MediaMtxSupervisor, StorageScanner", "Central hub: Wall-clock scheduler, MediaMTX supervisor, SQLite catalog."],
        ["Features.Extractor", "ExtractorService, NoSignalPatternService, TrackCutter", "Modular plugin assembly. Single-station cut, gap filling, sync plan builder."],
        ["Features.ExtractorAdvanced", "AdvancedExtractorService, AdvanceJobManager, Bookmarks", "NLE timeline API, multi-track cutting, draft persistence, spritesheet store."]
    ]
    add_table_slide(s, Inches(0.8), Inches(2.1), Inches(11.7), Inches(4.7), headers, rows, [Inches(2.5), Inches(4.5), Inches(4.7)])

    # Slide 5: Session 0 vs 1
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Endpoint Internals", "Endpoint Architecture: Session 0 vs. Session 1 Separation", 
               "Solving Windows security boundaries: Capturing user desktop graphics from a persistent background service.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "🛑 The Windows Session 0 Barrier", [
        "Since Windows Vista, system services run isolated in Session 0.",
        "Session 0 has no interactive desktop, no monitor display, and no Direct3D graphics context.",
        "DirectX Desktop Duplication API (DDA) can only run within the interactive user session (Session 1+).",
        "User-mode startup applications terminate on logoff, violating 24/7 continuous surveillance requirements."
    ], card_bg, card_border)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "✅ Two-Tier Supervisor-Worker Solution", [
        "AgentSupervisorService runs as a persistent Windows Service with SYSTEM privileges in Session 0.",
        "On active user login, Supervisor queries active console session (WTSGetActiveConsoleSessionId).",
        "Queries user token via WTSQueryUserToken and duplicates token with DuplicateTokenEx.",
        "Executes Win32 CreateProcessAsUser to launch AgentWorker.exe directly into Session 1.",
        "Supervisor and Worker communicate via local Named Pipe / IPC for target updates and clock calibration."
    ], card_bg, accent_cyan, accent_cyan)

    # Slide 6: AgentWorker Ingestion
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Media Pipeline", "AgentWorker Ingestion: DDA, WASAPI & Video Pacer", 
               "Capturing display surfaces and mixed audio with microsecond timing accuracy.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "🖥️ DirectX Desktop Duplication (DDA)", [
        "Acquires display frames directly from GPU frame buffer via IDXGIOutputDuplication.",
        "Zero memory copy across CPU boundaries until frames enter hardware encoder.",
        "Supports native multi-monitor display resolutions up to 4K at steady 30 FPS.",
        "Windows Multimedia Timer: timeBeginPeriod(1) applied for 1ms scheduler granularity.",
        "SessionGuard monitors DDA context; auto-recovers upon screen unlock or resolution change."
    ], card_bg, card_border)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "🎙️ WASAPI Audio & Video Pacer", [
        "Dual Loopback Mixer: Captures default system output (speakers) mixed with input (microphone).",
        "AudioPacer: Resolves timestamp drift between independent audio clock and display refresh rate.",
        "High-Speed Local TCP Loopback: Feeds PCM audio samples into FFmpeg without Windows pipe buffer bloat.",
        "Low-latency presentation: Output synchronized to true wall-clock arrival timestamps."
    ], card_bg, accent_cyan, accent_cyan)

    # Slide 7: Hardware Acceleration
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Encoding Engine", "Tri-Tier Hardware Acceleration (NVENC → QSV → CPU)", 
               "Dynamic hardware probe executing at stream startup to eliminate workstation CPU load.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(3.7), Inches(4.7), "🟢 Tier 1: NVIDIA NVENC", [
        "Encoder: h264_nvenc",
        "Preset: p2 (Fast / Low Latency)",
        "Tuning: -tune ll -forced-idr 1",
        "CPU Utilization: < 1% CPU core load",
        "Latency: Zero-latency B-frame suppression",
        "Ideal for dedicated CAD & command workstations"
    ], card_bg, accent_green, accent_green)
    add_card(s, Inches(4.8), Inches(2.1), Inches(3.7), Inches(4.7), "🔵 Tier 2: Intel QuickSync (QSV)", [
        "Encoder: h264_qsv",
        "Preset: veryfast -low_power 1",
        "Pixel Format: Transparently converted to nv12",
        "CPU Reduction: ~37% less CPU than software x264 on standard desktop machines",
        "Supports standard enterprise desktops and laptops"
    ], card_bg, accent_blue, accent_blue)
    add_card(s, Inches(8.8), Inches(2.1), Inches(3.7), Inches(4.7), "🟡 Tier 3: CPU Fallback", [
        "Encoder: libx264 (Software)",
        "Preset: ultrafast",
        "Tuning: -tune zerolatency",
        "Safety Net: Activated only when neither discrete NVIDIA nor Intel integrated GPU is available",
        "Ensures 100% compatibility across legacy hardware"
    ], card_bg, accent_amber, accent_amber)

    # Slide 8: Deterministic Wall-Clock Chunking
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Storage Engine", "Deterministic Wall-Clock Chunking Engine (Rule 1)", 
               "Synchronizing MediaMTX segment cuts to round clock boundaries without cumulative drift.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "⏰ Wall-Clock Boundary Calculation", [
        "RecordingChunkScheduler calculates next boundary purely from current UTC clock.",
        "minutesSinceMidnight - (minutesSinceMidnight % interval) + interval.",
        "Recomputed fresh from DateTime.UtcNow every iteration: Zero cumulative Task.Delay drift.",
        "At boundary tick, invokes MediaMtxApiClient.RotatePathRecordingAsync on all active streams.",
        "Toggles record: false -> record: true via MediaMTX Control API to force clean cut.",
        "Filename format: %Y-%m-%d_%H-%M-%S-%f accurately reflects chunk opening instant."
    ], card_bg, card_border)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "📌 MediaMTX Pinning (v1.15.4)", [
        "MediaMTX is strictly pinned to v1.15.4 in production.",
        "Upstream Bug in v1.15.5+: Added unconfigurable ntpDriftTolerance check in format_fmp4_track.go.",
        "Drift check tripped every ~15-20 seconds on live screen capture, repeatedly cutting segments!",
        "Version pin guarantees stability and strict adherence to 5-minute configured intervals.",
        "MediaMtxSupervisorWorker auto-recovers MediaMTX process within 5 seconds if terminated."
    ], card_bg, accent_amber, accent_amber)

    # Slide 9: Storage Failover
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Storage Strategy", "Storage Architecture & High-Availability Failover", 
               "Guaranteed persistence across enterprise SAN/NAS outages and local disk constraints.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(3.7), Inches(4.7), "🏛️ Primary NetApp UNC", [
        "Target: Storage.NetAppUncPath",
        "Standard layout: {root}/live/{station_id}/*.mp4",
        "High-capacity SAN/NAS backend designed for 30+ day retention across 100+ stations.",
        "Supports parallel read/write for live recording and NLE extraction."
    ], card_bg, card_border)
    add_card(s, Inches(4.8), Inches(2.1), Inches(3.7), Inches(4.7), "🔄 3-Second Failover Resolver", [
        "StoragePathResolver tests NetApp reachability with 3-second timeout on every boundary tick.",
        "If NetApp is unresponsive, MediaMTX is instantly switched to local NVMe fallback disk.",
        "Local target: C:\\ProgramData\\...\\Recordings",
        "Transitions back to NetApp automatically once storage is reachable again."
    ], card_bg, accent_cyan, accent_cyan)
    add_card(s, Inches(8.8), Inches(2.1), Inches(3.7), Inches(4.7), "🧹 Retention & Quota Safety", [
        "Time-Based Retention: MediaMTX recordDeleteAfter automatically purges files older than RetentionDays.",
        "Storage Quota Safety: Files younger than 2 * ChunkInterval are shielded from eviction.",
        "Global-oldest eviction ensures high-bitrate stations do not starve global storage limits."
    ], card_bg, card_border)

    # Slide 10: Database Schema
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Data Layer", "High-Throughput SQLite WAL Database & Schema", 
               "In-memory SQLite tuned for sub-millisecond timeline range queries and high write concurrency.", accent_cyan, bg_dark)
    headers = ["Table Name", "Primary Columns & Types", "Purpose & Performance Role"]
    rows = [
        ["station_nodes", "station_id (PK), ip_address, agent_version, role_alias, is_active", "Active fleet registry, heartbeat tracking, role assignments."],
        ["recording_chunks", "id (PK), station_id, file_path, start_epoch_ms, end_epoch_ms, is_finalized", "Master catalog of 5-minute video chunks. Indexed with covering timeline index."],
        ["keystroke_events", "id (PK), station_id, epoch_ms, key_combination, timestamp_utc", "Indexed operator keystrokes for forensic correlation and subtitle export."],
        ["custom_tabs", "id (PK), name, hostnames_json, ous_json, display_order", "Fleet grouping, room layouts, and custom operational views."],
        ["advance_jobs", "JobId (PK), FileName, Status, ProgressPercent, SpeedMBps, EtaSeconds", "State and progress tracking for asynchronous NLE background rendering."],
        ["bookmarks / drafts", "Id (PK), StationId, StartUtc, EndUtc, StateJson", "User-created incident marks, annotations, and non-destructive NLE project drafts."]
    ]
    add_table_slide(s, Inches(0.8), Inches(2.1), Inches(11.7), Inches(4.7), headers, rows, [Inches(2.4), Inches(4.6), Inches(4.7)])

    # Slide 11: Storage Scanner
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Catalog Engine", "Storage Scanner & Automated Cataloging Pipeline", 
               "Continuously reconciling on-disk MP4 files with the database to index finalized segments.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "🔄 Background Reconciliation Sweep", [
        "StorageScannerService runs periodic sweep across active recording root.",
        "Parses millisecond timestamps directly from filenames (station_YYYY-MM-DD_HH-mm-ss-fff.mp4).",
        "Inspects unfinalized segments using ffprobe to obtain exact duration, width, height, FPS, and audio presence.",
        "Marks chunk as is_finalized = 1 once MediaMTX releases file write lock.",
        "Maintains covering index (idx_chunks_station_window_covering) for instant timeline queries."
    ], card_bg, card_border)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "🛡️ Self-Healing & Orphan Discovery", [
        "Crash Recovery: Automatically catalogues files recorded during server downtime.",
        "Network Partition Recovery: Chunks synced from endpoint offline buffers are indexed immediately.",
        "Non-blocking Read Operations: Timeline UI queries SQLite index without touching physical storage disk.",
        "Integrity Verification: Flags incomplete or zero-byte chunks without halting scanner loop."
    ], card_bg, accent_cyan, accent_cyan)

    # Slide 12: Sequence - Agent Ingestion
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Sequence Flow", "UML Sequence: Agent Ingestion & Telemetry Handshake", 
               "Complete sequence from OS logon, worker launch, stream initialization, to C2 telemetry.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(11.7), Inches(4.7), "🔄 Agent Lifecycle Flow Steps", [
        "1. OS triggers WTS_SESSION_LOGON -> AgentSupervisorService (Session 0) catches event.",
        "2. Supervisor obtains user token via WTSQueryUserToken and calls DuplicateTokenEx.",
        "3. Supervisor executes Win32 CreateProcessAsUser to launch AgentWorker.exe into Session 1.",
        "4. AgentWorker runs HardwareProbe: Tests NVENC -> QSV -> CPU, selects optimal encoder.",
        "5. Worker connects to Supervisor via local IPC (Named Pipe); receives target RTMP URL and clock offset.",
        "6. Worker launches FFmpeg with high priority and begins streaming H.264/AAC to MediaMTX (:19350).",
        "7. AudioPacer synchronizes WASAPI loopback samples via TCP; VideoPipeline streams raw DDA frames.",
        "8. Supervisor reports station heartbeat, telemetry (CPU/GPU/FPS), and batched keystrokes to Server C2 (:5090)."
    ], card_bg, accent_blue)

    # Slide 13: Sequence - Chunk Rotation
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Sequence Flow", "UML Sequence: Wall-Clock Segment Rotation", 
               "Coordination between scheduler, MediaMTX API, file system, and catalog scanner.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(11.7), Inches(4.7), "⏰ Chunk Rotation Flow Steps", [
        "1. RecordingChunkScheduler wakes at exact UTC boundary tick (e.g. 14:00:00 UTC).",
        "2. Invokes GET /v3/paths/list via MediaMtxApiClient to discover all active station streams.",
        "3. For each active path, invokes RotatePathRecordingAsync: sends { record: false } via Control API.",
        "4. MediaMTX closes current fMP4 segment (e.g. chunk_13-55-00.mp4) and flushes file to disk.",
        "5. Scheduler immediately sends { record: true } via Control API.",
        "6. MediaMTX opens new segment (e.g. chunk_14-00-00.mp4) with accurate start timestamp.",
        "7. Scheduler notifies StorageScannerService that rotation has completed.",
        "8. StorageScanner probes closed chunk with ffprobe and inserts finalized record into SQLite database."
    ], card_bg, accent_amber)

    # Slide 14: Extractor & NLE
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Forensic Extraction", "Extractor & ExtractorAdvanced: Web NLE Architecture", 
               "Browser-based multi-camera forensic editing with synchronized multi-track export.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "🎬 Advanced Studio Capabilities", [
        "Multi-Station Synchronized Playback: Up to 16 stations played simultaneously in lockstep.",
        "Visual Timeline & Spritesheets: Scrubbing powered by cached thumbnail spritesheets rendered on Canvas.",
        "Non-Destructive Editing: Set IN/OUT cue points and save project drafts without altering source media.",
        "Background Export Queue: Managed by AdvanceJobManager with progress %, MB/s speed, and ETA."
    ], card_bg, accent_cyan, accent_cyan)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "⚙️ Synchronized Export Pipelines", [
        "Synchronized Multi-Track: Combines multiple station recordings into unified time-aligned video.",
        "Single-Station Fast Cut: Lossless stream copy on keyframe boundaries, or smart-recoding for precise cuts.",
        "Forensic Burn-in: Embed station hostname, UTC timestamp, and keystroke subtitles (.srt).",
        "Automated Gap Padding: Injects NoSignal pattern frames whenever stations were offline."
    ], card_bg, card_border)

    # Slide 15: Sequence - Extraction
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Sequence Flow", "UML Sequence: Multi-Track Synchronized Extraction", 
               "How gaps, differing start times, and multi-station cuts are unified into an export file.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(11.7), Inches(4.7), "🎞️ Video Slicing & Assembly Sequence", [
        "1. Analyst selects stations and marks IN/OUT bounds in Studio; clicks Export -> POST /api/export.",
        "2. ExtractorAdvancedController validates request and hands payload to AdvanceJobManager.",
        "3. SynchronizationPlanBuilder queries SQLite recording_chunks for all selected stations.",
        "4. PlanBuilder analyzes intervals: identifies recording segments, start offsets, and offline gaps (>500ms).",
        "5. SynchronizedTrackCutter slices station chunks via FFmpeg, injecting synthetic NoSignal frames for gaps.",
        "6. Extractor muxes parallel video tracks with matching audio channels into target container.",
        "7. KeystrokeSrtGenerator queries keystroke_events and writes synchronized .srt subtitle track.",
        "8. AdvanceJobManager updates job status to Completed; client downloads verified package."
    ], card_bg, accent_green)

    # Slide 16: Gap Handling & No Signal
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Time Continuity", "Gap Handling & 'No Signal' Clock-Alignment Engine", 
               "Solving temporal desynchronization when stations reboot, disconnect, or power down.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "⚠️ The Desynchronization Problem", [
        "If Station A runs continuously from 10:00 to 10:30, but Station B powered off from 10:10 to 10:20:",
        "Standard NLE tools simply concatenate Station B's clips.",
        "Result: Station B's 10:20 actions are shown at 10:10, destroying cross-station correlation!",
        "Multi-operator incident investigations become misleading and legally invalid."
    ], card_bg, card_border)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "🛡️ The NoSignalPatternService Solution", [
        "SynchronizationPlanBuilder detects all temporal gaps exceeding 500ms.",
        "NoSignalPatternService generates synthetic video frames with calibration pattern or black screen.",
        "Audio channel generates matching silent audio samples.",
        "FFmpeg concatenates valid chunks with synthetic gap streams: Tracks remain 100% time-aligned to the millisecond!",
        "Investigators clearly see when a station was offline while other stations continue playing in sync."
    ], card_bg, accent_cyan, accent_cyan)

    # Slide 17: Keystrokes & SRT
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Forensic Telemetry", "Forensic Keystroke Capture & Synchronized SRT", 
               "Capturing operator keyboard events with millisecond timestamps for synchronized subtitle display.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "⌨️ Low-Level Keystroke Hook", [
        "KeyboardCaptureFactory sets low-level OS hook (SetWindowsHookEx on Windows / X11 on Linux).",
        "Records key combinations and shortcut triggers with millisecond UTC epoch timestamps.",
        "Privacy Gate: Keystroke recording automatically pauses when the agent is in standby or offline gap mode.",
        "Batched into C2 telemetry reports to eliminate individual network packet overhead."
    ], card_bg, card_border)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "📄 SubRip (.SRT) Subtitle Generation", [
        "KeystrokeSrtGenerator queries keystroke_events across requested extraction time window.",
        "Generates standard .srt subtitle files with exact start and end display intervals.",
        "Overlays key events (e.g. [KEY] Ctrl+Shift+Esc, [KEY] Enter) directly on exported video.",
        "Playable in any standard video player (VLC, Windows Media, Browser) without custom plugins."
    ], card_bg, accent_blue, accent_blue)

    # Slide 18: Frontend Client
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Client Application", "Frontend Client Architecture: React 18 & WebRTC WHEP", 
               "Modular, responsive operator workspace designed for high-density live telemetry and rapid NLE scrubbing.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(3.7), Inches(4.7), "⚡ React 18 & Vite SPA", [
        "Modern single-page application built with React 18 and Vite.",
        "Optimized DOM recycling supporting 16+ live video screens simultaneously.",
        "Modular architecture: Fleet grid, player, timeline, settings, and auth."
    ], card_bg, card_border)
    add_card(s, Inches(4.8), Inches(2.1), Inches(3.7), Inches(4.7), "📡 WebRTC / WHEP Player", [
        "Sub-second live video playback direct from MediaMTX via WebRTC WHEP (:8889).",
        "Eliminates multi-second HLS buffering delay during live operations.",
        "Auto-fallback to low-latency HLS (:8888) if WebRTC UDP traffic is blocked."
    ], card_bg, accent_cyan, accent_cyan)
    add_card(s, Inches(8.8), Inches(2.1), Inches(3.7), Inches(4.7), "🎞️ Canvas Timeline NLE", [
        "Hardware-accelerated HTML5 Canvas timeline track rendering.",
        "Dynamic zoom from 24-hour day overview down to individual seconds.",
        "Fast scrubbing with spritesheet thumbnail caching."
    ], card_bg, card_border)

    # Slide 19: Security & RBAC
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Security & Access", "Security Architecture, Authentication & RBAC", 
               "Defense-in-depth security model built for air-gapped high-security operations.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "🔐 Authentication Infrastructure", [
        "Local Identity Store: Embedded accounts with SHA-256 / PBKDF2 hashing and immutable system root.",
        "Active Directory / LDAP: Native support for on-premises enterprise directory servers.",
        "Stateless JWT Tokens: Secure cryptographically signed session tokens for API authorization.",
        "Audit Logging: Comprehensive event trail of logins, setting changes, and video export operations."
    ], card_bg, card_border)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "🛡️ Role-Based Access Control (RBAC)", [
        "view_live_fleet: Permission to view live workstation screens (Viewer, Operator, Admin).",
        "export_recordings: Permission to cut and download video files (Investigator, Admin).",
        "manage_retention: Permission to adjust chunk interval and retention days (Admin).",
        "admin_roles_users: Permission to manage users, LDAP groups, and station roles (Admin)."
    ], card_bg, accent_green, accent_green)

    # Slide 20: Fault Tolerance Matrix
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "High Availability", "Fault Tolerance, Resiliency & Recovery Matrix", 
               "Comprehensive resilience strategies across all failure domains.", accent_cyan, bg_dark)
    headers = ["Failure Scenario", "Immediate Impact", "Automated System Recovery"]
    rows = [
        ["LAN Link Outage", "AgentWorker cannot reach MediaMTX RTMP ingest", "Worker detects broken pipe; auto-buffers to local NVMe. Reconnects and streams live once network restores."],
        ["NetApp Storage Down", "Recordings cannot write to central UNC share", "StoragePathResolver detects 3s timeout; reconfigures MediaMTX to write to local fallback disk without dropping streams."],
        ["MediaMTX Crash", "Streaming engine process terminates", "MediaMtxSupervisorWorker detects dead process within 5s; restarts MediaMTX and re-applies runtime config."],
        ["Screen Lock / Res Change", "DirectX DDA loses desktop display context", "SessionGuard catches fatal capture errors; waits and re-initializes DDA once user unlocks or resolution stabilizes."],
        ["Server Power Loss", "Database chunks unfinalized in SQLite", "StorageScannerService sweeps disk on startup, inspects orphaned chunks with ffprobe, and repairs database catalog."]
    ]
    add_table_slide(s, Inches(0.8), Inches(2.1), Inches(11.7), Inches(4.7), headers, rows, [Inches(2.5), Inches(4.2), Inches(5.0)])

    # Slide 21: Conclusion
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Architecture Wrap-up", "Architecture Summary & Technical Highlights", 
               "A battle-tested, high-density recording platform engineered for mission-critical visual defense.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(3.7), Inches(4.7), "🚀 Extreme Efficiency", [
        "GPU hardware offloading (NVENC/QSV) ensures <1% CPU load on client workstations.",
        "Single server node supports 100+ concurrent high-definition video streams without expensive server GPUs.",
        "Zero interference with critical operator workstation software."
    ], card_bg, accent_cyan, accent_cyan)
    add_card(s, Inches(4.8), Inches(2.1), Inches(3.7), Inches(4.7), "🎯 Temporal Precision", [
        "Deterministic wall-clock chunking ensures identical time intervals across all stations.",
        "NoSignalPatternService maintains frame-accurate synchronization across station outages.",
        "Forensic keystroke overlay correlates user commands with screen actions."
    ], card_bg, accent_blue, accent_blue)
    add_card(s, Inches(8.8), Inches(2.1), Inches(3.7), Inches(4.7), "🔒 Air-Gap Security", [
        "100% self-hosted on-premises architecture with zero internet or cloud dependencies.",
        "Seamless integration with enterprise Active Directory and granular RBAC.",
        "Comprehensive auditability and verified compliance readiness."
    ], card_bg, accent_green, accent_green)

    prs.save(output_path)
    print(f"Technical presentation saved successfully to: {output_path}")

# ==============================================================================
# 2. BUILD EXECUTIVE PRESENTATION (14 SLIDES)
# ==============================================================================
def create_executive_presentation(output_path):
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    bg_dark = RGBColor(10, 17, 40)
    card_bg = RGBColor(30, 41, 59)
    card_border = RGBColor(51, 65, 85)
    accent_gold = RGBColor(245, 158, 11)
    accent_blue = RGBColor(56, 189, 248)
    accent_green = RGBColor(16, 185, 129)

    # Slide 1: Title
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Executive Briefing", "Enterprise Visual Monitoring & Operational Assurance", 
               "High-density, air-gapped screen recording and multi-station forensic investigation platform.", accent_gold, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "💼 Executive Overview", [
        "Complete Visual Accountability: 24/7 continuous recording and live monitoring across operator workstations.",
        "Air-Gapped Sovereignty: Engineered for closed, classified, and strictly isolated enterprise networks.",
        "Rapid Incident Reconstruction: Reconstruct cross-team operational incidents in minutes instead of days.",
        "Uncompromised Performance: Workstations operate at 100% full speed with zero lag."
    ], card_bg, accent_gold, accent_gold)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "📊 Operational Benchmarks", [
        "100+ Simultaneous Stations: Scalable high-density fleet support per single server node.",
        "< 1% Workstation CPU Overhead: Complete GPU acceleration leaves operator PCs unburdened.",
        "< 1 Second Live Latency: Sub-second situational awareness via WebRTC technology.",
        "90% Faster Incident Debriefs: Automated multi-station synchronized replay accelerates operational reviews.",
        "100% On-Premises Compliance: Zero external cloud data leakage or subscription traps."
    ], card_bg, accent_blue, accent_blue)

    # Slide 2: The Challenge
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Operational Need", "The Operational Challenge in Mission-Critical Facilities", 
               "Why conventional commercial screen recording and meeting tools cannot meet enterprise defense requirements.", accent_gold, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(3.7), Inches(4.7), "❌ Heavy Workstation Load", [
        "Commercial tools consume 25% to 50% of the CPU.",
        "Degrades workstation responsiveness during intense operational missions.",
        "Causes mouse lag, frozen applications, and operator frustration."
    ], card_bg, card_border)
    add_card(s, Inches(4.8), Inches(2.1), Inches(3.7), Inches(4.7), "❌ Cloud & Security Violations", [
        "SaaS tools (Zoom, Teams, Cloud Recorders) require constant external internet connectivity.",
        "Transmits sensitive operational data to external commercial servers.",
        "Strictly prohibited in air-gapped and high-security defense environments."
    ], card_bg, card_border)
    add_card(s, Inches(8.8), Inches(2.1), Inches(3.7), Inches(4.7), "❌ Desynchronized Investigations", [
        "Reviewing separate, unaligned video files makes it impossible to reconstruct team actions.",
        "Reboots and power cycles break video alignment.",
        "Debriefing complex incidents requires days of manual video editing."
    ], card_bg, card_border)

    # Slide 3: 3-Tier Blueprint
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Solution Architecture", "How the Solution Operates: 3-Tier Blueprint", 
               "Clean architectural separation between endpoints, central hub, and operations consoles.", accent_gold, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(3.7), Inches(4.7), "1. Endpoint Workstations", [
        "Continuous background capture agent.",
        "GPU-accelerated video compression.",
        "Dual audio capture (mic + speakers).",
        "Keystroke audit logging.",
        "Local failover buffer during network cuts.",
        "Zero operator intervention required."
    ], card_bg, accent_blue, accent_blue)
    add_card(s, Inches(4.8), Inches(2.1), Inches(3.7), Inches(4.7), "2. Central C2 & Storage", [
        "High-density video ingestion hub.",
        "Deterministic 5-minute chunking.",
        "Primary NetApp storage integration.",
        "Automated 3-second local failover.",
        "Self-healing background workers.",
        "Fast catalog search database."
    ], card_bg, accent_gold, accent_gold)
    add_card(s, Inches(8.8), Inches(2.1), Inches(3.7), Inches(4.7), "3. Operations Command", [
        "Browser-based command center.",
        "Sub-second live fleet monitoring wall.",
        "Synchronized multi-station replay.",
        "Forensic video export with subtitles.",
        "Active Directory role-based access.",
        "Instant incident debriefing."
    ], card_bg, accent_green, accent_green)

    # Slide 4: Zero Workstation Impact
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Workstation Integrity", "Zero Workstation Impact: Hardware-Accelerated Performance", 
               "Ensuring mission software runs at peak speed while video is captured in real-time.", accent_gold, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "🚀 Intelligent GPU Offloading", [
        "Automatic Hardware Probing: Tests workstation capabilities upon startup.",
        "NVIDIA NVENC Offloading: Directs compression to dedicated GPU chip; workstation CPU remains completely free (<1%).",
        "Intel QuickSync (QSV) Optimization: Delivers ~37% lower CPU load than standard software recorders on typical office PCs.",
        "Seamless Across Mixed Fleets: Operates automatically across laptops, desktop PCs, and specialized workstations with zero manual configuration."
    ], card_bg, accent_gold, accent_gold)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "📈 Workstation Resource Overhead Comparison", [
        "Commercial Recorders (Software CPU): 35% - 60% CPU consumption -> High risk of system freeze.",
        "Standard Desktop (Intel QuickSync): ~2.5% CPU consumption -> Lightweight and reliable.",
        "Command Workstation (NVIDIA GPU): < 0.8% CPU consumption -> True zero-impact recording.",
        "Outcome: Operators experience smooth mouse movement, responsive controls, and zero slowdown."
    ], card_bg, card_border)

    # Slide 5: 24/7 Resilience
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Operational Reliability", "24/7 High Availability & Offline Resiliency", 
               "Engineered to guarantee zero gap in security audits even during network cuts or storage outages.", accent_gold, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(3.7), Inches(4.7), "🔌 Network Disconnect Guard", [
        "If LAN connectivity to the server is lost, the agent automatically switches to local encrypted caching.",
        "When the network is restored, buffered video is safely synced to the central server.",
        "Zero recorded data is lost during network maintenance."
    ], card_bg, card_border)
    add_card(s, Inches(4.8), Inches(2.1), Inches(3.7), Inches(4.7), "💾 Dual Storage Safeguard", [
        "Primary recordings write directly to enterprise NetApp storage.",
        "If NetApp becomes unreachable, the server auto-diverts recordings to local high-speed disk within 3 seconds.",
        "Transitions back to NetApp automatically once reachable."
    ], card_bg, accent_gold, accent_gold)
    add_card(s, Inches(8.8), Inches(2.1), Inches(3.7), Inches(4.7), "🔄 Self-Healing Automation", [
        "Server supervisors continuously monitor streaming processes.",
        "If a core process stops unexpectedly, it is automatically restarted within 5 seconds.",
        "Requires zero manual IT intervention or emergency server reboots."
    ], card_bg, card_border)

    # Slide 6: Live C2 Wall
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Operations Oversight", "Live Command-and-Control Fleet Monitoring Wall", 
               "Real-time situational awareness across dozens of operational rooms and consoles.", accent_gold, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "📺 Sub-Second Live Monitoring", [
        "Sub-Second Live Video: WebRTC technology streams screens to commanders with less than 1 second delay.",
        "Interactive Multi-Grid: View up to 16 live station screens simultaneously on a single display wall.",
        "Instant Full-Screen Inspection: Click any station to instantly zoom into full resolution.",
        "Custom Operational Rooms: Organize workstations into operational rooms, duty cells, or shift groups."
    ], card_bg, accent_blue, accent_blue)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "📊 Real-Time Fleet Telemetry", [
        "Live Station Status: Immediate visibility into active recording and frame rate.",
        "Audio Activity Indicators: Real-time visual alerts when speakers or microphones are active.",
        "Network Bandwidth Monitoring: Proactive tracking of network throughput per station.",
        "Centralized Configuration: Adjust video quality and frame rates fleet-wide with one click."
    ], card_bg, card_border)

    # Slide 7: NLE Replay
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Investigation Power", "Forensic Synchronized Replay & Visual NLE Studio", 
               "Reconstructing complex multi-operator incidents in minutes rather than days.", accent_gold, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "🎬 Synchronized Multi-Screen Replay", [
        "Select up to 16 stations involved in an operational incident.",
        "All video feeds advance in absolute lockstep on a single unified timeline.",
        "When Operator A takes an action, see Operator B's screen reaction at the exact identical millisecond.",
        "Eliminates guesswork and manual timeline alignment."
    ], card_bg, accent_gold, accent_gold)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "🔍 Visual Scrubbing & Bookmarking", [
        "Rapid Timeline Scrubbing: Hover over the timeline to see instantaneous screen thumbnail previews.",
        "Incident Bookmarking: Tag critical incident timestamps with descriptive notes.",
        "Non-Destructive Project Drafts: Save investigation projects and share with peer analysts.",
        "Asynchronous Export: Export multi-track videos in the background while continuing review."
    ], card_bg, card_border)

    # Slide 8: Time Continuity
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Forensic Integrity", "The 'Time-Continuity Guarantee': Gap-Proof Audits", 
               "Overcoming station reboots and power outages without corrupting multi-station alignment.", accent_gold, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "❓ The Flaw in Traditional Video", [
        "If Operator A worked for 30 minutes, but Operator B restarted their computer for 5 minutes:",
        "Traditional video systems simply stitch Operator B's clips together.",
        "The timeline collapses by 5 minutes, completely desynchronizing Operator B from Operator A.",
        "The resulting video is misleading, distorted, and legally contestable."
    ], card_bg, card_border)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "🛡️ The ITB 'No-Signal' Assurance", [
        "ITB-SCREEN-RECORDER automatically detects station offline gaps.",
        "Injects calibrated 'No-Signal' frames for the exact duration the workstation was powered down.",
        "Maintains 100% time alignment across all station tracks down to the exact frame.",
        "Provides an accredited, indisputable record for military debriefs and regulatory compliance."
    ], card_bg, accent_gold, accent_gold)

    # Slide 9: Keystroke Intelligence
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Detailed Audit", "Forensic Keystroke Capture & Synchronized Subtitles", 
               "Correlating operator intent with screen outcomes for definitive audit trails.", accent_gold, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(3.7), Inches(4.7), "⌨️ Command Audit Logging", [
        "Captures operator key combinations, shortcuts, and commands with millisecond timestamps.",
        "Proves what commands were executed and in what precise sequence.",
        "Essential for troubleshooting accidental system triggers or policy violations."
    ], card_bg, card_border)
    add_card(s, Inches(4.8), Inches(2.1), Inches(3.7), Inches(4.7), "📄 Synchronized Subtitles (.SRT)", [
        "Exported videos can automatically include SubRip (.srt) subtitle tracks.",
        "Keystrokes appear overlaid at the bottom of the video exactly when they occurred.",
        "Playable in any standard media player (VLC, Windows Media) without proprietary software."
    ], card_bg, accent_blue, accent_blue)
    add_card(s, Inches(8.8), Inches(2.1), Inches(3.7), Inches(4.7), "🔒 Privacy Protection Gate", [
        "Keystroke recording is strictly bound to active screen recording.",
        "When an operator logs out or the station is in standby, keyboard capture is automatically shut down.",
        "Protects user privacy during administrative off-duty hours."
    ], card_bg, card_border)

    # Slide 10: Storage Economics
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Infrastructure Efficiency", "Enterprise Storage Economics & Intelligent Retention", 
               "Predictable storage consumption with automated lifecycle policies.", accent_gold, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "📦 Deterministic 5-Minute Chunks", [
        "Recordings are segmented precisely every 5 minutes on the clock (e.g. 10:00, 10:05).",
        "Prevents massive, single-file recordings that are vulnerable to corruption.",
        "Enables instant extraction of any 10-minute incident without scanning gigabytes of irrelevant video.",
        "Facilitates fast, parallel file transfers and backups."
    ], card_bg, card_border)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "🧹 Automated Retention Policies", [
        "Automatic Lifecycle Management: Recordings older than the configured policy (e.g. 30 days) are automatically deleted.",
        "Zero Manual File Maintenance: Storage space is reclaimed continuously without IT overhead.",
        "Active Recording Shield: Live sessions are protected from premature eviction during high-capacity events.",
        "Predictable Capacity Planning: Consistent compression ensures accurate long-term storage budgeting."
    ], card_bg, accent_gold, accent_gold)

    # Slide 11: Security & Governance
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Security & Compliance", "Security, Air-Gap Sovereignty & Role-Based Access", 
               "Purpose-built for zero-trust, highly compartmentalized facilities.", accent_gold, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(3.7), Inches(4.7), "🏰 100% Air-Gapped", [
        "Operates completely inside your isolated network perimeter.",
        "Zero external internet connections.",
        "Zero reliance on external cloud servers.",
        "No external licensing or phone-home beacons."
    ], card_bg, card_border)
    add_card(s, Inches(4.8), Inches(2.1), Inches(3.7), Inches(4.7), "🔑 Active Directory Integration", [
        "Seamless integration with on-premises LDAP / Active Directory.",
        "Users sign in with their existing enterprise credentials.",
        "Centralized user lifecycle management aligned with IT policies."
    ], card_bg, accent_blue, accent_blue)
    add_card(s, Inches(8.8), Inches(2.1), Inches(3.7), Inches(4.7), "🛡️ Role-Based Access (RBAC)", [
        "Granular permission controls:",
        " • Live Viewers (Monitoring only)",
        " • Forensic Investigators (Export access)",
        " • System Administrators (Full control)",
        "Prevents unauthorized video leakage."
    ], card_bg, accent_green, accent_green)

    # Slide 12: Scalability & Low TCO
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Scale & Deployment", "Scalability & Low Total Cost of Ownership (TCO)", 
               "Effortless deployment from small command cells to large enterprise operations.", accent_gold, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "📈 High Density per Server Node", [
        "Workstation GPU Offloading: Because video compression happens on endpoint GPUs, the central server only handles stream routing.",
        "100+ Endpoints per Server: A single standard server node manages over 100 simultaneous recording streams.",
        "COTS Hardware Compatibility: Runs on standard off-the-shelf enterprise server hardware without requiring expensive data center GPUs."
    ], card_bg, accent_gold, accent_gold)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "⚙️ Silent & Centralized Deployment", [
        "Automated Silent Install: Rapidly deployed across hundreds of workstations using standard IT software distribution tools.",
        "Zero Desktop Maintenance: Agents update and operate autonomously without user intervention.",
        "Centralized Management: Configure recording bitrates, frame rates, and policies fleet-wide from the web dashboard."
    ], card_bg, card_border)

    # Slide 13: Measurable ROI
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Value Proposition", "Measurable Business & Operational ROI", 
               "Transforming mission debriefing, compliance posture, and operational efficiency.", accent_gold, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(3.7), Inches(4.7), "⏱️ 90% Faster Debriefs", [
        "Incident debriefs reduced from multiple days of interviews to minutes of verified multi-screen playback.",
        "Immediate identification of root causes across complex team interactions.",
        "Accelerates operational lessons learned."
    ], card_bg, accent_gold, accent_gold)
    add_card(s, Inches(4.8), Inches(2.1), Inches(3.7), Inches(4.7), "⚖️ Total Compliance & Defense", [
        "Indisputable, time-certified video and keystroke logs.",
        "Eliminates liability ambiguities and regulatory audit penalties.",
        "Provides certified forensic evidence for legal reviews."
    ], card_bg, card_border)
    add_card(s, Inches(8.8), Inches(2.1), Inches(3.7), Inches(4.7), "💼 Operator Productivity", [
        "Workstations remain completely responsive with zero CPU lag.",
        "Eliminates software crashes caused by bulky recording tools.",
        "Operators stay focused on mission-critical responsibilities."
    ], card_bg, accent_green, accent_green)

    # Slide 14: Conclusion
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Executive Summary", "Strategic Readiness: The Visual Defense Foundation", 
               "Comprehensive, air-gapped operational assurance ready for enterprise deployment.", accent_gold, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "🌟 Key Strategic Takeaways", [
        "High-Density Fleet Recording: 100+ workstations recorded with < 1% CPU overhead.",
        "Synchronized Multi-Screen NLE: Reconstruct operational events with millisecond precision.",
        "100% Air-Gapped Security: Complete data sovereignty with zero cloud risk.",
        "Continuous Resilience: Offline buffering, dual storage targets, and self-healing architecture.",
        "Immediate Value: Drastic reduction in incident investigation time and guaranteed compliance."
    ], card_bg, accent_gold, accent_gold)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "🚀 Deployment Roadmap", [
        "Phase 1: Pilot Cell (10–15 Stations) - Verify workstation performance and network throughput in a live operational cell.",
        "Phase 2: Fleet Distribution - Automated silent deployment across all facility consoles via central IT tools.",
        "Phase 3: Operational Integration - Connect with enterprise Active Directory groups and storage retention policies.",
        "Status: Software is production-ready for immediate enterprise pilot."
    ], card_bg, accent_blue, accent_blue)

    prs.save(output_path)
    print(f"Executive presentation saved successfully to: {output_path}")

if __name__ == "__main__":
    out_dir = r"c:\Devlopers\ITB-SCREEN-RECORDER\Presentations"
    os.makedirs(out_dir, exist_ok=True)
    
    tech_path = os.path.join(out_dir, "ITB_SCREEN_RECORDER_Technical_Architecture.pptx")
    exec_path = os.path.join(out_dir, "ITB_SCREEN_RECORDER_Executive_Management.pptx")

    create_technical_presentation(tech_path)
    create_executive_presentation(exec_path)
    print("Both presentations successfully generated in PPTX format!")
