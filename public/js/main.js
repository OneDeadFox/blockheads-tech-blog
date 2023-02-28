const mainEvents = document.querySelector(`body`);
let signingUp = false;

mainEvents.addEventListener(`click`, async (e) => {
    e.stopPropagation();

    //Element Selectors
    const modalHeader = document.querySelector(`#login-or-sign-up`);
    const signUpBtn = document.querySelector(`#sign-up-btn`)
    const loginFormEl = document.querySelector(`#login-form`);
    const loginModal = document.querySelector(`#login-modal`);
    const confirmInput = document.querySelector(`#confirm-password-line`);

    //Event selectors
    const submitBtn = e.target.closest(`#submit-btn`);
    const signUpForm = e.target.closest(`.sign-up-form`);
    const loginForm = e.target.closest(`.login-form`);

    const logoutBtn = e.target.closest(`#logout-btn`);

    //State Variable(s):

    //Event Delegation----------------------------------------
    //Change between login/sign-up forms----------------------
    if(signUpForm) {
        //change button properties to set up to return to login form
        signUpBtn.textContent = `Login`;
        signUpBtn.classList.remove(`sign-up-form`);
        signUpBtn.classList.add(`login-form`);

        //display password confirmation field
        confirmInput.classList.remove(`hidden`);

        //change header for sign-up
        modalHeader.textContent = `Sign-up`;
        signingUp = true;
        console.log(signingUp);
    } else if (loginForm) {
        //change button properties to set up to return to sign-up form
        signUpBtn.textContent = `Sign-up`;
        signUpBtn.classList.remove(`login-form`);
        signUpBtn.classList.add(`sign-up-form`);

        //hide password confirmation field
        confirmInput.classList.add(`hidden`);

        //change header for login
        modalHeader.textContent = `Login`;
        signingUp = false;
        console.log(signingUp);
    }

    const invalidUsername = document.querySelector(`#invalid-username`);
    const invalidPassword = document.querySelector(`#invalid-password`);

    //submit login/signup forms-------------------------------
    if(submitBtn && !signingUp) {
        //create object using user input
        console.log(signingUp);
        const loginObj = {
            user_name: document.querySelector(`#username-input`).value,
            password: document.querySelector(`#password-input`).value
        }

        //send fetch request
        const loginDataRaw = await fetch(`/api/users/login`, {
            method:"POST",
            body:JSON.stringify(loginObj),
            headers:{
                "Content-Type":"application/json"
            }
        });
        const loginStatus = await loginDataRaw.status;
        const loginDataJSON = await loginDataRaw.json();

        console.log(loginStatus);
        if(loginStatus === 401) {
            invalidUsername.textContent = `Incorrect username or password.`;
            invalidUsername.classList.remove(`hidden`);
        } else  if(loginStatus === 200) {
            location.href="/profile"
        }
    } else if(submitBtn && signingUp) {
        
        const password = document.querySelector(`#password-input`);
        const username = document.querySelector(`#username-input`);
        const confirm = document.querySelector(`#confirmation-input`);

        let isValid = true;
        
        //Validation Logic------------------------------------
        invalidUsername.classList.add(`hidden`);
        invalidPassword.classList.add(`hidden`);

        console.log()
        
        //validate username alpha only
        if (!/^[a-zA-Z]+$/.test(username.value)){
            isValid = false;
            invalidUsername.textContent = `Username cannot contain numbers or symbols.`;
            invalidUsername.classList.remove(`hidden`);
        //validate username length
        } else if (username.value.length < 3){
            isValid = false;
            invalidUsername.textContent = `Username must be at least 3 characters long.`;
            invalidUsername.classList.remove(`hidden`);
        //validate password length
        } else if(password.value.length < 8) {
            isValid = false;
            invalidPassword.textContent = `Password must contain at least 8 characters.`;
            invalidPassword.classList.remove(`hidden`);
        //validate matching passwords
        } else if (confirm.value != password.value) {
            isValid = false;
            invalidPassword.textContent = `Passwords do not match.`;
            invalidPassword.classList.remove(`hidden`);
        }

        //Prevent fetch if credentials are invalid
        if(!isValid){
            return;
        }

        //create object using user input
        const signUpObj = {
            user_name: username.value,
            password: password.value
        }
        
        //send fetch request
        const signUpDataRaw = await fetch(`/api/users/signup`, {
            method:"POST",
            body:JSON.stringify(signUpObj),
            headers:{
                "Content-Type":"application/json"
            }
        });
        const signUpStatus = await signUpDataRaw.status;
        const signUpDataJSON = await signUpDataRaw.json();

        console.log(signUpDataJSON)

        console.log(signUpStatus);
        if(signUpStatus === 500) {
            invalidUsername.textContent = `That username is taken.`;
            invalidUsername.classList.remove(`hidden`);
        } else  if(signUpStatus === 201) {
            location.href="/profile"
        }
    }

    //Logout--------------------------------------------------
    if(logoutBtn){
        const justLoggedOut = document.querySelector(`#log-li`);

        const getLogout = await fetch(`api/users/logout`);
        location.href = `/`;    
    }
});