import axios from 'axios';

export async function getAllEmployees() {
    let allEmployees = [];
    // Make a request for a user with a given ID
    const response = await axios.get('https://yalantis-react-school-api.yalantis.com/api/task0/users')
    allEmployees = response.data;
    return allEmployees;
}

// const getAllEmployees = new Promise((resolve, reject) => {
//     // Make a request for a user with a given ID
//     axios.get('https://yalantis-react-school-api.yalantis.com/api/task0/users')
//     .then(function (response) {
//     // handle success
//     allEmployees = Array.from(response.data);
//     console.log(allEmployees)
//     })
//     .catch(function (error) {
//     // handle error
//     console.log(error);
//     })    
// })


export default getAllEmployees;