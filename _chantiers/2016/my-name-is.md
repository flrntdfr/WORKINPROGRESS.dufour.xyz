---
layout: chantier
title: My name is…
started:  2016-03-06 11:09
ended: 2016-07-13 11:09
result: [list, game]
description: You are playing “My name is…”.<br>You know who you are.
---

<div id="iam-container">
    <div class="iam-interface">
        <div class="name-input-container">
            <span id="name-label">My name is:</span>
            <input type="text" id="name-input" placeholder="anonymous" maxlength="50" autofocus>
        </div>
        <div class="statement-display" id="statement-display">
            <span id="statement-prefix">I am</span> <input type="text" id="list-a-item" readonly> <span id="statement-connector">and</span> <input type="text" id="list-b-item" readonly>
        </div>
        <div class="button-group">
            <button class="action-button" id="yes-button">Yes</button>
            <button class="action-button" id="no-button">No</button>
        </div>
    </div>
    {% include ray-id.html %}
</div>

<script>
const lists = {
  listA: [
    ["normal", "disorganized", "a perfectionist", "pragmatic", "lazy"],

    ["an Aries", "a Taurus", "a Gemini", "a Cancer", "a Leo", "a Virgo", "a Libra", "a Scorpio", "a Sagittarius", "a Capricorn", "an Aquarius", "a Pisces"],
    
    ["lesbian", "gay", "bisexual", "transgender", "queer", "intersex", "asexual", "pansexual", "demisexual", "sapiosexual", "aromantic", "graysexual", "polysexual", "omnisexual", "non-binary", "genderqueer", "agender", "bigender", "pangender", "genderfluid"],
    
    ["vegetarian", "vegan", "pescatarian", "flexitarian", "carnivore", "omnivore", "fruitarian", "gluten intolerant", "lactose intolerant"],
    
    ["happy", "sad", "depressed", "burnt-out"],
    
    ["in recovery", "alcoholic", "addicted", "sober", "clean"],
    
    ["black", "white", "Latino", "Hispanic", "Asian", "Arab", "biracial"],
    
    ["Jewish", "Muslim", "a Christian", "Buddhist", "Hindu", "atheist"],
    
    ["rich", "poor", "successful", "working class", "middle class", "upper class", "an immigrant"],
    
    ["climate-conscious", "climate-denier"],
    
    ["a man", "a woman", "a kid", "a teenager"],
    
    ["young", "middle-aged", "old"],
    
    ["a scientist", "an artist", "unemployed", "a student"],
    
    ["an introvert", "an extrovert", "an ambivert"],
    
    ["patient", "impatient"],
  ],
  listB: [
    "I know about AlphaGo's move 37.",
    "I have seen the passage of time.",
    "I write angry postcards.",
    "I am experiencing a general shift in attitude.",
    "I will reach the 12th step.",
    "I believe God is dead.",
    "I am skill in action.",
    "I am ignorance talking.",
    "I am convergence in action.",
    "I am what happens when strangers meet.",
    "I am practicing love.",
    "I don't want to die before my time.",
    "I am on the path forward.",
    "I am god in her infinite wisdom.",
    "I am the universe experiencing itself subjectively.",
    "I fear change.",
    "I could make a compelling case against humanity.",
    "I am the face of immense suffering.",
    "I am the end before the beginning.",
    "I can see the same issue from two different sides.",
    "I practice thinking against myself.", 
    "I am unable to love.",
    "I am the trend in the other direction.",
    "my hands are often cold.",
    "I manifest emptiness.",
    "I know logic can fail.",
    "I know the reality of the situation.",
    "I see the light at the end of the tunnel.",
    "I willingly sacrifice the present for the future.",
    "I win competitions for attention.",
    "I cast the shadow of the future.",
    "I contain all the love one heart can hold.",
    "I am like a dog with a bone.",
    "I tend to urge endings.",
    "I feel the vacuum of space.",
    "I am experiencing a vanishing sense of purpose.",
    "I inhabit the Goldilocks zone.",
    "my life does the opposite of improving.",
    "I always take a step back before the step forward.",
    "I believe in truth.",
    "I am the difference between life and death.",
    "I wear a Swiss army smile.", 
    "I am the eroded sense of love.",
    "I can recall what I had for lunch yesterday.",
    "I carry someone else's problems.",
    "I am the force of change.",
    "I can define the edges of what's most important.",
    "sometimes I would rather be an object than a person.",
    "I am the inevitable.",
    "I use love as a currency.",
    "I execute the plan in motion.",
    "I am committed to the cause.",
    "I am good at connecting dots.",
    "I can accept what isn't real.",
    "I have a place I can call home.", 
    "I speak the truth.",
    "I always choose the best course of action.",
    "I offer annihilation as an answer.",
    "I am the absence of knowing.",
    "I endure the long run.",
    "I hear voices.",
    "I laugh like God.",
    "I see the grand scheme of things.",
    "I fight a lonely fight.",
    "I continue the ongoing process.",
    "I see the bigger picture.",
    "I balance trouble and happiness.", 
    "I reached several points of no return.",
    "I live a long and happy life.",
    "I contribute to the collective insanity.",
    "I am alive.",
    "yesterday was not the best day of my life.",
    "I find silences deafening.",
    "I am the cherry on top.",
    "I won't witness the ending of time.",
    "I am ignorant and blissful.",
    "I am wise.",
    "I believe in art.",
    "I have seen the hideous picture of happiness.",
    "I feel like a chocolate chip trapped in a cookie.", 
    "I live in the reality I created for myself.",
    "I prefer closed concepts.",
    "I regularly engage in one sided conversations.",
    "this is a great time to be alive.",
    "I operate the apparatus.",
    "I feel a feeling of restlessness.",
    "I feel a feeling of purposelessness.",
    "I maintain an unremarkable regularity in life.",
    "I live in an ugly place.",
    "I can cause clean destruction.",
    "I need to fill a massive gap.",
    "I weave the fabric of society.",
    "I explore the realm of possibilities.",
    "my death will be the footnote to an assumption.",
    "I have a significant other.",
    "I make the conscious effort.",
    "I devised a bigger plan.",
    "I reached the endpoint of the spectrum.",
    "I think invisible thoughts.",
    "I have never been so sad.",
    "I am not afraid of the dark.",
    "I understand humanity at a different level.",
    "I know how much a cow costs.",
    "I know how much a gram of cocaine costs.",
    "I know how much an ounce of gold costs.",
    "I have good intentions.",
    "I am tired.",
    "I can hold two opposite opinions at the same time.",
    "I think capitalism works.",
    "I am ready when you are.",
    "I want my part.",
    "I have disposable income.",
    "I never make the same mistake twice.",
    "my love life is like a one way street.",
    "my power is also my weakness.",
    "I will be remembered for what I achieved.",
    "I am successful.",
    "my ideas speak for themselves.",
    "I can feel cortisol pulsing when I wake up.",
    "I seize opportunities for growth.",
    "I want to talk about it.",
    "I am out of the loop.",
    "my life is multi-faceted.",
    "my life is a stochastic process.",
    "people like me better than they understand me.",
    "I have done more drugs than I can count.",
    "I know how it feels to win.",
    "I know how it feels to wake up in a hospital bed.",
    "I think we can solve all problems by talking.",
    "I know how to program a computer.",
    "I like the sound of my own voice.",
    "I am a good listener.",
    "I can make people rich.",
    "I wish I would never have to grow up.",
    "I wish I would never have to die.",
    "I wish things would be different.",
    "I feel empty.",
    "I don't have a favorite color.",
    "sex is definitely overrated.",
    "I think people are generally well meaning.",
    "I do not support the leader of my country.",
    "life is hard on me.",
    "things I touch generally break.",
    "I took an IQ test and I was not surprised by the result.",
    "I am willing to take action.",
    "I am open to changing my story.",
    "I am on the verge of something big.",
    "I am investing in myself.",
    "I exercise regularly.",
    "I have a creative outlet.",
    "people often tell me that I look confident.",
    "I learn by looking at patterns.",
    "I am ready to get rich.",
    "I will never go to space.", 
    "I will be alive tomorrow.",
    "I sleep alone.",
    "I don't know what is the meaning of life.",
    "I am aware of how I come accross.",
    "I need deadlines to achieve my goals.",
    "anger is my main drive.",
    "I am growth-minded.",
    "I usually don't get what I want.",
    "I don't have a TV and I tell people I don't have one.",
    "I like people who like me.",
    "I am satisfied with my genes.",
    "I solve my problems instead of finding excuses.",
    "I stay away from people who victimize themselves.",
    "I am not a victim of my ideas.",
    "I need to be surrounded by people who have goals too.",
    "I am not 'in a traffic jam'. I am also 'the traffic jam'.",
    "I flood people with love.",
    "I am living proof that working hard pays-off.",
    "I will choose to reincarnate as a human again.",
    "I want people to be interested in the things I make.",
    "I don't usually need to change my mind.",
    "I can't imagine being dead.",
    "I don't care.",
    "I leave people better than I find them.",
    "my country lost its last war.",
    "I don't think outside the box. I am the box, and the universe.",
    "I don't date people who couldn't be my friend.",
    "Some of my dreams have come true. And I intend to make more come true.",
  ]
};

