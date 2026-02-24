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

        // Добавляем поддержку touch-событий для мобильных
        leftItem.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (isUpdating || currentActiveId === 'left') return;
            setActiveTeacher('left');
        });
        
        centerItem.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (isUpdating || currentActiveId === 'center') return;
            setActiveTeacher('center');
        });
        
        rightItem.addEventListener('touchstart', (e) => {
            e.preventDefault();
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
                scheduleItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('expanded')) {
                        otherItem.classList.remove('expanded');
                    }
                });
                
                item.classList.toggle('expanded');
            });

            // Добавляем touch-обработчик для мобильных
            card.addEventListener('touchstart', function(e) {
                e.preventDefault();
                
                scheduleItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('expanded')) {
                        otherItem.classList.remove('expanded');
                    }
                });
                
                item.classList.toggle('expanded');
            });
        });
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

    // Добавляем touch-обработчики для мобильных
    btnMk.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (currentTab === 0 || isTabAnimating) return;
        setActiveTab(0);
    });
    
    btnBattle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (currentTab === 1 || isTabAnimating) return;
        setActiveTab(1);
    });
    
    document.addEventListener('DOMContentLoaded', function() {
        setActiveTab(0);
        initCarousel();
        initSchedule();
        
        // Убираем задержку анимации на мобильных для более быстрого отклика
        setTimeout(() => {
            const splash = document.querySelector('.splash-screen');
            if (splash && getComputedStyle(splash).visibility !== 'hidden') {
                splash.style.visibility = 'hidden';
                splash.style.opacity = '0';
            }
        }, 1500); // Немного уменьшил время для мобильных
    });
    
    setTimeout(() => {
        const splash = document.querySelector('.splash-screen');
        if (splash && getComputedStyle(splash).visibility !== 'hidden') {
            splash.style.visibility = 'hidden';
            splash.style.opacity = '0';
        }
    }, 1700);
})();