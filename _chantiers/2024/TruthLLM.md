---
layout: chantier
title: TruthLLM
started: 2024-08-04 00:00
ended: 2024-10-02 00:00
labels: [LLM, web]
tech: [GPT2]
description: |
    ThruthLLM is a "Large" Language Model that will answer any question truthfully in less than 1000 tokens.
---

<script type="module">
    import { pipeline, env } from '/assets/lib/transformers/transformers.min.js';

    const questions = [
        "Why are we here?",
        "Why is the sky blue?",
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
        "Why must wisdom hurt?",
        "What is zero divided by zero?",
        "Can you observe without changing?",
        "Is the universe finite?",
        "What exists between atoms?",
        "Can time be negative?",
        "What is infinity minus infinity?",
        "Does consciousness collapse reality?",
        "What is the square root of -1?",
        "Can you measure position and momentum?",
        "What is the speed of dark?",
        "Does the past still exist?",
        "What is the shape of space?",
        "Can you count to infinity?",
        "What is the color of a mirror?",
        "Does quantum randomness exist?",
        "What is the weight of light?",
        "Can you divide by zero?",
        "What is the sound of silence?",
        "Does the future influence the past?",
        "What is the temperature of a vacuum?",
        "Can you prove you exist?",
        "What is the size of nothing?",
        "Does mathematics exist independently?",
        "What is the speed of thought?",
        "Can you observe the observer?",
        "What is the shape of time?",
        "Does reality require an observer?",
        "What is the meaning of meaning?",
        "Prove that $\\zeta(2) = \\frac{\\pi^2}{6}$.",
        "Can leadership be taught?",
        "Is trust measurable?",
        "Does power reveal character?",
        "Why do organizations fail?",
        "Can culture be engineered?",
        "Is growth always good?",
        "Who owns responsibility?",
        "Does efficiency limit creativity?",
        "Can motivation be bought?",
        "Why do teams conflict?",
        "Is strategy guesswork?",
        "Does data tell truth?",
        "Can purpose drive profit?",
        "Why resist change?",
        "Is productivity happiness?",
        "Does control inspire loyalty?",
        "Can ambition be harmful?",
        "Who defines success?",
        "Is innovation predictable?",
        "Does transparency heal?",
        "Why does scale break things?",
        "Can meetings be meaningful?",
        "Is failure essential?",
        "Does structure limit freedom?",
        "Can money buy meaning?"
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
            status.textContent = '/gpt2/onnx/model_quantized.onnx (327.8 MB)';
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
                    /* Reset mode: clear everything and start fresh */
                    e.preventDefault();
                    input.value = '';
                    output.textContent = '';
                    input.disabled = false;
                    askButton.disabled = false;
                    luckyButton.disabled = false;
                    luckyButton.textContent = "lucky";
                    luckyButton.classList.remove('reset-mode');
                    setRandomPlaceholder();
                    generateRayID();
                    console.log('🔄 Reset completed, ready for new input');
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
                
                /* Disable ask button before generation */
                askButton.disabled = true;
                
                /* Add system prompt */
                const systemPrompt = "Tell the truth. ";
                const fullInput = systemPrompt + inputText;
                console.log('🎯 Full input with system prompt:', fullInput);

                console.log('🔒 Disabling input and buttons during generation');
                input.disabled = true;
                askButton.disabled = true;
                luckyButton.disabled = true;
                document.getElementById('llm-container').classList.add('generating');
                /* Set generating text */
                status.textContent = 'Generating...';
                output.textContent = '';
                console.log('🎬 Started animation interval, cleared output');

                try {
                    console.log('🎯 Calling generator with parameters:', {
                        max_new_tokens: 1000,
                        temperature: 0.7,
                        top_p: 0.9,
                        do_sample: true,
                        repetition_penalty: 1.1,
                        top_k: 50,
                        length_penalty: 1.0,
                        no_repeat_ngram_size: 2,
                        early_stopping: true,
                        stream: true,
                        pad_token_id: 50256,
                        eos_token_id: 50256
                    });
                    const resultStream = await generator(fullInput, { 
                        max_new_tokens: 1000,
                        temperature: 0.7,
                        top_p: 0.9,
                        do_sample: true,
                        repetition_penalty: 1.1,
                        top_k: 50,
                        length_penalty: 1.0,
                        no_repeat_ngram_size: 2,
                        early_stopping: true,
                        stream: true,
                        pad_token_id: 50256,
                        eos_token_id: 50256
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
                    
                    /* Ensure output starts with a letter */
                    const startLetterIndex = cleanOutput.search(/[a-zA-Z]/);
                    if (startLetterIndex > 0) {
                        cleanOutput = cleanOutput.substring(startLetterIndex);
                        console.log(`✂️ Removed leading non-letters, starts at index: ${startLetterIndex}`);
                    }
                    if (fullText.toLowerCase().includes(inputText.toLowerCase())) {
                        const inputIndex = fullText.toLowerCase().indexOf(inputText.toLowerCase());
                        console.log(`🔍 Found input text at index: ${inputIndex}`);
                        if (inputIndex === 0 || inputIndex < 50) {
                            cleanOutput = fullText.substring(inputIndex + inputText.length).trim();
                            console.log(`✂️ Removed input text, cleaned output: "${cleanOutput}"`);
                        }
                    }
                    /* Remove special characters from the end */
                    cleanOutput = cleanOutput.replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200F\uFEFF\uFFFD▎]$/, '').trim();
                    /* Remove newlines and replace with spaces */
                    cleanOutput = cleanOutput.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
                    /* Clean repetition errors like doesn''t -> doesn't */
                    cleanOutput = cleanOutput.replace(/''/g, "'").replace(/""/g, '"');
                    /* Remove all whitespace before punctuation */
                    cleanOutput = cleanOutput.replace(/\s+([.!?,:;])/g, '$1');
                    /* Ensure there's always a space after punctuation */
                    cleanOutput = cleanOutput.replace(/([.!?,:;])([a-zA-Z])/g, '$1 $2');
                    /* Remove period inside quotes before closing quote */
                    cleanOutput = cleanOutput.replace(/\.\"\./g, '".');
                    /* Remove period in front of quotes */
                    cleanOutput = cleanOutput.replace(/\.\"/g, '"');
                    /* Replace 3+ consecutive periods with ellipsis */
                    cleanOutput = cleanOutput.replace(/\.{2,}/g, '…');
                    /* Fix malformed punctuation combinations */
                    cleanOutput = cleanOutput.replace(/:\s*\./g, '.');
                    cleanOutput = cleanOutput.replace(/:/g, '.');
                    /* Remove figures in square brackets like [8] or [/28] */
                    cleanOutput = cleanOutput.replace(/\[\/?\d+\]/g, '');
                    /* Remove special characters like › and … */
                    cleanOutput = cleanOutput.replace(/[›…«»‹›]/g, '');
                    /* Remove replacement characters () */
                    cleanOutput = cleanOutput.replace(/\uFFFD/g, '');
                    /* Remove other unusual characters */
                    cleanOutput = cleanOutput.replace(/[^\x00-\x7F\s]/g, '');
                    /* Remove orphan parentheses and brackets */
                    cleanOutput = cleanOutput.replace(/[\(\)\[\]\{\}]/g, '');
                    /* Fix escaped single quotes */
                    cleanOutput = cleanOutput.replace(/\\'/g, "'");
                    /* Remove tildes */
                    cleanOutput = cleanOutput.replace(/~/g, '');
                    /* Reduce multiple spaces to single space */
                    cleanOutput = cleanOutput.replace(/\s+/g, ' ');
                    /* Trim whitespace */
                    cleanOutput = cleanOutput.trim();
                    /* Find first letter and make it uppercase */
                    const firstLetterIndex = cleanOutput.search(/[a-zA-Z]/);
                    if (firstLetterIndex !== -1) {
                        cleanOutput = cleanOutput.substring(0, firstLetterIndex) + 
                                    cleanOutput.charAt(firstLetterIndex).toUpperCase() + 
                                    cleanOutput.substring(firstLetterIndex + 1);
                    }
                    /* Check if output is too short */
                    if (cleanOutput.length < 3) {
                        cleanOutput = "Ask again.";
                    } else {
                        /* Ensure output ends with a period */
                        cleanOutput = cleanOutput.replace(/[.!?]*$/, '') + '.';
                    }
                    console.log(`🎯 Final cleaned output: "${cleanOutput}"`);
                    
                    /* Update with cleaned version */
                    output.textContent = cleanOutput;
                } catch (e) {
                    console.error('❌ Error during generation:', e);
                    output.textContent = 'An error occurred during generation: ' + e.message;
                } finally {
                    console.log('🏁 Generation completed, cleaning up');
                    status.textContent = '/gpt2/onnx/model_quantized.onnx (327.8 MB)';
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

    /* Function to generate and display Ray ID */
    function generateRayID() {
        var uuidElement = document.getElementById('uuid-display');
        if (uuidElement) {
            var uuid = crypto.randomUUID();
            uuidElement.textContent = 'Ray ID: ' + uuid.slice(0, -1) + '4';
        }
    }

    /* Generate and display initial Ray ID */
    document.addEventListener('DOMContentLoaded', function() {
        generateRayID();
    });
</script>


<div id="llm-container">
    <div id="llm-status">Loading model...</div>
    <div class="llm-input-container">
        <button id="lucky-button" disabled>lucky</button>
        <input type="text" id="llm-input" placeholder="..." disabled>
        <button id="ask-button" disabled>Ask&nbsp;→</button>
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



</style>