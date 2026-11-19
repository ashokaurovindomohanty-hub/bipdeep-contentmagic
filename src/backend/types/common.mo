import Time "mo:core/Time";

module {
  public type UserId = Principal;
  public type Timestamp = Time.Time;

  public type Platform = {
    #instagram;
    #twitter;
    #linkedin;
    #tiktok;
  };

  public type Tone = {
    #professional;
    #casual;
    #humorous;
    #inspirational;
  };

  public type TemplateType = {
    #productPost;
    #storyHook;
    #quote;
    #callToAction;
  };
};
