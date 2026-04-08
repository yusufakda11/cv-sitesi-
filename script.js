document.addEventListener("DOMContentLoaded", () => {
    // 1. Custom Cursor
    const cursor = document.getElementById("cursor");
    
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });

    const attachCursorHover = () => {
        const interactiveElements = document.querySelectorAll("a, button, .project-card, .social-icon");
        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", () => {
                cursor.style.transform = "translate(-50%, -50%) scale(2.5)";
                cursor.style.opacity = "0.7";
            });
            el.addEventListener("mouseleave", () => {
                cursor.style.transform = "translate(-50%, -50%) scale(1)";
                cursor.style.opacity = "1";
            });
        });
    };
    attachCursorHover();

    // 2. Theme Toggler
    const themeToggleBtn = document.getElementById("themeToggle");
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        generateCodeStream(); 
    });

    // 3. Typewriter Effect
    const typewriterElement = document.getElementById("typewriter");
    const textToType = "Yusuf. Bir Bilgisayar Programcılığı 2. sınıf öğrencisiyim...";
    let textIndex = 0;
    setTimeout(() => {
        const typeChar = () => {
            if (textIndex < textToType.length) {
                typewriterElement.textContent += textToType.charAt(textIndex);
                textIndex++;
                setTimeout(typeChar, 70);
            }
        };
        typeChar();
    }, 1000);

    // 4. Projects Generation via Map
    const projectsData = [
        { title: "Akıllı Hayvan Takip Sistemi", category: "Web", detail: "Akıllı hayvan teşhis ve takip platformu", icon: "fa-solid fa-paw", type: "web" },
        { title: "Akıllı Hayvan Takip Sistemi", category: "Mobil", detail: "Akıllı hayvan takip sistemi mobil uygulaması", icon: "fa-solid fa-mobile-screen", type: "mobile" }
    ];

    const projectContainer = document.getElementById("projectContainer");

    const renderProjects = (filterType = "all") => {
        const filtered = projectsData.filter(p => filterType === "all" || p.type === filterType);
        projectContainer.innerHTML = filtered.map((proj, i) => `
            <div class="project-card" style="animation-delay: ${i * 0.1}s">
                <div class="proj-icon-wrapper"><i class="${proj.icon}"></i></div>
                <h3 class="project-title">${proj.title}</h3>
                <p class="project-cat">${proj.category}</p>
                <p class="project-detail">${proj.detail}</p>
            </div>
        `).join("");
        attachCursorHover();

        // Attach modal click events to cards
        document.querySelectorAll(".project-card").forEach(card => {
            card.addEventListener("click", () => {
                const title = card.querySelector(".project-title").innerText;
                if(title.includes("Akıllı Hayvan Takip Sistemi")) {
                    const modal = document.getElementById("imageModal");
                    if (modal) {
                        document.getElementById("modalImage").src = "hayvan-takip.jpg"; 
                        modal.style.display = "block";
                    }
                }
            });
        });
    };

    renderProjects("all");

    // Modal Close Logic
    const modal = document.getElementById("imageModal");
    const span = document.querySelector(".close-modal");
    if(span) {
        span.onclick = () => modal.style.display = "none";
    }
    if(modal) {
        modal.addEventListener("click", (e) => {
            if(e.target === modal) modal.style.display = "none";
        });
    }

    // Filter Logic
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            renderProjects(e.target.dataset.filter);
        });
    });

    // Code Stream Background
    const generateCodeStream = () => {
        const container = document.getElementById("codeStream");
        container.innerHTML = "";
        const chars = ["0", "1", "const", "=>", "{}", "function()", "map()", "let", "null"];
        const isDark = document.body.classList.contains("dark-mode");
        const color = isDark ? "var(--neon-react)" : "var(--text-secondary)";

        for(let i=0; i<40; i++) {
            const span = document.createElement("span");
            span.innerText = chars[Math.floor(Math.random() * chars.length)];
            span.style.left = Math.random() * 100 + "vw";
            span.style.top = (Math.random() * -100) + "vh";
            span.style.animationDuration = (Math.random() * 10 + 5) + "s";
            span.style.animationDelay = (Math.random() * 5) + "s";
            span.style.color = color;
            span.style.opacity = Math.random() * 0.3 + 0.1;
            span.style.fontSize = (Math.random() * 10 + 10) + "px";
            container.appendChild(span);
        }
    };
    generateCodeStream();
});
