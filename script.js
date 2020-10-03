
let job_list = document.querySelector('.job_list')
let filter_list = document.querySelector('.filter_list')
let filtr_arr = [];

Jobdownload(job_list);


// load the list
function Jobdownload(job_list ){
    job_list.innerHTML = " ";
    fetch("https://raw.githubusercontent.com/JDFIREX/Frontend-Mentor-Challenges-static-job-listings-master/master/data.json")
    .then(reponse => reponse.json())
    .then(result => {

        result.forEach( e => {

            let newJobOfertDiv = document.createElement('div');
            newJobOfertDiv.classList.add('job');
            newJobOfertDiv.dataset.id = `${e.id}`;

            newJobOfertDiv.innerHTML = `
            <img class="company_img" src="${e.logo}" alt="photosnap logo">
            <div class="company_info">
              <div class="company_name_box">
                <p class="company_name">${e.company}</p>
                <p class="company_new">NEW!</p>
                <p class="company_featured">FEATURED</p>
              </div>
              <div class="company_position_box">
                <h1 class="company_position">${e.position}</h1>
              </div>
              <div class="company_work_info_box">
                <p class="company_posted_at">${e.postedAt}</p>
                <p class="company_contract">${e.contract}</p>
                <p class="company_location">${e.location}</p>
              </div>
            </div>
            <div class="company_list">
              <div class="company_item_box" data-filtr="${e.role}">
                <p class="company_item">${e.role}</p>
              </div>
              <div class="company_item_box" data-filtr="${e.level}">
                <p class="company_item">${e.level}</p>
              </div>
            </div>
            `;

            job_list.appendChild(newJobOfertDiv)

            let jobOferByIdData = document.querySelector(`[data-id='${e.id}']`)

            if(e.new == false){
                let newP = jobOferByIdData.querySelector('.company_new');
                newP.style.display = "none";
            }
            if(e.featured == false){
                let newF = jobOferByIdData.querySelector('.company_featured');
                newF.style.display = "none";
            }else newJobOfertDiv.classList.add('job-before');

            let company_list = jobOferByIdData.querySelector('.company_list');

            e.languages.forEach( (l) => {
                let ldiv = document.createElement('div');
                ldiv.classList.add("company_item_box");
                ldiv.dataset.filtr = l;
                ldiv.innerHTML = `<p class="company_item">${l}</p>`;
                company_list.appendChild(ldiv)
            })
            
        })
        
        // load filrts
        let company_item_box = document.querySelectorAll('.company_item_box')
        company_item_box.forEach( c => {
            c.addEventListener('click', (e) => addFiltr_ToFiltrList(e))
        })

    })

}
// add filtr to list

function addFiltr_ToFiltrList(e){
    let filtr = e.path[1].dataset.filtr;
    Check_FilterList(filtrList_NewElement(filtr),filtr); 
    let nav = document.querySelector('.nav')
    filterListVisibility(nav,Visibility = "visible");
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

    if(!filtr_arr.includes(filtr)){
        filtr_arr.push(filtr);
    }

    let job_list = document.querySelector('.job_list')
    filtring_jobList(job_list,filtr_arr);

    let filter_item_close_img = document.querySelectorAll('.filter_item_close_img');
    filter_item_close_img.forEach( c => {
        c.addEventListener('click', (e) => close_FiltrItem(e))
    })
}

// close filtr from list

function close_FiltrItem(e){
    let filtrListItem = document.querySelectorAll('.filter_item');
    let filtrToClose = e.path[2].dataset.filtr;
    filtrListItem.forEach( (l) => {
        if(l.dataset.filtr == filtrToClose){
            filter_list.removeChild(l)
        }
    })

    filtr_arr = filtr_arr.filter( f => f != filtrToClose);
    let job_list = document.querySelector('.job_list')
    filtring_jobList(job_list,filtr_arr);

    if(filter_list.childElementCount == 0){
        let nav = document.querySelector('.nav')
        filterListVisibility(nav,Visibility = "hidden");
    }

}

// filtr job by the filtrs list 

function filtring_jobList(job_list,filtr_arr){
    if(filtr_arr.length > 0){
        let listcount = job_list.childElementCount;
        let filtr_arr_length = filtr_arr.length;
        for(let i = 0; i < listcount ; i++){
            let filtr_count = 0;
            let item_include_filtr = false;
            job_list.children[i].querySelectorAll('.company_item_box').forEach( c => {
                if(filtr_arr.includes(c.dataset.filtr)){
                    filtr_count++;
                }
            })
            if(filtr_count == filtr_arr_length){
                item_include_filtr = true;
            }
            if(!item_include_filtr){
                job_list.children[i].style.display = "none"; 
            }else{
                job_list.children[i].style.display = "flex"; 
            }
        }
    }else{
        Jobdownload(job_list);
    }
}


//  clear all filters from filter list

let filter_clear_btn = document.querySelector('#filter_clear_btn');


filter_clear_btn.addEventListener('click', () => clear_filter_list())

function clear_filter_list(){
    let filter_list = document.querySelector('.filter_list');
    filter_list.innerHTML = "";
    let nav = document.querySelector('.nav')
    window.location.reload()
}


function filterListVisibility(nav,Visibility){
    nav.style.visibility = Visibility;
}