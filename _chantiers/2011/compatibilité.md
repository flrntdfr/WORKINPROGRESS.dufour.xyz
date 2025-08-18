---
layout: chantier
title: Compatibilité amoureuse
started: 2011-06-28
ended: 2011-06-28
result: [code]
tech: ["BASIC"]
description: | 
    This is the first program I wrote on my own. It is a sophisticated algorithm that calculates the love compatbility between two persons.
lib: swbasic.js
---

<div class="ti-calculator">
    <img src="{% link /assets/2009/ti-83-plus-scaled.webp %}" alt="TI-83 Plus Calculator" class="calculator-image">
    <div id="screen"></div>
    <div id="keyboard-container"></div>
</div>

<script>
/* TI-83 Plus screen: 96x64 pixels, 6x8 pixels per character */
const SCREEN = { "x": 241, "y": 294, "w": 830, "h": 550 };
const SCREEN_CHARS = { "cols": 16, "rows": 8 };
const keys = {
  "A": { "x": 95, "y": 1567, "w": 210, "h": 115 },
  "B": { "x": 314, "y": 1567, "w": 210, "h": 115 },
  "C": { "x": 531, "y": 1567, "w": 210, "h": 115 },
  "D": { "x": 95, "y": 1725, "w": 210, "h": 115 },
  "E": { "x": 314, "y": 1725, "w": 210, "h": 115 },
  "F": { "x": 531, "y": 1725, "w": 210, "h": 115 },
  "G": { "x": 752, "y": 1725, "w": 210, "h": 115 },
  "H": { "x": 974, "y": 1725, "w": 210, "h": 115 },
  "I": { "x": 95, "y": 1883, "w": 210, "h": 115 },
  "J": { "x": 314, "y": 1883, "w": 210, "h": 115 },
  "K": { "x": 531, "y": 1883, "w": 210, "h": 115 },
  "L": { "x": 752, "y": 1883, "w": 210, "h": 115 },
  "M": { "x": 974, "y": 1883, "w": 210, "h": 115 },
  "N": { "x": 95, "y": 2036, "w": 210, "h": 115 },
  "O": { "x": 314, "y": 2029, "w": 210, "h": 134 },
  "P": { "x": 531, "y": 2029, "w": 210, "h": 134 },
  "Q": { "x": 752, "y": 2029, "w": 210, "h": 134 },
  "R": { "x": 974, "y": 2038, "w": 210, "h": 115 },
  "S": { "x": 95, "y": 2192, "w": 210, "h": 115 },
  "T": { "x": 314, "y": 2183, "w": 210, "h": 134 },
  "U": { "x": 531, "y": 2183, "w": 210, "h": 134 },
  "V": { "x": 752, "y": 2183, "w": 210, "h": 134 },
  "W": { "x": 974, "y": 2196, "w": 210, "h": 115 },
  "X": { "x": 95, "y": 2347, "w": 210, "h": 115 },
  "Y": { "x": 314, "y": 2337, "w": 210, "h": 134 },
  "Z": { "x": 531, "y": 2337, "w": 210, "h": 134 },
  "θ": { "x": 751, "y": 2337, "w": 210, "h": 134 },
  "\"": { "x": 974, "y": 2356, "w": 210, "h": 115 },
  "?": { "x": 751, "y": 2497, "w": 210, "h": 134 },
  ":": { "x": 531, "y": 2497, "w": 210, "h": 134 },
  "SPACE": { "x": 314, "y": 2497, "w": 210, "h": 134 },
  "TOP": { "x": 879, "y": 1172, "w": 215, "h": 110 },
  "RIGHT": { "x": 1096, "y": 1244, "w": 110, "h": 215 },
  "BOTTOM": { "x": 879, "y": 1410, "w": 215, "h": 110 },
  "LEFT": { "x": 766, "y": 1244, "w": 110, "h": 215 },
  "CLEAR": { "x": 974, "y": 1567, "w": 210, "h": 115 },
  "ENTER": { "x": 970, "y": 2503, "w": 219, "h": 154 },
};
/* Initialize swbasic interpreter */
let parser;
let interpreter;
let outputElement;

        window.addEventListener('DOMContentLoaded', () => {
            outputElement = document.getElementById('screen');
            const keyboardContainer = document.getElementById('keyboard-container');
            
            let currentInput = '';
            let isWaitingForInput = false;
            let inputPrompt = '';
            let baseOutput = ''; /* Store the output before input */
            let inputFocused = false; /* Track if input is focused */
    
    /* Create all keyboard buttons dynamically */
    function createKeyboard() {
        const calculatorImage = document.querySelector('.calculator-image');
        
        /* Wait for image to load and get its actual displayed size */
        function positionElements() {
            const originalWidth = 1296; /* Original image width */
            const originalHeight = 2737; /* Original image height */
            
            /* Calculate scaling factors */
            const scaleX = calculatorImage.offsetWidth / originalWidth;
            const scaleY = calculatorImage.offsetHeight / originalHeight;
            
            /* Create buttons with scaled coordinates */
            Object.entries(keys).forEach(([key, coords]) => {
                const button = document.createElement('button');
                button.className = 'calc-key';
                button.id = 'key-' + key; /* Add ID for easy identification */
                button.setAttribute('data-key', key);
                button.style.left = (coords.x * scaleX) + 'px';
                button.style.top = (coords.y * scaleY) + 'px';
                button.style.width = (coords.w * scaleX) + 'px';
                button.style.height = (coords.h * scaleY) + 'px';
                
                /* Special styling for certain keys */
                if (key === 'ENTER') {
                    button.classList.add('enter-key');
                }
                keyboardContainer.appendChild(button);
            });
            
            /* Set screen positioning with scaling */
            const screen = document.getElementById('screen');
            
            screen.style.left = (SCREEN.x * scaleX) + 'px';
            screen.style.top = (SCREEN.y * scaleY) + 'px';
            screen.style.width = (SCREEN.w * scaleX) + 'px';
            screen.style.height = (SCREEN.h * scaleY) + 'px';
            
            /* Calculate font size to fit exactly 16 characters per line and 8 lines */
            const charWidth = (SCREEN.w * scaleX) / SCREEN_CHARS.cols; /* Width per character */
            const charHeight = (SCREEN.h * scaleY) / SCREEN_CHARS.rows; /* Height per character */
            const fontSize = Math.min(charWidth * 0.8, charHeight * 0.9); /* Slightly smaller to account for spacing */
            
            screen.style.fontSize = fontSize + 'px';
            screen.style.lineHeight = charHeight + 'px';
            screen.style.letterSpacing = '0px';
        }
        
        /* Position elements when image loads */
        if (calculatorImage.complete) {
            positionElements();
        } else {
            calculatorImage.addEventListener('load', positionElements);
        }
        
        /* Reposition elements on window resize */
        window.addEventListener('resize', () => {
            /* Clear existing buttons */
            keyboardContainer.innerHTML = '';
            /* Reposition everything */
            positionElements();
        });
    }
    
    /* Initialize keyboard */
    createKeyboard();
    
    /* Set up print function */
    function printFunction(text, eol) {
        if (isWaitingForInput) {
            /* Show base output + prompt, current input, and blinking cursor */
            const displayText = baseOutput + inputPrompt + currentInput + '_';
            outputElement.textContent = displayText;
        } else {
            outputElement.textContent += text;
            if (eol) {
                outputElement.textContent += '\n';
            }
        }
        outputElement.scrollTop = outputElement.scrollHeight;
    }
    
    /* Blinking cursor effect */
    let cursorVisible = true;
    setInterval(() => {
        if (isWaitingForInput && inputFocused) {
            cursorVisible = !cursorVisible;
            const displayText = baseOutput + inputPrompt + currentInput + (cursorVisible ? '_' : ' ');
            outputElement.textContent = displayText;
        }
    }, 500); /* Blink every 500ms */
    
    /* Set up clear function */
    function clearFunction() {
        outputElement.textContent = '';
    }
    
    /* Calculator button event handlers */
    document.querySelectorAll('.calc-key').forEach(key => {
        key.addEventListener('click', (e) => {
            e.preventDefault();
            const keyValue = key.getAttribute('data-key');
            
            /* Only respond to clicks when waiting for input */
            if (!isWaitingForInput) {
                return;
            }
            
            switch(keyValue) {
                case 'ENTER':
                    /* Submit input and continue */
                    const value = currentInput;
                    interpreter.input_stack.push(value);
                    isWaitingForInput = false;
                    inputFocused = false; /* Remove focus */
                    /* Show final input without cursor */
                    const displayText = baseOutput + inputPrompt + currentInput;
                    outputElement.textContent = displayText;
                    currentInput = ''; /* Clear input after displaying */
                    interpreter.resume_input();
                    break;
                case 'CLEAR':
                    currentInput = '';
                    printFunction('', false); /* Update display with cursor */
                    break;
                case 'SPACE':
                    currentInput += ' ';
                    printFunction('', false); /* Update display with cursor */
                    break;
                case 'TOP':
                case 'BOTTOM':
                case 'LEFT':
                case 'RIGHT':
                    /* Navigation keys - could be used for cursor movement */
                    break;
                default:
                    /* All other keys (letters, numbers, symbols) */
                    currentInput += keyValue;
                    printFunction('', false); /* Update display with cursor */
                    break;
            }
        });
    });
    
    /* Physical keyboard support */
    document.addEventListener('keydown', (e) => {
        /* Only respond when waiting for input */
        if (!isWaitingForInput) {
            return;
        }
        
        e.preventDefault(); /* Prevent default behavior */
        
        /* Handle alphanumeric keys and common symbols */
        if (e.key.length === 1 && (e.key.match(/[a-zA-Z0-9\s]/) || e.key.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/))) {
            currentInput += e.key;
            printFunction('', false); /* Update display with cursor */
        } else if (e.key === 'Enter') {
            /* Add newline and submit input */
            const value = currentInput;
            interpreter.input_stack.push(value);
            isWaitingForInput = false;
            inputFocused = false; /* Remove focus */
            /* Show final input without cursor */
            const displayText = baseOutput + inputPrompt + currentInput;
            outputElement.textContent = displayText;
            currentInput = ''; /* Clear input after displaying */
            interpreter.resume_input();
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
            currentInput = currentInput.slice(0, -1);
            printFunction('', false); /* Update display with cursor */
        }
    });
    
    /* Focus and blur event handlers */
    document.addEventListener('focusin', (e) => {
        if (isWaitingForInput) {
            inputFocused = true;
            /* Show cursor immediately when focused */
            const displayText = baseOutput + inputPrompt + currentInput + '_';
            outputElement.textContent = displayText;
        }
    });
    
    document.addEventListener('focusout', (e) => {
        if (isWaitingForInput) {
            inputFocused = false;
            /* Hide cursor when not focused */
            const displayText = baseOutput + inputPrompt + currentInput;
            outputElement.textContent = displayText;
        }
    });
    
    try {
        /* Create parser and interpreter */        
        const program = '{% include compatbilite.bas %}';
        parser = new Parser(program);
        parser.parse();
        
        interpreter = new Interpreter(parser);
        interpreter.print_function = printFunction;
        interpreter.clear_function = clearFunction;
        
        /* Set up input functions */
        interpreter.number_input_function = function(promptText) {
            baseOutput = outputElement.textContent; /* Save current output */
            inputPrompt = ''; /* Don't show prompt here, swbasic.js handles it */
            currentInput = '';
            isWaitingForInput = true;
            inputFocused = true; /* Set input as focused */
            printFunction('', false); /* Show cursor only */
            
            return null;
        };
        
        interpreter.string_input_function = function(promptText) {
            baseOutput = outputElement.textContent; /* Save current output */
            inputPrompt = ''; /* Don't show prompt here, swbasic.js handles it */
            currentInput = '';
            isWaitingForInput = true;
            inputFocused = true; /* Set input as focused */
            printFunction('', false); /* Show cursor only */
            
            return null;
        };
        
        /* Run the program */
        interpreter.interpret();
    } catch (error) {
        outputElement.textContent = 'Error: ' + error;
    }
});
</script>

