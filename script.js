/* =========================
   CARBON COLLAPSE
========================= */

/* STATE */

let year = 2030;
let turn = 1;
let maxTurn = 10;

let carbon = 20;
let happy = 100;
let power = 70;
let money = 700;

/* 세력 */

let eco = 50;
let corp = 50;
let citizen = 50;

/* 선택 카드 */

let selectedCard = null;

/* 후폭풍 */

let delayedEffects = [];

/* DOM */

const yearText =
document.getElementById("yearText");

const turnText =
document.getElementById("turnText");

const carbonText =
document.getElementById("carbonText");

const happyText =
document.getElementById("happyText");

const powerText =
document.getElementById("powerText");

const moneyText =
document.getElementById("moneyText");

const feed =
document.getElementById("feed");

const cityImage =
document.getElementById("cityImage");

const cityState =
document.getElementById("cityState");

const routeText =
document.getElementById("routeText");

const ecoBar =
document.getElementById("ecoBar");

const corpBar =
document.getElementById("corpBar");

const citizenBar =
document.getElementById("citizenBar");

const cardsArea =
document.getElementById("cardsArea");

const selectedCardText =
document.getElementById("selectedCardText");

const eventBox =
document.getElementById("eventBox");

/* =========================
   안전한 그래프 생성
========================= */

const chartCanvas =
document.getElementById("mainChart");

let chart = null;

if(chartCanvas){

  chart = new Chart(

    chartCanvas,

    {

      type:"line",

      data:{

        labels:["2030"],

        datasets:[

          {

            label:"탄소",

            data:[carbon]

          },

          {

            label:"행복",

            data:[happy]

          }

        ]

      }

    }

  );

}

/* =========================
   카드 데이터
========================= */

const allCards = [

  {

    id:"solar",

    title:"☀ 태양광 발전",

    desc:"친환경 에너지 투자",

    cost:80,

    effect(){

      money -= 80;

      carbon -= 15;

      happy += 10;

      eco += 10;

      cityImage.className =
      "greenMode";

      showNews(

        "☀ 친환경 정책 시행",

        "시민들이 깨끗해진 하늘에 환호합니다."

      );

      addFeed(
        "🌱 시민들이 친환경 정책을 환영합니다."
      );

      delayedEffects.push({

        turn:2,

        text:"☀ 태양광 발전소 완공",

        effect(){

          power += 20;

        }

      });

    }

  },

  {

    id:"industry",

    title:"🏭 산업단지 확대",

    desc:"경제 성장 중심",

    cost:0,

    effect(){

      money += 150;

      carbon += 20;

      happy -= 15;

      corp += 15;

      eco -= 10;

      cityImage.className =
      "pollutionMode";

      showNews(

        "🏭 산업 성장",

        "경제는 성장했지만 공기가 나빠졌습니다."

      );

      addFeed(
        "😷 시민들이 대기오염을 걱정합니다."
      );

      delayedEffects.push({

        turn:3,

        text:"🌫 미세먼지 폭증",

        effect(){

          happy -= 10;

          carbon += 10;

        }

      });

    }

  },

  {

    id:"green",

    title:"🌳 도시 녹화",

    desc:"공원 확대 정책",

    cost:50,

    effect(){

      money -= 50;

      happy += 18;

      carbon -= 10;

      eco += 8;

      citizen += 10;

      cityImage.className =
      "greenMode";

      showNews(

        "🌳 녹색 도시 프로젝트",

        "시민 만족도가 증가했습니다."

      );

      addFeed(
        "🌳 시민들이 공원 확대를 환영합니다."
      );

    }

  },

  {

    id:"nuclear",

    title:"⚛ 원자력 확대",

    desc:"안정적 전력 공급",

    cost:100,

    effect(){

      money -= 100;

      power += 35;

      carbon -= 8;

      corp += 5;

      citizen -= 5;

      cityImage.className =
      "futureMode";

      showNews(

        "⚛ 원자력 시대",

        "전력 공급이 안정화되었습니다."

      );

      addFeed(
        "⚡ 시민들이 원전 안전성을 우려합니다."
      );

      if(Math.random() < 0.15){

        carbon += 20;

        happy -= 25;

        showNews(

          "☢ 원전 사고 발생",

          "도시가 방사능 공포에 빠졌습니다."

        );

      }

    }

  },

  {

    id:"subway",

    title:"🚇 지하철 확장",

    desc:"교통 효율 증가",

    cost:120,

    effect(){

      money -= 120;

      carbon -= 12;

      happy += 12;

      eco += 5;

      citizen += 5;

      showNews(

        "🚇 대중교통 혁신",

        "교통 체증이 감소했습니다."

      );

      addFeed(
        "🚇 시민들이 이동 편의를 체감합니다."
      );

    }

  },

  {

    id:"coal",

    title:"🛢 석탄 보조금",

    desc:"빠른 산업 성장",

    cost:0,

    effect(){

      money += 200;

      carbon += 30;

      happy -= 20;

      corp += 20;

      eco -= 20;

      cityImage.className =
      "pollutionMode";

      showNews(

        "🛢 화석연료 의존 증가",

        "경제는 성장했지만 탄소가 급증합니다."

      );

      addFeed(
        "🌫 시민들이 건강 악화를 호소합니다."
      );

    }

  }

];

