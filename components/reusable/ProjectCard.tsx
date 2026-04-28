import { Project } from "@/types";

export default function ProjectCard({ name, description, link, stack }: Project) {
    return (
        <div className="mb-6 rounded-lg border border-slate-700 p-4 bg-[#1A2035] transition-transform hover:scale-102">
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-slate-400">{description}</p>
            {stack && stack.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2 mb-2 w-6 h-6">
                    {stack.map((tech, idx) => (
                        <div key={idx} className="w-8 h-8">
                            <img src={`https://skillicons.dev/icons?i=${tech.toLowerCase()}`} alt={tech} />
                        </div>
                    ))}
                </div>
            )}
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-[#4F8EF7] hover:text--blue-700 transition-colors">
                View Project
            </a>
        </div>
    );
}
