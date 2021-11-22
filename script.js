$(() => {



    const textInput = document.querySelector("#textInput")
    const dateInput = document.querySelector("#dateInput")
    const timetInput = document.querySelector("#timeInput")
    const addButton = document.querySelector(".btn-primary")
    const emptyButton = document.querySelector(".btn-danger")
    const warning = document.querySelector(".warning")


    // ========== Calling the functions ============//
    deleteNote()
    emptyTask()


    // =================== Delete the html note ==================================//

    function deleteNote() {
        const delNote = document.querySelector(".btnIcon")
        delNote.addEventListener('click', function (e) {
            e.target.parentElement.parentElement.parentElement.remove()
        })

    }

    // ================  Empty the input ======================================//
    function emptyTask() {

        emptyButton.addEventListener('click', function () {
            textInput.value = ""
            dateInput.value = "dd-MM-yyyy"
            timetInput.value = "HH:mm"
            warning.style.visibility = "hidden "
        })
    }

    /// ====================== Note Arry============== ///
    let noteTask = []


    // =====================  A function to make a new note ===============//
    function makeANote() {

        const section = document.querySelector(".notePart")

        const cardNote = document.createElement("div")   // יצירת דיב לקרד
        cardNote.className = "card"
        cardNote.style.width = "18rem";

        const img = document.createElement("img")
        img.className = "card-img-top"
        img.src = "/img/notebg.png"

        const cardimgoverlay = document.createElement("div") // יצירת דיב לתמונה הצהובה
        cardimgoverlay.className = "card-img-overlay"

        const iconX = document.createElement("button") // איקון של האיקס
        iconX.classList.add("btnIcon")
        iconX.innerHTML = '<i class="far fa-times-circle fa-lg"></i>'


        const cardText = document.createElement("p")
        cardText.className = "card-text"
        cardText.textContent = textInput.value   // אינפוט של המשימה לפתק
        cardText.required = true;

        const inputsDateTime = document.createElement("div")
        inputsDateTime.className = "inputsDateTime"

        const inputDate = document.createElement("p")
        inputDate.className = "inputDate"
        inputDate.textContent = dateInput.value.split("-").reverse().join("-");
        // אינפוט של התאריך לפתק

        const inputTime = document.createElement("p")
        inputTime.className = "inputTime"
        inputTime.textContent = timetInput.value  // אינפוט של השעה לפתק



        noteTask.push({ text: textInput.value, date: dateInput.value, time: timetInput.value })

        localStorage.setItem("noteTask", JSON.stringify(noteTask));


        cardimgoverlay.appendChild(iconX)
        cardimgoverlay.appendChild(cardText)
        inputsDateTime.appendChild(inputDate)
        inputsDateTime.appendChild(inputTime)
        cardimgoverlay.appendChild(inputsDateTime)
        cardNote.appendChild(img)
        cardNote.appendChild(cardimgoverlay)
        section.appendChild(cardNote)


        document.body.appendChild(section)

        iconX.addEventListener('click', function (evn) {
            evn.target.parentElement.parentElement.parentElement.remove()
            add = JSON.parse(localStorage.getItem("noteTask"))
            noteTask = add.filter(function (n) {

                return n.text != evn.target.parentElement.parentElement.parentElement.querySelector(".card-text").textContent
            })
            localStorage.noteTask = JSON.stringify(noteTask)


        })


    }



    // ===================== whats happining when you click the add button===============//
    addButton.addEventListener('click', function (e) {
        if (textInput.value != "" && dateInput.value != "" && timetInput.value != "") {

            makeANote()
        } else {
            warning.style.visibility = "visible "
            warning.innerHTML = "*Please fill all the empty fields";

        }

    })




    // ==================== localStorge function ===========================//
    let add = []
    if (!localStorage.getItem('noteTask') && !textInput.value == "" || !dateInput.value == "" || !timetInput.value == "") {
        localStorage.setItem("noteTask", JSON.stringify(noteTask))
    } else {
        add = JSON.parse(localStorage.getItem("noteTask"))
        for (const item of add) {
            makeANote(
                (textInput.value = item.text),
                (dateInput.value = item.date),
                (timetInput.value = item.time)
            );
        }
    }


})