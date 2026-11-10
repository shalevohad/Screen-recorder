import { useState, useEffect } from 'react';
import './styles/_serverRestartModal.scss';

export default function ServerRestartModal({ restartState }) {
    const active = Boolean(restartState && restartState.active);
    const newPort = restartState?.newPort;
    const oldPort = restartState?.oldPort;
    const targetUrl = restartState?.targetUrl || '';
    const initialCountdown = restartState?.countdown || 5;

    const [countdown, setCountdown] = useState(initialCountdown);

    useEffect(() => {
        if (!active) return;
        setCountdown(initialCountdown);
    }, [active, initialCountdown]);

    useEffect(() => {
        if (!active) return;

        if (countdown <= 0) {
            window.location.href = targetUrl;
            return;
        }

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    window.location.href = targetUrl;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [active, countdown, targetUrl]);

    if (!active) return null;

    return (
        <div className="server-restart-overlay">
            <div className="server-restart-modal">
                <div className="restart-pulse-ring">
                    <div className="radar-circle" />
                    <div className="radar-sweep" />
                    <span className="countdown-number">{countdown}</span>
                </div>

                <div className="restart-header">
                    <span className="tactical-badge amber">SERVICE RESTART IN PROGRESS</span>
                    <h3>Server Restart & Port Rebinding</h3>
                    <p className="restart-desc">
                        Kestrel listening port updated successfully. The server service is restarting now to apply network configuration changes.
                    </p>
                </div>

                <div className="port-transition-panel">
                    <div className="port-box old">
                        <span className="port-label">Current Port</span>
                        <span className="port-value">{oldPort || '5090'}</span>
                    </div>
                    <div className="port-arrow">➔</div>
                    <div className="port-box new">
                        <span className="port-label">New Active Port</span>
                        <span className="port-value">{newPort}</span>
                    </div>
                </div>

                <div className="target-url-preview">
                    <span className="url-label">New Target Address:</span>
                    <a href={targetUrl} className="target-link">
                        {targetUrl}
                    </a>
                </div>

                <div className="restart-actions">
                    <button
                        type="button"
                        className="btn-redirect-now"
                        onClick={() => { window.location.href = targetUrl; }}
                    >
                        <span>Navigate to New Address ({countdown}s)</span>
                        <span className="btn-icon">⚡</span>
                    </button>
                </div>

                <div className="restart-footer-note">
                    Active recording agents will automatically detect the updated port and continue streaming without data loss.
                </div>
            </div>
        </div>
    );
}
