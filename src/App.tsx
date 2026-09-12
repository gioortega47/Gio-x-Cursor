import { useEffect, useRef, useState } from "react";
import { Command } from "cmdk";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Copy as CopyIcon,
  Mail,
  Phone,
  Play,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TooltipProvider } from "@/components/ui/tooltip";
import { navigation, profile } from "./content";
import {
  ApplicationSections,
  Copy,
  HeroCopy,
  InlineCopy,
} from "./components/copy";
import { siteCopy } from "./lib/site-copy";
import { SiteNavigation, focusDestination } from "./components/site-navigation";

function Linkedin({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7.5 10v7M7.5 7v.1M11 17v-7m0 3c0-4 6-4 6 0v4" />
    </svg>
  );
}

function Wordmark() {
  return (
    <a
      href="#top"
      className="wordmark"
      aria-label={`${profile.name}, back to top`}
    >
      <span className="brand-symbol" aria-hidden="true">
        g.
      </span>
      <span>
        {profile.name}
        <span className="brand-period">.</span>
      </span>
    </a>
  );
}

function focusSection(id: string) {
  focusDestination(id);
}

function VideoIntroduction() {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const continueToStory = useRef(false);
  const hasVideo = Boolean(profile.videoSrc);
  return (
    <section
      id="hello"
      className="video-section"
      aria-label="A personal video introduction"
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="video-poster"
            aria-label={
              hasVideo
                ? "Play my introduction"
                : "Read a note about my upcoming video"
            }
          >
            <img
              src={profile.videoPoster}
              alt="A quiet, painted landscape of golden hills and distant blue mountains"
              width="1672"
              height="941"
              fetchPriority="high"
            />
            <span className="video-topline">
              <span>GIO → ADAM</span>
            </span>
            <span className="video-center">
              <span className="play-button">
                <Play size={22} fill="currentColor" strokeWidth={1.5} />
              </span>
              <span className="video-play-label">Click to play video</span>
            </span>
          </button>
        </DialogTrigger>
        <DialogContent
          className={hasVideo && !failed ? "video-dialog" : "note-dialog"}
          onCloseAutoFocus={(event) => {
            if (continueToStory.current) {
              event.preventDefault();
              continueToStory.current = false;
              focusSection("opportunity");
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>
              {hasVideo && !failed
                ? "Howdy, from Gio."
                : "A hello deserves a human voice."}
            </DialogTitle>
            <DialogDescription>
              {hasVideo && !failed
                ? "A personal introduction for Adam."
                : "I’m recording a short introduction for this spot. In the meantime, here’s the thought behind this page."}
            </DialogDescription>
          </DialogHeader>
          {hasVideo && !failed ? (
            <video
              controls
              autoPlay
              playsInline
              preload="metadata"
              poster={profile.videoPoster}
              onError={() => setFailed(true)}
            >
              <source src={profile.videoSrc} onError={() => setFailed(true)} />
              {profile.videoCaptions ? (
                <track
                  kind="captions"
                  src={profile.videoCaptions}
                  srcLang="en"
                  label="English"
                  default
                />
              ) : null}
              Your browser does not support video playback.
            </video>
          ) : (
            <>
              {failed ? (
                <p role="alert" className="note-body">
                  The recording couldn’t load.{" "}
                  <button
                    className="text-link"
                    onClick={() => setFailed(false)}
                  >
                    Try again <ArrowRight size={13} />
                  </button>
                </p>
              ) : null}
              <p className="note-body">
                I wanted to give you more than a résumé: a feel for how I think,
                a few examples of work I care about, and an honest account of
                where I’m still growing.
              </p>
              <p className="note-signature">
                Thanks for taking a look.
                <br />
                <span>Gio</span>
              </p>
              <Button
                className="pill-button"
                onClick={() => {
                  continueToStory.current = true;
                  setOpen(false);
                }}
              >
                Why this opportunity <ArrowDown size={15} />
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
      <div className="video-read-more">
        <Button asChild variant="outline" className="read-more-button">
          <a
            href="#opportunity"
            onClick={(event) => {
              if (
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              )
                return;
              event.preventDefault();
              focusSection("opportunity");
            }}
          >
            See what I’d bring to Cursor{" "}
            <ArrowDown size={15} aria-hidden="true" />
          </a>
        </Button>
      </div>
    </section>
  );
}

function CommandMenu({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const destination = useRef<string | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const navigate = (id: string) => {
    destination.current = id;
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="command-dialog"
        onOpenAutoFocus={() => {
          previousFocus.current = document.activeElement as HTMLElement;
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          if (destination.current) {
            focusSection(destination.current);
            destination.current = null;
          } else previousFocus.current?.focus({ preventScroll: true });
        }}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Find your way around</DialogTitle>
          <DialogDescription>
            Search page sections or contact Gio.
          </DialogDescription>
        </DialogHeader>
        <Command label="Page navigation">
          <div className="command-input-wrap">
            <Search size={17} />
            <Command.Input placeholder="Where would you like to go?" />
            <kbd>ESC</kbd>
          </div>
          <Command.List>
            <Command.Empty>
              No matches. Try “opportunity”, “story”, or “search”.
            </Command.Empty>
            <Command.Group heading="ON THIS PAGE">
              {navigation.map((item) => (
                <Command.Item
                  key={item.id}
                  value={`${item.label} ${item.detail}`}
                  onSelect={() => navigate(item.id)}
                >
                  <ArrowRight size={16} />
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.detail}</small>
                  </span>
                  <ChevronRight size={14} />
                </Command.Item>
              ))}
            </Command.Group>
            <Command.Group heading="A DIRECT LINE">
              <Command.Item
                onSelect={() => {
                  setOpen(false);
                  window.location.href = `mailto:${profile.email}`;
                }}
              >
                <Mail size={16} />
                <span>
                  Email Gio<small>{profile.email}</small>
                </span>
                <ArrowUpRight size={14} />
              </Command.Item>
            </Command.Group>
          </Command.List>
          <div className="command-footer">
            <span>
              <kbd>↑</kbd>
              <kbd>↓</kbd> to navigate
            </span>
            <span>
              <kbd>↵</kbd> to select
            </span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timeout.current), []);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyFailed(false);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
      setCopyFailed(true);
    }
  };
  return (
    <section id="contact" tabIndex={-1} className="contact-section">
      <h2>
        <InlineCopy>{siteCopy.sections.contact.title}</InlineCopy>
      </h2>
      <Copy>{siteCopy.sections.contact.body}</Copy>
      <div className="contact-actions contact-controls">
        <Button asChild className="contact-control contact-phone">
          <a
            href={profile.phoneHref}
            aria-label={`Call Gio at ${profile.phone}`}
          >
            <Phone size={15} aria-hidden="true" /> {profile.phone}
          </a>
        </Button>
        <Button asChild variant="outline" className="contact-control">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={15} /> {profile.linkedinButton}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </Button>
        <Button
          variant="outline"
          className="contact-control contact-email-copy"
          aria-label={
            copied
              ? `${profile.email} copied`
              : `Copy email address ${profile.email}`
          }
          aria-describedby="contact-copy-feedback"
          onClick={copyEmail}
        >
          {copied ? (
            <Check size={15} aria-hidden="true" />
          ) : (
            <CopyIcon size={15} aria-hidden="true" />
          )}
          <span className="contact-email-address">{profile.email}</span>
          <span className="contact-copy-label">
            {copied ? "Copied" : "Copy"}
          </span>
        </Button>
      </div>
      <div
        id="contact-copy-feedback"
        className="contact-copy-feedback"
        role="status"
        aria-atomic="true"
      >
        {copied
          ? "Email copied."
          : copyFailed
            ? "Couldn’t copy. Please select the address and copy it manually."
            : ""}
      </div>
      <span className="signoff">
        {profile.signoff}
        <br />
        <span>{profile.signature}</span>
      </span>
    </section>
  );
}

export default function App() {
  const [commandOpen, setCommandOpen] = useState(false);
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setCommandOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);
  return (
    <TooltipProvider delayDuration={150}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div id="top" tabIndex={-1} />
      <SiteNavigation brand={<Wordmark />} />
      <main id="main" tabIndex={-1} className="page-width">
        <section className="hero" aria-labelledby="hero-title">
          <div className="eyebrow hero-eyebrow">
            <span className="small-status-dot" /> A PERSONAL NOTE, JUST FOR YOU
          </div>
          <HeroCopy />
          <a href="#hello" className="hero-link">
            A little introduction <ArrowDown size={13} />
          </a>
        </section>
        <VideoIntroduction />
        <article className="application-note" aria-label="My note to Adam">
          <ApplicationSections />
          <Contact />
        </article>
      </main>
      <footer className="site-footer page-width">
        <div>
          <Wordmark />
          <span>{profile.footer}</span>
        </div>
        <div className="footer-links">
          <a href={`mailto:${profile.email}`} aria-label="Email Gio">
            <Mail size={15} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="Gio on LinkedIn"
          >
            <Linkedin size={15} />
          </a>
          <a
            href={profile.phoneHref}
            aria-label={`Call Gio at ${profile.phone}`}
          >
            <Phone size={14} />
          </a>
          <span className="footer-divider" />
          <a href="#top" className="back-top">
            Back to top <ArrowUpRight size={13} />
          </a>
        </div>
      </footer>
      <CommandMenu open={commandOpen} setOpen={setCommandOpen} />
    </TooltipProvider>
  );
}
