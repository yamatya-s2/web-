// Vanta.js 背景初期化
let vantaEffect = VANTA.NET({
  el: "#hello",
  mouseControls: true,
  touchControls: false,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0xffffff,
  backgroundColor: 0x000000,
  points: 15.00,
  maxDistance: 29.00,
  spacing: 18.00
});

// === 背景色のサイン波アニメーション ===
let t = 0;
function animateColor() {
  const r = Math.floor(128 + 127 * Math.sin(t));
  const g = Math.floor(128 + 127 * Math.sin(t + 2));
  const b = Math.floor(128 + 127 * Math.sin(t + 4));
  const distance = Math.floor(20 + 10 * Math.sin(t * 5));

  const hexColor = (r << 16) | (g << 8) | b;
  vantaEffect.setOptions({ color: hexColor, maxDistance: distance });

  t += 0.001;
  requestAnimationFrame(animateColor);
}
animateColor();


//============
//起動
//============



window.onload = function boot() {
  const boot = document.querySelector('.boot-screen');
  const progress = document.querySelector('.progress');

  // boot画面を再表示
  boot.style.opacity = "1";
  boot.style.visibility = "visible";
  boot.style.animation = "none";
  void boot.offsetWidth;

  // プログレスバーをいったん0%に
  progress.style.transition = "none";
  progress.style.width = "0%";
  void progress.offsetWidth; 
   
  progress.style.transition = "width 0.8s ease-in-out";
 
   
  setTimeout(() => {
    progress.style.width = "100%";
  }, 20);

  boot.style.animation = "fadeOut 1s ease forwards";
  boot.style.animationDelay = "2s";
}


function reboot() {
  const boot = document.querySelector('.boot-screen');
  const progress = document.querySelector('.progress');

  // boot画面を再表示
  boot.style.opacity = "1";
  boot.style.visibility = "visible";
  boot.style.animation = "none";
  void boot.offsetWidth;

  // プログレスバーをいったん0%に
  progress.style.transition = "none";
  progress.style.width = "0%";
  void progress.offsetWidth; // 強制再描画

  // ここでtransitionを再設定して
  progress.style.transition = "width 0.8s ease-in-out";
　
  setTimeout(() => {
    progress.style.width = "100%";
  }, 20); 
  boot.style.animation = "fadeOut 1s ease forwards";
  boot.style.animationDelay = "2s";
}

//============
//ヘッダー
//============
const header = document.getElementById("header-box");
const trigger = document.getElementById("header-trigger");
const placeholder = document.getElementById("placeholder");

function updatePlaceholderHeight() {
  placeholder.style.height = header.offsetHeight + "px";
}

updatePlaceholderHeight();

window.addEventListener('resize', updatePlaceholderHeight);

const observer = new IntersectionObserver(([entry]) => {
  const isAtTop = window.scrollY === 0;

  if (!entry.isIntersecting && !isAtTop) {

     
    header.classList.add("fixed");
    placeholder.classList.add("active");
  } else {

    header.classList.remove("fixed");
    placeholder.classList.remove("active");
  }
}, {
  threshold: 0,
  rootMargin: '0px 0px 0px 0px'
});

observer.observe(trigger);




//============
//サイトコマンド
//============


function hack_page(){
document.body.contentEditable = true;
document.designMode = 'on';
};





// 初期の <style> タグ作成
const styleTag = document.createElement('style');
styleTag.id = 'selection-style';
document.head.appendChild(styleTag);

function rainbowColor(t) {
  const h = t % 360;
  return `hsl(${h}, 100%, 50%)`;
}

let selectionT = 0;
let selectionInterval = null;

function startRainbowSelection() {
  if (selectionInterval) return;

  selectionInterval = setInterval(() => {
    const color = rainbowColor(selectionT);
    styleTag.textContent = `
      ::selection {
        background: ${color};
        color: white;
      }
    `;
    selectionT += 3;
  }, 100);
}

function stopRainbowSelection() {
  clearInterval(selectionInterval);
  selectionInterval = null;
  styleTag.textContent = '';
}

// スイッチの切り替えに対応
document.getElementById('selectionToggleSwitch').addEventListener('change', (e) => {
  const label = document.getElementById('magicLabel');

  if (e.target.checked) {
    startRainbowSelection();
    label.textContent = '魔法ON!!';
  } else {
    stopRainbowSelection();
    label.textContent = '魔法OFF';
  }
});














const messages = [
  "★━━━━━━━━━‥・",
  "これすき",
  "うぽつ",
  "草",
  "www",
  "!?",
  "(◠ڼ◠)"
];
document.getElementById("summonBtn").addEventListener("click", () => {
  const container = document.getElementById("marqueeContainer");
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  // テキスト要素作成
  const text = document.createElement("div");
  text.className = "marquee-text";
  text.textContent = randomMessage;

  // ★ ビューポートに基づいたY座標で召喚
  const viewportTop = window.scrollY;
  const viewportBottom = viewportTop + window.innerHeight;
  const y = Math.floor(Math.random() * (viewportBottom - viewportTop - 30)) + viewportTop;
  text.style.top = `${y}px`;

  text.style.color = getRandomColor();

  container.appendChild(text);

  text.addEventListener("animationend", () => {
    container.removeChild(text);
  });
});

// ランダムカラー生成
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
}
