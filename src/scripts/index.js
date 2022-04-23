const input = document.querySelector(".main input[type=text]");
const submitBtn = document.querySelector(".main input[type=submit]");
const previousNumbers = document.querySelector(".previous-numbers");
const timesLeft = document.querySelector(".times span");
const alertSection = document.querySelector(".alert");

const modalOverlay = document.querySelector(".modal-overlay");
const messageOverlay = document.querySelector(".message-overlay");

// store entered value into array;
const previousNumbersArray = [];

//our random number
let randomNumber;

let inputValue;

// get clicked data id button
let currentDataId;

// Definition the game level
let easyMode = 11; //=> easyMode
let normalMode = 101; //=> normalMode
let hardMode = 501; //=> hardMode

submitBtn.addEventListener("click", calculate);
window.addEventListener("keypress", focusElement);

// Show modal and ask what level do you want to play
window.addEventListener("load", showModal);

function showModal() {
      const gameButtons = document.querySelectorAll(".btn");

      gameButtons.forEach((e) => {
            e.addEventListener("click", () => {
                  currentDataId = e.getAttribute("data-id");

                  console.log(`Level => ${currentDataId}`);
                  switch (currentDataId) {
                        case "easy":
                              randomNumber = generateNumber(easyMode);
                              console.log(`Random Number is => ${randomNumber}`);

                              closeModal();
                              showMessage("easy mode ,select between 0 to 10");
                              break;
                        case "normal":
                              randomNumber = generateNumber(normalMode);
                              console.log(`Random Number is => ${randomNumber}`);

                              closeModal();
                              showMessage("easy mode, select between 0 to 100");
                              break;
                        case "hard":
                              randomNumber = generateNumber(hardMode);
                              console.log(`Random Number is => ${randomNumber}`);

                              closeModal();
                              showMessage("easy mode, select between 0 to 500");
                              break;
                        default:
                              console.log(`Error in showModal switch function`);
                              break;
                  }
            });
      });
}
// close modal when level selected
function closeModal() {
      modalOverlay.classList.remove("open-modal");
}

function showMessage(message) {
      if (!modalOverlay.classList.contains("open-modal")) {
            messageOverlay.classList.add("show-message");

            const messageOverlayText = document.querySelector(".message-text");
            messageOverlayText.textContent = message;

            const messageOverlayBtn = messageOverlay.querySelector("button");
            messageOverlayBtn.addEventListener("click", () => {
                  messageOverlay.classList.replace("show-message", "hide-message");
            });
      }
}

function calculate() {
      // check if the input is not empty
      if (input.value.length > 0) {
            inputValue = input.value;
            clearInputValue(input);

            // Comparison the Input number with random number
            if (inputValue < randomNumber) {
                  if (inputValue <= 0) {
                        display(
                              alertSection,
                              "#ff7711",
                              "#fff",
                              "Please enter a number more than 0!",
                              100
                        );
                  } else {
                        display(alertSection, "red", "#fff", "To Low! try again", 100);
                        showTimesLeft();
                        showPreviousNumbers();
                  }
            } else if (inputValue > randomNumber) {
                  if (inputValue >= hardMode && currentDataId == "hard") {
                        display(
                              alertSection,
                              "#ff7711",
                              "#fff",
                              "Please enter a number less than 500!",
                              100
                        );
                  } else if (inputValue >= normalMode && currentDataId == "normal") {
                        display(
                              alertSection,
                              "#ff7711",
                              "#fff",
                              "Please enter a number less than 100!",
                              100
                        );
                  } else if (inputValue >= easyMode && currentDataId == "easy") {
                        display(
                              alertSection,
                              "#ff7711",
                              "#fff",
                              "Please enter a number less than 10!",
                              100
                        );
                  } else {
                        display(alertSection, "red", "#fff", "To High! try again", 100);
                        showTimesLeft();
                        showPreviousNumbers();
                  }
            } else {
                  display(alertSection, "green", "#fff", "Correct", 100);
                  showTimesLeft();
                  showPreviousNumbers();

                  input.disabled = true;
                  submitBtn.disabled = true;
                  submitBtn.style.backgroundColor = "transparent";
            }
      } else {
            display(alertSection, "red", "#fff", "Fill the input", 100);
      }
}

let counter = 10;

// store previous value into array && show them into span
function showPreviousNumbers() {
      previousNumbersArray.push(inputValue);
      console.log(`Entered Value is => ${inputValue}`);

      console.log(`Duplicate value entered ? => ${checkIfDuplicateExists(previousNumbersArray)}`);

      // If the answer already exists then remove it from array
      if (checkIfDuplicateExists(previousNumbersArray)) {
            previousNumbersArray.pop();

            // console.log("The last index and one left to the last are the same");
            display(alertSection, "#000", "#fff", "Duplicate number", 100);

            timesLeft.textContent = counter;
      } else {
            const spanElement = document.createElement("span");
            if (counter > 1) {
                  spanElement.textContent =
                        previousNumbersArray[previousNumbersArray.length - 1] + ",";
            } else {
                  spanElement.textContent = previousNumbersArray[previousNumbersArray.length - 1];
            }

            previousNumbers.appendChild(spanElement);

            counter--;
            timesLeft.textContent = counter;
            showTimesLeft();
      }

      console.log(previousNumbersArray);
}

// Check if Duplicate value exists in array
function checkIfDuplicateExists(arr) {
      return new Set(arr).size !== arr.length;
}

function showTimesLeft() {
      if (counter === 0 && !randomNumber == previousNumbersArray[previousNumbersArray.length - 1]) {
            input.disabled = true;
            submitBtn.disabled = true;

            display(alertSection, "black", "#fff", "Game over", 100);
            submitBtn.style.backgroundColor = "transparent";
      }
}

// display the alert
function display(element, bgColor, textColor, text, setIntervalTime) {
      element.style.backgroundColor = bgColor;
      element.style.color = textColor;

      element.textContent = text;

      setInterval(() => {
            element.style.opacity = "1";
      }, setIntervalTime);
}

// only fill the input with numbers && we dont want string
function onlyEnterNumbers() {
      let keyCode = window.event.keyCode;

      return keyCode > 31 && (keyCode < 48 || keyCode > 57) ? false : true;
}

// when numbers key pressed focus on text input
function focusElement() {
      let keyCode = window.event.keyCode;

      if (!input.disabled == true && !submitBtn.disabled == true) {
            // numbers keyCodes
            keyCode >= 48 && keyCode <= 57 ? input.focus() : "";

            /*
            if Enter key pressed And Counter 
            is more than 0 process the calculate function
            */
            if (counter > 0) {
                  // enter keyCode = 13
                  keyCode == 13 ? calculate() : "";
            }
      }
}

// generate random number between 1 & 100
function generateNumber(number) {
      return Math.floor(Math.random() * number);
}

// clear input value after submit button clicked
function clearInputValue(tag) {
      tag.value = "";
}

(function () {
      setTimeout(() => {
            modalOverlay.style.backgroundColor = " rgba(73, 166, 233, 0.5)";
      }, 600);
})();
