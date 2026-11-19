import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useCreateDraft } from "@/hooks/useDrafts";
import type { ContentType, Platform, TemplateType, Tone } from "@/types";
import {
  Copy,
  Instagram,
  Linkedin,
  RefreshCw,
  Save,
  Sparkles,
  Twitter,
  Wand2,
} from "lucide-react";
import type { ComponentType } from "react";
import { useState } from "react";
import { toast } from "sonner";

const TONE_OPTIONS: { value: Tone; label: string }[] = [
  { value: "playful", label: "Playful" },
  { value: "professional", label: "Professional" },
  { value: "witty", label: "Witty" },
  { value: "inspirational", label: "Inspirational" },
  { value: "casual", label: "Casual" },
  { value: "formal", label: "Formal" },
];

const TEMPLATE_OPTIONS: { value: TemplateType; label: string; desc: string }[] =
  [
    {
      value: "product_post",
      label: "Product Post",
      desc: "Showcase your product",
    },
    {
      value: "story_hook",
      label: "Story Hook",
      desc: "Grab attention instantly",
    },
    { value: "quote", label: "Inspirational Quote", desc: "Share wisdom" },
    { value: "carousel", label: "Carousel", desc: "Multi-slide content" },
    { value: "caption", label: "Caption", desc: "Photo/video caption" },
    { value: "thread", label: "Thread", desc: "Long-form narrative" },
  ];

const PLATFORM_TABS: {
  value: Platform;
  label: string;
  icon: ComponentType<{ className?: string }>;
}[] = [
  { value: "instagram", label: "Instagram", icon: Instagram },
  { value: "twitter", label: "Twitter", icon: Twitter },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin },
];

const DEMO_GENERATED: Record<string, string> = {
  product_post:
    "✨ Introducing the future of content creation. Our AI-powered platform transforms your ideas into scroll-stopping posts in seconds. From concept to caption — experience the magic. Try BipDeep ContentMagic today and never struggle with writer's block again. 🚀\n\n#ContentCreation #AI #SocialMedia #Marketing",
  story_hook:
    "Stop what you're doing — this changes everything. 👀\n\nWe've been quietly building something that's going to completely transform how you create content. No more blank pages. No more writer's block. No more hours spent crafting the perfect caption.\n\nSwipe to see what we've been working on ➡️",
  quote:
    '"The best content doesn\'t just inform — it transforms."\n\n— BipDeep ContentMagic\n\nCreate content that moves people. Content that sparks conversations. Content that builds communities.\n\n✨ What content are you creating today?',
  thread:
    '🧵 Thread: Why 90% of social media content fails (and how to fix yours)\n\n1/ Most creators focus on what to post. The real question is WHY your audience should care.\n\n2/ Attention is the new currency. You have 3 seconds to earn it or lose it forever.\n\n3/ The secret? Lead with the transformation, not the feature. Show the destination.\n\n4/ Action step: Before writing any post, ask "How will this make my audience feel?" 💡',
  carousel:
    "Slide 1: 5 Content Types That Dominate Every Platform 📱\n\nSlide 2: 🎯 Educational Posts — Share your expertise and position yourself as an authority.\n\nSlide 3: 💡 Behind-the-Scenes — Humanize your brand with authentic glimpses.\n\nSlide 4: 📊 Data & Stats — Back your claims with compelling numbers.\n\nSlide 5: 🙋 Questions & Polls — Drive engagement through conversation.\n\nSlide 6: Save this for your next content sprint! ⭐",
  caption:
    "Magic happens when preparation meets opportunity ✨\n\nEvery great piece of content starts with a single idea — and the courage to share it. What idea have you been sitting on? Drop it in the comments below 👇\n\n#ContentCreator #SocialMediaMarketing #BipDeep",
};

