import React, { Fragment } from 'react';
import { Outlet, NavLink, useSubmit, useNavigation, Link, useLoaderData, Form } from 'react-router-dom';
import { getContacts, createContact } from '../models/contacts';
import { AiFillLinkedin } from 'react-icons/ai';
import { useEffect } from 'react';

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
    const { contacts, q } = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();

    const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");

    useEffect(() => {
        document.getElementById("q").value = q;
    }, [ q ]);

    return (
        <Fragment>
            <div id="sidebar">
                <h1><a
                    href='https://www.linkedin.com/in/francisco-javier-murillo-guillen-6302bb203/'
                    target="_blank"
                    className="links"
                >Francisco  {"  "}{" "} </a>
                    <AiFillLinkedin />
                </h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            className={searching ? "loading" : ""}
                            aria-label='Search contacts'
                            placeholder="Search contacts..."
                            type="search"
                            name="q"
                            defaultValue={q}
                            onChange={(e) => {
                                const isFirstSearch = q = null;
                                submit(e.currentTarget.form, {
                                    repalce: !isFirstSearch,
                                });
                            }}
                        />
                        <div id="search-spinner"
                            aria-hidden
                            hidden={!searching}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"></div>
                    </Form>
                    <Form method="post" >
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {/* <ul>
                        <li>
                            <Link to={`contacts/1`}>Your Name</Link>
                        </li>
                        <li>
                            <Link to={`contacts/2`}>Your Friend</Link>
                        </li>
                    </ul> */}
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
            <div id="detail" className={`index ${navigation.state === "loading" ? "loading" : " "
                }`}><Outlet /></div>
        </Fragment>
    )
}