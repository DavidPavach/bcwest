import { createFileRoute } from "@tanstack/react-router";

import Verification from "@/pages/Home/Verification";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_home/verification")({
  head: () => ({
    meta: [
      {
        title: `Verification | ${APP_NAME}`,
      },
    ],
  }),
  validateSearch: (
    search: Record<string, string | "tsr" | "quotes" | "docs" | "invoice" | undefined>,
  ) => ({
    verify: search.verify as "tsr" | "quotes" | "docs" | "invoice" | undefined,
    number: search.number as string | undefined,
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Verification />;
}
