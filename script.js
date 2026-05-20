let year = 2030;
let turn = 1;

let carbon = 20;
let happy = 100;
let power = 70;
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

/* 시민 반응 중앙 팝업 */

function showCitizenPopup(title, text){

  const popup =
  document.getElementById("citizenPopup");

  document.getElementById(
    "popupTitle"
  ).innerHTML = title;

  document.getElementById(
    "popupText"
  ).innerHTML = text;

  popup.style.display = "block";

  setTimeout(()=>{

    popup.style.display = "none";

  },2500);

}

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

/* UPDATE */

function updateUI(){

  yearText.innerHTML = year;

  turnText.innerHTML = turn;

  carbonText.innerHTML = carbon;

  happyText.innerHTML = happy;

  powerText.innerHTML = power;

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

/* NEXT TURN */

function nextTurn(){

  if(selectedPolicy == null){

    addFeed(
      "❌ 정책을 선택하세요."
    );

    return;
  }

  year++;
  turn++;

  /* 태양광 */

  if(selectedPolicy === "solar"){

    money -= 80;

    carbon -= 15;

    happy += 10;

    cityImage.className =
    "greenEffect";

    showCitizenPopup(

      "☀ 시민 반응",

      "“하늘이 훨씬 깨끗해졌어요!”<br><br>시민 만족도 증가"

    );

    addFeed(
      "🌱 시민들이 친환경 정책을 환영합니다."
    );

  }

  /* 산업단지 */

  if(selectedPolicy === "industry"){

    money += 150;

    carbon += 20;

    happy -= 10;

    cityImage.className =
    "pollutionEffect";

    showCitizenPopup(

      "🏭 시민 반응",

      "“돈은 벌리는데 공기가 너무 안 좋아...”"

    );

    addFeed(
      "😷 시민들이 대기오염을 걱정합니다."
    );

  }

  /* 도시녹화 */

  if(selectedPolicy === "green"){

    money -= 50;

    carbon -= 10;

    happy += 15;

    cityImage.className =
    "greenEffect";

    showCitizenPopup(

      "🌳 시민 반응",

      "“공원이 많아져서 산책하기 좋아요!”"

    );

    addFeed(
      "🌳 시민 행복도가 증가했습니다."
    );

  }

  /* 원자력 */

  if(selectedPolicy === "nuclear"){

    money -= 100;

    power += 30;

    carbon -= 10;

    happy -= 5;

    cityImage.className =
    "futureEffect";

    showCitizenPopup(

      "⚛ 시민 반응",

      "“전기는 안정적이지만 조금 불안해요...”"

    );

    addFeed(
      "⚡ 시민들이 원전 안전성을 걱정합니다."
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
