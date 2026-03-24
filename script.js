let add = document.querySelector(".add")
let inputmenu = document.querySelector(".inputmenu")
let form = document.querySelector(".inputoform")
let titleinput = document.querySelector("#titleinput")
let contentinput = document.querySelector("#contentinput")
let submit = document.querySelector("#submitbtn")
let errormsg = document.querySelector(".errormsg")


// fetch  the existing notes is avalable else an empty array
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// displayNotes();


//when add button is  click an input menu appears
add.addEventListener("click", function () {
    inputmenu.style.display = "flex"


})
form.addEventListener("submit", function (e) {

    e.preventDefault();


    // check that the input filed is empty or not 
    if (titleinput.value.trim() === "" || contentinput.value.trim() === "") {
        errormsg.style.display = "block"
        return
    }
    // if everything is okay now remove the inputmenu 
    inputmenu.style.display = "none"

    // storing the vlues in an object 
    let note = {
        id: Date.now(),
        title: titleinput.value,
        content: contentinput.value,
        createdAt: new Date().toLocaleString()
    }

    // created object is push into the array 
    notes.push(note);

    //storing the notes into the local storage
    localStorage.setItem("notes", JSON.stringify(notes))

    //  to display current input calling the display todos function  

    displayNotes();
    titleinput.value = ""
    contentinput.value = ""
});

function displayNotes() {

let notecont = document.querySelector(".notesecction");
notecont.innerHTML=""

    notes.forEach(function (current) {
        let div = document.createElement("div")
        div.innerHTML=`
        <h3>${current.title}</h3>
        <p>${current.content}</p>
        <small>${current.createdAt}</small>
        <button class="taskdelete"> DELETE</button> 
        `;

        let del= div.querySelector(".taskdelete")
         del.addEventListener("click" , function(){
            notes = notes . filter(note=> note.id !== current.id);  // deletion logic using filter 
            localStorage.setItem("notes" , JSON.stringify(notes));

            //re render ui 
            displayNotes();
         })

        notecont.appendChild(div)

        

        
    })

}