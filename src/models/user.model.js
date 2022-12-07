// USERS
import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getUser(query) {
    let user = await localforage.getItem("users");
    if (!user) user = [];
    if (query) {
        user = matchSorter(user, query, { keys: [ "first", "last" ] });
    }
    // return user.sort(sortBy("last", "createdAt"));
    return user;
}

export async function createUser(data) {
    const { first, last } = data;
    console.log(first, last)
    await fakeNetwork();
    let id = Math.random().toString(36).substring(2, 9);
    let user = { first, last, id, createdAt: Date.now() };
    // let users = await getUser();
    // users.unshift(user);
    await set(user);
    return user;
}
function set(users) {
    return localforage.setItem("users", users);
}
let fakeCache = {};

async function fakeNetwork(key) {
    if (!key) {
        fakeCache = {};
    }

    if (fakeCache[ key ]) {
        return;
    }

    fakeCache[ key ] = true;
    return new Promise(res => {
        setTimeout(res, Math.random() * 800);
    });
}
