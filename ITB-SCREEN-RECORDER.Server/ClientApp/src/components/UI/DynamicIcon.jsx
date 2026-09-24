export default function DynamicIcon({ name, size = 20, className = '' }) {
    const renderIcon = () => {
        switch (name) {
            case 'Film':
                return (
                    <>
                        <rect x="2" y="2" width="20" height="20" rx="2.2" />
                        <line x1="7" y1="2" x2="7" y2="22" />
                        <line x1="17" y1="2" x2="17" y2="22" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <line x1="2" y1="7" x2="7" y2="7" />
                        <line x1="2" y1="17" x2="7" y2="17" />
                        <line x1="17" y1="17" x2="22" y2="17" />
                        <line x1="17" y1="7" x2="22" y2="7" />
                    </>
                );

            case 'Activity':
                return <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />;

            case 'HardDrive':
                return (
                    <>
                        <line x1="22" y1="12" x2="2" y2="12" />
                        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                        <line x1="6" y1="16" x2="6.01" y2="16" />
                        <line x1="10" y1="16" x2="10.01" y2="16" />
                    </>
                );

            default:
                // Grid / Module Fallback
                return (
                    <>
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                    </>
                );
        }
    };

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            width={size}
            height={size}
            className={className}
        >
            {renderIcon()}
        </svg>
    );
}