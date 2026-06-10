import { ParsedSample } from "./sample-taxonomy"

export interface Thumbnail {
  dark: string
  light: string
}

const BASE = "/thumbnails"

function pair(key: string, hasLight = true): Thumbnail {
  return {
    dark: `${BASE}/${key}.svg`,
    light: hasLight ? `${BASE}/${key}-light.svg` : `${BASE}/${key}.svg`,
  }
}

// Comment demos that have a dedicated thumbnail (dark + light)
const COMMENT_LIBS = new Set(["tiptap", "slatejs", "lexical", "quill", "codemirror", "ace", "apryse"])
// CRDT editor demos with a per-library thumbnail
const CRDT_EDITOR_LIBS = new Set(["tiptap", "codemirror", "blocknote"])

/**
 * Map a parsed sample to its thumbnail (light + dark variants), or null when
 * no dedicated thumbnail exists (caller should fall back to a placeholder).
 * Derives from feature/appType/library so React + JS + multi-tool variants of
 * the same demo share one thumbnail.
 */
export function getThumbnail(parsed: ParsedSample): Thumbnail | null {
  const { feature, appType, library, demoName } = parsed

  if (feature === "crdt") {
    if (library === "reactflow") return pair("crdt-reactflow")
    if (library === "core") {
      if (demoName.includes("array")) return pair("crdt-core-array")
      if (demoName.includes("map")) return pair("crdt-core-map")
      if (demoName.includes("xml")) return pair("crdt-core-xml")
      return pair("crdt-core-text")
    }
    if (CRDT_EDITOR_LIBS.has(library)) return pair(`crdt-${library}`)
    if (library === "platejs") return pair("crdt-platejs")
    return null
  }

  if (feature === "comments") {
    if (appType === "tables") {
      if (library === "ag-grid") return pair("table-ag-grid")
      if (library === "tanstack") return pair("table-tanstack")
      return null
    }
    if (appType === "dashboard") {
      return library === "inline-comments" ? pair("inline-comments") : pair("dashboard-comments")
    }
    if (appType === "image-editor") return pair("image-comments")
    if (appType === "website-builder") return pair("website-comments")
    if (appType === "text-editors" && COMMENT_LIBS.has(library)) return pair(`comment-${library}`)
    return null
  }

  if (feature === "realtime") {
    // Single Editor Mode demo shares the tiptap editor visual with the CRDT demo
    if (appType === "text-editors" && library === "tiptap") return pair("crdt-tiptap")
    return null
  }

  if (feature === "self-hosting") {
    if (library === "mongo-db") return pair("self-hosting-mongodb")
    if (library === "postgres") return pair("self-hosting-postgresql")
    if (appType === "forms") return pair("page-mode")
    return null
  }

  return null // cursors and anything unmatched
}
