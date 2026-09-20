// Ждём полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
	
	// Регистрируем плагины GSAP
	if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger)
		
		// ScrollSmoother только на десктопе
		if (typeof ScrollSmoother !== 'undefined' && ScrollTrigger.isTouch !== 1 && window.innerWidth > 768) {
			try {
				ScrollSmoother.create({
					wrapper: '.wrapper',
					content: '.content',
					smooth: 1.5,
					effects: true
				})
			} catch (e) {
				console.log('ScrollSmoother не загрузился:', e)
			}
		}
	}

	// ===== ЗАНАВЕС =====
	const curtain = document.querySelector('.curtain')
	if (curtain) {
		// Вход: поднимаем занавес
		window.addEventListener('load', () => {
			requestAnimationFrame(() => curtain.classList.add('is-open'))
			
			// Анимация заголовка
			if (typeof gsap !== 'undefined') {
				gsap.from('.hero__title, .page-hero__inner', {
					y: 30,
					opacity: 0,
					duration: 1,
					ease: 'power3.out',
					delay: 0.3
				})
			}
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
					window.location.href = href
				}, 600)
			})
		}
	}

	// ===== ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ =====
	if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
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
