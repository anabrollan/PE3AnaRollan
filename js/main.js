const date = document.querySelector('#date')
const list = document.querySelector('#book-list')
const input = document.querySelector('#input')
const enter = document.querySelector('#enter')
const check = 'fa-regular fa-circle-check'
const unchek = 'fa-regular fa-circle'
const line-through = 'line-through'

function addBook (book,id,read,deleted) {
    const newItem = 
    `
    <li id="newItem">                
    <i class="fa-regular fa-circle" data="read" id="0"></i>
    <p class="text">${book}</p>
    <i class="fa-solid fa-delete-left" data="delete" id="0"></i>
    </li>
    `  
    book-list.insertAdjacentHTML("beforeend",newItem)
}

enter.addEventListener('click',()=> {
    const book = input.value
    if(book) {
        addBook(book)
    }
    input.value=''
})

document.addEventListener('keyup',function(event){
    if(event.key=='Enter'){
        const book = input.value
        if(book) {
            addBook(book)
        }
        input.value=''
    }
})
