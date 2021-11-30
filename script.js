const apiUrl =
  "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300";

let guess = document.getElementById("guess");
let number = document.getElementById("number");
let btnSend = document.getElementById("btnSend");
let btnNew = document.getElementById("btnNew");
let message = document.getElementById("message");
let num1 = document.getElementById("number-1");
let num2 = document.getElementById("number-2");
let num3 = document.getElementById("number-3");
let erro = null;
let result = 1;

const httpGetAsync = (url, callback) => {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      erro = null;
      callback(JSON.parse(xmlHttp.responseText));
    } else {
      erro = xmlHttp.status.toString();
    }
  };
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
};

guess.oninput = function () {
  if (this.value > 300) {
    this.value = 300;
  }
};

const callApi = () => {
  httpGetAsync(apiUrl, (response) => {
    result = response.value;
    localStorage.setItem("result", result);
  });
};

callApi();
num2.style.display = "none";
num3.style.display = "none";

btnSend.addEventListener("click", (event) => {
  let value = guess.value;
  num1.setAttribute("class", "num-" + value[0]);
  num2.style.display = "none";
  num3.style.display = "none";
  if (value.length >= 2) {
    num2.style.display = "inline-block";
    num2.setAttribute("class", "num-" + value[1]);
  }
  if (value.length === 3) {
    num3.style.display = "inline-block";
    num3.setAttribute("class", "num-" + value[2]);
  }
  if (erro) {
    message.innerHTML = "ERRO";
    message.style.color = "#CC3300";
    num2.style.display = "inline-block";
    num3.style.display = "inline-block";
    num1.setAttribute("class", "num-" + erro[0]);
    num2.setAttribute("class", "num-" + erro[1]);
    num3.setAttribute("class", "num-" + erro[2]);
    number.style.color = "#CC3300";
    btnNew.style.display = "inline";
    btnSend.disabled = true;
    guess.value = "";
    guess.disabled = true;
  } else if (guess.value > result && guess.value >= 1 && guess.value <= 300) {
    message.innerHTML = "É menor";
  } else if (guess.value < result && guess.value >= 1 && guess.value <= 300) {
    message.innerHTML = "É maior";
  } else if (guess.value == result) {
    message.innerHTML = "Você acertou!!!!";
    message.style.color = "#32BF00";
    number.style.color = "#32BF00";
    btnNew.style.display = "inline";
    btnSend.disabled = true;
    guess.value = "";
    guess.disabled = true;
  } else {
    message.innerHTML = "ERRO";
    message.style.color = "#CC3300";
    num1.setAttribute("class", "num-" + "0");
    num2.setAttribute("class", "num-" + "0");
    num3.setAttribute("class", "num-" + "0");
    number.style.color = "#CC3300";
    btnNew.style.display = "inline";
    btnSend.disabled = true;
    guess.value = "";
    guess.disabled = true;
  }
});

btnNew.addEventListener("click", (event) => {
  callApi();
  message.innerHTML = "";
  message.style.color = "#FF6600";
  number.style.color = "#262A34";
  btnNew.style.display = "none";
  num1.setAttribute("class", "num-" + "0");
  num2.setAttribute("class", "num-" + "0");
  num3.setAttribute("class", "num-" + "0");
  num2.style.display = "none";
  num3.style.display = "none";
  guess.innerHTML = "0";
  btnSend.disabled = false;
  guess.disabled = false;
  erro = false;
});
