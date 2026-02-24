(function() {
    const btnMk = document.getElementById('btnMk');
    const btnBattle = document.getElementById('btnBattle');
    const slidePanel = document.getElementById('slidePanel');
    let currentTab = 0;
    let isTabAnimating = false;
    
    const teachers = [
        {
            id: 'center',
            name: "Принцесс Випхэд",
            role: "КРАМП",
            bio: "Победительница <strong>мирового</strong> крамп баттла. Артистка интерактивного крамп-шоу <strong>«Не Говори Кто»</strong>",
            image: "принцесс.png",
            elementId: 'teacherCenter'
        },
        {
            id: 'right',
            name: "Татия",
            role: "ТВЕРК",
            bio: "<strong>Тверк Королева</strong> по версии самого масштабного тверк баттла страны. Участница, финалистка, судья баттлов в номинациях ТВЕРК и HIGH HEELS",
            image: "татия.png",
            elementId: 'teacherRight'
        },
        {
            id: 'left',
            name: "Тасмания",
            role: "ТВЕРК",
            bio: "<strong>Тверк и Дэнсхолл Королева</strong> по версии самых масштабных танцевальных баттлов страны. Участница 3 сезона проекта <strong>ТАНЦЫ НА ТНТ</strong>",
            image: "тасмания.png",
            elementId: 'teacherLeft'
        }
    ];
    
    let currentActiveId = 'center';
    let isUpdating = false;
    
    function initCarousel() {
        const leftItem = document.getElementById('teacherLeft');
        const centerItem = document.getElementById('teacherCenter');
        const rightItem = document.getElementById('teacherRight');
        const teacherInfo = document.getElementById('teacherInfo');
        
        if (!leftItem || !centerItem || !rightItem || !teacherInfo) return;
        
        function setActiveTeacher(activeId) {
            if (isUpdating) return;
            isUpdating = true;
            
            leftItem.classList.remove('active');
            centerItem.classList.remove('active');
            rightItem.classList.remove('active');
            
            const activeTeacher = teachers.find(t => t.id === activeId);
            
            if (activeId === 'left') {
                leftItem.classList.add('active');
            } else if (activeId === 'center') {
                centerItem.classList.add('active');
            } else if (activeId === 'right') {
                rightItem.classList.add('active');
            }
            
            if (activeTeacher) {
                updateTeacherInfo(activeTeacher);
                currentActiveId = activeId;
            }
            
            setTimeout(() => {
                isUpdating = false;
            }, 400);
        }
        
        function updateTeacherInfo(teacher) {
            teacherInfo.style.opacity = '0';
            
            setTimeout(() => {
                teacherInfo.innerHTML = `
                    <h3 class="teacher-name">${teacher.name}</h3>
                    <p class="teacher-role">${teacher.role}</p>
                    <p class="teacher-bio">${teacher.bio}</p>
                `;
                teacherInfo.style.opacity = '1';
            }, 200);
        }
        
        setActiveTeacher('center');
        
        leftItem.addEventListener('click', () => {
            if (isUpdating || currentActiveId === 'left') return;
            setActiveTeacher('left');
        });
        
        centerItem.addEventListener('click', () => {
            if (isUpdating || currentActiveId === 'center') return;
            setActiveTeacher('center');
        });
        
        rightItem.addEventListener('click', () => {
            if (isUpdating || currentActiveId === 'right') return;
            setActiveTeacher('right');
        });
    }
    
    function initSchedule() {
        const scheduleItems = document.querySelectorAll('.schedule li');
        
        scheduleItems.forEach(item => {
            const timeElement = item.querySelector('.time');
            const eventTitleElement = item.querySelector('.event-title');
            const description = item.dataset.description;
            
            if (!timeElement || !eventTitleElement || !description) return;
            
            const time = timeElement.textContent;
            const eventTitle = eventTitleElement.innerHTML;
            
            // Создаем структуру карточки
            item.innerHTML = `
                <div class="schedule-card">
                    <span class="time">${time}</span>
                    <span class="event-title">${eventTitle}</span>
                    <span class="expand-icon">▼</span>
                </div>
                <div class="event-description">${description}</div>
            `;
            
            // Добавляем обработчик клика
            const card = item.querySelector('.schedule-card');
            card.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Закрываем другие открытые карточки
               
                
                item.classList.toggle('expanded');
            });
        });
    }
    
    function addPriceInfo() {
        const panel1 = document.getElementById('panel1');
        if (!panel1) return;
        
        // Проверяем, не добавлен ли уже блок
        if (panel1.querySelector('.price-info')) return;
        
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
            // Если блок не найден, вставляем перед расписанием
            const scheduleBlock = panel1.querySelector('.schedule');
            if (scheduleBlock) {
                scheduleBlock.insertAdjacentElement('beforebegin', priceBlock);
            }
        }
    }
    
    function createFooter() {
        const siteWrapper = document.querySelector('.site-wrapper');
        if (!siteWrapper) return;
        
        // Проверяем, не добавлен ли уже футер
        if (document.querySelector('.site-footer')) return;
        
        const footer = document.createElement('footer');
        footer.className = 'site-footer';
        footer.innerHTML = `
            <div class="footer-content">
                <div class="footer-links">
                    <div class="public-docs">
                        <a href="https://disk.yandex.ru/i/JkKHMW7yfIE4uQ" class="footer-link" target="_blank" rel="noopener noreferrer">Публичная оферта</a>
                        <a href="https://disk.yandex.ru/d/v7pDMp5kaRbrtQ" class="footer-link" target="_blank" rel="noopener noreferrer">Политика обработки персональных данных</a>
                    </div>
                    <a href="https://t.me/twerkhardproject" class="footer-telegram" target="_blank" rel="noopener noreferrer">
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
    
    function setActiveTab(index) {
        if (isTabAnimating) return;
        isTabAnimating = true;
        
        btnMk.classList.remove('active');
        btnBattle.classList.remove('active');
        
        if (index === 0) {
            btnMk.classList.add('active');
            slidePanel.style.transform = 'translateX(0%)';
        } else {
            btnBattle.classList.add('active');
            slidePanel.style.transform = 'translateX(-100%)';
        }
        
        currentTab = index;
        
        setTimeout(() => {
            isTabAnimating = false;
        }, 500);
    }
    
    btnMk.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentTab === 0 || isTabAnimating) return;
        setActiveTab(0);
    });
  
    btnBattle.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentTab === 1 || isTabAnimating) return;
        setActiveTab(1);
    });
    
    // Инициализация при загрузке DOM
    document.addEventListener('DOMContentLoaded', function() {
        setActiveTab(0);
        initCarousel();
        initSchedule();
        addPriceInfo();
        createFooter();
    });
    
    // Убираем сплеш-экран через таймер
    setTimeout(() => {
        const splash = document.querySelector('.splash-screen');
        if (splash && getComputedStyle(splash).visibility !== 'hidden') {
            splash.style.visibility = 'hidden';
            splash.style.opacity = '0';
        }
    }, 1700);
})();