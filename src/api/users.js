import axios from "axios"

async function fetchUsers() {

    const response = await axios.get("https://jsonplaceholder.typicode.com/users");

    return response.data;
}

export default fetchUsers;