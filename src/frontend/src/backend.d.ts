import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface GenerateContentRequest {
    tone: Tone;
    platform: Platform;
    templateType: TemplateType;
    prompt: string;
}
export interface Draft {
    id: bigint;
    title: string;
    content: string;
    owner: UserId;
    createdAt: Timestamp;
    tone: Tone;
    platform: Platform;
    templateType: TemplateType;
    updatedAt: Timestamp;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type UserId = Principal;
export interface DashboardStats {
    totalDrafts: bigint;
    lastGeneratedAt?: Timestamp;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface DraftUpdateInput {
    title: string;
    content: string;
    tone: Tone;
    platform: Platform;
    templateType: TemplateType;
}
export interface DraftInput {
    title: string;
    content: string;
    tone: Tone;
    platform: Platform;
    templateType: TemplateType;
}
export interface UserProfile {
    name: string;
    email: string;
}
export enum Platform {
    linkedin = "linkedin",
    tiktok = "tiktok",
    twitter = "twitter",
    instagram = "instagram"
}
export enum TemplateType {
    storyHook = "storyHook",
    quote = "quote",
    productPost = "productPost",
    callToAction = "callToAction"
}
export enum Tone {
    humorous = "humorous",
    professional = "professional",
    casual = "casual",
    inspirational = "inspirational"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createDraft(input: DraftInput): Promise<Draft>;
    deleteDraft(id: bigint): Promise<boolean>;
    generateContent(request: GenerateContentRequest): Promise<string>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDashboardStats(): Promise<DashboardStats>;
    getDraft(id: bigint): Promise<Draft | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listDrafts(): Promise<Array<Draft>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateDraft(id: bigint, input: DraftUpdateInput): Promise<boolean>;
}
