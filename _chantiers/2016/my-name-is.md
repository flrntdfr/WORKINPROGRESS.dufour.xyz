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
    "disorganized",
    "a perfectionist",
    "pragmatic",
    "lazy",

    "an Aries",
    "a Taurus",
    "a Gemini",
    "a Cancer",
    "a Leo",
    "a Virgo",
    "a Libra",
    "a Scorpio",
    "a Sagittarius",
    "a Capricorn",
    "an Aquarius",
    "a Pisces",

    "lesbian",
    "gay",
    "bisexual",
    "transgender",
    "queer",
    "intersex",
    "asexual",
    "pansexual",
    "demisexual",
    "sapiosexual",
    "aromantic",
    "graysexual",
    "polysexual",
    "omnisexual",
    "non-binary",
    "genderqueer",
    "agender",
    "bigender",
    "pangender",
    "genderfluid",

    "vegetarian",
    "vegan",
    "pescatarian",
    "flexitarian",
    "carnivore",
    "omnivore",
    "fruitarian",
    "gluten intolerant",
    "lactose intolerant",

    "happy",
    "sad",
    "depressed",
    "burnt-out",

    "in recovery",
    "alcoholic",
    "addicted",
    "sober",
    "clean",

    "black",
    "white",
    "Latino",
    "Hispanic",
    "Asian",
    "Arab",
    "biracial",

    "Jewish",
    "Muslim",
    "a Christian",
    "Buddhist",
    "Hindu",
    "atheist",

    "rich",
    "poor",
    "successful",
    "working class",
    "middle class",
    "upper class",
    "an immigrant",
    
    "climate-conscious",

    "a man",
    "a woman",
    "a kid",
    "a teenager",
    
    "young",
    "middle-aged",
    "old",
    
    "a scientist",
    "an artist",

    "an introvert",
    "an extrovert",
    "an ambivert",
  ],
  listB: [
    "I know about AlphaGo's move 37.",
    "I have seen the passage of time.",
    "I write angry postcards.",
    "I believe my country should be as God intended.",
    "I am experiencing a shift in attitude.",
    "I will reach the 12th step.",
    "I believe God is dead.",
    "I am skill in action.",
    "I am ignorance talking.",
    "I am convergence in action.",
    "I am what happens when strangers meet.",
    "I feel like the flag of a lost country.",
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
    "I sacrifice the present for the future.",
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
    "I define   the edge of what's most important.",
    "sometimes I would rather be an object than a person.",
    "I am a work in progress.",
    "I am the inevitable.",
    "I use love as a currency.",
    "I execute the plan in motion.",
    "I am committed to the cause.",
    "I am good at connecting dots.",
    "I accept what isn't real.",
    "I have a place I can call home.", 
    "I speak the truth.",
    "I always choose the best course of action.",
    "I offer annihilation as an answer.",
    "I am the absence of knowing.",
    "I endure the long run.",
    "I hear voices.",
    "I laugh like god.",
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
    "I am the opposite and the lack thereof.",
    "I find silences deafening.",
    "I am the cherry on top.",
    "I am prepared for the unlikely event of an emergency landing.",
    "I won't witness the ending of time.",
    "I am ignorant and blissful.",
    "I am wise.",
    "I believe in art.",
    "I have seen the hideous picture of happiness.",
    "I feel like a chocolate chip traped in a cookie.", 
    "I live in the reality I created for myself.",
    "I prefer closed concepts.",
    "I regularly engage in one sided conversations.",
    "this is a great time to be alive.",
    "I operate the apparatus.",
    "I feel the feeling of restlessness.",
    "I embody a sense of purposelessness.",
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
    "I despise wanna be'ism.",
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
    "I am afraid to upset God.",
    "I have disposable income.",
    "my power is also my weakness.",
    "I will be remembered for what I achieved.",
    "I am successful.",
    "my ideas speak for themselves.",
    "I can feel cortisol pulsing when I wake up.",
    "I seize opportunities for growth.",
    "I want to talk about it.",
    "I am out of the loop.",
    "my life is multi faceted.",
    "my life is a stochastic process.",
    "people like me better than they understand me.",
    "I have done more drugs than I can count.",
    "I know how it feels to win.",
    "I know how it feels to wake up in the morning.",
    "I know how it feels to wake up in a hospital bed.",
    "I think we can solve all problems by talking.",
    "I know how to program a computer.",
    "I like the sound of my own voice.",
    "I am a good listener.",
    "I can make people rich.",
    "I wish I would never grow up.",
    "I wish I would never die.",
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
    "people often tell me I look confident.",
    "I learn by looking at patterns.",
    "I am ready to get rich.",
    "I will never go to space.", 
    "I will be alive tomorrow.",
    "I sleep alone.",
    "I don't know what is the meaning of life.",
    "I am aware of how I come accross.",
    "I need deadlines to achieve my goals.",
    "anger is my main drive.",
    "I am growth minded.",
    "I am not a hero.",
    "I usually don't get what I want.",
    "I don't know who I am.",
    "I don't watch as much TV as my parents.",
    "I like people who like me.",
    "I am satisfied with my genes",
    "I solve my problems instead of finding excuses.",
    "I stay away from people who victimize themselves.",
    "I am not a victim of my ideas.",
    "I need to be surrounded by people who have goals too.",
    "I am not in 'a traffic jam'. I am also 'the traffic jam'.",
    "I serve people around me.",
    "I flood people with love.",
    "I am proof that working hard pays-off.",
  ]
};

let currentListA = "";
let currentListB = "";

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateNewCombination() {
  currentListA = getRandomItem(lists.listA);
  currentListB = getRandomItem(lists.listB);
  
  document.getElementById('list-a-item').value = currentListA;
  document.getElementById('list-b-item').value = currentListB;
}

function animateButton(button) {
  button.style.transform = 'scale(0.95)';
  setTimeout(() => {
    button.style.transform = '';
  }, 100);
}

function handleYes() {
  console.log(`Action: YES for combination: "${currentListA}" AND "${currentListB}"`);
  /* Only update list B when YES is pressed */
  currentListB = getRandomItem(lists.listB);
  document.getElementById('list-b-item').value = currentListB;
  animateButton(document.getElementById('yes-button'));
}

function handleNo() {
  console.log(`Action: NO for combination: "${currentListA}" AND "${currentListB}"`);
  generateNewCombination();
  animateButton(document.getElementById('no-button'));
}

/* Initialize on page load */
document.addEventListener('DOMContentLoaded', function() {
  generateNewCombination();
  
  /* Add individual button event listeners */
  document.getElementById('yes-button').addEventListener('click', handleYes);
  document.getElementById('no-button').addEventListener('click', handleNo);
  
  /* Focus the name input on page load */
  nameInput.focus();
  
  /* Keyboard shortcuts */
  document.addEventListener('keydown', function(event) {
    switch(event.key.toLowerCase()) {
      case 'y':
        handleYes();
        break;
      case 'n':
        handleNo();
        break;
    }
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
</style>