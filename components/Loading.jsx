export default function Loading({ color = "border-white", es = null }) {
  return (
    <div className="flex items-center justify-center my-1">
      <div className={`w-4 h-4 border-2 ${color} border-t-transparent rounded-full animate-spin ${es}`}></div>
    </div>
  );
}
