let form=document.getElementById("form")
let input=document.getElementById("topicinput")
let textarea=document.getElementById("textareainput")
let displaynote=document.getElementById("displaynote")

let notearray=[]

form.addEventListener("submit", addnote)
function addnote(event){
    event.preventDefault();

    let topicinput=input.value;
    let textareainput=textarea.value;
    if (topicinput.length===0 && textareainput.length===0){
        alert("pls enter the bothe feild")
    }
    else {
        const bothvalue = {
            topic:topicinput,
            textarea:textareainput
        }
        notearray.push(bothvalue)
        localStorage.setItem("note",JSON.stringify(notearray))
        form.reset();
        fetchnote();
       
    }
}
function fetchnote(event){
    if(localStorage.getItem("note")){
        notearray=JSON.parse(localStorage.getItem("note"))
    }
    showNotesOnUI();
}
// fetchnote()
function showNotesOnUI(){
    displaynote.innerHTML=''
    notearray.forEach(function(noteentered, index){
        

        let textcontnrdiv=document.createElement("div")
        textcontnrdiv.classList.add("text-contn")
        
        let topicanddeletdiv=document.createElement("div")
        topicanddeletdiv.classList.add("topic-and-delet-contnr")

        let topicinput=document.createElement("h1")
        topicinput.textContent=noteentered.topic;

        let deletebutton=document.createElement("button")
        deletebutton.classList.add("button")
        deletebutton.textContent="Delete"

        let notecontnr=document.createElement("h3")
        notecontnr.textContent=noteentered.textarea
        
        topicanddeletdiv.append(topicinput,deletebutton)
        textcontnrdiv.append(topicanddeletdiv,notecontnr)
        displaynote.append(textcontnrdiv)
        
        deletebutton.addEventListener("click", function(){
            notearray.splice(index, 1)
            localStorage.setItem("note", JSON.stringify(notearray))
            showNotesOnUI();
        })
    })
    
}
fetchnote();