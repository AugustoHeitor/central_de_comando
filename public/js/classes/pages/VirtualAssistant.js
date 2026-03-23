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

        }
    }

    async getAllMessages(){
        try {

            const response = await axios.get(`${this.url}/index-messages`, {
                timeout: 5000
            });

            if (response.status === 200 && response.data.status === 'success') {

                return response.data.data;

            }

        } catch (error) {
            console.error(error);
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
                'radius-sm'
            );

            const messageText = document.createElement('span');
            messageText.classList.add('text-base', 'color-primary');
            messageText.textContent = message.text;
            messageText.style.whiteSpace = 'pre-wrap';

            messageBox.appendChild(messageText);

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
