---
layout: chantier
title: I AM
started: 2016-03-06 11:09
ended: 2025-07-13 11:09
labels: [list, game, vibe]
description: |

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

.uuid-display {
    font-size: 0.5em;
    color: #888;
    letter-spacing: 0.5px;
}
</style>

<div id="iam-container">
    <div class="language-tabs">
        <div class="language-tab active" onclick="switchLanguage('fr')">FRANÇAIS</div>
        <div class="language-tab" onclick="switchLanguage('en')">ENGLISH</div>
    </div>
    <div class="iam-interface">
        <div class="name-input-container">
            <span id="name-label">JE M'APPELLE:</span>
            <input type="text" id="name-input" placeholder="personne" maxlength="50">
        </div>
        
        <div class="statement-display" id="statement-display">
            <span id="statement-prefix">JE SUIS:</span> <input type="text" id="list-a-item" readonly> <span id="statement-connector">ET</span> <input type="text" id="list-b-item" readonly>
        </div>
        
        <div class="button-group">
            <button class="action-button" id="yes-button">OUI</button>
            <button class="action-button" id="no-button">NON</button>
            <button class="action-button" id="skip-button">PASSER</button>
        </div>
    </div>
    
    <div class="uuid-display" id="ray-id">Ray ID: generating...</div>
</div>

