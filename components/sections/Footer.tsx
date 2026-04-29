export default function Footer({ name }: { name: string }) {
  return (
    <div className="py-2 mb-3 mt-1 text-center text-m text-slate-500">
      <p>
        {name} © 2026 · <a href="https://github.com/kingazm/kingazmuda.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">GitHub</a>
      </p>
    </div>
  );
}