"use client"

import * as React from "react"
import { Monitor, Redo2, Smartphone, Sparkles, Tablet, Undo2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"

const DEVICES = [
  { key: "desktop", label: "Desktop", icon: Monitor },
  { key: "tablet", label: "Tablet", icon: Tablet },
  { key: "phone", label: "Phone", icon: Smartphone },
] as const

type DeviceKey = (typeof DEVICES)[number]["key"]

export default function Page() {
  const [device, setDevice] = React.useState<DeviceKey>("desktop")
  const [autoSave, setAutoSave] = React.useState(true)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="relative flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">ui</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>button.tsx</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Desktop / Tablet / Phone preview toggle — centered, hidden on mobile viewports */}
          <div className="bg-muted/40 absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-lg border p-1 sm:flex">
            {DEVICES.map((item) => (
              <button
                key={item.key}
                type="button"
                title={item.label}
                aria-pressed={device === item.key}
                onClick={() => setDevice(item.key)}
                className={cn(
                  "flex items-center justify-center rounded-md border px-2.5 py-1.5 transition-colors",
                  device === item.key
                    ? "border-border bg-background text-foreground"
                    : "text-muted-foreground hover:text-foreground border-transparent"
                )}
              >
                <item.icon className="size-4" />
              </button>
            ))}
          </div>

          {/* Undo / redo / autosave / save — always on the right */}
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="size-8" title="Undo">
              <Undo2 />
            </Button>
            <Button variant="ghost" size="icon" className="size-8" title="Redo">
              <Redo2 />
            </Button>
            <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-5" />
            <label className="text-muted-foreground flex items-center gap-2 text-sm">
              <Switch
                checked={autoSave}
                onCheckedChange={setAutoSave}
                size="sm"
                title="Auto-save"
              />
              Auto-save
            </label>
            <Button size="sm" className="bg-emerald-700 text-white hover:bg-emerald-700/90">
              Save
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Home page placeholder: nav bar + a few cards */}
          <div className="bg-background flex flex-1 flex-col overflow-hidden rounded-xl border md:min-h-min">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div className="bg-muted-foreground/20 h-4 w-24 rounded" />
              <div className="hidden items-center gap-6 sm:flex">
                <div className="bg-muted-foreground/20 h-3 w-10 rounded" />
                <div className="bg-muted-foreground/20 h-3 w-10 rounded" />
                <div className="bg-muted-foreground/20 h-3 w-10 rounded" />
              </div>
              <div className="bg-muted-foreground/20 h-8 w-20 rounded-md" />
            </div>
            <div className="grid auto-rows-min gap-4 p-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[60vh] flex-1 rounded-xl bg-muted/50 m-4" />
          </div>
        </div>

        {/* Floating AI assistant launcher — fixed bottom-right */}
        <button
          type="button"
          title="AI assistant"
          className="fixed bottom-6 right-6 z-50 flex size-12 items-center justify-center rounded-full"
        >
          <span className="bg-primary/40 absolute inset-0 animate-ping rounded-full" />
          <span className="bg-primary relative flex size-12 items-center justify-center rounded-full text-primary-foreground shadow-lg">
            <Sparkles className="size-5 animate-pulse" />
          </span>
        </button>
      </SidebarInset>
    </SidebarProvider>
  )
}