export default function GeneratePage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [tone, setTone] = useState<Tone>("professional");
  const [template, setTemplate] = useState<TemplateType>("product_post");
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const createDraft = useCreateDraft();

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation with demo content
    await new Promise((r) => setTimeout(r, 1200));
    const base = DEMO_GENERATED[template] ?? DEMO_GENERATED.product_post;
    const withPrompt = prompt ? `${base}\n\n[Customized for: ${prompt}]` : base;
    setGeneratedContent(withPrompt);
    setIsGenerating(false);
    toast.success("Content generated successfully!");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success("Copied to clipboard!");
  };

  const handleSave = async () => {
    await createDraft.mutateAsync({
      title: `${TEMPLATE_OPTIONS.find((t) => t.value === template)?.label} — ${new Date().toLocaleDateString()}`,
      content: generatedContent,
      platform,
      tone,
      templateType: template,
      contentType: "text",
    });
    toast.success("Draft saved!");
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto" data-ocid="generate.page">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground tracking-tight">
          Generate Content
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          AI-powered content creation for any platform
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Controls */}
        <div className="space-y-5" data-ocid="generate.controls_panel">
          {/* Platform */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Platform</Label>
            <Tabs
              value={platform}
              onValueChange={(v) => setPlatform(v as Platform)}
              data-ocid="generate.platform_tab"
            >
              <TabsList className="w-full">
                {PLATFORM_TABS.map((p) => (
                  <TabsTrigger
                    key={p.value}
                    value={p.value}
                    className="flex-1 gap-1.5 text-xs"
                    data-ocid={`generate.platform.${p.value}_tab`}
                  >
                    <p.icon className="h-3.5 w-3.5" />
                    {p.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Template */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Template</Label>
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATE_OPTIONS.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setTemplate(t.value)}
                  data-ocid={`generate.template.${t.value}_button`}
                  className={`text-left rounded-lg border p-3 transition-smooth ${
                    template === t.value
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-card hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <p
                    className={`text-xs font-semibold ${template === t.value ? "text-primary" : "text-foreground"}`}
                  >
                    {t.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div className="space-y-2">
            <Label htmlFor="tone-select" className="text-sm font-medium">
              Tone
            </Label>
            <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
              <SelectTrigger id="tone-select" data-ocid="generate.tone_select">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                {TONE_OPTIONS.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Prompt */}
          <div className="space-y-2">
            <Label htmlFor="prompt-input" className="text-sm font-medium">
              Custom Prompt{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </Label>
            <Textarea
              id="prompt-input"
              placeholder="E.g. Our new app launch, featuring AI-powered scheduling for busy professionals..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="input-base resize-none"
              data-ocid="generate.prompt_input"
            />
          </div>

          <Button
            className="w-full button-primary gap-2"
            onClick={handleGenerate}
            disabled={isGenerating}
            data-ocid="generate.generate_button"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Generating…
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                Generate Content
              </>
            )}
          </Button>
        </div>

        {/* Right: Output */}
        <Card
          className="card-elevated flex flex-col"
          data-ocid="generate.output_panel"
        >
          <CardHeader className="pb-3 flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-semibold font-display flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Generated Content
            </CardTitle>
            {generatedContent && (
              <Badge variant="secondary" className="text-xs">
                {PLATFORM_TABS.find((p) => p.value === platform)?.label}
              </Badge>
            )}
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4 pt-0">
            {generatedContent ? (
              <>
                <div className="flex-1 min-h-[200px] rounded-lg border border-border bg-muted/30 p-4 overflow-auto">
                  <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                    {generatedContent}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1.5"
                    onClick={handleCopy}
                    data-ocid="generate.copy_button"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 button-primary gap-1.5"
                    onClick={handleSave}
                    disabled={createDraft.isPending}
                    data-ocid="generate.save_draft_button"
                  >
                    <Save className="h-3.5 w-3.5" />
                    Save Draft
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    data-ocid="generate.regenerate_button"
                  >
                    <RefreshCw
                      className={`h-3.5 w-3.5 ${isGenerating ? "animate-spin" : ""}`}
                    />
                  </Button>
                </div>
              </>
            ) : (
              <div
                className="flex-1 min-h-[240px] flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-muted/20"
                data-ocid="generate.output_empty_state"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Wand2 className="h-6 w-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">
                    Ready to generate
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Configure your settings and click Generate
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
