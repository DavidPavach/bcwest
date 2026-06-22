import { createFileRoute } from "@tanstack/react-router";

import Network from "#/pages/Home/Network";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_home/network")({
    head: () => ({
        meta: [
            {
                title: `Network | ${APP_NAME}`,
            },
        ],
    }),
    component: RouteComponent,
});

function RouteComponent() {
    return <Network />;
}
