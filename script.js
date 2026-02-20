
(function() {
  const btnMk = document.getElementById('btnMk');
  const btnBattle = document.getElementById('btnBattle');
  const slidePanel = document.getElementById('slidePanel');
  let currentIndex = 0; // 0 - мастер-классы, 1 - баттлы

  function setActiveTab(index) {
    btnMk.classList.remove('active');
    btnBattle.classList.remove('active');
    if (index === 0) {
      btnMk.classList.add('active');
      slidePanel.style.transform = 'translateX(0%)';
    } else {
      btnBattle.classList.add('active');
      slidePanel.style.transform = 'translateX(-100%)';
    }
    currentIndex = index;
  }

  btnMk.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentIndex === 0) return;
    setActiveTab(0);
  });

  btnBattle.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentIndex === 1) return;
    setActiveTab(1);
  });

  setActiveTab(0); // по умолчанию первая

  // запасное исчезновение заставки
  setTimeout(() => {
    const splash = document.querySelector('.splash-screen');
    if (splash && getComputedStyle(splash).visibility !== 'hidden') {
      splash.style.visibility = 'hidden';
      splash.style.opacity = '0';
    }
  }, 1700);
})();
