"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="mx-auto z-[999] w-full sm:px-6 bg-white py-14 border-t border-foreground/10 sm:mt-10"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8 w-full z-[999] max-w-7xl px-4 mx-auto">
        <div className="mx-0 flex max-w-xs flex-col items-start justify-start ">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={"/logo.jpg"}
              alt={`Datareel Logo`}
              priority
              width={2250}
              height={800}
              className="h-12 w-auto object-contain md:h-16"
            />
          </Link>
          <p className="ml-3 font-medium tracking-tight text-foreground/70">
            Unlock next-gen communication with AI-driven insights and
            personalized experiences.
          </p>
        </div>
        <Link
          className="flex items-center justify-center w-fit h-fit text-white rounded-full border border-white/[0.12] bg-secondary px-5 py-2 text-sm font-medium tracking-wide shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] transition-all ease-out active:scale-95 cursor-pointer"
          href="https://www.datareel.ai/"
        >
          Know More
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
