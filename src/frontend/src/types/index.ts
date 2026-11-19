export type Platform =
  | "instagram"
  | "twitter"
  | "linkedin"
  | "tiktok"
  | "facebook"
  | "youtube";

export type Tone =
  | "playful"
  | "professional"
  | "witty"
  | "inspirational"
  | "casual"
  | "formal";

export type TemplateType =
  | "product_post"
  | "story_hook"
  | "quote"
  | "carousel"
  | "caption"
  | "thread"
  | "short_video"
  | "thumbnail";

export type ContentType = "text" | "image" | "video";

export interface Draft {
  id: string;
  title: string;
  content: string;
  platform: Platform;
  tone: Tone;
  templateType: TemplateType;
  contentType: ContentType;
  createdAt: bigint;
  updatedAt: bigint;
  isPublished: boolean;
}

export interface UserProfile {
  id: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  brandColors: string[];
  defaultTone: Tone;
  defaultPlatform: Platform;
  createdAt: bigint;
}

export interface DashboardStats {
  totalDrafts: bigint;
  publishedCount: bigint;
  engagementRate: number;
  topPlatform: Platform;
  recentActivity: string;
  postsGenerated: bigint;
}

export interface GenerateContentParams {
  platform: Platform;
  tone: Tone;
  templateType: TemplateType;
  contentType: ContentType;
  prompt: string;
  brandVoice?: string;
}
