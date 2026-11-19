import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/content";
import CommonTypes "../types/common";

module {
  public func createDraft(
    drafts : List.List<Types.Draft>,
    nextId : Nat,
    owner : CommonTypes.UserId,
    input : Types.DraftInput,
  ) : Types.Draft {
    let now = Time.now();
    let draft : Types.Draft = {
      id = nextId;
      owner = owner;
      title = input.title;
      platform = input.platform;
      tone = input.tone;
      templateType = input.templateType;
      content = input.content;
      createdAt = now;
      updatedAt = now;
    };
    drafts.add(draft);
    draft;
  };

  public func getDraft(
    drafts : List.List<Types.Draft>,
    id : Nat,
    owner : CommonTypes.UserId,
  ) : ?Types.Draft {
    drafts.find(func(d) { d.id == id and d.owner == owner });
  };

  public func listDrafts(
    drafts : List.List<Types.Draft>,
    owner : CommonTypes.UserId,
  ) : [Types.Draft] {
    drafts.filter(func(d) { d.owner == owner }).toArray();
  };

  public func updateDraft(
    drafts : List.List<Types.Draft>,
    id : Nat,
    owner : CommonTypes.UserId,
    input : Types.DraftUpdateInput,
  ) : Bool {
    let now = Time.now();
    var found = false;
    drafts.mapInPlace(func(d) {
      if (d.id == id and d.owner == owner) {
        found := true;
        {
          d with
          title = input.title;
          platform = input.platform;
          tone = input.tone;
          templateType = input.templateType;
          content = input.content;
          updatedAt = now;
        };
      } else {
        d;
      }
    });
    found;
  };

  public func deleteDraft(
    drafts : List.List<Types.Draft>,
    id : Nat,
    owner : CommonTypes.UserId,
  ) : Bool {
    let sizeBefore = drafts.size();
    let filtered = drafts.filter(func(d) { not (d.id == id and d.owner == owner) });
    let sizeAfter = filtered.size();
    if (sizeBefore != sizeAfter) {
      drafts.clear();
      drafts.append(filtered);
      true;
    } else {
      false;
    };
  };

  public func getDashboardStats(
    drafts : List.List<Types.Draft>,
    owner : CommonTypes.UserId,
  ) : Types.DashboardStats {
    let ownerDrafts = drafts.filter(func(d) { d.owner == owner });
    let total = ownerDrafts.size();
    if (total == 0) {
      { totalDrafts = 0; lastGeneratedAt = null };
    } else {
      var maxTs : CommonTypes.Timestamp = 0;
      ownerDrafts.forEach(func(d) {
        if (d.updatedAt > maxTs) { maxTs := d.updatedAt };
      });
      { totalDrafts = total; lastGeneratedAt = ?maxTs };
    };
  };
};
