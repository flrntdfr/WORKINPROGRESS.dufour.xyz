---
layout: chantier
title: Truth or Truth
started:  2022-05-16 22:58
ended: 2025-01-19 19:45
result: [list, game]
description: |
  Truth or Truth is a deck of cards that can be played on a first date.
---

<div class="card-deck-container no-select">
  <div class="card-stack">
    <div class="card card-top">
      <span class="card-index" id="current-card-index"></span>
      <p class="card-content" id="current-card-content"></p>
    </div>
    <div class="card card-middle"></div>
    <div class="card card-bottom"></div>
  </div>
  
  <div class="question-selector">
    <div class="button-group">
      <button class="nav-button" id="prev-button">←&nbsp;Previous&nbsp;truth</button>
      <button class="nav-button" id="random-button">Random&nbsp;truth</button>
      <button class="nav-button" id="next-button">Next&nbsp;truth&nbsp;→</button>
    </div>
  </div>
</div>

<script type="module">
  document.addEventListener('DOMContentLoaded', function() {
    const questions = [
      "Truth or Truth",
      "What have you sacrificed in your life?",
      "What's the last lie you told yourself?",
      "What gives you hope?",
      "What do people say when they talk about you?",
      "What memory do you cherish the most?",
      "How would you describe your worldview?",
      "Are you afraid to die?",
      "What do you blame yourself for?",
      "What have you promised in your life?",
      "Do you sometimes do things that you hate?",
      "How much of what's necessary to know do you think you know?",
      "What are your core values?",
      "What have you made better for yourself recently?",
      "Is there something everyone should own?",
      "How do you decide if you like something or not?",
      "When did you lie for the last time?",
      "Are you happy?",
      "What's your definition of the word: courage?",
      "How do you make decisions?",
      "What's the first thing you'd do with free will?",
      "Are there topics you avoid with your parents?",
      "How do you explain that you think certain things?",
      "Do you find your friends good looking?",
      "What are the most important facts everyone should know?",
      "What do you think other people are so sure about?",
      "What do you think is the best invention of all time?",
      "What's the last argument you lost?",
      "How normal are you?",
      "How did you like your bedroom as a kid?",
      "What did you notice last about yourself?",
      "You become benevolent world dictator, what's your first move?",
      "What do you like about yourself?",
      "How do you honestly feel about climate change?",
      "Do you love the music you listen to?",
      "We put you in a room with 9 people. What have you done more than any of them?",
      "Do you believe in art?",
      "How do you sometimes disappoint yourself?",
      "What have you learned later than everyone?",
      "What's your drive?",
      "Why is the sky blue?",
      "It's Friday evening. You're alone at home and have no plans. What do you do?",
      "Do you usually like what you say?",
      "What would you like to change about yourself?",
      "What's your life philosophy?",
      "What have you been missing lately?",
      "What's your definition of reality?",
      "How many people do you hate?",
      "What misconception do people have about you?",
      "What are you addicted to?",
      "Are you superficial?",
      "Do you think fashion is real?",
      "What do you want to build?",
      "How would you feel if you met yourself?",
      "How do you like your life so far?",
      "What are you most certain about?",
      "How do you deal with uncertainty?",
      "What's the most meaningful thing parents should give to their kids?",
      "What's your most unpopular opinion?",
      "Do you miss being a kid?",
      "A world where everyone thinks like you. What does it look like?",
      "What's the last illegal thing you've done?",
      "Do you think God exists?",
      "How good are you at dealing with yourself?",
      "When's the last time you've done something for the first time?",
      "Are you living up to your potential?",
      "What do you regret most?",
      "Do people often tell you that you will succeed?",
      "What fictional character is most like you?"
    ];
    
    let currentIndex = 0;
    
    function crook() {
      const rotation = (Math.random() * 6) - 3;
      const translateX = (Math.random() * 10) - 5;
      const translateY = (Math.random() * 6) - 3;
      return `rotate(${rotation}deg) translateX(${translateX}px) translateY(${translateY}px)`;
    }
    
    function displayCurrentCard() {
      const cardContent = document.getElementById('current-card-content');
      const cardIndex = document.getElementById('current-card-index');
      const topCard = document.querySelector('.card-top');
      
      cardContent.textContent = questions[currentIndex];
        if (currentIndex === 0) {
        cardIndex.textContent = "";
      } else {
        cardIndex.textContent = `${currentIndex}`;
      }
      
      topCard.style.transform = crook();
    }
    
    function animateAndDisplay(transform) {
      const topCard = document.querySelector('.card-top');
      const duration = 150;

      topCard.style.transform = transform;
      
      setTimeout(() => {
        displayCurrentCard();
      }, duration);
    }
    
    function showPreviousQuestion() {
      if (!questions || questions.length === 0) return;
      
      currentIndex = Math.max(0, currentIndex - 1);
      animateAndDisplay('translateX(-20px)');
    }
    
    function showNextQuestion() {
      if (!questions || questions.length === 0) return;
      
      currentIndex = Math.min(questions.length - 1, currentIndex + 1);
      animateAndDisplay('translateX(20px)');
    }
    
    function showRandomQuestion() {
      if (!questions || questions.length === 0) return;
      
      const oldIndex = currentIndex;
      
      /* Make sure we get a different question */
      do {
        currentIndex = Math.floor(Math.random() * questions.length);
      } while (questions.length > 1 && currentIndex === oldIndex);
      
      animateAndDisplay('scale(0.95)');
    }
    
    /* Initialize with first card and random crookedness */
    displayCurrentCard();
    
    /* Add event listeners */
    document.getElementById('prev-button').addEventListener('click', function() {
      showPreviousQuestion();
    });
    
    document.getElementById('next-button').addEventListener('click', function() {
      showNextQuestion();
    });
    
    document.getElementById('random-button').addEventListener('click', function() {
      showRandomQuestion();
    });
    
    /* Add keyboard support */
    document.addEventListener('keydown', function(event) {
      switch(event.key) {
        case 'ArrowLeft':
          showPreviousQuestion();
          break;
        case 'ArrowRight':
          showNextQuestion();
          break;
        case ' ':
          event.preventDefault();
          showRandomQuestion();
          break;
      }
    });
  });
