const inputEl = document.getElementById("input-el");
const inputbtn = document.getElementById("input-btn");
const delbtn = document.getElementById("delete-btn");
const tab = document.getElementById("tab");
const ulEl = document.getElementById("ul-el");
let myleads = []

let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myleads") )

function render(leads){
    let listitems = ""
    for(let i=0; i< leads.length; i++){
    listitems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
    `
    }
    ulEl.innerHTML = listitems
}

if (leadsFromLocalStorage) {
    myleads = leadsFromLocalStorage
    render(myleads)
}

inputbtn.addEventListener("click", ()=>{
    myleads.push(inputEl.value);
    inputEl.value=""
    localStorage.setItem("myleads", JSON.stringify(myleads) )
    render(myleads)
})

delbtn.addEventListener("dblclick", ()=>{
    localStorage.clear()
    myleads = []
    render(myleads)
})

tab.addEventListener("click", ()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myleads.push(tabs[0].url)
        localStorage.setItem("myleads", JSON.stringify(myleads) )
        render(myleads)
    })
})

