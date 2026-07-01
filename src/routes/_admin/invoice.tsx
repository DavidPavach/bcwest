import { createFileRoute } from "@tanstack/react-router";

import Invoice from "@/pages/Admin/Invoice";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_admin/invoice")({
  head: () => ({
    meta: [
      {
        title: `Invoice | ${APP_NAME}`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Invoice />;
}
