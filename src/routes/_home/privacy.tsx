import { createFileRoute } from "@tanstack/react-router";

import Privacy from "@/pages/Home/Privacy";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_home/privacy")({
    head: () => ({
        meta: [
            {
                title: `Privacy | ${APP_NAME}`,
            },
        ],
    }),
    component: RouteComponent,
});

function RouteComponent() {
    return <Privacy />;
}
