import { createFileRoute } from "@tanstack/react-router";

import Document from "@/pages/Admin/Document";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_admin/documents")({
    head: () => ({
        meta: [
            {
                title: `Document Verification | ${APP_NAME}`,
            },
        ],
    }),
    component: RouteComponent,
});

function RouteComponent() {
    return <Document />;
}
