import { Form, useLoaderData, redirect } from 'react-router-dom';
import { updateContact } from '../models/contacts';

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
}
export default function EditContact() {
    const contact = useLoaderData();
    console.log(contact)
    return (
        <Form method="post" id="contact-form">
            <p>
                <span>Name</span>
                <input
                    placeholder="First"
                    aria-label="First Name"
                    type="text"
                    name="first"
                    defaultValue={contact.first}
                />
                <input
                    placeholder="Last"
                    aria-label="Last Name"
                    type="text"
                    name="last"
                    defaultValue={contact.last}
                />
            </p>
            <label>
                <span>
                    Twitter
                </span>
                <input
                    placeholder="@jackie"
                    type="text"
                    name="twitter"
                    defaultValue={contact.twitter}
                />
            </label>
            <label>
                <span>
                    Avatar URL
                </span>
                <input
                    placeholder="https://example.com/avatar.jpg"
                    type="text"
                    name="avatar"
                    aria-label="Avatar URL"
                    defaultValue={contact.avatar}
                />
            </label>
            <label>
                <span>
                    Notes
                </span>
                <textarea
                    name="notes"
                    rows={6}
                    defaultValue={contact.notes}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button type="button">Cancel</button>
            </p>
        </Form>
    )
}