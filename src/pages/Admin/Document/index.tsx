import { useState } from "react";

import AdminError from "#/components/AdminError";
import AdminLoader from "#/components/AdminLoader";
import { Overlay } from "#/components/Overlay";
import { Button } from "#/components/ui/button";
import { useAllDocuments } from "#/services/queries";
import Form from "./Form";
import Table from "./Table";

const index = () => {
    const { data, isLoading, isError, refetch } = useAllDocuments();
    const [newForm, setNewForm] = useState<boolean>(false);

    const documents: Documents[] = data?.rows || [];

    if (isLoading) return <AdminLoader />;

    if (isError)
        return (
            <AdminError
                message="Failed to Load your Verification Documents, Kindly press the button to reload."
                onRetry={refetch}
            />
        );

    // Functions
    const toggleForm = () => setNewForm((prev) => !prev);

    return (
        <>
            <Overlay
                open={newForm}
                onClose={toggleForm}
                classNames="max-w-7xl mx-auto"
            >
                <Form />
            </Overlay>
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="font-heading font-black text-xl md:text-2xl xl:text-3xl">
                        Document
                    </h1>
                    <p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        Manage Your Document Verifications
                    </p>
                </div>
                <Button onClick={toggleForm}>New Document</Button>
            </header>
            <Table documents={documents} />
        </>
    );
};

export default index;
