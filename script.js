document.addEventListener('DOMContentLoaded', function() {
    // Элементы интерфейса
    const splashScreen = document.querySelector('.splash-screen');
    const btnMk = document.getElementById('btnMk');
    const btnBattle = document.getElementById('btnBattle');
    const slidePanel = document.getElementById('slidePanel');
    const teachersCarousel = document.getElementById('teachersCarousel');
    const teacherLeft = document.getElementById('teacherLeft');
    const teacherCenter = document.getElementById('teacherCenter');
    const teacherRight = document.getElementById('teacherRight');
    const teacherInfo = document.getElementById('teacherInfo');
    const scheduleMK = document.getElementById('scheduleMK');

    // Данные для карусели учителей
    const teachers = [
        {
            name: 'Тасмания',
            role: 'ТВЕРК / ХОРЕОГРАФ',
            bio: 'Класс Насти - это мощная прокачка вашей физической подготовки. Ее танец отличается широкой амплитудой, особой пластикой и неординарными переходами.',
            img: 'тасмания.png'
        },
        {
            name: 'Принцесс Випхэд',
            role: 'КРАМП / ХОРЕОГРАФ',
            bio: 'Победительница <strong>мирового</strong> крамп баттла. Артистка интерактивного крамп-шоу <strong>«Не Говори Кто»</strong>',
            img: 'принцесс.png'
        },
        {
            name: 'Татия',
            role: 'ТВЕРК / ХОРЕОГРАФ',
            bio: 'Тверк хореографии Тани - это уникальный микс музыкальности, эстетики и авторской лексики. На классе вы выйдете за привычные рамки стиля.',
            img: 'татия.png'
        }
    ];

    let currentTeacherIndex = 1; // Индекс активного учителя (Принцесс)

    // Функция обновления карусели
    function updateCarousel(index) {
        // Получаем индексы для левого и правого
        const leftIndex = (index - 1 + teachers.length) % teachers.length;
        const rightIndex = (index + 1) % teachers.length;

        // Обновляем изображения
        teacherLeft.querySelector('img').src = teachers[leftIndex].img;
        teacherCenter.querySelector('img').src = teachers[index].img;
        teacherRight.querySelector('img').src = teachers[rightIndex].img;

        // Обновляем активные классы
        teacherLeft.classList.remove('active');
        teacherCenter.classList.remove('active');
        teacherRight.classList.remove('active');

        teacherLeft.classList.add('left');
        teacherCenter.classList.add('center', 'active');
        teacherRight.classList.add('right');

        // Обновляем информацию об учителе
        const teacher = teachers[index];
        teacherInfo.innerHTML = `
            <h3 class="teacher-name">${teacher.name}</h3>
            <p class="teacher-role">${teacher.role}</p>
            <p class="teacher-bio">${teacher.bio}</p>
        `;
    }

    // Обработчики кликов по элементам карусели
    teacherLeft.addEventListener('click', function() {
        currentTeacherIndex = (currentTeacherIndex - 1 + teachers.length) % teachers.length;
        updateCarousel(currentTeacherIndex);
    });

    teacherRight.addEventListener('click', function() {
        currentTeacherIndex = (currentTeacherIndex + 1) % teachers.length;
        updateCarousel(currentTeacherIndex);
    });

    teacherCenter.addEventListener('click', function() {
        // Ничего не делаем, так как центральный элемент активен
    });

    // Функция для создания описания события (для расписания)
    function createEventDescription(description) {
        return `<div class="event-description">${description}</div>`;
    }

    // Инициализация расписания с возможностью раскрытия
    if (scheduleMK) {
        const scheduleItems = scheduleMK.querySelectorAll('li');
        
        scheduleItems.forEach(item => {
            const description = item.getAttribute('data-description');
            if (description) {
                // Создаем структуру карточки
                const timeSpan = item.querySelector('.time');
                const titleSpan = item.querySelector('.event-title');
                
                // Сохраняем оригинальное содержимое
                const timeHTML = timeSpan.outerHTML;
                const titleHTML = titleSpan.outerHTML;
                
                // Очищаем элемент
                item.innerHTML = '';
                
                // Создаем карточку
                const cardDiv = document.createElement('div');
                cardDiv.className = 'schedule-card';
                cardDiv.innerHTML = `
                    ${timeHTML}
                    ${titleHTML}
                    <span class="expand-icon">▼</span>
                `;
                
                // Создаем описание
                const descDiv = document.createElement('div');
                descDiv.className = 'event-description';
                descDiv.innerHTML = description;
                
                // Добавляем все в элемент
                item.appendChild(cardDiv);
                item.appendChild(descDiv);
                
                // Добавляем обработчик клика
                cardDiv.addEventListener('click', function(e) {
                    e.stopPropagation();
                    item.classList.toggle('expanded');
                    
                    // Анимация для иконки
                    const icon = this.querySelector('.expand-icon');
                    if (item.classList.contains('expanded')) {
                        icon.style.transform = 'rotate(180deg)';
                    } else {
                        icon.style.transform = 'rotate(0deg)';
                    }
                });
            }
        });
    }

    // Добавляем блок стоимости участия в панель мастер-классов
    function addPriceInfo() {
        const panel1 = document.getElementById('panel1');
        
        // Создаем блок с информацией о стоимости
        const priceBlock = document.createElement('div');
        priceBlock.className = 'price-info';
        priceBlock.innerHTML = `
            <h3>💰 Стоимость участия</h3>
            <div class="price-card">
                <div class="price-item">
                    <span class="price-badge">ПАКЕТ</span>
                    <span class="price-name">«Все классы»</span>
                    <span class="price-value">8 000₽</span>
                </div>
                <div class="price-item">
                    <span class="price-name">Оплата частями</span>
                    <span class="price-value">2 000₽/мес</span>
                </div>
                <div class="price-note">
                    <strong>Важно:</strong> место закрепляется только после внесения предоплаты или в случае полной оплаты пакета
                </div>
            </div>
        `;
        
        // Вставляем после блока с местом проведения
        const placeBlock = panel1.querySelector('.schedule');
        if (placeBlock) {
            placeBlock.insertAdjacentElement('afterend', priceBlock);
        } else {
            // Если блок не найден, вставляем в начало панели
            panel1.insertBefore(priceBlock, panel1.firstChild);
        }
    }

    // Создаем футер
    function createFooter() {
        const siteWrapper = document.querySelector('.site-wrapper');
        
        const footer = document.createElement('footer');
        footer.className = 'site-footer';
        footer.innerHTML = `
            <div class="footer-content">
                <div class="footer-links">
                    <div class="public-docs">
                    <a href="https://disk.yandex.ru/i/JkKHMW7yfIE4uQ" class="footer-link">Публичная оферта</a>
                    <a href="https://disk.yandex.ru/d/v7pDMp5kaRbrtQ" class="footer-link">Политика обработки персональных данных</a><br>
                    </div>
                    <a href="https://t.me/twerkhardproject" class="footer-telegram">
                        <i class="fab fa-telegram-plane footer-telegram-icon"></i>
                        <span class="footer-telegram-text">Telegram-канал</span>
                    </a>
                </div>
                <div class="footer-info">
                    <div class="footer-ip">ИП КУРШИНА ВАСИЛИСА ИВАНОВНА</div>
                    <div class="footer-inn">ИНН 245722362680</div>
                </div>
            </div>
        `;
        
        // Вставляем футер после main-content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.insertAdjacentElement('afterend', footer);
        }
    }

    // Переключение вкладок
    btnMk.addEventListener('click', function() {
        btnMk.classList.add('active');
        btnBattle.classList.remove('active');
        slidePanel.style.transform = 'translateX(0%)';
    });

    btnBattle.addEventListener('click', function() {
        btnBattle.classList.add('active');
        btnMk.classList.remove('active');
        slidePanel.style.transform = 'translateX(-100%)';
    });

    // Инициализация
    updateCarousel(currentTeacherIndex);
    addPriceInfo();
    createFooter();
    
    // Убираем сплеш-экран через анимацию (уже в CSS)
});