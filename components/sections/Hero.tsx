import { Personal } from "@/types";

export default function Hero({ name, title, shortDescription }: Omit<Personal, "socials" | "longDescription">) {
  return (
    <div className="mb-12">
        <h1 className="text-6xl font-bold mb-2">{name}</h1>
        <p className="text-2xl font-medium mb-4 text-[#4F8EF7]">{title}</p>                                                                                
        <p className="text-l text-slate-400">{shortDescription}</p>
    </div>
  );
}
