
//Fetch data from api
fetch("https://randomuser.me/api/?results=12&nat=ca")
    .then(response => response.json()) // receive data in json format
    .then(responseData => responseData.results) 
    .then(generateResults) //use helper function 
    .catch(error => console.log(error)) //handling error


//Helper function
const listOfEmployees = [];
const gallery = document.getElementById("gallery"),

function generateResults (data){
    listOfEmployees = data
    //Create employee details needed to be looped
    data.forEach((e, index) =>{
        const image = e.image
        const firstName = e.name.first
        const lastName = e.name.last
        const email = e.email
        const city = e.city
        const state = e.state
        //create employee details HTML
        searchbarHTML = `
        <div class="card" data-index=${index} >
            <div class="card-img-container">
                <img class="card-img" src="${picture}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${city}, ${state}</p>
        </div>
    </div>`;
    gallery.insertAdjacentHTML('beforeend', searchbarHTML)//insert employee HTML created into DOM
    })
}


//Regex dateOfBirth.
function formatDateOfBirth(dateOfBirth) {
    const year = dateOfBirth.date.slice(0,4);
    const month = dateOfBirth.date.slice(5,7)
    const day = dateOfBirth.date.slice(8,10);
    return `${month}/${day}/${year}`;
}


//Display modal.
const body = document.querySelector("body");
let index = 0;

function showmodal(index){
    const {name, email, location, cell, dateOfBirth, picture} = employeelist[index];
    let DOB = formatdob(dateOfBirth);
    const regexCell = /^\D(\d{3})\D(\d{3})\D(\d{4})\D$/
    const cellFormat = cell.replace(regexCell, '($1) $2-$3')

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
    //Add the modal HTML inside of body.
    body.insertAdjacentHTML('beforeend', addDiv);
  //remove current modal container when clicking the close button.
  const closebtn = document.getElementById('modal-close-btn');
  const modalcontainer = document.querySelector('.modal-container');
      closebtn.addEventListener('click', () => {
      modalcontainer.remove();
      })
    //Set up next, previous and container buttons.("Exceeds #2")
    const btnPrev = document.getElementById('modal-prev');
    const btnNext = document.getElementById('modal-next');
    const btnmodal = document.querySelector('.modal-btn-container');

        btnmodal.addEventListener('click', (e) => {
            if (e.target == btnNext && Index < employeelist.length - 1) {
                Index++
            } else if (e.target == btnNext && Index == employeelist.length - 1) {
                Index = 0
            } else if (e.target == btnPrev && Index > 0) {
                Index--
            }else if (e.target == btnPrev && Index == 0) {
                Index = employeelist.length -1
            }
            document.body.removeChild(document.body.lastElementChild);
            //Another way to remove the last modal 'document.querySelector('.modal-container').remove();'
            displaymodal(Index);
        })
}