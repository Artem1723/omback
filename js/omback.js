// Ждём полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {

	// ===== ЗАНАВЕС =====
	const curtain = document.querySelector('.curtain')

	if (curtain) {
		window.addEventListener('load', () => {
			requestAnimationFrame(() => curtain.classList.add('is-open'))
		})

		// ===== ВСЕ ССЫЛКИ С data-go =====
		document.querySelectorAll('a[data-go]').forEach(link => {
			link.addEventListener('click', (e) => {
				if (e.target.closest('.lightbox-trigger')) return
				e.preventDefault()
				const href = link.getAttribute('href')
				curtain.style.transformOrigin = 'bottom'
				curtain.classList.remove('is-open')
				setTimeout(() => { window.location.href = href }, 600)
			})
		})
	}

	// ===== ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ =====
	if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger)

		gsap.from('.hero__title, .page-hero__inner', {
			y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3
		})

		const revealElements = document.querySelectorAll('[data-reveal]')
		revealElements.forEach(el => {
			gsap.from(el, {
				opacity: 0, y: 30, duration: 0.8, ease: 'power2.out',
				scrollTrigger: { trigger: el, start: 'top 90%' }
			})
		})
	}

	// ===== ЛАЙТБОКС (ОБЩИЙ) =====
	const lightbox = document.getElementById('lightbox')
	const lightboxImg = lightbox ? lightbox.querySelector('.lightbox__img') : null
	const lightboxClose = lightbox ? lightbox.querySelector('.lightbox__close') : null

	function openLightbox(src) {
		if (!lightbox || !lightboxImg) return
		lightboxImg.src = src
		lightbox.classList.add('is-open')
		document.body.style.overflow = 'hidden'
	}

	function closeLightbox() {
		if (!lightbox) return
		lightbox.classList.remove('is-open')
		document.body.style.overflow = ''
		setTimeout(() => { if (lightboxImg) lightboxImg.src = '' }, 500)
	}

	// Клик по любым картинкам с классом lightbox-trigger (сетка и аккордеон)
	document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
		trigger.addEventListener('click', (e) => {
			e.preventDefault()
			e.stopPropagation()
			const fullSrc = trigger.getAttribute('data-full') || trigger.src
			openLightbox(fullSrc)
		})
	})

	if (lightboxClose) {
		lightboxClose.addEventListener('click', (e) => {
			e.stopPropagation()
			closeLightbox()
		})
	}

	if (lightbox) {
		lightbox.addEventListener('click', (e) => {
			if (e.target === lightbox || e.target.classList.contains('lightbox__backdrop')) {
				closeLightbox()
			}
		})
	}

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') closeLightbox()
	})

	// ===== АККОРДЕОН ГАЛЕРЕИ (ИСПРАВЛЕННЫЙ) =====
	const accItems = document.querySelectorAll('.acc-item')

	if (accItems.length > 0) {
		accItems.forEach(item => {
			// Находим картинку внутри конкретной полосы
			const img = item.querySelector('img.lightbox-trigger')

			// Наведение мыши (для десктопа)
			item.addEventListener('mouseenter', () => {
				accItems.forEach(i => i.classList.remove('is-active'))
				item.classList.add('is-active')
			})

			// Клик по полосе
			item.addEventListener('click', (e) => {
				// Проверяем, был ли клик по картинке или по иконке лупы
				const isClickOnImageOrZoom = e.target.closest('.lightbox-trigger') || e.target.closest('.acc-item__zoom')

				if (isClickOnImageOrZoom && img) {
					// Открываем лайтбокс
					e.preventDefault()
					e.stopPropagation()
					const fullSrc = img.getAttribute('data-full') || img.src
					openLightbox(fullSrc)
				} else {
					// Если клик был в другое место (например, по тексту), просто делаем полосу активной
					// (это нужно в основном для мобильных устройств)
					accItems.forEach(i => i.classList.remove('is-active'))
					item.classList.add('is-active')
				}
			})
		})
	}
})
