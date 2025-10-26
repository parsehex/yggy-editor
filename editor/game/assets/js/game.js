(() => {
  // game/src/state.ts
  var state = {
    currentDialogueID: null
  };
  var state_default = state;

  // game/src/data/index.ts
  var data = {
    dialogue: null,
    images: null,
    choices: null,
    characters: null,
    backgrounds: null,
    frames: null,
    meta: null
  };
  var data_default = data;

  // game/src/data/get.ts
  function getData(type, id) {
    const list = data_default[type];
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  // game/src/elements.ts
  var elements = {
    doc: null,
    bg: null,
    charName: null,
    char1Img: null,
    char2Img: null,
    dialogueText: null,
    choicesDiv: null,
    continueInd: null
  };
  var elements_default = elements;
  function initElements() {
    const iframe = document.querySelector("iframe");
    elements.doc = iframe ? iframe.contentDocument : document;
    elements.bg = elements.doc.getElementById("background");
    elements.charName = elements.doc.getElementById("character-name");
    elements.char1Img = elements.doc.getElementById("character1");
    elements.char2Img = elements.doc.getElementById("character2");
    elements.dialogueText = elements.doc.querySelector("#dialogue-box .text");
    elements.choicesDiv = elements.doc.getElementById("choices");
    elements.continueInd = elements.doc.getElementById("continue-indicator");
  }

  // game/src/draw/character.ts
  function drawCharacter(id, frameIndex, pos) {
    let ch;
    const charImg = pos === "left" ? elements_default.char1Img : elements_default.char2Img;
    if (id === null) {
      elements_default.charName.classList.add("hidden");
      charImg.classList.add("hidden");
      return;
    } else {
      ch = getData("characters", id);
      elements_default.charName.classList.remove("hidden");
    }
    if (frameIndex === null) {
      charImg.classList.add("hidden");
    } else {
      const frame = getData("frames", ch.frames[frameIndex]);
      const frameImg = getData("images", frame.imageID);
      charImg.src = `/game-data/images/${frameImg.filename}`;
      charImg.classList.remove("hidden");
    }
  }

  // game/src/draw/index.ts
  function drawScene() {
    const d = getData("dialogue", state_default.currentDialogueID);
    const bg = getData("backgrounds", d.backgroundID);
    const bgImg = getData("images", bg.imageID);
    elements_default.bg.style.backgroundImage = `url(/game-data/images/${bgImg.filename})`;
    elements_default.bg.style.backgroundColor = bg.bgColor;
    drawCharacter(d.character1ID, d.character1FrameIndex, "left");
    drawCharacter(d.character2ID, d.character2FrameIndex, "right");
    elements_default.dialogueText.textContent = d.text;
    resetChoices();
    let allHidden = true;
    for (const choiceID of d.choices) {
      const c = getData("choices", choiceID);
      addChoice(c.text, choiceID);
      if (c.text.length > 0) allHidden = false;
    }
    if (d.ownerCharacterID !== null) {
      const ch = getData("characters", d.ownerCharacterID);
      elements_default.charName.textContent = ch.name;
      elements_default.charName.classList.remove("hidden");
    } else {
      elements_default.charName.classList.add("hidden");
    }
    if (allHidden) {
      if (d.choices.length > 1) {
        throw new Error(`All ${d.choices.length} dialogue choices are hidden`);
      }
      elements_default.continueInd.classList.remove("hidden");
    } else {
      elements_default.continueInd.classList.add("hidden");
    }
  }
  function resetChoices() {
    elements_default.choicesDiv.innerHTML = "";
  }
  function addChoice(text, id) {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.type = "button";
    btn.textContent = text;
    btn.dataset.id = id.toString();
    if (text.length === 0) {
      btn.classList.add("hidden");
    }
    elements_default.choicesDiv.append(btn);
  }

  // game/src/data/load.ts
  async function loadData() {
    const keys = Object.keys(data_default);
    const requests = [];
    for (const k of keys) {
      console.log("fetching game data", k);
      const p = fetch(`/game-data/data/${k}.json`);
      requests.push(p);
    }
    const responses = await Promise.all(requests);
    for (const res of responses) {
      const name = res.url.match(/game-data\/data\/(.+)\.json$/)[1];
      const d = await res.json();
      data_default[name] = d;
    }
  }

  // game/src/delegate.ts
  var listeners = [];
  var setup = false;
  function delegate(selector, eventNames, handler) {
    if (!setup) init();
    if (!Array.isArray(eventNames)) eventNames = [eventNames];
    for (const eventName of eventNames) {
      listeners.push({ selector, eventName, handler });
    }
  }
  function init() {
    elements_default.doc.body.addEventListener("click", eventHandler.bind(null, "click"));
    elements_default.doc.body.addEventListener("input", eventHandler.bind(null, "input"));
    elements_default.doc.body.addEventListener("change", eventHandler.bind(null, "change"));
    elements_default.doc.body.addEventListener("contextmenu", eventHandler.bind(null, "contextmenu"));
    elements_default.doc.body.addEventListener("keyup", eventHandler.bind(null, "keyup"));
    elements_default.doc.body.addEventListener("focusout", eventHandler.bind(null, "focusout"));
    elements_default.doc.body.addEventListener("mouseover", eventHandler.bind(null, "mouseover"));
    elements_default.doc.body.addEventListener("mousemove", eventHandler.bind(null, "mousemove"));
    elements_default.doc.body.addEventListener("mouseout", eventHandler.bind(null, "mouseout"));
    setup = true;
  }
  function eventHandler(type, e) {
    const target = e.target;
    for (const listener of listeners) {
      if (listener.eventName !== type) continue;
      if (!target.matches(listener.selector)) continue;
      listener.handler(e, target);
    }
  }

  // game/src/events.ts
  function initEvents() {
    delegate("div#choices button.choice", "click", (e) => {
      const target = e.target;
      const choiceID = +target.dataset.id;
      const choice = getData("choices", choiceID);
      if (choice.targetDialogueID === null) return;
      state_default.currentDialogueID = choice.targetDialogueID;
      drawScene();
    });
    elements_default.doc.getElementById("dialogue-box").addEventListener("click", next);
    window.addEventListener("keypress", next);
    function next(e) {
      if (e instanceof KeyboardEvent && e.code !== "Space" && e.code !== "Enter") return;
      const choices = Array.from(elements_default.doc.querySelectorAll("#choices button.choice"));
      if (choices.length !== 1 || !choices[0].classList.contains("hidden")) return;
      choices[0].click();
      e.preventDefault();
    }
  }

  // game/src/index.ts
  window.addEventListener("load", async () => {
    await loadData();
    state_default.currentDialogueID = 0;
    initElements();
    initEvents();
    drawScene();
  });
})();
