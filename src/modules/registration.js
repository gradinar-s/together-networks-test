import { registrationConfig } from "../constants/constants";
import { clearError, outputDataToConsole, validate } from "../utils/utils";
import { slider } from "./slider";

const $slides = document.querySelector("#swiper-slides");
const $nextSlideBtn = document.querySelector("#next-step");
const $prevSlideBtn = document.querySelector("#prev-step");

let currentStep = 0;
let enteredData = {};

const insertSlideTemplate = (content) => {
  const html = `
    <div class="registration-slider__slide swiper-slide">
        <div class="registration-slider__step">
            ${content}
        </div>
    </div>
  `;

  return html;
};

const drawSlideWithInput = (slide) => {
  const html = `
    <span class="registration-slider__label">${slide.label}</span>
    <div id="slide-space-${slide.id}" class="registration-slider__space">
       <input name="${slide.id}" type="${slide.type}" class="registration-slider__space--input" />
    </div>
  `;

  return insertSlideTemplate(html);
};

registrationConfig.forEach((item) => {
  const html = drawSlideWithInput(item);
  $slides.insertAdjacentHTML("beforeend", html);
});

const $registrationInputs = $slides.querySelectorAll("input");

let currentInput = $registrationInputs[currentStep];

currentInput.addEventListener("input", () => {
  if (currentInput.value) {
    $nextSlideBtn.classList.remove("swiper-button-disabled");
  } else {
    $nextSlideBtn.classList.add("swiper-button-disabled");
  }
});

$prevSlideBtn.addEventListener("click", () => {
  if (currentStep === 0) {
    return;
  }

  $nextSlideBtn.classList.add("button--confirm");
  $nextSlideBtn.classList.remove("button--success");

  // Change the step
  currentStep = currentStep - 1;
  // Change the current input
  currentInput = $registrationInputs[currentStep];
  // Remove disable class button
  $nextSlideBtn.classList.remove("swiper-button-disabled");

  slider.slidePrev();
});

$nextSlideBtn.addEventListener("click", function (e) {
  const nextStep = currentStep + 1;
  const nextInput = $registrationInputs[nextStep];
  const lastStepIndex = $registrationInputs.length - 1;
  const lastBeforeEndStepIndex = $registrationInputs.length - 2;
  const { isValid } = validate(currentInput.name, currentInput.value);
  const $slideSpace = $slides.querySelector(`#slide-space-${currentInput.name}`);

  // Set entered data of the previous input
  enteredData = { ...enteredData, [currentInput.name]: currentInput.value };

  if (!isValid) {
    this.classList.add("swiper-button-disabled");

    const html = `
      <div id="error" class="login-block__input">
        <span class="login-block__input--error">Please enter a valid email address</span>
      </div>
    `;

    return $slideSpace.insertAdjacentHTML("beforeend", html);
  }

  if (currentStep === lastStepIndex) {
    return outputDataToConsole(enteredData);
  }

  if (currentStep === lastBeforeEndStepIndex) {
    this.classList.remove("button--confirm");
    this.classList.add("button--success");
  }

  if (!nextInput.value) {
    // Set disable class for the next button
    this.classList.add("swiper-button-disabled");
  }

  // Change the step
  currentStep = nextStep;
  // Change the current input
  currentInput = nextInput;

  // Handle currentInput changes
  currentInput.addEventListener("input", () => {
    clearError(document, "#error");

    if (currentInput.value) {
      this.classList.remove("swiper-button-disabled");
    } else {
      this.classList.add("swiper-button-disabled");
    }
  });

  slider.slideNext();
});
