import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { SideNav } from "#/components/AdminNav";
import { isLoggedIn } from "#/utils/cookie";

const AdminLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const loggedIn = isLoggedIn()
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate({
                to: "/operations",
                replace: true,
            });
        }
    }, [loggedIn, navigate]);

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