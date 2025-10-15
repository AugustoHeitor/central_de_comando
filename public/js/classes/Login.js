import Utils from './Utils.js';
import PageLoading from './PageLoading.js';

class Login {

    constructor() {
        this.utils = new Utils(); 
        this.pageLoading = new PageLoading();
    }

    
    submitForm(form){

        const buttonSubmit = form.querySelector('button[type="submit"]');

        const formData = this.utils.getFormValues(form);

        this.login(formData, buttonSubmit);
    }

    async login(formData, button){

        button.disabled = true;

        try {
            const response = await axios.post('/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 5000
            });

            if (response.status === 200 && response.data.status === 'success') {

                document.querySelector("body > div:nth-child(1)").remove();

                this.pageLoading.init();
                
                setTimeout(()=>{
                    this.pageLoading.removePageLoading();
                    setTimeout(()=>{
                        window.location.href = response.data.data.redirect_url;
                    }, 1200)
                }, 2000)

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
}

export default Login;