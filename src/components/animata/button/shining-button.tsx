import { ArrowRight } from "lucide-react";

import { cn } from "@/libs/utils";
import React from "react";

export default function ShiningButton({ children }: { children: React.ReactNode }) {

  return (
    <button className="group cursor-pointer rounded-xl border-4 border-indigo-800 border-opacity-0 bg-transparent p-1 transition-all duration-500">
      <div className="relative flex items-center justify-center gap-4 overflow-hidden rounded-3xl bg-indigo-300 text-gray-800 px-6 py-3 font-bold">
        {children}
        <ArrowRight className="transition-all group-hover:translate-x-2 group-hover:scale-125" />
        <div
          className={cn(
            "absolute -left-16 top-0 h-full w-12 rotate-[30deg] scale-y-150 bg-white/30 transition-all duration-700 group-hover:left-[calc(100%+1rem)]",
          )}
        />
      </div>
    </button>
  );
}
