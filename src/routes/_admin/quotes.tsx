import { createFileRoute } from "@tanstack/react-router";

import Quotes from "@/pages/Admin/Quotes";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_admin/quotes")({
    head: () => ({
        meta: [
            {
                title: `Quotes | ${APP_NAME}`,
            },
        ],
    }),
    component: RouteComponent,
});

function RouteComponent() {
    return <Quotes />;
}
