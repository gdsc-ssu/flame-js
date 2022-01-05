const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
const li = document.querySelector('li');
const todo = document.querySelector('.todo');

let index = 0;

form.addEventListener('submit',function(e){
    e.preventDefault();
    if(input.value){
        // localStorage.setItem(index++,input.value);
        const li = document.createElement('li');
        li.innerText = input.value;
        li.classList.add('todo');
        ul.appendChild(li);
        input.value='';    


        li.addEventListener('click',function(e){
            
            li.classList.toggle('done');
        })
    li.addEventListener("contextmenu",function(e){
        e.preventDefault();
        li.remove();
    })
    }
    else{
        alert('내용을 입력하세요!')
    }
    
})

