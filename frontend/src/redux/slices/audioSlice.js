import { createSlice } from '@reduxjs/toolkit';

const audioSlice = createSlice({
  name: 'audio',
  initialState: {
    playlist: [], // Array of URLs
    currentIndex: 0,
    isPlaying: false,
  },
  reducers: {
    setPlaylist: (state, action) => {
      const list = Array.isArray(action.payload) ? action.payload : action.payload ? [action.payload] : [];
      state.playlist = list;
      state.currentIndex = 0;
      if (list.length > 0) {
        state.isPlaying = true;
      }
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    nextTrack: (state) => {
      if (state.playlist.length === 0) return;
      state.currentIndex = (state.currentIndex + 1) % state.playlist.length;
    },
    prevTrack: (state) => {
      if (state.playlist.length === 0) return;
      state.currentIndex = (state.currentIndex - 1 + state.playlist.length) % state.playlist.length;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const { setPlaylist, setCurrentIndex, nextTrack, prevTrack, setIsPlaying, togglePlay } = audioSlice.actions;
export const audio = audioSlice.reducer;
