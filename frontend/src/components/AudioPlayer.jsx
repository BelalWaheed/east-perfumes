import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsPlaying, togglePlay, nextTrack, prevTrack } from '@/redux/slices/audioSlice';
import { FaPlay, FaPause, FaMusic, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function AudioPlayer() {
  const { playlist, currentIndex, isPlaying } = useSelector((s) => s.audio);
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  const currentTrack = playlist[currentIndex];

  // Sync play/pause with the actual audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying && currentTrack) {
      audio.play().catch(() => dispatch(setIsPlaying(false)));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack, dispatch]);

  // Update audio source when track changes
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => dispatch(setIsPlaying(false)));
      }
    }
  }, [currentTrack, isPlaying, dispatch]);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-6 inset-s-6 z-50 animate-in slide-in-from-bottom-4 duration-300 pointer-events-none">
      <audio
        ref={audioRef}
        onEnded={() => dispatch(nextTrack())}
      />
      
      <div className="flex items-center gap-2 pointer-events-auto">
        <div 
          className={`flex items-center gap-2 px-3 py-2 rounded-full shadow-lg backdrop-blur-md border transition-all duration-300 ${
            isPlaying
              ? 'bg-primary/90 text-primary-foreground border-primary/50 shadow-primary/20'
              : 'bg-card/90 text-foreground border-border hover:bg-secondary'
          }`}
        >
          {playlist.length > 1 && (
            <button
              onClick={() => dispatch(prevTrack())}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
              title="Previous Track"
            >
              <FaChevronLeft className="text-[10px]" />
            </button>
          )}

          <button
            onClick={() => dispatch(togglePlay())}
            className="flex items-center gap-2"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            <FaMusic className={`text-xs ${isPlaying ? 'animate-pulse' : ''}`} />
            <span className="text-sm font-medium whitespace-nowrap">
              {isPlaying ? 'Playing' : 'Paused'}
              {playlist.length > 1 && ` (${currentIndex + 1}/${playlist.length})`}
            </span>
            {isPlaying ? (
              <FaPause className="text-[10px]" />
            ) : (
              <FaPlay className="text-[10px]" />
            )}
          </button>

          {playlist.length > 1 && (
            <button
              onClick={() => dispatch(nextTrack())}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
              title="Next Track"
            >
              <FaChevronRight className="text-[10px]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
