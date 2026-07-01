import { createFileRoute } from "@tanstack/react-router";

import Terms from "@/pages/Home/Terms";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_home/terms")({
  head: () => ({
    meta: [
      {
        title: `Terms | ${APP_NAME}`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Terms />;
}
