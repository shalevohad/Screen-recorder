import React from 'react';
import './GapsTable.scss';

export default function GapsTable({ gaps, timeMode }) {
    if (!gaps || gaps.length === 0) return null;

    const isUtc = timeMode === 'UTC';
    const formatTimestamp = (utcIso) => {
        const d = new Date(utcIso);
        return isUtc
            ? d.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour12: false })
            : d.toLocaleTimeString('en-GB', { hour12: false });
    };

    return (
        <div className="gaps-compact-card">
            <table className="gaps-table">
                <thead>
                    <tr>
                        <th>STATION</th>
                        <th>EXPECTED ({timeMode})</th>
                        <th>RESUMED ({timeMode})</th>
                        <th>GAP DURATION</th>
                    </tr>
                </thead>
                <tbody>
                    {gaps.map((g, idx) => (
                        <tr key={idx}>
                            <td className="host-col">{g.hostname}</td>
                            <td>{formatTimestamp(g.expectedUtc)}</td>
                            <td>{formatTimestamp(g.actualNextStartUtc)}</td>
                            <td className="gap-len-col">
                                <span className="gap-pill">
                                    {g.gapDuration?.split?.('.')[0] || g.gapDuration}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}