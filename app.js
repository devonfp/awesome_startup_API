let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`


const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

fetch(urlAPI) 
    .then(res => res.json())
    .then(res => res.results)
    .then(data => displayEmployees(data))
    .catch(error => console.error(error))

    



// Displays all employee data into the employee cards     
function displayEmployees(EmployeeData) {

employees = EmployeeData; /*we are letting the employees varriable equal a new variable (EmployeeData) so that it can be accessed outside of this function*/

let employeeHTML = ''; // Stores the HTML code for each employee card that will be displayed on the page


employees.forEach((employee, index) => {

    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture; 
    let state = employee.location.state;

employeeHTML += `
<div class="card" data-index="${index}">
<img class="avatar" src="${picture.large}" />
<div class="text-container">
<h2 class="name">${name.first} ${name.last}</h2>
<p class="email">${email}</p>
<p class="address">${city}, ${state}</p>
</div>
</div>
`
});
gridContainer.innerHTML = employeeHTML; 
} 




// Displays all employee data into the modal window
function displayModal(index) {

// Object destructuring
let { name, dob, phone, email, location: { city, street, state, postcode
}, picture } = employees[index];
let date = new Date(dob.date);

const modalHTML = `
<img class="avatar" src="${picture.large}"/>
<h2 class="name">${name.first} ${name.last}</h2>
<p class="email">${email}</p>
<p class="address">${city}</p>
<hr/>
<p>${phone}</p>
<p class="address">${street.name}, ${city}, ${state}, ${postcode}</p>
<p>Birthday:
${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
`;
overlay.classList.remove("hidden");
modalContainer.innerHTML = modalHTML;
}


//Modal appear: Makes the modal appear upon clicking a card
gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {   // assures the click is not on the gridContainer itself
    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');
    displayModal(index);
    }
    });

// Modal removal: Removes modal by adding hidden class upon clicking "X"    
    modalClose.addEventListener('click', () => {
        overlay.classList.add("hidden");
        });