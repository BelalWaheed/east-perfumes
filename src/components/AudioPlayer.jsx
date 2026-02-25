import { useSelector, useDispatch } from 'react-redux';
import { togglePlay } from '@/redux/slices/audioSlice';
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa';

export default function AudioPlayer() {
  const { audioUrl, isPlaying } = useSelector((s) => s.audio);
  const dispatch = useDispatch();

  if (!audioUrl) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.35rem 0.75rem',
        background: 'var(--gold-glow)',
        border: '1px solid var(--gold)',
        borderRadius: '99px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onClick={() => dispatch(togglePlay())}
      title={isPlaying ? 'Pause audio' : 'Play audio'}
    >
      <FaMusic style={{ color: 'var(--gold)', fontSize: '0.7rem' }} />
      <span style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 500 }}>
        {isPlaying ? 'Playing' : 'Paused'}
      </span>
      {isPlaying ? (
        <FaPause style={{ color: 'var(--gold)', fontSize: '0.7rem' }} />
      ) : (
        <FaPlay style={{ color: 'var(--gold)', fontSize: '0.7rem' }} />
      )}
    </div>
  );
}
