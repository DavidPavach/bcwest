import { createFileRoute } from "@tanstack/react-router";

import ServicePage from "#/pages/Home/Services/Services";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_home/service/$serviceId")({
  component: RouteComponent,
  head: ({ params }) => ({
    meta: [
      {
        title: `${params.serviceId.toUpperCase()} | ${APP_NAME}`,
      },
    ],
  }),
});

function RouteComponent() {
  const { serviceId } = Route.useParams();
  return <ServicePage slug={serviceId} />;
}
