# Sidebar 11 — shadcn/ui block

A ready-to-run Next.js 16 + Tailwind v4 project containing the shadcn/ui
`sidebar-11` block (a sidebar with a collapsible file tree).

## What's inside

- `app/page.tsx` — the demo page (breadcrumb header + content area + sidebar)
- `components/app-sidebar.tsx` — the sidebar itself, with the sample
  "Changes" + "Files" tree data. **Edit the `data` object here** to swap in
  your own files/folders.
- `components/ui/` — the shadcn primitives the block depends on
  (`sidebar`, `sheet`, `tooltip`, `breadcrumb`, `collapsible`, `button`,
  `input`, `separator`, `skeleton`)
- `hooks/use-mobile.ts` — mobile breakpoint hook used by the sidebar
- `lib/utils.ts` — the `cn()` class-merging helper
- `components.json` — shadcn CLI config (so `npx shadcn add <component>`
  works to pull in more components later)

## Setup

1. Unzip the project and open a terminal in the folder.
2. Install dependencies:
   ```bash
   npm install
   ```
   (Requires Node.js 18.18+ — Node 20+ recommended.)

## Preview

Run the dev server:

```bash
npm run dev
```

Then open **http://localhost:3000** in your browser. You should see the
sidebar on the left with two collapsible sections ("Changes" and "Files") and
a demo content area on the right. Try the sidebar-toggle button in the
header, or `Cmd/Ctrl+B`.

## Editing

- **Sidebar data**: edit the `data` object at the top of
  `components/app-sidebar.tsx`.
- **Layout / header**: edit `app/page.tsx`.
- **Theme colors**: edit the CSS variables in `app/globals.css`
  (`--sidebar`, `--sidebar-foreground`, etc. control the sidebar specifically;
  everything else follows the standard shadcn theme tokens). Dark mode
  variables live under the `.dark` selector — add `className="dark"` to
  `<html>` in `app/layout.tsx` to test it.
- **Add more shadcn components**: `npx shadcn@latest add <component-name>`.

## Build for production

```bash
npm run build
npm run start
```
