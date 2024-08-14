const date = document.querySelector('#date')
const list = document.querySelector('#book-list');
const input = document.querySelector('#input');
const enter = document.querySelector('#enter');
const check = 'fa-circle-check';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let id = 0;
let LIST = [];

function addBook(book, id, read, deleted) {
    if (deleted) return;

    const READ = read ? `fa-regular ${check}` : `fa-regular ${uncheck}`;
    const LINE = read ? lineThrough : '';

    const newItem = `
    <li>                
        <i class="${READ}" data="read" id="${id}"></i>
        <p class="text ${LINE}">${book}</p>
        <i class="fa-solid fa-delete-left" data="delete" id="${id}"></i>
    </li>
    `;
    list.insertAdjacentHTML("beforeend", newItem);
}

function readBook(newItem) {
    const icon = newItem;

    if (icon.classList.contains(check)) {
        icon.classList.remove(check);
        icon.classList.add(uncheck);
    } else {
        icon.classList.remove(uncheck);
        icon.classList.add(check);
    }

    const textElement = icon.nextElementSibling;
    if (textElement) {
        textElement.classList.toggle(lineThrough);
        const itemId = parseInt(icon.id);
        LIST[itemId].read = !LIST[itemId].read; 
    }
}

enter.addEventListener('click', () => {
    const book = input.value;
    if (book) {
        addBook(book, id, false, false);
        LIST.push({
            name: book,
            id: id,
            read: false,
            deleted: false
        });
        console.log(LIST);
        id++;
    }
    localStorage.setItem('BOOKLIST',JSON.stringify(LIST))
    input.value = '';
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const book = input.value;
        if (book) {
            addBook(book, id, false, false);
            LIST.push({
                name: book,
                id: id,
                read: false,
                deleted: false
            });
            console.log(LIST);
            id++;
        }
        localStorage.setItem('BOOKLIST',JSON.stringify(LIST))
        input.value = '';
    }
});

list.addEventListener('click', function(event) {
    const newItem = event.target;
    const newItemData = newItem.attributes.data.value;
    
    if (newItemData === 'read') {
        readBook(newItem);
    } else if (newItemData === 'delete') {
        deleteBook(newItem);
    }
    localStorage.setItem('BOOKLIST',JSON.stringify(LIST))
});

let data = localStorage.getItem('BOOKLIST')
if(data){
    LIST=JSON.parse(data)
    id = LIST.length
    uploadList(LIST)
}else {
    LIST = []
    id = 0
}

function uploadList(DATA){
    DATA.forEach(function(i){
        addBook(i.name,i.id,i.read,i.deleted)
    })
}

function deleteBook(newItem) {
    const itemId = parseInt(newItem.id);
    LIST[itemId].deleted = true;
    newItem.parentElement.remove();
}

const DATE = new Date();
date.innerHTML = DATE.toLocaleDateString('es-CL', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
});
