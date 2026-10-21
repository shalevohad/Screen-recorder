import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { audioSoloReducer, INITIAL_AUDIO_SOLO_STATE } from '../utils/topologyLayout';

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
    const [state, dispatch] = useReducer(audioSoloReducer, INITIAL_AUDIO_SOLO_STATE);

    const toggleAudioSolo = useCallback((stationId) => {
        dispatch({ type: 'TOGGLE_SOLO', stationId });
    }, []);

    const stopAudioSolo = useCallback(() => {
        dispatch({ type: 'STOP_SOLO' });
    }, []);

    const toggleGlobalMute = useCallback(() => {
        dispatch({ type: 'TOGGLE_GLOBAL_MUTE' });
    }, []);

    const setAudioVolume = useCallback((volume) => {
        dispatch({ type: 'SET_VOLUME', volume });
    }, []);

    // Hotkey listener: 'M' or 'm' toggles mute for active audio solo sink
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                return;
            }
            if ((e.key === 'm' || e.key === 'M') && !e.ctrlKey && !e.altKey && !e.metaKey) {
                if (state.activeAudioStationId) {
                    e.preventDefault();
                    toggleGlobalMute();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [state.activeAudioStationId, toggleGlobalMute]);

    return (
        <AudioSoloContext.Provider
            value={{
                activeAudioStationId: state.activeAudioStationId,
                audioVolume: state.audioVolume,
                isGlobalMuted: state.isGlobalMuted,
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
