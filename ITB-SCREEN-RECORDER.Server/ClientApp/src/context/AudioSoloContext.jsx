import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef, useState } from 'react';
import { audioSoloReducer, INITIAL_AUDIO_SOLO_STATE } from '../utils/topologyLayout';

const AudioSoloContext = createContext({
    activeAudioStationId: null,
    audioVolume: 0.8,
    isGlobalMuted: false,
    activeAudioStream: null,
    toggleAudioSolo: () => {},
    setAudioVolume: () => {},
    toggleGlobalMute: () => {},
    stopAudioSolo: () => {},
    registerStationStream: () => {},
    unregisterStationStream: () => {}
});

export function AudioSoloProvider({ children }) {
    const [state, dispatch] = useReducer(audioSoloReducer, INITIAL_AUDIO_SOLO_STATE);
    const streamsMapRef = useRef(new Map());
    const [activeAudioStream, setActiveAudioStream] = useState(null);

    const updateActiveStream = useCallback((stationId) => {
        if (!stationId) {
            setActiveAudioStream(null);
        } else {
            const stream = streamsMapRef.current.get(stationId) || null;
            setActiveAudioStream(stream);
        }
    }, []);

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

    const registerStationStream = useCallback((stationId, stream) => {
        if (!stationId || !stream) return;
        streamsMapRef.current.set(stationId, stream);
        if (state.activeAudioStationId === stationId) {
            setActiveAudioStream(stream);
        }
    }, [state.activeAudioStationId]);

    const unregisterStationStream = useCallback((stationId) => {
        if (!stationId) return;
        streamsMapRef.current.delete(stationId);
        if (state.activeAudioStationId === stationId) {
            setActiveAudioStream(null);
        }
    }, [state.activeAudioStationId]);

    useEffect(() => {
        updateActiveStream(state.activeAudioStationId);
    }, [state.activeAudioStationId, updateActiveStream]);

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
                activeAudioStream,
                toggleAudioSolo,
                setAudioVolume,
                toggleGlobalMute,
                stopAudioSolo,
                registerStationStream,
                unregisterStationStream
            }}
        >
            {children}
        </AudioSoloContext.Provider>
    );
}

export function useAudioSolo() {
    return useContext(AudioSoloContext);
}
