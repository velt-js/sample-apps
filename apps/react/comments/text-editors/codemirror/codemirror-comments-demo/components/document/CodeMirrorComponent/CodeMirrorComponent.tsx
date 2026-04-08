'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { CodemirrorVeltComments, addComment, renderComments } from '@veltdev/codemirror-velt-comments'
import { useCommentAnnotations } from '@veltdev/react'
import { EditorState, Compartment } from "@codemirror/state"
import { basicSetup, EditorView } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { oneDark } from "@codemirror/theme-one-dark"
import { useTheme } from '@/components/theme/ThemeContext'
import { BubbleMenuToolbar } from './ui/BubbleMenuToolbar'

// Initial content for the editor
const initialContent = `import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Validation schemas
const CreatePhotoSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  url: z.string().url(),
  tags: z.array(z.string()).default([]),
  albumId: z.string().uuid().optional(),
});

const UpdatePhotoSchema = CreatePhotoSchema.partial();

// Middleware: request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(\`[\${req.method}] \${req.path} - \${res.statusCode} (\${duration}ms)\`);
  });
  next();
});

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// GET /photos - List all photos with optional filtering
app.get("/photos", async (req, res) => {
  try {
    const { tag, albumId, page = "1", limit = "20" } = req.query;

    const where: Record<string, unknown> = {};
    if (tag) where.tags = { has: String(tag) };
    if (albumId) where.albumId = String(albumId);

    const photos = await prisma.photo.findMany({
      where,
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: "desc" },
      include: { album: true },
    });

    const total = await prisma.photo.count({ where });

    res.json({
      data: photos,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Failed to fetch photos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /photos/:id - Get a single photo
app.get("/photos/:id", async (req, res) => {
  try {
    const photo = await prisma.photo.findUnique({
      where: { id: req.params.id },
      include: { album: true, comments: true },
    });

    if (!photo) {
      return res.status(404).json({ error: "Photo not found" });
    }

    res.json(photo);
  } catch (error) {
    console.error("Failed to fetch photo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /photos - Create a new photo
app.post("/photos", async (req, res) => {
  try {
    const data = CreatePhotoSchema.parse(req.body);

    const photo = await prisma.photo.create({
      data: {
        title: data.title,
        description: data.description,
        url: data.url,
        tags: data.tags,
        albumId: data.albumId,
      },
    });

    res.status(201).json(photo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Failed to create photo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /photos/:id - Update a photo
app.patch("/photos/:id", async (req, res) => {
  try {
    const data = UpdatePhotoSchema.parse(req.body);

    const photo = await prisma.photo.update({
      where: { id: req.params.id },
      data,
    });

    res.json(photo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Failed to update photo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /photos/:id - Delete a photo
app.delete("/photos/:id", async (req, res) => {
  try {
    await prisma.photo.delete({
      where: { id: req.params.id },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete photo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /albums - List all albums
app.get("/albums", async (_req, res) => {
  try {
    const albums = await prisma.album.findMany({
      include: { _count: { select: { photos: true } } },
      orderBy: { name: "asc" },
    });

    res.json(albums);
  } catch (error) {
    console.error("Failed to fetch albums:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});

export default app;
`

/** Light theme for CodeMirror editor */
function lightEditorTheme() {
  return EditorView.theme({
    "&": {
      height: "100%",
      fontSize: "14px",
      backgroundColor: "#ffffff"
    },
    ".cm-scroller": {
      overflow: "auto",
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace"
    },
    ".cm-content": {
      caretColor: "#24292f",
      padding: "10px 0"
    },
    ".cm-line": {
      padding: "0 8px"
    },
    ".cm-gutters": {
      backgroundColor: "#f6f8fa",
      color: "#656d76",
      border: "none",
      borderRight: "1px solid #d1d9e0"
    },
    ".cm-activeLineGutter": {
      backgroundColor: "#f0f6ff"
    },
    ".cm-activeLine": {
      backgroundColor: "rgba(84, 174, 255, 0.08)"
    }
  })
}

