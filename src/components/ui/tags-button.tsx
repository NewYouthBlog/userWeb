export default function TagsButton({ tagsName }: { tagsName?: string }) {
  return (
    <div className="tag flex items-center px-3 py-1 text-xs font-semibold tracking-wide text-slate-600 bg-slate-100 border border-slate-200 rounded-full shadow-sm hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent transform hover:-translate-y-0.5 transition-all duration-300">
      {tagsName}
    </div>
  );
}
