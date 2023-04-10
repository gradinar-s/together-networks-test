import { formFieldsConfig } from "../constants/constants.js";
import { clearError, outputDataToConsole, validate } from "../utils/utils.js";

const $loginBtn = document.querySelector("#login-btn");
const $loginBlockFields = document.querySelector("#login-block-fields");

let isLoginActive = false;
let enteredFieldsData = {};

const insertFormFields = (field) => {
  const isPasswordField = field?.type === "password";

  const html = `
    <div class="login-block__input">
        <input
          class="input"
          id="login-input"
          name="${field.name}"
          type="${field.type}"
          placeholder="${field.placeholder}"
        >
        ${isPasswordField ? `<a class="link forgot-password-link">Forgot your password?</a>` : ""}
    </div>
  `;

  $loginBlockFields.insertAdjacentHTML("beforeend", html);
};

$loginBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (!isLoginActive) {
    isLoginActive = true;
    // Change style of the button
    this.classList.add("login-block__button--active");
    // Render fields of login form
    return formFieldsConfig.forEach((f) => insertFormFields(f));
  }

  // Get rendered fields
  const $loginInputs = document.querySelectorAll("#login-input");

  // Displaying any count of fields
  $loginInputs.forEach((f) => {
    const { isValid, errorMessage } = validate(f.name, f.value);

    if (!isValid) {
      f.insertAdjacentHTML(
        "afterend",
        `<span id="${f.name}-error" class="login-block__input--error">${errorMessage}</span>`
      );
    }

    f.addEventListener("input", () => {
      clearError($loginBlockFields, `#${f.name}-error`);
    });

    enteredFieldsData = { ...enteredFieldsData, [f.name]: f.value };
  });

  const isValid = formFieldsConfig.every((f) => {
    const { isValid } = validate(f.name, enteredFieldsData[f.name]);
    return isValid;
  });

  if (isValid) {
    outputDataToConsole(enteredFieldsData);
  }
});
