(function() {
  const isProjectPage = window.location.pathname.includes('/projet/');
  const homeLink = isProjectPage ? '../0_homepage.html' : '0_homepage.html';
  const assetBase = isProjectPage ? '../' : '';
  const projectBase = isProjectPage ? '' : 'projet/';

  const projectRows = [
    { key: 'bruxelles', number: '', href: '2025a_bruxelles.html', title: 'Tamis', subtitle: 'Maison senior, habiter le quotidien en des gestes lents', location: 'Peterbos, Anderlecht, Bruxelles', date: 'A 2025', note: 'Studio Modernités parallèles — ENSA Paris-Malaquais', img: 'homepage_index_image/p1.jpg', imgPos: '0px 50%' },
    { key: 'bandafassi', number: '', href: '2025h_bandafassi.html', title: 'Centre d\'interprétation culturel et école de métiers', subtitle: 'Entre héritage et renouveaux, un territoire en mouvement', location: 'Bandafassi, Kedougou, Sénégal', date: 'H 2025', note: '', img: 'homepage_index_image/p2.jpg', imgPos: '0px 0px' },
    { key: 'laubriviere', number: '', href: '2024a_laubrivière.html', title: 'Laubrivière', subtitle: 'Patrimoine, contre-culture et auto-suffisance', location: 'Vieux-Québec, Qc, Canada', date: 'A 2024', note: '', img: 'homepage_index_image/p3.jpg', imgPos: '0px -30px' },
    { key: 'treehouse', number: '', href: '2024h_saint-roch.html', title: 'Treehouse', subtitle: 'Maison unifamiliale', location: 'St-Roch, Qc, Canada', date: 'H 2024', note: '', img: 'homepage_index_image/p4.jpg', imgPos: '0px 0px' },
    { key: 'shit', number: '', href: '2025h_toilette-numerique.html', title: 'Sh*t', subtitle: 'Figuration et conceptualisation numérique d\'une toilette publique', location: 'Manhattan, New York, États-Unis', date: 'H 2025', note: 'Premier prix — concours amical d\'architecture numérique, Université Laval Publication revue Memento 2025', img: 'homepage_index_image/p7.png', imgPos: '0px 0px' },
    { key: 'coworking', number: '', href: '2025a_enveloppe.html', title: 'Espace coworking', subtitle: 'Anatomie systématique du bâtiment', location: 'Lévis, Qc, Canada', date: 'A 2025', note: '', img: 'homepage_index_image/p6.jpg', imgPos: '0px 0px' },
    { key: 'trilogie', number: '', href: '2024a_figuration-conception.html', title: 'Trilogie matérielle', subtitle: 'Conceptualisation et interprétation spatiale architectonique', location: 'Paysage imaginée', date: 'A 2024', note: '', img: 'homepage_index_image/p5.jpg', imgPos: 'center center' },
    { key: 'livre-d-artiste', number: '', href: '2024h_livre-d-artiste.html', title: 'Livre d\'artiste', subtitle: 'Carrières Centrales, modernisme au Maroc dans les années 50', location: 'Casablanca, Maroc', date: 'H 2024', note: '', img: 'homepage_index_image/p8.png', imgPos: 'center center' },
    { key: 'divers', number: '', href: 'divers.html', title: 'Divers', subtitle: '', location: '', date: '', note: '', img: 'homepage_index_image/p9.jpg', imgPos: '0px 26%' }
  ];

  const projectColors = {
    bruxelles: 'var(--project-bruxelles)',
    bandafassi: 'var(--project-bandafassi)',
    laubriviere: 'var(--project-laubriviere)',
    treehouse: 'var(--project-treehouse)',
    shit: 'var(--project-shit)',
    coworking: 'var(--project-coworking)',
    trilogie: 'var(--project-trilogie)',
    'livre-d-artiste': 'var(--project-livre-d-artiste)',
    divers: 'var(--project-divers)'
  };

  const navHtml = `
<nav id="corners">
  <a class="corner" id="btn-home" href="${homeLink}">Q<small>IAOYI</small> S<small>HI</small></a>
  <button class="corner" id="btn-info" data-panel="panelinfo">I<small>NFO</small></button>
  <button class="corner" id="btn-index" data-panel="panelindex">P<small>ROJETS</small></button>
  <button class="corner" id="btn-contact" data-panel="panelcontact">C<small>ONTACT</small></button>
</nav>
`;

  const panelHtml = `
<div id="backdrop" class="backdrop"></div>
<div class="panel" id="panelinfo">
  <section class="full-section" id="section-bio">
    <div class="bio-image">
      <img src="${assetBase}homepage_index_image/info.jpg" alt="Portrait" id="portrait-img">
      <div class="portrait-overlay" aria-hidden="true">
        <div class="interest-text"></div>
      </div>
    </div>
    <div class="bio-text">
      <div class="bio-paragraphs">
        <p>Étudiante en architecture à profil international à l'Université Laval, j'effectue actuellement ma dernière session à l'ENSA Paris-Malaquais, avant de poursuivre en maîtrise en architecture.</p>
        <p>Ma pratique s'ancre dans une analyse préliminaire rigoureuse du terrain d'intervention, afin de comprendre les dynamiques entre le site, ses habitants, la nature et son contexte culturel. Les projets que je développe cherchent à préserver et valoriser ces dynamiques, tout en affirmant ma position de conceptrice au sein du tissu local. La majorité des projets présentés ici explore la création de liens et le renforcement des communautés, pour une architecture résolument humaine.</p>
        <p>Passionnée par une recherche expressive, j'intègre l'aspect artistique au processus de conception à travers l'expérimentation — collage, dessin à la main, couleurs vibrantes. Ces explorations graphiques me permettent d'interroger les limites du réel et d'ouvrir de nouveaux imaginaires.</p>
      </div>
    </div>
    <div class="scroll-hint">
      <span>CV</span>
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M8 2v12M3 9l5 5 5-5"/>
      </svg>
    </div>
  </section>
  <section class="full-section" id="section-cv">
    <span class="back-hint">↑ Bio</span>
    <div class="cv-left">
      <div>
        <p class="cv-section-title">Formation</p>
        <div class="cv-block">
          <div class="cv-entry">
            <span class="cv-year">A 2025 - H 2026</span>
            <div class="cv-content">
              <div class="cv-title">Échange international</div>
              <div class="cv-detail">École Nationale Supérieure d'Architecture (ENSA) Paris-Malaquais - Université PSL — Paris, France</div>
            </div>
          </div>
          <div class="cv-entry">
            <span class="cv-year">A 2023 - H 2026</span>
            <div class="cv-content">
              <div class="cv-title">Baccalauréat en architecture (B.Sc.Arch)</div>
              <div class="cv-detail">Université Laval — Québec, Canada</div>
            </div>
          </div>
          <div class="cv-entry">
            <span class="cv-year">A 2021 - H 2023</span>
            <div class="cv-content">
              <div class="cv-title">Diplôme d'étude collégiale en science de la nature, profil pur appliqué</div>
              <div class="cv-detail">CEGEP de Lévis — Lévis, Canada</div>
            </div>
          </div>
          <div class="cv-entry">
            <span class="cv-year">A 2018 - H 2023</span>
            <div class="cv-content">
              <div class="cv-title">Diplôme d'étude secondaire, profil musique</div>
              <div class="cv-detail">École secondaire Marcelle — Lévis, Canada</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="cv-section-title">Prix & publications</p>
        <div class="cv-block">
          <div class="cv-entry">
            <span class="cv-year">2025</span>
            <div class="cv-content">
              <div class="cv-title">Premier prix — concours amical d'architecture numérique</div>
              <div class="cv-detail">Université Laval — Meilleure image forte</div>
            </div>
          </div>
          <div class="cv-entry">
            <span class="cv-year">2025</span>
            <div class="cv-content">
              <div class="cv-title">Revue Memento</div>
              <div class="cv-detail">École d'architecture, Université Laval</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="cv-section-title">Expérience et implication</p>
        <div class="cv-block">
          <div class="cv-entry">
            <span class="cv-year">A 2023</span>
            <div class="cv-content">
              <div class="cv-title">Membre du comité Socio Archi</div>
              <div class="cv-detail">Université Laval</div>
            </div>
          </div>
          <div class="cv-entry">
            <span class="cv-year">H et A 2022</span>
            <div class="cv-content">
              <div class="cv-title">Tutorat en anglais, calcul différentiel intégral et physique mécanique</div>
              <div class="cv-detail">CEGEP de Lévis</div>
            </div>
          </div>
          <div class="cv-entry">
            <span class="cv-year">2019</span>
            <div class="cv-content">
              <div class="cv-title">Tutorat en mathématiques SN</div>
              <div class="cv-detail">École secondaire Marcelle-Mallet</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cv-right">
      <div>
        <p class="cv-section-title">Compétences</p>
        <div class="cv-block">
          <div class="cv-entry">
            <span class="cv-year">CAO</span>
            <div class="cv-content">
              <div class="cv-skills">
                <span class="cv-skill-tag">Rhino</span>
                <span class="cv-skill-tag">Revit</span>
                <span class="cv-skill-tag">AutoCAD</span>
                <span class="cv-skill-tag">SketchUp</span>
              </div>
            </div>
          </div>
          <div class="cv-entry">
            <span class="cv-year">Image</span>
            <div class="cv-content">
              <div class="cv-skills">
                <span class="cv-skill-tag">Photoshop</span>
                <span class="cv-skill-tag">Illustrator</span>
                <span class="cv-skill-tag">InDesign</span>
                <span class="cv-skill-tag">Lumion</span>
              </div>
            </div>
          </div>
          <div class="cv-entry">
            <span class="cv-year">Web</span>
            <div class="cv-content">
              <div class="cv-skills">
                <span class="cv-skill-tag">HTML</span>
                <span class="cv-skill-tag">CSS</span>
                <span class="cv-skill-tag">JavaScript</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="cv-section-title">Langues</p>
        <div class="cv-block">
          <div class="cv-entry">
            <span class="cv-year"></span>
            <div class="cv-content">
              <div class="cv-title">Français</div>
              <div class="cv-detail">Courant</div>
            </div>
          </div>
          <div class="cv-entry">
            <span class="cv-year"></span>
            <div class="cv-content">
              <div class="cv-title">Anglais</div>
              <div class="cv-detail">Courant</div>
            </div>
          </div>
          <div class="cv-entry">
            <span class="cv-year"></span>
            <div class="cv-content">
              <div class="cv-title">Mandarin</div>
              <div class="cv-detail">Langue maternelle</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="cv-section-title">Contact</p>
        <div class="cv-block">
          <div class="cv-entry">
            <span class="cv-year"></span>
            <div class="cv-content">
              <div class="cv-title">qishi@ulaval.ca</div>
              <div class="cv-detail">+1 (581) 443-9732</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
<div class="panel" id="panelcontact">
  <h2>Contact</h2>
  <p>qishi@ulaval.ca</p>
  <p>+1 (581) 443-9732</p>
  <p><a href="https://www.linkedin.com/in/qiaoyi-shi-44780b292/" target="_blank">LinkedIn</a></p>
</div>
<div class="panel" id="panelindex">
  <div id="project-grid-panel">
    <div class="project-swatch-column">
      ${projectRows.map(proj => `
      <div class="project-swatch" data-key="${proj.key}" style="background-color: var(--project-${proj.key});"></div>`).join('')}
    </div>
    <div class="project-grid">
      ${projectRows.map(proj => `
      <div class="project-row" data-key="${proj.key}" style="--img: url('${assetBase}${proj.img}'); --img-pos: ${proj.imgPos};" data-href="${projectBase}${proj.href}">
        <div class="row-image"></div>
        <div class="row-inner">
          <span class="row-number">${proj.number}</span>
          <div class="col-title">
            <div class="project-title">${proj.title}</div>
            <div class="project-subtitle">${proj.subtitle}</div>
          </div>
          <div class="col-location">${proj.location}</div>
          <div class="col-date">${proj.date}</div>
          <div class="col-note">${proj.note}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</div>
`;

  document.body.insertAdjacentHTML('afterbegin', navHtml + panelHtml);

  const currentProjectFile = window.location.pathname.split('/').pop();
  const currentProject = projectRows.find(proj => proj.href === currentProjectFile);
  if (currentProject) {
    document.body.classList.add('project-page', `project-${currentProject.key}`, 'page-transition');
    document.documentElement.style.setProperty('--project-color', projectColors[currentProject.key] || 'var(--text)');
    window.requestAnimationFrame(() => {
      document.body.classList.add('page-visible');
    });
  }

  const mainContent = document.getElementById('main-content') || document.querySelector('main');
  const sequenceContainer = document.getElementById('sequence-container');
  const backdrop = document.getElementById('backdrop');
  const panelButtons = Array.from(document.querySelectorAll('[data-panel]'));
  let activePanelId = null;
  let activeButtonId = null;

  if (currentProject && currentProject.key !== 'divers' && mainContent) {
    const projectImages = Array.from(mainContent.querySelectorAll('img')).filter(img => !img.closest('.project-slide-wrapper'));
    if (projectImages.length) {
      let slideIndex = 0;
      const projectDescription = document.createElement('div');
      projectDescription.className = 'project-detail-description';
      const projectProgress = document.createElement('div');
      projectProgress.className = 'project-progress';
      const showSlide = index => {
        slideIndex = (index + projectImages.length) % projectImages.length;
        projectImages.forEach((img, idx) => {
          img.style.display = idx === slideIndex ? 'block' : 'none';
        });
        projectProgress.textContent = `${slideIndex + 1} / ${projectImages.length}`;
        projectDescription.textContent = projectImages[slideIndex].dataset.description || projectImages[slideIndex].alt || '';
      };
      projectImages.forEach((img, idx) => {
        img.classList.add('project-slide');
        img.style.display = idx === 0 ? 'block' : 'none';
      });
      mainContent.insertAdjacentElement('afterbegin', projectDescription);
      mainContent.appendChild(projectProgress);
      mainContent.addEventListener('click', event => {
        if (event.target.closest('a, button')) return;
        const rect = mainContent.getBoundingClientRect();
        const isRight = event.clientX > rect.left + rect.width / 2;
        showSlide(isRight ? slideIndex + 1 : slideIndex - 1);
      });
      showSlide(0);
    }
  }

  function openPanel(panelId, buttonId) {
    closePanel();
    const panel = document.getElementById(panelId);
    const btn = document.getElementById(buttonId);
    if (!panel) return;
    panel.classList.add('displayed');
    backdrop.classList.add('visible');
    if (mainContent) mainContent.classList.add('blurred');
    if (sequenceContainer) sequenceContainer.classList.add('blurred');
    if (btn) btn.classList.add('active');
    activePanelId = panelId;
    activeButtonId = buttonId;
  }

  function closePanel() {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('displayed'));
    backdrop.classList.remove('visible');
    if (mainContent) mainContent.classList.remove('blurred');
    if (sequenceContainer) sequenceContainer.classList.remove('blurred');
    if (activeButtonId) {
      const btn = document.getElementById(activeButtonId);
      if (btn) btn.classList.remove('active');
    }
    activePanelId = null;
    activeButtonId = null;
  }

  function togglePanel(panelId, buttonId) {
    if (activePanelId === panelId) {
      closePanel();
      return;
    }
    openPanel(panelId, buttonId);
  }

  panelButtons.forEach(button => {
    button.addEventListener('click', () => togglePanel(button.dataset.panel, button.id));
  });
  backdrop.addEventListener('click', closePanel);
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closePanel();
    }
  });

  const rows = document.querySelectorAll('#panelindex .project-row');
  const supportsHas = CSS.supports('selector(:has(*))');
  if (!supportsHas) {
    rows.forEach(row => {
      row.addEventListener('mouseenter', () => {
        rows.forEach(r => {
          r.classList.remove('expand');
          r.classList.add('shrink');
        });
        row.classList.remove('shrink');
        row.classList.add('expand');
      });
      row.addEventListener('mouseleave', () => {
        rows.forEach(r => r.classList.remove('expand', 'shrink'));
      });
    });
  }

  rows.forEach(row => {
    const rowImage = row.querySelector('.row-image');
    const swatch = row.dataset.key ? document.querySelector(`.project-swatch[data-key="${row.dataset.key}"]`) : null;
    if (rowImage) {
      const imageValue = row.style.getPropertyValue('--img').trim();
      const positionValue = row.style.getPropertyValue('--img-pos').trim() || row.style.getPropertyValue('--imgPos').trim();
      if (imageValue) {
        rowImage.style.backgroundImage = imageValue;
      }
      if (positionValue) {
        rowImage.style.backgroundPosition = positionValue;
      }
      rowImage.style.opacity = '0';
      rowImage.style.transition = 'opacity 350ms ease, transform 350ms ease';
    }

    row.addEventListener('mouseenter', () => {
      row.classList.add('hovered');
      if (swatch) swatch.classList.add('hovered');
      if (rowImage) {
        rowImage.style.opacity = '1';
      }
    });

    row.addEventListener('mouseleave', () => {
      row.classList.remove('hovered');
      if (swatch) swatch.classList.remove('hovered');
      if (rowImage) {
        rowImage.style.opacity = '0';
      }
    });

    row.addEventListener('click', () => {
      const href = row.dataset.href;
      if (!href) return;
      const isDivers = href.endsWith('divers.html');
      rows.forEach(r => r.classList.remove('hovered'));
      document.querySelectorAll('.project-swatch.hovered').forEach(block => block.classList.remove('hovered'));
      if (!isDivers) {
        const panelIndex = document.getElementById('panelindex');
        if (panelIndex) {
          panelIndex.classList.add('fade-out');
        }
        setTimeout(() => {
          window.location.href = href;
        }, 2000);
      } else {
        window.location.href = href;
      }
    });
  });

  const sectionCV = document.getElementById('section-cv');
  if (sectionCV) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          sectionCV.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });
    observer.observe(sectionCV);
  }

  const portrait = document.getElementById('portrait-img');
  const panelInfo = document.getElementById('panelinfo');
  if (portrait && panelInfo) {
    panelInfo.addEventListener('scroll', () => {
      const progress = panelInfo.scrollTop / panelInfo.clientHeight;
      portrait.style.transform = `translateY(${progress * 40}px)`;
    });
  }

  const words = [
    { text: 'textile', offset: '62%' },
    { text: 'réemploi', offset: '35%' },
    { text: 'botanique \u2005 et \u2005 espèce \u2005 indigène', offset: '37%' },
    { text: 'matériaux \u2005 biosourcés', offset: '20%' },
    { text: 'identité \u2005 et \u2005 culture', offset: '40%' },
    { text: 'artisanat\u2005 et \u2005 savoir \u2005 faire', offset: '23%' },
    { text: 'communauté \u2005 locale', offset: '35%' },
    { text: 'assemblage', offset: '20%' },
    { text: 'scénographie', offset: '3%' }
  ];

  const bioImage = document.querySelector('.bio-image');
  const overlay = document.querySelector('.portrait-overlay');
  const interestText = overlay && overlay.querySelector('.interest-text');
  const timers = [];

  function clearTimers() {
    while (timers.length) {
      clearTimeout(timers.pop());
    }
  }

  function buildWords() {
    if (!interestText) return;
    interestText.innerHTML = '';
    words.forEach((item, index) => {
      const wordEl = document.createElement('span');
      wordEl.className = 'interest-word';
      wordEl.style.left = item.offset;
      wordEl.style.top = `${index * (100 / (words.length - 1))}%`;
      item.text.split('').forEach(letter => {
        const letterEl = document.createElement('span');
        letterEl.className = 'interest-letter';
        letterEl.textContent = letter;
        wordEl.appendChild(letterEl);
      });
      interestText.appendChild(wordEl);
    });
  }

  function revealWords() {
    if (!interestText || !overlay) return;
    overlay.classList.add('show');
    const letterSpans = Array.from(interestText.querySelectorAll('.interest-letter'));
    const order = letterSpans.map((_, index) => index).sort(() => Math.random() - 0.5);
    const totalDuration = 3000;
    const timeStep = totalDuration / Math.max(letterSpans.length, 1);
    order.forEach((letterIndex, idx) => {
      const letter = letterSpans[letterIndex];
      const delay = Math.min(totalDuration - 120, 180 + idx * timeStep + Math.random() * 200);
      timers.push(setTimeout(() => {
        letter.classList.add('visible');
      }, delay));
    });
    Array.from(interestText.querySelectorAll('.interest-word')).forEach((wordEl, wordIndex) => {
      const wordDelay = wordIndex * 120;
      timers.push(setTimeout(() => {
        wordEl.classList.add('visible');
      }, wordDelay));
    });
  }

  function hideWords() {
    if (!interestText || !overlay) return;
    overlay.classList.remove('show');
    clearTimers();
    Array.from(interestText.querySelectorAll('.interest-letter')).forEach(letter => {
      letter.classList.remove('visible');
    });
    Array.from(interestText.querySelectorAll('.interest-word')).forEach(word => {
      word.classList.remove('visible');
    });
  }

  if (bioImage && overlay && interestText) {
    buildWords();
    bioImage.addEventListener('mouseenter', () => {
      clearTimers();
      buildWords();
      revealWords();
    });
    bioImage.addEventListener('mouseleave', () => {
      hideWords();
    });
  }

  const slideshowInner = document.querySelector('.slideshow-inner');
  const slideshowSlides = slideshowInner ? Array.from(slideshowInner.querySelectorAll('.slide')) : [];
  const slideshowCaption = document.querySelector('.slideshow-caption');
  if (slideshowSlides.length) {
    const fadeDuration = 2000;
    const visibleDuration = 4000;
    let activeIndex = 0;

    function setSlide(index) {
      slideshowSlides.forEach((slide, slideIndex) => {
        const active = slideIndex === index;
        slide.classList.toggle('visible', active);
        slide.style.zIndex = active ? '2' : '1';
      });
      if (slideshowCaption) {
        const activeSlide = slideshowSlides[index];
        slideshowCaption.textContent = activeSlide ? activeSlide.alt || '' : '';
        slideshowCaption.classList.toggle('visible', Boolean(activeSlide));
      }
    }

    function scheduleNext() {
      const currentSlide = slideshowSlides[activeIndex];
      window.setTimeout(() => {
        if (currentSlide) currentSlide.classList.remove('visible');
        if (slideshowCaption) slideshowCaption.classList.remove('visible');
        window.setTimeout(() => {
          activeIndex = (activeIndex + 1) % slideshowSlides.length;
          setSlide(activeIndex);
          scheduleNext();
        }, fadeDuration);
      }, fadeDuration + visibleDuration);
    }

    setSlide(activeIndex);
    scheduleNext();
  }

  const scrollHint = document.querySelector('#panelinfo .scroll-hint');
  if (scrollHint && sectionCV) {
    scrollHint.addEventListener('click', () => {
      sectionCV.scrollIntoView({ behavior: 'smooth' });
    });
  }
})();