/* --- Final Round Config --- */
const FINAL_AFFIRMATION = "I don't know who I am.";
let isFinalAffirmationMode = false;

/* --- Game State --- */
let currentSublistIndex = -1;
let currentLabel = "";
let currentAffirmationIndex = -1;

/* --- Utilities --- */
function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

function getNonEmptySublistIndices() {
  const indices = [];
  for (let i = 0; i < lists.listA.length; i += 1) {
    const sub = lists.listA[i];
    if (Array.isArray(sub) && sub.length > 0) {
      indices.push(i);
    }
  }
  return indices;
}

function logListLengths() {
  const totalLabels = getTotalLabelsInListA();
  console.log(`Label categories: ${lists.listA.length} (${totalLabels}), affirmations: ${lists.listB.length}`);
}

function getTotalLabelsInListA() {
  let total = 0;
  for (let i = 0; i < lists.listA.length; i += 1) {
    const sub = lists.listA[i];
    if (Array.isArray(sub)) {
      total += sub.length;
    }
  }
  return total;
}

function updateDisplay() {
  document.getElementById('list-a-item').value = currentLabel;
  if (currentAffirmationIndex >= 0 && currentAffirmationIndex < lists.listB.length) {
    document.getElementById('list-b-item').value = lists.listB[currentAffirmationIndex];
  } else {
    document.getElementById('list-b-item').value = "";
  }
}

