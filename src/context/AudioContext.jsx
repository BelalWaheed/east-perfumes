import { createContext, useContext, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsPlaying } from '@/redux/slices/audioSlice';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const audioRef = useRef(new Audio());
  const dispatch = useDispatch();
  const { audioUrl, isPlaying } = useSelector((s) => s.audio);

  // When audioUrl changes, swap the source
  useEffect(() => {
    const audio = audioRef.current;
    if (audioUrl) {
      audio.src = audioUrl;
      audio.load();
      if (isPlaying) {
        audio.play().catch(() => dispatch(setIsPlaying(false)));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl]);

  // When isPlaying changes, play or pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audioUrl) return;
    if (isPlaying) {
      audio.play().catch(() => dispatch(setIsPlaying(false)));
    } else {
      audio.pause();
    }
  }, [isPlaying, audioUrl, dispatch]);

  // Sync ended event
  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => dispatch(setIsPlaying(false));
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [dispatch]);

  return (
    <AudioContext.Provider value={audioRef}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
