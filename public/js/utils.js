
export function addScrollY(selector) {
    
    const container = document.querySelector(selector);

    if (!container) return;

    if (container.scrollHeight > container.clientHeight) {
        container.classList.add('scroll-auto');
    } else {
        container.classList.remove('scroll-auto');
    }
}

export function openDropdown(selector){
    
    const selectedDropdown = document.querySelector(selector);
    const dropdowns = document.querySelectorAll('.dropdown');
    const dropdownArray = Array.from(dropdowns); 

    if(dropdownArray.length > 0){
        dropdownArray.forEach((dropdown) => {
            const id = "#" + dropdown.id;
            if(id !== selector){
                if(dropdown.classList.contains('d-flex')){
                    dropdown.classList.remove('d-flex');
                    dropdown.classList.add('none');
                }
            }
        })
    }
    
    if(selectedDropdown){
        if(selectedDropdown.classList.contains('d-flex')){
            selectedDropdown.classList.remove('d-flex');
            selectedDropdown.classList.add('none');
        }else{
            selectedDropdown.classList.remove('none');
            selectedDropdown.classList.add('d-flex');
        }
    }
}