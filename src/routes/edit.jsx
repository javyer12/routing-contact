import { Form, useLoaderData, useNavigate, redirect } from 'react-router-dom';
import { updateContact } from '../models/contacts';

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    try {
        await updateContact(params.contactId, updates);
        alert(`Contact with ${params.contactId} was updated successfully.`)
    } catch (err) {
        alert(`Contact ${params.contactId} was not updated successfully. ${err.message}`)
    }
    return redirect(`/contacts/${params.contactId}`);
}

// https://api.whatsapp.com/send?phone=50499488691
export default function EditContact() {
    const contact = useLoaderData();
    const navigate = useNavigate();
    return (
        <Form method="post" id="form">
            {/* <p>
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
                    className="lastname"
                    defaultValue={contact.last}
                />
            </p> */}
            <label>
                <span>
                    First Name
                </span>
                <input
                    placeholder="First"
                    aria-label="First Name"
                    type="text"
                    name="first"
                    defaultValue={contact.first}
                />
            </label>
            <label>
                <span>
                    LastName
                </span>
                <input
                    placeholder="Last"
                    aria-label="Last Name"
                    type="text"
                    name="last"
                    className="lastname"
                    defaultValue={contact.last}
                />
            </label>
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
                    Cellphone Number
                </span>
                <input
                    placeholder="33333333"
                    type="number"
                    name="phone"
                    aria-label="phone"
                    defaultValue={contact.phone}
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
            {/* <label>
                <span>
                    <label htmlFor="avatar">Or Choose  <br /> a picture</label>
                </span>
                <input type="file"
                    id="avatar" name="avatar"
                    accept="image/png, image/jpeg"></input>
            </label> */}
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
                <button type="button"
                    onClick={() => {
                        navigate(-1)
                    }}
                >Cancel</button>
            </p>
        </Form>
    )
}