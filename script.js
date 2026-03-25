let add = document.querySelector(".add")
let inputmenu = document.querySelector(".inputmenu")
let form = document.querySelector(".inputoform")
let titleinput = document.querySelector("#titleinput")
let contentinput = document.querySelector("#contentinput")
let submit = document.querySelector("#submitbtn")
let errormsg = document.querySelector(".errormsg")
let notecont = document.querySelector(".notcont")
let modeldelbtn= document.querySelector(".deletemodel")


// fetch  the existing notes is avalable else an empty array
let notes = JSON.parse(localStorage.getItem("notes")) || [];

displayNotes();


//when add button is  click an input menu appears
add.addEventListener("click", function () {
    inputmenu.style.display = "flex";

    setTimeout(() => {
        inputmenu.classList.add("show");
    }, 10);
})
modeldelbtn.addEventListener("click", function () {

    inputmenu.classList.remove("show"); // start animation

   setTimeout(() => {
        inputmenu.style.display = "none";
    }, 300);
});
form.addEventListener("submit", function (e) {
    e.preventDefault();
    // check that the input filed is empty or not 
    if (titleinput.value.trim() === "" || contentinput.value.trim() === "") {
        errormsg.style.display = "block"
        return
    }
    //  error massage resseting 
    errormsg.style.display="none"
     
    // if everything is okay now remove the inputmenu 
    inputmenu.style.display = "none"

    // show the notes 
      notecont.style.display = "flex"

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
    notecont.innerHTML = ""

    notes.forEach(function (current) {
        let div = document.createElement("div")
        div.classList.add("content-of-each-node")
        div.innerHTML = `
        <h3><box-icon name='edit' ></box-icon>${current.title}</h3>
        <p>${current.content}</p>
        <small>${current.createdAt}</small>
        <button class="taskdelete"><box-icon type='solid' name='message-alt-x'></box-icon></button> 
        <button class="edit"><box-icon name='edit-alt' type='solid' ></box-icon></button>
        `;

        let del = div.querySelector(".taskdelete")
        del.addEventListener("click", function () {
            div.classList.add("fadeout")

            setTimeout(function() {
                 notes = notes.filter(note => note.id !== current.id);  // deletion logic using filter 
            localStorage.setItem("notes", JSON.stringify(notes));

            //re render ui 
            displayNotes();
            }, 400);
           
        })


        let edit = div.querySelector(".edit");
        edit.addEventListener("click", function () {

            let newTitle = prompt("Edit title", current.title);
            if (newTitle === null || newTitle.trim() === "") return;

            let newContent = prompt("Edit content", current.content);
            if (newContent === null || newContent.trim() === "") return;

            // update values
            current.title = newTitle;
            current.content = newContent;

            // save
            localStorage.setItem("notes", JSON.stringify(notes));

            // refresh UI
            displayNotes();
        });

        notecont.appendChild(div)




    })

}