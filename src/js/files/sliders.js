/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Thumbs, Pagination, Autoplay } from 'swiper/modules';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.sw')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.sw', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},

			// Брейкпоинты
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			on: {

			}
		});
	}
	if (document.querySelector('.first-block__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.first-block__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Pagination, Autoplay],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 20,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,


			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},


			// Пагинация

			pagination: {
				el: '.first-block__slider .swiper-pagination',
				clickable: true,
			},


			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			// navigation: {
			// 	prevEl: '.swiper-button-prev',
			// 	nextEl: '.swiper-button-next',
			// },

			// Брейкпоинты
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			// on: {

			// }
		});
	}
	if (document.querySelector('.product-slider__slider')) { // Слайдер товаров
		const productSliders = document.querySelectorAll('.product-slider__slider');
		let count = 1;
		productSliders.forEach((el, i) => {
			if (i + 1 === productSliders.length) el.closest('.product-slider').classList.add('last-slider');
			let className = `product-slider__slider-${count}`;
			let btnClassName = `product-slider__nav-btns-${count}`;
			el.closest('.product-slider').querySelector('.product-slider__nav-btns').classList.add(btnClassName);
			el.classList.add(className);
			// Создаем слайдер
			new Swiper('.' + className, { // Указываем скласс нужного слайдера
				// Подключаем модули слайдера
				// для конкретного случая
				modules: [Navigation],
				observer: true,
				observeParents: true,
				slidesPerView: 5,
				spaceBetween: 0,
				speed: 300,
				watchSlidesProgress: true,
				loop: true,
				// Кнопки "влево/вправо"
				navigation: {
					prevEl: `.${btnClassName} .swiper-button-prev`,
					nextEl: `.${btnClassName} .swiper-button-next`,
				},
				// Брейкпоинты

				breakpoints: {
					320: {
						slidesPerView: 1,
					},
					600: {
						slidesPerView: 2,
					},
					991.98: {
						slidesPerView: 3,
					},
					1280: {
						slidesPerView: 4,
					},
					1640.98: {
						slidesPerView: 5,
					},
				},
				// autoHeight: true,
				//touchRatio: 0,
				//simulateTouch: false,
				// loop: true,
				//preloadImages: false,
				//lazy: true,


				// Эффекты
				// effect: 'fade',
				// autoplay: {
				// 	delay: 3000,
				// 	disableOnInteraction: false,
				// },


				// Пагинация
				/*
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				*/

				// Скроллбар
				/*
				scrollbar: {
					el: '.swiper-scrollbar',
					draggable: true,
				},
				*/



				// События
				// on: {

				// }
			});
			count++;
		});
	}
	if (document.querySelector('.product-main-slider')) { // Слайдер в деталке
		// Создаем слайдер
		let mainProdSlider = new Swiper('.product-main-slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Thumbs],
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 800,
			navigation: {
				prevEl: '.product-slider-nav .swiper-button-prev',
				nextEl: '.product-slider-nav .swiper-button-next',
			},
			thumbs: {
				swiper: {
					el: '.product-sidebar-slider',
					direction: 'vertical',
					slidesPerView: 4,
					spaceBetween: 12,
					breakpoints: {
						320: {
							direction: "horizontal",
							slidesPerView: 'auto',
						},
						767.98: {
							direction: "vertical",
							slidesPerView: 3,
						},
						1280.98: {
							slidesPerView: 2,
						},
						1641.98: {
							slidesPerView: 3,
						}
					},
				},
			},
			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"

			// Брейкпоинты
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			// on: {

			// }
		});
		mainProdSlider.slides.forEach((element, index) => {
			const vidos = element.querySelector('video');
			if (vidos) {
				vidos.closest('.main-prod__slide').classList.add('video-slide')
				// vidos.parentElement.setAttribute("class", '')
				mainProdSlider.thumbs.swiper.slides[index].classList.add('video-slide');
			}
		});
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});