function pickRandomSublist() {
  const choices = getNonEmptySublistIndices();
  if (choices.length === 0) {
    return -1;
  }
  return choices[getRandomIndex(choices.length)];
}

function pickRandomSublistDifferent(excludeIndex) {
  const choices = getNonEmptySublistIndices();
  if (choices.length === 0) { return -1; }
  if (choices.length === 1) { return choices[0]; }
  let idx = choices[getRandomIndex(choices.length)];
  let safety = 0;
  while (idx === excludeIndex && safety < 10) {
    idx = choices[getRandomIndex(choices.length)];
    safety += 1;
  }
  return idx;
}

function pickRandomLabelFromCurrentSublist(excludeLabel) {
  const sublist = lists.listA[currentSublistIndex];
  if (!Array.isArray(sublist) || sublist.length === 0) {
    currentLabel = "";
    return;
  }
  if (sublist.length === 1) {
    currentLabel = sublist[0];
    return;
  }
  let idx = getRandomIndex(sublist.length);
  if (typeof excludeLabel === 'string' && sublist.length > 1) {
    /* Ensure a different label is picked when requested */
    let safety = 0;
    while (sublist[idx] === excludeLabel && safety < 10) {
      idx = getRandomIndex(sublist.length);
      safety += 1;
    }
  }
  currentLabel = sublist[idx];
}

function pickRandomAffirmation(excludeIndex) {
  if (lists.listB.length === 0) {
    currentAffirmationIndex = -1;
    return;
  }
  if (lists.listB.length === 1) {
    currentAffirmationIndex = 0;
    return;
  }
  let idx = getRandomIndex(lists.listB.length);
  if (typeof excludeIndex === 'number' && excludeIndex >= 0) {
    /* Try to avoid repeating the exact same affirmation consecutively */
    let safety = 0;
    while (idx === excludeIndex && safety < 10) {
      idx = getRandomIndex(lists.listB.length);
      safety += 1;
    }
  }
  currentAffirmationIndex = idx;
}

function animateButton(button) {
  button.style.transform = 'scale(0.95)';
  setTimeout(function() {
    button.style.transform = '';
  }, 100);
}

function showFinalAffirmation() {
  if (isFinalAffirmationMode) { return; }
  isFinalAffirmationMode = true;
  lists.listB.push(FINAL_AFFIRMATION);
  currentAffirmationIndex = lists.listB.length - 1;
}

function endGame() {
  const yesBtn = document.getElementById('yes-button');
  const noBtn = document.getElementById('no-button');
  yesBtn.disabled = true;
  noBtn.disabled = true;
  document.getElementById('list-b-item').value = "";
  document.getElementById('statement-connector').textContent = "and";
  /* Optionally reflect completion state in the affirmation field */
  document.getElementById('list-b-item').placeholder = "No more affirmations";
}

function winGame() {
  const interfaceDiv = document.querySelector('.iam-interface');
  if (!interfaceDiv) { return; }
  interfaceDiv.classList.add('end-screen');
  interfaceDiv.innerHTML = '<div class="end-message">You win.</div>';
}

