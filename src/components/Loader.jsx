export default function Loader() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: '1.5rem',
      }}
    >
      {/* Spinning ring */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          border: '3px solid var(--border)',
          borderTopColor: 'var(--gold)',
          animation: 'spin-slow 1s linear infinite',
        }}
      />
      <p style={{ color: 'var(--text-muted)', fontFamily: "'Playfair Display', serif", fontSize: '1rem', letterSpacing: '0.1em' }}>
        East Perfumes
      </p>
    </div>
  );
}
