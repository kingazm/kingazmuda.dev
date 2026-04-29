"use client";

import { useEffect, useRef, useState } from "react";
import { TerminalEntry, TerminalCommand } from "@/types";
import commands from "@/data/commands.json";

const COMMAND_DELAY = 40;
const OUTPUT_DELAY = 10;
const LINE_PAUSE = 400;

type ScriptLine = { type: "command" | "output" | "empty"; text: string };

function buildScript(entries: TerminalEntry[]): ScriptLine[] {
    const lines: ScriptLine[] = [];
    for (const entry of entries) {
        lines.push({ type: "command", text: entry.command });
        lines.push({ type: "empty",   text: "" });
        lines.push({ type: "output",  text: entry.output });
        lines.push({ type: "empty",   text: "" });
    }
    return lines;
}

export default function About({ aboutScript }: { aboutScript: TerminalEntry[] }) {
    const script = buildScript(aboutScript);

    const [completed, setCompleted] = useState<string[]>([]);
    const [current, setCurrent] = useState("");
    const [done, setDone] = useState(false);
    const [active, setActive] = useState(false);
    const [input, setInput] = useState("");
    const [version, setVersion] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let cancelled = false;
        const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

        setCompleted([]);
        setCurrent("");
        setDone(false);

        async function run() {
            for (const line of script) {
                if (cancelled) return;
                if (line.type === "empty") {
                    setCompleted(prev => [...prev, ""]);
                    await sleep(LINE_PAUSE / 2);
                    continue;
                }
                const prefix = line.type === "command" ? "> " : "";
                const full = prefix + line.text;
                const delay = line.type === "command" ? COMMAND_DELAY : OUTPUT_DELAY;
                for (let i = 0; i <= full.length; i++) {
                    if (cancelled) return;
                    setCurrent(full.slice(0, i));
                    await sleep(delay);
                }
                setCompleted(prev => [...prev, full]);
                setCurrent("");
                await sleep(LINE_PAUSE);
            }
            setDone(true);
        }

        run();
        return () => { cancelled = true; };
    }, [version]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [completed, current]);

    useEffect(() => {
        if (!active) return;
        const handler = (e: KeyboardEvent) => {
            e.preventDefault();
            if (e.key === "Enter") {
                const cmd = input.trim().toLowerCase();
                setCompleted(prev => [...prev, `> ${input}`]);
                if (cmd === "clear") {
                    setInput("");
                    setVersion(v => v + 1);
                    return;
                }
                const matched = (commands as TerminalCommand[]).find(c =>
                    c.partial ? cmd.startsWith(c.command) : cmd === c.command
                );
                if (matched) {
                    setCompleted(prev => [...prev, matched.response]);
                    if (matched.navigate) {
                        setTimeout(() => {
                            document.getElementById(matched.navigate!)?.scrollIntoView({ behavior: "smooth" });
                        }, 500);
                    }
                    if (matched.url) {
                        setTimeout(() => window.open(matched.url, "_blank"), 500);
                    }
                } else if (cmd.startsWith("cat ")) {
                    setCompleted(prev => [...prev, `cat: ${cmd.slice(4)}: No such file or directory`]);
                } else if (cmd !== "") {
                    setCompleted(prev => [...prev, `command not found: ${cmd}`]);
                }
                setCompleted(prev => [...prev, ""]);
                setInput("");
            } else if (e.key === "Backspace") {
                setInput(prev => prev.slice(0, -1));
            } else if (e.key.length === 1) {
                setInput(prev => prev + e.key);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [active, input]);

    return (
        <div
            className="hidden lg:block rounded-lg overflow-hidden font-mono text-sm bg-[#080d18] cursor-text outline-none transition-transform hover:scale-102"
            onClick={() => setActive(true)}
            onBlur={() => setActive(false)}
            tabIndex={0}
        >
            <div className="flex items-center gap-2 bg-[#131c2e] px-4 py-3">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-slate-500">kinga@about ~ %</span>
            </div>
            <div ref={scrollRef} className="p-6 leading-relaxed h-80 overflow-y-auto">
                {completed.map((line, i) => (
                    <div key={i} className={line.startsWith(">") ? "text-[#4F8EF7]" : "text-slate-400"}>
                        {line || " "}
                    </div>
                ))}
                {!done && (
                    <div className={current.startsWith(">") ? "text-[#4F8EF7]" : "text-slate-400"}>
                        {current}<span className="cursor-blink">▋</span>
                    </div>
                )}
                {done && (
                    <div className="text-[#4F8EF7]">
                        &gt; {input}<span className="cursor-blink">▋</span>
                    </div>
                )}
            </div>
        </div>
    );
}
