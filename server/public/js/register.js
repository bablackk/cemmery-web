var regularExpression =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

function getValue(name) {
  return document.getElementById(name).value.trim();
}

function showError(key, mess) {
  document.getElementById(key + "_error").innerHTML = mess;
}
function validate() {
  let test = true;

  let ho = getValue("i-input_in-ho");
  if (ho == "" || ho.length > 10) {
    test = false;
    showError("i-input_in-ho", "Họ không hợp lệ!");
  }

  let ten = getValue("i-input_in-ten");

  if (ten == "" || ten.length > 15) {
    test = false;
    showError("i-input_in-ten", "Tên không hợp lệ");
  }

  let email = getValue("i-input_in-email");
  if (email == "" || email < 18) {
    test = false;
    showError("i-input_in-email", "Vui lòng kiểm tra  lại email");
  }

  let password = getValue("i-input_in-password");
  if (password == "" || password < 9) {
    test = false;
    showError("i-input_in-password", "Vui lòng kiểm tra  password");
  }

  return test;
}

var myInput = document.getElementById("i-input_in-password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// When the user clicks on the password field, show the message box
myInput.onfocus = function () {
  document.getElementById("message").style.display = "block";
};

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function () {
  document.getElementById("message").style.display = "none";
};

// When the user starts to type something inside the password field
myInput.onkeyup = function () {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if (myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }

  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if (myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if (myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate length
  if (myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
};

const register = async (firstname, lastname, email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3333/api/auth/register",
      data: {
        firstname,
        lastname,
        email,
        password,
      },
    });
    if (res.statusText === "OK") {
      window.location.href = "http://localhost:3333/login";
    } else {
      window.location.href = "http://localhost:3333/register";
    }
    console.log(res);
  } catch (e) {
    console.log(e.response.data);
  }
};

document.querySelector(".form-register").addEventListener("submit", (e) => {
  e.preventDefault();
  const firstname = document.getElementById("i-input_in-ho").value;
  const lastname = document.getElementById("i-input_in-ten").value;
  const email = document.getElementById("i-input_in-email").value;
  const password = document.getElementById("i-input_in-password").value;
  register(firstname, lastname, email, password);
});
