let year = 2030;
let turn = 1;

let carbon = 20;
let happy = 100;
let power = 70;
let demand = 50;
let money = 700;

let selectedPolicy = null;

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

/* BIG EVENT */

function showBigEvent(title, desc){

  const event =
  document.getElementById("bigEvent");

  document.getElementById(
    "bigEventTitle"
  ).innerHTML = title;

  document.getElementById(
    "bigEventDesc"
  ).innerHTML = desc;

  event.style.display = "block";

  setTimeout(()=>{

    event.style.display = "none";

  },2500);

}

/* UPDATE */

function updateUI(){

  yearText.innerHTML = year;

  turnText.innerHTML = turn;

  carbonText.innerHTML = carbon;

  happyText.innerHTML = happy;

  powerText.innerHTML = power;

  demandText.innerHTML = demand;

  moneyText.innerHTML = money;

  chart.data.labels.push(year);

  chart.data.datasets[0].data.push(carbon);

  chart.data.datasets[1].data.push(happy);

  chart.update();

}

/* POLICY */

function selectPolicy(policy, element){

  selectedPolicy = policy;

  document
  .querySelectorAll(".policy-card")
  .forEach(card=>{

    card.classList.remove("selected");

  });

  element.classList.add("selected");

}

/* TURN */

function nextTurn(){

  if(selectedPolicy == null){

    addFeed(
      "❌ 정책을 선택하세요."
    );

    return;
  }

  year++;
  turn++;

  if(selectedPolicy === "solar"){

    money -= 80;

    carbon -= 15;

    happy += 10;

    cityImage.className =
    "greenEffect";

    showBigEvent(

      "☀ 친환경 정책 시행",

      "시민들이 깨끗해진 하늘에 환호합니다."

    );

    addFeed(
      "🌱 시민 만족도 증가"
    );

  }

  if(selectedPolicy === "industry"){

    money += 150;

    carbon += 20;

    happy -= 10;

    cityImage.className =
    "pollutionEffect";

    showBigEvent(

      "🏭 산업 개발 강행",

      "도시는 성장했지만 대기오염이 심화됩니다."

    );

    addFeed(
      "😷 시민들이 공해를 걱정합니다."
    );

  }

  if(selectedPolicy === "green"){

    money -= 50;

    carbon -= 10;

    happy += 15;

    cityImage.className =
    "greenEffect";

    showBigEvent(

      "🌳 도시 녹화 성공",

      "공원이 늘어나며 시민 행복도가 상승합니다."

    );

    addFeed(
      "🌳 도시 공원 확대"
    );

  }

  if(selectedPolicy === "nuclear"){

    money -= 100;

    power += 30;

    carbon -= 10;

    happy -= 5;

    cityImage.className =
    "futureEffect";

    showBigEvent(

      "⚛ 원자력 시대 개막",

      "안정적인 전력 공급이 시작됩니다."

    );

    addFeed(
      "⚡ 시민들이 미래 도시를 기대합니다."
    );

  }

  updateUI();

  selectedPolicy = null;

}

/* BUTTON */

document
.getElementById("confirmButton")
.onclick = nextTurn;

updateUI();
