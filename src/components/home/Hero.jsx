import React from "react";
import { ArrowUpRight } from "lucide-react";
import InvoiceSkeleton from "./InvoiceSkeleton";
import PhoneFrame from "./PhoneFrame";
import Logo from "../ui/Logo";
import editor from "../../assets/editor.png";
import wallpaper3 from "../../assets/dith-homee.png";
import wallpaper4 from "../../assets/wallpaper-4.png";
import wallpaper5 from "../../assets/wallpaper-5.png";
import wallpaper6 from "../../assets/wallpaper-6.png";

const btnBlack =
  "inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm text-white transition-colors hover:bg-neutral-800 cursor-pointer";

const LINKS = {
  github: "https://github.com/bidyut10",
  twitter: "https://x.com/BidyutKundu12",
  coffee: "https://buymeacoffee.com/bidyutkundu",
};

const OTHER_PROJECTS = [
  {
    name: "OpenSource UI",
    desc: "Open source UI library",
    url: "https://opensourceui.in",
  },
  {
    name: "NextIcons",
    desc: "SVG icons & editor",
    url: "https://nexticons.in",
  },
];

const HOW_IT_WORKS = [
  "Start by filling in your business name, your client's name, and what you charged. The form stays simple — no clutter, no confusion.",
  "As you type, your invoice builds on screen in front of you. You always see exactly how it will look before you finish.",
  "When everything looks right, review the layout and totals one last time. Change anything you want before you download.",
  "Save your invoice as a PDF and send it to your client. From blank page to finished document in minutes.",
];

const WALLPAPER_MASK = {
  WebkitMaskImage:
    "linear-gradient(to bottom, #000 0%, #000 35%, rgba(0,0,0,0.75) 55%, rgba(0,0,0,0.35) 72%, transparent 90%)",
  maskImage:
    "linear-gradient(to bottom, #000 0%, #000 35%, rgba(0,0,0,0.75) 55%, rgba(0,0,0,0.35) 72%, transparent 90%)",
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
};

function BgCard({ image, className, overlayClass, children }) {
  return (
    <article className={`relative overflow-hidden ${className}`}>
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className={`absolute inset-0 ${overlayClass}`} />
      <div className="relative flex h-full min-h-[inherit] flex-col justify-end p-4 md:p-5">
        {children}
      </div>
    </article>
  );
}

function PreviewCard() {
  return (
    <BgCard
      image={editor}
      className="col-span-2 min-h-[200px] rounded-[1.75rem] md:col-span-4 md:row-span-2 md:min-h-[240px] md:rounded-[2rem]"
      overlayClass="bg-gradient-to-t from-white via-white/75 to-white/10"
    >
      <p className="text-sm font-medium text-neutral-900">Live preview</p>
      <p className="mt-0.5 text-xs text-neutral-600">Updates as you type</p>
    </BgCard>
  );
}

function PrivateCard() {
  return (
    <BgCard
      image={wallpaper6}
      className="col-span-2 min-h-[140px] rounded-[1.75rem] rounded-tr-[3.5rem] md:col-span-2 md:row-span-2 md:min-h-0 md:rounded-tr-[4.5rem]"
      overlayClass="bg-neutral-950/80"
    >
      <p className="text-sm font-medium text-white">Private</p>
      <p className="mt-0.5 text-xs text-neutral-400">Stays on your device</p>
    </BgCard>
  );
}

function LayoutsCard() {
  return (
    <BgCard
      image={wallpaper4}
      className="col-span-1 min-h-[130px] rounded-2xl rounded-bl-[2.5rem] md:col-span-2 md:rounded-bl-[3rem]"
      overlayClass="bg-gradient-to-t from-white via-white/80 to-transparent"
    >
      <p className="text-sm font-medium text-neutral-900">Pro layouts</p>
      <p className="mt-0.5 text-xs text-neutral-600">Ready to send</p>
    </BgCard>
  );
}

function PdfCard() {
  return (
    <article className="col-span-1 mx-auto flex aspect-square w-full max-w-[140px] flex-col items-center justify-center self-center rounded-full bg-neutral-950 p-4 md:col-span-2 md:max-w-none md:min-h-0">
      <span className="text-2xl font-semibold tracking-tight text-white md:text-3xl">PDF</span>
      <p className="mt-1 text-[11px] text-neutral-400">One click</p>
    </article>
  );
}

function FreeCard() {
  return (
    <article className="relative col-span-2 min-h-[100px] overflow-hidden rounded-[2rem] rounded-tl-sm border-2 border-dashed border-neutral-300 md:col-span-2 md:min-h-[130px]">
      <img
        src={wallpaper5}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-white/88" />
      <div className="relative flex h-full min-h-[inherit] flex-col items-center justify-center p-4">
        <p className="text-2xl font-semibold text-neutral-900">Free</p>
        <p className="mt-0.5 text-[11px] text-neutral-500">No subscription</p>
      </div>
    </article>
  );
}

