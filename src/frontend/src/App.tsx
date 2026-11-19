import { useAuth } from "@/hooks/useAuth";
import LoginPage from "@/pages/LoginPage";
import { Route as RootRoute } from "@/routes/__root";
import { Route as DraftsRoute } from "@/routes/drafts";
import { Route as GenerateRoute } from "@/routes/generate";
import { Route as IndexRoute } from "@/routes/index";
import { Route as LoginRoute } from "@/routes/login";
import { RouterProvider, createRouter } from "@tanstack/react-router";

const routeTree = RootRoute.addChildren([
  IndexRoute,
  GenerateRoute,
  DraftsRoute,
  LoginRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <RouterProvider router={router} />;
}
