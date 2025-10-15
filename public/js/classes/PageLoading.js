class PageLoading {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.cube = new THREE.Scene();
        this.progress = 0;
        this.interval = "";
    }

    createPageLoading(){

        const container = document.createElement("div");
        container.classList.add("loading-container", "flex-column", "w-full", "h-full", "fixed", "top-0", "left-0",
        "d-flex", "items-center", "justify-center",  "z-index-page-loading");

        container.id = "loading-container";

        const canvas = document.createElement("div");
        canvas.id = "canvas";
        container.append(canvas);

        const text = document.createElement("div");
        text.classList.add("loading-text");
        text.textContent = "Sincronizando dados";
        container.append(text);

        const progressBarWrapper = document.createElement("div");
        progressBarWrapper.classList.add("progress-bar");

        const progressBar = document.createElement("div");
        progressBar.classList.add("progress", "h-full");
        progressBar.id = "progressBar";

        progressBarWrapper.append(progressBar);
        container.append(progressBarWrapper);

        const dotFlashing = document.createElement("div");
        dotFlashing.classList.add("dot-flashing");
        container.append(dotFlashing);

        document.querySelector("body").append(container);

        return canvas;

    }

    init() {

        const container = this.createPageLoading();

        this.scene.background = new THREE.Color("#1a1a1a");

        this.camera.position.z = 5;

        const material = new THREE.MeshPhongMaterial({
            color: 0x364dcd,
            emissive: 0x4c1d95,
            emissiveIntensity: 0.5,
            specular: 0x8b5cf6,
            wireframe: true,
            wireframeLinewidth: 2,
            transparent: true,
            opacity: 0.9
        });

        const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x8b5cf6, 1);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0x7c3aed, 1, 100);
        pointLight.position.set(-1, -1, 2);
        this.scene.add(pointLight);

        this.renderer.setSize(200, 200);
        container.append(this.renderer.domElement);

        this.animate();
        this.simulateProgress();
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        const scale = 1 + Math.sin(Date.now() * 0.001) * 0.1;
        this.cube.scale.set(scale, scale, scale);

        this.renderer.render(this.scene, this.camera);
    }

    simulateProgress() {
        const progressBar = document.getElementById('progressBar');
        const loadingText = document.querySelector('.loading-text');
        const texts = [
            "Carregando recursos",
            "Solicitando permissões",
            "Organizando interface",
            "Aplicando configurações"
        ];

        let currentText = 0;

        this.interval = setInterval(() => {
            this.progress += Math.random() * 10;
            if (this.progress > 100) this.progress = 100;

            progressBar.style.width = `${this.progress}%`;

            if (this.progress >= (currentText + 1) * 20 && currentText < texts.length - 1) {
                currentText++;
                loadingText.textContent = texts[currentText];
            }
        }, 300);
    }

    removePageLoading(){
        clearInterval(this.interval);
        setTimeout(() => {
            document.querySelector('#loading-container').style.opacity = '0';
            setTimeout(() => {
                document.querySelector('#loading-container').style.display = 'none';
                document.querySelector('#loading-container').remove();
            }, 500);
        }, 800);
    }

}

export default PageLoading;
