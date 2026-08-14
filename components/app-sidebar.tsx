"use client"

import * as React from "react"
import {
  ChevronRight,
  Eraser,
  Eye,
  File,
  Folder,
  Hash,
  House,
  Layers,
  Moon,
  Plus,
  Sun,
} from "lucide-react"
// Note: the leading icon on each "file" leaf in the Sections tree is the
// File icon. Eye is used for the visibility-toggle action in the Layers
// panel.

import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"

// This is sample data.
const data = {
  tree: [
    {
      type: "folder" as const,
      label: "Nav Bar",
      children: [
        {
          type: "folder" as const,
          label: "minimal",
          children: [
            { type: "file" as const, label: "Style 1", description: "preview" },
            { type: "file" as const, label: "Style 2", description: "preview" },
          ],
        },
        {
          type: "folder" as const,
          label: "modern",
          children: [
            { type: "file" as const, label: "Style 1", description: "preview" },
            { type: "file" as const, label: "Style 2", description: "preview" },
          ],
        },
        {
          type: "folder" as const,
          label: "left-side",
          children: [
            { type: "file" as const, label: "Style 1", description: "preview" },
            { type: "file" as const, label: "Style 2", description: "preview" },
          ],
        },
        {
          type: "folder" as const,
          label: "right-side",
          children: [
            { type: "file" as const, label: "Style 1", description: "preview" },
            { type: "file" as const, label: "Style 2", description: "preview" },
          ],
        },
      ],
    },
    {
      type: "folder" as const,
      label: "Hero section",
      children: [
        {
          type: "folder" as const,
          label: "minimal",
          children: [
            { type: "file" as const, label: "Style 1", description: "preview" },
            { type: "file" as const, label: "Style 2", description: "preview" },
          ],
        },
        {
          type: "folder" as const,
          label: "simple",
          children: [
            { type: "file" as const, label: "Style 1", description: "preview" },
            { type: "file" as const, label: "Style 2", description: "preview" },
          ],
        },
        {
          type: "folder" as const,
          label: "modern",
          children: [
            { type: "file" as const, label: "Style 1", description: "preview" },
            { type: "file" as const, label: "Style 2", description: "preview" },
          ],
        },
      ],
    },

    {
      type: "folder" as const,
      label: "Cards",
      description: "Blocks to add within the sections",
      children: [
        { type: "file" as const, label: "Style 1", description: "title + description" },
        { type: "file" as const, label: "Style 2", description: "icon + title + description" },
        { type: "file" as const, label: "Style 3", description: "image/gif + title + description" },
        { type: "file" as const, label: "Style 4", description: "title + description + button" },
        { type: "file" as const, label: "Style 5", description: "icon + title + description + button" },
        { type: "file" as const, label: "Style 6", description: "image/gif + title + description + button" },
        { type: "file" as const, label: "Style 8" },
      ],
    },
    {
      type: "folder" as const,
      label: "Interactive Cards",
      children: [
        { type: "file" as const, label: "Card 1", description: "FAQ (simple)" },
        { type: "file" as const, label: "Card 2", description: "FAQ (drop down list)" },
        { type: "file" as const, label: "Card 3", description: "location (live preview of a location link)" },
        { type: "file" as const, label: "Card 4" },
      ],
    },
    {
      type: "folder" as const,
      label: "More to add",
      children: [
        { type: "file" as const, label: "Image" },
        { type: "file" as const, label: "GIF" },
        { type: "file" as const, label: "Icon", description: "with option to add a link on click" },
        { type: "file" as const, label: "Text", description: "with option to add a link on click" },
        { type: "file" as const, label: "Button" },
        { type: "file" as const, label: "Divider", description: "between sections" },
        { type: "file" as const, label: "Horizontal timeline", description: "selected number of circles" },
        { type: "file" as const, label: "Vertical timeline", description: "selected number of circles" },
      ],
    },
  ],
}

// Sample data for the new "Pages" tab.
const pages = [
  { label: "Home", path: "/home", icon: House, isHome: true },
  { label: "Projects", path: "/projects", icon: File, isHome: false },
  { label: "About", path: "/about", icon: File, isHome: false },
]

// Sample data for the new "Layers" tab.
const layers = [
  { label: "Nav Bar" },
  { label: "Hero Section" },
  { label: "Cards" },
  { label: "Footer" },
]

const TABS = [
  { key: "pages", label: "Pages", icon: Hash },
  { key: "sections", label: "Sections", icon: Plus },
  { key: "layers", label: "Layers", icon: Layers },
] as const

