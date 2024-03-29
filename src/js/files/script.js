// Подключение функционала "Чертогов Фрилансера"
import { isMobile, bodyLockToggle, bodyLockStatus } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

//#region Глобальный клик

document.addEventListener("click", function (e) {
   // открыть модалку каталога
   if (bodyLockStatus && e.target.closest('.js-open-sidebar-catalog')) {
      bodyLockToggle();
      document.documentElement.classList.toggle("sidebar-catalog-open");
      if (window.matchMedia("(min-width: 991.98px)").matches && !isMobile.any()) {
         document.addEventListener("mouseover", sidebarCatalogActions);
         document.removeEventListener("click", sidebarCatalogActions);
      } else {
         document.addEventListener("click", sidebarCatalogActions);
         document.removeEventListener("mouseover", sidebarCatalogActions);
      }
   }
   // закрыть модалку каталога
   if (e.target.closest('.js-sidebar-catalog-close')) {
      bodyLockToggle();
      document.documentElement.classList.remove("sidebar-catalog-open", "sidebar-sub-catalog-open");
   }
   if (!e.target.closest('.sidebar-catalog') && document.querySelector('.sidebar-catalog-open') && !e.target.closest('.js-open-sidebar-catalog')) {
      bodyLockToggle();
      document.documentElement.classList.remove("sidebar-catalog-open", "sidebar-sub-catalog-open");
   }
   // очистка input по клику на крестик
   if (e.target.closest('.form__clear-svg')) {
      let input = e.target.closest('.form__line').querySelector('.form__input') || e.target.closest('.form__line').querySelector('.form__txt');
      input.value = '';
      input.classList.remove('_form-focus');
      input.parentElement.classList.remove('_form-focus');
      e.target.closest('.form__clear-svg').classList.remove('_active');
      // Inputmask.remove(input);
      // input.style.height = `auto`;
   }
   // автовысота для textarea
   if (e.target.closest('textarea')) {
      txtarAutoHeight(e.target)
   }
   // спрятать/показать input в личкабе
   if (e.target.closest('.personal-data__change')) {
      changeData(e.target)
      e.preventDefault()
   }
   // смена текста кнопки в личкабе
   if (e.target.closest('.order__more-btn')) {
      let target = e.target.closest('.order__more-btn')
      target.classList.contains('_spoller-active') ? target.innerHTML = 'Свернуть детали заказа' : target.innerHTML = 'Показать детали заказа';
      e.preventDefault()
   }
});

//#endregion

//#region Перемещение модалки с фильтрами под .wrapper

const filtersPopup = document.querySelector('#filters-more');

if (filtersPopup) {
   filtersPopup.remove();
   document.querySelector('.popup-box').insertAdjacentElement("beforeend", filtersPopup);
   getFilterColumns(filtersPopup);
}

function getFilterColumns(popup) {
   const columns = popup.querySelectorAll('.filters__col');
   const popupWrapper = popup.querySelector('.filters__wrapper');
   columns.length > 1 ? popupWrapper.classList.add('many-cols') : null;
}

//#endregion

//#region Шаринг в деталке

let shareButton = document.getElementById('share-button');
if (shareButton) {
   let thisUrl = window.location.href
   let thisTitle = document.title;
   shareButton.addEventListener('click', function () {
      // Проверка поддержки navigator.share
      if (navigator.share && isMobile.any()) {

         // navigator.share принимает объект с URL, title или text
         navigator.share({
            title: thisTitle,
            url: thisUrl
         })
            .then(function () {
               // Shareing successfull
            })
            .catch(function () {
               // Sharing failed
            })

      } else {
         flsModules.popup.open('#share-popup');
         copyUrl();
      }
   })
}
function copyUrl() {
   const copyButton = document.querySelector('.share__button');
   const copyInput = document.querySelector('.share__input');

   copyInput.value = window.location.href;
   setTimeout(() => {
      copyInput.focus();
   }, 100);

   copyButton.addEventListener("click", function (e) {
      copyInput.select();
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      copyButton.innerHTML = 'Ссылка скопированна';
      copyButton.classList.remove('btn__orange');
      copyButton.setAttribute('disabled', 'true');
   });
}

//#endregion

//#region автовысота для textarea

function txtarAutoHeight(target) {
   const el = target;
   if (el.closest('textarea')) {

      let origHeight
      if (el.dataset.height) {
         origHeight = el.dataset.height
      } else {
         origHeight = el.scrollHeight
         el.dataset.height = origHeight
      }
      origHeight = Number(origHeight)
      el.style.height = el.setAttribute('style', 'height: ' + (origHeight + 1) + 'px');
      el.addEventListener('input', e => {
         if (el.scrollHeight > origHeight) {
            el.style.height = 'auto';
            el.style.height = (el.scrollHeight) + 10 + 'px';
         } else {
            el.style.height = 'auto';
            el.style.height = origHeight + 'px';
         }
      });
   }
}

