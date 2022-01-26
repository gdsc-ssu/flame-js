
let notesData = JSON.parse(localStorage.getItem('saveData')) || [
    {"contents":"","noteId":"abcdefg","createdAt":new Date().toLocaleString(),"color":"#123123"}
] 
const DEBOUNCE_DURATION = 300; // in 


function addNotes (){
    const noteId = Math.random().toString(36).substr(2,11);
    let randomColor = generateRandomHexColor();
    notesData.push({"contents":"","noteId":noteId,"createdAt":new Date().toLocaleString(),"color":randomColor})

    getNotes()
    
}
function deleteNotes(){
    const selector = this.parentNode.parentNode;
    const selectorIndex = notesData.findIndex(x => x?.noteId === selector.id);

    notesData.splice(selectorIndex,1)
    localStorage.setItem('saveData',JSON.stringify(notesData))
    //console.log(selector.id)
    getNotes()
}

function getNotes(){
    const boards = document.getElementById('boards');
    boards.innerHTML = ''

    notesData.forEach(index => {
        boards.innerHTML += `<div class="notes-body" style="background-color:${index?.color}" id=${index?.noteId}>
    <header class="notes-header"><p class="date" style="color:${contrast(index?.color)}">${index?.createdAt}</p><button id="deleteBtn" onclick="deleteNotes.call(this)"><i style="color:#db5d5d" class="fa fa-times"></i></button></header>
    <textarea style="color:${contrast(index?.color)}" oninput="onInputDebounced({id: this.parentNode.id, value:this.value, arg1: 'someArg2'})"  class="notes-contents" id="textarea" placeholder="please enter the contents" >${index.contents}</textarea>
                        </div>
    `;
    randomColor = generateRandomHexColor(); 
    });
}

window.onload = function () {
    getNotes()
  };


function onInputChange({id, value, arg1}){
    const selectorIndex = notesData.findIndex(x => x?.noteId === id);
    notesData[selectorIndex].contents = value
    localStorage.setItem('saveData',JSON.stringify(notesData))
}

const onInputDebounced = debounce( ({id, value, arg1}) => {
onInputChange({id, value, arg1}); 
}, DEBOUNCE_DURATION);

function debounce(callback, wait, context = this) {
    let timeout = null;
    let callbackArgs = null;

    const later = () => callback.apply(context, callbackArgs);

    return function({id}) {
        callbackArgs = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


function rgbToYIQ({r, g, b}) {
    return ((r * 299) + (g * 587) + (b * 114)) / 1000;
  }

  function hexToRgb(hex) {
    if (!hex || hex === undefined || hex === '') {
      return undefined;
    }

    const result =
          /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : undefined;
  }

  function contrast(colorHex, threshold = 128) {
    if (colorHex === undefined) {
      return '#000';
    }

    const rgb = hexToRgb(colorHex);

    if (rgb === undefined) {
      return '#000';
    }

    return rgbToYIQ(rgb) >= threshold ? '#000' : '#fff';
  }

  function generateRandomHexColor (){
    const hexadecimalIntegers = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
    let hexColor = "#"
  
    while (hexColor.length < 7) {
      hexColor += hexadecimalIntegers[ Math.floor( Math.random() * hexadecimalIntegers.length ) ]
    }
    return hexColor
  }