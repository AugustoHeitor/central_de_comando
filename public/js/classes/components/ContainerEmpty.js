class ContainerEmpty {

    constructor(){

    }

    createContainerEmpty(selectorContainer, title, text, heightVh = true) {

        const selector = document.querySelector(selectorContainer);

        const containerEmpty = document.createElement("div");
        const img = document.createElement("img");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        const containerText = document.createElement("div");

        containerEmpty.classList.add('d-flex', 'flex-column', 'justify-center', 'items-center', 'gap-lg', 'w-full', 'pt-md');

        if(heightVh){
            containerEmpty.classList.add("h-100vh");
        }

        containerText.classList.add('d-flex', 'flex-column', 'justify-center', 'items-center', 'gap-sm');
        h3.classList.add("text-xl", "fw-sb", "color-light")
        p.classList.add("color-primary", "fw-m", "text-sm", "w-full", "w-mx-400", "text-center")
        img.classList.add("img-size-100", "search-animation");

        h3.innerText = title;
        p.innerText = text;

        img.src="../../../imgs/search-light.svg";

        containerText.append(h3, p);
        containerEmpty.append(img, containerText);

        selector.replaceChildren();
        selector.append(containerEmpty);
    }

}

export default ContainerEmpty;
