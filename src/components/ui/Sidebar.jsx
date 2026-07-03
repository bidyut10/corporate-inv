import React from "react";
import { ArrowUpRight, Bug, FileText, Github, Heart, LayoutTemplate, Shapes } from "lucide-react";

const OPEN_SOURCE_PROJECTS = [
  { name: "NextIcons", url: "https://nexticons.in", icon: Shapes },
  { name: "Opensource UI", url: "https://opensourceui.in", icon: LayoutTemplate },
];

const LINKS = {
  sponsor: "https://buymeacoffee.com/bidyutkundu",
  github: "https://github.com/bidyut10",
  twitter: "https://x.com/BidyutKundu12",
};

const BUG_REPORT_EMAIL =
  "mailto:bidyut.kundu.dev@gmail.com?subject=Paperdoc%20Bug%20Report&body=Please%20describe%20the%20bug%20and%20how%20to%20reproduce%20it.";

const navLinkClass =
  "ml-6 flex cursor-pointer items-center gap-2 mt-3 text-neutral-500 transition-colors hover:text-neutral-900";

const Sidebar = ({ active = "invoice", onSelect = () => {} }) => {
  return (
    <div className="flex h-full min-h-[calc(100vh-4rem)] w-full flex-col bg-white px-4 py-4 border-r border-neutral-100 animate-slide-in">
      <div>
        <div className="flex justify-start items-center gap-2 bg-neutral-50/50 rounded-sm px-4 py-1">
          {/* <Wallet className="text-neutral-900" size={12} /> */}
          <h1 className="text-neutral-900 text-xs">Finance</h1>
        </div>
        <button
          onClick={() => onSelect("invoice")}
          className={`ml-6 cursor-pointer flex justify-start items-center gap-2 mt-3 ${active === "invoice" ? "" : ""}`}
        >
          <FileText
            className={active === "invoice" ? "text-neutral-900" : "text-neutral-500"}
            size={12}
          />
          <h1
            className={
              active === "invoice" ? "text-neutral-900 text-sm" : "text-neutral-500 text-sm"
            }
          >
            Create Invoice
          </h1>
        </button>
        <button
          onClick={() => onSelect("receipt")}
          className={`ml-6 cursor-pointer flex justify-start items-center gap-2 mt-3 ${active === "receipt" ? "" : ""}`}
        >
          <FileText
            className={active === "receipt" ? "text-neutral-900" : "text-neutral-500"}
            size={13}
          />
          <h1
            className={
              active === "receipt" ? "text-neutral-900 text-sm" : "text-neutral-500 text-sm"
            }
          >
            Create Receipt
          </h1>
        </button>
      </div>
      {/* <div className="flex justify-start items-center gap-2 bg-neutral-50/50 rounded-sm px-4 py-1 mt-6">
        <h1 className="text-neutral-800 text-xs">Product</h1>
      </div>
      <div className="flex justify-start items-center gap-2 mt-3 ml-6">
        <Tag className="text-neutral-900" size={12} />
        <h1 className="text-neutral-900 text-sm">Create Label</h1>
      </div>
      <div className="flex justify-start items-center gap-2 mt-3 ml-6">
        <FileText className="text-neutral-600" size={13} />
        <h1 className="text-neutral-600 text-sm">Create Receipt</h1>
      </div> */}

      <div className="mt-auto">
        <div className="mt-6 flex justify-start items-center gap-2 bg-neutral-50/50 rounded-sm px-4 py-1">
          <h1 className="text-neutral-900 text-xs">More free tools</h1>
        </div>
        {OPEN_SOURCE_PROJECTS.map((project) => {
          const Icon = project.icon;
          return (
            <a
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={navLinkClass}
            >
              <Icon className="text-neutral-500" size={12} />
              <h1 className="text-sm text-neutral-500 hover:text-blue-800 border-b border-neutral-500 hover:border-blue-800">{project.name}</h1>
            </a>
          );
        })}

        <div className="mt-6 flex justify-start items-center gap-2 bg-neutral-50/50 rounded-sm px-4 py-1">
          <h1 className="text-neutral-900 text-xs">Support</h1>
        </div>
        <a
          href={LINKS.sponsor}
          target="_blank"
          rel="noopener noreferrer"
          className={navLinkClass}
        >
          <Heart className="text-red-500 fill-red-500" size={12} />
          <h1 className="text-sm text-neutral-500">Sponsor us</h1>
        </a>
        <a
          href={LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className={navLinkClass}
        >
          <Github className="text-neutral-500" size={12} />
          <h1 className="text-sm text-neutral-500">Star us on GitHub</h1>
        </a>
        <a
          href={LINKS.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={navLinkClass}
        >
          <ArrowUpRight className="text-neutral-500" size={12} />
          <h1 className="text-sm text-neutral-500">Follow us on Twitter</h1>
        </a>
        <div className="mt-4 px-2">
          <a
            href={BUG_REPORT_EMAIL}
            className="flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-sm bg-gradient-to-br from-red-400 to-red-500 px-3 py-2 text-white transition-all duration-200 hover:from-red-500 hover:to-red-600"
          >
            <Bug size={14} />
            <span className="text-sm">Found a bug?  Tell us</span>
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
