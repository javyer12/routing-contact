import React, { Fragment } from 'react'
import { Outlet, NavLink, useSubmit, useNavigation, Link, useLoaderData, Form } from 'react-router-dom';
import { getContacts, createContact } from '../models/contacts';
import { AiFillLinkedin } from 'react-icons/ai';

function Search({ searching, submit, q }) {
    return (
        <Fragment>
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
                    aria-live="polite">
                </div>
            </Form>
            <Form method="post" >
                <button type="submit">New</button>
            </Form>
        </Fragment>
    )
}

export default Search