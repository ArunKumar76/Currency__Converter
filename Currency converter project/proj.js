const base_url = "https://2024-03-06.currency-api.pages.dev/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for (let select of dropdowns){
    for (code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name === "from" && code === "USD"){
            newOption.selected = "selected";
        }
    else if(select.name === "to" && code === "INR"){
        newOption.selected = "selected";

        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
async function updateExchange(){
    let amt = document.querySelector("form input");
    let amtval = amt.value;
    if(amtval === "" || amtval < 1){
        amtval = 1;
        amt.value = "1";
        }
    const fc = fromcurr.value.toLowerCase();
    const URL = `${base_url}/${fc}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fc];
    let final = rate[tocurr.value.toLowerCase()];
    let finalamt = final * amtval;
    msg.innerText = `${amtval} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;
}
function updateFlag(element){
    let currCode = element.value;
    let countCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchange();
});
window.addEventListener("load", () => {
    updateExchange();
});