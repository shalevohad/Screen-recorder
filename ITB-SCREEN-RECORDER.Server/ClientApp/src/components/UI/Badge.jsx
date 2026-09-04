import { memo } from 'react';
import './Badge.scss';

export const Badge = memo(function Badge({
    children,
    variant = 'neutral',
    pulse = false,
    icon: Icon = null,
    className = '',
    ariaLabel,
    ...rest
}) {
    return (
        <span
            className={`c2-badge c2-badge--${variant} ${className}`.trim()}
            role="status"
            aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
            {...rest}
        >
            {pulse && <span className="c2-badge__pulse-dot" aria-hidden="true" />}
            {Icon && <Icon className="c2-badge__icon" aria-hidden="true" />}
            <span className="c2-badge__content">{children}</span>
        </span>
    );
});

export default Badge;