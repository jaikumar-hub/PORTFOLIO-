
// =====================================
// EDITNEX_17 INTERACTIVE PORTFOLIO
// =====================================

// 1. PRELOADER

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");
    }, 900);

});


// 2. MOBILE MENU

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
    });

});


// 3. PROJECT FILTER

const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.filter;

        projectCards.forEach(card => {

            const match =
                category === "all" ||
                card.dataset.category === category;

            card.classList.toggle("hidden", !match);

        });

    });

});


// 4. SCROLL REVEAL

const revealElements = document.querySelectorAll(
    ".section-tag, .section h2, .about-text, .skill-list, " +
    ".project-card, .service-card, .contact > p"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    observer.observe(element);
});


// 5. 3D PORTRAIT MOUSE EFFECT

const portrait = document.querySelector(".portrait-card");
const heroVisual = document.querySelector(".hero-visual");

if (portrait && heroVisual) {

    heroVisual.addEventListener("mousemove", event => {

        const rect = heroVisual.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 20;
        const rotateX = (0.5 - y) * 20;

        portrait.style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });

    heroVisual.addEventListener("mouseleave", () => {
        portrait.style.transform =
            "rotateX(0deg) rotateY(-8deg)";
    });

}


// 6. THREE.JS PARTICLE BACKGROUND

if (typeof THREE !== "undefined") {

    const canvas = document.getElementById("particles");

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera.position.z = 5;

    let renderer;

    try {

        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });

    } catch (error) {

        console.warn("3D background unavailable:", error);

    }

    if (renderer) {

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 2)
        );

        const particleCount = 180;

        const positions = new Float32Array(
            particleCount * 3
        );

        for (let i = 0; i < particleCount; i++) {

            positions[i * 3] = (Math.random() - 0.5) * 13;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

        }

        const geometry = new THREE.BufferGeometry();

        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );

        const material = new THREE.PointsMaterial({
            color: 0xff1838,
            size: 0.035,
            transparent: true,
            opacity: 0.85
        });

        const particles = new THREE.Points(
            geometry,
            material
        );

        scene.add(particles);

        let mouseX = 0;
        let mouseY = 0;

        window.addEventListener("mousemove", event => {

            mouseX =
                (event.clientX / window.innerWidth - 0.5) * 0.3;

            mouseY =
                (event.clientY / window.innerHeight - 0.5) * 0.3;

        });

        function animate() {

            requestAnimationFrame(animate);

            particles.rotation.y += 0.0007;
            particles.rotation.x += 0.0003;

            particles.rotation.y +=
                (mouseX - particles.rotation.y) * 0.002;

            particles.rotation.x +=
                (mouseY - particles.rotation.x) * 0.002;

            renderer.render(scene, camera);

        }

        animate();

        window.addEventListener("resize", () => {

            camera.aspect =
                window.innerWidth / window.innerHeight;

            camera.updateProjectionMatrix();

            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );

            renderer.setPixelRatio(
                Math.min(window.devicePixelRatio, 2)
            );

        });

    }

}


// 7. GSAP HERO ANIMATION

if (typeof gsap !== "undefined") {

    gsap.from(".hero-content > *", {
        opacity: 0,
        y: 35,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.8
    });

    gsap.from(".hero-visual", {
        opacity: 0,
        x: 50,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.7
    });

}

console.log("EDITNEX_17 Portfolio Loaded Successfully!");

// 8. VIDEO DEBUG FIX

document.querySelectorAll(".project-card video").forEach((video, index) => {

    video.addEventListener("loadedmetadata", () => {
        console.log(
            `Video ${index + 1} loaded successfully`,
            video.duration
        );
    });

    video.addEventListener("error", () => {
        console.error(
            `Video ${index + 1} failed to load`,
            video.error
        );
    });

    video.load();

});
