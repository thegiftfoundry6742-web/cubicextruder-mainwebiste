/* ==========================================================================
   CubicExtruder - Interactive Application Engine
   Theme: Bottle Green (#006A4E) Architectural 3D Printing & Planters
   Supports: Three.js Hero Canvas, Homepage Planters Showcase,
   Live Quote Estimator, Custom Mouse Glow, Scroll Reveals & FAQ Accordion
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMouseGlow();
  initHero3DCanvas();
  initHomepagePlanters();
  initFAQAccordion();
  initScrollAnimationObserver();
  if (typeof CartStore !== 'undefined') {
    CartStore.updateHeaderBadge();
  }
});

/* 1. Header Navbar Blur & Scroll Effect */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* 2. Custom Glowing Mouse Cursor Tracker (Bottle Green Tint) */
function initMouseGlow() {
  const mouseGlow = document.querySelector('.mouse-glow-follower');
  if (!mouseGlow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    mouseGlow.style.left = `${currentX}px`;
    mouseGlow.style.top = `${currentY}px`;
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

/* 3. Hero Interactive Three.js 3D Mesh Canvas (Bottle Green 0x006A4E) */
function initHero3DCanvas() {
  const container = document.getElementById('hero-3d-canvas');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 5, 8);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Geometry: Parametric Extruded Torus Knot
  const geometry = new THREE.TorusKnotGeometry(1.6, 0.45, 128, 32);

  // Wireframe Layer in Bottle Green (#006A4E)
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x006A4E,
    wireframe: true,
    transparent: true,
    opacity: 0.9
  });
  const wireMesh = new THREE.Mesh(geometry, wireMaterial);
  scene.add(wireMesh);

  // Inner Glow Mesh Layer in Dark Emerald
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x031c14,
    metalness: 0.8,
    roughness: 0.3,
    emissive: 0x003322,
    emissiveIntensity: 0.4
  });
  const innerMesh = new THREE.Mesh(geometry, innerMat);
  innerMesh.scale.set(0.98, 0.98, 0.98);
  scene.add(innerMesh);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x008765, 3, 50);
  pointLight1.position.set(5, 5, 5);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x004D38, 2, 50);
  pointLight2.position.set(-5, -5, -5);
  scene.add(pointLight2);

  // Animation Loop
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    wireMesh.rotation.x = elapsedTime * 0.25;
    wireMesh.rotation.y = elapsedTime * 0.4;
    innerMesh.rotation.x = elapsedTime * 0.25;
    innerMesh.rotation.y = elapsedTime * 0.4;

    wireMaterial.opacity = 0.65 + Math.sin(elapsedTime * 2) * 0.2;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

/* 4. Render Homepage Featured Planter Pots from CatalogStore in Horizontal Row */
function initHomepagePlanters() {
  const container = document.getElementById('homepage-planters-container');
  if (!container || typeof CatalogStore === 'undefined') return;

  const products = CatalogStore.getProducts();

  container.innerHTML = products.map(product => {
    const swatches = (product.colors || []).map(c => 
      `<span class="color-dot" style="background: ${c.hex};" title="${c.name}"></span>`
    ).join('');

    const dimText = product.dimensions 
      ? `${product.dimensions.height || ''} • ${product.dimensions.capacity || ''}` 
      : '';

    const badgeHtml = product.badge 
      ? `<span class="planter-badge-tag ${product.badge.toLowerCase().includes('bestseller') || product.badge.toLowerCase().includes('smart') ? 'badge-green' : ''}">${product.badge}</span>` 
      : '';

    return `
      <div class="planter-card-small">
        <div class="planter-img-wrap">
          <a href="product-detail.html?id=${product.id}">
            <img src="${product.primaryImage || (product.images && product.images[0]) || 'assets/planter_1_geo_green.jpg'}" alt="${product.name}" loading="lazy">
          </a>
          ${badgeHtml}
        </div>
        <div class="planter-card-body">
          <div class="planter-category">${product.category || 'Planter'}</div>
          <h3 class="planter-title">
            <a href="product-detail.html?id=${product.id}" style="color: inherit; text-decoration: none;">
              ${product.name}
            </a>
          </h3>
          ${dimText ? `<div class="planter-dimensions-pill"><i data-lucide="ruler" style="width: 12px; height: 12px;"></i><span>${dimText}</span></div>` : ''}
          <div class="planter-swatches">${swatches}</div>
          <div class="planter-card-footer">
            <div class="planter-price">₹${product.price.toLocaleString('en-IN')}</div>
            <a href="product-detail.html?id=${product.id}" class="planter-view-btn">
              <span>View</span>
              <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Bind Left & Right Scroll Controls
  const scrollLeftBtn = document.getElementById('planters-scroll-left');
  const scrollRightBtn = document.getElementById('planters-scroll-right');

  if (scrollLeftBtn && !scrollLeftBtn.dataset.bound) {
    scrollLeftBtn.dataset.bound = 'true';
    scrollLeftBtn.addEventListener('click', () => {
      container.scrollBy({ left: -260, behavior: 'smooth' });
    });
  }

  if (scrollRightBtn && !scrollRightBtn.dataset.bound) {
    scrollRightBtn.dataset.bound = 'true';
    scrollRightBtn.addEventListener('click', () => {
      container.scrollBy({ left: 260, behavior: 'smooth' });
    });
  }
}

// Re-render homepage planters if catalog updates in localStorage
window.addEventListener('cubicProductsUpdated', () => {
  initHomepagePlanters();
});

/* 5. FAQ Accordion */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* 6. Scroll Animation Observer */
function initScrollAnimationObserver() {
  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  document.querySelectorAll('section, .bento-card, .planter-card, .process-card').forEach(el => {
    observer.observe(el);
  });
}
