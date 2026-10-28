/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef, useState } from 'react';
import { audioSoloReducer, INITIAL_AUDIO_SOLO_STATE } from '../utils/topologyLayout';

const AudioSoloContext = createContext({
    activeAudioStationIds: [],
    activeAudioStationId: null,
    audioVolume: 0.8,
    isGlobalMuted: false,
    activeAudioStream: null,
    activeAudioStreams: [],
    toggleAudioSolo: () => {},
    muteStation: () => {},
    setAudioVolume: () => {},
    toggleGlobalMute: () => {},
    stopAudioSolo: () => {},
    registerStationStream: () => {},
    unregisterStationStream: () => {},
    isListeningStation: () => false
});

export function AudioSoloProvider({ children }) {
    const [state, dispatch] = useReducer(audioSoloReducer, INITIAL_AUDIO_SOLO_STATE);
    const streamsMapRef = useRef(new Map());
    const [activeAudioStream, setActiveAudioStream] = useState(null);
    const [activeAudioStreams, setActiveAudioStreams] = useState([]);

    const updateActiveStreams = useCallback((stationIds) => {
        if (!stationIds || stationIds.length === 0) {
            setActiveAudioStream(null);
            setActiveAudioStreams([]);
        } else {
            const streams = stationIds
                .map(id => streamsMapRef.current.get(id))
                .filter(Boolean);
            setActiveAudioStreams(streams);
            setActiveAudioStream(streams[streams.length - 1] || null);
        }
    }, []);

    const toggleAudioSolo = useCallback((stationId) => {
        dispatch({ type: 'TOGGLE_SOLO', stationId });
    }, []);

    const muteStation = useCallback((stationId) => {
        dispatch({ type: 'MUTE_STATION', stationId });
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
        if ((state.activeAudioStationIds || []).includes(stationId)) {
            updateActiveStreams(state.activeAudioStationIds);
        }
    }, [state.activeAudioStationIds, updateActiveStreams]);

    const unregisterStationStream = useCallback((stationId) => {
        if (!stationId) return;
        streamsMapRef.current.delete(stationId);
        if ((state.activeAudioStationIds || []).includes(stationId)) {
            updateActiveStreams(state.activeAudioStationIds);
        }
    }, [state.activeAudioStationIds, updateActiveStreams]);

    useEffect(() => {
        updateActiveStreams(state.activeAudioStationIds);
    }, [state.activeAudioStationIds, updateActiveStreams]);

    const isListeningStation = useCallback((stationId) => {
        if (!stationId || state.isGlobalMuted) return false;
        return (state.activeAudioStationIds || []).includes(stationId);
    }, [state.activeAudioStationIds, state.isGlobalMuted]);

    // Hotkey listener: 'M' or 'm' toggles mute for active audio solo sink
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                return;
            }
            if ((e.key === 'm' || e.key === 'M') && !e.ctrlKey && !e.altKey && !e.metaKey) {
                if ((state.activeAudioStationIds || []).length > 0) {
                    e.preventDefault();
                    toggleGlobalMute();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [state.activeAudioStationIds, toggleGlobalMute]);

    return (
        <AudioSoloContext.Provider
            value={{
                activeAudioStationIds: state.activeAudioStationIds || [],
                activeAudioStationId: state.activeAudioStationId,
                audioVolume: state.audioVolume,
                isGlobalMuted: state.isGlobalMuted,
                activeAudioStream,
                activeAudioStreams,
                toggleAudioSolo,
                muteStation,
                setAudioVolume,
                toggleGlobalMute,
                stopAudioSolo,
                registerStationStream,
                unregisterStationStream,
                isListeningStation
            }}
        >
            {children}
        </AudioSoloContext.Provider>
    );
}

export function useAudioSolo() {
    return useContext(AudioSoloContext);
}
