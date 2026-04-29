import { ExperienceEntry } from "@/types";

export default function ExperienceCard({ position, company, start, end, description }: ExperienceEntry) {
    return (
        <div className="mb-6 rounded-lg bg-[#1A2035] p-4 transition-transform hover:scale-102">
            <div className="mb-1 flex items-center justify-between">
                <h3 className="text-lg font-bold">{position}</h3>
                <p className="text-slate-500">{start} - {end}</p>
            </div>
            <p className="text-slate-400 font-bold mb-1">{company}</p>
            <p className="text-sm text-slate-400">{description}</p>
        </div>  
    );
}
