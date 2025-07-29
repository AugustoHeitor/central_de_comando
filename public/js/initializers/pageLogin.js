import Login from '../classes/Login.js';

document.addEventListener('DOMContentLoaded', ()=>{

    const login = new Login();

    const form = document.querySelector('form');

    if(form){

        form.addEventListener('submit', (event)=>{
            event.preventDefault();

            login.submitForm(form);
        })
    }
})

