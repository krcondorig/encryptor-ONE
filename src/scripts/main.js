const body = document.querySelector('body');
const btn_switch = document.querySelector('.btn-switch');
const btn_switch_icon = document.querySelector('.btn-switch__icon');
const textFound = document.querySelector(".text-found");
const notFound = document.querySelector(".not-found");
const inputUser = document.getElementById('user-text');
const outputUser = document.getElementById('inputCopy');

const darkmode = localStorage.getItem('darkmode');


const encrypt_keys = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat',
};

const decrypt_keys = {
    'ai': 'a',
    'enter': 'e',
    'imes': 'i',
    'ober': 'o',
    'ufat': 'u',
};

const encrypt_regex = /[a|e|i|o|u]/g;
const decrypt_regex = /ai|enter|imes|ober|ufat/g;


//Save the dark mode in the local storage object
//This function saves the value true if dark mode is activated and false if it is not activated
function store(value) {
    localStorage.setItem('darkmode', value);
    console.log(value);
}


//This function tells us if the dark mode property already exists and loads the page with the changes we had left
function load() {

    if (darkmode == 'true') { //If darkmode is true
        body.classList.add('darkmode');
        btn_switch_icon.classList.add('fa-moon');
    } else { //If dark mode is not true
        btn_switch_icon.classList.add('fa-sun');
    }
}


load();

btn_switch.addEventListener('click', () => {

    const isDarkmode = body.classList.toggle('darkmode');
    btn_switch_icon.classList.add('animated');
    //Save true or false
    store(isDarkmode);
    btn_switch_icon.classList.toggle('fa-sun', !isDarkmode);
    btn_switch_icon.classList.toggle('fa-moon', isDarkmode);
    setTimeout(() => {
        btn_switch_icon.classList.remove('animated');
    }, 500);

})

function showSuccessMessage(message) {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500
    });
}

function showErrorMessage(err) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err,
    });
}

function validar() {
    //regular expression to make a text string contain only lowercase letters and spaces
    const regex = /[^a-zñ\s]/g;
    //If test is false, the string is valid, since it does not contain invalid characters.
    return !regex.test(inputUser.value);
}


function encriptar() {

    if (inputUser.value.trim() === "") {
        showErrorMessage('El campo de texto esta vacío!');
        inputUser.value = "";
        textFound.classList.add("display-none");
        notFound.classList.remove("display-none");
    }
    else if (validar()) {

        // Use the replace method with a callback function
        outputUser.value = inputUser.value.replace(encrypt_regex, match => encrypt_keys[match]);
        inputUser.value = "";
        textFound.classList.remove("display-none");
        notFound.classList.add("display-none");

    } else {
        showErrorMessage('Solo puedes ingresar letras en minúsculas y sin acento!');
        textFound.classList.add("display-none");
        notFound.classList.remove("display-none");
    }
}

function desencriptar() {

    if (inputUser.value.trim() === "") {

        showErrorMessage('El campo de texto esta vacio!')
        inputUser.value = "";
        textFound.classList.add("display-none");
        notFound.classList.remove("display-none");

    } else if (validar()) {

        // Use the replace method with a callback function
        outputUser.value = inputUser.value.replace(decrypt_regex, match => decrypt_keys[match]);

        inputUser.value = "";

        textFound.classList.remove("display-none");
        notFound.classList.add("display-none");
    } else {
        showErrorMessage('Solo puedes ingresar letras en minúsculas y sin acento!');
        textFound.classList.add("display-none");
        notFound.classList.remove("display-none");
    }
}

function copy() {

    navigator.clipboard.writeText(outputUser.value);
    showSuccessMessage('El texto fue copiado correctamente');
}

