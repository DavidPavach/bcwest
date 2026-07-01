import { createFileRoute } from "@tanstack/react-router";

import Dashboard from "@/pages/Admin/Dashboard";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_admin/dashboard")({
  head: () => ({
    meta: [
      {
        title: `Dashboard | ${APP_NAME}`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Dashboard />;
}
