import PageHero from "#/components/PageHero";
import { Route } from "#/routes/_home/verification";
import Default from "./Default";
import Form from "./Form";
import Quote from "./Quote";

const index = () => {

    const search = Route.useSearch();
    const currentPage = search.verify;

    return (
        <main>
            <PageHero
                label="Secured Infrastructure"
                title="Verification & Services Portal"
                subtitle="Securely verify your documents, invoices and TSR or generate an instant quote. Our industrial-grade encryption ensures that your logistical data remains authentic and tamper-proof.."
                backgroundImage="/verification.jpg"
            />
            {currentPage === undefined ? <Default />
                : currentPage === "quotes" ? <Quote /> :
                    <Form page={currentPage} />
            }
        </main>
    );
};

export default index;
