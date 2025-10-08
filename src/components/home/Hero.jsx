import React, { useState, useEffect } from "react";
import {
  FileText,
  Shield,
  Download,
  Zap,
  Eye,
  Lock,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Users,
  Github,
  Star,
  DollarSign,
  Layers,
  Code,
  Globe,
  Smartphone,
} from "lucide-react";
import Logo from "../ui/Logo";
import editor from "../../assets/editor.png";
const primaryPaperdocs =
  "bg-gradient-to-br from-orange-400 to-orange-500 pl-3 pr-2 py-1.5 rounded-lg border-2 border-orange-400 relative flex justify-center items-center overflow-hidden text-white gap-2 cursor-pointer transition-all duration-200 min-w-[140px]";
const secondaryPaperdocs =
  "bg-gradient-to-br from-neutral-800 to-neutral-900 pl-3 pr-2 py-1.5 rounded-lg border-2 border-neutral-700 relative flex justify-center items-center overflow-hidden text-white gap-2 cursor-pointer transition-all duration-200 min-w-[140px]";

// Landing Page Component
const LandingPage = ({ onNavigate }) => {
  const [downloads, setDownloads] = useState(12847);
  const [users, setUsers] = useState(3429);

  useEffect(() => {
    const interval = setInterval(() => {
      setDownloads((prev) => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-dashed border-neutral-50/50 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="max-w-3xl mx-auto px-6 py-2 flex items-center justify-between">
          <Logo />
          <button
            onClick={() => onNavigate("app")}
            className={primaryPaperdocs + " text-sm font-medium"}
          >
            Create Document
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="border-b border-dashed border-neutral-50/50 bg-gradient-to-b from-white to-orange-50/30">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 bg-gradient-to-r from-orange-50 to-orange-100 rounded-full border border-dashed border-orange-300 shadow-sm">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-orange-600 font-medium">
                Free Forever · No Sign-up · 100% Private
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-medium text-neutral-900 mb-6 leading-normal md:leading-tight">
              Create Beautiful Invoices
              <br className=" " />
              <span className="text-orange-500">
                Without Compromising Privacy
              </span>
            </h1>

            <p className="text-sm text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Generate professional invoices and receipts in seconds with our
              modern, privacy-first tool. Everything runs in your browser—your
              data never touches our servers.
            </p>

            <div className="flex gap-4 justify-center mb-12">
              <button
                onClick={() => onNavigate("app")}
                className={
                  primaryPaperdocs +
                  " text-sm font-medium inline-flex items-center gap-2"
                }
              >
                Start Creating Free <ArrowRight className="w-4 h-4" />
              </button>
              <button
                className={secondaryPaperdocs + " text-sm font-medium"}
                onClick={() =>
                  window.open("https://github.com/bidyut10", "_blank")
                }
              >
                Github <Github className="w-4 h-4" />
              </button>
            </div>

            {/* Visual Demo Area */}
            <div className="relative mt-16">
              <img
                src={editor}
                alt="editor"
                className="border-4 bg-white rounded-2xl p-10 border-neutral-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-dashed border-neutral-50/50 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 rounded-xl border border-dashed border-orange-200">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl mb-4 shadow-md border border-orange-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-medium text-neutral-900 mb-2">
                {downloads.toLocaleString()}
              </div>
              <div className="text-xs text-neutral-600">PDFs This Week</div>
            </div>
            <div className="text-center bg-gradient-to-br from-neutral-50 to-neutral-100 p-6 rounded-xl border border-dashed border-neutral-300">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-neutral-900 rounded-xl mb-4 shadow-md border border-neutral-800">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-medium text-neutral-900 mb-2">
                {users.toLocaleString()}+
              </div>
              <div className="text-xs text-neutral-600">Happy Users</div>
            </div>
            <div className="text-center bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 rounded-xl border border-dashed border-orange-200">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl mb-4 shadow-md border border-orange-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-medium text-neutral-900 mb-2">
                100%
              </div>
              <div className="text-xs text-neutral-600">Private & Secure</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b border-dashed border-neutral-50/50 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white rounded-full border border-dashed border-neutral-300">
              <Layers className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-neutral-600 font-medium">
                Simple Process
              </span>
            </div>
            <h2 className="text-2xl font-medium text-neutral-900 mb-3">
              How It Works
            </h2>
            <p className="text-sm text-neutral-600">
              Three simple steps to your professional invoice
            </p>
          </div>

          <div className="grid gap-6">
            <div className="flex gap-6 items-start bg-white p-8 rounded-xl border border-dashed border-neutral-300">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center text-white text-xl font-medium shadow-lg shadow-orange-200/50 border border-orange-300">
                1
              </div>
              <div className="flex-1 pt-2">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-medium text-neutral-900">
                    Enter Your Details
                  </h3>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-neutral-100 rounded-lg border border-neutral-50/50 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-neutral-500" />
                    </div>
                    <div className="w-8 h-8 bg-orange-100 rounded-lg border border-orange-200 flex items-center justify-center">
                      <Code className="w-4 h-4 text-orange-500" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Fill in your business information, customer details, and line
                  items directly in your browser. No account creation
                  required—just start typing and watch the magic happen.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start bg-gradient-to-br from-orange-50 to-orange-100/30 p-8 rounded-xl border border-dashed border-orange-200">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center text-white text-xl font-medium shadow-lg shadow-orange-200/50 border border-orange-300">
                2
              </div>
              <div className="flex-1 pt-2">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-medium text-neutral-900">
                    Real-time Preview
                  </h3>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg border border-orange-200 flex items-center justify-center">
                      <Eye className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="w-8 h-8 bg-orange-100 rounded-lg border border-orange-200 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-orange-500" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  See your invoice update instantly as you type. Our live
                  preview ensures everything looks perfect before you download,
                  giving you complete control over the final result.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start bg-white p-8 rounded-xl border border-dashed border-neutral-300">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center text-white text-xl font-medium shadow-lg shadow-orange-200/50 border border-orange-300">
                3
              </div>
              <div className="flex-1 pt-2">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-medium text-neutral-900">
                    Download & Share
                  </h3>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-neutral-100 rounded-lg border border-neutral-50/50 flex items-center justify-center">
                      <Download className="w-4 h-4 text-neutral-500" />
                    </div>
                    <div className="w-8 h-8 bg-neutral-100 rounded-lg border border-neutral-50/50 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-neutral-500" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Click download to get your professional PDF instantly. Send it
                  to clients, save it for your records, or print it—your
                  document is ready to use immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy First Section */}
      <section className="border-b border-dashed border-neutral-50/50 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-10 border border-neutral-700 shadow-2xl shadow-neutral-300/50">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/30 border border-orange-300">
                  <Lock className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-medium text-white mb-4">
                  Your Data Never Leaves Your Device
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                  Unlike traditional invoice software, PaperDoc processes
                  everything locally in your browser. Your sensitive business
                  information, customer details, and financial data never touch
                  our servers. We can't see it, store it, or share it—because we
                  never receive it.
                </p>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700">
                    <Shield className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-neutral-300">
                      Zero tracking
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700">
                    <Lock className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-neutral-300">
                      No data collection
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="border-b border-dashed border-neutral-50/50 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white rounded-full border border-dashed border-neutral-300">
              <Star className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-neutral-600 font-medium">
                Powerful Features
              </span>
            </div>
            <h2 className="text-2xl font-medium text-neutral-900 mb-3">
              Why Choose PaperDoc
            </h2>
            <p className="text-sm text-neutral-600">
              Everything you need in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2 bg-gradient-to-br from-orange-400 to-orange-500 p-6 sm:p-8 rounded-xl border border-orange-300 shadow-lg shadow-orange-200/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-medium text-white">
                  Lightning Fast
                </h3>
              </div>
              <p className="text-sm text-white/90 leading-relaxed mb-4">
                Create professional invoices in under 60 seconds. Our
                streamlined interface removes all friction—no complicated forms
                or unnecessary steps.
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/30">
                  <span className="text-xs text-white font-medium">
                    Quick Setup
                  </span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/30">
                  <span className="text-xs text-white font-medium">
                    Instant PDF
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-dashed border-neutral-300 flex flex-col">
              <div className="w-12 h-12 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl flex items-center justify-center mb-4 border border-neutral-300">
                <Download className="w-6 h-6 text-neutral-700" />
              </div>
              <h3 className="font-medium text-neutral-900 mb-2">PDF Export</h3>
              <p className="text-xs text-neutral-600 leading-relaxed flex-1">
                High-quality documents ready for clients
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-dashed border-neutral-300 flex flex-col">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mb-4 border border-orange-300">
                <Globe className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-medium text-neutral-900 mb-2">
                Works Anywhere
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed flex-1">
                Browser-based tool accessible from any device
              </p>
            </div>

            <div className="md:col-span-2 bg-gradient-to-br from-neutral-50 to-neutral-100 p-6 sm:p-8 rounded-xl border border-dashed border-neutral-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-neutral-50/50">
                  <DollarSign className="w-6 h-6 text-neutral-700" />
                </div>
                <h3 className="text-xl font-medium text-neutral-900">
                  100% Free Forever
                </h3>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                No subscriptions, no premium tiers, no hidden costs. PaperDoc is
                completely free to use with all features unlocked for everyone.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-dashed border-neutral-300 flex flex-col w-full">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mb-4 border border-orange-300">
                <Smartphone className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-medium text-neutral-900 mb-2">Responsive</h3>
              <p className="text-xs text-neutral-600 leading-relaxed flex-1">
                Perfect on desktop, tablet, and mobile
              </p>
            </div>

            <div className="md:col-span-2 bg-white p-6 rounded-xl border border-dashed border-neutral-300 flex flex-col">
              <div className="w-12 h-12 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl flex items-center justify-center mb-4 border border-neutral-300">
                <CheckCircle className="w-6 h-6 text-neutral-700" />
              </div>
              <h3 className="font-medium text-neutral-900 mb-2">
                Professional Templates
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed flex-1">
                Modern, clean designs that make your business look credible and
                trustworthy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-b border-dashed border-neutral-50/50 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="text-center bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-12 border border-dashed border-orange-200">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-200/50 border border-orange-300">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-medium text-neutral-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-sm text-neutral-600 mb-8 leading-relaxed max-w-xl mx-auto">
              Join thousands of freelancers and small businesses creating
              professional invoices with PaperDoc. No credit card required, no
              commitment.
            </p>
            <button
              onClick={() => onNavigate("app")}
              className={
                primaryPaperdocs +
                " text-sm font-medium inline-flex items-center gap-2"
              }
            >
              Create Your First Invoice <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-12 border-t border-dashed border-neutral-50/50">
          <div className="flex items-center justify-between">
            <Logo />
            <p className="text-xs text-neutral-500">
              © 2025 PaperDoc. Privacy-first invoicing.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;