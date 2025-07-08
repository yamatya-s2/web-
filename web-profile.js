/*
vanta
*/
VANTA.GLOBE({
  el: "#background",
   mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x6bff3f,
  color2: 0xc8ffe1,
  size: 1.70
})

/*==============================
滑らか移動
==============================*/
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offset = targetElement.getBoundingClientRect().top + window.scrollY;
        const headerOffset = 90; // ← ヘッダーの高さに合わせて変更
        const scrollToPosition = offset - headerOffset;

        window.scrollTo({
          top: scrollToPosition,
          behavior: "smooth"
        });
      }
    });
  });



/*==============================
title切り替え
==============================*/

  document.addEventListener("DOMContentLoaded", () => {
    const titles = document.querySelectorAll(".title-switch");
    let current = 0;

    function switchTitle() {
      titles.forEach((el, index) => {
        el.classList.toggle("active", index === current);
      });

      current = (current + 1) % titles.length;
    }

    switchTitle(); // 初期表示
    setInterval(switchTitle, 10000); // 3秒ごとに切り替え
  });

/*==============================
セクションを隠す/表示する
==============================*/


    window.addEventListener('scroll', () => {
      document.querySelectorAll('.hidden-section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          section.classList.add('visible');
        }
      });
    });

/*==============================
ハンバーガーメニューの開閉
==============================*/
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
  menu.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// メニュークリック時に閉じてスクロール
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if(targetElement){
      const headerHeight = document.querySelector('.header').offsetHeight;
      const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({top: offsetTop, behavior: 'smooth'});
    }
    
    // メニュー閉じる
    menu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// スクロールに合わせてメニューアクティブ切替
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const headerHeight = document.querySelector('.header').offsetHeight;

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY || window.pageYOffset;
  
  let currentSectionId = null;

  // #mein はナビにないのでスキップして判定
  for(let i = 1; i < sections.length; i++){
    const section = sections[i];
    const offsetTop = section.offsetTop - headerHeight - 10;
    const offsetBottom = offsetTop + section.offsetHeight;
    
    if(scrollPos >= offsetTop && scrollPos < offsetBottom){
      currentSectionId = section.id;
      break;
    }
  }

  navLinks.forEach(link => {
    link.classList.remove('active');
    if(link.getAttribute('href') === `#${currentSectionId}`){
      link.classList.add('active');
    }
  });
});
