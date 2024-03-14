"use client";

import { useInView } from "react-intersection-observer";
import clsx from "./lib/clsx";

export default function Home() {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.97,
  });

  console.log(inView);

  return (
    <main className="relative bg-white">
      <header
        className={clsx(
          "container fixed left-0 right-0 top-0 mx-auto flex justify-between px-8 py-6 text-black transition",
          {
            "text-white": inView,
          },
        )}
      >
        <div className="font-medium">Riccardo Sacco</div>
        <div className="font-medium">riccardo.sacco@itweb.dev</div>
        <div className="font-medium">1/10</div>
      </header>
      <section className="flex h-[100svh]">
        <div className="container mx-auto flex flex-col justify-center gap-40 px-8 py-6">
          <div className="text-7xl">{`Hey, I'm Riccardo Sacco.`}</div>
          <div className="text-7xl font-medium leading-tight">
            A Full Stack Developer from Italy,
            <br /> working from Switzerland
          </div>
        </div>
      </section>
      <section ref={ref} className="flex h-[100svh] bg-black">
        <div className="container mx-auto flex flex-col justify-end px-8 py-6 text-white">
          <div className="text-9xl font-medium leading-tight">
            Developer
            <br />
            Portfolio
          </div>
        </div>
      </section>
    </main>
  );
}
