---
published: false
layout: chantier-memo
title: Poems (2019-2021)
created:  2019-05-07 21:17
ended: 2021-07-14 14:13
result: [poem]
---

**Contents**

* This will become a table of contents (this text will be scrapped).
{:toc}

---

## #1

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

## #2

- Poème où les mots appraissent les uns après les autres (idée: Instapaper)

## #3

- Poème biffer (genre So that you might hear me, bear’s den)

## #4

- Poème où tous les mots sont à l’écran dans désordre en gris clair. 
- Poème apparait avec chaque mot qui s’illumine en noir

## #5

- Poème où les mots sont sur une roue de la fortune

## #6

- Dans message pgp (idée: mug protonmail)

## #7

- Comme à l’UGC quand ils montrent les films à l’affiche

## #8

- Un poème sur plusieurs lignes, sens change quand des mots s’éteignent (mots en néons)
    - e.g., [don’t] tell me everything au generator Miami 