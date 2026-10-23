/**
 * CubicExtruder - Shared Products Catalog, Cart & Quotes Store
 * Supports dynamic synchronization between Website, Products page, Detail view, Checkout, and Admin Panel.
 */

const STORAGE_PRODUCTS_KEY = 'cubic_products_catalog_v1';
const STORAGE_CART_KEY = 'cubic_extruder_cart_v1';
const STORAGE_QUOTES_KEY = 'cubic_extruder_quotes_v1';

// Supabase Cloud Backend Integration
const CUBIC_SUPABASE = {
  url: 'https://ckawwzlhpwivdpdjhjdw.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrYXd3emxocHdpdmRwZGpoamR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3MTAyNTYsImV4cCI6MjEwODI4NjI1Nn0.VZ3Egtx_L946x8ohgY2DYSKuj0_Edxo2beZ6KIIGXPs',

  async pushQuote(quote) {
    try {
      const response = await fetch(`${this.url}/rest/v1/quotes`, {
        method: 'POST',
        headers: {
          'apikey': this.anonKey,
          'Authorization': `Bearer ${this.anonKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          id: quote.id,
          date: quote.date,
          customer: quote.customer,
          items: quote.items,
          total_amount: quote.totalAmount,
          status: quote.status || 'Pending'
        })
      });
      return response.ok;
    } catch (err) {
      console.warn('Supabase quote sync warning:', err);
      return false;
    }
  },

  async pushInquiry(inquiry) {
    try {
      const response = await fetch(`${this.url}/rest/v1/inquiries`, {
        method: 'POST',
        headers: {
          'apikey': this.anonKey,
          'Authorization': `Bearer ${this.anonKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(inquiry)
      });
      return response.ok;
    } catch (err) {
      console.warn('Supabase inquiry sync warning:', err);
      return false;
    }
  }
};

// Initial Factory Catalog of 3D Printed Architectural Planter Pots
const DEFAULT_PRODUCTS = [
  {
    id: 'planter-01',
    name: 'HexaSculpt Parametric Spiral Planter',
    category: 'Geometric',
    price: 1499,
    badge: 'Bestseller',
    featured: true,
    rating: 4.9,
    reviewsCount: 54,
    leadTime: 'Ships in 24-48 hours',
    primaryImage: 'assets/planter_1_geo_green.jpg',
    images: [
      'assets/planter_1_geo_green.jpg',
      'assets/planter_2_fluted_terracotta.jpg',
      'assets/planter_3_sculptural_white.jpg',
      'assets/planter_4_selfwatering_charcoal.jpg'
    ],
    dimensions: {
      height: '6.5 inches (16.5 cm)',
      outerDiameter: '6.2 inches (15.8 cm)',
      innerDiameter: '5.4 inches (13.7 cm)',
      capacity: '1.4 Liters (48 fl oz)',
      weight: '280g (0.62 lbs)',
      drainageHole: 'Yes, 12mm central drainage hole with matching drip saucer'
    },
    colors: [
      { name: 'Bottle Green', hex: '#006A4E', code: 'green' },
      { name: 'Terracotta Matte', hex: '#D97443', code: 'terracotta' },
      { name: 'Obsidian Charcoal', hex: '#22252A', code: 'charcoal' },
      { name: 'Sandstone White', hex: '#F0EAE1', code: 'white' }
    ],
    summary: 'Parametric spiral helical ribs that refract light and highlight 0.2mm precision layer lines. Engineered for succulents and tabletop foliage.',
    description: `The HexaSculpt Spiral Planter represents the union of algorithmic generative design and precision 3D extrusion manufacturing. Fabricated using high-strength Bio-PLA+ composite infused with fine mineral powder, it offers the structural solidity of ceramic with 60% less dead weight.\n\nEach facet is parametrically tilted at 32 degrees to guide excess water toward the root zone while maintaining optimal soil oxygenation. Comes complete with a concealed snap-fit matching drip saucer that preserves clean desktop surfaces.`
  },
  {
    id: 'planter-02',
    name: 'Aura Fluted Cylindrical Architectural Planter',
    category: 'Ribbed & Fluted',
    price: 1899,
    badge: 'Architect Favorite',
    featured: true,
    rating: 5.0,
    reviewsCount: 38,
    leadTime: 'Ships in 24-48 hours',
    primaryImage: 'assets/planter_2_fluted_terracotta.jpg',
    images: [
      'assets/planter_2_fluted_terracotta.jpg',
      'assets/planter_1_geo_green.jpg',
      'assets/planter_3_sculptural_white.jpg',
      'assets/planter_4_selfwatering_charcoal.jpg'
    ],
    dimensions: {
      height: '8.0 inches (20.3 cm)',
      outerDiameter: '7.2 inches (18.3 cm)',
      innerDiameter: '6.5 inches (16.5 cm)',
      capacity: '2.6 Liters (88 fl oz)',
      weight: '385g (0.85 lbs)',
      drainageHole: 'Yes, internal slotted drainage grid with aeration channels'
    },
    colors: [
      { name: 'Terracotta Matte', hex: '#D97443', code: 'terracotta' },
      { name: 'Bottle Green', hex: '#006A4E', code: 'green' },
      { name: 'Sandstone White', hex: '#F0EAE1', code: 'white' },
      { name: 'Obsidian Charcoal', hex: '#22252A', code: 'charcoal' }
    ],
    summary: 'Classical Greco-Roman fluted pillar profile reimagined with digital additive manufacturing. Superior stiffness and soil thermal insulation.',
    description: `Drawing inspiration from classical architectural columns, the Aura Fluted Planter features 24 vertical sinusoidal ridges. These ridges act as structural stiffeners, allowing for a lightweight thin-wall construction that retains rigid durability without bowing under soil moisture pressure.\n\nFinished in a warm tactile terracotta tone with a velvety low-sheen surface that looks right at home in modern residential and corporate spaces.`
  },
  {
    id: 'planter-03',
    name: 'Mobius Sculptural Organic Vessel',
    category: 'Architectural',
    price: 2199,
    badge: 'Artisan Series',
    featured: true,
    rating: 4.8,
    reviewsCount: 29,
    leadTime: 'Ships in 2-3 business days',
    primaryImage: 'assets/planter_3_sculptural_white.jpg',
    images: [
      'assets/planter_3_sculptural_white.jpg',
      'assets/planter_1_geo_green.jpg',
      'assets/planter_2_fluted_terracotta.jpg',
      'assets/planter_4_selfwatering_charcoal.jpg'
    ],
    dimensions: {
      height: '7.5 inches (19.0 cm)',
      outerDiameter: '8.4 inches (21.3 cm)',
      innerDiameter: '5.8 inches (14.7 cm)',
      capacity: '1.8 Liters (60 fl oz)',
      weight: '340g (0.75 lbs)',
      drainageHole: 'Yes, integrated concealed drainage chamber'
    },
    colors: [
      { name: 'Sandstone White', hex: '#F0EAE1', code: 'white' },
      { name: 'Bottle Green', hex: '#006A4E', code: 'green' },
      { name: 'Obsidian Charcoal', hex: '#22252A', code: 'charcoal' },
      { name: 'Sage Marble', hex: '#8FA89B', code: 'sage' }
    ],
    summary: 'A continuous topological loop geometry impossible to manufacture with traditional molds. Statement artistic planter for trailing vines and ferns.',
    description: `A showpiece of additive manufacturing mastery. The Mobius vessel cannot be cast, molded, or turned on a lathe — it can only be brought to life layer by layer on multi-axis high-resolution 3D extruders.\n\nIts sweeping organic archways create dynamic negative space, allowing trailing vines such as string of pearls, ivy, and philodendrons to cascade elegantly.`
  },
  {
    id: 'planter-04',
    name: 'Vortex Sub-Irrigation Self-Watering Planter',
    category: 'Self-Watering',
    price: 2499,
    badge: 'Smart Care',
    featured: true,
    rating: 4.9,
    reviewsCount: 67,
    leadTime: 'Ships in 24-48 hours',
    primaryImage: 'assets/planter_4_selfwatering_charcoal.jpg',
    images: [
      'assets/planter_4_selfwatering_charcoal.jpg',
      'assets/planter_1_geo_green.jpg',
      'assets/planter_2_fluted_terracotta.jpg',
      'assets/planter_3_sculptural_white.jpg'
    ],
    dimensions: {
      height: '8.5 inches (21.5 cm)',
      outerDiameter: '7.8 inches (19.8 cm)',
      innerDiameter: '6.8 inches (17.2 cm)',
      capacity: '3.0L Soil + 650ml Reservoir',
      weight: '460g (1.01 lbs)',
      drainageHole: 'Capillary wick self-watering system with float water gauge'
    },
    colors: [
      { name: 'Obsidian Charcoal', hex: '#22252A', code: 'charcoal' },
      { name: 'Bottle Green', hex: '#006A4E', code: 'green' },
      { name: 'Sandstone White', hex: '#F0EAE1', code: 'white' },
      { name: 'Terracotta Matte', hex: '#D97443', code: 'terracotta' }
    ],
    summary: 'Worry-free plant care with a 14-day internal water reservoir, capillary wicking grid, and mechanical water level indicator.',
    description: `Take the guesswork out of plant care. The Vortex Self-Watering Planter features a dual-chamber 3D printed housing. The upper planter insert holds the soil and root bundle, while the lower faceted tray holds a 650ml water reservoir.\n\nA precision-extruded capillary wicking mesh automatically draws moisture up to root depth only as needed, eliminating root rot and under-watering while you travel.`
  }
];

// Initial Demo Quotes for immediate Admin Panel testing
const DEFAULT_QUOTES = [
  {
    id: 'CQ-74910',
    date: '2026-10-14 11:24 AM',
    customer: {
      name: 'Elena Rostova',
      email: 'elena@archstudio.design',
      phone: '+1 (415) 890-2134',
      company: 'Rostova Architectural Interiors',
      address: '742 Montgomery St, San Francisco, CA 94111',
      projectType: 'Commercial Interior Design',
      customNotes: 'Require 25 units in Bottle Green (#006A4E) matching corporate lobby palette with custom laser logo.'
    },
    items: [
      {
        id: 'planter-01',
        name: 'HexaSculpt Parametric Spiral Planter',
        color: 'Bottle Green (#006A4E)',
        price: 1499,
        quantity: 15,
        subtotal: 22485,
        image: 'assets/planter_1_geo_green.jpg'
      },
      {
        id: 'planter-02',
        name: 'Aura Fluted Cylindrical Architectural Planter',
        color: 'Terracotta Matte',
        price: 1899,
        quantity: 10,
        subtotal: 18990,
        image: 'assets/planter_2_fluted_terracotta.jpg'
      }
    ],
    totalAmount: 41475,
    status: 'Pending' // Options: 'Pending', 'In Review', 'Quote Sent', 'Completed', 'Archived'
  },
  {
    id: 'CQ-68204',
    date: '2026-10-13 04:45 PM',
    customer: {
      name: 'Marcus Vance',
      email: 'm.vance@vancerealty.com',
      phone: '+1 (214) 555-0198',
      company: 'Vance Workspace Group',
      address: '2200 Ross Ave, Dallas, TX 75201',
      projectType: 'Corporate Office Renovation',
      customNotes: 'Looking for self-watering pots for our executive boardroom and lounge.'
    },
    items: [
      {
        id: 'planter-04',
        name: 'Vortex Sub-Irrigation Self-Watering Planter',
        color: 'Obsidian Charcoal',
        price: 2499,
        quantity: 8,
        subtotal: 19992,
        image: 'assets/planter_4_selfwatering_charcoal.jpg'
      }
    ],
    totalAmount: 19992,
    status: 'Quote Sent'
  }
];

// Product Store API
const CatalogStore = {
  getProducts() {
    try {
      const stored = localStorage.getItem(STORAGE_PRODUCTS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Auto migrate if prices are in old USD format (< 100)
          let migrated = false;
          parsed.forEach(p => {
            if (p.price && p.price < 100) {
              if (p.id === 'planter-01') p.price = 1499;
              else if (p.id === 'planter-02') p.price = 1899;
              else if (p.id === 'planter-03') p.price = 2199;
              else if (p.id === 'planter-04') p.price = 2499;
              else p.price = Math.round(p.price * 80);
              migrated = true;
            }
          });
          if (migrated) {
            localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(parsed));
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading products from localStorage:', e);
    }
    // Fallback to default and persist
    localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  },

  getProductById(id) {
    const products = this.getProducts();
    return products.find(p => p.id === id) || products[0];
  },

  saveProducts(products) {
    localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent('cubicProductsUpdated', { detail: products }));
  },

  addProduct(newProduct) {
    const products = this.getProducts();
    if (!newProduct.id) {
      newProduct.id = 'planter-' + Date.now().toString().slice(-6);
    }
    if (!newProduct.rating) newProduct.rating = 5.0;
    if (!newProduct.reviewsCount) newProduct.reviewsCount = 1;
    if (!newProduct.leadTime) newProduct.leadTime = 'Ships in 24-48 hours';
    if (!newProduct.images || newProduct.images.length === 0) {
      newProduct.images = [newProduct.primaryImage || 'assets/planter_1_geo_green.jpg'];
    }
    products.unshift(newProduct);
    this.saveProducts(products);
    return newProduct;
  },

  updateProduct(id, updatedFields) {
    let products = this.getProducts();
    const idx = products.findIndex(p => p.id === id);
    if (idx !== -1) {
      products[idx] = { ...products[idx], ...updatedFields };
      this.saveProducts(products);
      return products[idx];
    }
    return null;
  },

  deleteProduct(id) {
    let products = this.getProducts();
    products = products.filter(p => p.id !== id);
    this.saveProducts(products);
    return true;
  },

  resetToDefaultProducts() {
    localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    window.dispatchEvent(new CustomEvent('cubicProductsUpdated', { detail: DEFAULT_PRODUCTS }));
    return DEFAULT_PRODUCTS;
  }
};

// Cart Store API
const CartStore = {
  getCart() {
    try {
      const stored = localStorage.getItem(STORAGE_CART_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading cart from localStorage:', e);
    }
    return [];
  },

  saveCart(cart) {
    localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart));
    this.updateHeaderBadge();
    window.dispatchEvent(new CustomEvent('cubicCartUpdated', { detail: cart }));
  },

  addToCart(product, colorName, quantity = 1) {
    const cart = this.getCart();
    const chosenColor = colorName || (product.colors && product.colors[0] ? product.colors[0].name : 'Bottle Green');
    const existingIndex = cart.findIndex(item => item.id === product.id && item.color === chosenColor);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += Number(quantity);
      cart[existingIndex].subtotal = cart[existingIndex].quantity * cart[existingIndex].price;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        color: chosenColor,
        quantity: Number(quantity),
        subtotal: product.price * Number(quantity),
        image: product.primaryImage || (product.images && product.images[0]) || 'assets/planter_1_geo_green.jpg',
        dimensions: product.dimensions ? product.dimensions.height + ' / ' + product.dimensions.outerDiameter : ''
      });
    }

    this.saveCart(cart);
    return cart;
  },

  updateQuantity(index, newQty) {
    const cart = this.getCart();
    if (cart[index]) {
      const q = parseInt(newQty, 10);
      if (q <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].quantity = q;
        cart[index].subtotal = cart[index].quantity * cart[index].price;
      }
      this.saveCart(cart);
    }
    return cart;
  },

  removeFromCart(index) {
    const cart = this.getCart();
    if (cart[index] !== undefined) {
      cart.splice(index, 1);
      this.saveCart(cart);
    }
    return cart;
  },

  clearCart() {
    this.saveCart([]);
  },

  getTotalCount() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  },

  getTotalPrice() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + (item.subtotal || (item.price * item.quantity)), 0);
  },

  updateHeaderBadge() {
    const count = this.getTotalCount();
    const badges = document.querySelectorAll('.cart-counter-badge');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  }
};

