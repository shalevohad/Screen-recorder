import './CyberLoadingOverlay.scss';

export default function CyberLoadingOverlay({ text = "CONNECTING", size = "small" }) {
    return (
        <div className="cyber-loading-overlay">
            <div className={`cyber-spinner ${size}`}></div>
            <span className={`loading-text ${size}`}>{text}</span>
        </div>
    );
}