function SignupCard() {
  return (
    <article className="col-span-2 flex min-h-[52px] items-center justify-center rounded-full bg-neutral-100 px-6 py-3.5 md:col-span-6">
      <p className="text-sm text-neutral-800">
        <span className="font-medium text-neutral-900">No sign-up</span>
        <span className="mx-2 text-neutral-300">·</span>
        <span className="text-neutral-600">Open and start</span>
      </p>
    </article>
  );
}

const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white text-neutral-600">
      <section className="relative bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 w-full max-md:h-dvh bg-white">
          <div className="relative overflow-hidden bg-white max-md:h-full">
            <img
              src={wallpaper3}
              alt=""
              className="block w-full scale-[1.03] max-md:h-full max-md:object-cover max-md:object-top md:h-auto"
              style={WALLPAPER_MASK}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-[50%]"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.55) 32%, #ffffff 52%, #ffffff 100%)",
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 h-4 bg-white" aria-hidden="true" />
          </div>
        </div>

        <header className="relative z-10">
          <div className="mx-auto flex max-w-5xl items-center justify-center px-6 py-5 md:px-10 md:py-7">
            <Logo/>
          </div>
        </header>

        <div className="relative z-10 flex min-h-[52dvh] flex-col items-center justify-center px-6 pt-8 text-center md:min-h-[48dvh] md:pt-12">
          <p className="text-xs text-neutral-600 bg-white/30 bg-transparent py-1 px-3 rounded-full">Free · No account needed</p>
          <h1 className="font-sans mt-4 max-w-2xl text-4xl leading-[1.12] text-black">
            Create invoices <br /> that look professional
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-neutral-800 md:max-w-lg">
            Fill in your details, see how your invoice looks, and download it when you are
            done — ready to send to your clients.
          </p>
          <div className="mt-8">
            <button type="button" onClick={() => onNavigate("app")} className={btnBlack}>
              Create invoice
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative z-10 flex justify-center pb-14 pt-4 md:pb-20 md:pt-6">
          <PhoneFrame>
            <InvoiceSkeleton />
          </PhoneFrame>
        </div>
      </section>

      <div className="relative z-10 bg-white">
        <section className="">
          <div className="mx-auto max-w-2xl px-6 py-20 md:py-28">

            <div className="space-y-10">
              {HOW_IT_WORKS.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-2xl leading-snug text-neutral-800  md:leading-snug"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
            <div className="mt-8 grid grid-cols-2 items-stretch gap-3 md:grid-cols-6 md:auto-rows-[minmax(130px,auto)]">
              <PreviewCard />
              <PrivateCard />
              <LayoutsCard />
              <PdfCard />
              <FreeCard />
              <SignupCard />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-2xl px-6 py-20 text-center md:py-28">
          <h2 className="text-2xl text-neutral-900 md:text-3xl">
            Ready to create your first invoice?
          </h2>
          <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-neutral-500">
            It only takes a few minutes. No account required.
          </p>
          <button
            type="button"
            onClick={() => onNavigate("app")}
            className={`${btnBlack} mt-8`}
          >
            Try it now
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </section>

        <section>
          <div className="mx-auto max-w-2xl px-6 pb-20 md:pb-28">
            <div className="space-y-10">
              <p className="text-2xl leading-snug text-neutral-800">
                Paperdoc is fully open source — free for personal and professional use, with
                no sign-up and no subscription.
              </p>
              <p className="text-2xl leading-snug text-neutral-800">
                It exists because invoicing should be simple: fill in your details, preview
                your document, and download a PDF. Anyone can use it, fork it, or run their
                own copy.
              </p>
              <p className="text-2xl leading-snug text-neutral-800">
                If Paperdoc helps you, leave a star on GitHub. If you want to support the
                work behind it, buy me a coffee.
              </p>
              <p className="text-2xl leading-snug text-neutral-800">
                More free open source tools from the same builder —{" "}
                <a
                  href={OTHER_PROJECTS[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900"
                >
                  OpensourceUI
                </a>
                , a UI library, and{" "}
                <a
                  href={OTHER_PROJECTS[1].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900"
                >
                  NextIcons
                </a>
                , an SVG icon library and editor.
              </p>
            </div>
          </div>
        </section>

        <footer>
          <div className="mx-auto max-w-2xl px-6 py-10 md:py-12">
            <Logo className="h-5 w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              Made by{" "}
              <span className="text-neutral-800">Bidyut Kundu</span>
              <span className="mx-2 text-neutral-300">·</span>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline"
              >
                GitHub
              </a>
              <span className="mx-2 text-neutral-300">·</span>
              <a
                href={LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline"
              >
                Twitter
              </a>
              <span className="mx-2 text-neutral-300">·</span>
              <a
                href={LINKS.coffee}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline"
              >
                Buy me a coffee
              </a>
            </p>
            <p className="mt-4 text-xs text-neutral-400">
              © {new Date().getFullYear()} Paperdoc
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
