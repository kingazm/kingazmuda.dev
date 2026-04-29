import { SocialLink } from "@/types";

export default function Socials({ links }: { links: SocialLink[] }) {
  return (
    <div className="flex space-x-4 mt-16 mb-10">
      {links.map((link, idx) => (
        <div key={idx} className="w-8 h-8 transition-transform hover:scale-110">
            <a href={link.url} target="_blank" rel="noopener noreferrer">
                <img 
                    src={`https://skillicons.dev/icons?i=${link.platform.toLowerCase()}`} 
                    alt={link.url}
                />
            </a>
        </div>
      ))}
    </div>
  );
}
