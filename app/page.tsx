'use client';
import BlefadorApp from "./BlefadorApp";
import dynamic from "next/dynamic";

const SWUpdate = dynamic(() => import('./components/SWUpdate'), { ssr: false });

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <BlefadorApp />
      <SWUpdate />
    </div>
  );
}
