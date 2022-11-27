import { redirect } from 'react-router-dom';
import { deleteContact } from '../models/contacts';

export async function action({ params }) {
    try {
        await deleteContact(params.contactId);
        alert(`Contact with ${params.contactId} id was removed.`)
    } catch (err) {
        alert(err.message)
    }
    return redirect('/');
};

