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
      elementId: 'teacherCenter'
    },
    {
      id: 'right',
      name: "Татия",
      role: "ТВЕРК",
      bio: "<strong>Тверк Королева</strong> по версии самого масштабного тверк баттла страны. Участница, финалистка, судья баттлов в номинациях ТВЕРК и HIGH HEELS",
      elementId: 'teacherRight'
    },
    {
      id: 'left',
      name: "Тасмания",
      role: "ТВЕРК",
      bio: "<strong>Тверк и Дэнсхолл Королева</strong> по версии самых масштабных танцевальных баттлов страны. Участница 3 сезона проекта <strong>ТАНЦЫ НА ТНТ</strong>",
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

      if (activeId === 'left') leftItem.classList.add('active');
      else if (activeId === 'center') centerItem.classList.add('active');
      else if (activeId === 'right') rightItem.classList.add('active');

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
    document.querySelectorAll('.schedule-list li').forEach(item => {
      const desc = item.dataset.description;
      const descDiv = item.querySelector('.event-description');
      if (desc && descDiv) descDiv.textContent = desc;

      const card = item.querySelector('.schedule-card');
      if (card) {
        card.addEventListener('click', (e) => {
          e.stopPropagation();
          item.classList.toggle('expanded');
        });
      }
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

  document.addEventListener('DOMContentLoaded', function() {
    setActiveTab(0);
    initCarousel();
    initSchedule();
  });

  setTimeout(() => {
    const splash = document.querySelector('.splash-screen');
    if (splash && getComputedStyle(splash).visibility !== 'hidden') {
      splash.style.visibility = 'hidden';
      splash.style.opacity = '0';
    }
  }, 1700);

  // ========== ОБРАБОТКА СВАЙПОВ ==========
  const slider = document.querySelector('.content-slider');
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  const minSwipeDistance = 50;

  if (slider) {
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      const deltaX = Math.abs(touch.screenX - touchStartX);
      const deltaY = Math.abs(touch.screenY - touchStartY);
      // если движение больше по горизонтали, чем по вертикали, предотвращаем скролл страницы
      if (deltaX > deltaY && deltaX > 10) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) < minSwipeDistance) return;

    if (deltaX > 0) {
      // свайп вправо → панель мастер-классов
      if (currentTab !== 0 && !isTabAnimating) {
        setActiveTab(0);
      }
    } else {
      // свайп влево → панель баттлов
      if (currentTab !== 1 && !isTabAnimating) {
        setActiveTab(1);
      }
    }
  }
  // ========== КОНЕЦ ОБРАБОТКИ СВАЙПОВ ==========
})();