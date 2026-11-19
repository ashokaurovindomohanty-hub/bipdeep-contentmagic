import type { backendInterface, Draft, DashboardStats, UserProfile } from "../backend";
import { Platform, TemplateType, Tone, UserRole } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

const sampleDrafts: Draft[] = [
  {
    id: BigInt(1),
    title: "Product Post",
    content: "Introducing our latest product — crafted for creators who demand the best. Try it today!",
    owner: { toString: () => "aaaa-bb" } as any,
    createdAt: now - BigInt(86_400_000_000_000),
    updatedAt: now - BigInt(3_600_000_000_000),
    tone: Tone.professional,
    platform: Platform.instagram,
    templateType: TemplateType.productPost,
  },
  {
    id: BigInt(2),
    title: "Story Hook",
    content: "You won't believe what happened when I switched my morning routine… 🌅",
    owner: { toString: () => "aaaa-bb" } as any,
    createdAt: now - BigInt(172_800_000_000_000),
    updatedAt: now - BigInt(7_200_000_000_000),
    tone: Tone.casual,
    platform: Platform.tiktok,
    templateType: TemplateType.storyHook,
  },
  {
    id: BigInt(3),
    title: "Inspirational Quote",
    content: "\"The secret of getting ahead is getting started.\" — Mark Twain",
    owner: { toString: () => "aaaa-bb" } as any,
    createdAt: now - BigInt(259_200_000_000_000),
    updatedAt: now - BigInt(10_800_000_000_000),
    tone: Tone.inspirational,
    platform: Platform.linkedin,
    templateType: TemplateType.quote,
  },
  {
    id: BigInt(4),
    title: "Call To Action",
    content: "Ready to level up? Join 10,000+ creators already using BipDeep ContentMagic. Sign up free!",
    owner: { toString: () => "aaaa-bb" } as any,
    createdAt: now - BigInt(345_600_000_000_000),
    updatedAt: now - BigInt(14_400_000_000_000),
    tone: Tone.humorous,
    platform: Platform.twitter,
    templateType: TemplateType.callToAction,
  },
];

const sampleProfile: UserProfile = {
  name: "Alex Rivera",
  email: "alex@example.com",
};

const sampleStats: DashboardStats = {
  totalDrafts: BigInt(419),
  lastGeneratedAt: now - BigInt(3_600_000_000_000),
};

export const mockBackend: backendInterface = {
  _initializeAccessControl: async () => undefined,

  assignCallerUserRole: async (_user, _role) => undefined,

  createDraft: async (input) => ({
    id: BigInt(Math.floor(Math.random() * 10000)),
    title: input.title,
    content: input.content,
    owner: { toString: () => "aaaa-bb" } as any,
    createdAt: BigInt(Date.now()) * BigInt(1_000_000),
    updatedAt: BigInt(Date.now()) * BigInt(1_000_000),
    tone: input.tone,
    platform: input.platform,
    templateType: input.templateType,
  }),

  deleteDraft: async (_id) => true,

  generateContent: async (_request) =>
    "✨ Here's your AI-generated content: Elevate your brand with BipDeep ContentMagic — where creativity meets intelligence. Create. Enchant. Repeat.",

  getCallerUserProfile: async () => sampleProfile,

  getCallerUserRole: async () => UserRole.user,

  getDashboardStats: async () => sampleStats,

  getDraft: async (id) => sampleDrafts.find((d) => d.id === id) ?? null,

  getUserProfile: async (_user) => sampleProfile,

  isCallerAdmin: async () => false,

  listDrafts: async () => sampleDrafts,

  saveCallerUserProfile: async (_profile) => undefined,

  transform: async (input) => ({
    status: BigInt(200),
    body: input.response.body,
    headers: input.response.headers,
  }),

  updateDraft: async (_id, _input) => true,
};
