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
                    <h3>אתחול שרת והחלת פורט חדש</h3>
                    <p className="restart-desc">
                        פורט האזנה של שרת Kestrel עודכן בהצלחה. השירות מופעל מחדש כעת כדי להחיל את השינוי ברשת.
                    </p>
                </div>

                <div className="port-transition-panel">
                    <div className="port-box old">
                        <span className="port-label">פורט נוכחי</span>
                        <span className="port-value">{oldPort || '5090'}</span>
                    </div>
                    <div className="port-arrow">➔</div>
                    <div className="port-box new">
                        <span className="port-label">פורט חדש פעיל</span>
                        <span className="port-value">{newPort}</span>
                    </div>
                </div>

                <div className="target-url-preview">
                    <span className="url-label">כתובת יעד חדשה:</span>
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
                        <span>עבור כעת לכתובת החדשה ({countdown}s)</span>
                        <span className="btn-icon">⚡</span>
                    </button>
                </div>

                <div className="restart-footer-note">
                    עמדות ההקלטה (Agents) יזהו אוטומטית את הפורט החדש וימשיכו בהזרמת הווידאו ללא איבוד מידע.
                </div>
            </div>
        </div>
    );
}
