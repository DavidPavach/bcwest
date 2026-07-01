import { createFileRoute } from "@tanstack/react-router";

import Vault from "@/pages/Admin/Vault";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_admin/vault")({
  head: () => ({
    meta: [
      {
        title: `Vault | ${APP_NAME}`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Vault />;
}
