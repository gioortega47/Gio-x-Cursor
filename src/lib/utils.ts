import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Prefix root-relative site assets so they load on GitHub Pages (/Gio-x-Cursor/).
export function withBase(path: string) {
  if (
    !path ||
    /^(?:[a-z][a-z\d+\-.]*:)?\/\//i.test(path) ||
    /^(?:data|mailto|tel|blob):/i.test(path) ||
    path.startsWith("#")
  ) {
    return path;
  }
  const base = import.meta.env.BASE_URL;
  return path.startsWith("/") ? `${base}${path.slice(1)}` : `${base}${path}`;
}
