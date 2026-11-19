import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useDeleteDraft, useDrafts, useUpdateDraft } from "@/hooks/useDrafts";
import type { Draft } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  Check,
  Edit,
  FileText,
  Search,
  Send,
  Trash2,
  Wand2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function formatDate(timestamp: bigint): string {
  const date = new Date(Number(timestamp));
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const PLATFORM_COLORS: Record<string, string> = {
  instagram: "bg-secondary/10 text-secondary-foreground border-secondary/20",
  twitter: "bg-primary/10 text-primary border-primary/20",
  linkedin: "bg-accent/10 text-accent-foreground border-accent/20",
  tiktok: "bg-muted text-muted-foreground",
  facebook: "bg-muted text-muted-foreground",
  youtube: "bg-destructive/10 text-destructive border-destructive/20",
};

function DraftRow({ draft, index }: { draft: Draft; index: number }) {
  const deleteDraft = useDeleteDraft();
  const updateDraft = useUpdateDraft();
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(draft.title);
  const [editContent, setEditContent] = useState(draft.content);

  const handleDelete = async () => {
    await deleteDraft.mutateAsync(draft.id);
    toast.success("Draft deleted");
  };

  const handleEditSave = async () => {
    await updateDraft.mutateAsync({
      id: draft.id,
      title: editTitle,
      content: editContent,
    });
    toast.success("Draft updated");
    setEditing(false);
  };

  const handleEditCancel = () => {
    setEditTitle(draft.title);
    setEditContent(draft.content);
    setEditing(false);
  };

  return (
    <Card className="card-elevated group" data-ocid={`drafts.item.${index}`}>
      <CardContent className="p-4">
        {editing ? (
          <div className="space-y-3">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="input-base font-semibold"
              data-ocid={`drafts.edit_title_input.${index}`}
            />
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={3}
              className="input-base text-sm resize-none"
              data-ocid={`drafts.edit_content_textarea.${index}`}
            />
            <div className="flex items-center gap-2 justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditCancel}
                data-ocid={`drafts.edit_cancel_button.${index}`}
              >
                <X className="h-3.5 w-3.5 mr-1" />
                Cancel
              </Button>
              <Button
                size="sm"
                className="button-primary"
                onClick={handleEditSave}
                disabled={updateDraft.isPending}
                data-ocid={`drafts.edit_save_button.${index}`}
              >
                <Check className="h-3.5 w-3.5 mr-1" />
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
              <FileText className="h-4 w-4 text-primary" />
            </div>

            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-sm text-foreground font-display leading-snug line-clamp-1">
                  {draft.title}
                </h3>
                <div className="flex items-center gap-1 shrink-0">
                  {draft.isPublished && (
                    <Badge variant="secondary" className="text-xs">
                      Published
                    </Badge>
                  )}
                  <span
                    className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs capitalize ${PLATFORM_COLORS[draft.platform] ?? "bg-muted text-muted-foreground"}`}
                  >
                    {draft.platform}
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {draft.content}
              </p>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span className="text-xs">{formatDate(draft.updatedAt)}</span>
                  <span className="text-xs">·</span>
                  <span className="text-xs capitalize">{draft.tone}</span>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-smooth">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setEditing(true)}
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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        data-ocid={`drafts.delete_button.${index}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent
                      data-ocid={`drafts.delete_dialog.${index}`}
                    >
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete draft?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete "{draft.title}". This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          data-ocid={`drafts.delete_cancel_button.${index}`}
                        >
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          data-ocid={`drafts.delete_confirm_button.${index}`}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function DraftsPage() {
  const { data: drafts, isLoading } = useDrafts();
  const [search, setSearch] = useState("");

  const filtered =
    drafts?.filter(
      (d) =>
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.content.toLowerCase().includes(search.toLowerCase()) ||
        d.platform.includes(search.toLowerCase()),
    ) ?? [];

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto" data-ocid="drafts.page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground tracking-tight">
            Saved Drafts
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {drafts
              ? `${drafts.length} draft${drafts.length !== 1 ? "s" : ""}`
              : "Loading…"}
          </p>
        </div>
        <Link to="/generate">
          <Button
            className="button-primary gap-2 hidden sm:inline-flex"
            data-ocid="drafts.new_draft_button"
          >
            <Wand2 className="h-4 w-4" />
            New Draft
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search drafts by title, content, or platform…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 input-base"
          data-ocid="drafts.search_input"
        />
      </div>

      {/* List */}
      {isLoading ? (
        <div className="space-y-3" data-ocid="drafts.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="card-elevated" data-ocid="drafts.empty_state">
          <CardContent className="p-12 flex flex-col items-center gap-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <FileText className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-base font-display text-foreground">
                {search ? "No drafts found" : "No drafts yet"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {search
                  ? `No drafts match "${search}". Try a different search.`
                  : "Start generating content to build your draft library."}
              </p>
            </div>
            {!search && (
              <Link to="/generate">
                <Button
                  className="button-primary gap-2 mt-1"
                  data-ocid="drafts.create_first_button"
                >
                  <Wand2 className="h-4 w-4" />
                  Generate your first draft
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((draft, i) => (
            <DraftRow key={draft.id} draft={draft} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
