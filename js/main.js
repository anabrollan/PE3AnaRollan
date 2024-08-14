const list = document.querySelector('#book-list');
const input = document.querySelector('#input');
const enter = document.querySelector('#enter');
const check = 'fa-circle-check';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let id = 0;

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
    }
}

enter.addEventListener('click', () => {
    const book = input.value;
    if (book) {
        addBook(book, id, false, false);
        id++;
    }
    input.value = '';
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const book = input.value;
        if (book) {
            addBook(book, id, false, false);
            id++;
        }
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
});

function deleteBook(newItem) {
    newItem.parentElement.remove();
}
