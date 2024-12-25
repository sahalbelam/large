export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
      <div>
        <div className="flex justify-center">
          <div className="border-t-4 border-b-4 border-white rounded-full w-12 h-12 animate-spin"></div>
        </div>
        <p className="mt-4 text-lg">Loading your blogs...</p>
      </div>
    </div>
  );
}