</script> 

<style>
  /* COMMON */

  .no-select {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  /* CARDS */

  .card-deck-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    gap: 0px;
    width: 100%;
    box-sizing: border-box;
  }

  .card-stack {
    position: relative;
    width: 100%;
    max-width: 600px;
    height: 400px;
    margin-bottom: 0;
    display: flex;
    justify-content: center;
  }

  .card {
    width: 100%;
    max-width: 500px;
    min-height: 300px;
    border-radius: 8px;
    background-color: #fffdf7;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 1.5rem;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    box-shadow: 
      0 1px 3px rgba(0,0,0,0.12), 
      0 1px 2px rgba(0,0,0,0.24),
      0 8px 15px -5px rgba(0,0,0,0.1);
    border: 1px solid #e8e8e8;
    font-family: 'Marker Felt', cursive;
    background-image: 
      linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
    background-size: 20px 20px;
    color: #333;
    z-index: 1;
  }

  .card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    box-shadow: inset 0 0 30px rgba(0,0,0,0.05);
    pointer-events: none;
    z-index: -1;
  }

  .card-top {
    z-index: 3;
    pointer-events: none;
  }

  .card-middle {
    z-index: 2;
    transform: rotate(-5deg) translateX(-10px) translateY(10px);
    opacity: 0.9;
  }

  .card-bottom {
    z-index: 1;
    transform: rotate(3deg) translateX(15px) translateY(20px);
    opacity: 0.8;
  }

  .card-content {
    margin: 0;
    line-height: 1.5;
    max-width: 90%;
    color: #111;
    font-weight: 500;
    text-shadow: 0 0 1px rgba(0,0,0,0.1);
    z-index: 2;
    position: relative;
    white-space: pre-line;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    text-wrap: balance;
  }

  .card-index {
    position: absolute;
    bottom: 15px;
    right: 15px;
    font-size: 1rem;
    padding: 5px 10px;
    font-family: var(--font-family-main);
    color: #888;
  }

  /* BUTTONS */

  .question-selector {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    max-width: 500px;
  }

  .button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
  }

  .nav-button {
    padding: 10px 20px;
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s ease;
  }

  .nav-button:hover {
    background-color: #efefef;
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  .nav-button:active {
    transform: translateY(0);
  }

  @media (max-width: 600px) {
    .card-deck-container {
      padding: 10px;
      gap: 10px;
    }

    .card-stack {
      height: 350px;
      margin-bottom: 0;
    }

    .card {
      min-height: 280px;
      padding: 20px;
      font-size: 1.2rem;
    }
    
    .card-middle {
      transform: rotate(-3deg) translateX(-5px) translateY(5px);
    }

    .card-bottom {
      transform: rotate(2deg) translateX(5px) translateY(10px);
    }

    .card-index {
        font-size: 0.8rem;
        bottom: 10px;
        right: 10px;
    }

    .button-group {
      flex-direction: column-reverse;
      align-items: center;
    }

    .nav-button {
      width: 100%;
      box-sizing: border-box;
    }
  }
</style>