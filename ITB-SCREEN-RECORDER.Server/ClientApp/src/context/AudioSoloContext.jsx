import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AudioSoloContext = createContext({
    activeAudioStationId: null,
    audioVolume: 0.8,
    isGlobalMuted: false,
    toggleAudioSolo: () => {},
    setAudioVolume: () => {},
    toggleGlobalMute: () => {},
    stopAudioSolo: () => {}
});

export function AudioSoloProvider({ children }) {
    const [activeAudioStationId, setActiveAudioStationId] = useState(null);
    const [audioVolume, setAudioVolume] = useState(0.8);
    const [isGlobalMuted, setIsGlobalMuted] = useState(false);

    const toggleAudioSolo = useCallback((stationId) => {
        if (!stationId) {
            setActiveAudioStationId(null);
            return;
        }

        setActiveAudioStationId(current => {
            if (current === stationId) {
                return null;
            }
            setIsGlobalMuted(false);
            return stationId;
        });
    }, []);

    const stopAudioSolo = useCallback(() => {
        setActiveAudioStationId(null);
    }, []);

    const toggleGlobalMute = useCallback(() => {
        setIsGlobalMuted(m => !m);
    }, []);

    // Hotkey listener: 'M' or 'm' toggles mute for active audio solo sink
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                return;
            }
            if ((e.key === 'm' || e.key === 'M') && !e.ctrlKey && !e.altKey && !e.metaKey) {
                if (activeAudioStationId) {
                    e.preventDefault();
                    toggleGlobalMute();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeAudioStationId, toggleGlobalMute]);

    return (
        <AudioSoloContext.Provider
            value={{
                activeAudioStationId,
                audioVolume,
                isGlobalMuted,
                toggleAudioSolo,
                setAudioVolume,
                toggleGlobalMute,
                stopAudioSolo
            }}
        >
            {children}
        </AudioSoloContext.Provider>
    );
}

export function useAudioSolo() {
    return useContext(AudioSoloContext);
}
