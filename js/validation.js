/* ==========================================================================
   MediKart - Online Pharmacy
   File    : js/validation.js
   Purpose : JavaScript form validation for the Login, Register and Contact forms
   Used in : account.html (login + register), contact.html (contact form)

   Validation logics used:
     1. All fields are required
     2. Password length (minimum 8 characters)
     3. Email pattern
     4. Password pattern (upper case, lower case, number, special character)
     5. Phone number pattern (10 digits, starting with 6, 7, 8 or 9)
     + Confirm password must match, pincode must be 6 digits

   Each form calls its function with onsubmit="return validate...()".
   The function returns false (stop the form) when there is an error and
   shows the message inside the form using innerHTML.
   ========================================================================== */


/* ---------- Regular expressions (patterns) ---------- */
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phonePattern = /^[6-9][0-9]{9}$/;                  // Indian mobile number
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;
const pincodePattern = /^[0-9]{6}$/;
const minPasswordLength = 8;


/* ---------- Helper functions ---------- */

// Read the trimmed value of an input by its id
function getValue(id) {
    return document.getElementById(id).value.trim();
}

// Show an error message box inside the form and mark the wrong field in red
function showError(boxId, message, fieldId) {
    document.getElementById(boxId).innerHTML =
        '<div class="form-message error">&#9888; ' + message + '</div>';
    if (fieldId) {
        document.getElementById(fieldId).classList.add("is-invalid");
        document.getElementById(fieldId).focus();
    }
    return false;                         // stop the form from submitting
}

// Show a green success message
function showSuccess(boxId, message) {
    document.getElementById(boxId).innerHTML =
        '<div class="form-message success">&#10003; ' + message + '</div>';
}

// Remove old red borders before checking the form again
function clearErrors(fieldIds) {
    for (let i = 0; i < fieldIds.length; i++) {
        document.getElementById(fieldIds[i]).classList.remove("is-invalid");
    }
}

// Logic 1: check that every field in the list has a value
function allFieldsFilled(fieldIds) {
    let emptyFields = [];
    for (let i = 0; i < fieldIds.length; i++) {
        if (getValue(fieldIds[i]) === "") {
            emptyFields.push(fieldIds[i]);
            document.getElementById(fieldIds[i]).classList.add("is-invalid");
        }
    }
    return emptyFields.length === 0;
}


/* ==========================================================================
   1. LOGIN FORM  (account.html)
   ========================================================================== */
function validateLogin() {
    const fields = ["loginEmail", "loginPassword"];
    clearErrors(fields);

    // Logic 1: all fields are required
    if (!allFieldsFilled(fields)) {
        return showError("loginMessage", "All fields are required.");
    }
    // Logic 3: email pattern
    if (!emailPattern.test(getValue("loginEmail"))) {
        return showError("loginMessage", "Please enter a valid email address (example: name@gmail.com).", "loginEmail");
    }
    // Logic 2: password length
    if (getValue("loginPassword").length < minPasswordLength) {
        return showError("loginMessage", "Password must be at least " + minPasswordLength + " characters long.", "loginPassword");
    }

    showSuccess("loginMessage", "Login details are valid. (Login will work after the backend phase.)");
    return false;                         // no backend yet, so stay on the page
}


/* ==========================================================================
   2. REGISTRATION FORM  (account.html)
   ========================================================================== */
function validateRegister() {
    const fields = ["firstName", "lastName", "regEmail", "phone", "regPassword",
                    "confirmPassword", "address", "city", "regPincode"];
    clearErrors(fields);

    // Logic 1: all fields are required
    if (!allFieldsFilled(fields)) {
        return showError("registerMessage", "All fields are required. Please fill the fields marked in red.");
    }
    // Logic 3: email pattern
    if (!emailPattern.test(getValue("regEmail"))) {
        return showError("registerMessage", "Email pattern is wrong. Use a format like name@gmail.com.", "regEmail");
    }
    // Logic 5: phone number pattern
    if (!phonePattern.test(getValue("phone"))) {
        return showError("registerMessage", "Mobile number must be 10 digits and start with 6, 7, 8 or 9.", "phone");
    }
    // Logic 2: password length
    if (getValue("regPassword").length < minPasswordLength) {
        return showError("registerMessage", "Password must be at least " + minPasswordLength + " characters long.", "regPassword");
    }
    // Logic 4: password pattern
    if (!passwordPattern.test(getValue("regPassword"))) {
        return showError("registerMessage", "Password must contain at least one upper case letter, one lower case letter, one number and one special character (e.g. Medi@2026).", "regPassword");
    }
    // Extra: confirm password must match
    if (getValue("regPassword") !== getValue("confirmPassword")) {
        return showError("registerMessage", "Password and Confirm Password do not match.", "confirmPassword");
    }
    // Extra: pincode must be 6 digits
    if (!pincodePattern.test(getValue("regPincode"))) {
        return showError("registerMessage", "Pincode must be exactly 6 digits.", "regPincode");
    }
    // Extra: terms checkbox
    if (!document.getElementById("terms").checked) {
        return showError("registerMessage", "Please accept the Terms &amp; Privacy Policy.", "terms");
    }

    showSuccess("registerMessage", "Account details are valid! (Account will be saved after the backend phase.)");
    return false;                         // no backend yet, so stay on the page
}


/* ==========================================================================
   3. CONTACT FORM  (contact.html)
   ========================================================================== */
function validateContact() {
    const fields = ["cName", "cEmail", "cSubject", "cMessage"];
    clearErrors(fields.concat(["cPhone"]));

    // Logic 1: all required fields
    if (!allFieldsFilled(fields)) {
        return showError("contactMessage", "All fields marked * are required.");
    }
    // Logic 3: email pattern
    if (!emailPattern.test(getValue("cEmail"))) {
        return showError("contactMessage", "Please enter a valid email address.", "cEmail");
    }
    // Logic 5: phone pattern (mobile is optional, so check only if typed)
    if (getValue("cPhone") !== "" && !phonePattern.test(getValue("cPhone"))) {
        return showError("contactMessage", "Mobile number must be 10 digits and start with 6, 7, 8 or 9.", "cPhone");
    }
    // Message length
    if (getValue("cMessage").length < 10) {
        return showError("contactMessage", "Message must be at least 10 characters.", "cMessage");
    }

    showSuccess("contactMessage", "Thank you! Your message is ready to send. (Sending will work after the backend phase.)");
    return false;
}
