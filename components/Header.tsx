import { Terminal } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-concrete bg-paper">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center bg-carbon text-paper px-2 py-1">
             <span className="font-mono text-xs font-bold tracking-widest">REF.HUNTRILL</span>
          </div>
          <h1 className="font-sans text-lg font-bold tracking-tighter text-carbon">
            REPLICA
          </h1>
        </div>

        <div className="flex items-center gap-4">
            <span className="hidden font-mono text-xs text-concrete md:block">
                VER.2.0 // EST.2025
            </span>
            <div className="h-2 w-2 animate-pulse bg-signal"></div>
        </div>
      </div>
    </header>
  );
}