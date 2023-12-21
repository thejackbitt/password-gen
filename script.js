// Assignment Code
var generateBtn = document.querySelector("#generate");
var generationSuccess = false;
var lowerCaseArray = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
var upperCaseArray = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
var numericalArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var specialArray = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];
var pool = [];

// Declares randomizer function
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// Write password to the #password input
function writePassword() {
  pool = [];
  var password;
  var characterArray = [];
  var passwordText = document.querySelector("#password");
  var count = prompt(
    "How many characters would you like your password to contain? (8-128)"
  );
  count = parseInt(count, 10);
  if (count > 128) {
    alert("That number is too high.  Please try again.");
    writePassword();
    return;
  }
  if (count < 8) {
    alert("That number is too low.  Please try again.");
    writePassword();
    return;
  }
  if (Number.isInteger(count) === false) {
    alert("That is not a number.  Please try again.");
    writePassword();
    return;
  }
  var lowerCase = confirm(
    "Would you like lowercase characters in your password?"
  );
  var upperCase = confirm(
    "Would you like uppercase characters in your password?"
  );
  var numeric = confirm("Would you like numeric characters in your password?");
  var special = confirm("Would you like special characters in your password?");
  // Checks for lower case charset
  if (lowerCase) {
    pool.push("isLowerCase");
    console.log(pool[pool.length - 1] + " has been added to the pool.");
  }
  // Checks for upper case charset
  if (upperCase) {
    pool.push("isUpperCase");
    console.log(pool[pool.length - 1] + " has been added to the pool.");
  }
  // Checks for numeric charset
  if (numeric) {
    pool.push("isNumeric");
    console.log(pool[pool.length - 1] + " has been added to the pool.");
  }
  // Checks for special charset
  if (special) {
    pool.push("isSpecial");
    console.log(pool[pool.length - 1] + " has been added to the pool.");
  }
  // Verifies that at least one charset has been selected.
  if (pool.length === 0) {
    alert("You need to select at least one option.");
    return;
  }
  // Begin the generation process!
  function generatePassword() {
    console.log("Generating password...");
    for (var i = 0; i < count + 1; i++) {
      console.log("Generating character #" + i + "...");
      var currentCharset = pool[random(0, pool.length)];
      function generateCharacter(i) {
        var currentChar;
        do {
          if (currentCharset === "isLowerCase") {
            currentChar = lowerCaseArray[random(0, lowerCaseArray.length - 1)];
          } else if (currentCharset === "isUpperCase") {
            currentChar = upperCaseArray[random(0, upperCaseArray.length - 1)];
          } else if (currentCharset === "isNumeric") {
            currentChar = numericalArray[random(0, numericalArray.length - 1)];
          } else if (currentCharset === "isSpecial") {
            currentChar = specialArray[random(0, specialArray.length - 1)];
          }
        // Verifies the current character and the previous character are not the same
        } while (i > 0 && currentChar === characterArray[i-1]);

        return currentChar;
      };
      // Adds a character to the array
      characterArray.push(generateCharacter());
    }
    // Concatenates the array into a string
    generationSuccess = true;
    return characterArray.join("");
  }
  password = generatePassword();
  // Checks if the password has been generated successfully
  if (generationSuccess) {
    alert("Your password has been generated successfully!");
    passwordText.value = password;
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
