import { Form, useLoaderData } from 'react-router-dom';
import { getContact } from '../models/contacts';

export async function loader({ params }) {
    return getContact(params.contactId);
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
                    src={contact.avatar || null} />
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
    let favorite = contact.favorite;
    return (
        <Form method="post">
            <button name="favorite" value={favorite ? "false" : "true"} aria-label={
                favorite ? "Remove from favorite" : "Add to favorites"
            }>
                {Favorite ? " 🥰" : " 🤯"}
            </button>
        </Form>
    )
}