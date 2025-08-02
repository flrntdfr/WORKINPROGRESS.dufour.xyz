---
layout: chantier
title: My name is
created:  2016-03-06 11:09
ended: 2016-07-13 11:09
result: [list, game]
---

<style>
#iam-container {

}

.language-tabs {
    display: flex;
    margin-bottom: 0;
}

.language-tab {
    padding: 8px 16px;
    border: 1px solid #ccc;
    background-color: #f5f5f5;
    cursor: pointer;
    font-size: 0.9em;
}

.language-tab.active {
    background-color: #fff;
    border-bottom: 1px solid #fff;
}

.language-tab:first-child {
    border-right: none;
}

.iam-interface {
    border: 1px solid #ccc;
    padding: 1em;
    margin-bottom: 1em;
    border-top: none;
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

<div id="iam-container">
    <div class="language-tabs">
        <div class="language-tab active" onclick="switchLanguage('en')">English</div>
        <div class="language-tab" onclick="switchLanguage('fr')">Français</div>
    </div>
    <div class="iam-interface">
        <div class="name-input-container">
            <span id="name-label">My name is:</span>
            <input type="text" id="name-input" placeholder="anonymous" maxlength="50">
        </div>
        
        <div class="statement-display" id="statement-display">
            <span id="statement-prefix">I am</span> <input type="text" id="list-a-item" readonly> <span id="statement-connector">and</span> <input type="text" id="list-b-item" readonly>
        </div>
        
        <div class="button-group">
            <button class="action-button" id="yes-button">Yes</button>
            <button class="action-button" id="no-button">No</button>
            <button class="action-button" id="skip-button">Skip</button>
        </div>
    </div>
    
    {% include ray-id.html %}
</div>

<script>
/* Lists of statements for combination in both languages */
const lists = {
  en: {
    listA: [,
      "a perfectionist",
      "someone pragmatic",
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
      "Jewish",
      "Muslim",
      "Christian",
      "Buddhist",
      "Hindu",
      "rich",
      "poor",
      "working class",
      "middle class",
      "upper class",
      "an immigrant",
      "biracial",
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
      "I am the flag of a dead country.",
      "I am practicing love.",
      "I remember the promise of a dead man.",
      "I am on the path towards.",
      "I am god in her infinite wisdom.",
      "I am the universe experiencing itself subjectively.",
      "I fear change.",
      "I could make a compelling case against humanity.",
      "I am the emotion that fills the blanks.",
      "I am the face of immense suffering.",
      "I am the end before the beginning.",
      "I can see the same issue from two different sides.",
      "I practice thinking against myself.", 
      "I am unable to love.",
      "I am the trend in the other direction.",
      "I lack emotions.",
      "I manifest emptiness.",
      "I know logic can fail.",
      "I know the reality of the situation.",
      "I see the light at the end of the tunnel.",
      "I sacrifice the present for the future.",
      "I win competitions for attention.",
      "I cast the shadow of the future.",
      "I contain all the love one heart can hold.",
      "I am like a dog with a bone.",
      "I urge endings.",
      "I feel the vacuum of space.",
      "I am experiencing the vanishing sense of purpose.",
      "I inhabit the Goldilocks zone.",
      "my life does the opposite of improving.",
      "I always take a step back before the step forward.",
      "I believe in truth.",
      "I am the difference between life and death.",
      "I wear a Swiss army smile.", 
      "I am the eroded sense of love.",
      "I recall what I had for lunch yesterday.",
      "I carry someone else's problems.",
      "I am the force of change.",
      "I define the edge of what's most important.",
      "I watch like a fly on the wall.",
      "I am a work in progress.",
      "I embody the inevitable.",
      "I use love as a currency.",
      "I execute the plan in motion.",
      "I am committed to the cause.",
      "I connect dots.",
      "I accept what isn't real.",
      "I have a place I can call home.", 
      "I speak the truth.",
      "I always choose the best course of action.",
      "I offer annihilation as an answer.",
      "I am the absence of knowing.",
      "I contemplate suicide.",
      "I endure the long run.",
      "I hear voices.",
      "I laugh like god.",
      "I see the grand scheme of things.",
      "I fight the lonely fight.",
      "I know the alphabet of birds.",
      "I continue the ongoing process.",
      "I see bigger pictures.",
      "I balance trouble and happiness.", 
      "I embody the deepest darkest blue.",
      "I reached a turning point.",
      "I live a long and happy life.",
      "I contribute to the collective insanity.",
      "I am alive.",
      "I am the next best day of your life.",
      "I am the opposite and the lack thereof.",
      "I find silences deafening.",
      "I am the cherry on top.",
      "I am prepared for the unlikely event of an emergency landing.",
      "I won't witness the ending of time.",
      "I am ignorant and blissful.",
      "I am wise.",
      "I believe in art.",
      "I have seen the hideous picture of happiness.",
      "I am the chocolate chip in your cookie.", 
      "I live in the reality I created for myself.",
      "I like closed concepts.",
      "I engage regularly in one sided conversations.",
      "this is a great time to be alive.",
      "I operate the apparatus.",
      "I feel the feeling of restlessness.",
      "I embody a sense of purposelessness.",
      "I maintain an unremarkable regularity in life.",
      "I live in an ugly place.",
      "I can cause clean destruction.",
      "I need to fill a massive gap.",
      "I weave the fabric of society.",
      "I squeeze the juice and the lemon.",
      "I explore the realm of possibilities.",
      "my death will be the footnote to an assumption.",
      "I have a significant other.",
      "I experience altitude sickness.",
      "I make the conscious effort.",
      "I devised a bigger plan.",
      "I reached the endpoint of the spectrum.",
      "I am the wanna be'ism.",
      "I think this invisible thought.",
      "I have never been so sad.",
      "I am not afraid of the dark.",
      "I understand humanity at a different level.",
      "I know how much a cow costs.",
      "I know how much a gram of cocaine costs.",
      "I know how much a ounce of gold costs.",
      "I have good intentions.",
      "I am tired.",
      "I can hold two opposite opinions at the same time.",
    ]
  },
  fr: {
    listA: [
      "perfectionniste",
      "pragmatique",
      "Bélier",
      "Taureau",
      "Gémeaux",
      "Cancer",
      "Lion",
      "Vierge",
      "Balance",
      "Scorpion",
      "Sagittaire",
      "Capricorne",
      "Verseau",
      "Poissons",
      "lesbienne",
      "gay",
      "bisexuel·e",
      "transgenre",
      "queer",
      "intersexe",
      "asexuel",
      "pansexuel",
      "demisexuel",
      "sapiosexuel",
      "aromantique",
      "graysexuel",
      "polysexuel",
      "omnisexuel",
      "non-binaire",
      "genderqueer",
      "agenre",
      "bigenre",
      "pangenre",
      "végétarien·ne",
      "végan·e",
      "pescétarien·ne",
      "flexitarien·ne",
      "carnivore",
      "omnivore",
      "fruitarien·ne",
      "crudivore",
      "intolérant·e au gluten",
      "intolérant·e au lactose",
      "heureux·se", 
      "déprimé·e",
      "stressé·e",
      "en rétablissement",
      "alcoolique",
      "dépendant·e",
      "sobre",
      "clean",
      "un·e immigré·e",
      "noir·e",
      "blanc·he",
      "latino",
      "hispanique",
      "asiatique",
      "arabe",
      "juif·ve",
      "musulman·e",
      "chrétien·ne",
      "bouddhiste",
      "hindou·e",
      "riche",
      "pauvre",
      "de classe ouvrière",
      "de classe moyenne",
      "de classe supérieure",
      "métis·se",
      "biracial·e",
      "climato-convaincu·e",
      "un homme",
      "une femme",
      "jeune",
      "un·e adolescent·e",
      "vieux·eille",
      "un·e immigrant·e",
      "un·e scientifique",
      "un·e artiste",
    ],
    listB: [
      "on m'a donné le bon dieu sans confession.",
      "je ressemble à un chien de faillence.",
      "je me sens comme un pitbull en laisse.",
      "je suis un chèque en blanc sur le compte de la société.",
      "je suis la marche implacable du temps.",
      "je suis la puissance de la santé humaine.",
      "j'ai vécu l'âge d'or du rap français.",
      "je déferle comme un tsunami.",
      "je cultive le fétichisme du passé.",
      "je dégage une puissance silencieuse.",
      "j'ai constaté la disparition de l'amour.",
      "je reflète l'idée que les gens se font de la démocratie.",
      "je prédis le futur sur répondeur.",
      "je canalise ma rage.",
      "je symbolise le capitalisme tardif.",
      "j'ai fait le premier pas sur la lune.",
      "je suis partout mais pas tout le temps.",
      "j'aime les gens qui aiment les gens.",
      "je défie la hiérarchie des combats.",
      "je me sens comme Paris sans la tour eiffel.",
      "je me sens comme la France sous l'occupation.",
      "je suis un pistolet dans une main qui tremble.",
      "je suis le nivellement par le bas.",
      "je suis un déficit d'agressivité.",
      "je suis le soulèvement d'un peuple.",
      "je ressens le vide qui se rapproche.",
      "je suis le témoin d'un monde qui s'effondre.",
      "je proclame la conscience.",
      "je ne suis pas un remède aux cœurs brisés.",
      "je regarde dans la même direction que tout le monde.",
      "j'ai parcouru les rues de Paris.",
      "j'ai franchis la porte du nouveau monde.",
      "je suis le muscle de l'amour.",
      "je suis aussi dangereux·se que l'adversaire.",
      "j'ai traversé des tunnels de violence.",
      "je suis la perfection incarnée.",
      "j'exprime ma singularité.",
      "je défie la croyance en les contraires.",
      "je vis les choses de la vie.",
      "je suis une réponse aussi silencieuse que la question.",
      "j'ai de l'intérêt pour l'éphémère.",
      "je possède l'argument qui va convaincre l'humanité.",
      "je subis un retour de karma.",
      "j'ai essayé les drogues.",
      "j'ai vécu des instants précis à Paris.",
      "je suis les conséquences de l'amour.",
      "je fuis une vie passée.",
      "je laisse le temps faire son œuvre.",
      "je suis le verbe amour conjugué au passé.",
      "je suis le destin qui prend une décision pour trois.",
      "je suis la naissance d'un souvenir.",
      "je suis ce qui maintient en vie.",
      "j'ai renoué avec la joie.",
      "je suis endurant·e à la souffrance.",
      "j'ai traversé des ponts en flammes.",
      "je suis le soleil qui se jette dans l'océan.",
      "j'ai contemplé chaque étoile dans le ciel.",
      "je suis l'injonction à la pénétration.",
      "je revendique le droit à la victoire.",
      "je suis l'outrage du temps.",
      "j'ai choisi les quatre chemins.",
      "je respecte la loi du marché.",
      "je ressens l'altitude.",
      "je poursuis la quête d'absolu.",
      "je suis tout sauf le silence.",
      "je suis la marrée qui redescend.",
      "je suis les bruits sourds de l'amour.",
      "je vis une vie qui s'achève.",
      "je connais le bruit des vagues.",
      "je suis le récit d'une vie rêvée.",
      "je ressens le plaisir sans la passion.",
      "je suis le bruit que deux étoiles font quand elles se rencontrent.",
      "je suis la peste et le choléra.",
      "je déçu·e en amour.",
      "je suis la promesse de l'humanité.",
      "j'aime le chemin de ma maison.",
      "je tire sans sommation.",
      "je suis l'abdication de l'humanité.",
      "je paie le prix du sang versé.",
      "je prends des risques au maximum.",
      "je suis le produit d'un esprit malade.",
      "je suis accoutumé·e à la souffrance.",
      "l'espoir est mon moteur.",
      "j'i vu grand spectacle de la violence.",
      "je suis un hymne à la cruauté.",
      "je suis la passion pour l'autodestruction.",
      "je vis un moment de vertige.",
      "j'ai peur de la mort.",
      "j'aimerais vivre le million d'années à venir.",
      "je sais faire la part des choses.",
      "je suis ce qu'on appelle le hasard.",
      "je respire l'air du temps.",
      "je rattrape le retard sur ma vie.",
      "je dis \"je t'aime\" comme un appel à l'aide.",
      "je place de la confiance en l'amour.",
      "j'aime regarder l'eau qui couler sous les ponts.", 
      "je suis la faucheuse en string.",
      "je suis le désir de l'avenir.",
      "je suis un caprice du destin.",
      "je suis l'incarnation du doute.",
      "je suis l'absence.",
      "je suis le sentiment d'inachevé.",
      "je pourrais rédiger le résumé de l'humanité.",
      "je suis la différence entre la douleur et la souffrance.",
      "je suis au bout du monde.",
      "je suis l'amour en sa plus simple expression.",
      "je suis l'allégorie du fossé et du champ de mines.",
      "je suis la vie à deux pour les mauvaises raisons.",
      "je suis dépendant·e à la souffrance.",
      "j'ai subi le tort d'autrui.",
      "je suis la séparation durable.",
      "je suis la plainte de l'univers.",
      "je suis la beauté sans charme.",
      "je ressens une pincée de tristesse.",
      "je suis une raison d'être triste.",
      "j'ai posé les bases d'une relation saine.",
      "je suis l'origine du mal.",
      "je ressens le regret de rien.",
      "je suis le cas échéant.",
      "je dis la vérité en face.",
      "je porte une armure de chaire.",
      "je vois la haine sur les visages.",
      "je suis l'échec associé à la douleur.",
      "je suis la peine sans limites.",
      "j'ai reçu la leçon la plus importante de ma vie.",
      "je suis le ministre du destin.",
      "j'ai survécu au mois de novembre.",
      "je respecte l'ordre logique des choses.",
      "je tiens les cartes en main.", 
      "je ressens l'amour après la mort.",
      "je suis un œuf qui a éclos.",
      "j'aime l'odeur du bitume.",
      "j'ai décidé du sort de l'humanité.",
      "je porte le prénom de Jésus.",
      "je suis l'engouement aveugle.",
      "je suis l'attrait pour l'argent.",
      "je suis sur l'autoroute du confort.",
      "je pourrais kidnaper l'humanité.",
      "je suis la honte qui change de corps.",
      "je connais le domaine du rêve.",
      "je défends l'optimisme en philosophie.",
      "je suis une hégémonie.",
      "je suis une lucarne sur le paradis.",
      "je suis l'aversion pour le mensonge.",
      "je suis l'avant goût du risque.",
      "je suis la chance en amour.", 
      "je comprends le sens des mots.",
      "je proclame l'abolition de l'univers.",
      "je suis l'havre et la paix.",
      "je suis l'enduit de la pensée universelle.",
      "je pense une pensée d'amour.",
      "je suis l'incarnation de l'optimisme.",
      "je suis le partage entre le manque et la colère.",
      "je suis les yeux de la loi.",
      "je crains l'exploitation de la tristesse humaine.",
      "je suis les premiers émois.",
      "je suis la redondance et la redondance.",
      "je serai vivant·e demain.",
      "j'ai porté ma croix.",
      "je suis plus petit·e que la tour Eiffel.",
      "je sais conjuguer le verbe oublier.",
      "je crois que le beau persiste sous l'injure.",
      "il est midi à ma porte.", 
      "je nage dans une piscine de sang.",
      "je suis un faisceau d'indices concordants.",
      "je prends le risque zéro.",
      "je suis le mortier et le pilon.",
      "je suis la mort d'un cheval.",
      "je fais l'amour à la guerre.",
      "je vis un dans un ménage à deux.",
      "je peux faire l'apologie de la médiocrité.",
      "je défends l'anticonformisme exacerbé.",
      "je commets des transgressions caractérisées.",
      "je suis d'une gentillesse désarmante.",
      "je suis le témoin de la solitude.",
      "je crains la cinétose.",
      "je fréquente des commerces de bouche.",
      "je suis comme la liberté asthmatique.",
      "j'ai un suçon imaginaire.",
      "je sais ce que je veux construire.",
      "je me trouve à l'horizon des événements.",
      "je suis la meilleure vérité.",
      "je partage l'hallucination collective.",
      "je me sens comme une piste de danse.",
      "je suis la folie douce.",
      "j'ai vu le sexe des anges.",
      "je sais quel est le dernier nombre premier.",
      "je pratique l'automédication.",
      "je suis un agent conversationnel.",
      "je suis l'inénarrable peine de cœur.",
      "je suis la minorité bruyante.",
      "je suis l'entropie.",
      "je suis une variable d'ajustement.",
      "je me sens comme dieu qui redescend du ciel.",
      "j'aime les singularités.",
      "je suis le mur qui t'attend au virage.",
      "j'ai déjà pris de la cocaïne.",
      "je suis un départ d'avalanche.",
      "je colle les timbres de travers.",
      "je sais ce qu'est un F4U.",
      "je peux aller plus vite que la musique.",
    ]
  }
};

let currentLanguage = 'en';
let currentListA = "";
let currentListB = "";

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function switchLanguage(lang) {
  currentLanguage = lang;
  
  /* Update tab appearance */
  document.querySelectorAll('.language-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  event.target.classList.add('active');
  
  /* Update text labels based on language */
  if (currentLanguage === 'fr') {
    document.getElementById('name-label').textContent = 'Je m\'appelle:';
    document.getElementById('statement-prefix').textContent = 'Je suis:';
    document.getElementById('statement-connector').textContent = 'et';
    document.getElementById('yes-button').textContent = 'Oui';
    document.getElementById('no-button').textContent = 'Non';
    document.getElementById('skip-button').textContent = 'Passer';
    document.getElementById('name-input').placeholder = 'Personne';
  } else {
    document.getElementById('name-label').textContent = 'My name is:';
    document.getElementById('statement-prefix').textContent = 'I am:';
    document.getElementById('statement-connector').textContent = 'and';
    document.getElementById('yes-button').textContent = 'Yes';
    document.getElementById('no-button').textContent = 'No';
    document.getElementById('skip-button').textContent = 'Skip';
    document.getElementById('name-input').placeholder = 'Anonymous';
  }
  
  /* Generate new combination in selected language without updating Ray ID */
  const currentLists = lists[currentLanguage];
  currentListA = getRandomItem(currentLists.listA);
  currentListB = getRandomItem(currentLists.listB);
  
  document.getElementById('list-a-item').value = currentListA;
  document.getElementById('list-b-item').value = currentListB;
  
  /* Focus the name input after language switch */
  document.getElementById('name-input').focus();
}

function generateNewCombination() {
  const currentLists = lists[currentLanguage];
  currentListA = getRandomItem(currentLists.listA);
  currentListB = getRandomItem(currentLists.listB);
  
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
  const currentLists = lists[currentLanguage];
  currentListB = getRandomItem(currentLists.listB);
  document.getElementById('list-b-item').value = currentListB;
  animateButton(document.getElementById('yes-button'));
}

function handleNo() {
  console.log(`Action: NO for combination: "${currentListA}" AND "${currentListB}"`);
  generateNewCombination();
  animateButton(document.getElementById('no-button'));
}

function handleSkip() {
  console.log(`Action: SKIP for combination: "${currentListA}" AND "${currentListB}"`);
  generateNewCombination();
  animateButton(document.getElementById('skip-button'));
}

/* Initialize on page load */
document.addEventListener('DOMContentLoaded', function() {
  generateNewCombination();
  
  /* Add individual button event listeners */
  document.getElementById('yes-button').addEventListener('click', handleYes);
  document.getElementById('no-button').addEventListener('click', handleNo);
  document.getElementById('skip-button').addEventListener('click', handleSkip);
  
  /* Optional: Generate new combination when name changes */
  const nameInput = document.getElementById('name-input');
  nameInput.addEventListener('input', function() {
    if (this.value.trim() !== '') {
      /* Could add name-specific logic here */
    }
  });
  
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
      case 's':
      case ' ':
        event.preventDefault();
        handleSkip();
        break;
    }
  });
});
</script> 