//#endregion

//#region спрятать/показать input в личкабе

function changeData(target) {
   let el = target.closest('.personal-data__row')
   el.classList.add('_active');
   let submitBtn = el.querySelector('.personal-data__btn')
   submitBtn.addEventListener("click", function (e) {
      el.classList.remove('_active');
      el.classList.add('show-msg');
      setTimeout(() => {
         el.classList.remove('show-msg');
      }, 3000);
   });
   document.addEventListener('keydown', function (e) {
      if (e.code === 'Escape' || e.code === 'Enter' || e.code === 'NumpadEnter') {
         el.classList.remove('_active');
         el.classList.add('show-msg');
         setTimeout(() => {
            el.classList.remove('show-msg')
         }, 3000);
      }
   });
}

//#endregion

//#region Добавление классов для кнопок на странице оформления при загрузке и обновлении сстраницы

window.addEventListener("load", function (e) {
   const target = document.querySelector('.radio-buttons');
   if (target) {

      const config = {
         attributes: true,
         childList: true,
         subtree: true
      };

      function styleButtonChange() {
         const pickUpPointButtons = document.querySelectorAll('.radio-buttons__inner button, .radio-buttons__inner .btn');

         pickUpPointButtons.forEach(btn => {
            btn.setAttribute('class', '')
            btn.style = 'display: flex; justify-content:center; align-items: center; text-align: center;';
            btn.classList.add('radio-buttons__btn', 'btn', 'btn_grey');
         });
      }
      styleButtonChange();

      const callback = function (mutationsList, observer) {
         for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
               styleButtonChange();
            }
         }
      };

      const observer = new MutationObserver(callback);

      observer.observe(target, config);
   }
});

//#endregion

//#region hover на ссылках в боковом каталоге

const sidebarCatalogMenuChunk = document.querySelector('.sidebar-catalog__menu-chunk');
if (sidebarCatalogMenuChunk !== null) {
   const sidebarCatalogMenu = sidebarCatalogMenuChunk.querySelector('.sidebar-catalog__menu');
   const sidebarRect = sidebarCatalogMenuChunk.querySelector('.sidebar-catalog__hover-rect')
   sidebarCatalogMenuChunk.addEventListener('mouseover', (e) => {
      let target = e.target.closest('.sidebar-catalog__link');
      if (e.target.classList.contains('sidebar-catalog__link')) {
         sidebarRect.style.bottom = `${sidebarCatalogMenu.offsetHeight - ((target.offsetTop + target.clientHeight) - sidebarCatalogMenu.scrollTop)}px`
      }
   })
}

//#endregion

//#region Открыть/закрыть боковой каталог

function sidebarCatalogActions(e) {
   if (e.target.closest('[data-parent]')) {
      const targetElement = e.target.closest('[data-parent]');
      const subMenuId = targetElement.closest('[data-parent]').dataset.parent ? targetElement.closest('[data-parent]').dataset.parent : null;
      const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`);
      if (subMenu) {
         const activeLink = document.querySelector('._sub-menu-active');
         const activeBlock = document.querySelector('._sub-menu-open');


         if (activeLink && activeLink !== targetElement) {
            activeLink.classList.remove('_sub-menu-active');
            activeBlock.classList.remove('_sub-menu-open');
            document.documentElement.classList.remove('sidebar-sub-catalog-open');
         }
         document.documentElement.classList.add('sidebar-sub-catalog-open');
         targetElement.classList.add('_sub-menu-active');
         subMenu.classList.add('_sub-menu-open');
         e.preventDefault();
      } else {
         const activeLink = document.querySelector('._sub-menu-active');
         const activeBlock = document.querySelector('._sub-menu-open');


         if (activeLink) {
            activeLink.classList.remove('_sub-menu-active');
            activeBlock.classList.remove('_sub-menu-open');
            document.documentElement.classList.remove('sidebar-sub-catalog-open');
         }
      }
   }
   if (e.target.closest('.js-sidebar-catalog-back')) {
      document.documentElement.classList.remove('sidebar-sub-catalog-open');
      document.querySelector('._sub-menu-active') ? document.querySelector('._sub-menu-active').classList.remove('_sub-menu-active') : null;
      document.querySelector('._sub-menu-open') ? document.querySelector('._sub-menu-open').classList.remove('_sub-menu-open') : null;
      e.preventDefault();
   }
}

//#endregion