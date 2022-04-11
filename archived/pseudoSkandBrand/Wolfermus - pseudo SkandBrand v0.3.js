
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

var pseudoSkandBrandActivate = false
var rageMode = false
var cps = 1000
var reactionTime = 650
var typingSpeed = 100

var togglePseudoSkandBrandRagemode = async function() {
  rageMode = !rageMode
}

var togglePseudoSkandBrandProcess = async function() {
  pseudoSkandBrandActivate = !pseudoSkandBrandActivate
  pseudoSkandBrandProcess()
}

var toggleBtnPseudoSkandBrandProcess = document.createElement("BUTTON");
toggleBtnPseudoSkandBrandProcess.innerHTML = "Toggle Script";
toggleBtnPseudoSkandBrandProcess.onclick = togglePseudoSkandBrandProcess;
document.getElementById("App").appendChild(toggleBtnPseudoSkandBrandProcess);

var toggleBtnPseudoSkandBrandRagemode = document.createElement("BUTTON");
toggleBtnPseudoSkandBrandRagemode.innerHTML = "Toggle Rage Mode";
toggleBtnPseudoSkandBrandRagemode.onclick = togglePseudoSkandBrandRagemode;
document.getElementById("App").appendChild(toggleBtnPseudoSkandBrandRagemode);

var pseudoSkandBrandProcess = async function() {
  if(!pseudoSkandBrandActivate) return;
  if(document.getElementById("WordInput").parentElement.className !== "Hidden") {
    if(!pseudoSkandBrandActivate) return;
    let promptedWord = document.getElementById("StatusContainer").getElementsByClassName("Prompt")[0].innerHTML.toString().toLowerCase()
    let inputWords = database[promptedWord]

    if(!rageMode) cps = 1000

    if(inputWords) {
      if(inputWords[0]) {
        let fullstring = inputWords[Math.floor(Math.random() * inputWords.length)];
        let inputstring = ""
        if(rageMode) {
          cps = 1
          await room.socket.emit("setWord", {
              word: fullstring,
              validate: true,
          });
          document.getElementById("WordInput").value = await "";
        } else {
          await sleep(reactionTime)
          var i;
          for (i = 0; i < fullstring.length; i++) {
              await sleep(typingSpeed)
              inputstring += fullstring[i];
              document.getElementById("WordInput").value = inputstring;
          }
          await sleep(1)
          let wordInput = await document.getElementById("WordInput");
          await room.socket.emit("setWord", {
              word: wordInput.value,
              validate: true,
          });
          wordInput.value = await "";
        }
      }
    }
  }
  if(!pseudoSkandBrandActivate) return;
  setTimeout(pseudoSkandBrandProcess, cps)
}
if(pseudoSkandBrandActivate) pseudoSkandBrandProcess();