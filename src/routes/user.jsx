import React, { Fragment } from 'react';
import { Form, useLoaderData, useNavigate, redirect } from 'react-router-dom';
import { createUser, getUser } from '../models/user.model';
import localforage from "localforage";

export async function action({ request, params }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await createUser(data);
        alert('User was updated successfully.')
    } catch (err) {
        alert(`User was not updated successfully. ${err.message}`)
    }
    return data
    // return redirect('/');
}

export async function loader({ params }) {
    let user;
    try {
        user = await getUser(params.userId);
        if (!user) {
            throw new Response(" ", {
                status: 404,
                statusText: "Not Found",
            });
        }
    } catch (err) { alert(err.message) }

    return getUser(user)
}

export default function User() {
    const users = async () => {
        let user = await localforage.getItem("users");
        console.log(user)
        return user;
    }

    return (
        <Fragment>
            <h1 className="new__user">Create a new user:</h1>
            <Form method="post" id="form">
                <label>
                    <span>
                        First Name
                    </span>
                    <input
                        placeholder="First"
                        aria-label="First Name"
                        type="text"
                        name="first"
                        defaultValue="user"
                    />
                </label>
                <label>
                    <span>
                        Last Name
                    </span>
                    <input
                        placeholder="Last"
                        aria-label="Last Name"
                        type="text"
                        name="last"
                        defaultValue="user"
                    />

                </label>
                <button id="user__button" type="submit">Save</button>
            </Form>
        </Fragment>
    )
}