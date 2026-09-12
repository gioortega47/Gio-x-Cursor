import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { ArrowDown, ArrowRight, ChevronDown, List } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { navigation, navigationHeadingLabel } from "../content";
import { siteCopy } from "../lib/site-copy";
import "./site-navigation.css";

type HeadingLink = { id: string; label: string };

export function focusDestination(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const hash = `#${encodeURIComponent(id)}`;
  if (window.location.hash !== hash) window.history.pushState(null, "", hash);
  target.focus({ preventScroll: true });
  target.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
    block: "start",
  });
}

export function SiteNavigation({ brand }: { brand: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [activeHeading, setActiveHeading] = useState("");
  const [outline, setOutline] = useState<Record<string, HeadingLink[]>>({});
  const destination = useRef<string | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    // Read the actual rendered headings so saved copy edits cannot leave stale
    // shortcuts behind. This only reads the document; it never changes copy.
    const nextOutline = Object.fromEntries(
      navigation.map((item) => [
        item.id,
        Array.from(
          document.querySelectorAll<HTMLElement>(
            `#${item.id} :is(h1, h2, h3, h4, h5, h6)[tabindex="-1"]`,
          ),
        )
          .filter((node) => node.id !== `${item.id}-heading`)
          .map((node) => ({
            id: node.id,
            label: navigationHeadingLabel(node.textContent?.trim() ?? ""),
          })),
      ]),
    );
    setOutline(nextOutline);

    const sections = navigation.map((item) => document.getElementById(item.id));
    const headings = Object.values(nextOutline)
      .flat()
      .map((item) => document.getElementById(item.id));
    let frame = 0;
    const updatePosition = () => {
      frame = 0;
      const readingLine =
        (header.current?.getBoundingClientRect().height ?? 76) + 48;
      let current = "top";
      for (const section of sections) {
        if (section && section.getBoundingClientRect().top <= readingLine) {
          current = section.id;
        }
      }
      // The closing is short enough that it may not reach the reading line.
      if (
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 4
      ) {
        current = "contact";
      }
      setActiveSection(current);
      let headingId = "";
      for (const heading of headings) {
        if (
          heading?.closest("section")?.id === current &&
          heading.getBoundingClientRect().top <= readingLine
        ) {
          headingId = heading.id;
        }
      }
      setActiveHeading(headingId);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updatePosition);
    };
    const observer = new ResizeObserver(scheduleUpdate);
    const main = document.getElementById("main");
    if (main) observer.observe(main);
    if (header.current) observer.observe(header.current);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    updatePosition();
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [siteCopy]);

  const navigate = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
    fromMenu = false,
  ) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    event.preventDefault();
    if (fromMenu) {
      destination.current = id;
      setOpen(false);
    } else {
      focusDestination(id);
    }
  };
  const currentIndex = navigation.findIndex(
    (item) => item.id === activeSection,
  );
  const current = navigation[currentIndex] ?? navigation[0];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <header className="site-header reading-header" ref={header}>
        <div className="reading-header-inner">
          {brand}
          <nav className="chapter-nav" aria-label="Main navigation">
            {navigation
              .filter((item) => item.id !== "contact")
              .map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={
                    activeSection === item.id ? "location" : undefined
                  }
                  onClick={(event) => navigate(event, item.id)}
                >
                  {item.label}
                </a>
              ))}
          </nav>
          <div className="reading-header-actions">
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="contents-toggle"
                onClick={(event) => {
                  opener.current = event.currentTarget;
                }}
              >
                <List size={16} aria-hidden="true" /> Contents
              </Button>
            </DialogTrigger>
            <Button asChild className="nav-contact">
              <a
                href="#contact"
                aria-current={
                  activeSection === "contact" ? "location" : undefined
                }
                onClick={(event) => navigate(event, "contact")}
              >
                Say hello <ArrowRight size={14} aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
        <DialogTrigger asChild>
          <button
            className="mobile-contents-toggle"
            type="button"
            aria-label={`Open contents, currently reading ${current.label}`}
            onClick={(event) => {
              opener.current = event.currentTarget;
            }}
          >
            <span>On this page</span>
            <span className="mobile-current-chapter">
              <span className="chapter-number">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              {current.label} <ChevronDown size={14} aria-hidden="true" />
            </span>
          </button>
        </DialogTrigger>
      </header>
      <DialogContent
        className="contents-dialog"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          if (destination.current) {
            focusDestination(destination.current);
            destination.current = null;
          } else {
            const trigger = opener.current?.getClientRects().length
              ? opener.current
              : header.current?.querySelector<HTMLButtonElement>(
                  window.matchMedia("(max-width: 900px)").matches
                    ? ".mobile-contents-toggle"
                    : ".contents-toggle",
                );
            trigger?.focus({ preventScroll: true });
          }
        }}
      >
        <DialogHeader className="contents-heading">
          <span className="eyebrow">GIO → ADAM</span>
          <DialogTitle>On this page</DialogTitle>
          <DialogDescription>
            Start at the beginning, or jump to what interests you.
          </DialogDescription>
        </DialogHeader>
        <nav className="contents-list" aria-label="Page contents">
          {navigation.map((item, index) => (
            <div
              key={item.id}
              className="contents-chapter"
              data-active={activeSection === item.id || undefined}
            >
              <a
                className="contents-chapter-link"
                href={`#${item.id}`}
                aria-current={
                  activeSection === item.id ? "location" : undefined
                }
                onClick={(event) => navigate(event, item.id, true)}
              >
                <span className="chapter-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item.label}</span>
                <ArrowDown size={15} aria-hidden="true" />
              </a>
              {outline[item.id]?.length > 0 && (
                <ul className="contents-details">
                  {outline[item.id].map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        aria-current={
                          activeHeading === heading.id ? "location" : undefined
                        }
                        onClick={(event) => navigate(event, heading.id, true)}
                      >
                        {heading.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </DialogContent>
    </Dialog>
  );
}
