export const users = {
    general: [],
    programming: [],            // for each channel im gonna have an array of user objects: {id,name}
    hobbies: []
}

export const addUser = ({ id, name, channel }) => {

    name = name.trim();
    const userExists = users[channel].find(user => user.name === name); // search in the proper channel if a user exists
    if (userExists) throw new Error('User already exists in the chat');

    const user = { id, name };
    users[channel].push(user);  // push into the proper channel, the new user connected.
    return { user };
}

export const removeUser = ({ id, channel }) => {
    const index = users[channel].findIndex(user => user.id === id);
    if (index !== -1) return users[channel].splice(index, 1)[0]; // returns the deleted user
}

export const getUser = (id) => {
    return users[channel].find(user => user.id === id);
}