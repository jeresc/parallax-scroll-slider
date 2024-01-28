"use client";
import Image from "next/image";
import { useTransform, useScroll, motion, MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { useDimensions } from "@/hooks/useDimensions";

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
];

export default function Home() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const { height } = useDimensions();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e: unknown) => {
      console.log(e);
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main>
      <div className="h-[100vh]" />
      <section
        ref={container}
        className="h-[175vh] flex gap-[2vw] p-[2vw] bg-[#121212] overflow-hidden"
      >
        <Column images={[images[0], images[1], images[2]]} y={y1} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </section>
      <div className="h-[100vh]" />
    </main>
  );
}

function Column({
  images,
  y,
}: {
  images: string[];
  y?: MotionValue<number> | 0;
}) {
  return (
    <motion.div
      className="w-1/4 h-full flex flex-col gap-[2vw] min-w-[250px] relative first-of-type:-top-[45%] [&:nth-of-type(2)]:-top-[95%] [&:nth-of-type(3)]:-top-[45%] [&:nth-of-type(4)]:-top-3/4"
      style={{ y }}
    >
      {images.map((src, index) => {
        return (
          <figure
            key={index}
            className="relative h-full w-full rounded-[1vw] overflow-hidden"
          >
            <Image
              src={`/images/${src}`}
              alt={`image ${index}`}
              fill
              className="object-cover"
            />
          </figure>
        );
      })}
    </motion.div>
  );
}
