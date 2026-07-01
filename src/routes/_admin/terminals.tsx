import { createFileRoute } from "@tanstack/react-router";

import Terminals from "@/pages/Admin/Terminals";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_admin/terminals")({
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
    return <Terminals />;
}
