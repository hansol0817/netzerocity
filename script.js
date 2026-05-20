let year = 2030;
let turn = 1;
let maxTurn = 10;

let carbon = 20;
let happy = 100;
let power = 70;
let demand = 50;
let money = 700;

let selectedPolicy = null;

let delayedEffects = [];

/* ELEMENT */

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

const demandText =
document.getElementById("demandText");

const moneyText =
document.getElementById("moneyText");

const feed =
document.getElementById("feed");

const cityImage =
document.getElementById("cityImage");

const cityState =
document.getElementById("cityState");

const selectedPolicyText =
document.getElementById("selectedPolicyText");

const gameOverScreen =
document.getElementById("gameOverScreen");

const gameOverReason =
document.getElementById("gameOverReason");

/* POPUP */

function showPopup(title, desc){

  document.getElementById("eventPopup")
  .style.display = "flex";

  document.getElementById("popupTitle")
  .innerHTML = title;

  document.getElementById("popupDesc")
  .innerHTML = desc;

}

function closePopup(){

  document.getElementById("eventPopup")
  .style.display = "none";

}

/* GRAPH */

const chart =
new Chart(

  document.getElementById("chart"),

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

/* FEED */

function addFeed(text){

  const item =
  document.createElement("div");

  item.className =
  "feed-item";

  item.innerHTML =
  text;

  feed.prepend(item);

}

/* UPDATE UI */

function updateUI(){

  yearText.innerHTML = year;

  turnText.innerHTML = turn;

  carbonText.innerHTML = carbon;

  happyText.innerHTML = happy;

  powerText.innerHTML = power;

  demandText.innerHTML = demand;

  moneyText.innerHTML = money;

  /* GRAPH */

  chart.data.labels.push(year);

  chart.data.datasets[0].data.push(carbon);

  chart.data.datasets[1].data.push(happy);

  chart.update();

  /* 도시 상태 */

  if(carbon >= 80 || happy <= 20){

    cityImage.src =
    "https://images.unsplash.com/photo-1519501025264-65ba15a82390";

    cityState.innerHTML =
    "CLIMATE COLLAPSE";

    document.body.style.background =
    "#240909";

  }

  else if(power < demand){

    cityImage.src =
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a";

    cityState.innerHTML =
    "BLACKOUT";

    document.body.style.background =
    "#050b14";

  }

  else if(money >= 1200){

    cityImage.src =
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000";

    cityState.innerHTML =
    "MEGA CITY";

    document.body.style.background =
    "#071b2d";

  }

  else if(carbon <= 20 && happy >= 120){

    cityImage.src =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb";

    cityState.innerHTML =
    "GREEN CITY";

    document.body.style.background =
    "#071d10";

  }

  else{

    cityImage.src =
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df";

    cityState.innerHTML =
    "NORMAL";

    document.body.style.background =
    "#050b14";

  }

}

/* 정책 선택 */

function selectPolicy(policy, element){

  let cost = 0;

  if(policy === "solar") cost = 80;
  if(policy === "green") cost = 50;
  if(policy === "nuclear") cost = 100;

  if(money < cost){

    addFeed(
      "💸 예산 부족으로 정책 실행 불가"
    );

    return;
  }

  selectedPolicy = policy;

  document
  .querySelectorAll(".policy-card")
  .forEach(card=>{

    card.classList.remove("selected");

  });

  element.classList.add("selected");

  selectedPolicyText.innerHTML =
  "선택 정책 : " + policy;

}

/* 랜덤 사건 */

function randomEvent(){

  const random =
  Math.floor(Math.random()*4);

  if(random === 0){

    demand += 15;

    happy -= 5;

    addFeed(
      "☀ 폭염으로 냉방 수요 급증"
    );

    showPopup(
      "☀ 폭염 발생",
      "전력 수요가 급증했습니다.<br>행복도 -5"
    );

  }

  if(random === 1){

    carbon += 10;

    addFeed(
      "🌫 미세먼지 경보 발령"
    );

    showPopup(
      "🌫 대기 오염 증가",
      "탄소 배출량이 증가했습니다."
    );

  }

  if(random === 2){

    money -= 100;

    addFeed(
      "⛈ 태풍 피해로 복구비 발생"
    );

    showPopup(
      "⛈ 태풍 상륙",
      "도시 시설이 파괴되었습니다.<br>복구비 -100억"
    );

  }

  if(random === 3){

    if(carbon >= 50){

      money -= 150;

      addFeed(
        "🌍 국제 탄소 벌금 부과"
      );

      showPopup(
        "🌍 국제 협약 위반",
        "탄소 배출 초과로 벌금 부과<br>-150억"
      );

    }

  }

}

/* 업그레이드 */

function buyUpgrade(type){

  if(type === "smart"){

    if(money < 150){

      addFeed("💸 예산 부족");

      return;
    }

    money -= 150;

    power += 20;

    addFeed(
      "⚡ 스마트그리드 구축 완료"
    );

    showPopup(
      "⚡ 스마트그리드",
      "전력 효율이 증가했습니다!"
    );

  }

  if(type === "capture"){

    if(money < 200){

      addFeed("💸 예산 부족");

      return;
    }

    money -= 200;

    carbon -= 25;

    addFeed(
      "🌱 탄소 포집 시설 가동"
    );

    showPopup(
      "🌱 탄소 포집 성공",
      "탄소 배출량이 크게 감소했습니다."
    );

  }

  updateUI();

}

/* NEXT TURN */

function nextTurn(){

  if(selectedPolicy === null){

    addFeed(
      "❌ 정책을 선택하세요."
    );

    return;
  }

  year += 1;

  turn += 1;

  demand += 5;

  money -= 20;

  /* 장기효과 */

  delayedEffects.forEach(effect=>{

    effect.turn--;

    if(effect.turn <= 0){

      power += effect.power;

      carbon += effect.carbon;

      addFeed(effect.text);

      showPopup(
        "🏗 프로젝트 완료",
        effect.text
      );

    }

  });

  delayedEffects =
  delayedEffects.filter(
    effect => effect.turn > 0
  );

  /* 정책 효과 */

  if(selectedPolicy === "solar"){

    money -= 80;

    carbon -= 10;

    happy += 5;

    delayedEffects.push({

      turn:3,

      power:25,

      carbon:-5,

      text:"☀ 태양광 발전소 완공"

    });

    addFeed(
      "☀ 친환경 발전 투자 진행"
    );

    showPopup(
      "☀ 태양광 정책 실행",
      "탄소 감소<br>3턴 후 발전소 완공 예정"
    );

  }

  if(selectedPolicy === "industry"){

    money += 150;

    power -= 15;

    carbon += 20;

    happy -= 10;

    addFeed(
      "🏭 시민들이 공기 질 악화를 걱정합니다."
    );

    showPopup(
      "🏭 산업단지 확대",
      "경제 성장<br>탄소 증가"
    );

  }

  if(selectedPolicy === "green"){

    money -= 50;

    carbon -= 10;

    happy += 15;

    addFeed(
      "🌳 시민들이 공원 확대를 환영합니다."
    );

    showPopup(
      "🌳 도시 녹화",
      "행복도 증가<br>탄소 감소"
    );

  }

  if(selectedPolicy === "nuclear"){

    money -= 100;

    power += 30;

    carbon -= 10;

    happy -= 8;

    addFeed(
      "⚛ 원전 안전성 논란 발생"
    );

    showPopup(
      "⚛ 원자력 확대",
      "전력 공급 증가<br>시민 불안 증가"
    );

  }

  /* 전력 부족 */

  if(power < demand){

    happy -= 20;

    addFeed(
      "⚡ 대규모 정전 발생!"
    );

    showPopup(
      "⚡ BLACKOUT",
      "전력이 부족합니다.<br>시민 불만 폭증"
    );

  }

  randomEvent();

  updateUI();

  /* 초기화 */

  selectedPolicy = null;

  selectedPolicyText.innerHTML =
  "선택된 정책 없음";

  document
  .querySelectorAll(".policy-card")
  .forEach(card=>{

    card.classList.remove("selected");

  });

  /* GAME OVER */

  if(carbon >= 100){

    endGame(
      "🌍 기후 붕괴 엔딩"
    );

  }

  if(happy <= 0){

    endGame(
      "😡 시민 혁명 엔딩"
    );

  }

  if(money <= -300){

    endGame(
      "💸 도시 파산 엔딩"
    );

  }

  if(turn > maxTurn){

    if(carbon <= 30){

      endGame(
        "🌿 친환경 미래도시 엔딩"
      );

    }

    else if(money >= 1000){

      endGame(
        "🏭 산업 초강대국 엔딩"
      );

    }

    else{

      endGame(
        "🏙 평범한 도시 엔딩"
      );

    }

  }

}

/* GAME OVER */

function endGame(reason){

  gameOverScreen.style.display =
  "flex";

  gameOverReason.innerHTML =
  reason;

}

/* BUTTON */

document
.getElementById("confirmButton")
.onclick = nextTurn;

/* START */

updateUI();
