import { DocumentText1 } from "iconsax-reactjs";

import FileCard from "./FileCard";

const Document = ({ doc }: { doc: Documents }) => {
    return (
        <main className="bg-background p-4 w-full max-w-7xl">
            <header className="bg-muted p-2 border border-border">
                <section className="flex items-center gap-x-2">
                    <div className="place-content-center grid bg-gold/20 border border-gold/20 size-10 md:size-11 xl:size-12">
                        <DocumentText1 className="size-5 md:size-5.5 xl:size-6 text-gold" />
                    </div>
                    <div>
                        <h1 className="font-heading font-bold text-xl md:text-2xl xl:text-3xl">
                            {doc.documentNumber}
                        </h1>
                        <h6 className="text-[9px] text-muted-foreground md:text-[10px] xl:text-[11px]">
                            Verified Document · {doc.images.length} files
                        </h6>
                    </div>
                </section>
            </header>
            <div className={`gap-5 grid grid-cols-1 ${doc.images.length > 1 ? "md:grid-cols-2" : ""}  mt-4`}>
                {doc.images.map((image) => (
                    <FileCard
                        key={image}
                        url={image}
                        fileName={doc.documentNumber}
                        label={doc.documentNumber}
                    />
                ))}
            </div>
        </main>
    );
};

export default Document;
