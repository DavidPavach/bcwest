import { GalleryExport, GalleryFavorite } from "iconsax-reactjs";
import { useState } from "react";

import AdminError from "#/components/AdminError";
import AdminLoader from "#/components/AdminLoader";
import { Overlay } from "#/components/Overlay";
import { useAllImages } from "#/services/queries";
import Form from "./Form";
import Table from "./Table";

const index = () => {

    const [newForm, setNewForm] = useState<boolean>(false);
    const { data, isLoading, isError, refetch } = useAllImages();

    if (isLoading) return <AdminLoader />;

    if (isError)
        return (
            <AdminError
                message="Failed to Load your Image and Document Registry, Kindly press the button to reload."
                onRetry={refetch}
            />
        );

    // Constants
    const registryFiles: RegistryFile[] = data?.rows || [];

    // Functions
    const toggleForm = () => setNewForm((prev) => !prev);

    return (
        <>
            {newForm && (
                <Overlay open={newForm} onClose={toggleForm}>
                    <Form onClose={toggleForm} />
                </Overlay>
            )}
            <header className="mb-8">
                <h1 className="font-heading font-black text-xl md:text-2xl xl:text-3xl">
                    Image & Document Vault
                </h1>
                <p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                    Manage Your Images and Documents
                </p>
            </header>
            <section className="flex lg:flex-row flex-col gap-4">
                {/* Metrics Card */}
                <div className="flex flex-1 justify-between items-center bg-card p-5 xl:p-6 border border-border h-32 text-card-foreground">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-teal rounded-full size-2" />
                            <p className="font-mono text-[11px] text-muted-foreground md:text-xs xl:text-sm uppercase">
                                System Status
                            </p>
                        </div>

                        <p className="font-heading font-black text-4xl md:text-5xl xl:text-6xl">
                            99.98%
                        </p>

                        <p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                            Operational uptime across all assets
                        </p>
                    </div>

                    <div className="text-right">
                        <div className="flex justify-end mb-2">
                            <GalleryFavorite className="size-5 md:size-6 xl:size-7 text-accent" />
                        </div>

                        <p className="font-mono text-[11px] text-muted-foreground md:text-xs xl:text-sm uppercase">
                            Total Assets
                        </p>

                        <p className="font-heading font-bold text-accent text-xl md:text-2xl xl:text-3xl">
                            {data?.total ?? 0}
                        </p>
                    </div>
                </div>

                {/* Action Card */}
                <button type="button" onClick={toggleForm} className="group flex flex-col justify-center items-center gap-3 bg-accent hover:bg-accent/90 border border-accent w-full lg:w-80 h-32 hover:scale-[1.01] transition-all duration-200 text-accent-foreground cursor-pointer">
                    <GalleryExport className="size-6 transition-transform group-hover:-translate-y-1 duration-200" />
                    <div>
                        <p className="font-heading font-bold text-sm md:text-base xl:text-lg uppercase">
                            New Asset
                        </p>
                        <p className="opacity-80 text-[11px] md:text-xs xl:text-sm">
                            Register and upload asset files
                        </p>
                    </div>
                </button>
            </section>
            <section className="mt-10">
                <Table files={registryFiles} />
            </section>
        </>
    );
};

export default index;
