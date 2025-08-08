---
layout: chantier
title: TruthLLM
started:  2024-08-04 00:00
ended: 2024-10-02 00:00
result: [web, LLM]
tech: [GPT-2]
description: TruthLLM is a “Large” Language Model that will truthfully answer any question in less than 1000 tokens.
---

<script type="module">
    import { pipeline, env } from '{% link /assets/lib/transformers.v3.6.0.min.js %}';

    const questions = [
        "What is the meaning of life?",
        "Why are we here?",
        "Why is the sky blue?",
        "Does gravity get tired of pulling things down?",
        "Can a sandwich ever truly be happy?",
        "Who invented blinking and why can’t we stop it?",
        "Are unicorns extinct or just hiding?",
        "When did god die?",
        "How much is 7’ in cm?",
        "Who killed Bob Marley?",
        "Where do waves come from?",
        "Do fish ever get thirsty?",
        "Is cereal soup or salad?",
        "Why don’t birds have arms?",
        "Do stairs go up or down?",
        "How many times can you fold a pizza?",
        "Why do ducks never wear pants?",
        "Do islands float or swim?",
        "Why is it called quicksand if it's so slow?",
        "Who owns the clouds over international waters?",
        "Who owns the sky?",
        "Why is Monaco still a country?",
        "Why are there still kings and queens in 2025?",
        "How to 3D print a money printer?",
        "Is inflation just money getting fat?",
        "Does GDP measure how tired we are?",
        "Can a country declare independence from itself?",
        "Was fire invented or discovered?",
        "Why did we stop building pyramids?",
        "Why isn’t Earth part of any interplanetary alliance yet?",
        "Can I trade my nationality for store credit?",
        "Why is the moon so far away?",
    ];
    env.logLevel = 'debug';
    env.allowRemoteModels = true;

    const status = document.getElementById('llm-status');
    const input = document.getElementById('llm-input');
    const output = document.getElementById('llm-output');
    const askButton = document.getElementById('ask-button');
    const luckyButton = document.getElementById('lucky-button');

    function setRandomPlaceholder() {
        const randomIndex = Math.floor(Math.random() * questions.length);
        input.placeholder = questions[randomIndex];
    }

    function createProgressCallback() {
        return (info) => {
            console.log('📦 Progress:', info);
            if (info.status === 'progress') {
                const percentage = info.progress.toFixed(2);
                status.textContent = `Loading ${info.file}: ${percentage}%`;
            } else if (info.status === 'done') {
                status.textContent = `Finished loading ${info.file}`;
            } else {
                status.textContent = `Status: ${info.status}`;
            }
        };
    }

    async function loadModel() {
        console.log('🚀 TruthLLM: Loading model');
        const progressCallback = createProgressCallback();
        
        try {
            console.log('🌐 Attempting to load model from HuggingFace: Xenova/distilgpt2');
            const generator = await pipeline('text-generation', 'Xenova/distilgpt2', {
                progress_callback: progressCallback,
            });
            console.log('✅ Successfully loaded model from HuggingFace');
            return generator;
        } catch (remoteError) {
            console.warn('❌ Remote model failed, trying with fp32...', remoteError);
            
            console.log('🔄 Attempting to load model with fp32 precision');
            const generator = await pipeline('text-generation', 'Xenova/distilgpt2', {
                dtype: 'fp32',
                progress_callback: progressCallback,
            });
            console.log('✅ Successfully loaded model with fp32 precision');
            return generator;
        }
    }

    function cleanLLMOutput(fullText, inputText) {
        console.log('🧹 Cleaning up output');
        let cleanOutput = fullText;
        
        /* Remove the system prompt if it appears in output */
        const systemPrompt = "Answer the question truthfully: ";
        if (cleanOutput.toLowerCase().startsWith(systemPrompt.toLowerCase())) {
            cleanOutput = cleanOutput.substring(systemPrompt.length);
        }
        
        /* Remove input text if echoed back */
        if (cleanOutput.toLowerCase().includes(inputText.toLowerCase())) {
            const inputIndex = cleanOutput.toLowerCase().indexOf(inputText.toLowerCase());
            if (inputIndex === 0 || inputIndex < 50) {
                cleanOutput = cleanOutput.substring(inputIndex + inputText.length).trim();
            }
        }
        
        /* Remove common GPT-2 artifacts and prefixes */
        cleanOutput = cleanOutput.replace(/^(Answer:|A:|Question:|Q:|Response:|Reply:)\s*/gi, '');
        cleanOutput = cleanOutput.replace(/^(The answer is|I think|Well,|Actually,|So,|Basically,)\s*/gi, '');
        
        /* Remove incomplete words at the end (common GPT-2 issue) */
        cleanOutput = cleanOutput.replace(/\s+[a-zA-Z]{1,2}$/, '');
        
        /* Handle repetitive loops (GPT-2 often gets stuck repeating) */
        const words = cleanOutput.split(' ');
        const deduplicatedWords = [];
        let consecutiveRepeats = 0;
        
        for (let i = 0; i < words.length; i++) {
            const currentWord = words[i];
            const lastWord = deduplicatedWords[deduplicatedWords.length - 1];
            
            if (currentWord === lastWord) {
                consecutiveRepeats++;
                if (consecutiveRepeats < 2) { /* Allow one repeat, but not more */
                    deduplicatedWords.push(currentWord);
                }
            } else {
                consecutiveRepeats = 0;
                deduplicatedWords.push(currentWord);
            }
        }
        cleanOutput = deduplicatedWords.join(' ');
        
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
        
        /* Fix malformed quotations */
        cleanOutput = cleanOutput.replace(/\.\"\./g, '".');
        cleanOutput = cleanOutput.replace(/\.\"/g, '"');
        cleanOutput = cleanOutput.replace(/\"\./g, '".');
        
        /* Replace 3+ consecutive periods with ellipsis */
        cleanOutput = cleanOutput.replace(/\.{3,}/g, '…');
        
        /* Fix malformed punctuation combinations */
        cleanOutput = cleanOutput.replace(/:\s*\./g, '.');
        cleanOutput = cleanOutput.replace(/,\s*\./g, '.');
        cleanOutput = cleanOutput.replace(/;\s*\./g, '.');
        
        /* Remove figures in square brackets like [8] or [/28] (citations) */
        cleanOutput = cleanOutput.replace(/\[\/?\d+\]/g, '');
        cleanOutput = cleanOutput.replace(/\[\d+\]/g, '');
        
        /* Remove HTML/markdown artifacts that might leak through */
        cleanOutput = cleanOutput.replace(/<[^>]*>/g, '');
        cleanOutput = cleanOutput.replace(/\*\*(.*?)\*\*/g, '$1');
        cleanOutput = cleanOutput.replace(/\*(.*?)\*/g, '$1');
        cleanOutput = cleanOutput.replace(/`(.*?)`/g, '$1');
        
        /* Remove special Unicode characters */
        cleanOutput = cleanOutput.replace(/[›…«»‹›]/g, '');
        cleanOutput = cleanOutput.replace(/\uFFFD/g, '');
        cleanOutput = cleanOutput.replace(/[^\x00-\x7F\s]/g, '');
        
        /* Remove orphan parentheses and brackets */
        cleanOutput = cleanOutput.replace(/[\(\)\[\]\{\}]/g, '');
        
        /* Fix escaped characters */
        cleanOutput = cleanOutput.replace(/\\'/g, "'");
        cleanOutput = cleanOutput.replace(/\\"/g, '"');
        cleanOutput = cleanOutput.replace(/\\\\/g, '');
        
        /* Remove tildes and other random characters */
        cleanOutput = cleanOutput.replace(/[~`]/g, '');
        
        /* Remove common filler phrases that GPT-2 generates */
        cleanOutput = cleanOutput.replace(/\b(um|uh|er|like|you know|I mean)\b/gi, '');
        
        /* Fix spacing issues */
        cleanOutput = cleanOutput.replace(/\s+/g, ' ');
        cleanOutput = cleanOutput.trim();
        
        /* Remove incomplete sentences at the end */
        const sentences = cleanOutput.split(/[.!?]+/);
        if (sentences.length > 1) {
            const lastSentence = sentences[sentences.length - 1].trim();
            if (lastSentence.length < 5 || !lastSentence.includes(' ')) {
                cleanOutput = sentences.slice(0, -1).join('.') + '.';
            }
        }
        
        /* Ensure output starts with a letter */
        const startLetterIndex = cleanOutput.search(/[a-zA-Z]/);
        if (startLetterIndex > 0) {
            cleanOutput = cleanOutput.substring(startLetterIndex);
        }
        
        /* Find first letter and make it uppercase */
        const firstLetterIndex = cleanOutput.search(/[a-zA-Z]/);
        if (firstLetterIndex !== -1) {
            cleanOutput = cleanOutput.substring(0, firstLetterIndex) + 
                        cleanOutput.charAt(firstLetterIndex).toUpperCase() + 
                        cleanOutput.substring(firstLetterIndex + 1);
        }
        
        /* Check if output is too short or nonsensical */
        if (cleanOutput.length < 3 || cleanOutput.trim() === '') {
            cleanOutput = "Ask another question.";
        } else {
            /* Ensure output ends with proper punctuation */
            cleanOutput = cleanOutput.replace(/[.!?]*$/, '');
            if (cleanOutput.length > 0) {
                cleanOutput += '.';
            }
        }
        
        console.log(`🎯 Final cleaned output: "${cleanOutput}"`);
        return cleanOutput;
    }

    function enableUI() {
        console.log('🎯 Model loaded successfully, enabling UI');
        status.textContent = '/gpt2/onnx/model_quantized.onnx (236.96 MB)';
        input.disabled = false;
        askButton.disabled = false;
        luckyButton.disabled = false;
        setRandomPlaceholder();
    }

    function resetUI() {
        input.value = '';
        output.textContent = '';
        input.disabled = false;
        askButton.disabled = false;
        luckyButton.disabled = false;
        luckyButton.textContent = "lucky";
        luckyButton.classList.remove('reset-mode');
        setRandomPlaceholder();
        generateRayID();
    }

    function setupEventListeners(generator) {
        askButton.addEventListener('click', (e) => {
            if (input.value.trim().length === 0) {
                input.value = input.placeholder;
            }
            runLLM(generator);
        });

        luckyButton.addEventListener('click', (e) => {
            if (luckyButton.classList.contains('reset-mode')) {
                /* Reset mode: clear everything and start fresh */
                e.preventDefault();
                resetUI();
            } else {
                e.preventDefault();
                setRandomPlaceholder();
            }
        });

        input.addEventListener('keydown', (e) => {
            console.log('Keydown event on input. Key:', e.key);
            if (e.key === 'Enter') {
                runLLM(generator);
            }
        });
    }

    async function main() {
        console.log('🚀 TruthLLM: Starting main function');
        try {
            status.textContent = 'Loading…';
            
            const generator = await loadModel();
            enableUI();
            setupEventListeners(generator);
        } catch (e) {
            console.error('💥 Fatal error in main function:', e);
            status.textContent = 'Failed to load model.';
            output.textContent = 'An error occurred: ' + e.message;
        }
    }

            async function runLLM(generator) {
                console.log('🚀 Starting LLM generation');
                const inputText = input.value.trim();
                console.log('📝 Input text:', inputText);
                if (!inputText) {
                    console.log('⚠️ No input text provided, returning');
                    return;
                }
                
                /* Disable ask button before generation */
                askButton.disabled = true;
                
                /* Add generating class for cursor feedback */
                document.body.classList.add('generating-llm');
                
                /* Force a repaint to apply cursor changes before starting heavy computation */
                await new Promise(resolve => setTimeout(resolve, 10));
                
                /* Add system prompt */
                const systemPrompt = "Answer the question truthfully: ";
                const fullInput = systemPrompt + inputText;
                console.log('🎯 Full input with system prompt:', fullInput);

                console.log('🔒 Disabling input and buttons during generation');
                input.disabled = true;
                askButton.disabled = true;
                luckyButton.disabled = true;
                output.textContent = '';

                try {
                    console.log('🎯 Calling generator with parameters:', {
                        max_new_tokens: 1000,
                        temperature: 0.65,
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
                        temperature: 0.65,
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
                    const cleanOutput = cleanLLMOutput(fullText, inputText);
                    
                    /* Update with cleaned version */
                    output.textContent = cleanOutput;
                } catch (e) {
                    console.error('❌ Error during generation:', e);
                    output.textContent = 'An error occurred during generation: ' + e.message;
                } finally {
                    console.log('🏁 Generation completed, cleaning up');
                    /* Remove generating class to restore normal cursor */
                    document.body.classList.remove('generating-llm');
                    status.textContent = '/gpt2/onnx/model_quantized.onnx (236.96 MB)';
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

    main();
</script>


<div id="llm-container">
    <div id="llm-status">Standing by…</div>
    <div class="llm-input-container">
        <button id="lucky-button" disabled>lucky</button>
        <input type="text" id="llm-input" placeholder="…" disabled>
        <button id="ask-button" disabled>Ask&nbsp;→</button>
    </div>
    <pre id="llm-output"></pre>
    {% include ray-id.html %}
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

#llm-input {
    flex-grow: 1;
    border: 1px solid #ccc;
    padding: 8px;
    font-size: 1em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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

#lucky-button, #ask-button {
    padding: 8px 16px;
    font-size: 1em;
    cursor: pointer;
    border: 1px solid #ccc;
    background-color: #fff;
    font-family: monospace;
    min-width: 80px;
    height: 37px;
    box-sizing: border-box;
}

#lucky-button:hover, #ask-button:hover {
    background-color: #f5f5f5;
}

#lucky-button:disabled, #ask-button:disabled {
    background-color: #f5f5f5;
    color: #ccc;
    cursor: not-allowed;
}

/* Cursor feedback during generation */
body.generating-llm {
    cursor: progress !important;
}

body.generating-llm * {
    cursor: progress !important;
}

/* Safari-specific cursor fallback */
@media screen and (-webkit-min-device-pixel-ratio: 0) {
    body.generating-llm {
        cursor: wait !important;
    }
    
    body.generating-llm * {
        cursor: wait !important;
    }
}
</style>