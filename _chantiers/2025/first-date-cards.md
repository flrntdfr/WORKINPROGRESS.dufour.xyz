---
layout: chantier
title: First date cards
started: 2022-05-15 23:48
finished: 2025-01-19 19:45
tags: list
---

<style>
  .card-deck-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
    padding: 20px;
    gap: 30px;
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
    position: relative;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    box-shadow: 
      0 1px 3px rgba(0,0,0,0.12), 
      0 1px 2px rgba(0,0,0,0.24),
      0 8px 15px -5px rgba(0,0,0,0.1);
    border: 1px solid #e8e8e8;
    font-family: 'Comic Sans MS', 'Marker Felt', cursive;
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

  .card:hover {
    transform: rotate(0deg) translateY(-5px) translateX(0px) !important;
    box-shadow: 
      0 14px 28px rgba(0,0,0,0.15), 
      0 10px 10px rgba(0,0,0,0.10);
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
  }

  .card-deck-description {
    text-align: center;
    max-width: 600px;
    margin: 0 auto 40px auto;
  }

  .question-selector {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    max-width: 500px;
  }

  .question-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 80px;
    font-size: 1rem;
    text-align: center;
    transition: background-color 0.3s ease;
  }

  .input-label {
    font-size: 1rem;
    color: #555;
  }

  .questions-list {
    display: none; /* Hide the list from view */
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

  @media (max-width: 768px) {
    .card-deck-container {
      flex-direction: column;
    }
  }
</style>

<ol class="questions-list">
  <li>Are you afraid to die?</li>
  <li>What do you blame yourself for?</li>
  <li>What have you promised in you life?</li>
  <li>Do you think that you know everything that is necessary to know?</li>
  <li>What are your core values?</li>
  <li>What do you want? Right now?</li>
  <li>How do you usually decide if you like something or not?</li>
  <li>When did you lied last?</li>
  <li>What are some secret weird things you do?</li>
  <li>Do you sometimes ask yourself why you think certain things?</li>
  <li>What percentage of people would you say are good looking?</li>
  <li>What are the most valuable things everyone should know?</li>
  <li>What do you think other people are so sure about (and sure about you?)?</li>
  <li>What do you think is the best invention of all time?</li>
  <li>How normal do you think you are?</li>
  <li>What's the last argument you lost?</li>
  <li>What did you prefer about your bedroom when you were a kid?</li>
  <li>What have you sacrificed in your life?</li>
  <li>What did you notice last about yourself?</li>
  <li>What do you think is the most iconic object of our time? (What do you think was the previous one?)</li>
  <li>What are you certain about yourself?</li>
  <li>You manage to become the benevolent world dictator, what's your first move?</li>
  <li>What do you like about yourself?</li>
  <li>How do you honestly feel about global warming?</li>
  <li>Do you think it's possible that we haven't discovered something as important as fire or chocolate yet?</li>
  <li>Explain why you have those apps on your phone homescreen.</li>
  <li>We put you in a room with 10 random people. What are you sure you've done more than any of them in your life?</li>
  <li>Do you believe in art?</li>
  <li>How do you usually disappoint yourself?</li>
  <li>What have you learned later than most people?</li>
  <li>What's your drive?</li>
  <li>It's Friday evening. You're alone at home and have no plans. What do you do?</li>
  <li>Do you usually like what you're saying?</li>
  <li>What would you like to change about yourself?</li>
  <li>Do you take the stairs or the elevator to your flat? (If stairs: How many stairs are there?)</li>
  <li>What's your life philosophy?</li>
  <li>What have you been missing lately?</li>
  <li>Tell me your worst date? (worst break up?)</li>
  <li>What's your definition of reality?</li>
  <li>How many people do you hate?</li>
  <li>What is it that you can do better than anyone else? (help: Habits in your daily life?)</li>
  <li>What misconception do people have about you?</li>
  <li>What are you addicted to?</li>
  <li>Do you think fashion is real?</li>
  <li>What do you want to build?</li>
  <li>Are you superficial?</li>
  <li>How does it feel to be you?</li>
  <li>Have you ever met someone that reminds you of yourself?</li>
  <li>How do you like your life so far?</li>
  <li>How do you deal with uncertainty?</li>
  <li>What are you most certain about?</li>
  <li>What's the most meaningful thing your parents ever gave you?</li>
  <li>What's an unpopular opinion of yours?</li>
  <li>Do you miss being a kid?</li>
  <li>Imagine a world in which everyone share your opinions. How would it look like?</li>
  <li>What's the last illegal thing you've done?</li>
  <li>What do you like that isn't popular already?</li>
</ol>

<div class="card-deck-container">
  <div class="card">
    <p class="card-content" id="current-card-content"></p>
  </div>
  
  <div class="question-selector">
    <div class="button-group">
      <button class="nav-button" id="prev-button">Previous</button>
      <button class="nav-button" id="random-button">Random</button>
      <button class="nav-button" id="next-button">Next</button>
    </div>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    /* Get questions from the list items */
    const questionItems = document.querySelectorAll('.questions-list li');
    const questions = Array.from(questionItems).map(item => item.textContent);
    
    let currentIndex = 0;
    
    /* Function to generate random crookedness */
    function getRandomCrookedness() {
      const rotation = (Math.random() * 6) - 3; /* Random rotation between -3 and 3 degrees */
      const translateX = (Math.random() * 10) - 5; /* Random X translation between -5px and 5px */
      const translateY = (Math.random() * 6) - 3; /* Random Y translation between -3px and 3px */
      return `rotate(${rotation}deg) translateX(${translateX}px) translateY(${translateY}px)`;
    }
    
    function displayCurrentCard() {
      const cardContent = document.getElementById('current-card-content');
      const card = document.querySelector('.card');
      
      if (questions && questions.length > 0) {
        cardContent.textContent = questions[currentIndex];
        
        /* Apply random crookedness to the card */
        card.style.transform = getRandomCrookedness();
      } else {
        cardContent.textContent = "No questions found";
      }
    }
    
    function showPreviousQuestion() {
      if (!questions || questions.length === 0) return;
      
      currentIndex = (currentIndex - 1 + questions.length) % questions.length;
      
      /* Animation */
      const card = document.querySelector('.card');
      card.style.transform = 'translateX(-20px)';
      
      setTimeout(() => {
        displayCurrentCard();
      }, 150);
    }
    
    function showNextQuestion() {
      if (!questions || questions.length === 0) return;
      
      currentIndex = (currentIndex + 1) % questions.length;
      
      /* Animation */
      const card = document.querySelector('.card');
      card.style.transform = 'translateX(20px)';
      
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
      const card = document.querySelector('.card');
      card.style.transform = 'scale(0.95)';
      
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