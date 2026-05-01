(function() {
  const isProjectPage = window.location.pathname.includes('/projet/');
  const homeLink = isProjectPage ? '../index.html' : 'index.html';
  const assetBase = isProjectPage ? '../' : '';
  const projectBase = isProjectPage ? '' : 'projet/';

  const PAGE_TRANSITION_DURATION = 3000;
  const PAGE_TRANSITION_CLASS = 'page-transition';
  const PAGE_VISIBLE_CLASS = 'page-visible';
  let pageNavigationInProgress = false;

  function getNavigationUrl(anchor) {
    if (!(anchor instanceof HTMLAnchorElement)) return null;
    if (anchor.dataset.homeLink !== undefined) return homeLink;
    return anchor.href || null;
  }

  function isInternalPageLink(anchor) {
    if (!(anchor instanceof HTMLAnchorElement)) return false;
    if (anchor.dataset.panel !== undefined) return false;

    const urlString = getNavigationUrl(anchor);
    if (!urlString) return false;
    if (anchor.target && anchor.target !== '_self') return false;
    if (anchor.hasAttribute('download')) return false;
    const rel = anchor.getAttribute('rel');
    if (rel && /\b(external|nofollow|noopener|noreferrer)\b/.test(rel)) return false;
    if (urlString.startsWith('#') || urlString.startsWith('mailto:') || urlString.startsWith('tel:') || urlString.startsWith('javascript:')) return false;

    try {
      const url = new URL(urlString, window.location.href);
      if (url.origin !== window.location.origin) return false;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return false;
      return true;
    } catch (err) {
      return false;
    }
  }

  function navigateWithTransition(url) {
    if (pageNavigationInProgress) return;
    pageNavigationInProgress = true;
    document.body.classList.remove(PAGE_VISIBLE_CLASS);

    const finishNavigation = () => {
      window.location.href = url;
    };

    const onTransitionEnd = (event) => {
      if (event.target !== document.body || event.propertyName !== 'opacity') return;
      document.body.removeEventListener('transitionend', onTransitionEnd);
      finishNavigation();
    };

    document.body.addEventListener('transitionend', onTransitionEnd);
    setTimeout(finishNavigation, PAGE_TRANSITION_DURATION + 100);
  }

  function handleDocumentClick(event) {
    const anchor = event.target.closest('a');
    if (!anchor || !isInternalPageLink(anchor)) return;
    event.preventDefault();
    const url = getNavigationUrl(anchor);
    if (url) navigateWithTransition(url);
  }

  function initPageTransition() {
    document.body.classList.add(PAGE_TRANSITION_CLASS);
    window.requestAnimationFrame(() => {
      document.body.classList.add(PAGE_VISIBLE_CLASS);
    });
    document.addEventListener('click', handleDocumentClick, true);
  }

  function initHomepageInteractiveMap() {
    const homeCanvas = document.getElementById('home-canvas');
    if (!homeCanvas) return;

    const captionContainer = document.createElement('div');
    captionContainer.id = 'drawing-caption-container';
    const captionText = document.createElement('div');
    captionText.id = 'drawing-caption';
    captionContainer.appendChild(captionText);
    homeCanvas.appendChild(captionContainer);

    const entries = [];
    homeCanvas.querySelectorAll('.drawing').forEach(drawing => {
      const img = drawing.querySelector('img');
      if (!img) return;

      let canvas = drawing.querySelector('.drawing-canvas');
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.className = 'drawing-canvas';
        drawing.appendChild(canvas);
      }
      canvas.style.display = 'none';

      const ctx = canvas.getContext('2d');
      const entry = { drawing, img, canvas, ctx, imageData: null, loaded: false };

      const prepareCanvas = () => {
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        if (!width || !height) return;
        canvas.width = width;
        canvas.height = height;
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        try {
          entry.imageData = ctx.getImageData(0, 0, width, height);
          entry.loaded = true;
        } catch (err) {
          console.error('Unable to read overlay image data for alpha detection.', err);
        }
      };

      if (img.complete && img.naturalWidth) {
        prepareCanvas();
      } else {
        img.addEventListener('load', prepareCanvas);
      }

      drawing.classList.remove('active');
      drawing.style.pointerEvents = 'none';
      entries.push(entry);
    });

    const clearActive = () => {
      entries.forEach(entry => {
        entry.drawing.classList.remove('active');
        entry.drawing.style.pointerEvents = 'none';
      });
      captionText.textContent = '';
      captionContainer.classList.remove('visible');
    };

    const setActive = (activeEntry) => {
      entries.forEach(entry => {
        if (entry === activeEntry) {
          entry.drawing.classList.add('active');
          entry.drawing.style.pointerEvents = 'auto';
        } else {
          entry.drawing.classList.remove('active');
          entry.drawing.style.pointerEvents = 'none';
        }
      });

      const caption = activeEntry ? (activeEntry.drawing.dataset.caption || activeEntry.img.alt || '') : '';
      captionText.textContent = caption;
      if (caption) {
        captionContainer.classList.add('visible');
      } else {
        captionContainer.classList.remove('visible');
      }
    };

    const findActiveEntry = (clientX, clientY) => {
      for (let i = entries.length - 1; i >= 0; i--) {
        const entry = entries[i];
        if (!entry.loaded || !entry.imageData) continue;
        const rect = entry.img.getBoundingClientRect();
        if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) continue;

        const scaleX = entry.canvas.width / rect.width;
        const scaleY = entry.canvas.height / rect.height;
        const x = Math.floor((clientX - rect.left) * scaleX);
        const y = Math.floor((clientY - rect.top) * scaleY);

        if (x < 0 || y < 0 || x >= entry.canvas.width || y >= entry.canvas.height) continue;
        const index = (y * entry.canvas.width + x) * 4;
        if (entry.imageData.data[index + 3] > 0) {
          return entry;
        }
      }
      return null;
    };

    homeCanvas.addEventListener('mousemove', (event) => {
      const activeEntry = findActiveEntry(event.clientX, event.clientY);
      if (activeEntry) {
        setActive(activeEntry);
      } else {
        clearActive();
      }
    });

    homeCanvas.addEventListener('mouseleave', () => {
      clearActive();
    });

    homeCanvas.addEventListener('click', (event) => {
      const activeEntry = findActiveEntry(event.clientX, event.clientY);
      if (!activeEntry) {
        event.preventDefault();
      }
    });
  }

  initPageTransition();

  const projectRows = [
    { key: 'bruxelles', number: '', href: '2025a_bruxelles.html', title: 'Tamis', subtitle: 'Maison senior, habiter le quotidien en des gestes lents', location: 'Bruxelles, Belgique', date: 'A 2025', note: 'Studio Modernités parallèles — ENSA Paris-Malaquais', img: 'homepage_index_image/p1.jpg', imgPos: '0px 50%' },
    { key: 'bandafassi', number: '', href: '2025h_bandafassi.html', title: 'Centre d\'interprétation culturel et école de métiers', subtitle: 'Entre héritage et renouveaux, un territoire en mouvement', location: 'Bandafassi, Sénégal', date: 'H 2025', note: '', img: 'homepage_index_image/p2.jpg', imgPos: '0px 0px' },
    { key: 'laubriviere', number: '', href: '2024a_laubriviere.html', title: 'Laubrivière', subtitle: 'Patrimoine, contre-culture et auto-suffisance', location: 'Québec, Canada', date: 'A 2024', note: '', img: 'homepage_index_image/p3.jpg', imgPos: '0px -30px' },
    { key: 'treehouse', number: '', href: '2024h_saint-roch.html', title: 'Treehouse', subtitle: 'Maison unifamiliale', location: 'Québec, Canada', date: 'H 2024', note: '', img: 'homepage_index_image/p4.jpg', imgPos: '0px 0px' },
    { key: 'shit', number: '', href: '2025h_toilette-numerique.html', title: 'Sh*t', subtitle: 'Figuration et conceptualisation numérique d\'une toilette publique', location: 'New York, États-Unis', date: 'H 2025', note: 'Premier prix — concours amical d\'architecture numérique, Université Laval Publication revue Memento 2025', img: 'homepage_index_image/p7.png', imgPos: '0px 0px' },
    { key: 'coworking', number: '', href: '2025a_enveloppe.html', title: 'Espace coworking', subtitle: 'Anatomie systématique du bâtiment', location: 'Lévis, Canada', date: 'A 2025', note: '', img: 'homepage_index_image/p6.jpg', imgPos: '0px 0px' },
    { key: 'trilogie', number: '', href: '2024a_figuration-conception.html', title: 'Trilogie matérielle', subtitle: 'Conceptualisation et interprétation spatiale architectonique', location: 'Paysage imaginé', date: 'A 2024', note: '', img: 'homepage_index_image/p5.jpg', imgPos: 'center center' },
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
    <div class="cv-left" >
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
     

    </div>
    <div class="cv-right">
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
      <div class="project-row" data-key="${proj.key}" style="--img: url('${assetBase}${proj.img}'); --img-pos: ${proj.imgPos}; --row-color: var(--project-${proj.key});" data-href="${projectBase}${proj.href}">
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
  initHomepageInteractiveMap();

  const currentProjectFile = window.location.pathname.split('/').pop();
  const currentProject = projectRows.find(proj => proj.href === currentProjectFile);
  if (currentProject) {
    document.body.classList.add('project-page', `project-${currentProject.key}`);
    document.documentElement.style.setProperty('--project-color', projectColors[currentProject.key] || 'var(--text)');
  }

  const mainContent = document.getElementById('main-content');
  const backdrop = document.getElementById('backdrop');
  const projectTrigger = document.getElementById('project-trigger');
  const projectBackdrop = document.getElementById('project-backdrop');
  const projectPanel = document.getElementById('project-panel');
  const projetGeneral = document.getElementById('projet-general');
  const projectViewer = document.getElementById('project-viewer');
  const projectImg = document.getElementById('project-img');
  const sequenceContainer = document.getElementById('sequence-container');
  const captionEl = document.getElementById('img-caption');
  const progressEl = document.getElementById('progress');
  const imgDescription = document.getElementById('img-description');
  const projectData = window.projectData || {};
  const projectSlides = Array.isArray(projectData.slides) ? projectData.slides : [];
  let currentSlide = 0;
  let projectSequenceTimer = null;
  let projectSequenceIndex = 0;
  const panelButtons = Array.from(document.querySelectorAll('#corners [data-panel]'));
  let activePanelId = null;
  let activeButtonId = null;

  function applySlideWidth(slide) {
    if (!projectImg) return;
    projectImg.style.width = slide.width || 'auto';
  }

  function stopProjectSequence() {
    if (projectSequenceTimer) {
      clearInterval(projectSequenceTimer);
      projectSequenceTimer = null;
    }
  }

  function startProjectSequence(slide) {
    if (!projectImg) return;
    applySlideWidth(slide);

    if (!Array.isArray(slide.sequence) || slide.sequence.length === 0) {
      projectImg.src = slide.img;
      return;
    }

    projectSequenceIndex = 0;
    projectImg.src = slide.sequence[projectSequenceIndex];

    projectSequenceTimer = setInterval(() => {
      projectSequenceIndex = (projectSequenceIndex + 1) % slide.sequence.length;
      projectImg.src = slide.sequence[projectSequenceIndex];
    }, 1500);
  }

  function showProjectSlide(index) {
    if (!projectSlides.length || !projectImg) return;
    currentSlide = (index + projectSlides.length) % projectSlides.length;
    const slide = projectSlides[currentSlide];
    stopProjectSequence();

    projectImg.alt = slide.caption || '';
    if (captionEl) captionEl.textContent = slide.caption || '';
    if (imgDescription) imgDescription.textContent = slide.description || '';
    if (progressEl) progressEl.textContent = `${currentSlide + 1} / ${projectSlides.length}`;
    startProjectSequence(slide);
  }

  function nextProjectSlide() {
    showProjectSlide(currentSlide + 1);
  }

  function prevProjectSlide() {
    showProjectSlide(currentSlide - 1);
  }

  function openProjectPanel() {
    if (!projetGeneral || !projectViewer || !projectBackdrop || !projectPanel) return;
    projetGeneral.classList.add('open');
    projectViewer.classList.add('blurred');
    projectBackdrop.classList.add('visible', 'backdrop-info');
    projectPanel.classList.add('displayed');
  }

  function closeProjectPanel() {
    if (!projetGeneral || !projectViewer || !projectBackdrop || !projectPanel) return;
    projetGeneral.classList.remove('open');
    projectViewer.classList.remove('blurred');
    projectBackdrop.classList.remove('visible', 'backdrop-info');
    projectPanel.classList.remove('displayed');
  }

  if (projectTrigger) {
    projectTrigger.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      openProjectPanel();
    });
  }

  if (projectBackdrop) {
    projectBackdrop.addEventListener('click', closeProjectPanel);
  }

  if (projectPanel) {
    const projectClose = projectPanel.querySelector('#panel-close');
    if (projectClose) projectClose.addEventListener('click', closeProjectPanel);
  }

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
    if (btn) btn.classList.add('active');
    activePanelId = panelId;
    activeButtonId = buttonId;
  }

  function closePanel() {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('displayed'));
    backdrop.classList.remove('visible');
    if (mainContent) mainContent.classList.remove('blurred');
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

  const clickLeft = document.getElementById('click-left');
  const clickRight = document.getElementById('click-right');
  if (clickLeft) clickLeft.addEventListener('click', prevProjectSlide);
  if (clickRight) clickRight.addEventListener('click', nextProjectSlide);

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closePanel();
      closeProjectPanel();
    }
    if (projectSlides.length) {
      if (event.key === 'ArrowRight') nextProjectSlide();
      if (event.key === 'ArrowLeft') prevProjectSlide();
    }
  });

  if (projectSlides.length) {
    showProjectSlide(0);
  }

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
      if (!href || pageNavigationInProgress) return;
      rows.forEach(r => r.classList.remove('hovered'));
      document.querySelectorAll('.project-swatch.hovered').forEach(block => block.classList.remove('hovered'));
      navigateWithTransition(href);
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


