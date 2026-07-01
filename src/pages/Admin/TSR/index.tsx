import { useState } from "react";

import AdminError from "#/components/AdminError";
import AdminLoader from "#/components/AdminLoader";
import { Overlay } from "#/components/Overlay";
import { Button } from "#/components/ui/button";
import { useAllTSRs } from "#/services/queries";
import Form from "./Form";
import Table from "./Table";

const index = () => {

    const { data, isLoading, isError, refetch } = useAllTSRs();
    const [newForm, setNewForm] = useState<boolean>(false);
    const [onEdit, setOnEdit] = useState<TSR | null>(null);

    const tsrs: TSR[] = data?.rows || []

    if (isLoading) return <AdminLoader />;

    if (isError)
        return (
            <AdminError
                message="Failed to Load TSRs, Kindly press the button to reload."
                onRetry={refetch}
            />
        );

    // Functions
    const toggleForm = () => setNewForm((prev) => !prev);
    const closeEdit = () => setOnEdit(null);

    return (
        <>
            {newForm &&
                <Overlay
                    open={newForm}
                    onClose={toggleForm}
                    classNames="max-w-7xl mx-auto border border-border"
                >
                    <Form onClose={toggleForm} />
                </Overlay>
            }

            {onEdit &&
                <Overlay
                    open={!!onEdit}
                    onClose={closeEdit}
                    classNames="max-w-7xl mx-auto border border-border"
                >
                    <Form onClose={closeEdit} isNew={false} oldTsr={onEdit} id={onEdit.id} />
                </Overlay>
            }

            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="font-heading font-black text-xl md:text-2xl xl:text-3xl">
                        TSR Management
                    </h1>
                    <p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        Create, Edit, and Manage Tank Storage Receipts
                    </p>
                </div>
                <Button onClick={toggleForm}>New TSR</Button>
            </header>
            <Table tsrs={tsrs} onEdit={setOnEdit} />
        </>
    );
};

export default index;