<style>
/* Load TI-83 Plus font */
@font-face {
    font-family: 'TI-83-Plus';
    src: url('{% link /assets/fonts/ti-83-plus-large-1.0/ti-83-plus-large.ttf %}') format('truetype');
    font-weight: normal;
    font-style: normal;
}

.ti-calculator {
    position: relative;
    margin-left: 20px;
    margin-right: auto;
    display: block;
    overflow: visible; /* Allow full height to show */
    line-height: 0; /* Remove any line spacing */
}

.calculator-image {
    width: 100%;
    max-height: calc(100vh - 250px);
    max-width: 100vw; /* Ensure it doesn't exceed viewport width */
    height: auto;
    display: block; /* Remove any inline spacing */
    margin: 0; /* Remove any margins */
    padding: 0; /* Remove any padding */
    object-fit: contain; /* Maintain aspect ratio while fitting in container */
}

#screen {
    position: absolute;
    font-family: 'TI-83-Plus', 'Courier New', monospace;
    font-size: 12px;
    line-height: 1.2;
    color: #000;
    white-space: pre-wrap;
    overflow-y: auto;
    padding: 0 0 0 0;
    margin: 0 0 0 0;
    box-sizing: border-box;
}

/* Calculator button overlays */
.calc-key {
    position: absolute;
    background: transparent;
    /* background: rgba(255, 0, 0, 0.5); */
    border: none;
    cursor: pointer;
    z-index: 5;
    outline: none;
    transition: background-color 0.1s;
}

/* Visual feedback for button press */
.calc-key:active {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 30%;
}

/* Screen styling */
#screen {
    color: #000;
    font-family: 'TI-83-Plus', monospace;
    text-transform: uppercase;
    line-height: 1.2;
    white-space: pre-wrap;
    overflow-y: auto;
    padding: 4px;
    box-sizing: border-box;
    /* Font size will be set dynamically by JavaScript */
    /* Prevent text selection in the screen */
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
</style>