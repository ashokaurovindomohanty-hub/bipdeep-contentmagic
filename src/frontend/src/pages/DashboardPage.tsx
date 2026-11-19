import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDrafts } from "@/hooks/useDrafts";
import type { Draft, Platform } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Edit,
  FileText,
  Instagram,
  Linkedin,
  Send,
  Sparkles,
  TrendingUp,
  Twitter,
  Wand2,
} from "lucide-react";
import type { ComponentType } from "react";

const PLATFORM_ICONS: Record<
  Platform,
  ComponentType<{ className?: string }>
> = {
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  tiktok: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-label="TikTok"
    >
      <title>TikTok</title>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
    </svg>
  ),
  facebook: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-label="Facebook"
    >
      <title>Facebook</title>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  youtube: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-label="YouTube"
    >
      <title>YouTube</title>
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

function PlatformIcon({ platform }: { platform: Platform }) {
  const Icon = PLATFORM_ICONS[platform];
  return <Icon className="h-4 w-4" />;
}

function DraftCard({ draft, index }: { draft: Draft; index: number }) {
  const navigate = useNavigate();
  return (
    <Card className="card-elevated group" data-ocid={`drafts.item.${index}`}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold text-sm text-foreground font-display leading-tight line-clamp-1">
            {draft.title}
          </p>
          {draft.isPublished && (
            <Badge variant="secondary" className="shrink-0 text-xs">
              Published
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {draft.content}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <PlatformIcon platform={draft.platform} />
            <span className="text-xs capitalize">{draft.platform}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => navigate({ to: "/drafts" })}
              data-ocid={`drafts.edit_button.${index}`}
            >
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-primary hover:text-primary"
              data-ocid={`drafts.publish_button.${index}`}
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  gradient,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub?: string;
  gradient?: boolean;
}) {
  return (
    <Card
      className={
        gradient
          ? "border-0 bg-gradient-primary text-primary-foreground shadow-lg"
          : "card-elevated"
      }
    >
      <CardContent className="p-4 flex items-center gap-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${gradient ? "bg-primary-foreground/20" : "bg-primary/10"}`}
        >
          <Icon
            className={`h-5 w-5 ${gradient ? "text-primary-foreground" : "text-primary"}`}
          />
        </div>
        <div className="min-w-0">
          <p
            className={`text-xs font-medium ${gradient ? "text-primary-foreground/70" : "text-muted-foreground"} truncate`}
          >
            {label}
          </p>
          <p
            className={`text-2xl font-bold font-display ${gradient ? "text-primary-foreground" : "text-foreground"} leading-tight`}
          >
            {value}
          </p>
          {sub && (
            <p
              className={`text-xs ${gradient ? "text-primary-foreground/60" : "text-muted-foreground"} truncate`}
            >
              {sub}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { data: drafts, isLoading } = useDrafts();

  const recentDrafts = drafts?.slice(0, 4) ?? [];
  const publishedCount = drafts?.filter((d) => d.isPublished).length ?? 0;

  const lastGeneratedLabel = (() => {
    if (!drafts || drafts.length === 0) return "—";
    const maxTs = drafts.reduce(
      (max, d) => (d.updatedAt > max ? d.updatedAt : max),
      BigInt(0),
    );
    const date = new Date(Number(maxTs));
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  })();

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto" data-ocid="dashboard.page">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Your content creation command center
          </p>
        </div>
        <Link to="/generate">
          <Button
            className="button-primary gap-2 hidden sm:inline-flex"
            data-ocid="dashboard.create_content_button"
          >
            <Wand2 className="h-4 w-4" />
            Create Content
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <section data-ocid="dashboard.stats_section">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Sparkles}
            label="Posts Generated"
            value={String(drafts?.length ?? 0)}
            gradient
          />
          <StatCard
            icon={Send}
            label="Published"
            value={String(publishedCount)}
            sub="content pieces"
          />
          <StatCard
            icon={TrendingUp}
            label="Last Generated"
            value={lastGeneratedLabel}
            sub="most recent update"
          />
          <StatCard
            icon={Activity}
            label="Top Platform"
            value="LinkedIn"
            sub="Most engagement"
          />
        </div>
      </section>

      {/* Quick actions */}
      <section data-ocid="dashboard.quick_actions_section">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold font-display text-foreground">
            Quick Actions
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: Wand2,
              title: "Generate Content",
              desc: "AI-powered post creation",
              href: "/generate",
              id: "generate",
              accent: true,
            },
            {
              icon: FileText,
              title: "View Drafts",
              desc: "Browse your saved content",
              href: "/drafts",
              id: "drafts",
              accent: false,
            },
            {
              icon: BarChart3,
              title: "Analytics",
              desc: "Track performance metrics",
              href: "/",
              id: "analytics",
              accent: false,
            },
          ].map((action) => (
            <Link key={action.id} to={action.href}>
              <Card
                className={`group cursor-pointer transition-smooth hover:shadow-lg ${action.accent ? "border-primary/30 bg-primary/5" : "card-elevated"}`}
                data-ocid={`dashboard.${action.id}_quick_action`}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${action.accent ? "bg-gradient-primary" : "bg-muted"}`}
                  >
                    <action.icon
                      className={`h-5 w-5 ${action.accent ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"}`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm font-display text-foreground">
                      {action.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {action.desc}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-smooth shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Drafts */}
      <section data-ocid="dashboard.recent_drafts_section">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold font-display text-foreground">
            Recent Drafts
          </h2>
          <Link
            to="/drafts"
            className="text-sm font-medium text-primary hover:opacity-80 transition-smooth flex items-center gap-1"
            data-ocid="dashboard.view_all_drafts_link"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            data-ocid="dashboard.drafts_loading_state"
          >
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-36 rounded-lg" />
            ))}
          </div>
        ) : recentDrafts.length === 0 ? (
          <Card
            className="card-elevated"
            data-ocid="dashboard.drafts_empty_state"
          >
            <CardContent className="p-8 flex flex-col items-center gap-3 text-center">
              <FileText className="h-10 w-10 text-muted-foreground/50" />
              <p className="font-medium text-foreground">No drafts yet</p>
              <p className="text-sm text-muted-foreground">
                Start creating content to see your drafts here
              </p>
              <Link to="/generate">
                <Button
                  size="sm"
                  className="button-primary mt-1"
                  data-ocid="dashboard.create_first_draft_button"
                >
                  <Wand2 className="mr-2 h-4 w-4" />
                  Create your first draft
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentDrafts.map((draft, i) => (
              <DraftCard key={draft.id} draft={draft} index={i + 1} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
