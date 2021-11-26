const apiUrl =
  "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300";

let guess = document.getElementById("guess");
let number = document.getElementById("number");
let btnSend = document.getElementById("btnSend");
let btnNew = document.getElementById("btnNew");
let message = document.getElementById("message");
let result = 1;

const httpGetAsync = (url, callback) => {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(JSON.parse(xmlHttp.responseText));
  };
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
};

guess.oninput = function () {
  if (this.value > 400) {
    this.value = 400;
  }
};

const callApi = () => {
  httpGetAsync(apiUrl, (response) => {
    result = response.value;
    localStorage.setItem("result", result);
  });
};

callApi();

btnSend.addEventListener("click", (event) => {
  number.innerHTML = guess.value;
  if (result == 502) {
    message.innerHTML = "ERRO";
    message.style.color = "#CC3300";
    number.innerHTML = "502";
    number.style.color = "#CC3300";
    btnNew.style.display = "inline";
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
  } else {
    message.innerHTML = "ERRO";
    message.style.color = "#CC3300";
    number.innerHTML = "502";
    number.style.color = "#CC3300";
    btnNew.style.display = "inline";
    btnSend.disabled = true;
  }
});

btnNew.addEventListener("click", (event) => {
  callApi();
  message.innerHTML = "";
  message.style.color = "black";
  number.style.color = "black";
  btnNew.style.display = "none";
  number.innerHTML = "0";
  guess.innerHTML = "0";
  btnSend.disabled = false;
});
