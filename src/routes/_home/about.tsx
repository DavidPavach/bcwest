import { createFileRoute } from "@tanstack/react-router";

import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_home/about")({
  head: () => ({
    meta: [
      {
        title: `About BCWest | ${APP_NAME}`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_home/about"!</div>;
}
