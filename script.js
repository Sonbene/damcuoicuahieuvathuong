/**
 * ==========================================================================
 * WEBSITE ĐÁM CƯỚI: TRUNG HIẾU & HOÀI THƯƠNG
 * Theme: Hoàng Gia & Cổ Phục Truyền Thống (Royal Emerald & Heritage Gold)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // CẤU HÌNH ĐỒNG BỘ GOOGLE SHEETS
  // Khi bạn tạo Google Apps Script theo hướng dẫn tại GOOGLE_SHEETS_SETUP.md,
  // chỉ cần dán URL Web App của bạn vào đây:
  // ========================================================================
  const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyDftZTyg9sVQpJ7K5RdbfqnDNo8cPRzNQVAimzmDmWvWKTtxKFt2aI9hIaLi36CCTR/exec'; // Ví dụ: 'https://script.google.com/macros/s/AKfycb.../exec'

  function sendToGoogleSheet(payload) {
    if (!GOOGLE_SHEET_URL) {
      console.log('ℹ️ Google Sheet URL chưa cấu hình. Dữ liệu được lưu an toàn tại localStorage của trình duyệt.');
      return Promise.resolve();
    }

    try {
      return fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors', // Chống lỗi chặn CORS khi gọi Google Apps Script Web App
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload)
      }).then(() => {
        console.log('✅ Đã đồng bộ dữ liệu lên Google Sheets thành công!');
      }).catch(err => {
        console.warn('⚠️ Không thể gửi lên Google Sheets:', err);
      });
    } catch (e) {
      console.warn('⚠️ Lỗi kết nối Google Sheets:', e);
      return Promise.resolve();
    }
  }

  // ========================================================================
  // 1. ĐỒNG HỒ ĐẾM NGƯỢC (COUNTDOWN TIMER)
  // Ngày cưới: 16:00:00 ngày 28/11/2026 (Giờ Việt Nam GMT+7)
  // ========================================================================
  const weddingDate = new Date('2026-11-28T16:00:00+07:00').getTime();

  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minutesEl = document.getElementById('countdown-minutes');
  const secondsEl = document.getElementById('countdown-seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      const badge = document.querySelector('.hero-invitation-badge');
      if (badge) badge.textContent = 'HÔM NAY LÀ NGÀY TRỌNG ĐẠI!';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ========================================================================
  // 2. CANVAS HIỆU ỨNG HẠT BỤI VÀNG & HOA RƠI (GOLD SPARKLES & PETALS)
  // ========================================================================
  const canvas = document.getElementById('goldCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // Particle types: Hạt bụi vàng lấp lánh (sparkle) và cánh hoa rơi (petal)
    const particles = [];
    const particleCount = 45;

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : -20;
        this.isPetal = Math.random() > 0.65; // 35% là cánh hoa, 65% là bụi vàng
        this.size = this.isPetal ? (Math.random() * 8 + 6) : (Math.random() * 2.8 + 1);
        this.speedY = Math.random() * 0.8 + 0.4;
        this.speedX = Math.sin(Math.random() * Math.PI * 2) * 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.angularSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.pulse = Math.random() * 0.05;
        this.pulseDir = 1;
      }

      update() {
        this.y += this.speedY;
        this.x += Math.sin(this.angle) * 0.6 + this.speedX;
        this.angle += this.angularSpeed;

        this.opacity += this.pulse * this.pulseDir;
        if (this.opacity > 0.85) this.pulseDir = -1;
        if (this.opacity < 0.25) this.pulseDir = 1;

        if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        if (this.isPetal) {
          // Vẽ cánh hoa sen / cánh hoa vàng đồng
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size, this.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(223, 190, 122, ${this.opacity * 0.75})`;
          ctx.fill();
        } else {
          // Vẽ hạt bụi vàng lấp lánh có ánh hào quang
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(250, 225, 166, ${this.opacity})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(250, 225, 166, 0.8)';
          ctx.fill();
        }

        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let isHeroVisible = true;
    const heroSection = document.getElementById('hero');
    if ('IntersectionObserver' in window && heroSection) {
      const heroObserver = new IntersectionObserver((entries) => {
        isHeroVisible = entries[0].isIntersecting;
      }, { threshold: 0.1 });
      heroObserver.observe(heroSection);
    }

    function animateParticles() {
      if (isHeroVisible) {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
          p.update();
          p.draw();
        });
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ========================================================================
  // 3. THANH ĐIỀU HƯỚNG & MENU DI ĐỘNG (NAVBAR & MOBILE DRAWER)
  // ========================================================================
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  function toggleMenu() {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', toggleMenu);
  }

  // Đóng menu khi click vào link điều hướng
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // ========================================================================
  // 4. HIỆU ỨNG CUỘN TRANG XUẤT HIỆN (SCROLL REVEAL ANIMATIONS)
  // ========================================================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback cho trình duyệt cũ
    revealElements.forEach(el => el.classList.add('active'));
  }

  // ========================================================================
  // 5. ALBUM ẢNH & LIGHTBOX PHÓNG TO
  // ========================================================================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const btnViewCard = document.getElementById('btnViewCard');

  let currentGalleryIndex = 0;
  const galleryData = [];

  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const caption = item.getAttribute('data-caption') || img.alt;
    galleryData.push({
      src: img.src,
      caption: caption
    });

    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    currentGalleryIndex = index;
    const data = galleryData[currentGalleryIndex];
    if (!data) return;

    lightboxImg.src = data.src;
    lightboxCaption.textContent = data.caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showPrevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
    openLightbox(currentGalleryIndex);
  }

  function showNextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
    openLightbox(currentGalleryIndex);
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);

  // Đóng lightbox khi click vào nền ngoài
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Điều khiển bằng phím mũi tên & phím Escape
  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
  });

  // Hỗ trợ nút xem thiệp cưới thực tế
  if (btnViewCard) {
    btnViewCard.addEventListener('click', () => {
      // Mở ảnh thiệp cưới gốc (vị trí 0 trong gallery)
      openLightbox(0);
    });
  }

  // Hỗ trợ vuốt chạm (Touch Swipe) trên mobile
  let touchStartX = 0;
  let touchEndX = 0;
  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) showNextImage();
      if (touchEndX > touchStartX + 50) showPrevImage();
    }, { passive: true });
  }

  // ========================================================================
  // 6. SỔ LƯU BÚT ONLINE - CAROUSEL 6 LỜI CHÚC MỖI TRANG (GUESTBOOK)
  // ========================================================================
  const guestbookForm = document.getElementById('guestbookForm');
  const guestbookSliderTrack = document.getElementById('guestbookSliderTrack');
  const guestbookDots = document.getElementById('guestbookDots');
  const guestbookCountBadge = document.getElementById('guestbookCountBadge');
  const guestbookCurrentPageEl = document.getElementById('guestbookCurrentPage');
  const guestbookTotalPagesEl = document.getElementById('guestbookTotalPages');
  const gbPrevBtn = document.getElementById('gbPrevBtn');
  const gbNextBtn = document.getElementById('gbNextBtn');

  const STORAGE_KEY = 'wedding_wishes_th_ht';
  const ITEMS_PER_PAGE = 6;

  function getSavedWishes() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  // Chỉ hiển thị lời chúc thực tế từ Google Sheet hoặc do khách gửi trực tiếp
  let realWishes = getSavedWishes();

  function renderGuestbookCarousel() {
    if (!guestbookSliderTrack) return;

    if (!realWishes || realWishes.length === 0) {
      if (guestbookCountBadge) guestbookCountBadge.textContent = '0 Lời chúc phúc';
      if (guestbookCurrentPageEl) guestbookCurrentPageEl.textContent = 'Trang 0';
      if (guestbookTotalPagesEl) guestbookTotalPagesEl.textContent = '0';
      if (gbPrevBtn) gbPrevBtn.style.display = 'none';
      if (gbNextBtn) gbNextBtn.style.display = 'none';
      if (guestbookDots) guestbookDots.innerHTML = '';

      guestbookSliderTrack.innerHTML = `
        <div style="width: 100%; padding: 40px 20px; text-align: center; background: #ffffff; border: 1px dashed var(--gold-border); border-radius: var(--radius-md);">
          <div style="font-size: 2.2rem; margin-bottom: 8px;">💌</div>
          <h3 style="font-size: 1.3rem; color: var(--emerald-800); margin-bottom: 6px;">Chưa Có Lời Chúc Nào</h3>
          <p style="font-size: 0.95rem; color: var(--text-muted); max-width: 480px; margin: 0 auto;">Hãy là người đầu tiên gửi những lời chúc phúc tốt đẹp nhất tới đôi bạn trẻ Trung Hiếu & Hoài Thương ở ô bên trên nhé!</p>
        </div>
      `;
      return;
    }

    if (gbPrevBtn) gbPrevBtn.style.display = '';
    if (gbNextBtn) gbNextBtn.style.display = '';

    const allWishes = realWishes;
    const totalPages = Math.max(1, Math.ceil(allWishes.length / ITEMS_PER_PAGE));

    if (guestbookCountBadge) {
      guestbookCountBadge.textContent = `${allWishes.length} Lời chúc phúc`;
    }
    if (guestbookTotalPagesEl) {
      guestbookTotalPagesEl.textContent = totalPages;
    }

    guestbookSliderTrack.innerHTML = '';

    for (let page = 0; page < totalPages; page++) {
      const slide = document.createElement('div');
      slide.className = 'guestbook-slide';
      slide.setAttribute('data-page-index', page);

      const pageWishes = allWishes.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

      pageWishes.forEach(wish => {
        const card = document.createElement('div');
        card.className = 'wish-card';
        if (wish.isNew) {
          card.style.borderColor = 'var(--gold-primary)';
          card.style.boxShadow = '0 0 15px rgba(197, 160, 89, 0.35)';
        }

        card.innerHTML = `
          <div class="wish-header">
            <div>
              <span class="wish-author">${escapeHTML(wish.name)}</span>
              ${wish.isNew ? '<span class="wish-badge-new">Mới nhất</span>' : ''}
            </div>
            <span class="wish-date">${wish.date}</span>
          </div>
          <p class="wish-body">${escapeHTML(wish.message)}</p>
          <button class="wish-like-btn" onclick="toggleLike(this)">♥ <span class="like-count">${wish.likes || 1}</span> Yêu thích</button>
        `;
        slide.appendChild(card);
      });

      guestbookSliderTrack.appendChild(slide);
    }

    // Render các chấm phân trang (Dots)
    if (guestbookDots) {
      guestbookDots.innerHTML = '';
      for (let p = 0; p < totalPages; p++) {
        const dot = document.createElement('div');
        dot.className = `guestbook-dot ${p === 0 ? 'active' : ''}`;
        dot.setAttribute('data-page', p);
        dot.addEventListener('click', () => {
          scrollToPage(p);
        });
        guestbookDots.appendChild(dot);
      }
    }
  }

  function scrollToPage(pageIndex) {
    if (!guestbookSliderTrack) return;
    const slideWidth = guestbookSliderTrack.offsetWidth;
    guestbookSliderTrack.scrollTo({
      left: pageIndex * slideWidth,
      behavior: 'smooth'
    });
    updateActivePage(pageIndex);
  }

  function updateActivePage(pageIndex) {
    if (guestbookCurrentPageEl) {
      guestbookCurrentPageEl.textContent = `Trang ${pageIndex + 1}`;
    }
    if (guestbookDots) {
      const dots = guestbookDots.querySelectorAll('.guestbook-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === pageIndex);
      });
    }
  }

  // Lắng nghe thao tác lướt (Scroll Snap / Swipe) để cập nhật trang hiện tại
  if (guestbookSliderTrack) {
    let scrollTimeout;
    guestbookSliderTrack.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const slideWidth = guestbookSliderTrack.offsetWidth || 1;
        const page = Math.round(guestbookSliderTrack.scrollLeft / slideWidth);
        updateActivePage(page);
      }, 60);
    }, { passive: true });
  }

  // Nút lướt sang trang trước / sau
  if (gbPrevBtn) {
    gbPrevBtn.addEventListener('click', () => {
      if (!guestbookSliderTrack) return;
      const slideWidth = guestbookSliderTrack.offsetWidth;
      guestbookSliderTrack.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    });
  }

  if (gbNextBtn) {
    gbNextBtn.addEventListener('click', () => {
      if (!guestbookSliderTrack) return;
      const slideWidth = guestbookSliderTrack.offsetWidth;
      guestbookSliderTrack.scrollBy({ left: slideWidth, behavior: 'smooth' });
    });
  }

  // Định dạng ngày giờ hiển thị trên thiệp chúc mừng gọn gàng, trang nhã
  function formatWishDate(dateStr) {
    if (!dateStr) return '';
    const str = String(dateStr).trim();
    if (str.includes('GMT')) {
      try {
        const d = new Date(str);
        if (!isNaN(d.getTime())) {
          const day = String(d.getDate()).padStart(2, '0');
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const year = d.getFullYear();
          return `${day}/${month}/${year}`;
        }
      } catch (e) {}
      return str.split(' GMT')[0].trim();
    }
    // Rút gọn định dạng HH:mm:ss dd/MM/yyyy thành HH:mm dd/MM/yyyy
    return str.replace(/(\d{2}:\d{2}):\d{2}/, '$1');
  }

  let lastSubmittedWishTime = 0;

  // Tải danh sách lời chúc thực tế từ Google Sheet
  async function fetchWishesFromSheet() {
    if (!GOOGLE_SHEET_URL) {
      renderGuestbookCarousel();
      return;
    }

    try {
      // Thêm cacheBuster ngăn trình duyệt cache dữ liệu cũ
      const cacheBuster = (GOOGLE_SHEET_URL.includes('?') ? '&' : '?') + 't=' + Date.now();
      const res = await fetch(GOOGLE_SHEET_URL + cacheBuster);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          // Chuẩn hóa danh sách lời chúc từ Google Sheet
          realWishes = data.map((item, idx) => ({
            id: item.id || idx + 1,
            name: item.name,
            message: item.message,
            date: formatWishDate(item.date),
            likes: item.likes || 1,
            isNew: idx === 0 && (Date.now() - lastSubmittedWishTime < 60000)
          }));
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(realWishes));
          } catch (e) {}
          renderGuestbookCarousel();
        }
      }
    } catch (err) {
      console.warn('Chưa thể tải lời chúc từ Google Sheet:', err);
      renderGuestbookCarousel();
    }
  }

  // Khởi tạo hiển thị ban đầu và đồng bộ từ Google Sheet
  renderGuestbookCarousel();
  fetchWishesFromSheet();

  // Xử lý gửi lời chúc mới
  if (guestbookForm) {
    guestbookForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('gbName');
      const msgInput = document.getElementById('gbMessage');
      const submitBtn = guestbookForm.querySelector('button[type="submit"]');

      const name = nameInput.value.trim();
      const msg = msgInput.value.trim();

      if (!name || !msg) return;

      lastSubmittedWishTime = Date.now();
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '⏳ Đang gửi & tải lại...';
      }

      const nowTime = new Date();
      const dateStr = `${String(nowTime.getHours()).padStart(2, '0')}:${String(nowTime.getMinutes()).padStart(2, '0')} ${String(nowTime.getDate()).padStart(2, '0')}/${String(nowTime.getMonth() + 1).padStart(2, '0')}/${nowTime.getFullYear()}`;

      const newWish = {
        id: Date.now(),
        name: name,
        message: msg,
        date: dateStr,
        likes: 1,
        isNew: true
      };

      // 1. Cập nhật ngay lập tức giao diện (Optimistic UI) để người dùng thấy ngay lời chúc của mình ở trang 1
      realWishes.unshift(newWish);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(realWishes));
      } catch (err) {}

      renderGuestbookCarousel();
      scrollToPage(0);

      // Cuộn màn hình mượt mà đến ngay vị trí danh sách lời chúc để thấy lời chúc mới
      const carouselContainer = document.querySelector('.guestbook-carousel-container');
      if (carouselContainer) {
        carouselContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Kích hoạt pháo hoa chúc mừng
      createConfetti();

      // Reset form
      guestbookForm.reset();

      // 2. Gửi đồng bộ lên Google Sheets và tải lại danh sách mới nhất từ Sheet
      try {
        await sendToGoogleSheet({
          type: 'Lời chúc',
          name: name,
          message: msg,
          time: dateStr
        });

        // Đợi 1 giây để Google Apps Script hoàn tất ghi vào Sheet rồi fetch lại để đồng bộ chuẩn xác
        await new Promise(resolve => setTimeout(resolve, 1000));
        await fetchWishesFromSheet();
        scrollToPage(0);
      } catch (err) {
        console.warn('Lỗi đồng bộ lời chúc:', err);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  }

  // ========================================================================
  // 7. FORM XÁC NHẬN THAM DỰ (RSVP)
  // ========================================================================
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpSuccess = document.getElementById('rsvpSuccess');
  const rsvpSuccessText = document.getElementById('rsvpSuccessText');

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('rsvpName').value.trim();
      const phone = document.getElementById('rsvpPhone').value.trim();
      const guests = document.getElementById('rsvpGuests').value;
      const note = document.getElementById('rsvpNote').value.trim();
      const eventChoice = document.querySelector('input[name="rsvpEvent"]:checked')?.value || 'ca-hai';

      let eventText = 'Cả hai buổi tiệc (28 & 29/11)';
      if (eventChoice === 'bua-com') eventText = 'Tiệc cơm thân mật (16:00 - 28/11)';
      if (eventChoice === 'vu-quy') eventText = 'Lễ Vu Quy (08:30 - 29/11)';
      if (eventChoice === 'khong-the') eventText = 'Rất tiếc không thể tham dự';

      // Lưu trữ xác nhận vào localStorage
      const rsvpData = { name, phone, guests, note, eventChoice, eventText, time: new Date().toISOString() };
      try {
        localStorage.setItem('wedding_rsvp_' + phone, JSON.stringify(rsvpData));
      } catch (err) { }

      // Gửi đồng bộ lên Google Sheets
      sendToGoogleSheet({
        type: 'Xác nhận RSVP',
        name: name,
        phone: phone,
        event: eventText,
        guests: guests,
        note: note,
        time: new Date().toLocaleString('vi-VN')
      });

      // Ẩn form và hiển thị lời cảm ơn trang trọng
      rsvpForm.style.display = 'none';
      rsvpSuccess.style.display = 'block';

      if (eventChoice === 'khong-the') {
        rsvpSuccessText.textContent = `Gia đình đã nhận được phản hồi của bạn ${name}. Rất tiếc vì bạn không thể tới dự, gia đình xin chân thành cảm ơn tình cảm và sự quan tâm của bạn!`;
      } else {
        rsvpSuccessText.textContent = `Cảm ơn bạn ${name} đã xác nhận tham dự (${guests} người). Gia đình Trung Hiếu & Hoài Thương rất hân hạnh được đón tiếp bạn trong ngày vui!`;
      }

      // Kích hoạt hiệu ứng hoa giấy chúc mừng
      createConfetti();
    });
  }

  // ========================================================================
  // 8. TRÌNH PHÁT NHẠC NỀN & MÀN MỞ THIỆP (AUTOPLAY MUSIC GATEWAY)
  // ========================================================================
  const audio = document.getElementById('weddingAudio');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicStatusText = document.getElementById('musicStatusText');
  const gate = document.getElementById('invitationGate');
  const openInvitationBtn = document.getElementById('openInvitationBtn');
  let isPlaying = false;

  function setPlayingState(playing) {
    isPlaying = playing;
    if (musicToggleBtn) {
      if (playing) {
        musicToggleBtn.classList.add('playing');
        musicToggleBtn.textContent = '🎶';
      } else {
        musicToggleBtn.classList.remove('playing');
        musicToggleBtn.textContent = '🎵';
      }
    }
    if (musicStatusText) {
      musicStatusText.textContent = playing ? 'Tắt nhạc nền' : 'Bật nhạc nền đám cưới';
    }
  }

  function playAudio() {
    if (!audio) return Promise.reject();
    return audio.play().then(() => {
      setPlayingState(true);
      removeAutoplayListeners();
    });
  }

  function pauseAudio() {
    if (!audio) return;
    audio.pause();
    setPlayingState(false);
  }

  function toggleMusic() {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio().catch(() => {
        playChimeSound();
        setPlayingState(true);
      });
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMusic();
    });
  }

  function unlockAndOpen() {
    document.body.classList.remove('gate-locked');
    playAudio().catch(() => {
      // Fallback nếu mp3 bị chặn
      playChimeSound();
      setPlayingState(true);
    });

    if (gate && !gate.classList.contains('opened')) {
      gate.classList.add('opened');
      createConfetti();
      setTimeout(() => {
        gate.style.display = 'none';
      }, 750);
    }
    removeAutoplayListeners();
  }

  if (openInvitationBtn) {
    openInvitationBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      unlockAndOpen();
    });
  }

  if (gate) {
    gate.addEventListener('click', (e) => {
      unlockAndOpen();
    });
  }

  // Khóa cuộn màn hình khi màn mở thiệp đang hiển thị (ngăn cuộn chuột làm trôi màn hình mà chưa phát nhạc)
  if (gate && !gate.classList.contains('opened')) {
    document.body.classList.add('gate-locked');
  }

  // Thử phát nhạc ngay lập tức khi mở web
  if (audio) {
    audio.play().then(() => {
      // Trình duyệt cho phép autoplay
      setPlayingState(true);
      if (gate) {
        document.body.classList.remove('gate-locked');
        gate.classList.add('opened');
        setTimeout(() => { gate.style.display = 'none'; }, 600);
      }
    }).catch(() => {
      // Trình duyệt chặn autoplay khi chưa chạm màn hình:
      // Giữ đúng trạng thái chưa phát và giữ màn mở thiệp để người dùng chạm mở
      setPlayingState(false);
    });
  }

  // Chỉ bắt sự kiện Click / Chạm thực tế của người dùng (TUYỆT ĐỐI KHÔNG dùng scroll để tránh trôi thiệp mà không có nhạc)
  const gestureEvents = ['click', 'touchend'];
  function onFirstGesture() {
    if (gate && !gate.classList.contains('opened')) {
      unlockAndOpen();
    }
  }

  function removeAutoplayListeners() {
    gestureEvents.forEach(evt => {
      window.removeEventListener(evt, onFirstGesture);
    });
  }

  gestureEvents.forEach(evt => {
    window.addEventListener(evt, onFirstGesture, { once: true, passive: true });
  });

  // Web Audio Fallback Synth Melody (giai điệu lãng mạn nhẹ)
  function playChimeSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const notes = [261.63, 329.63, 392.00, 523.25]; // C E G C
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.4);
        gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.4);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.4 + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.4);
        osc.stop(ctx.currentTime + i * 0.4 + 1.2);
      });
    } catch (e) { }
  }

});

// Hàm hỗ trợ Thả tim (Like) lời chúc
function toggleLike(btn) {
  const countSpan = btn.querySelector('.like-count');
  let count = parseInt(countSpan.textContent, 10) || 0;
  if (btn.classList.contains('liked')) {
    btn.classList.remove('liked');
    count = Math.max(0, count - 1);
  } else {
    btn.classList.add('liked');
    count += 1;
  }
  countSpan.textContent = count;
}

// Hàm mã hóa chuỗi tránh XSS
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g,
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// Hiệu ứng pháo hoa hoa giấy ăn mừng (Confetti Celebration)
function createConfetti() {
  const colors = ['#c5a059', '#dfbe7a', '#1a4d33', '#fae1a6', '#ffffff'];
  for (let i = 0; i < 70; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.zIndex = '9999';
    confetti.style.width = Math.random() * 8 + 6 + 'px';
    confetti.style.height = Math.random() * 12 + 6 + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-20px';
    confetti.style.opacity = Math.random() * 0.8 + 0.2;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.pointerEvents = 'none';
    confetti.style.transition = `transform ${Math.random() * 2 + 2}s linear, top ${Math.random() * 2 + 2}s ease-in, opacity 2s ease-out`;

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.style.top = '105vh';
      confetti.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 100 - 50}px)`;
      confetti.style.opacity = '0';
    }, 20);

    setTimeout(() => {
      confetti.remove();
    }, 4500);
  }
}
