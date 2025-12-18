gsap.registerPlugin(ScrollTrigger);

// Hero Text Reveal
const heroTl = gsap.timeline();

heroTl.from('.glitch-text', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: "power4.out",
    skewY: 7,
    stagger: {
        amount: 0.3
    }
})
    .from('.subtitle', {
        duration: 1,
        opacity: 0,
        y: 20,
        ease: "power2.out"
    }, "-=1")
    .from('.intro-text', {
        duration: 1,
        opacity: 0,
        y: 20,
        ease: "power2.out"
    }, "-=0.8")
    .from('.scroll-indicator', {
        duration: 1,
        opacity: 0,
        y: 20,
        ease: "power2.out"
    }, "-=0.8");

// About Section Reveal
gsap.utils.toArray('.reveal-text').forEach(text => {
    gsap.from(text, {
        scrollTrigger: {
            trigger: text,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Horizontal Scroll for Works
// Note: This requires a specific layout structure. 
// For simplicity in this iteration, we'll use a basic horizontal scroll effect.
const worksSection = document.querySelector('#works');
const worksTrack = document.querySelector('.works-track');

if (worksSection && worksTrack) {
    let scrollTween = gsap.to(worksTrack, {
        xPercent: -100,
        x: () => window.innerWidth, // Offset to ensure last item is visible
        ease: "none",
        scrollTrigger: {
            trigger: "#works",
            pin: true,
            scrub: 1,
            end: () => "+=" + worksTrack.offsetWidth
        }
    });
}

// Magnetic Button Effect
const magneticBtns = document.querySelectorAll('.magnetic-btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            duration: 0.3,
            x: x * 0.3,
            y: y * 0.3,
            ease: "power2.out"
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            duration: 0.3,
            x: 0,
            y: 0,
            ease: "power2.out"
        });
    });
});

// Custom Cursor (Simple Follower)
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

const cursorStyle = document.createElement('style');
cursorStyle.innerHTML = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 1px solid #fff;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        mix-blend-mode: difference;
        transition: width 0.3s, height 0.3s, background-color 0.3s;
    }
    .custom-cursor.hovered {
        width: 50px;
        height: 50px;
        background-color: rgba(255, 255, 255, 0.1);
        border-color: transparent;
    }
`;
document.head.appendChild(cursorStyle);

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
    });
});

// Process Section Interaction
const steps = document.querySelectorAll('.step');
const processVisual = document.querySelector('.process-visual');

steps.forEach(step => {
    step.addEventListener('click', () => {
        // Remove active class from all
        steps.forEach(s => s.classList.remove('active'));
        // Add active class to clicked
        step.classList.add('active');

        // Update visual (Simulated)
        const stepNum = step.getAttribute('data-step');

        // Animate change
        gsap.to(processVisual, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                // Clear content
                processVisual.innerHTML = '';

                // Specific content for steps
                if (stepNum === '2') {
                    const img = document.createElement('img');
                    img.src = 'assets/sketch_latest.png';
                    img.style.maxWidth = '80%';
                    img.style.maxHeight = '80%';
                    img.style.objectFit = 'contain';
                    img.style.boxShadow = '0 0 30px rgba(0,0,0,0.5)';
                    processVisual.appendChild(img);
                } else if (stepNum === '1') {
                    const img = document.createElement('img');
                    img.src = 'assets/idea_new.png';
                    img.style.maxWidth = '80%';
                    img.style.maxHeight = '80%';
                    img.style.objectFit = 'contain';
                    img.style.boxShadow = '0 0 30px rgba(0,0,0,0.5)';
                } else if (stepNum === '3') {
                    const img = document.createElement('img');
                    img.src = 'assets/develop_sketch_new.png';
                    img.style.maxWidth = '80%';
                    img.style.maxHeight = '80%';
                    img.style.objectFit = 'contain';
                    img.style.boxShadow = '0 0 30px rgba(0,0,0,0.5)';
                } else if (stepNum === '4') {
                    const img = document.createElement('img');
                    img.src = 'assets/final_sketch.png';
                    img.style.maxWidth = '80%';
                    img.style.maxHeight = '80%';
                    img.style.objectFit = 'contain';
                    img.style.boxShadow = '0 0 30px rgba(0,0,0,0.5)';
                    processVisual.appendChild(img);
                } else {
                    processVisual.textContent = `STEP 0${stepNum}`;
                }

                gsap.to(processVisual, {
                    opacity: 1,
                    duration: 0.2
                });
            }
        });
    });
});

// Initialize first step
if (steps.length > 0) {
    steps[0].click();
}

// Work Item Click (Open Project Modal)
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const closeBtn = document.getElementsByClassName("close-modal")[0];

const workItems = document.querySelectorAll('.work-item');
workItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('h3').innerText;

        if (img) {
            modal.style.display = "block";
            modalImg.src = img.src;
            captionText.innerHTML = title;
        } else {
            // Fallback for items without images (like the 3rd one)
            alert(`Project: ${title}\n(No image preview available)`);
        }
    });
});

// Close Modal
closeBtn.onclick = function () {
    modal.style.display = "none";
}

modal.onclick = function (e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
}


const interactiveElements = document.querySelectorAll('a, button, .step, .work-item');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});
