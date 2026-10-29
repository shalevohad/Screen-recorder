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
# 2. BUILD EXECUTIVE PRESENTATION (13 STRATEGIC SHOWCASE SLIDES)
# ==============================================================================
def create_executive_presentation(output_path):
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    bg_dark = RGBColor(7, 10, 16)
    card_bg = RGBColor(21, 30, 46)
    card_border = RGBColor(36, 50, 72)
    accent_cyan = RGBColor(6, 182, 212)
    accent_gold = RGBColor(245, 158, 11)
    accent_blue = RGBColor(56, 189, 248)
    accent_green = RGBColor(16, 185, 129)
    accent_purple = RGBColor(168, 85, 247)

    # Slide 1: Title & Strategic Mission
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Executive Briefing", "Enterprise Visual Monitoring & Operational Assurance", 
               "Air-gapped, high-density screen recording, live C2 command wall, and multicam forensic intelligence.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "💼 The Executive Mission", [
        "Complete Visual Accountability: 24/7 continuous recording and live monitoring across operator workstations.",
        "Air-Gapped Sovereignty: Engineered from day one for closed, classified, and strictly isolated networks.",
        "Instant Incident Reconstruction: Turn multi-day incident reviews into seconds of verified proof.",
        "Zero Operator Friction: Invisible background execution without mouse lag or performance loss."
    ], card_bg, accent_cyan, accent_cyan)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "📊 Operational Benchmarks", [
        "100+ Concurrent Stations: Scalable high-density fleet support per single server node.",
        "< 1% Workstation CPU Overhead: Direct GPU hardware acceleration leaves operator PCs unburdened.",
        "< 300ms Live Stream Latency: Glass-to-glass situational awareness via WebRTC WHEP streaming.",
        "90% Faster Incident Debriefs: Automated multi-station synchronized replay accelerates operational reviews.",
        "100% On-Premises Compliance: Zero external cloud data leakage, subscription fees, or license servers."
    ], card_bg, accent_blue, accent_blue)

    # Slide 2: The Challenge
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Operational Reality", "Why Commercial & Open-Source Tools Fail in Operations", 
               "Why conventional tools like Zoom, Teams, OBS, Camtasia, and standard VMS cannot meet defense standards.", accent_gold, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(3.7), Inches(4.7), "❌ Crippling CPU Overhead", [
        "Standard software recorders consume 25% to 50% CPU.",
        "Workstations stutter during critical operational tasks.",
        "Mouse lag frustrates operators during high-stress missions.",
        "High risk of workstation crash during tactical events."
    ], card_bg, card_border)
    add_card(s, Inches(4.8), Inches(2.1), Inches(3.7), Inches(4.7), "❌ Cloud & Security Violations", [
        "SaaS tools (Zoom, Teams, Cloud Recorders) demand internet.",
        "Transmits sensitive operational data to external servers.",
        "Strictly prohibited in air-gapped / classified enclaves.",
        "Vulnerable to remote subscription license lockouts."
    ], card_bg, card_border)
    add_card(s, Inches(8.8), Inches(2.1), Inches(3.7), Inches(4.7), "❌ Broken Temporal Sync", [
        "Standard recorders generate unaligned, drifting clips.",
        "When a station reboots, traditional players collapse the timeline.",
        "Zero cross-station timeline correlation.",
        "Recordings are legally inadmissible in formal debriefs."
    ], card_bg, card_border)

    # Slide 3: Live C2 Wall
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Real-Time Operations", "Sub-Second Live Fleet Command Wall", 
               "Glass-to-glass tactical monitoring across 70–100+ stations with zero browser decoder crash.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "📡 Ultra-Low Latency Streaming", [
        "Sub-Second WebRTC (WHEP) Ingestion: Glass-to-glass latency of 200–300ms over LAN.",
        "Eliminates multi-second HLS buffering lag during live operational monitoring.",
        "Crash-Proof Virtualization: Intersection Observer DOM virtualization ensures browser never crashes.",
        "Exclusive Audio Solo Sink: 1-click audio dock enforces single-station solo listening to prevent feedback.",
        "Dynamic Hot-Plug: Multi-monitor connect/disconnect adapts smoothly with zero stream interruption."
    ], card_bg, accent_cyan, accent_cyan)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "🖥️ Command Center Situational Awareness", [
        "High-Density Fleet Wall: Monitor 16 to 100 stations on a single massive tactical display.",
        "Custom Operational Rooms: Organize consoles into mission cells, control rooms, or shift groups.",
        "Real-Time Health Telemetry: Continuous monitoring of FPS, audio presence, bitrates, and hardware status.",
        "Instant Full-Screen Inspection: 1-click zoom into any station with interactive display minimap navigation."
    ], card_bg, card_border)

    # Slide 4: Auto-Director Multi-Monitor Intelligence
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Unique Differentiator #1", "Auto-Director: Multi-Screen Intelligent Focal Routing", 
               "Automating visual focus across multi-monitor stations with manual overrides and Split/PiP view modes.", accent_green, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "🎬 Activity-Based Director Track", [
        "Dynamic Activity Focus: Detects keyboard strokes and mouse activity to automatically cut to the active monitor.",
        "Live Screen Orientation HUD: Always know which screen is shown: [⚡ MON-0 (AUTO)] vs [✋ MON-1 (OVERRIDE)].",
        "Tactical Overrides & Splitting: Split any segment at the playhead (✂️ Split / hotkey 'S') to lock focus manually.",
        "Zero-Time-Drift Transitions: Smooth millisecond fades and persistent Minimap keep investigators oriented."
    ], card_bg, accent_green, accent_green)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "🎛️ Tactical View Modes", [
        "🎬 DIRECTOR: Standard automated focal tracking following operator workflow.",
        "🔲 SPLIT SCREEN: Dual side-by-side synchronized monitors for simultaneous multi-screen analysis.",
        "🪟 PiP (Picture-in-Picture): Secondary monitor in floating inset with 1-click instant display swap.",
        "🖥️ Monitor Pins: Lock playback exclusively to a specific monitor (mon-0, mon-1).",
        "Market Exclusivity: No commercial VMS or screen recorder provides automated multi-screen director tracks."
    ], card_bg, card_border)

    # Slide 5: Forensic Keystroke Intelligence
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Unique Differentiator #2", "Forensic Keystroke Intelligence & Synchronized Subtitles", 
               "Correlating operator intent with screen outcomes with millisecond precision.", accent_gold, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "⌨️ Low-Level Input Capture", [
        "Low-Level OS Hooking: Captures shortcuts, command executions, and hotkeys with millisecond UTC timestamps.",
        "Indisputable Audit Proof: Proves exactly who executed what command, when, and in what sequence.",
        "Privacy Protection Gate: Automatically pauses keyboard logging outside active recording or in lock screen.",
        "Forensic Search Engine: Search central catalog for specific commands (reboot, launch, authorize) to jump to video."
    ], card_bg, accent_gold, accent_gold)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "📄 Burned-in Subtitles (.SRT / .ASS)", [
        "Synchronized Subtitles: Exported incident videos include accurate SubRip (.srt) and Advanced SSA (.ass) subtitles.",
        "Overlaid Input Telemetry: Keystrokes appear at the bottom of the video exactly when pressed.",
        "Universal Playback: Playable in standard media players (VLC, Media Player, QuickTime) with zero plugins.",
        "Certified Legal Compliance: Provides verified forensic packages for formal debriefs and regulatory inquiries."
    ], card_bg, card_border)

    # Slide 6: Multi-Station Unified Timeline
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Unique Differentiator #3", "Multi-Station Unified Timeline & Gap-Proof Integrity", 
               "Reconstructing complex multi-operator incidents across 70+ stations in absolute lockstep.", accent_purple, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "⏱️ Wall-Clock Aligned Chunking", [
        "Deterministic 5-Minute Slicing: Recordings are sliced on exact UTC wall-clock boundaries (14:00, 14:05).",
        "Multicam Synchronized NLE: Up to 16 stations advance in absolute temporal lockstep.",
        "Cross-Team Correlation: When Dispatch transmits, see Operator screen receive it at that exact second.",
        "Eliminates Manual Alignment: No tedious video syncing in external video editors."
    ], card_bg, accent_purple, accent_purple)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "🛡️ The 'Time-Continuity Guarantee'", [
        "The Flaw in Other Tools: When Station B reboots for 5 minutes, normal players collapse the gap, breaking sync.",
        "ITB Synthetic Slate Engine: Automatically detects offline gaps (>500ms) and injects 'No Signal' test pattern video.",
        "Zero Timeline Drift: Station A and Station B remain 100% time-locked down to the exact millisecond.",
        "Court-Admissible Evidence: Clear visual indication of power cycles while preserving chronological truth."
    ], card_bg, card_border)

    # Slide 7: Zero Workstation Impact
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Endpoint Performance", "Zero Workstation Impact: Hardware-Accelerated Performance", 
               "Ensuring mission software runs at peak speed while video and audio are continuously captured.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "🚀 Intelligent GPU Offloading", [
        "Automatic Hardware Probing: Tests workstation capabilities upon startup (NVENC -> Intel QSV -> CPU).",
        "NVIDIA NVENC Silicon Offload: Compression runs on dedicated GPU silicon; workstation CPU load is < 0.8%.",
        "Intel QuickSync (QSV): Achieves ~2.0% CPU load on standard commercial desktop PCs.",
        "Zero Mouse Stutter: Fast 3D radars, GIS mapping, and mission C2 apps experience zero frame drops or input lag."
    ], card_bg, accent_cyan, accent_cyan)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "📈 Workstation Resource Comparison", [
        "Commercial Recorders (Software CPU): 35% - 60% CPU -> High risk of system freeze and sluggish UI.",
        "ITB-SCREEN-RECORDER (Intel QuickSync): ~2.0% CPU -> Lightweight, dependable capture.",
        "ITB-SCREEN-RECORDER (NVIDIA GPU): < 0.8% CPU -> True zero-impact continuous recording.",
        "Fleet Economics: Deploy across 100+ stations without requiring expensive PC hardware replacements."
    ], card_bg, card_border)

    # Slide 8: 100% Air-Gapped & Silent SSO
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Enterprise Security", "100% Air-Gapped Sovereignty & Silent Active Directory SSO", 
               "Engineered from day one for isolated, zero-trust, closed defense networks.", accent_green, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(3.7), Inches(4.7), "🏰 100% Air-Gapped", [
        "100% self-contained on internal LAN.",
        "Zero external internet links or CDNs.",
        "Zero remote license servers.",
        "Zero cloud data leakage.",
        "Compliant with highest defense rules."
    ], card_bg, card_border)
    add_card(s, Inches(4.8), Inches(2.1), Inches(3.7), Inches(4.7), "🔑 Silent AD / LDAP SSO", [
        "Windows Integrated Auth (Kerberos).",
        "Zero credentials prompts or login forms.",
        "AD groups map to operational roles.",
        "Granular RBAC: Live Viewer vs Forensic.",
        "Instant, seamless dashboard access."
    ], card_bg, accent_green, accent_green)
    add_card(s, Inches(8.8), Inches(2.1), Inches(3.7), Inches(4.7), "💾 Dual-Path Storage Failover", [
        "Primary NetApp storage with 3s probe.",
        "Auto-failover to local NVMe storage.",
        "Endpoints buffer video during network cuts.",
        "Automatic background synchronization.",
        "Guaranteed 24/7 audit continuity."
    ], card_bg, card_border)

    # Slide 9: Forensic Replay Studio
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Investigation Power", "Forensic Replay & Visual NLE Investigation Studio", 
               "Accelerating incident debriefs and investigations from days to minutes.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "🎞️ High-Speed Visual Scrubbing", [
        "Instant Visual Scrubbing: Hover thumbnails rendered on HTML5 Canvas allow browsing 24 hours without delay.",
        "Non-Destructive Bookmarking: Tag incident timestamps, annotate events, and share project drafts.",
        "Parallel Extraction Queue: Export single-station cuts with lossless stream copying or assemble multicam packs.",
        "Complete Forensic Package: Exports video, burned-in timecode, keystroke subtitles, and audio in one verified file."
    ], card_bg, accent_cyan, accent_cyan)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "📈 90% Faster Incident Closure", [
        "Traditional Investigations: 24 to 48 hours of manual operator interviews and text log reconciliation.",
        "ITB Visual Investigation: < 5 minutes to scrub, verify, and export indisputable multi-screen proof.",
        "Accredited Debriefs: Eliminates subjective memory bias with objective, frame-accurate multi-screen video.",
        "Accelerates Operational Lessons: Rapidly turn incidents into actionable training doctrine."
    ], card_bg, card_border)

    # Slide 10: Competitive Matrix
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Competitive Advantage", "The Competitive Superiority Scorecard", 
               "How ITB-SCREEN-RECORDER outperforms conventional enterprise and defense alternatives.", accent_gold, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "🏆 ITB Screen Recorder Strengths", [
        "Endpoint CPU Impact: < 1% (Dedicated GPU Silicon NVENC/QSV).",
        "Air-Gapped Sovereignty: 100% Offline (Zero Cloud Dependencies).",
        "Auto-Director Multi-Monitor: Yes (Activity Tracking / Split / PiP).",
        "Synchronized Keystrokes: Yes (Millisecond-Accurate SRT/ASS).",
        "Cross-Station Synchronicity: Guaranteed (No-Signal Slate Engine).",
        "Live Fleet Wall Latency: < 300ms (WebRTC WHEP Streaming).",
        "Enterprise SSO: Silent Windows Integrated Authentication."
    ], card_bg, accent_gold, accent_gold)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "❌ Commercial Alternatives Deficiencies", [
        "Commercial VMS (Genetec/Milestone): High CPU (15-25%), 2-5s RTSP latency, no keystrokes, no auto-director.",
        "Desktop Recorders (OBS/Camtasia): Heavy CPU (35-60%), local files only, unaligned clips, no live fleet wall.",
        "Meeting Tools (Zoom/Teams): Cloud mandatory, high latency, privacy risks, zero multicam forensic synchronization.",
        "Cost Structure: Commercial tools demand expensive recurring licenses; ITB offers low TCO perpetual deployment."
    ], card_bg, card_border)

    # Slide 11: Measurable ROI
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Business Case", "Measurable Business & Operational ROI", 
               "Delivering high-value compliance, rapid incident defense, and unmatched infrastructure efficiency.", accent_green, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(3.7), Inches(4.7), "⏱️ Operational Agility", [
        "90% faster debriefing turnarounds.",
        "Multi-station investigations in minutes.",
        "Realistic training from real recorded events.",
        "Workstations stay at 100% capacity."
    ], card_bg, accent_green, accent_green)
    add_card(s, Inches(4.8), Inches(2.1), Inches(3.7), Inches(4.7), "⚖️ Compliance & Defense", [
        "Indisputable, time-certified video logs.",
        "Defends against liability and audit fines.",
        "Court-admissible forensic archives.",
        "Automated 30-day retention policies."
    ], card_bg, card_border)
    add_card(s, Inches(8.8), Inches(2.1), Inches(3.7), Inches(4.7), "💰 Infrastructure Economics", [
        "100+ stations per standard COTS server.",
        "Zero datacenter GPU costs.",
        "Zero recurring SaaS subscription traps.",
        "Total perpetual platform sovereignty."
    ], card_bg, accent_blue, accent_blue)

    # Slide 12: Presenter's Live Demo Script
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Presenter's Playbook", "Live Demonstration Script: What to Show Management", 
               "Step-by-step interactive demonstration flow for tomorrow's executive showcase.", accent_gold, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "1. Live Fleet Wall & Silent SSO", [
        "Action: Open browser to dashboard. Show instant login without typing username/password.",
        "Say: 'Notice how the system authenticated my Windows domain credentials silently. We are looking at live fleet streaming in real-time under 300ms latency.'",
        "Action: Highlight station cards and toggle audio solo listening.",
        "Say: 'With 100 stations, operators experience zero lag and zero browser memory issues.'"
    ], card_bg, accent_gold, accent_gold)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "2. Auto-Director, Keystrokes & Sync", [
        "Action: Open multi-screen station in Studio. Toggle Split Screen and PiP modes.",
        "Say: 'The Auto-Director automatically tracks operator focus between screens. We can split, override, or view side-by-side.'",
        "Action: Show keystroke subtitle overlay and scrub multiple synchronized stations.",
        "Say: 'Every keystroke is correlated to the millisecond. All stations are locked to the exact wall clock with No-Signal gap protection.'"
    ], card_bg, accent_cyan, accent_cyan)

    # Slide 13: Conclusion & Roadmap
    s = prs.slides.add_slide(blank_layout)
    set_slide_background(s, bg_dark)
    add_header(s, "Executive Conclusion", "Conclusion: Ready for Mission Deployment", 
               "A mature, battle-tested, high-density platform ready to deliver complete operational assurance.", accent_cyan, bg_dark)
    add_card(s, Inches(0.8), Inches(2.1), Inches(5.6), Inches(4.7), "🌟 Key Strategic Takeaways", [
        "High-Density Fleet Recording: 100+ workstations recorded with < 1% CPU overhead.",
        "Unrivaled Forensic Power: Auto-Director, millisecond keystroke correlation, and gap-proof synchronicity.",
        "Total Sovereignty: 100% air-gapped, zero cloud exposure, and silent Active Directory integration.",
        "Immediate ROI: 90% faster debriefs and permanent defense against compliance penalties.",
        "Production Readiness: Fully verified and ready for operational deployment."
    ], card_bg, accent_cyan, accent_cyan)
    add_card(s, Inches(6.8), Inches(2.1), Inches(5.7), Inches(4.7), "🚀 Proposed Fleet Rollout Stages", [
        "Stage 1: Operational Pilot (Immediate) - Deploy to 15 key consoles in an operational cell to validate live tracking.",
        "Stage 2: Enterprise Fleet Distribution - Automated silent deployment across 70–100+ workstations via central IT tools.",
        "Stage 3: Full Governance Integration - Connect with enterprise Active Directory groups and storage retention policies.",
        "Status: System is fully tested, certified, and ready for immediate deployment."
    ], card_bg, accent_green, accent_green)

    prs.save(output_path)
    print(f"Executive presentation saved successfully to: {output_path}")

if __name__ == "__main__":
    out_dir = os.path.dirname(os.path.abspath(__file__))
    os.makedirs(out_dir, exist_ok=True)
    
    tech_path = os.path.join(out_dir, "ITB_SCREEN_RECORDER_Technical_Architecture.pptx")
    exec_path = os.path.join(out_dir, "ITB_SCREEN_RECORDER_Executive_Management.pptx")

    create_technical_presentation(tech_path)
    create_executive_presentation(exec_path)
    print("Both presentations successfully generated in PPTX format!")

