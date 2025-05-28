(function () {
  "use strict";

  // Function to calculate age
  function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  // Update age in UI
  function updateAgeDisplay() {
    const birthDate = '2003-05-23';
    const age = calculateAge(birthDate);

    // Update age span
    const ageSpan = select('[data-age-display]');
    if (ageSpan) {
      ageSpan.textContent = age;
    }

    // Update about description with current age
    const aboutDesc = select('[data-lang-key="aboutDescription"]');
    if (aboutDesc) {
      translations.en.aboutDescription = `My name is Tomás Vicente, I am ${age} years old and I am a student in Game Developement. Every day, I am one step closer to realizing my dream of becoming a "game developer". Currently pursuing a Bachelor's Degree in Game Development at IADE - Creative University, my passion for this field originated from my childhood spent immersed in games. The captivating stories and characters inspired me to create experiences that not only bring joy but also offer opportunities for learning and growth. I am driven by the belief that games can be a powerful medium for exploration and expression.`;
      translations.pt.aboutDescription = `O meu nome é Tomás Vicente, tenho ${age} anos e sou estudante de Desenvolvimento de Jogos. A cada dia, estou mais perto de realizar o meu sonho de me tornar um "desenvolvedor de jogos". Atualmente a tirar a Licenciatura em Desenvolvimento de Jogos no IADE - Universidade Criativa, a minha paixão por esta área teve origem na minha infância passada imersa em jogos. As histórias e personagens cativantes inspiraram-me a criar experiências que não só trazem alegria, mas também oferecem oportunidades de aprendizagem e crescimento. Sou motivado pela convicção de que os jogos podem ser um meio poderoso para exploração e expressão.`;

      // Update the text content based on current language
      aboutDesc.textContent = translations[currentLang].aboutDescription;
    }
  }

  // Translations object
  const translations = {
    en: {
      home: "Home",
      about: "About",
      portfolio: "Portfolio",
      skills: "Skills",
      aboutTitle: "About",
      aboutDescription: "My name is Tomás Vicente, I am ${age} years old and I am a student in Game Developement. Every day, I am one step closer to realizing my dream of becoming a \"game developer\". Currently pursuing a Bachelor's Degree in Game Development at IADE - Creative University, my passion for this field originated from my childhood spent immersed in games. The captivating stories and characters inspired me to create experiences that not only bring joy but also offer opportunities for learning and growth. I am driven by the belief that games can be a powerful medium for exploration and expression.",
      gameplayProgrammer: "Gameplay Programmer",
      gameplayDescription: "Responsible to create general mechanics, related to the main character, enemies, the level enviroment and rules, so the game flows the right way.",
      birthday: "Birthday:",
      age: "Age:",
      city: "City:",
      city_Text: "Lisbon, Portugal",
      degree: "Degree:",
      email: "Email:",
      cv: "CV:",
      download: "Download",
      here: "here",
      skillsTitle: "Skills",
      skillsDescription: "Learning is hard, but it's so fun when we get the hang of it.",
      otherSkills: "Other Relevant Skills",
      oS_ImageEditing: "Image Editing (Photoshop)",
      oS_VideoEditing: "Video Editing (Premiere)",
    },
    pt: {
      home: "Página Inicial",
      about: "Sobre",
      portfolio: "Portfólio",
      skills: "Competências",
      aboutTitle: "Sobre",
      aboutDescription: "O meu nome é Tomás Vicente, tenho ${age} anos e sou estudante de Desenvolvimento de Jogos. A cada dia, estou mais perto de realizar o meu sonho de me tornar um \"desenvolvedor de jogos\". Atualmente a tirar a Licenciatura em Desenvolvimento de Jogos no IADE - Universidade Criativa, a minha paixão por esta área teve origem na minha infância passada imersa em jogos. As histórias e personagens cativantes inspiraram-me a criar experiências que não só trazem alegria, mas também oferecem oportunidades de aprendizagem e crescimento. Sou motivado pela convicção de que os jogos podem ser um meio poderoso para exploração e expressão.",
      gameplayProgrammer: "Programador de Jogabilidade",
      gameplayDescription: "Responsável por criar mecânicas gerais, relacionadas com a personagem principal, inimigos, o ambiente do nível e regras, para que o jogo flua da forma adequada.",
      birthday: "Data de Nascimento:",
      age: "Idade:",
      city: "Cidade:",
      city_Text: "Lisboa, Portugal",
      degree: "Grau Académico:",
      email: "Email:",
      cv: "CV:",
      download: "Transferir",
      here: "aqui",
      skillsTitle: "Competências",
      skillsDescription: "Aprender é difícil, mas é tão divertido quando apanhamos o jeito.",
      otherSkills: "Outras Competências Relevantes",
      oS_ImageEditing: "Edição de Imagem (Photoshop)",
      oS_VideoEditing: "Edição de Vídeo (Premiere)",
    }
  };

  let currentLang = 'en';

  // Function to update page content based on selected language
  function updateLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];

    // Update CV download link based on language
    const cvLink = select('#cv-download-link');
    if (cvLink) {
      const cvPath = lang === 'en' ?
        './assets/cv/Tomás Vicente - CV[En].pdf' :
        './assets/cv/Tomás Vicente - CV[Pt].pdf';
      cvLink.setAttribute('href', cvPath);
    }

    // Update navigation
    select('#navbar .nav-link span', true).forEach(el => {
      const key = el.parentElement.getAttribute('data-lang-key');
      if (key && t[key]) el.textContent = t[key];
    });

    // Update sections with data-lang-key
    select('[data-lang-key]', true).forEach(el => {
      const key = el.getAttribute('data-lang-key');
      if (!key || !t[key]) return;

      // Special handling for elements that should preserve their HTML
      if (el.classList.contains('nav-link')) {
        const icon = el.querySelector('i').outerHTML;
        const text = t[key];
        el.innerHTML = `${icon}<span>${text}</span>`;
      } else {
        el.textContent = t[key];
      }
    });

    // Update button text
    const langBtn = select('#langToggle');
    if (langBtn) {
      langBtn.innerHTML = `<i class="bi bi-translate"></i> ${lang.toUpperCase()}`;
    }
  }


  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  // Initialize language system and age calculation
  window.addEventListener('load', () => {
    // Calculate and display age
    updateAgeDisplay();
    // Initialize with English
    updateLanguage('en');
    // Add data-lang-key attributes to elements
    const navLinks = {
      '#hero': 'home',
      '#about': 'about',
      '#portfolio': 'portfolio'
    };

    // Set up navigation links
    Object.entries(navLinks).forEach(([href, key]) => {
      const link = select(`#navbar a[href="${href}"]`);
      if (link) link.setAttribute('data-lang-key', key);
    });
    select('.section-title h2').setAttribute('data-lang-key', 'aboutTitle');
    select('.section-title p').setAttribute('data-lang-key', 'aboutDescription');
    select('.content h3').setAttribute('data-lang-key', 'gameplayProgrammer');
    select('.content .fst-italic').setAttribute('data-lang-key', 'gameplayDescription');
    select('#skills .section-title h2').setAttribute('data-lang-key', 'skillsTitle');
    select('#skills .section-title p').setAttribute('data-lang-key', 'skillsDescription');
    select('.col-lg-3 h5').setAttribute('data-lang-key', 'otherSkills');

    // Add click event listener to language toggle button
    on('click', '#langToggle', function () {
      const newLang = currentLang === 'en' ? 'pt' : 'en';
      updateLanguage(newLang);
    });
  });
})();