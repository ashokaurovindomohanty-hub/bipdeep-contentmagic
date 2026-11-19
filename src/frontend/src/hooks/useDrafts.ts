import { createActor } from "@/backend";
import type { ContentType, Draft, Platform, TemplateType, Tone } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Mutable store — mutations operate on this so cache invalidation sees updates
let draftStore: Draft[] = [
  {
    id: "1",
    title: "Product Launch Post",
    content:
      "Introducing our revolutionary new product that's going to change how you work. Experience the future today with cutting-edge features designed for modern creators.",
    platform: "instagram",
    tone: "professional",
    templateType: "product_post",
    contentType: "text",
    createdAt: BigInt(Date.now() - 86400000),
    updatedAt: BigInt(Date.now() - 3600000),
    isPublished: false,
  },
  {
    id: "2",
    title: "Story Hook — Behind the Scenes",
    content:
      "Ever wonder what goes on behind the scenes? We're pulling back the curtain and showing you the magic that makes it all happen ✨",
    platform: "instagram",
    tone: "playful",
    templateType: "story_hook",
    contentType: "text",
    createdAt: BigInt(Date.now() - 172800000),
    updatedAt: BigInt(Date.now() - 7200000),
    isPublished: true,
  },
  {
    id: "3",
    title: "Inspirational Quote Card",
    content:
      "Success is not final, failure is not fatal: it is the courage to continue that counts. Build your dream one day at a time.",
    platform: "linkedin",
    tone: "inspirational",
    templateType: "quote",
    contentType: "image",
    createdAt: BigInt(Date.now() - 259200000),
    updatedAt: BigInt(Date.now() - 14400000),
    isPublished: false,
  },
  {
    id: "4",
    title: "Twitter Thread — Content Strategy",
    content:
      "🧵 Here's everything you need to know about building a winning content strategy in 2026. Thread 👇",
    platform: "twitter",
    tone: "witty",
    templateType: "thread",
    contentType: "text",
    createdAt: BigInt(Date.now() - 345600000),
    updatedAt: BigInt(Date.now() - 28800000),
    isPublished: true,
  },
];

export function useDrafts() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Draft[]>({
    queryKey: ["drafts"],
    queryFn: async () => {
      if (!actor || isFetching) return [...draftStore];
      return [...draftStore];
    },
    enabled: true,
    staleTime: 30000,
  });
}

export function useDraft(id: string) {
  const { data: drafts } = useDrafts();
  return drafts?.find((d) => d.id === id) ?? null;
}

export function useCreateDraft() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      title: string;
      content: string;
      platform: Platform;
      tone: Tone;
      templateType: TemplateType;
      contentType: ContentType;
    }) => {
      const newDraft: Draft = {
        id: String(Date.now()),
        ...params,
        createdAt: BigInt(Date.now()),
        updatedAt: BigInt(Date.now()),
        isPublished: false,
      };
      draftStore = [newDraft, ...draftStore];
      return newDraft;
    },
    onSuccess: (newDraft) => {
      queryClient.setQueryData<Draft[]>(["drafts"], (old) =>
        old ? [newDraft, ...old] : [newDraft],
      );
    },
  });
}

export function useUpdateDraft() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: Partial<Draft> & { id: string }) => {
      const updated = { ...params, updatedAt: BigInt(Date.now()) } as Draft;
      draftStore = draftStore.map((d) =>
        d.id === params.id ? { ...d, ...updated } : d,
      );
      return updated;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<Draft[]>(["drafts"], (old) =>
        old
          ? old.map((d) => (d.id === updated.id ? { ...d, ...updated } : d))
          : [updated],
      );
    },
  });
}

export function useDeleteDraft() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      draftStore = draftStore.filter((d) => d.id !== id);
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData<Draft[]>(["drafts"], (old) =>
        old ? old.filter((d) => d.id !== id) : [],
      );
    },
  });
}
