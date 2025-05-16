document.addEventListener('DOMContentLoaded', ()=>{

    const form = document.querySelector('form');

    if(form){

        form.addEventListener('submit', (event)=>{
            event.preventDefault();

            const emailInput = form.querySelector('input[name="email"]');
            const passwordInput = form.querySelector('input[name="password"]');
            const buttonSubmit = form.querySelector('button[type="submit"]');

            const emailValue = emailInput.value;
            const passwordValue = passwordInput.value;

            login(emailValue, passwordValue, buttonSubmit);
        })
    }
})

async function login(email, password, button) {

    const csrfToken = document.querySelector('input[name="_token"]').value;
    button.disabled = true;

    try {
        const response = await axios.post('/login', {
            _token: csrfToken,
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 5000
        });

        if (response.status === 200 && response.data.status === 'success') {

            toastr.success(response.data.message, 'Login', { timeOut: 2000 });

            setTimeout(() => {
                window.location.href = response.data.data.redirect_url;
            }, 2000);

        }
    } catch (error) {

        let message = 'Erro ao fazer login';

        if (error.response?.data?.message) {
            message = error.response.data.message;
        }
        
        toastr.error(message, 'Login', { timeOut: 2000 });

         setTimeout(() => {
            button.disabled = false;
        }, 2000);

    }
}