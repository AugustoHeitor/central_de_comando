import Setting from '../classes/pages/Setting.js';

document.addEventListener('DOMContentLoaded', ()=>{

    const form = document.querySelector('form');

    const setting = new Setting('user', form);

    setting.init();

    if(form){

        form.addEventListener('submit', (event)=>{
            event.preventDefault();
            setting.openModal();
        })

    }

    const inputUpload = document.querySelector("input[name='photo']");
    const imgUpload = document.querySelector('#upload-img-profile');

    if(inputUpload && imgUpload){
        setting.setupImageUploadPreview(inputUpload, imgUpload);
    }

    const btnUpload = document.querySelector('#btn-upload-photo');

    if(btnUpload){
        if(inputUpload){
            btnUpload.addEventListener('click', ()=>{
                inputUpload.click();
            })
        }
    }

    const btnDeleteUpload = document.querySelector('#btn-delete-upload');

    if(btnDeleteUpload){
        if(inputUpload){
            btnDeleteUpload.addEventListener('click', ()=>{
                setting.deleteImageUpload(inputUpload, imgUpload);
            })
        }
    }

    const btnCloseMenuMobile = document.querySelector('.btn-close-menu-mobile');

    btnCloseMenuMobile.addEventListener("click", ()=>{
        setting.utils.toggleVisibility(".screen-menu-mobile", "hide");
    })

    const btnOpenMenuMobile = document.querySelector('.btn-open-menu-mobile');

    btnOpenMenuMobile.addEventListener("click", ()=>{
        setting.utils.toggleVisibility(".screen-menu-mobile", "show");
    })

})

