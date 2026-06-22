import { createFileRoute } from "@tanstack/react-router";

import Industries from "#/pages/Home/Industries";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_home/industries")({
    head: () => ({
        meta: [
            {
                title: `Industries | ${APP_NAME}`,
            },
        ],
    }),
    component: RouteComponent,
});

function RouteComponent() {
    return <Industries />;
}
