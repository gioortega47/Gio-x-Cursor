import { useId, useRef, useState, type ReactElement } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

type ImageCarouselProps = {
  images: ReactElement<{ alt?: string; title?: string }>[];
};

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const frameId = useId();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const currentIndex = images.length ? activeIndex % images.length : 0;

  if (!images.length) return null;

  const move = (direction: number) => {
    setActiveIndex((index) => (index + direction + images.length) % images.length);
  };

  return (
    <div
      className="image-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Project image gallery"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      <div
        id={frameId}
        className="image-carousel-frame"
        onTouchStart={(event) => {
          const touch = event.touches[0];
          touchStart.current = event.touches.length === 1 && touch
            ? { x: touch.clientX, y: touch.clientY }
            : null;
        }}
        onTouchEnd={(event) => {
          const start = touchStart.current;
          const touch = event.changedTouches[0];
          touchStart.current = null;
          if (!start || !touch) return;

          const deltaX = touch.clientX - start.x;
          const deltaY = touch.clientY - start.y;
          if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
            move(deltaX < 0 ? 1 : -1);
          }
        }}
        onTouchCancel={() => {
          touchStart.current = null;
        }}
      >
        {images.map((image, index) => (
          <figure
            key={image.key ?? index}
            className="image-carousel-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${images.length}`}
            hidden={index !== currentIndex}
          >
            {image}
            {image.props.title && <figcaption>{image.props.title}</figcaption>}
          </figure>
        ))}
      </div>
      <div className="image-carousel-controls">
        <Button
          variant="outline"
          size="icon"
          className="image-carousel-arrow"
          aria-label="Previous image"
          aria-controls={frameId}
          disabled={images.length < 2}
          onClick={() => move(-1)}
        >
          <ArrowLeft aria-hidden="true" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="image-carousel-arrow"
          aria-label="Next image"
          aria-controls={frameId}
          disabled={images.length < 2}
          onClick={() => move(1)}
        >
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        Image {currentIndex + 1} of {images.length}: {images[currentIndex].props.alt}
      </span>
    </div>
  );
}
