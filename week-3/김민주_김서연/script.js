

var saveDatas = new Array();

function addTodo (){
    console.log('add!')
    const boards = document.getElementById('boards');
    const masterText = document.getElementById('masterText').value;
    const noteId = Math.random().toString(36).substr(2,11);
    console.log(masterText)
    boards.innerHTML += `<div class="todo-element todo-box" id=${noteId}>
    <input type="checkbox" class="checkbox"/>
    <input type="text" class="text" id="textvalue" value=${masterText}/>
    <button>x</button>
</div>
    `;
    //console.log(document.getElementById(`${noteId}`).getElementById('masterText').value)
    //saveDataes.push({id : noteId, content : "testing", complete : true});
    console.log(saveDatas)
}