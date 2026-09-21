// Ждём полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {

	// ===== ЗАНАВЕС =====
	const curtain = document.querySelector('.curtain')

	if (curtain) {
		// Вход: поднимаем занавес при загрузке страницы
		window.addEventListener('load', () => {
			requestAnimationFrame(() => curtain.classList.add('is-open'))
		})

		// ===== ВСЕ ССЫЛКИ С data-go =====
		document.querySelectorAll('a[data-go]').forEach(link => {
			link.addEventListener('click', (e) => {
				e.preventDefault()
				const href = link.getAttribute('href')

				// Опускаем занавес
				curtain.style.transformOrigin = 'bottom'
				curtain.classList.remove('is-open')

				// Переход через 600мс
				setTimeout(() => {
					window.location.href = href
				}, 600)
			})
		})

		// ===== КНОПКА "НАЗАД" =====
		const backBtn = document.querySelector('.backbtn')
		if (backBtn) {
			backBtn.addEventListener('click', (e) => {
				e.preventDefault()
				const href = backBtn.getAttribute('href')

				// Опускаем занавес
				curtain.style.transformOrigin = 'bottom'
				curtain.classList.remove('is-open')

				// Переход через 600мс
				setTimeout(() => {
					// Пытаемся вернуться назад в истории браузера, если не получается — идём по ссылке
					if (window.history.length > 1 && document.referrer) {
						window.history.back()
					} else {
						window.location.href = href
					}
				}, 600)
			})
		}
	}

	// ===== ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ (GSAP + ScrollTrigger) =====
	if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger)

		// Анимация заголовка
		gsap.from('.hero__title, .page-hero__inner', {
			y: 30,
			opacity: 0,
			duration: 1,
			ease: 'power3.out',
			delay: 0.3
		})

		// Появление всех элементов с data-reveal
		const revealElements = document.querySelectorAll('[data-reveal]')
		revealElements.forEach(el => {
			gsap.from(el, {
				opacity: 0,
				y: 30,
				duration: 0.8,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: el,
					start: 'top 90%'
				}
			})
		})
	}
})
