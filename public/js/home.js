// const myModal = document.getElementById('myModal')
// const myInput = document.getElementById('myInput')
// myModal.addEventListener('shown.bs.modal', () => {
//     myInput.focus()
// })
const bodyEvents = document.querySelector(`body`)

bodyEvents.addEventListener(`click`, (e) => {
    e.preventDefault();
    e.stopPropagation();
    const modalHeader = document.querySelector(`#login-or-sign-up`);
    const signUpBtn = document.querySelector(`#sign-up-btn`)
    const signUpForm = e.target.closest(`.sign-up-form`);
    const loginForm = e.target.closest(`.login-form`);
    const loginFormEl = document.querySelector(`#login-form`);
    const loginModal = document.querySelector(`#login-modal`);
    const userNameInput = document.querySelector(`#username-input`);
    const passwordInput = document.querySelector(`#password-input`);
    const confirmInput = document.querySelector(`#confirm-password-line`);


    if(signUpForm) {
        //change button properties to set up to return to login form
        signUpBtn.textContent = `Login`;
        signUpBtn.classList.remove(`sign-up-form`);
        signUpBtn.classList.add(`login-form`);

        //display password confirmation field
        confirmInput.classList.remove(`hidden`);

        //change header for sign-up
        modalHeader.textContent = `Sign-up`;
    } else if (loginForm) {
        //change button properties to set up to return to sign-up form
        signUpBtn.textContent = `Sign-up`;
        signUpBtn.classList.remove(`login-form`);
        signUpBtn.classList.add(`sign-up-form`);

        //hide password confirmation field
        confirmInput.classList.add(`hidden`);

        //change header for login
        modalHeader.textContent = `Login`;
    }
});