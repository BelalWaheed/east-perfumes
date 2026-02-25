import { createSlice } from '@reduxjs/toolkit';

const audioSlice = createSlice({
  name: 'audio',
  initialState: {
    audioUrl: '',
    isPlaying: false,
  },
  reducers: {
    setAudioUrl: (state, action) => { state.audioUrl = action.payload; },
    setIsPlaying: (state, action) => { state.isPlaying = action.payload; },
    togglePlay: (state) => { state.isPlaying = !state.isPlaying; },
  },
});

export const { setAudioUrl, setIsPlaying, togglePlay } = audioSlice.actions;
export const audio = audioSlice.reducer;