function loseGame() {
  const interfaceDiv = document.querySelector('.iam-interface');
  if (!interfaceDiv) { return; }
  interfaceDiv.classList.add('end-screen');
  interfaceDiv.innerHTML = '<div class="end-message">Game over.</div>';
}

/* --- Core Actions --- */
function initializeGame() {
  isFinalAffirmationMode = false;
  currentSublistIndex = pickRandomSublist();
  if (currentSublistIndex === -1) {
    endGame();
    return;
  }
  pickRandomLabelFromCurrentSublist();
  pickRandomAffirmation();
  updateDisplay();
  logListLengths();
}

function handleYes() {
  if (isFinalAffirmationMode) {
    animateButton(document.getElementById('yes-button'));
    loseGame();
    return;
  }
  console.log(`Action: YES for combination: "${currentLabel}" AND "${lists.listB[currentAffirmationIndex]}"`);
  /* YES: lock the label by removing all other labels from the current sublist */
  if (currentSublistIndex >= 0) {
    lists.listA[currentSublistIndex] = [currentLabel];
  }
  /* Remove the current affirmation from listB */
  if (currentAffirmationIndex >= 0) {
    lists.listB.splice(currentAffirmationIndex, 1);
  }
  /* If no more affirmations remain, trigger final round */
  if (lists.listB.length === 0) {
    showFinalAffirmation();
    updateDisplay();
    animateButton(document.getElementById('yes-button'));
    logListLengths();
    return;
  }
  /* Pick a new affirmation; label remains the same */
  pickRandomAffirmation();
  updateDisplay();
  animateButton(document.getElementById('yes-button'));
  logListLengths();
}

function handleNo() {
  if (isFinalAffirmationMode) {
    animateButton(document.getElementById('no-button'));
    winGame();
    return;
  }
  console.log(`Action: NO for combination: "${currentLabel}" AND "${lists.listB[currentAffirmationIndex]}"`);
  /* Always switch to a different random sublist, then pick a random label */
  const nextSublistIndex = pickRandomSublistDifferent(currentSublistIndex);
  if (nextSublistIndex !== -1) {
    currentSublistIndex = nextSublistIndex;
  }
  pickRandomLabelFromCurrentSublist();
  /* Also pick a new affirmation */
  pickRandomAffirmation(currentAffirmationIndex);
  updateDisplay();
  animateButton(document.getElementById('no-button'));
  logListLengths();
}

/* Initialize on page load */
document.addEventListener('DOMContentLoaded', function() {
  initializeGame();
  /* Add individual button event listeners */
  document.getElementById('yes-button').addEventListener('click', handleYes);
  document.getElementById('no-button').addEventListener('click', handleNo);
  /* Focus the name input on page load */
  const nameInput = document.getElementById('name-input');
  if (nameInput) { nameInput.focus(); }
  /* Keyboard shortcuts */
  document.addEventListener('keydown', function(event) {
    const yesBtn = document.getElementById('yes-button');
    const noBtn = document.getElementById('no-button');
    if (yesBtn.disabled || noBtn.disabled) { return; }
    const key = (event.key || "").toLowerCase();
    if (key === 'y') { handleYes(); }
    if (key === 'n') { handleNo(); }
  });
});
</script> 

<style>
#iam-container {

}

.iam-interface {
    border: 1px solid #ccc;
    padding: 1em;
    margin-bottom: 1em;
}

.name-input-container {
    display: flex;
    align-items: center;
    margin-bottom: 1em;
    gap: 1em;
}

.name-input-container span {
    white-space: nowrap;
}

#name-input {
    flex-grow: 1;
    border: 1px solid #ccc;
    padding: 8px;
    font-size: 1em;
}

.statement-display {
    margin-bottom: 1em;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.statement-display input {
    border: 1px solid #ccc;
    padding: 8px;
    font-size: 1em;
    background-color: #f9f9f9;
    border-radius: 0;
    margin: 0 4px;
    min-width: 150px;
}

#list-b-item {
    flex: 1;
    min-width: 200px;
}

.button-group {
    display: flex;
    gap: 1em;
    justify-content: center;
}

.action-button {
    padding: 8px 16px;
    font-size: 1em;
    cursor: pointer;
    border: 1px solid #ccc;
    background-color: #fff;
    min-width: 80px;
}

.action-button:hover {
    background-color: #f5f5f5;
}

/* End screen centering */
.iam-interface.end-screen {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 140px;
}

.end-message {
    text-align: center;
}
</style>