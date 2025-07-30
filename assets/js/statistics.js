const input = document.getElementById('input');
const output = document.getElementById('output');
const statistics = document.getElementById('statistics');

Module.onRuntimeInitialized = () => {
    const humanTitleCase = Module.cwrap('humanTitleCase', 'string', ['string']);
    
    function update() {
        const text = input.value;
        if (text.trim() === '') {
            output.textContent = '';
            statistics.textContent = '';
            return;
        }

        const result = humanTitleCase(text);
        output.textContent = result;

        const charCount = text.length;
        const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
        const lineCount = text.split('\n').length;
        
        statistics.textContent = `Characters: ${charCount} · Words: ${wordCount} · Lines: ${lineCount}`;
    }

    input.addEventListener('input', update);
    update(); // Initial call
}; 