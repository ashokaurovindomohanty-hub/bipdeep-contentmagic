import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Types "../types/content";
import CommonTypes "../types/common";
import ContentLib "../lib/content";

mixin (
  accessControlState : AccessControl.AccessControlState,
  drafts : List.List<Types.Draft>,
) {
  var nextDraftId : Nat = 0;

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared ({ caller }) func createDraft(input : Types.DraftInput) : async Types.Draft {
    if (caller.isAnonymous()) Runtime.trap("Anonymous callers not allowed");
    let draft = ContentLib.createDraft(drafts, nextDraftId, caller, input);
    nextDraftId += 1;
    draft;
  };

  public query ({ caller }) func getDraft(id : Nat) : async ?Types.Draft {
    if (caller.isAnonymous()) Runtime.trap("Anonymous callers not allowed");
    ContentLib.getDraft(drafts, id, caller);
  };

  public query ({ caller }) func listDrafts() : async [Types.Draft] {
    if (caller.isAnonymous()) Runtime.trap("Anonymous callers not allowed");
    ContentLib.listDrafts(drafts, caller);
  };

  public shared ({ caller }) func updateDraft(id : Nat, input : Types.DraftUpdateInput) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Anonymous callers not allowed");
    ContentLib.updateDraft(drafts, id, caller, input);
  };

  public shared ({ caller }) func deleteDraft(id : Nat) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Anonymous callers not allowed");
    ContentLib.deleteDraft(drafts, id, caller);
  };

  public query ({ caller }) func getDashboardStats() : async Types.DashboardStats {
    if (caller.isAnonymous()) Runtime.trap("Anonymous callers not allowed");
    ContentLib.getDashboardStats(drafts, caller);
  };

  public shared ({ caller }) func generateContent(request : Types.GenerateContentRequest) : async Text {
    if (caller.isAnonymous()) Runtime.trap("Anonymous callers not allowed");

    let platformText = switch (request.platform) {
      case (#instagram) "Instagram";
      case (#twitter) "Twitter/X";
      case (#linkedin) "LinkedIn";
      case (#tiktok) "TikTok";
    };

    let toneText = switch (request.tone) {
      case (#professional) "professional";
      case (#casual) "casual and friendly";
      case (#humorous) "humorous and witty";
      case (#inspirational) "inspirational and motivating";
    };

    let templateText = switch (request.templateType) {
      case (#productPost) "product promotion post";
      case (#storyHook) "story hook or opener";
      case (#quote) "quote or thought-provoking statement";
      case (#callToAction) "call-to-action post";
    };

    let systemPrompt = "You are a social media content expert specializing in " # platformText # " content. Write in a " # toneText # " tone. Create a " # templateText # " that is engaging, platform-appropriate, and optimized for maximum reach. Return only the post content, no explanations or metadata.";

    let requestBody = "{\"model\":\"gpt-3.5-turbo\",\"messages\":[{\"role\":\"system\",\"content\":\"" # systemPrompt # "\"},{\"role\":\"user\",\"content\":\"" # request.prompt # "\"}],\"max_tokens\":500,\"temperature\":0.8}";

    let headers : [OutCall.Header] = [
      { name = "Content-Type"; value = "application/json" },
      { name = "Authorization"; value = "Bearer OPENAI_API_KEY" },
    ];

    await OutCall.httpPostRequest(
      "https://api.openai.com/v1/chat/completions",
      headers,
      requestBody,
      transform,
    );
  };
};
