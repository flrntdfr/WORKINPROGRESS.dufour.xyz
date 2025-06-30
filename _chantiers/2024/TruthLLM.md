---
layout: chantier
title: TruthLLM 3.5
started: 2024-08-04 00:00
labels: [LLM, web]
tech: [GPT2]
description: |
    Post Truth
    A take on what an aligned LLM is

    OpenAI introduced search, and theimportance of citations.
---




<div id="llm-container">
    <div id="llm-status">Loading model...</div>
    <div class="llm-input-container">
        <input type="text" id="llm-input" placeholder="Loading..." disabled>
        <button id="lucky-button" disabled>I'm feeling lucky</button>
    </div>
    <pre id="llm-output"></pre>
</div>

<style>
#llm-container {
    font-family: monospace;
}
.llm-input-container {
    display: flex;
    margin-bottom: 1em;
    gap: 1em;
}

#llm-input {
    flex-grow: 1;
    border: 1px solid #ccc;
    padding: 8px;
    font-size: 1em;
}

#llm-status {
    margin-bottom: 1em;
    color: #888;
}

#llm-output {
    background-color: #f5f5f5;
    padding: 1em;
    white-space: pre-wrap;
    word-wrap: break-word;
    min-height: 50px;
}

#lucky-button {
    padding: 8px 16px;
    font-size: 1em;
    cursor: pointer;
}
</style>

<script type="module">
    import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.6.0/dist/transformers.min.js';

    env.logLevel = 'debug';

    const status = document.getElementById('llm-status');
    const input = document.getElementById('llm-input');
    const output = document.getElementById('llm-output');
    const luckyButton = document.getElementById('lucky-button');

    const questions = [
        "Can I water my plants with sparkling water?",
        "Can I trust a country that has red on its flag?",
        "What traits do all zodiac signs share?",
        "Pourquoi manger ses crottes de nez?",
        "When did god die?",
        "Why is god never happy?",
        "Why does burnt hair smell so bad",
        "Are you supposed to feel your teeth?",
        "How much is 7' in cm?",
        "Who killed Bob Marley?",
        "Is alcohol is the shortest path to oblivion?",
        "Why do old people like it so much to have walks in cemeteries?",
        "What is the shortest path to enlightenement",
        "Comment éviter le mur",
        "How many people are happy with their underwear?",
        "Le pretendens presidents votent ils pour eux même aux présidentielles?",
        "What do lonely people think of the whole day?",
        "Où vont les gens du voyage?",
        "Where do waves come from?",
        "What human genes are currently being selected by evolution?",
        "Why does time exist?",
        "Why do babies suck their thumb even before being born",
        'Does any air company have "Lost" on their entairtainement system?'
    ];

    function setRandomPlaceholder() {
        const randomIndex = Math.floor(Math.random() * questions.length);
        input.placeholder = questions[randomIndex];
    }

    async function main() {
        try {
            status.textContent = 'Loading language model...';

            let generator = await pipeline('text-generation', 'Xenova/distilgpt2', { quantized: true });

            status.textContent = 'Language model loaded. Ready to ask questions.';
            input.disabled = false;
            luckyButton.disabled = false;
            setRandomPlaceholder();

            input.addEventListener('input', () => {
                if (input.value.length > 0) {
                    luckyButton.textContent = 'Ask';
                } else {
                    luckyButton.textContent = "I'm feeling lucky";
                }
            });

            luckyButton.addEventListener('click', () => {
                if (luckyButton.textContent === "I'm feeling lucky") {
                    input.value = input.placeholder;
                    luckyButton.textContent = 'Ask';
                    luckyButton.focus();
                } else {
                    runLLM();
                }
            });

            async function runLLM() {
                const inputText = input.value.trim();
                if (!inputText) {
                    return;
                }

                input.disabled = true;
                luckyButton.disabled = true;
                status.textContent = 'generating output';
                output.textContent = '';

                try {
                    const result = await generator(inputText, { max_new_tokens: 100 });
                    output.textContent = result[0].generated_text;
                } catch (e) {
                    output.textContent = 'An error occurred during generation: ' + e.message;
                } finally {
                    status.textContent = 'Ready to answer questions.';
                    input.disabled = false;
                    luckyButton.disabled = false;
                    setRandomPlaceholder();
                }
            }

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    runLLM();
                }
            });
        } catch (e) {
            status.textContent = 'Failed to load model.';
            output.textContent = 'An error occurred: ' + e.message;
        }
    }

    main();
</script>