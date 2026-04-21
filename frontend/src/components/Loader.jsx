export default function Loader({ message = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-16 h-16 border-4 border-primary border-dashed rounded-full animate-spin"></div>
        <p className="text-xl font-semibold animate-pulse text-foreground">
          {message}
        </p>
      </div>
    </div>
  );
}
