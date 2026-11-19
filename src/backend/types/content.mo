import CommonTypes "common";

module {
  public type UserProfile = {
    name : Text;
    email : Text;
  };

  public type Draft = {
    id : Nat;
    owner : CommonTypes.UserId;
    title : Text;
    platform : CommonTypes.Platform;
    tone : CommonTypes.Tone;
    templateType : CommonTypes.TemplateType;
    content : Text;
    createdAt : CommonTypes.Timestamp;
    updatedAt : CommonTypes.Timestamp;
  };

  public type DraftInput = {
    title : Text;
    platform : CommonTypes.Platform;
    tone : CommonTypes.Tone;
    templateType : CommonTypes.TemplateType;
    content : Text;
  };

  public type DraftUpdateInput = {
    title : Text;
    platform : CommonTypes.Platform;
    tone : CommonTypes.Tone;
    templateType : CommonTypes.TemplateType;
    content : Text;
  };

  public type GenerateContentRequest = {
    prompt : Text;
    platform : CommonTypes.Platform;
    tone : CommonTypes.Tone;
    templateType : CommonTypes.TemplateType;
  };

  public type DashboardStats = {
    totalDrafts : Nat;
    lastGeneratedAt : ?CommonTypes.Timestamp;
  };
};
