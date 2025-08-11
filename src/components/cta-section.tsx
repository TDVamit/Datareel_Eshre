import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { useState } from "react";
import HubspotForm from "./HubspotForm";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CTASection() {
  const [open, setModalOpen] = useState(false);
  return (
    <>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        className="rounded-xl"
        fullWidth
        onClose={() => setModalOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle align="left">{"Book Demo"}</DialogTitle>
        <Divider />
        <DialogContent>
          <HubspotForm id="get_a_quote" />
        </DialogContent>
      </Dialog>
      <section
        id="cta"
        className="flex w-full flex-col items-center justify-center py-6 mt-16"
      >
        <div className="w-full">
          <div className="relative h-fit w-full overflow-hidden rounded-xl border border-foreground/10 shadow-xl">
            {/* <Image
            src={'/v2/Backgrounds/Backgrounds-02.svg'}
            alt='Agent CTA Background'
            className='absolute inset-0 z-[-1] h-full w-full object-cover object-right md:object-center'
            fill
            priority
          /> */}
            <div className="absolute inset-0 z-[-1] h-full w-full bg-gradient-to-br from-[#fe774330] via-[#ffffff30_50%] to-[#4ec48f30] object-cover object-right dark:from-[#fe774330] dark:via-[#00000030_50%] dark:to-[#4ec48f30] md:object-center" />
            <div className="flex flex-col items-center justify-center py-12">
              <h1 className="max-w-xs text-center text-4xl font-medium leading-tighter tracking-tighter md:max-w-xl md:text-7xl text-balance">
                Tell us what you need
              </h1>
              <div className="flex flex-col items-center justify-center gap-4 pt-8">
                {/* <Link
                href={ctaSection.button.href}
                className='flex h-10 w-fit items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-black shadow-md'
              >
                {ctaSection.button.text}
              </Link> */}
                <button
                  id="cta-book-demo-modal"
                  onClick={() => setModalOpen(true)}
                  className="flex items-center justify-center text-white rounded-full border border-white/[0.12] bg-secondary px-5 py-2 text-sm font-medium tracking-wide shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] transition-all ease-out active:scale-95 cursor-pointer"
                >
                  Book Demo
                </button>
                <span className="mx-auto px-6 pb-2 text-center text-sm font-medium text-foreground/60">
                  We&apos;ll craft a custom quote to bring your AI video
                  strategy to life.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
