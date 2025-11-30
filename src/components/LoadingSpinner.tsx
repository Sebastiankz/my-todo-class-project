export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-violet-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-violet-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
      </div>
    </div>
  );
}
