import { createFileRoute } from "@tanstack/react-router";

import Products from "@/pages/Admin/Products";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_admin/products")({
  head: () => ({
    meta: [
      {
        title: `Products | ${APP_NAME}`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Products />;
}
