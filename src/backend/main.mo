import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Types "types/content";
import ProfileMixin "mixins/profile-api";
import ContentMixin "mixins/content-api";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let userProfiles = Map.empty<Principal, Types.UserProfile>();
  include ProfileMixin(accessControlState, userProfiles);

  let drafts = List.empty<Types.Draft>();
  include ContentMixin(accessControlState, drafts);
};
