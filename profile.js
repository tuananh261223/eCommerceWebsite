// Get references to sign-in and sign-up forms from 'index.html' and 'cart.html'
let member = document.getElementById('member');
let newMember = document.getElementById('newMember');
let popupBox = document.getElementById('popupBox');

// Initially hide the 'member' form, assuming the user isn't signed in when they first enter the website.
member.style.display = 'none';

// Retrieve customer's login information from local storage or initialize an empty array.
let inputArray = JSON.parse(localStorage.getItem('loginInfo')) || [];

// Function to switch to the member sign-up form
let memberPopup = () => {
  newMember.style.display = 'none';
  member.style.display = 'block';
}

// Function to switch to the new member sign-up form
let newMemberPopup = () => {
  newMember.style.display = 'block';
  member.style.display = 'none';
}

// Get references to input fields for new member sign-up
let emailNewMember = document.getElementById("emailNewMember");
let passwordNewMember = document.getElementById("passwordNewMember");

// Get references to input fields for existing member login
let emailMember = document.getElementById("emailMember");
let passwordMember = document.getElementById("passwordMember");

// Function to handle the new member sign-up process
let signUp = () => {
  let value1 = emailNewMember.value;
  let value2 = passwordNewMember.value;

  if (inputArray.length === 0) {
    // If no existing accounts, create a new one, store in local storage, update UI, and refresh the page
    inputArray.push({ email: value1, password: value2 });
    localStorage.setItem("loginInfo", JSON.stringify(inputArray));
    userLoggedIn();
    removePopup();
    location.reload();
  } else if (inputArray.length > 0) {
    // Handle cases where there are existing accounts
    let email = inputArray[1, 0].email;
    let password = inputArray[2, 0].password;

    // Check if email and password match existing records
    if (value1 === email && value2 === password) {
      // Display a message indicating the email and password match existing records
      document.getElementById("change_NM").innerHTML = `
      <font color="red"> The email and password match our records, please login! </font>`;
      // Return to the default message after a delay
      setTimeout(returnDefaultRegister, 3000);
    } else if (value1 === email && value2 !== password) {
      // Display a message indicating an account with the entered email exists
      document.getElementById("change_NM").innerHTML = `
      <font color="red"> An account with the entered email exists! Please login. </font>`;
      // Return to the default message after a delay
      setTimeout(returnDefaultRegister, 3000);
    } else if (value1 !== email) {
      // Display a message indicating no account is associated with the entered email
      document.getElementById("change_NM").innerHTML = `
      <font color="red"> No account is associated with that email! (you're logged in as ${email}) </font>`;
      // Return to the default message after a delay
      setTimeout(returnDefaultRegister, 3000);
    }
  }
}

// Function to handle the existing member login process
let login = () => {
  let value5 = emailMember.value;
  let value6 = passwordMember.value;

  if (inputArray.length === 0) {
    // Display a message indicating the user must register an account before logging in
    document.getElementById('change_M').innerHTML = `<font color="red"> You must register an account before logging in! </font>`;
    // Prompt the user to register after a delay
    let promptRegister = () => {
      newMemberPopup();
      document.getElementById('change_M').innerHTML = `MEMBER LOGIN`;
    }
    setTimeout(promptRegister, 3000);
  } else if (inputArray.length !== 0) {
    let email = inputArray[1, 0].email;
    let password = inputArray[2, 0].password;

    if (value5 === email && value6 === password) {
      // Display a message indicating the user is already logged in
      let loginData = inputArray.map((x) => x.email);
      document.getElementById('change_M').innerHTML = `<font color="red"> You're already logged in as ${loginData} </font>`;
      // Return to the default message after a delay
      setTimeout(returnDefaultLogin, 3000);
    } else if (value5 === email && value6 !== password) {
      // Display a message indicating an incorrect password for an existing account
      document.getElementById("change_M").innerHTML = `<font color="red"> Incorrect password! </font>`;
      // Return to the default message after a delay
      setTimeout(returnDefaultLogin, 3000);
    } else if (value5 !== email) {
      // Display a message indicating no account is associated with the entered email
      document.getElementById('change_M').innerHTML = `<font color="red"> No account is associated with that email! </font>`;
      // Return to the default message after a delay
      setTimeout(returnDefaultLogin, 3000);
    }
  }
}

// Function to return to the default login message
let returnDefaultLogin = () => {
  document.getElementById('change_M').innerHTML = `MEMBER LOGIN`;
}

// Function to return to the default register message
let returnDefaultRegister = () => {
  document.getElementById('change_NM').innerHTML = `New Member?`;
}

// Function to hide the popup
let removePopup = () => {
  popupBox.style.display = 'none';
  popupBackgroundBox.style.display = 'none';
}
removePopup();

// Get reference to the 'Sign In' link
let memberP = document.getElementById('memberP');
// Attach an event listener to show the sign-in popup
memberP.addEventListener('click', signInPopup);

// Function to show the sign-in popup
function signInPopup() {
  member.style.display = 'block';
  popupBox.style.display = 'block';
  popupBackgroundBox.style.display = 'block';
  newMember.style.display = 'none';
}

// Get reference to the 'Sign Up' link
let newMemberP = document.getElementById("newMemberP");
// Attach an event listener to show the sign-up popup
newMemberP.addEventListener('click', signUpPopup);

// Function to show the sign-up popup
function signUpPopup() {
  member.style.display = 'none';
  newMember.style.display = 'block';
  popupBox.style.display = 'block';
  popupBackgroundBox.style.display = 'block';
}

// Function to sign out, clear login info from local storage, and refresh the page
let signOut = () => {
  localStorage.clear("loginInfo", JSON.stringify(inputArray));
  location.reload();
}

// Get reference to the dropdown options
let dropdownOptions = document.getElementById('dropdownOptions');
// Function to toggle the dropdown menu
function toggleMenu() {
  dropdownOptions.classList.toggle("open-dropdown");
}

// Get reference to the 'Sign In' button
let signInButton = document.getElementById('signInButton');
// Attach an event listener to clear login input fields when the button is clicked
signInButton.addEventListener('click', clearLoginInputField);

// Function to clear login input fields
function clearLoginInputField() {
  document.getElementById('emailMember').value = '';
  document.getElementById('passwordMember').value = '';
}

// Get reference to the 'Sign Up' button
let signUpButton = document.getElementById('signUpButton');
// Attach an event listener to clear sign-up input fields when the button is clicked
signUpButton.addEventListener('click', clearSignUpInputField);

// Function to clear sign-up input fields
function clearSignUpInputField() {
  document.getElementById('emailNewMember').value = '';
  document.getElementById('passwordNewMember').value = '';
}

// Function to display user login status
let userLoggedIn = () => {
  if (inputArray.length !== 0){
    // If logged in, display the user's email
    let loginData = inputArray.map((x) => x.email);
    document.getElementById('user').innerHTML = `Signed in as <span style="color: green"> ${loginData}</span>`;
  } else if (inputArray.length === 0){
    document.getElementById('user').style.display = 'none';
  }
}
userLoggedIn();