/** Dark theme for CodeMirror editor (includes oneDark syntax) */
function darkEditorTheme() {
  return [
    oneDark,
    EditorView.theme({
      "&": {
        height: "100%",
        fontSize: "14px",
        backgroundColor: "#1e1e1e"
      },
      ".cm-scroller": {
        overflow: "auto",
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace"
      },
      ".cm-content": {
        caretColor: "#fff",
        padding: "10px 0"
      },
      ".cm-line": {
        padding: "0 8px"
      },
      ".cm-gutters": {
        backgroundColor: "#1e1e1e",
        color: "#858585",
        border: "none"
      },
      ".cm-activeLineGutter": {
        backgroundColor: "#2a2a2a"
      },
      ".cm-activeLine": {
        backgroundColor: "#2a2a2a"
      }
    }),
  ]
}

export default function CodeMirrorComponent() {
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const themeCompartmentRef = useRef(new Compartment())
  const bubbleMenuRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const commentAnnotations = useCommentAnnotations()

  const [showBubbleMenu, setShowBubbleMenu] = useState(false)
  const [bubbleMenuPosition, setBubbleMenuPosition] = useState({ top: 0, left: 0 })

  const updateBubbleMenu = useCallback(() => {
    const view = viewRef.current
    if (!view) return

    const { from, to } = view.state.selection.main
    if (from === to) {
      setShowBubbleMenu(false)
      return
    }

    const domSelection = window.getSelection()
    if (!domSelection || domSelection.rangeCount === 0) {
      setShowBubbleMenu(false)
      return
    }

    const domRange = domSelection.getRangeAt(0)
    const rect = domRange.getBoundingClientRect()

    const menuHeight = bubbleMenuRef.current?.offsetHeight || 50
    const menuWidth = bubbleMenuRef.current?.offsetWidth || 60

    setBubbleMenuPosition({
      top: rect.top + window.scrollY - menuHeight - 10,
      left: rect.left + window.scrollX + rect.width / 2 - menuWidth / 2,
    })

    setShowBubbleMenu(true)
  }, [])

  const handleAddComment = useCallback(() => {
    const view = viewRef.current
    if (!view) return
    addComment({ editor: view })
    setShowBubbleMenu(false)
  }, [])

  // Create the editor
  useEffect(() => {
    if (!editorRef.current) return

    // Clean up existing view if any
    if (viewRef.current) {
      viewRef.current.destroy()
      viewRef.current = null
    }

    const themeCompartment = themeCompartmentRef.current
    const initialThemeExtension = resolvedTheme === 'dark' ? darkEditorTheme() : lightEditorTheme()

    const startState = EditorState.create({
      doc: initialContent,
      extensions: [
        basicSetup,
        themeCompartment.of(initialThemeExtension),
        javascript({ typescript: true }),
        CodemirrorVeltComments(),
        EditorView.updateListener.of((update) => {
          if (update.selectionSet || update.docChanged) {
            requestAnimationFrame(() => updateBubbleMenu())
          }
        }),
      ],
    })

    viewRef.current = new EditorView({
      state: startState,
      parent: editorRef.current,
    })

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy()
        viewRef.current = null
      }
    }
  }, [])

  // Render comment highlights when annotations change
  useEffect(() => {
    if (viewRef.current && commentAnnotations) {
      renderComments({ editor: viewRef.current, commentAnnotations })
    }
  }, [commentAnnotations])

  // Reconfigure theme when resolvedTheme changes
  useEffect(() => {
    if (!viewRef.current) return
    const newThemeExtension = resolvedTheme === 'dark' ? darkEditorTheme() : lightEditorTheme()
    viewRef.current.dispatch({
      effects: themeCompartmentRef.current.reconfigure(newThemeExtension),
    })
  }, [resolvedTheme])

  return (
    <div className="h-full w-full overflow-hidden flex flex-col relative">
      <div ref={editorRef} className="flex-1 min-h-0" style={{ overflow: 'auto' }} />
      {showBubbleMenu && (
        <div
          ref={bubbleMenuRef}
          className="fixed z-50"
          style={{
            top: `${bubbleMenuPosition.top}px`,
            left: `${bubbleMenuPosition.left}px`,
          }}
        >
          <BubbleMenuToolbar onAddComment={handleAddComment} />
        </div>
      )}
    </div>
  )
}
