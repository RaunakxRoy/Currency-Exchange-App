// --- Main Logic ---
const BASE_URL = "https://v6.exchangerate-api.com/v6/4ec92a5960939bf1ad877f61/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// populate dropdowns
for (let select of dropdowns) {
  for (let currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currcode;
    newoption.value = currcode;

    if (select.name === "from" && currcode === "USD") {
      newoption.selected = true;
    } else if (select.name === "to" && currcode === "INR") {
      newoption.selected = true;
    }
    select.append(newoption);
  }

  // event listener for flag update
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

// update flag dynamically
const updateflag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

// button click to fetch exchange rate
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amt = document.querySelector(".amount input");
  let amtval = amt.value;

  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amt.value = "1";
  }

  const url = `${BASE_URL}/${fromcurr.value}`;
  let resp = await fetch(url);
  let data = await resp.json();

  let rate = data.conversion_rates[tocurr.value];
  let finalamt = (parseFloat(amtval) * rate).toFixed(2);

  msg.innerText = `${amtval} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;
});