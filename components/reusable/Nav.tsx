export default function Nav() {
  return (
    <nav className="hidden sm:block py-2 mb-6 text-xl text-slate-400">
      <ul>
        <li className="mb-1"><a href="#about" className="text-slate-300 hover:text-white">About</a></li>
        <li className="mb-1"><a href="#experience" className="text-slate-300 hover:text-white">Experience</a></li>
        <li className="mb-1"><a href="#projects" className="text-slate-300 hover:text-white">Projects</a></li>
      </ul>
    </nav>
  );
}