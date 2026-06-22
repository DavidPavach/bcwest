import { createFileRoute } from "@tanstack/react-router";

import Services from "@/pages/Home/Services/index";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_home/services")({
  head: () => ({
    meta: [
      {
        title: `Services | ${APP_NAME}`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Services />;
}