type TabKey = (typeof TABS)[number]["key"]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeTab, setActiveTab] = React.useState<TabKey>("sections")
  const [devMode, setDevMode] = React.useState(false)
  const [isDark, setIsDark] = React.useState(false)

  return (
    <Sidebar {...props}>
      <SidebarContent>
        <TabToolbar active={activeTab} onChange={setActiveTab} />

        {activeTab === "pages" && <PagesPanel />}

        {activeTab === "sections" && (
          <>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setDevMode((v) => !v)}
                      className="justify-between"
                    >
                      Dev Mode
                      <Switch
                        checked={devMode}
                        onCheckedChange={setDevMode}
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Toggle Dev Mode"
                      />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setIsDark((v) => !v)}>
                      {isDark ? <Sun /> : <Moon />}
                      Portfolio mode
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Files</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-sidebar-foreground/70 border-sidebar-border border border-dashed">
                      <Plus />
                      Sections
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {data.tree.map((item, index) => (
                    <Tree key={index} item={item} />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        {activeTab === "layers" && <LayersPanel />}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

function TabToolbar({
  active,
  onChange,
}: {
  active: TabKey
  onChange: (tab: TabKey) => void
}) {
  return (
    <div className="border-sidebar-border bg-sidebar mx-2 mt-2 flex items-center gap-1 rounded-lg border p-1">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          type="button"
          title={tab.label}
          aria-pressed={active === tab.key}
          onClick={() => onChange(tab.key)}
          className={cn(
            "flex flex-1 items-center justify-center rounded-md border py-1.5 transition-colors",
            active === tab.key
              ? "border-sidebar-border bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 border-transparent"
          )}
        >
          <tab.icon className="size-4" />
        </button>
      ))}
    </div>
  )
}

function PagesPanel() {
  return (
    <SidebarGroup>
      <div className="flex items-center justify-between px-2">
        <SidebarGroupLabel className="px-0">Pages</SidebarGroupLabel>
        <span className="text-muted-foreground text-xs">Home</span>
      </div>
      <SidebarGroupContent>
        <p className="text-muted-foreground px-2 pb-3 text-xs leading-relaxed">
          Start with Home, then add any pages you need. Each page has its own
          design and can be linked from your header navigation.
        </p>
        <SidebarMenu>
          {pages.map((page) => (
            <SidebarMenuItem key={page.path}>
              <SidebarMenuButton isActive={page.isHome} className="h-auto py-2">
                <span className="bg-sidebar-accent flex size-8 shrink-0 items-center justify-center rounded-md">
                  <page.icon className="size-4" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="flex items-center gap-1.5">
                    <span className="truncate font-medium">{page.label}</span>
                    {page.isHome && (
                      <span className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
                        Home
                      </span>
                    )}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {page.path}
                  </span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarMenuButton className="border-sidebar-border text-sidebar-foreground/70 mt-3 justify-center border border-dashed">
          <Plus />
          Add Page
        </SidebarMenuButton>
        <button
          type="button"
          className="text-muted-foreground hover:text-sidebar-foreground mt-2 flex w-full items-center justify-center gap-1.5 text-xs"
        >
          <Eraser className="size-3.5" />
          Clear current page
        </button>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function LayersPanel() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Layers</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {layers.map((layer) => (
            <SidebarMenuItem key={layer.label}>
              <SidebarMenuButton>
                <Layers className="text-muted-foreground" />
                {layer.label}
              </SidebarMenuButton>
              <SidebarMenuAction title={`Toggle ${layer.label} visibility`}>
                <Eye />
              </SidebarMenuAction>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

type TreeNode =
  | {
      type: "folder"
      label: string
      description?: string
      children: TreeNode[]
    }
  | {
      type: "file"
      label: string
      description?: string
    }

function Tree({ item }: { item: TreeNode }) {
  if (item.type === "file") {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton className="data-[active=true]:bg-transparent">
          <File className="text-muted-foreground" />
          <span className="flex min-w-0 flex-col">
            <span className="truncate">{item.label}</span>
            {item.description && (
              <span className="text-muted-foreground truncate text-xs">
                {item.description}
              </span>
            )}
          </span>
        </SidebarMenuButton>
        <SidebarMenuAction title={`Add ${item.label}`}>
          <Plus />
        </SidebarMenuAction>
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen={item.label === "Hero section"}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="transition-transform" />
            <Folder />
            <span className="flex min-w-0 flex-col">
              <span className="truncate">{item.label}</span>
              {item.description && (
                <span className="text-muted-foreground truncate text-xs">
                  {item.description}
                </span>
              )}
            </span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children.map((subItem, index) => (
              <Tree key={index} item={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}
