gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const curtain = document.querySelector('.curtain')

// ===== ВХОД: занавес поднимается =====
window.addEventListener('load', () => {
	requestAnimationFrame(() => curtain.classList.add('is-open'))
	gsap.from('.hero__title, .page-hero__inner', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: .3 })
})

// ===== ВЫХОД: занавес опускается, затем переход =====
document.querySelectorAll('a[data-go]').forEach(link => {
	link.addEventListener('click', (e) => {
		e.preventDefault()
		const href = link.getAttribute('href')
		curtain.style.transformOrigin = 'bottom'
		curtain.classList.remove('is-open')
		setTimeout(() => { window.location.href = href }, 620)
	})
})

// ===== ПЛАВНЫЙ СКРОЛЛ (ТОЛЬКО НА ДЕСКТОПЕ) =====
if (ScrollTrigger.isTouch !== 1 && window.innerWidth > 768) {
	ScrollSmoother.create({ wrapper: '.wrapper', content: '.content', smooth: 1.5, effects: true })
}

// ===== ПОЯВЛЕНИЯ (ОПТИМИЗИРОВАНО) =====
gsap.utils.toArray('[data-reveal]').forEach(el => {
	gsap.from(el, {
		opacity: 0, y: 30, duration: .8, ease: 'power2.out',
		scrollTrigger: { trigger: el, start: 'top 90%' }
	})
})

// ===== КНОПКА «НАЗАД» =====
const backBtn = document.querySelector('.backbtn')
if (backBtn) {
	backBtn.addEventListener('click', (e) => {
		e.preventDefault()
		curtain.style.transformOrigin = 'bottom'
		curtain.classList.remove('is-open')
		setTimeout(() => {
			if (document.referrer && history.length > 1) history.back()
			else window.location.href = backBtn.getAttribute('href')
		}, 620)
	})
}