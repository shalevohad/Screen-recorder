import StationThumbnail from '../Station/StationThumbnail';
import RemoteWidgetHost from '../UI/RemoteWidgetHost';
import './StationsGridView.scss';

export default function StationsGridView({
    paginatedStations,
    activeInlineFeatures,
    focusedWidgetHost,
    inspectedHostname,
    handleCloseFeature,
    effectiveZoom,
    actionPending,
    onToggleStream,
    setInspectedHostname,
    setFullscreenHostname,
    onQuickBookmark,
    onQuickPlayback,
    handleFeatureQuickExport
}) {
    const cardWidthMap = { 1: '290px', 2: '360px', 3: '450px', 4: '570px', 5: '700px' };

    return (
        <div className="stations-grid-wrapper tight-grid" style={{ '--station-card-width': cardWidthMap[effectiveZoom] }}>
            {activeInlineFeatures.map((feat) => (
                <div key={feat.id} className="station-wrapper-cell feature-tile-slot" style={{ minHeight: '380px', position: 'relative' }}>
                    <RemoteWidgetHost
                        scriptUrl={feat.scriptUrl}
                        widgetProps={{
                            activeHost: focusedWidgetHost || inspectedHostname || paginatedStations[0]?.hostname || 'OHAD-DESKTOP',
                            defaultWindowHours: 24,
                            onClose: () => handleCloseFeature(feat.id)
                        }}
                    />
                </div>
            ))}

            {paginatedStations.map((station) => (
                <div key={station.hostname} className="station-wrapper-cell">
                    <StationThumbnail
                        {...station}
                        bitrate={station.effectiveBitrate || station.bitrate}
                        fps={station.effectiveFps || station.fps}
                        isPending={actionPending[station.hostname]}
                        onToggleStream={(h, s) => {
                            const targetHost = typeof h === 'string' ? h : station.hostname;
                            const targetStream = typeof s === 'boolean' ? s : station.isStreaming;
                            onToggleStream(targetHost, targetStream, {
                                bitrate: station.effectiveBitrate,
                                fps: station.effectiveFps
                            });
                        }}
                        onSelectStation={() => setInspectedHostname(station.hostname)}
                        onOpenFullscreen={() => setFullscreenHostname(station.hostname)}
                        onQuickBookmark={onQuickBookmark}
                        onQuickPlayback={onQuickPlayback}
                        onQuickExport={handleFeatureQuickExport}
                    />
                </div>
            ))}
        </div>
    );
}