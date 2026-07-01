import { Navigate } from "@tanstack/react-router";

import { SideNav } from "#/components/AdminNav";
import { isLoggedIn } from "#/utils/cookie";

const AdminLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    if (!isLoggedIn()) {
        return <Navigate to="/operations" />;
    }

    return (
        <main className="min-h-dvh">
            <SideNav />

            <section className="lg:ml-72">
                <div className="p-3 md:p-4 xl:p-6">
                    {children}
                </div>
            </section>
        </main>
    );
};

export default AdminLayout;