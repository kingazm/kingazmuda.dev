import SectionHeader from "../reusable/SectionHeader";

export default function About({ longDescription }: { longDescription: string }) {
  return (
    <div>
      <p className="hidden sm:block text-l text-slate-400">{longDescription}</p>
    </div>
  );
}
