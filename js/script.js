
//Fetch data from api
fetch("https://randomuser.me/api/?results=12&nat=ca")
    .then(response => response.json()) // receive data in json format
    .then(responseData => responseData.results) 
    .then(generateResults) //use helper function 
    .catch(error => console.log(error)) //handling error


//Helper function to use to generate results above
let listOfEmployees = []; //create an empty array to save data in generateResults function
const gallery = document.getElementById("gallery");

function generateResults(data){
    listOfEmployees = data // keep data in array //
    data.forEach((element, index) =>{ //list of what info each element will have in array//
        const image = element.picture.large
        const firstName = element.name.first
        const lastName = element.name.last
        const email = element.email
        const city = element.location.city
        const state = element.location.state
        //create employee details HTML
        searchbarHTML = 
        `<div class="card" data-index=${index}>
            <div class="card-img-container">
                <img class="card-img" src="${image}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${city}, ${state}</p>
            </div>
        </div>`; //html to be inserted into DOM in order to display in browser //
        gallery.insertAdjacentHTML('beforeend', searchbarHTML);
    })
}


//Regex dateOfBirth to rearrange by month/day/year
function formatDateOfBirth(dob) {
    const year = dob.date.slice(0,4); //slicing year from original data: year is first four digits
    const month = dob.date.slice(5,7) //slicing month from original data: month is fifth to seventh digit
    const day = dob.date.slice(8,10); //slicing day from original data: day is eigth to tenth digit
    return `${month}/${day}/${year}`; //return in order of month/day/year
}


//Display modal.
const body = document.querySelector("body"); // grabbing body element in order to allow a new "dev" to be created below
let Index = 0;

function showModal(index){
    const {name, email, location, cell, dob, picture} = listOfEmployees[index]; //use index to loop through data from fetch
    let DOB = formatDateOfBirth(dob); //format date of birth to month/day/year//
    const regexCell = /^\D(\d{3})\D(\d{3})\D(\d{4})\D$/; //validate cell number to xxx xxx xxxx//
    const cellFormat = cell.replace(regexCell, '($1) $2-$3'); //order cell number xxx xxx-xxxx//

    //create new "div" HTML holding all the profile info to the DOM//
    addDiv = 
    `<div class="modal-container" data-index="${index}">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${location.city}</p>
                <hr>
                <p class="modal-text">${cellFormat}</p>
                <p class="modal-text">${location.street.number} ${location.street.name}, ${location.city}, ${location.state} ${location.postcode}</p>
                <p class="modal-text">Birthday: ${DOB}</p>
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`;
    //Append the newly created modal "div" HTML inside body element.
    body.insertAdjacentHTML('beforeend', addDiv);
  //remove current modal container when clicking the close button.
  const closeButton = document.getElementById('modal-close-btn'); //grab close button element from DOM
  const modalContainer = document.querySelector('.modal-container'); //grab modal-container element from DOM
      //click event listner to remove modalContainer element when closed
      closeButton.addEventListener('click', () => {
      modalContainer.remove();
      })
    //Set up next, previous and container buttons.("Exceeds #2")
    const previousButton = document.getElementById('modal-prev');
    const nextButton = document.getElementById('modal-next');
    const btnmodal = document.querySelector('.modal-btn-container');

        //event listner with conditions on how employees can be viewed using next and previous buttons
        btnmodal.addEventListener('click', (e) => {
            if (e.target == nextButton && Index < listOfEmployees.length - 1) {
                Index++
            } else if (e.target == nextButton && Index == listOfEmployees.length - 1) {
                Index = 0
            } else if (e.target == previousButton && index > 0) {
                Index--
            } else if (e.target == previousButton && Index == 0) {
                Index = listOfEmployees.length -1
            }
            document.body.removeChild(document.body.lastElementChild);
            //Alternatively, you can remove the last modal with 'document.querySelector('.modal-container').remove();'
            showModal(Index);
        })
}

//Show the profile modal of employee.
gallery.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    const index = card.getAttribute('data-index');
    Index = index
    showModal(Index);
})

//Create function to add searchbar to the DOM
const searchContainer = document.querySelector(".search-container"); //grab search bar element
function createsearchbar(){
    const newSearchBarElement = 
    `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
    searchContainer.insertAdjacentHTML('beforeend',newSearchBarElement);
}
createsearchbar(); //show searchbar by default on page

//use a partial search to filter out results


searchContainer.addEventListener('keyup', e => {
    e.preventDefault();
    searchInput = document.getElementById('search-input').value.toLowerCase();
  
    for(let i = 0; i < gallery.children.length; i++) {
        let showpage = gallery.children[i].children[1].children[0].textContent.toLowerCase();
        if(showpage.includes(searchInput)) {
          gallery.children[i].setAttribute('style', 'display: flex')
        } else if(!(showpage.includes(searchInput))) {
          gallery.children[i].setAttribute('style', 'display: none')
        }     
    }
});