/* =========================
   뉴스 팝업
========================= */

function showNews(title, desc){

  const news =
  document.getElementById("breakingNews");

  document.getElementById(
    "newsTitle"
  ).innerHTML = title;

  document.getElementById(
    "newsDesc"
  ).innerHTML = desc;

  news.style.display = "block";

  setTimeout(()=>{

    news.style.display = "none";

  },2500);

}

/* =========================
   시민 로그
========================= */

function addFeed(text){

  const item =
  document.createElement("div");

  item.className =
  "feed-item";

  item.innerHTML =
  text;

  feed.prepend(item);

}

/* =========================
   카드 생성
========================= */

function generateCards(){

  cardsArea.innerHTML = "";

  let shuffled =
  [...allCards]
  .sort(()=>Math.random()-0.5)
  .slice(0,3);

  shuffled.forEach(card=>{

    const div =
    document.createElement("div");

    div.className =
    "policy-card";

    div.innerHTML = `

      <h3>${card.title}</h3>

      <p>${card.desc}</p>

      <div class="card-info">

        <div>💰 비용 : ${card.cost}억</div>

      </div>

    `;

    div.onclick = ()=>{

      document
      .querySelectorAll(".policy-card")
      .forEach(c=>{

        c.classList.remove("selected");

      });

      div.classList.add("selected");

      selectedCard = card;

      selectedCardText.innerHTML =
      card.title;

    };

    cardsArea.appendChild(div);

  });

}

/* =========================
   랜덤 사건
========================= */

function randomEvent(){

  let r =
  Math.floor(Math.random()*5);

  if(r === 0){

    carbon += 10;

    eventBox.innerHTML =
    "☀ 폭염으로 전력 사용량 증가";

  }

  if(r === 1){

    money -= 80;

    eventBox.innerHTML =
    "⛈ 태풍 피해 발생";

  }

  if(r === 2){

    happy -= 15;

    eventBox.innerHTML =
    "😡 시민 시위 발생";

  }

  if(r === 3){

    carbon += 15;

    eventBox.innerHTML =
    "🌫 미세먼지 경보";

  }

  if(r === 4){

    money += 100;

    eventBox.innerHTML =
    "📈 경제 호황";

  }

}

/* =========================
   후폭풍 처리
========================= */

