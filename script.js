// lets
let job = document.querySelector('.job');
let company_item_box = document.querySelectorAll('.company_item_box')
let filter_list = document.querySelector('.filter_list')

//call function

window.addEventListener('load', (e) =>  Jobdownload())


company_item_box.forEach( c => {
    c.addEventListener('click', (e) => addFiltr_ToFiltrList(e))
})


// function

function Jobdownload(){
    fetch("./data.json").then(reponse => reponse.json()).then(result => result.json())
}








function addFiltr_ToFiltrList(e){
    let filtr = e.path[1].dataset.filtr;
    Check_FilterList(filtrList_NewElement(filtr),filtr); 
}

function filtrList_NewElement(filtr){
    let new_filter_item_div = document.createElement("div");
    new_filter_item_div.classList.add("filter_item");
    new_filter_item_div.dataset.filtr = filtr;
    new_filter_item_div.innerHTML = `
            <div class="filter_item_name" >
                <p class="filter_item_name_lang" >${filtr}</p>
            </div>
            <div class="filter_item_close">
                <img class="filter_item_close_img" src="images/icon-remove.svg" alt="remove item from filter">
            </div>
    `;
    return new_filter_item_div;
}

function Check_FilterList(newElement,filtr){
    let filter_item_count = filter_list.childElementCount;
    let counter = 0;
    if(filter_item_count > 0){
        for(let i = 0; i < filter_item_count; i++){
            filter_list.children[i].dataset.filtr != filtr ? counter++ : null;
            if(counter == filter_item_count){
                filter_list.appendChild(newElement)
            }
        }
    }else {
        filter_list.appendChild(newElement)
    }



    let filter_item_close_img = document.querySelectorAll('.filter_item_close_img');
    filter_item_close_img.forEach( c => {
        c.addEventListener('click', (e) => closeFiltrItem(e))
    })
}


function closeFiltrItem(e){
    let filtrListItem = document.querySelectorAll('.filter_item');
    let filtrToClose = e.path[2].dataset.filtr;
    filtrListItem.forEach( (l) => {
        if(l.dataset.filtr == filtrToClose){
            filter_list.removeChild(l)
        }
    })
}