import { Building } from "iconsax-reactjs";
import { useState } from "react";

import AdminError from "#/components/AdminError";
import AdminLoader from "#/components/AdminLoader";
import { Overlay } from "#/components/Overlay";
import { Button } from "#/components/ui/button";
import { useAllTerminals } from "#/services/queries";
import Form from "./Form";
import Table from "./Table";

const index = () => {

    const { data, isLoading, isError, refetch } = useAllTerminals();
    const [newForm, setNewForm] = useState<boolean>(false);

    const terminals: Terminals[] = data?.rows || [];

    if (isLoading) return <AdminLoader />;

    if (isError)
        return (
            <AdminError
                message="Failed to Load your Terminals, Kindly press the button to reload."
                onRetry={refetch}
            />
        );

    // Functions
    const toggleForm = () => setNewForm((prev) => !prev);

    return (
        <>
            <Overlay open={newForm} onClose={toggleForm}>
                <section className="bg-card p-4 text-card-foreground">
                    <header className="flex items-center gap-x-3 mb-8 p-4 border-border border-b text-accent">
                        <Building className="size-4 md:size-4.5 xl:size-5" />
                        <p className="font-mono text-[11px] md:text-xs xl:text-sm tracking-wide">
                            NEW TERMINAL REGISTRATION
                        </p>
                    </header>
                    <Form />
                </section>
            </Overlay>
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="font-heading font-black text-xl md:text-2xl xl:text-3xl">
                        Terminals
                    </h1>
                    <p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        Manage Your Terminals
                    </p>
                </div>
                <Button onClick={toggleForm}>New Terminal</Button>
            </header>
            <Table terminals={terminals} />
        </>
    );
};

export default index;
