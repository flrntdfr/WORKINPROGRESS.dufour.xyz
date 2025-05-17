---
layout: chantier
title: Zufall
started: 2021-07-14 14:13
ended: 2021-07-14 14:13
labels: [web]
---

<style>
    #word {
        font-size: 2em;
        opacity: 0;
        transition: opacity 0.08s ease;
    }
    #word.visible {
        opacity: 1;
    }
</style>

<div id="word"></div>

<script>
    let words = ['ZUFALL', 'EXISTIERT', 'NICHT'];
    const wordElement = document.getElementById('word');
    
    function changeWord() {
        wordElement.classList.remove('visible');
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * 2) + 1;
            const selectedWord = words[randomIndex];
            words = [selectedWord, ...words.filter(word => word !== selectedWord)];
            
            wordElement.textContent = selectedWord;
            wordElement.classList.add('visible');
        }, 300);
    }
    
    changeWord();
    setInterval(changeWord, 850);
</script>