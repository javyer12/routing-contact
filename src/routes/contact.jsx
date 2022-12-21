import { Form, useLoaderData, useFetcher } from 'react-router-dom';
import { getContact, updateContact } from '../models/contacts';
import avatar from '../assets/perfil.png';


export async function loader({ params }) {
    let contact;
    try {
        contact = await getContact(params.contactId);
        if (!contact) {
            throw new Response(" ", {
                status: 404,
                statusText: "Not Found",
            });
        }
    } catch (err) { alert(err.message) }

    return getContact(params.contactId);
}
export async function action({ request, params }) {
    let formData;
    try {
        formData = await request.formData();
    } catch (err) {
        alert(err.message)
    }
    return updateContact(params.contactId, {
        favorite: formData.get("favorite") === "true"
    });
}
// route for contacts
export default function Contact() {

    const contact = useLoaderData();
    // const contact = {
    //     first: 'Your',
    //     last: 'Name',
    //     avatar: "https://placekitten.com/g/200/200",
    //     twitter: 'twitter',
    //     notes: 'some notes',
    //     favorite: true
    // };

    return (
        <div id="contact">
            <div>
                <img
                    key={contact.avatar}
                    src={contact.avatar || avatar}
                    alt="avatar" />
            </div>
            <div >
                <h1>{contact.first || contact.last ? (
                    <>
                        {contact.first} {contact.last}
                    </>
                ) : (
                    <i>
                        No Name
                    </i>
                )} {" "}
                    <Favorite contact={contact} />
                </h1>

                {/* twitter contact  */}
                {contact.twitter && (
                    <p>
                        <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {/* number phone */}
                {contact.phone ? <p>
                    <a target="_blank" href={`https://api.whatsapp.com/send?phone=${contact.phone}`} className="links">
                        +504 {contact.phone}
                    </a>
                </p> : <p>No phone added</p>}

                {/* notes */}
                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form action="destroy"
                        method="post"
                        onSubmit={(e) => {
                            if (!confirm("Please confirm you want to delete this record.")) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

function Favorite({ contact }) {
    const fetcher = useFetcher();
    let favorite = contact.favorite;
    if (fetcher.formData) {
        favorite = fetcher.formData.get("favorite") === "true";
    }
    return (
        <fetcher.Form method="post">
            <button name="favorite" value={favorite ? "false" : "true"} aria-label={
                favorite ? "Remove from favorite" : "Add to favorites"
            }>
                {Favorite ? "★" : " ⚠️"}
            </button>
        </fetcher.Form>
    )
}