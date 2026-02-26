import { createContext, useContext, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsPlaying, nextTrack } from '@/redux/slices/audioSlice';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const audioRef = useRef(new Audio());
  const dispatch = useDispatch();
  const { playlist, currentIndex, isPlaying } = useSelector((s) => s.audio);
  const audioUrl = playlist[currentIndex] || null;

  // When audioUrl changes, swap the source
  useEffect(() => {
    const audio = audioRef.current;
    if (audioUrl) {
      audio.src = audioUrl;
      audio.load();
      if (isPlaying) {
        audio.play().catch(() => dispatch(setIsPlaying(false)));
      }
    } else {
      // No track — stop and clear
      audio.pause();
      audio.src = '';
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl]);

  // When isPlaying changes, play or pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audioUrl) {
      audio.pause();
      return;
    }
    if (isPlaying) {
      audio.play().catch(() => dispatch(setIsPlaying(false)));
    } else {
      audio.pause();
    }
  }, [isPlaying, audioUrl, dispatch]);

  // Sync ended event — advance to next track or stop
  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => {
      if (playlist.length > 1) {
        dispatch(nextTrack());
      } else {
        dispatch(setIsPlaying(false));
      }
    };
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [dispatch, playlist.length]);

  return (
    <AudioContext.Provider value={audioRef}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