<script>
/* Lists of statements for combination in both languages */
const lists = {
  en: {
    listA: [
      "creative",
      "curious",
      "ambitious",
      "restless",
      "optimistic",
      "analytical",
      "intuitive",
      "passionate",
      "methodical",
      "spontaneous",
      "empathetic",
      "independent",
      "collaborative",
      "perfectionist",
      "adaptable",
      "persistent",
      "innovative",
      "contemplative",
      "energetic",
      "pragmatic",
      "Aries ♈",
      "Taurus ♉",
      "Gemini ♊",
      "Cancer ♋",
      "Leo ♌",
      "Virgo ♍",
      "Libra ♎",
      "Scorpio ♏",
      "Sagittarius ♐",
      "Capricorn ♑",
      "Aquarius ♒",
      "Pisces ♓",
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
      "fluid",
      "non-binary",
      "genderqueer",
      "agender",
      "bigender",
      "pangender",
      "genderfluid",
      "two-spirit",
      "vegetarian",
      "vegan",
      "pescatarian",
      "flexitarian",
      "carnivore",
      "omnivore",
      "fruitarian",
      "raw foodist",
      "ketogenic",
      "paleo",
      "gluten-free",
      "lactose intolerant",
      "dairy-free",
      "kosher",
      "halal",
      "happy",
      "sad",
      "depressed",
      "anxious",
      "excited",
      "calm",
      "angry",
      "frustrated",
      "content",
      "melancholic",
      "euphoric",
      "overwhelmed",
      "peaceful",
      "restless",
      "burnt-out",
      "motivated",
      "inspired",
      "confused",
      "nostalgic",
      "hopeful",
      "worried",
      "ecstatic",
      "moody",
      "serene",
      "irritated",
      "elated",
      "contemplative",
      "stressed",
      "in recovery",
      "alcoholic",
      "addicted",
      "sober",
      "clean",
      "immigrant",
      "native",
      "indigenous",
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
      "first-generation",
      "second-generation",
      "mixed-race",
      "biracial",
      "multicultural",
      "climate-conscious"
    ],
    listB: [
      "the mother of all miracles",
      "alpha go's move 37",
      "the interest of time",
      "an angry postcard",
      "Bavaria as god intended",
      "a shift in attitude / solitude",
      "the 13th step",
      "the death of god",
      "skill in action",
      "ignorance talking",
      "Dopey's episode 142",
      "convergence in action",
      "what happened when strangers meet",
      "the flag of a dead country",
      "the practice of love",
      "the promise of a dead man",
      "the path towards",
      "god in her infinite wisdom",
      "the universe experiencing itself subjectively",
      "the fear of change",
      "a compelling case against humanity",
      "emotion that fills the blanks",
      "the face of immense suffering",
      "the end before the begging",
      "the need for war that becomes the need for cooperation",
      "the same issue seen from two different sides",
      "the inability to love",
      "the trend in the other direction",
      "the lack of capacity for emotions",
      "the manifestation of emptiness",
      "the failure of logic",
      "the stick and both ends",
      "the reality of the situation",
      "the light at the end of the tunnel",
      "the sacrifice of the present for the future",
      "the competition for attention",
      "the shadow of the future",
      "all the love one heart can hold",
      "the justification for the suppression of society",
      "a dog with a bone",
      "the urge for endings",
      "the vacuum of space",
      "the vanishing sense of purpose",
      "the Goldilocks zone",
      "the opposite of raising",
      "the step back before the step forward",
      "the premise of trust",
      "the difference between life and death",
      "a Swiss army smile",
      "the eroded sense of love",
      "the genuine discussion with yourself",
      "the foreseeable past",
      "someone else's problems",
      "the force for change",
      "the edge of what's most important",
      "the fly on the wall",
      "the bad situation to be in",
      "the work in progress",
      "the inevitable",
      "love as a currency",
      "the plan in motion",
      "two connected dots",
      "the acceptance of what isn't real",
      "the place you call home",
      "all the true words",
      "the best course of action",
      "annihilation as an answer",
      "the absence of knowing",
      "the contemplation of suicide",
      "the long run",
      "your voice",
      "the laugh of god",
      "the grand scheme of things",
      "the lonely fight",
      "the birds alphabet",
      "the ongoing process",
      "the bigger picture",
      "trouble and happiness",
      "the deepest darkest blue",
      "the turning point",
      "a long and happy life",
      "the collective insanity",
      "the present life is giving you",
      "the next best day of your life",
      "the opposite or the lack thereof",
      "the deafening silence",
      "the top and the cherry",
      "the unlikely event of an emergency landing",
      "the ending of time",
      "the unconsidered wisdom",
      "the ignorance and the bliss",
      "the witness of art",
      "the hideous picture of happiness",
      "the chocolate chip in your cookie",
      "the world you are creating for yourself",
      "the invitation to your own ending",
      "a closed concept",
      "a one sided conversation",
      "the great time to be alive",
      "the apparatus",
      "the feeling of restlessness",
      "a sense of purposelessness",
      "the unremarkable regularity",
      "an ugly place",
      "clean destruction",
      "a massive gap",
      "the fabric of society",
      "the juice and the lemon",
      "the realm of possibilities",
      "the footnote to an assumption",
      "the significant other",
      "altitude sickness",
      "a maple syrup fire",
      "the conscious effort",
      "a bigger plan",
      "the endpoint of the spectrum",
      "wanna be'ism",
      "this invisible thought"
    ]
  },
  fr: {
    listA: [
      "créatif·ve",
      "curieux·se",
      "ambitieux·se",
      "agité·e",
      "optimiste",
      "analytique",
      "intuitif·ve",
      "passionné·e",
      "méthodique",
      "spontané·e",
      "empathique",
      "indépendant·e",
      "collaboratif·ve",
      "perfectionniste",
      "adaptable",
      "persistant·e",
      "innovant·e",
      "contemplatif·ve",
      "énergique",
      "pragmatique",
      "Bélier ♈",
      "Taureau ♉",
      "Gémeaux ♊",
      "Cancer ♋",
      "Lion ♌",
      "Vierge ♍",
      "Balance ♎",
      "Scorpion ♏",
      "Sagittaire ♐",
      "Capricorne ♑",
      "Verseau ♒",
      "Poissons ♓",
      "lesbienne",
      "gay",
      "bisexuel",
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
      "fluide",
      "non-binaire",
      "genderqueer",
      "agenre",
      "bigenre",
      "pangenre",
      "genre fluide",
      "bispirituel",
      "végétarien·ne",
      "végan·e",
      "pescétarien·ne",
      "flexitarien·ne",
      "carnivore",
      "omnivore",
      "fruitarien·ne",
      "crudivore",
      "cétogène",
      "paléo",
      "sans gluten",
      "intolérant·e au lactose",
      "sans lactose",
      "casher",
      "halal",
      "heureux·se",
      "triste",
      "déprimé·e",
      "anxieux·se",
      "excité·e",
      "calme",
      "en colère",
      "frustré·e",
      "content·e",
      "mélancolique",
      "euphorique",
      "débordé·e",
      "paisible",
      "agité·e",
      "épuisé·e",
      "motivé·e",
      "inspiré·e",
      "confus·e",
      "nostalgique",
      "plein·e d'espoir",
      "inquiet·ète",
      "extatique",
      "lunatique",
      "serein·e",
      "irrité·e",
      "transporté·e",
      "contemplatif·ve",
      "stressé·e",
      "en rétablissement",
      "alcoolique",
      "dépendant·e",
      "sobre",
      "clean",
      "immigré·e",
      "natif·ve",
      "indigène",
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
      "classe ouvrière",
      "classe moyenne",
      "classe supérieure",
      "première génération",
      "deuxième génération",
      "métis·se",
      "biracial·e",
      "multiculturel·le",
      "climato-convaincu·e"
    ],
    listB: [
      "le bon dieu sans confession",
      "un chien de faillence",
      "un pitbull en laisse",
      "un chèque en blanc",
      "la marche implacable du temps",
      "la puissance de la santé humaine",
      "l'âge d'or du rap français",
      "un tsunami",
      "le fétichisme du passé",
      "la puissance silencieuse",
      "la disparition de l'amour",
      "l'idée que les gens se font de la démocratie",
      "le futur sur répondeur",
      "la rage maîtrisée",
      "la guérison",
      "le cynisme du marketing",
      "la capitalisme tardif",
      "le premier pas sur la lune",
      "la sobriété comme fond de commerce",
      "partout mais pas tout le temps",
      "les gens qui aiment les gens",
      "la hiérarchie des combats",
      "Paris sans la tour eiffel",
      "la France sous l'occupation",
      "un pistolet dans une main qui tremble",
      "le nivellement par le bas",
      "le déficit d'agressivité",
      "le soulèvement d'un peuple",
      "le vide qui se rapproche",
      "le monde qui s'effondre",
      "les données immédiates de la conscience",
      "la gravité qui te rattrape",
      "la conscience proclamée",
      "le remède aux cœurs brisés",
      "deux personne qui regardent dans la même direction",
      "la musique de l'amour",
      "les rues de Paris",
      "l'accoutumance au risque",
      "la porte d'un nouveau monde",
      "le muscle de l'amour",
      "aussi dangereux que l'ennemi",
      "un tunnel de violence",
      "l'incarnation de la perfection",
      "l'expression de la singularité",
      "la croyance en le contraire",
      "les choses de la vie",
      "une réponse aussi silencieuse que la question",
      "l'intérêt pour l'éphémère",
      "l'odeur des tilleuls à Cologne le 26 juin 2021, 14:50",
      "l'argument qui a convaincu l'humanité",
      "un retour de karma",
      "la drogue la plus forte du monde",
      "les conséquences de l'amour",
      "une vie passée à fuir",
      "le temps qui fait son œuvre",
      "le verbe amour conjugué au passé",
      "le destin qui prend une décision pour trois",
      "la naissance d'un souvenir",
      "ce qui maintient en vie",
      "l'envie de renouer avec la joie",
      "l'endurance à la souffrance",
      "un pont en flammes",
      "le soleil qui se jette de l'océan",
      "une prière au soleil",
      "chaque étoile dans le ciel",
      "l'injonction à la pénétration",
      "la jouissance sans objet",
      "le droit à la victoire",
      "l'outrage du temps",
      "les quatre chemins",
      "la loi du marché",
      "la mécanique du cœur",
      "la blague la plus longue du monde",
      "l'altitude",
      "la quête d'absolu",
      "tout sauf le silence",
      "la marrée qui redescend",
      "les bruits sourds de l'amour",
      "une vie qui s'achève",
      "le bruit des vagues",
      "le récit d'une vie rêvée",
      "l'accent français",
      "le plaisir sans la passion",
      "le bruit que deux étoiles font quand elles se rencontrent",
      "la peste et le choléra",
      "l'amour déçu",
      "la promesse de l'humanité",
      "le chemin de la maison",
      "un tir sans sommation",
      "l'abdication de l'humanité",
      "le prix du sang versé",
      "la prise de risque maximale",
      "l'invention d'un esprit malade",
      "l'accoutumance à la souffrance",
      "l'espoir comme moteur",
      "le grand spectacle de la violence",
      "un hymne à la cruauté",
      "la passion pour l'autodestruction",
      "un moment de vertige",
      "la peur de la mort",
      "le million d'années à venir",
      "la part des choses",
      "ce qu'on appelle le hasard",
      "l'air du temps",
      "le retard sur la vie",
      "un je t'aime comme un appel à l'aide",
      "la confiance en l'amour",
      "le décès de l'espoir",
      "l'eau qui coule sous les ponts",
      "la faucheuse en string",
      "le désir de l'avenir",
      "un caprice du destin",
      "l'incarnation du doute",
      "l'absence",
      "le sentiment d'inachevé",
      "le résumé de l'humanité",
      "la différence entre la douleur et la souffrance",
      "le bout du monde",
      "l'amour en sa plus simple expression",
      "l'allégorie du fossé et du champ de mines",
      "la vie à deux pour les mauvaises raisons",
      "la dependence à la souffrance",
      "le tort d'autrui",
      "la séparation durable",
      "la plainte de l'univers",
      "la beauté sans charme",
      "une pincée de tristesse",
      "une raison d'être triste",
      "les bases d'une relation saine",
      "l'origine du mal",
      "le regret de rien",
      "le cas échéant",
      "la vérité d'en face",
      "la crainte du manque",
      "une armure de chaire",
      "la haine sur son visage",
      "l'échec associé à la douleur",
      "la peine sans limites",
      "la leçon la plus importante de la vie",
      "le ministre du destin",
      "le mois de novembre",
      "l'ordre logique des choses",
      "les cartes en main",
      "la lente litanie",
      "le bâton qui brise les os",
      "l'amour après la mort",
      "l'eau des fleurs",
      "l'œuf qui éclos",
      "le bitume",
      "le sort de l'humanité",
      "le prénom de Jesus",
      "l'engouement aveugle",
      "l'attrait pour l'argent",
      "l'autoroute du confort",
      "le kidnapping de l'humanité",
      "la honte qui change de corps",
      "le diamètre et le carré",
      "l'optimisme aveugle",
      "le domaine du rêve",
      "un cimetière d'enfants",
      "là claustrophobie des hauteurs",
      "l'optimisme en philosophie",
      "le rose et l'asymétrie",
      "l'âme et la vague",
      "l'hégémonie",
      "une lucarne sur le paradis",
      "l'aversion pour le mensonge",
      "l'avant goût du risque",
      "la chance en amour",
      "le sens des mots",
      "l'abolition de l'univers",
      "l'havre et la paix",
      "l'enduit de la pensée universelle",
      "une pensée de toi",
      "l'incarnation de l'optimisme",
      "le partage entre le manque et la colère",
      "les yeux de la loi",
      "l'exploitation de la tristesse humaine",
      "les premiers émois",
      "la redondance. Je suis la redondance",
      "aujourd'hui",
      "la croix",
      "la tour Eiffel",
      "la conjugaison du verbe oublier",
      "le beau qui persiste sous l'injure",
      "midi à la porte",
      "une piscine de sang",
      "un faisceau d'indices concordants",
      "le risque zéro",
      "le mortier et le pilon",
      "la mort d'un cheval",
      "l'amour à la guerre",
      "un ménage à deux",
      "une chambre pour deux",
      "une réservation pour deux",
      "l'art totale",
      "l'apologie de la médiocrité",
      "l'anticonformisme exacerbé",
      "la transgression caractérisée",
      "la gentillesse désarmante",
      "le témoin de la solitude",
      "la cinétose",
      "un commerce de bouche",
      "la liberté asthmatique",
      "un suçon imaginaire",
      "celui qui prêtait sa voix",
      "le TER Lorraine nº837465",
      "une construction",
      "une fleur d'aubergine",
      "l'horizon des événements",
      "la meilleure vérité",
      "une hallucination collective",
      "une piste de dance",
      "une plage privée",
      "l'eau délicieuse",
      "l'eau sucrée",
      "un confetti",
      "la folie douce",
      "le sexe des anges",
      "le dernier nombre premier",
      "l'automédication",
      "un agent conversationnel",
      "l'inénarrable peine de cœur",
      "la minorité bruyante",
      "l'entropie",
      "une variable d'ajustement",
      "le dieu qui redescend du ciel",
      "la singularité",
      "un souvenir Technicolor",
      "un moment d'allégresse",
      "le mur qui t'attend au virage",
      "cette blonde sous cocaïne qui va vomir",
      "un départ d'avalanche",
      "un timbre collé de travers",
      "un F4U sous le soleil levant",
      "le fil d'Ariane",
      "de l'huile pour chaîne de tronçonneuse"
    ]
  }
};

