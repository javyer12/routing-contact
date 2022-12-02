import React, { Fragment } from 'react';
import { Outlet, NavLink, useSubmit, useNavigation, Link, useLoaderData, Form } from 'react-router-dom';
import { getContacts, createContact } from '../models/contacts';
import { AiFillLinkedin } from 'react-icons/ai';
import { useEffect } from 'react';
import Search from '../components/Search';

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
    const logged = false;
    const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");
    const user = {
        name: "juan"
    }
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
                    >{user.name}  {"  "}{" "} </a>
                </article>
                    :
                    <article>
                        <a
                            href='https://www.linkedin.com/in/francisco-javier-murillo-guillen-6302bb203/'
                            target="_blank"
                            className="links"
                        >Francisco  {"  "}{" "} </a>
                        <AiFillLinkedin />

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

    )
}