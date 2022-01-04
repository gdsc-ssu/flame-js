
const addNoteBtn = document.querySelector('.addNote');


addNoteBtn.addEventListener('click', () => {
    onCreateNote();
});

function onCreateNote() {
    const newNote = document.createElement('div'); 
    newNote.classList.add('note');
    newNote.innerHTML = `
        <div class="tools">
            <button class="edit btnIcon">✏️</button>
            <button class="delete btnIcon">❌</button>
        </div>
        <div class="main hidden"></div>
        <textarea placeholder="text를 입력하세요."></textarea>
    `;
    const editBtn = newNote.querySelector('.edit');
    const deleteBtn = newNote.querySelector('.delete');
    const main = newNote.querySelector('.main');
    const textarea = newNote.querySelector('textarea');

    function editHandler() {
        main.classList.toggle('hidden');
        textarea.classList.toggle('hidden')
    }
    function deleteHandler() {
        document.body.removeChild(newNote);
    }
    function inputHandler(e) {
        const text = e.target.value;
        main.innerHTML = marked.parse(text);
    }
    editBtn.addEventListener('click', editHandler);
    deleteBtn.addEventListener('click', deleteHandler);
    textarea.addEventListener('input', inputHandler);

    //마우스를 이용하여 노트 위치 이동시키기
    let isDragging = null;
    let shiftX = null;
    let shiftY = null;
    //note 박스 위에 마우스를 클릭했을때
    function onMouseDown(e) {
        isDragging = true;
        shiftX = e.clientX - newNote.offsetLeft; //note안에서의 X좌표(왼쪽 모서리가 0)
        shiftY = e.clientY - newNote.offsetTop; 
    }
    newNote.addEventListener('mousedown', onMouseDown);
    // 브라우저 위에서 마우스 움직일때
    function onMouseMove(e) {
        if (isDragging) {
            newNote.style.left = e.pageX - shiftX + "px"
            newNote.style.top = e.pageY - shiftY + "px"
        }
    }
    document.addEventListener('mousemove',onMouseMove)
    //note 박스 위에서 마우스 뗐을때
    document.addEventListener('mouseup', function (e) {
        isDragging = false;
    })
    
    document.body.appendChild(newNote);
}






