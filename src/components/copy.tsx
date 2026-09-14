import { Children, isValidElement } from "react";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { siteCopy, type CopySection } from "../lib/site-copy";
import { withBase } from "../lib/utils";
import { imageDimensions } from "../lib/image-dimensions";
import { ImageCarousel } from "./image-carousel";

const remarkPlugins = [remarkGfm];

const components: Components = {
  table: ({ children }) => (
    <div
      className="copy-table-scroll"
      role="region"
      aria-label="Scrollable table"
      tabIndex={0}
    >
      <table>{children}</table>
    </div>
  ),
  p: ({ node, children }) => {
    const isImageGroup =
      node?.children.some(
        (child) => child.type === "element" && child.tagName === "img",
      ) &&
      node.children.every((child) =>
        child.type === "element"
          ? child.tagName === "img"
          : child.type === "text" && !child.value.trim(),
      );

    if (!isImageGroup) return <p>{children}</p>;

    const images = Children.toArray(children).filter(
      isValidElement<{ alt?: string; title?: string }>,
    );
    if (images.length > 2) return <ImageCarousel images={images} />;

    return (
      <div className="copy-image-gallery">
        {Children.toArray(children).map((child, index) => {
          if (!isValidElement<{ src?: string; title?: string }>(child)) {
            return null;
          }
          const caption =
            child.props.title ?? siteCopy.imageCaptions[child.props.src ?? ""];
          return (
            <figure key={index}>
              {child}
              {caption && <figcaption>{caption}</figcaption>}
            </figure>
          );
        })}
      </div>
    );
  },
  img: ({ node: _node, src, ...props }) => (
    <img
      {...props}
      {...(src ? imageDimensions[src] : undefined)}
      src={src ? withBase(src) : src}
      loading="lazy"
      decoding="async"
    />
  ),
  a: ({ href, children, title }) => (
    <a
      title={title}
      href={href}
      {...(/^https?:\/\//.test(href ?? "")
        ? { target: "_blank", rel: "noreferrer" }
        : {})}
    >
      {children}
    </a>
  ),
};

type MarkdownNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: MarkdownNode[];
};

function headingText(node: MarkdownNode): string {
  if (node.type === "text") return node.value ?? "";
  return node.children?.map(headingText).join("") ?? "";
}

// Add navigation targets to the rendered tree without rewriting the copy.
function rehypeHeadingAnchors({ prefix }: { prefix: string }) {
  return (tree: MarkdownNode) => {
    const usedIds = new Set<string>();
    const visit = (node: MarkdownNode) => {
      if (node.tagName && /^h[1-6]$/.test(node.tagName)) {
        const slug =
          headingText(node)
            .normalize("NFKD")
            .replace(/\p{Diacritic}/gu, "")
            .toLowerCase()
            .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
            .replace(/^-+|-+$/g, "") || "heading";
        const baseId = `${prefix}--${slug}`;
        let id = baseId;
        let suffix = 2;
        while (usedIds.has(id)) id = `${baseId}-${suffix++}`;
        usedIds.add(id);
        node.properties = { ...node.properties, id, tabIndex: -1 };
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}

export function Copy({
  children,
  anchorPrefix,
}: {
  children: string;
  anchorPrefix?: string;
}) {
  return (
    <Markdown
      skipHtml
      remarkPlugins={remarkPlugins}
      rehypePlugins={
        anchorPrefix ? [[rehypeHeadingAnchors, { prefix: anchorPrefix }]] : []
      }
      components={components}
    >
      {children}
    </Markdown>
  );
}

export function InlineCopy({ children }: { children: string }) {
  return (
    <Markdown
      skipHtml
      remarkPlugins={remarkPlugins}
      components={{ ...components, p: ({ children }) => <>{children}</> }}
    >
      {children}
    </Markdown>
  );
}

export function HeroCopy() {
  return (
    <>
      <h1 id="hero-title">
        <InlineCopy>{siteCopy.sections.hero.title}</InlineCopy>
        <span className="greeting-star" aria-hidden="true">
          ✳
        </span>
      </h1>
      <Markdown
        skipHtml
        remarkPlugins={remarkPlugins}
        components={{
          ...components,
          p: ({ node, children }) => (
            <p
              className={
                node?.position?.start.line === 1 ? "hero-intro" : "hero-note"
              }
            >
              {children}
            </p>
          ),
        }}
      >
        {siteCopy.sections.hero.body}
      </Markdown>
    </>
  );
}

export function WrittenSection({
  id,
  section,
}: {
  id: string;
  section: CopySection;
}) {
  return (
    <section
      id={id}
      tabIndex={-1}
      className={`note-section${id === "fit" ? " story-section" : ""}`}
      aria-labelledby={`${id}-heading`}
    >
      <h2 id={`${id}-heading`}>
        <InlineCopy>{section.title}</InlineCopy>
      </h2>
      <Copy anchorPrefix={id}>{section.body}</Copy>
    </section>
  );
}

export function ApplicationSections() {
  return (
    <>
      {(["opportunity", "fit", "sourcing"] as const).map((id) => (
        <WrittenSection key={id} id={id} section={siteCopy.sections[id]} />
      ))}
    </>
  );
}
