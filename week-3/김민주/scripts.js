


function addNotes (){
    const boards = document.getElementById('boards');
    const noteId = Math.random().toString(36).substr(2,11);

    boards.innerHTML += `<div class="notes-body" id=${noteId}>
    <header><button id="deleteBtn" onclick="deleteNotes.call(this)">X</button>
    <button id="saveBtn" onclick="saveNotes.call(this)">save</button></header>
    <textarea class="notes-contents"">Hi I am Note</textarea>
                        </div>
    `;
    
}
function deleteNotes(){
    this.parentNode.parentNode.remove()
}

function editNotes(){
    
}
function saveNotes(){
    const boards = document.getElementById('boards');
    localStorage.setItem('saveData',boards.innerHTML,)
    //var doc = new DOMParser().parseFromString(str, "text/html")
    console.log(boards.innerHTML)
    //console.log(this.parentNode.parentNode.parentNode.innerHTML)
}
window.onload = function () {
    const boards = document.getElementById('boards');
    try{
        boards.innerHTML += localStorage.getItem('saveData')
    }
    catch(e){

    }
  };
