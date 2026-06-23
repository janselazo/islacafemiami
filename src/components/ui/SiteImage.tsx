import type { CSSProperties } from "react";

type SiteImageProps = {
  src: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  style?: CSSProperties;
};

export function SiteImage({
  src,
  alt = "",
  className = "",
  priority = false,
  fill = false,
  style,
}: SiteImageProps) {
  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className={`absolute inset-0 h-full w-full object-cover ${className}`.trim()}
        style={style}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      className={className}
      style={style}
    />
  );
}
