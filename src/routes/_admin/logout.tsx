import { createFileRoute } from "@tanstack/react-router";

import Logout from "@/pages/Admin/Logout";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_admin/logout")({
    head: () => ({
        meta: [
            {
                title: `Logout | ${APP_NAME}`,
            },
        ],
    }),
    component: RouteComponent,
});

function RouteComponent() {
    return <Logout />;
}
