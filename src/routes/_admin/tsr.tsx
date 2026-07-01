import { createFileRoute } from "@tanstack/react-router";

import TSR from "@/pages/Admin/TSR";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_admin/tsr")({
  head: () => ({
    meta: [
      {
        title: `TSR | ${APP_NAME}`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <TSR />;
}
