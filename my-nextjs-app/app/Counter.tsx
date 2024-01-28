"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCounter] = useState(0);

  return (
    <div className=" rounded bg-zinc-800 p-8">
      <h1>Hello World</h1>
      <h2 id="test-value" className=" text-center">
        {count}
      </h2>

      <div className="flex items-stretch gap-12">
        <button onClick={() => setCounter(count - 1)} className="flex-1">
          Dec
        </button>
        <button
          id="test-inc"
          onClick={() => setCounter(count + 1)}
          className="flex-1"
        >
          Inc
        </button>
      </div>
    </div>
  );
}
