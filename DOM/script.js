
// Quick & Dirty
// function createListItem(item){
//     const li = document.createElement('li');
//     li.innerHTML = `
//             ${item}
//           <button class="remove-item btn-link text-red">
//             <i class="fa-solid fa-xmark"></i>
//           </button>
//        `
//         document.querySelector('.items').appendChild(li);

// }
// createListItem('Eggs');

// Clean & Performant
const input = document.querySelector('#item-input');
const addBtn = document.querySelector('.btn');
const clearAll = document.querySelector('.btn-clear');
const itemsList = document.querySelector('.items');
const itemForm = document.getElementById('item-form');
// Add Item
function createNewItem(inputVal){
    
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(inputVal));

    const button = createBtn('remove-item btn-link text-red');
    
    li.appendChild(button);
    document.querySelector('.items').appendChild(li);
    input.value = "";
    
}
// Local Storage
function addItemToLocalStorage(item){
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
}
//Remove Item From storage
function removeItemFromLocalStorage(item){
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items = items.filter(i => i !== item); 
    localStorage.setItem('items', JSON.stringify(items));
}
// Clear Storage
function clearItemLocalStorage(){
    localStorage.clear();
}

// Event Listener

// Add Button
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const inputVal = input.value;
    if(inputVal.trim() ===""){
        alert('Wrong or invalid entry!');
    }else{

        createNewItem(inputVal);
        addItemToLocalStorage(inputVal);
        
    }
});
// Remove Button
itemsList.addEventListener('click',(e)=>{
    
    if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
        const btn = e.target.closest('.remove-item');
        const li = btn.closest('li');
        if(li){
            const itemText = li.firstChild.textContent.trim(); 
            li.remove(); 

          
            removeItemFromLocalStorage(itemText);
        }
    }
});


// Clear All
clearAll.addEventListener('click', (e)=>{
    const lilist = document.querySelectorAll('li');
    lilist.forEach((li)=>{
        li.remove();
        clearItemLocalStorage();
    })
});


function createBtn(classes){
     const button = document.createElement('button');
     button.className = classes;
     const icon = createIcon('fa-solid fa-xmark');
     button.appendChild(icon);
     return button;
}
function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

document.addEventListener('DOMContentLoaded', () => {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.forEach(item => createNewItem(item));
});






