import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
    INITIAL_AUDIO_SOLO_STATE,
    audioSoloReducer
} from '../utils/topologyLayout.js';

describe('Audio Solo Exclusive Sink State Machine', () => {
    it('has expected initial state with no active station and unmuted', () => {
        assert.equal(INITIAL_AUDIO_SOLO_STATE.activeAudioStationId, null);
        assert.equal(INITIAL_AUDIO_SOLO_STATE.audioVolume, 0.8);
        assert.equal(INITIAL_AUDIO_SOLO_STATE.isGlobalMuted, false);
    });

    it('activates listening to station-1 and unmutes', () => {
        const state1 = audioSoloReducer(INITIAL_AUDIO_SOLO_STATE, {
            type: 'TOGGLE_SOLO',
            stationId: 'station-01'
        });

        assert.equal(state1.activeAudioStationId, 'station-01');
        assert.equal(state1.isGlobalMuted, false);
    });

    it('enforces exclusive single-station radio intercom: switching to station-2 silences station-1', () => {
        const state1 = {
            activeAudioStationId: 'station-01',
            audioVolume: 0.8,
            isGlobalMuted: false
        };

        const state2 = audioSoloReducer(state1, {
            type: 'TOGGLE_SOLO',
            stationId: 'station-02'
        });

        assert.equal(state2.activeAudioStationId, 'station-02');
        assert.notEqual(state2.activeAudioStationId, 'station-01');
    });

    it('toggling the same active station stops audio listening', () => {
        const state1 = {
            activeAudioStationId: 'station-01',
            audioVolume: 0.8,
            isGlobalMuted: false
        };

        const state2 = audioSoloReducer(state1, {
            type: 'TOGGLE_SOLO',
            stationId: 'station-01'
        });

        assert.equal(state2.activeAudioStationId, null);
    });

    it('STOP_SOLO clears active station', () => {
        const state1 = {
            activeAudioStationId: 'station-ops',
            audioVolume: 0.8,
            isGlobalMuted: false
        };

        const state2 = audioSoloReducer(state1, { type: 'STOP_SOLO' });
        assert.equal(state2.activeAudioStationId, null);
    });

    it('TOGGLE_GLOBAL_MUTE toggles mute state without losing active station', () => {
        const state1 = {
            activeAudioStationId: 'station-ops',
            audioVolume: 0.8,
            isGlobalMuted: false
        };

        const stateMuted = audioSoloReducer(state1, { type: 'TOGGLE_GLOBAL_MUTE' });
        assert.equal(stateMuted.activeAudioStationId, 'station-ops');
        assert.equal(stateMuted.isGlobalMuted, true);

        const stateUnmuted = audioSoloReducer(stateMuted, { type: 'TOGGLE_GLOBAL_MUTE' });
        assert.equal(stateUnmuted.isGlobalMuted, false);
    });

    it('SET_VOLUME clamps volume between 0.0 and 1.0', () => {
        const state1 = audioSoloReducer(INITIAL_AUDIO_SOLO_STATE, {
            type: 'SET_VOLUME',
            volume: 0.45
        });
        assert.equal(state1.audioVolume, 0.45);

        const stateOver = audioSoloReducer(INITIAL_AUDIO_SOLO_STATE, {
            type: 'SET_VOLUME',
            volume: 1.5
        });
        assert.equal(stateOver.audioVolume, 1.0);

        const stateUnder = audioSoloReducer(INITIAL_AUDIO_SOLO_STATE, {
            type: 'SET_VOLUME',
            volume: -0.2
        });
        assert.equal(stateUnder.audioVolume, 0.0);
    });
});
