---
layout: chantier
title: Truth or Truth
started: 2022-05-15 23:48
ended: 2025-01-19 19:45
tags: game list
description: |
  Truth or Truth is a game made for first dates.
---

<script type="module">
  document.addEventListener('DOMContentLoaded', function() {
    const questions = [
      "Truth or Truth?",
      "What do you think people say when they talk about you?",
      "What have you promised in you life?",
      "How would you describe your worldview?",
      "Are you afraid to die?",
      "What do you blame yourself for?",
      "How much of what's necessary to know do think you know?",
      "What are your core values?",
      "What gives you hope?",
      "Do you think there is something important that we have yet to discover?\n\n(Something like fire, chocolate, or semi conductors...)",
      "Is there something everyone should own?",
      "How do you usually decide if you like something or not?",
      "When did you lied last?",
      "What's the first thing you'd do with freewill?",
      "What are some secret weird things you do?",
      "Do you sometimes ask yourself why you think certain things?",
      "What percentage of people would you say are good looking?",
      "What are the most valuable things everyone should know?",
      "What do you think other people are so sure about?\nAnd what are they so sure about you?",
      "What do you think is the best invention of all time?",
      "How normal do you think you are?",
      "What's the last argument you lost?",
      "What did you prefer about your bedroom when you were a kid?",
      "What have you sacrificed in your life?",
      "What did you notice last about yourself?",
      "What do you think is the most iconic object of our time?\n\n(What do you think was the previous one?)",
      "What are you certain about yourself?",
      "You manage to become the benevolent world dictator, what's your first move?",
      "What do you like about yourself?",
      "How do you honestly feel about global warming?",
      "Explain why you have those apps on your phone homescreen.",
      "We put you in a room with 10 random people. What are you sure you've done more than any of them in your life?",
      "Do you believe in art?",
      "How do you usually disappoint yourself?",
      "What have you learned later than most people?",
      "What's your drive?",
      "It's Friday evening. You're alone at home and have no plans. What do you do?",
      "Do you usually like what you're saying?",
      "What would you like to change about yourself?",
      "What's your life philosophy?",
      "What have you been missing lately?",
      "Tell me your worst date? (worst break up?)",
      "What's your definition of reality?",
      "How many people do you hate?",
      "What misconception do people have about you?",
      "What are you addicted to?",
      "Do you think fashion is real?",
      "What do you want to build?",
      "Are you superficial?",
      "How does it feel to be you?",
      "Have you ever met someone that reminds you of yourself?",
      "How do you like your life so far?",
      "How do you deal with uncertainty?",
      "What are you most certain about?",
      "What's the most meaningful thing your parents ever gave you?",
      "What's an unpopular opinion of yours?",
      "Do you miss being a kid?",
      "Imagine a world in which everyone share your opinions. How would it look like?",
      "What's the last illegal thing you've done?",
      "What do you like that isn't popular already?",
      "What have you done for yourself?",
      "When's the last time you've done something for the first time?",
      "Are you living up to your potential?"
    ];
    
    let currentIndex = 0;
    
    function crook() {
      const rotation = (Math.random() * 6) - 3; /* Random rotation between -3 and 3 degrees */
      const translateX = (Math.random() * 10) - 5; /* Random X translation between -5px and 5px */
      const translateY = (Math.random() * 6) - 3; /* Random Y translation between -3px and 3px */
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
    
    function showPreviousQuestion() {
      if (!questions || questions.length === 0) return;
      
      currentIndex = (currentIndex - 1 + questions.length) % questions.length;
      
      /* Animation */
      const topCard = document.querySelector('.card-top');
      topCard.style.transform = 'translateX(-20px)';
      
      setTimeout(() => {
        displayCurrentCard();
      }, 150);
    }
    
    function showNextQuestion() {
      if (!questions || questions.length === 0) return;
      
      currentIndex = (currentIndex + 1) % questions.length;
      
      /* Animation */
      const topCard = document.querySelector('.card-top');
      topCard.style.transform = 'translateX(20px)';
      
      setTimeout(() => {
        displayCurrentCard();
      }, 150);
    }
    
    function showRandomQuestion() {
      if (!questions || questions.length === 0) return;
      
      const oldIndex = currentIndex;
      
      /* Make sure we get a different question */
      do {
        currentIndex = Math.floor(Math.random() * questions.length);
      } while (questions.length > 1 && currentIndex === oldIndex);
      
      /* Animation */
      const topCard = document.querySelector('.card-top');
      topCard.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        displayCurrentCard();
      }, 150);
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
  });
</script> 

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
      <button class="nav-button" id="prev-button">← Previous truth</button>
      <button class="nav-button" id="random-button">Random truth</button>
      <button class="nav-button" id="next-button">Next truth →</button>
    </div>
  </div>
</div>

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
    gap: 30px;
  }

  .card-stack {
    position: relative;
    width: 100%;
    max-width: 700px;
    height: 400px;
    margin-bottom: 20px;
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
  }

  .card-index {
    position: absolute;
    bottom: 15px;
    right: 15px;
    font-size: 1rem;
    padding: 5px 10px;
    font-family: 'Marker Felt', cursive;
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

</style>