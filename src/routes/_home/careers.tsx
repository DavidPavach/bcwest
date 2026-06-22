import { createFileRoute } from "@tanstack/react-router";

import Careers from "#/pages/Home/Careers";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_home/careers")({
  head: () => ({
    meta: [
      {
        title: `Careers | ${APP_NAME}`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Careers />;
}
