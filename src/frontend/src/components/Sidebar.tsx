import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Link, useRouter } from "@tanstack/react-router";
import {
  ChevronRight,
  FileText,
  LayoutDashboard,
  Menu,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/", id: "dashboard" },
  { label: "Generate Content", icon: Wand2, href: "/generate", id: "generate" },
  { label: "Saved Drafts", icon: FileText, href: "/drafts", id: "drafts" },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

function NavItem({
  item,
  onClick,
}: {
  item: (typeof navItems)[0];
  onClick?: () => void;
}) {
  const router = useRouter();
  const isActive = router.state.location.pathname === item.href;

  return (
    <Link
      to={item.href}
      onClick={onClick}
      data-ocid={`sidebar.${item.id}_link`}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth group",
        isActive
          ? "bg-primary text-primary-foreground shadow-md"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <item.icon
        className={cn(
          "h-4 w-4 shrink-0 transition-smooth",
          isActive
            ? "text-primary-foreground"
            : "text-muted-foreground group-hover:text-foreground",
        )}
      />
      <span className="flex-1 truncate">{item.label}</span>
      {isActive && <ChevronRight className="h-3 w-3 opacity-60" />}
    </Link>
  );
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          role="button"
          tabIndex={0}
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
          onClick={onClose}
          onKeyDown={(e) => e.key === "Escape" && onClose()}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-card border-r border-border transition-transform duration-300 ease-in-out",
          "md:relative md:translate-x-0 md:flex",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2.5" onClick={onClose}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-md">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground font-display leading-tight truncate">
                BipDeep
              </p>
              <p className="text-xs text-muted-foreground leading-tight truncate">
                ContentMagic
              </p>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-7 w-7"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <p className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Menu
          </p>
          {navItems.map((item) => (
            <NavItem key={item.id} item={item} onClick={onClose} />
          ))}
        </nav>

        <Separator />

        {/* Footer tagline */}
        <div className="px-4 py-3">
          <p className="text-xs text-muted-foreground text-center italic">
            Create. Enchant. Repeat.
          </p>
        </div>
      </aside>
    </>
  );
}
