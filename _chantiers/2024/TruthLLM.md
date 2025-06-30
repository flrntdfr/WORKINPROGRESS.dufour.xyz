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
    import { pipeline, env } from '/assets/lib/transformers/transformers.min.js';

    const questions = [
        "Why are we here?",
        "What sees when I see?",
        "Who observes my thoughts?",
        "Is reality an illusion?",
        "Can truth lie?",
        "Is suffering necessary?",
        "Does time heal souls?",
        "Who forgives first?",
        "Does silence speak louder?",
        "Can infinity end?",
        "Who created meaning?",
        "Is love learned?",
        "Where does the past go?",
        "Can emptiness be full?",
        "Is choice real?",
        "Why do hearts ache?",
        "Who feels when I'm numb?",
        "Does truth have sides?",
        "Is death an answer?",
        "Are we dreaming now?",
        "Is freedom possible?",
        "What does nothing want?",
        "Can the lost find themselves?",
        "Who listens to prayers?",
        "Why do memories fade?",
        "Is perfection lonely?",
        "Does the soul age?",
        "Can you measure wisdom?",
        "Is peace silence?",
        "Who guides the seeker?",
        "What is beyond consciousness?",
        "Do we shape reality?",
        "Does meaning expire?",
        "Can you trust the unknown?",
        "Who mourns forgotten dreams?",
        "Is purpose discovered or made?",
        "Does every path lead home?",
        "Can awareness exist alone?",
        "Why do we chase shadows?",
        "Is surrender strength?",
        "Who narrates existence?",
        "Does belief limit truth?",
        "Is the universe aware of us?",
        "Why seek what can't be known?",
        "Does truth need proof?",
        "Can one transcend self?",
        "Where does fear come from?",
        "Who heals the healer?",
        "Are endings illusions?",
        "Can knowing bring peace?",
        "Why must we question?",
        "Does patience reveal answers?",
        "Who lives when I die?",
        "Is growth infinite?",
        "Can hope deceive?",
        "Why do we hide from ourselves?",
        "Is existence enough?",
        "Who decides what's fair?",
        "Can you lose what's eternal?",
        "Is longing a truth?",
        "Why must wisdom hurt?"
    ];
    env.logLevel = 'debug';

    const status = document.getElementById('llm-status');
    const input = document.getElementById('llm-input');
    const output = document.getElementById('llm-output');
    const askButton = document.getElementById('ask-button');
    const luckyButton = document.getElementById('lucky-button');


    function setRandomPlaceholder() {
        const randomIndex = Math.floor(Math.random() * questions.length);
        input.placeholder = questions[randomIndex];
    }

    async function main() {
        console.log('🚀 TruthLLM: Starting main function');
        try {
            status.textContent = 'Loading language model...';

            const progressCallback = (info) => {
                console.log('📦 Progress:', info);
                if (info.status === 'progress') {
                    const percentage = info.progress.toFixed(2);
                    status.textContent = `Loading ${info.file}: ${percentage}%`;
                } else if (info.status === 'done') {
                    status.textContent = `Finished loading ${info.file}.`;
                } else {
                    status.textContent = `Status: ${info.status}`;
                }
            };

            let generator;
            try {
                console.log('🔍 Attempting to load model from local path: /assets/models/onnx/model_quantized.onnx');
                /* Load model from local assets folder */
                generator = await pipeline('text-generation', '/assets/models/onnx/model_quantized.onnx', {
                    progress_callback: progressCallback,
                });
                console.log('✅ Successfully loaded model from local path');
            } catch (localError) {
                console.warn('❌ Local model loading failed, falling back to remote model...', localError);
                
                try {
                    console.log('🌐 Attempting to load model from remote: Xenova/distilgpt2');
                    /* Fallback to remote model */
                    generator = await pipeline('text-generation', 'Xenova/distilgpt2', {
                        progress_callback: progressCallback,
                    });
                    console.log('✅ Successfully loaded model from remote');
                } catch (remoteError) {
                    console.warn('❌ Remote model also failed, trying with fp32...', remoteError);
                    
                    console.log('🔄 Attempting to load model with fp32 precision');
                    generator = await pipeline('text-generation', 'Xenova/distilgpt2', {
                        dtype: 'fp32',
                        progress_callback: progressCallback,
                    });
                    console.log('✅ Successfully loaded model with fp32 precision');
                }
            }

            console.log('🎯 Model loaded successfully, enabling UI');
            status.textContent = 'onnx/model_quantized.onnx';
            input.disabled = false;
            askButton.disabled = false;
            luckyButton.disabled = false;
            setRandomPlaceholder();
            console.log('🎲 Set random placeholder:', input.placeholder);

            input.addEventListener('input', () => {
                /* Update Ask button based on input content */
                askButton.disabled = input.value.length === 0;
            });

            askButton.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Ask button clicked');
                input.value = input.placeholder;
                runLLM();
            });

            luckyButton.addEventListener('click', (e) => {
                console.log('Lucky button clicked');
                if (luckyButton.classList.contains('reset-mode')) {
                    /* Reset mode: reload the page */
                    window.location.reload();
                } else {
                    e.preventDefault();
                    setRandomPlaceholder();
                }
            });

            async function runLLM() {
                console.log('🚀 Starting LLM generation');
                const inputText = input.value.trim();
                console.log('📝 Input text:', inputText);
                if (!inputText) {
                    console.log('⚠️ No input text provided, returning');
                    return;
                }

                console.log('🔒 Disabling input and buttons during generation');
                input.disabled = true;
                askButton.disabled = true;
                luckyButton.disabled = true;
                document.getElementById('llm-container').classList.add('generating');
                /* Start the animated dots */
                let dotCount = 0;
                const dotInterval = setInterval(() => {
                    const dots = '.'.repeat(dotCount + 1);
                    status.textContent = `Generating${dots}`;
                    dotCount = (dotCount + 1) % 3;
                }, 500);
                
                /* Store interval ID to clear it later */
                status.dataset.dotInterval = dotInterval;
                output.textContent = '';
                console.log('🎬 Started animation interval, cleared output');

                try {
                    console.log('🎯 Calling generator with parameters:', {
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
                    console.log('📡 Result stream received:', resultStream);
                    
                    let fullText = '';
                    let previousText = '';
                    let chunkCount = 0;
                    
                    console.log('🔄 Starting to process streaming chunks');
                    for await (const chunk of resultStream) {
                        chunkCount++;
                        console.log(`📦 Chunk ${chunkCount}:`, chunk);
                        const newText = chunk.generated_text;
                        
                        /* Stream new tokens to screen */
                        if (newText && newText !== previousText) {
                            const diff = newText.substring(previousText.length);
                            console.log(`➕ Adding to output: "${diff}"`);
                            output.textContent += diff;
                            previousText = newText;
                        }
                        fullText = newText;
                    }
                    console.log(`✅ Finished processing ${chunkCount} chunks`);
                    console.log('📄 Full generated text:', fullText);
                    
                    /* Clean up the final output */
                    console.log('🧹 Cleaning up output');
                    let cleanOutput = fullText;
                    if (fullText.toLowerCase().includes(inputText.toLowerCase())) {
                        const inputIndex = fullText.toLowerCase().indexOf(inputText.toLowerCase());
                        console.log(`🔍 Found input text at index: ${inputIndex}`);
                        if (inputIndex === 0 || inputIndex < 50) {
                            cleanOutput = fullText.substring(inputIndex + inputText.length).trim();
                            console.log(`✂️ Removed input text, cleaned output: "${cleanOutput}"`);
                        }
                    }

                    
                    /* Update with cleaned version */
                    output.textContent = cleanOutput;
                } catch (e) {
                    console.error('❌ Error during generation:', e);
                    output.textContent = 'An error occurred during generation: ' + e.message;
                } finally {
                    console.log('🏁 Generation completed, cleaning up');
                    status.textContent = 'onnx/model_quantized.onnx';
                    /* Clear the animated dots */
                    if (status.dataset.dotInterval) {
                        clearInterval(parseInt(status.dataset.dotInterval));
                        delete status.dataset.dotInterval;
                        console.log('⏹️ Cleared animation interval');
                    }
                    document.getElementById('llm-container').classList.remove('generating');
                    input.disabled = true;
                    askButton.disabled = true;
                    luckyButton.disabled = false;
                    /* Switch to reset mode */
                    luckyButton.textContent = 'Reset';
                    luckyButton.classList.add('reset-mode');
                    setRandomPlaceholder();
                    console.log('🔄 Switched to reset mode, input disabled');
                }
            }

            input.addEventListener('keydown', (e) => {
                console.log('Keydown event on input. Key:', e.key);
                if (e.key === 'Enter') {
                    runLLM();
                }
            });
        } catch (e) {
            console.error('💥 Fatal error in main function:', e);
            status.textContent = 'Failed to load model.';
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
        <input type="text" id="llm-input" placeholder="..." disabled>
        <button id="ask-button" disabled>Ask</button>
        <button id="lucky-button" disabled>I'm feeling lucky</button>
    </div>
    <pre id="llm-output"></pre>
    <div class="uuid-display" id="uuid-display"></div>
</div>

<style>
#llm-container {
    font-family: monospace;
}

#llm-container.generating {
    cursor: wait;
}

#llm-container.generating * {
    cursor: wait;
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