let currentLanguage = 'fr';
let currentListA = "";
let currentListB = "";

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function updateRayId() {
  const uuid = crypto.randomUUID();
  const rayId = uuid.slice(0, -1) + '4';
  console.log('Updating Ray ID to:', rayId);
  document.getElementById('ray-id').textContent = 'Ray ID: ' + rayId;
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
    document.getElementById('name-label').textContent = 'JE M\'APPELLE:';
    document.getElementById('statement-prefix').textContent = 'JE SUIS:';
    document.getElementById('statement-connector').textContent = 'ET';
    document.getElementById('yes-button').textContent = 'OUI';
    document.getElementById('no-button').textContent = 'NON';
    document.getElementById('skip-button').textContent = 'PASSER';
    document.getElementById('name-input').placeholder = 'personne';
  } else {
    document.getElementById('name-label').textContent = 'MY NAME IS:';
    document.getElementById('statement-prefix').textContent = 'I AM:';
    document.getElementById('statement-connector').textContent = 'AND';
    document.getElementById('yes-button').textContent = 'YES';
    document.getElementById('no-button').textContent = 'NO';
    document.getElementById('skip-button').textContent = 'SKIP';
    document.getElementById('name-input').placeholder = 'anonymous';
  }
  
  /* Generate new combination in selected language without updating Ray ID */
  const currentLists = lists[currentLanguage];
  currentListA = getRandomItem(currentLists.listA);
  currentListB = getRandomItem(currentLists.listB);
  
  document.getElementById('list-a-item').value = currentListA;
  document.getElementById('list-b-item').value = currentListB;
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
  updateRayId();
  
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