import Setting from '../classes/Setting.js';

document.addEventListener('DOMContentLoaded', ()=>{
    
    const form = document.querySelector('form');

    const setting = new Setting('user', form);

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

})

