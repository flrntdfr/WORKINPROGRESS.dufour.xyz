---
layout: chantier
title: TruthLLM
started: 2024-08-04 00:00
labels: [LLM, web]
tech: [GPT2]
description: |
    ThruthLLM is a small "Large" Language Model (LLM) that will answer any question — regardless of their complexity — in less than 1000 tokens.
---

<script type="module">
    import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.6.0/dist/transformers.min.js';

    env.logLevel = 'debug';

    const status = document.getElementById('llm-status');
    const input = document.getElementById('llm-input');
    const output = document.getElementById('llm-output');
    const luckyButton = document.getElementById('lucky-button');

    const questions = [
        "Can plants drink sparkling water?",
        "Do red flags mean danger?",
        "What do all zodiac signs have in common?",
        "Why eat boogers?",
        "When did God die?",
        "Why is God sad?",
        "Why does burnt hair stink?",
        "Should you feel your teeth?",
        "How tall is 7 feet in cm?",
        "Who killed Bob Marley?",
        "Is alcohol the path to oblivion?",
        "Why do old people walk in cemeteries?",
        "What's the path to enlightenment?",
        "How to avoid the wall?",
        "Are people happy with their underwear?",
        "Do presidents vote for themselves?",
        "What do lonely people think about?",
        "Where do travelers go?",
        "Where do waves come from?",
        "What genes are evolving now?",
        "Why does time exist?",
        "Why do babies suck thumbs in womb?",
        "Do airlines show Lost?"
    ];

    function setRandomPlaceholder() {
        const randomIndex = Math.floor(Math.random() * questions.length);
        input.placeholder = questions[randomIndex];
    }

    async function main() {
        try {
            status.textContent = '[Loading language model...]';

            const progressCallback = (info) => {
                if (info.status === 'progress') {
                    const percentage = info.progress.toFixed(2);
                    status.textContent = `[Loading ${info.file}: ${percentage}%]`;
                } else if (info.status === 'done') {
                    status.textContent = `[Finished loading ${info.file}.]`;
                } else {
                    status.textContent = `[Status: ${info.status}]`;
                }
            };

            let generator;
            try {
                /* First attempt: load a lightweight GPT-2 (distilled) – quantised if available */
                generator = await pipeline('text-generation', 'Xenova/distilgpt2', {
                    progress_callback: progressCallback,
                });
            } catch (initialError) {
                console.warn('First attempt to load Xenova/distilgpt2 failed, retrying with fp32...', initialError);

                generator = await pipeline('text-generation', 'Xenova/distilgpt2', {
                    dtype: 'fp32',
                    progress_callback: progressCallback,
                });
            }

            status.textContent = '[Xenova/distilgpt2]';
            input.disabled = false;
            luckyButton.disabled = false;
            setRandomPlaceholder();

            input.addEventListener('input', () => {
                /* Only update button if not in reset mode */
                if (!luckyButton.classList.contains('reset-mode')) {
                    luckyButton.textContent = input.value.length > 0 ? 'Ask' : "I'm feeling lucky";
                }
            });

            luckyButton.addEventListener('click', () => {
                console.log('Lucky button clicked. Text content is:', luckyButton.textContent);
                if (luckyButton.classList.contains('reset-mode')) {
                    /* Reset mode: clear everything */
                    input.value = '';
                    output.textContent = '';
                    luckyButton.textContent = "I'm feeling lucky";
                    luckyButton.classList.remove('reset-mode');
                    setRandomPlaceholder();
                } else if (luckyButton.textContent === "I'm feeling lucky") {
                    input.value = input.placeholder;
                    luckyButton.textContent = 'Ask';
                } else {
                    runLLM();
                }
            });

            async function runLLM() {
                const inputText = input.value.trim();
                console.log('Input text:', inputText);
                if (!inputText) {
                    return;
                }

                input.disabled = true;
                luckyButton.disabled = true;
                /* Start the animated dots */
                let dotCount = 0;
                const dotInterval = setInterval(() => {
                    const dots = '.'.repeat(dotCount + 1);
                    status.textContent = `[Generating${dots}]`;
                    dotCount = (dotCount + 1) % 3;
                }, 500);
                
                /* Store interval ID to clear it later */
                status.dataset.dotInterval = dotInterval;
                output.textContent = '';

                try {
                    const resultStream = await generator(inputText, { 
                        max_new_tokens: 1000,
                        temperature: 0.85,
                        top_p: 0.92,
                        do_sample: true,
                        repetition_penalty: 1.15,
                        top_k: 60,
                        length_penalty: 1.05,
                        no_repeat_ngram_size: 3,
                        early_stopping: true,
                        stream: true 
                    });
                    console.log('Result stream:', resultStream);
                    
                    let fullText = '';
                    for await (const chunk of resultStream) {
                        console.log('Received chunk:', chunk);
                        fullText = chunk.generated_text;
                    }
                    /* Remove the input question from the beginning of the output */
                    let cleanOutput = fullText;
                    if (fullText.toLowerCase().includes(inputText.toLowerCase())) {
                        const inputIndex = fullText.toLowerCase().indexOf(inputText.toLowerCase());
                        if (inputIndex === 0 || inputIndex < 50) { /* Remove if at start or very early */
                            cleanOutput = fullText.substring(inputIndex + inputText.length).trim();
                        }
                    }
                    /* Remove the ▎ character from the end of the output */
                    cleanOutput = cleanOutput.replace(/▎$/, '').trim();
                    /* Debug: log the output to see what characters are present */
                    console.log('Raw output:', JSON.stringify(fullText));
                    console.log('Clean output:', JSON.stringify(cleanOutput));
                    /* Remove any invisible or special characters from the end */
                    cleanOutput = cleanOutput.replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200F\uFEFF\uFFFD▎]$/, '').trim();
                    output.textContent = cleanOutput;
                } catch (e) {
                    console.error('Error during generation:', e);
                    output.textContent = 'An error occurred during generation: ' + e.message;
                } finally {
                    status.textContent = '[Xenova/distilgpt2]';
                    /* Clear the animated dots */
                    if (status.dataset.dotInterval) {
                        clearInterval(parseInt(status.dataset.dotInterval));
                        delete status.dataset.dotInterval;
                    }
                    input.disabled = false;
                    luckyButton.disabled = false;
                    /* Switch to reset mode */
                    luckyButton.textContent = 'Reset';
                    luckyButton.classList.add('reset-mode');
                    setRandomPlaceholder();
                }
            }

            input.addEventListener('keydown', (e) => {
                console.log('Keydown event on input. Key:', e.key);
                if (e.key === 'Enter') {
                    runLLM();
                }
            });
        } catch (e) {
            status.textContent = '[Failed to load model.]';
            output.textContent = 'An error occurred: ' + e.message;
        }
    }

    main();

    /* Generate and display Ray ID */
    document.addEventListener('DOMContentLoaded', function() {
        var uuidElement = document.getElementById('uuid-display');
        if (uuidElement) {
            var uuid = crypto.randomUUID();
            uuidElement.textContent = 'Ray ID: ' + uuid.slice(0, -1) + '4';
        }
    });
</script>


<div id="llm-container">
    <div id="llm-status">Loading model...</div>
    <div class="llm-input-container">
        <input type="text" id="llm-input" placeholder="Loading..." disabled>
        <button id="lucky-button" disabled>I'm feeling lucky</button>
    </div>
    <pre id="llm-output"></pre>
    <div class="uuid-display" id="uuid-display"></div>
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
    border: 1px solid #ccc;
}

#lucky-button {
    padding: 8px 16px;
    font-size: 1em;
    cursor: pointer;
}

.uuid-display {
    font-size: 0.5em;
    color: #888;
    letter-spacing: 0.5px;
}

@keyframes dots {
    0%, 20% {
        content: '';
    }

    40% {
        content: '.';
    }

    60% {
        content: '..';
    }

    80%, 100% {
        content: '...';
    }
}

.generating {
    position: relative;
}

.generating::after {
    content: '';
    animation: dots 1.5s infinite;
    position: absolute;
    left: 100%;
    top: 0;
}
</style>