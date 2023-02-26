const phoneHunterApi = async(phone)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${phone}`
    const res = await fetch(url)
    const data = await res.json();
    displayApi(data.data);
}
const displayApi = (elements) =>{
    console.log(elements);
    const notFound = document.getElementById('not-found');
    //not found
    if(elements.length === 0){
        notFound.classList.remove('hidden')
    }else{
        notFound.classList.add('hidden')
    }
    // Show All
    const showallBtn = document.getElementById('showall-btn'); 
    if(elements.length>6){
        elements = elements.slice(0,6);
        showallBtn.classList.remove('hidden')
    }else{
        showallBtn.classList.add('hidden')
    }
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML="";
    for(const element of elements){
        const {image,phone_name,slug} = element
        const div = document.createElement('div');
        div.innerHTML=`
        <div class="card card-compact bg-base-100 shadow-xl">
            <figure><img src="${image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone_name}</h2>
                <p>${slug}</p>
                <div class="card-actions">
                    <label onclick="details('${slug}')" for="my-modal-3" class="btn btn-primary">Details</label>
                </div>
            </div>
        </div>
        `
        mainContainer.appendChild(div);
    }
    isSpinn(false)
}

// Spinner display function 
function isSpinn(spin){
    const spinner = document.getElementById('spinner');
    if(spin==true){
        spinner.classList.remove('hidden');
    }else{
        spinner.classList.add('hidden')
    }
}
// Details 
function details(id){
    console.log(id);
    const url=`https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res=>res.json())
        .then(data=>displayModal(data.data))
    const displayModal = (elementModal)=>{
        console.log(elementModal)
        const {name,mainFeatures}=elementModal;
        document.getElementById('phone-name').innerText = `${name}`
        document.getElementById('div-modal').innerHTML=`
        <ul>
        <li>Storage: ${mainFeatures.storage ? mainFeatures.storage:"Not Define"}</li>
        <li>DisplaySize: ${mainFeatures.displaySize? mainFeatures.displaySize:"Not Define"}</li>
        </ul>
        `
    }
}

// Search input btn 
document.getElementById('search-btn').addEventListener('click',()=>{
    const mainInput = document.getElementById('search-input')
    const searchInput = mainInput.value;
    phoneHunterApi(searchInput)
    mainInput.value="";
    isSpinn(true)
})
//show all btn


phoneHunterApi('iphone')
