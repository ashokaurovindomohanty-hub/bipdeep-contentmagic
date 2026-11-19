import DraftsPage from "@/pages/DraftsPage";
import { createRoute } from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: "/drafts",
  component: DraftsPage,
});
