const dropdowns = document.querySelectorAll("select");
const btn = document.querySelector("button");

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.previousElementSibling;
  img.src = newSrc;
};

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

async function updateExchangeRate() {
  let input = document.querySelector('input');
  let fromCurr = document.querySelector(".from select").value.toLowerCase();
  let toCurr = document.querySelector(".to select").value.toLowerCase();
  
  let amtVal = input.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    input.value = '1';
  }

  const URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";

  let response = await fetch(URL);
  let data = await response.json();
  
  let conversionRate = data.eur[toCurr] / data.eur[fromCurr];
  let value = conversionRate * amtVal;
  document.querySelector(".msg").innerText = `${amtVal} ${fromCurr.toUpperCase()} = ${value} ${toCurr.toUpperCase()}`;
}

btn.addEventListener('click', (evt) => {
  evt.preventDefault();
  updateExchangeRate();
})