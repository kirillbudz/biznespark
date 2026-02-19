"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { company } from "@/content/company";
import { FadeIn } from "@/components/animations";

const VIDEO_SRC = "/about-company.mp4";

export function AboutCompanySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "0px" });
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <section
      id="about"
      className="py-16 md:py-24"
      aria-labelledby="about-company-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16 items-center">
          {/* Text */}
          <div>
            <FadeIn direction="left">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-1 rounded-full bg-accent" aria-hidden />
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.15em] text-accent">
                    О компании
                  </p>
                  <h2
                    id="about-company-title"
                    className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                  >
                    {company.companyName}
                  </h2>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} direction="left">
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                {company.aboutText}
              </p>
            </FadeIn>

            <FadeIn delay={0.3} direction="left">
              <div className="mt-8 flex flex-wrap gap-4">
                {company.stats.slice(0, 3).map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    <span className="text-xl font-bold text-accent">
                      {stat.value}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Video — воспроизведение при появлении в зоне видимости, остановка в конце */}
          <FadeIn delay={0.2} direction="right">
            <div
              ref={containerRef}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl glass"
            >
              {!videoError ? (
                <video
                  ref={videoRef}
                  src={VIDEO_SRC}
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                  aria-label="Видео о компании"
                  onError={() => setVideoError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                  <svg
                    className="h-12 w-12 opacity-30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <p className="text-sm">Фото компании</p>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
