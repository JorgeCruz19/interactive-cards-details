/* Inputs */
const $cardNumberInput = document.getElementById("card-number");
const $cardNameInput = document.getElementById("card-name");
const $cardMonthInput = document.getElementById("card-month");
const $cardYearInput = document.getElementById("card-year");
const $cardCVCInput = document.getElementById("card-cvc");
/*  */
const $cardNumber = document.querySelector(".card-bank-number");
const $cardName = document.querySelector(".card-bank-name");
const $cardMonth = document.querySelector(".card-bank-month");
const $cardYear = document.querySelector(".card-bank-year");
const $cardCVC = document.querySelector(".card-bank-cvc");
/*  */
const $error = document.querySelector(".error");
const $creditCard = document.querySelector(".credit-card");
const $logoBrand = document.querySelector(".card-logo-brand");
const $form = document.getElementById("form");

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const verifyForm = checkRequired([$cardNumberInput, $cardNameInput, $cardMonthInput, $cardYearInput, $cardCVCInput]);
  if (verifyForm) {
    $form.innerHTML = templateConfirmation();
  }
});

$cardNumberInput.addEventListener("input", (e) => {
  e.target.value = e.target.value
    .replace(/[^\d]/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();

  cardNumberWithoutSymbols = e.target.value.replace(/[ -]/g, "");
  let match =
    /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9]) [0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/.exec(
      cardNumberWithoutSymbols
    );

  if (match) {
    var types = ["Visa", "MasterCard", "Discover", "American Express", "Diners Club", "JCB"];
    for (var i = 1; i < match.length; i++) {
      if (match[i]) {
        $creditCard.innerHTML = `Credit/debit card: ${types[i - 1]}`;
        $logoBrand.style.display = "block";
        $logoBrand.src = `./assets/${types[i - 1]}.svg`;
        $error.innerHTML = "";
        break;
      }
    }
  } else {
    $error.innerHTML = "Invalid card number";
    $logoBrand.style.display = "none";
    $creditCard.innerHTML = "";
  }
  $cardNumber.innerText = e.target.value;
});

$cardNameInput.addEventListener("input", (e) => {
  $cardName.innerText = e.target.value;
});

$cardMonthInput.addEventListener("input", (e) => {
  $cardMonth.innerText = e.target.value;
});

$cardYearInput.addEventListener("input", (e) => {
  $cardYear.innerText = e.target.value;
});

$cardCVCInput.addEventListener("input", (e) => {
  $cardCVC.innerText = e.target.value;
});

//template confirmation
const templateConfirmation = () => {
  return `
  <div class="card-confirmation">
    <img src="./assets/icon-complete.svg" class="card-confirmation-image" alt="Thank you"/>
    <h2 class="card-confirmation-title">Thank you!</h2>
    <p class="card-confirmation-details">We've added your card details</p>
    <button class="form-btn" onClick="window.location.reload()">Continue</button>
  </div>
  `;
};

//Check required fields
const checkRequired = (inputArr) => {
  let verify = null;
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, "Can't be blank");
      verify = false;
    } else {
      showSuccess(input);
      verify = true;
    }
  });
  return verify;
};

//Show error input
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.classList.add("error");
  const small = formControl.querySelector("small");
  small.innerText = message;
};

//Show success outline
const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.classList.add("success");
  formControl.classList.remove("error");
  const small = formControl.querySelector("small");
  small.innerText = "";
};