// Quotes Store API (Shared between Checkout and Admin Panel)
const QuotesStore = {
  getQuotes() {
    try {
      const stored = localStorage.getItem(STORAGE_QUOTES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          let migrated = false;
          parsed.forEach(q => {
            if (q.totalAmount && q.totalAmount < 1000) {
              if (q.id === 'CQ-74910') {
                q.totalAmount = 41475;
                if (q.items && q.items[0]) { q.items[0].price = 1499; q.items[0].subtotal = 22485; }
                if (q.items && q.items[1]) { q.items[1].price = 1899; q.items[1].subtotal = 18990; }
              } else if (q.id === 'CQ-68204') {
                q.totalAmount = 19992;
                if (q.items && q.items[0]) { q.items[0].price = 2499; q.items[0].subtotal = 19992; }
              } else {
                q.totalAmount = Math.round(q.totalAmount * 80);
              }
              migrated = true;
            }
          });
          if (migrated) {
            localStorage.setItem(STORAGE_QUOTES_KEY, JSON.stringify(parsed));
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading quotes from localStorage:', e);
    }
    // Seed default quotes on first run
    localStorage.setItem(STORAGE_QUOTES_KEY, JSON.stringify(DEFAULT_QUOTES));
    return DEFAULT_QUOTES;
  },

  saveQuotes(quotes) {
    localStorage.setItem(STORAGE_QUOTES_KEY, JSON.stringify(quotes));
    window.dispatchEvent(new CustomEvent('cubicQuotesUpdated', { detail: quotes }));
  },

  createQuote(customerData, items, totalAmount) {
    const quotes = this.getQuotes();
    const quoteId = 'CQ-' + Math.floor(10000 + Math.random() * 90000);
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) + ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newQuote = {
      id: quoteId,
      date: dateFormatted,
      customer: customerData,
      items: items,
      totalAmount: totalAmount,
      status: 'Pending'
    };

    quotes.unshift(newQuote);
    this.saveQuotes(quotes);

    // Asynchronously dispatch to Supabase cloud database
    if (typeof CUBIC_SUPABASE !== 'undefined' && typeof CUBIC_SUPABASE.pushQuote === 'function') {
      CUBIC_SUPABASE.pushQuote(newQuote);
    }

    return newQuote;
  },

  updateQuoteStatus(quoteId, status) {
    const quotes = this.getQuotes();
    const quote = quotes.find(q => q.id === quoteId);
    if (quote) {
      quote.status = status;
      this.saveQuotes(quotes);
      return quote;
    }
    return null;
  },

  deleteQuote(quoteId) {
    let quotes = this.getQuotes();
    quotes = quotes.filter(q => q.id !== quoteId);
    this.saveQuotes(quotes);
    return true;
  },

  resetDefaultQuotes() {
    localStorage.setItem(STORAGE_QUOTES_KEY, JSON.stringify(DEFAULT_QUOTES));
    window.dispatchEvent(new CustomEvent('cubicQuotesUpdated', { detail: DEFAULT_QUOTES }));
    return DEFAULT_QUOTES;
  }
};

// Initialize Cart Badge on page load
document.addEventListener('DOMContentLoaded', () => {
  CartStore.updateHeaderBadge();
});
