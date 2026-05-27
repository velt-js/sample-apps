"use client"

import { Sample } from "@/types/sample"
import { ParsedSample, getCardTags, FrameworkIcon } from "@/lib/sample-taxonomy"
import { getThumbnail } from "@/lib/thumbnails"
import { Fragment } from "react"

interface DemoCardProps {
  sample: Sample
  parsed: ParsedSample
  /** Optional override; defaults to the derived per-demo thumbnail. */
  thumbnail?: string
}

export function DemoCard({ sample, parsed, thumbnail }: DemoCardProps) {
  const thumb = getThumbnail(parsed)
  const href = sample.metadata.routePath || "/"
  // Framework name first (the "type"), then feature + appType.
  const tags = [parsed.framework, ...getCardTags(parsed)]

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-[16px] border border-black/8 dark:border-white/8 bg-white dark:bg-[#000001] p-[4px] transition-colors hover:border-black/20 dark:hover:border-white/20 font-[family-name:var(--font-urbanist)]"
    >
      {/* Thumbnail */}
      <div className="aspect-video w-full rounded-[12px] overflow-hidden bg-black/[0.02] dark:bg-white/[0.02]">
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumbnail} alt="" className="h-full w-full object-cover rounded-[12px] pointer-events-none" />
        ) : thumb ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb.light} alt="" className="block dark:hidden h-full w-full object-cover rounded-[12px] pointer-events-none" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb.dark} alt="" className="hidden dark:block h-full w-full object-cover rounded-[12px] pointer-events-none" />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FrameworkIcon framework={parsed.framework} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 w-full">
        <p className="text-[18px] text-black dark:text-white leading-none">
          {parsed.demoName ? formatTitle(parsed.demoName) : sample.metadata.title}
        </p>
        <div className="flex items-center gap-1 text-[14px] text-black/75 dark:text-white/75">
          <FrameworkIcon framework={parsed.framework} />
          {tags.map((tag, i) => (
            <Fragment key={`${tag}-${i}`}>
              {i > 0 && (
                <span className="mx-1 inline-block size-[6px] rounded-full bg-black/30 dark:bg-white/30" />
              )}
              <span>{tag}</span>
            </Fragment>
          ))}
        </div>
      </div>
    </a>
  )
}

function formatTitle(demoName: string): string {
  return demoName
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
