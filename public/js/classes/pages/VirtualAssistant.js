import Utils from '../Utils.js';
import Master from '../Master.js';
import ContainerEmpty  from '../components/ContainerEmpty.js';

class VirtualAssistant extends Master {

    constructor(endpoint, messages) {
        super();
        this.baseUrl = '/api/';
        this.endpoint = endpoint;
        this.url = this.baseUrl + endpoint;
        this.utils = new Utils();
        this.messages = messages;

        this.components = {
            'containerEmpty': new ContainerEmpty()
        };
    }

    async init() {

        const result = await this.getAllMessages();

        this.messages?.splice(0, this.messages.length,
            ...result
        );

        this.updateChat();
    }

    async sendMessage(formData, button){
        this.createLoad();
        button.disabled = true;

        try {
            const response = await axios.post(`${this.url}/send-message`, formData, {
                timeout: 30000
            });

            if (response.status === 200 && response.data.status === 'success') {

                const messageUser = this.formatMessage(formData.get('message'), 'user');

                this.messages.push(messageUser);

                const messageAtlas = this.formatMessage(response.data.data.message, 'atlas');

                this.messages.push(messageAtlas);

                this.updateChat();

                setTimeout(() => {
                    button.disabled = false;
                }, 2000);

            }
        } catch (error) {

            let message = 'Erro ao enviar mensagem!';

            if (error.response?.data?.message) {
                message = error.response.data.message;
            }

            console.log(error)

            toastr.error(message, { timeOut: 2000 });

            setTimeout(() => {
                button.disabled = false;
            }, 2000);

        } finally {
            this.removeLoad();
        }
    }

    async getAllMessages() {

        try {

            this.createLoad();

            const response = await axios.get(`${this.url}/index-messages`, {
                timeout: 5000
            });

            if (response.status === 200 && response.data.status === 'success') {
                return response.data.data;
            }

        } catch (error) {
            console.error(error);
        } finally {
            this.removeLoad();
        }

    }

    formatMessage(text, senderType = "atlas"){

        const formattedMessage = {
            "text": text,
            "senderType": senderType
        }

        return formattedMessage;
    }

    createMessageCard(message) {

        const container = document.createElement('div');

        container.classList.add(
            'w-full',
            'pt-md',
            'd-flex',
            'items-start',
            'gap-sm'
        );

        if (message.senderType === 'atlas') {

            container.classList.add('justify-start');

            const avatarContainer = document.createElement('div');

            avatarContainer.classList.add(
                'd-flex',
                'justify-center',
                'items-center',
                'pt-sm',
                'bg-quinary',
                'radius-sm'
            );

            const avatarImage = document.createElement('img');
            avatarImage.classList.add('img-size-22', 'h-22', 'img-contain');
            avatarImage.src = 'imgs/robot-light.svg';

            avatarContainer.appendChild(avatarImage);

            const messageBox = document.createElement('div');

            messageBox.classList.add(
                'd-flex',
                'items-start',
                'justify-start',
                'bg-secondary',
                'pt-input-primary',
                'bd-primary',
                'radius-sm',
                'text-base',
                'flex-column',
                'color-primary',
                'gap-md'
            );

            messageBox.innerHTML = this.utils.parseMarkdown(message.text);

            container.appendChild(avatarContainer);
            container.appendChild(messageBox);
        }else if (message.senderType === 'user') {
            container.classList.add('justify-end');

            const messageBox = document.createElement('div');
            messageBox.classList.add(
                'd-flex',
                'items-start',
                'justify-start',
                'bg-tertiary',
                'pt-input-primary',
                'bd-primary',
                'radius-sm'
            );

            const messageText = document.createElement('span');
            messageText.classList.add('text-base', 'color-light');
            messageText.textContent = message.text;

            messageBox.appendChild(messageText);
            container.appendChild(messageBox);
        }

        return container;
    }

    createLoad() {

        const containerChat = document.querySelector('#container-scroll-chat');

        containerChat.style.transform = 'translateZ(0)';

        const containerLoad = document.createElement('div');
        containerLoad.id = 'chat-load-overlay';
        containerLoad.classList.add(
            'fixed', 'z-index-screen',
            'w-full', 'h-full',
            'd-flex', 'flex-column',
            'justify-center', 'items-center',
            'gap-md', 'bg-secondary'
        );

        containerLoad.style.top  = '0';
        containerLoad.style.left = '0';

        const img = document.createElement('img');
        img.src = "../../../imgs/robot-light.svg";
        img.classList.add('img-size-60', 'pulse-animation');

        const text = document.createElement('span');
        text.textContent = 'Carregando...';
        text.classList.add('color-secondary', 'text-sm', 'fw-m');

        containerLoad.append(img, text);
        containerChat.appendChild(containerLoad);
    }

    removeLoad() {
        const load = document.querySelector('#chat-load-overlay');
        const containerChat = document.querySelector('#container-scroll-chat');

        if (load){

            load.remove();

            if (containerChat){
                containerChat.style.transform = '';
            }

        }

    }

    updateChat(){
        document.querySelector('#container-chat').replaceChildren();

        let orderedMessages = this.messages;

        if(Array.isArray(orderedMessages) && orderedMessages.length > 0){

            orderedMessages?.forEach((message)=>{
                const card = this.createMessageCard(message);
                document.querySelector('#container-chat').append(card);
            })

        }else{
            const title = "Atlas | Assistente Virtual";
            const text = "Tire dúvidas e gerencie sua rotina com ajuda inteligente";
            this.components.containerEmpty.createContainerEmpty("#container-chat", title, text, true, "../../../imgs/robot-light.svg");
        }

        this.utils.addScrollY('#container-chat', false);
        document.querySelector('#container-chat').scrollTop = document.querySelector('#container-chat').scrollHeight;
    }
}

export default VirtualAssistant;
