// form-demo.js

/**
 * Handles custom JavaScript validation before form submission.
 * @param {Event} event - The submit event object.
 */
function validateForm(event) {
  // get a reference to the form using event.target
  const theForm = event.target;
  const errors = [];
  // start by assuming the form is valid.
  let isValid = true;

  // --- Activity 3 Custom Validations ---

  // Validation 1: Credit Card Number check
  if (theForm.paymentMethod.value === "creditCard") {
    // Only allow one specific number for testing
    if (theForm.creditCardNumber.value !== "1234123412341234") {
      isValid = false;
      errors.push("Invalid Credit Card Number. Must be 1234123412341234 for testing.");
    }
  }

  // Validation 2: Full Name check
  if (theForm.fullName.value !== "Bob") {
    isValid = false;
    errors.push("Your name must be 'Bob' to proceed.");
  }

  // if we ran into any problems above valid will be false.
  if (!isValid) {
    //stop the form from being submitted
    event.preventDefault();
    // show the errors
    showErrors(errors);
    // return false to let the browser know the form was not submitted.
    return false;
  }
}

/**
 * Shows/hides payment method details based on the selection.
 * @param {Event} e - The change event object.
 */
function togglePaymentDetails(e) {
  // get a reference to the form. We use the ID to query the form element.
  const theForm = document.querySelector("#checkoutForm");
  // we will also need the creditCardContainer and paypalUsernameContainer
  const creditCardContainer = document.getElementById(
    "creditCardNumberContainer"
  );
  const paypalContainer = document.getElementById("paypalUsernameContainer");

  // Hide payment containers by adding the '.hide' class to each of them
  creditCardContainer.classList.add("hide");
  paypalContainer.classList.add("hide");

  // Disable required for payment fields...
  theForm.creditCardNumber.required = false;
  theForm.paypalUsername.required = false;

  // Show the container based on the selected payment method, and add the required attribute back.
  if (theForm.paymentMethod.value === "creditCard") {
    creditCardContainer.classList.remove("hide");
    theForm.creditCardNumber.required = true;
  } else if (theForm.paymentMethod.value === "paypal") {
    paypalContainer.classList.remove("hide");
    theForm.paypalUsername.required = true;
  }
}

// helper function to display our errors.
function showErrors(errors) {
  const errorEl = document.querySelector(".errors");
  const html = errors.map((error) => `<p>${error}</p>`);
  errorEl.innerHTML = html.join("");
}

// --- Event Listeners (Activities 2 & 3) ---

// attach a change event handler to the paymentMethod input (Activity 2)
document
  .querySelector("#paymentMethod")
  .addEventListener("change", togglePaymentDetails);

// attach a submit event handler to the form (Activity 3)
document
  .querySelector("#checkoutForm")
  .addEventListener("submit", validateForm);