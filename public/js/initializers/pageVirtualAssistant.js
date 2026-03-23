import VirtualAssistant from '../classes/pages/VirtualAssistant.js';

const messages = [];

document.addEventListener('DOMContentLoaded', async ()=>{

    const virtualAssistant = new VirtualAssistant('virtual-assistant', messages);
    virtualAssistant.init();

    const formChat = document.querySelector('#form-chat');

    formChat.addEventListener('submit', (e)=>{

        e.preventDefault();

        const inputMessage = document.querySelector('#input-message');

        if(inputMessage.value.length > 0){

            const buttonSubmit = e.submitter;
            const formData = virtualAssistant.utils.getFormValues(formChat);

            inputMessage.value = "";

            virtualAssistant.sendMessage(formData, buttonSubmit);
        }

    })

    const btnCloseMenuMobile = document.querySelector('.btn-close-menu-mobile');

    btnCloseMenuMobile.addEventListener("click", ()=>{
        virtualAssistant.utils.toggleVisibility(".screen-menu-mobile", "hide");
    })

    const btnOpenMenuMobile = document.querySelector('.btn-open-menu-mobile');

    btnOpenMenuMobile.addEventListener("click", ()=>{
        virtualAssistant.utils.toggleVisibility(".screen-menu-mobile", "show");
    })
})