function processDelayed(){

  delayedEffects.forEach(effect=>{

    effect.turn--;

    if(effect.turn <= 0){

      effect.effect();

      addFeed(effect.text);

      showNews(

        "⏳ 장기 영향 발생",

        effect.text

      );

    }

  });

  delayedEffects =
  delayedEffects.filter(
    e=>e.turn > 0
  );

}

/* =========================
   UI 업데이트
========================= */

function updateUI(){

  yearText.innerHTML = year;

  turnText.innerHTML = turn;

  carbonText.innerHTML = carbon;

  happyText.innerHTML = happy;

  powerText.innerHTML = power;

  moneyText.innerHTML = money;

  ecoBar.style.width =
  eco + "%";

  corpBar.style.width =
  corp + "%";

  citizenBar.style.width =
  citizen + "%";

  /* 그래프 */

  if(chart){

    chart.data.labels.push(year);

    chart.data.datasets[0].data.push(carbon);

    chart.data.datasets[1].data.push(happy);

    chart.update();

  }

  /* 상태 변화 */

  if(carbon >= 80){

    cityState.innerHTML =
    "CLIMATE COLLAPSE";

    cityImage.className =
    "disasterMode";

    routeText.innerHTML =
    "🌫 기후 붕괴 도시";

  }

  else if(happy <= 30){

    cityState.innerHTML =
    "CIVIL UNREST";

    routeText.innerHTML =
    "😡 시민 불안 도시";

  }

  else if(carbon <= 20){

    cityState.innerHTML =
    "GREEN CITY";

    routeText.innerHTML =
    "🌿 친환경 미래도시";

  }

  else if(money >= 1200){

    cityState.innerHTML =
    "MEGA INDUSTRY";

    routeText.innerHTML =
    "🏭 산업 초강대국";

  }

  else{

    cityState.innerHTML =
    "NORMAL";

    routeText.innerHTML =
    "🏙 균형 발전 도시";

  }

}

/* =========================
   게임 오버
========================= */

function endGame(title, desc){

  document
  .getElementById("gameOverScreen")
  .style.display = "flex";

  document
  .getElementById("gameOverTitle")
  .innerHTML = title;

  document
  .getElementById("gameOverDesc")
  .innerHTML = desc;

}

/* =========================
   턴 진행
========================= */

function nextTurn(){

  if(selectedCard == null){

    addFeed(
      "❌ 정책을 선택하세요."
    );

    return;
  }

  if(money < selectedCard.cost){

    showNews(

      "💸 예산 부족",

      "해당 정책을 실행할 수 없습니다."

    );

    return;
  }

  year++;

  turn++;

  selectedCard.effect();

  processDelayed();

  randomEvent();

  /* 정전 */

  if(power <= 20){

    happy -= 20;

    cityImage.className =
    "blackoutMode";

    showNews(

      "⚡ 대규모 정전",

      "도시 전체 전력이 부족합니다."

    );

  }

  updateUI();

  selectedCard = null;

  selectedCardText.innerHTML =
  "선택된 정책 없음";

  generateCards();

  /* 엔딩 */

  if(carbon >= 100){

    endGame(

      "🌍 GAME OVER",

      "기후 붕괴로 도시가 파괴되었습니다."

    );

  }

  if(happy <= 0){

    endGame(

      "😡 GAME OVER",

      "시민 혁명이 발생했습니다."

    );

  }

  if(turn > maxTurn){

    if(carbon <= 25){

      endGame(

        "🌿 GREEN ENDING",

        "세계 최고의 친환경 도시가 되었습니다."

      );

    }

    else if(money >= 1200){

      endGame(

        "🏭 INDUSTRY ENDING",

        "초거대 산업 국가로 성장했습니다."

      );

    }

    else{

      endGame(

        "🏙 NORMAL ENDING",

        "평범한 도시로 남았습니다."

      );

    }

  }

}

/* =========================
   버튼 연결
========================= */

document
.getElementById("confirmButton")
.onclick = nextTurn;

/* =========================
   시작
========================= */

generateCards();

updateUI();
