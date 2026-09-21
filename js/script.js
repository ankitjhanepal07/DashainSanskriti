/* =====================================================
   DASHAIN JANAKPUR
   PROFESSIONAL JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =========================
       SELECTORS
    ========================= */

    const $ = (selector) =>
        document.querySelector(selector);

    const $$ = (selector) =>
        document.querySelectorAll(selector);


    /* =========================
       MOBILE MENU
    ========================= */

    const menuToggle =
        $("#menuToggle");

    const nav =
        $(".nav");


    if (menuToggle && nav) {

        menuToggle.addEventListener(
            "click",
            () => {

                nav.classList.toggle("open");

                menuToggle.textContent =
                    nav.classList.contains("open")
                        ? "✕"
                        : "☰";
            }
        );


        $$(".nav a").forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    nav.classList.remove(
                        "open"
                    );

                    menuToggle.textContent =
                        "☰";
                }
            );

        });

    }


    /* =========================
       DARK / LIGHT MODE
    ========================= */

    const themeToggle =
        $("#themeToggle");


    if (themeToggle) {

        const savedTheme =
            localStorage.getItem(
                "dashain-theme"
            );


        if (
            savedTheme === "light"
        ) {

            document.body.classList.add(
                "light"
            );
        }


        updateThemeIcon();


        themeToggle.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "light"
                );


                localStorage.setItem(

                    "dashain-theme",

                    document.body.classList.contains(
                        "light"
                    )
                        ? "light"
                        : "dark"
                );


                updateThemeIcon();

            }
        );
    }


    function updateThemeIcon() {

        if (!themeToggle)
            return;


        themeToggle.textContent =

            document.body.classList.contains(
                "light"
            )
                ? "☀️"
                : "🌙";
    }


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const currentPage =
        location.pathname
            .split("/")
            .pop() || "index.html";


    $$(".nav a").forEach(link => {

        const href =
            link.getAttribute("href");


        if (
            href === currentPage
        ) {

            link.classList.add(
                "active"
            );
        }

    });


    /* =========================
       COUNTDOWN
    ========================= */

    const countdown =
        $("#countdown");


    if (countdown) {

        /*
           You can change this date
           later if required.
        */

       const targetDate = new Date("2026-10-11T00:00:00+05:45");


        function updateCountdown() {

            const now =
                new Date();


            const difference =
                targetDate - now;


            if (
                difference <= 0
            ) {

                countdown.innerHTML = `

                    <div class="count-box">

                        <strong>
                            🎉
                        </strong>

                        <span>
                            Dashain Time
                        </span>

                    </div>

                `;

                return;
            }


            const days =
                Math.floor(
                    difference /
                    (1000 * 60 * 60 * 24)
                );


            const hours =
                Math.floor(
                    difference /
                    (1000 * 60 * 60)
                ) % 24;


            const minutes =
                Math.floor(
                    difference /
                    (1000 * 60)
                ) % 60;


            const seconds =
                Math.floor(
                    difference / 1000
                ) % 60;


            setValue(
                "days",
                days
            );


            setValue(
                "hours",
                hours
            );


            setValue(
                "minutes",
                minutes
            );


            setValue(
                "seconds",
                seconds
            );

        }


        function setValue(
            id,
            value
        ) {

            const element =
                document.getElementById(
                    id
                );


            if (element) {

                element.textContent =
                    String(value)
                        .padStart(
                            2,
                            "0"
                        );
            }
        }


        updateCountdown();


        setInterval(
            updateCountdown,
            1000
        );
    }


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements =
        $$(".reveal");


    if (
        revealElements.length
    ) {

        const observer =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );
                            }

                        }
                    );

                },

                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element =>
                observer.observe(
                    element
                )
        );
    }


    /* =========================
       FALLING PETALS
    ========================= */

    function createPetal() {

        const petal =
            document.createElement(
                "span"
            );


        petal.className =
            "petal";


        petal.style.left =
            Math.random() * 100 +
            "vw";


        petal.style.animationDuration =
            5 +
            Math.random() * 5 +
            "s";


        document.body.appendChild(
            petal
        );


        setTimeout(
            () => petal.remove(),
            11000
        );
    }


    setInterval(
        createPetal,
        1000
    );


    /* =========================
       BACK TO TOP
    ========================= */

    const backToTop =
        $("#backToTop");


    if (backToTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (
                    window.scrollY > 500
                ) {

                    backToTop.classList.add(
                        "show"
                    );

                } else {

                    backToTop.classList.remove(
                        "show"
                    );
                }
            }
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );
    }


    /* =========================
       YEAR
    ========================= */

    const year =
        $("#year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =========================
       MUSIC PLAYER
    ========================= */

    const audio =
        $("#audio");


    const trackTitle =
        $("#trackTitle");


    $$(".music-track").forEach(
        track => {

            track.addEventListener(
                "click",
                () => {

                    const src =
                        track.dataset.src;


                    const title =
                        track.dataset.title;


                    if (
                        !audio ||
                        !src
                    )
                        return;


                    audio.src =
                        src;


                    if (
                        trackTitle
                    ) {

                        trackTitle.textContent =
                            title;
                    }


                    audio.play();

                }
            );

        }
    );

});