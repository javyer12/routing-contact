import React, { Fragment } from 'react';
import { Outlet, NavLink, useSubmit, useNavigation, Link, useLoaderData, Form } from 'react-router-dom';
import { getContacts, createContact } from '../models/contacts';
import { AiFillLinkedin } from 'react-icons/ai';
import { useEffect } from 'react';
import Search from '../components/Search';

// firebase
// import { doc, getFirestore } from 'firebase/firestore';
// import { FirebaseAppProvider, FirestoreProvider, useFirestoreDocData, useFirestore, useFirebaseApp } from 'reactfire';


export async function loader({ request }) {

    let contacts;
    let q;
    let url;
    try {
        url = new URL(request.url);
        q = url.searchParams.get('q');
        contacts = await getContacts(q);
    } catch (err) {
        alert(err.message);
    }
    return { contacts, q };

}

export async function action() {
    try {
        await createContact();
    } catch (err) {
        alert(err.message)
    }
}

export default function Root() {
    // const usersRef = doc(useFirestore(), 'users', 'user');
    // const { email, name } = useFirestoreDocData(usersRef);
    // const firestoreInstance = getFirestore(useFirebaseApp());
    // console.log(email, name)

    const { contacts, q, user } = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();
    const logged = false;
    const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");
    useEffect(() => {
        document.getElementById("q").value = q;
    }, [ q ]);

    return (

        <Fragment >
            {/* <div className='contact-main'> */}
            <div id="detail" className={`bording index ${navigation.state === "loading" ? "loading" : " "
                }`}><Outlet />
            </div>

            <div id="sidebar">
                {logged ? <article>
                    <a
                        href='https://www.linkedin.com/in/francisco-javier-murillo-guillen-6302bb203/'
                        target="_blank"
                        className="links"
                    >'kuk'  {"  "}{" "} </a>
                </article>
                    :
                    <article>
                        <Link
                            to="/user"
                            className="links"
                        > Log in {"  "}{" "} </Link>
                    </article>
                }

                <div>
                    <Search searching={searching} submit={submit} q={q} />
                </div>
                <nav>
                    <Link
                        className="back-home"
                        to="/">
                        Back to Home
                    </Link>
                    {contacts ? (
                        <ul>
                            {contacts.map((contact) => (
                                <li key={contact.id}>
                                    <NavLink
                                        className={({ isActive, isPending }) =>
                                            isActive ? "active" : isPending ? "pending" : " "}
                                        to={`contacts/${contact.id}`}>
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {contact.favorite && <span>★</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            {/* </div> */}
        </Fragment>
        // </FirestoreProvider>

    )
}