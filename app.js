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
    .then(data => {
        console.log(data)
    displayEmployees(data)
    })
    .catch(error => console.error(error))

    


function displayEmployees(EmployeeData) {
// we are letting the employees varriable equal a new variable (EmployeeData)
// so that it can be accessed outside of this function
employees = EmployeeData;
 

let employeeHTML = '';

employees.forEach((employee, index) => {

    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture; 
    let state = employee.location.state;
    //let street = employee.location.street;

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
//displayEmployees(EmployeeData)
//console.log(displayEmployees(EmployeeData))







function displayModal(index) {

// use object destructuring make our template literal cleaner
let { name, dob, phone, email, location: { city, street, state, postcode
}, picture } = employees[index];
let date = new Date(dob.date);

const modalHTML = `
<img class="avatar" src="${picture.large}"/>
<div id='text-container-modal'>
<h2 class="name">${name.first} ${name.last}</h2>
<p class="email">${email}</p>
<p class="address">${city}</p>
<hr/>
<p>${phone}</p>
<p class="address">${street.name}, ${city}, ${state}, ${postcode}</p>
<p>Birthday:
${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
</div>
`;
overlay.classList.remove("hidden");
modalContainer.innerHTML = modalHTML;
}


gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element clicked
    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');
    displayModal(index);
    }
    });



    modalClose.addEventListener('click', () => {
        overlay.classList.add("hidden");
        });



    //Promise.all([
        //fetchData(urlAPI)
      //])           
           
           //.catch(error => console.log('Looks like there was a problem!', error))
