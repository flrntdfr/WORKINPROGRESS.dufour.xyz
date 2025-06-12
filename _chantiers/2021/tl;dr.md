---
layout: chantier
title: tl;dr
started: 2015-06-06 13:59
ended: 2021-12-12 23:58
labels: [list]
lib: typedv2.1.0.min.js
description: tl;dr are one-line summaries of text conversations I had during the period mid 2015 → 2021.
---

<div id="typed-container"></div>

<style>
	.dynamic {
		padding-bottom: 5rem;
	}

	.typed-cursor {
		opacity: 1;
	}

	.typed-fade-out {
	  opacity: 0;
}
</style>

<script>
	const strings = [
		"Le temps fait toujours son travail.",
		"Show don't tell.",
		"Le verbe n'est pas l'action.",
		"La vie est une cacahuète.",
		"Some things are complicated.",
		"It all comes from inside.",
		"It's not a cooking trick, it's a secret.",
		"Stop helping me!",
		"It's not what it looks like.",
		"Just fucking tell her that you're sorry.",
		"Qui a dit que ce serait facile?",
		"It's too early to disagree.",
		"Tout n'as pas besoin d'être compliqué.",
		"Feed everyone.",
		"No time is free.",
		"All will prosper.",
		"She was god coming to you as a teaching.",
		"Form always follows function.",
		"Why feed the wrong wolf?",
		"You keep moving on with your life.",
		"It is always up to the most conscious person to let go first.",
		"It all comes from within.",
		"You are the hammers and the piano.",
		"You drink a lot of water in your life.",
		"No ones dies before their time.",
		"No one is in control of the narrative.",
		"Let's cultivate differences.",
		"Sometimes truth doesn't fit the narrative.",
		"C'est ça réussir sa vie.",
		"It takes two hands to hold a baby.",
		"L'enfer c'est les autres.",
		"A meaningless quest is still a quest.",
		"She was worth the sun.",
		"It felt better when it was a dream.",
		"We are more than we think.",
		"All ways can be paved.",
		"It's called poetic irony.",
		"The dead don't sleep.",
		"On se voit pas souvent mais c'est pas grave parce que je rêve de toi.",
		"It's not a cult. It's better.",
		"I wish we could die more often.",
		"Here's an idea: it's not different this time.",
		"There will be suffering no more.",
		"Do you want to be right or do you want to be happy?",
		"It's better to be close to what we are doing.",
		"Si tu tombes il y aura des bras pour de rattraper.",
		"Do not hold on to what is gone.",
		"Everything is workable.",
		"I love you again.",
		"Les silences comptent aussi.",
		"You're not between your ears.",
		"Time is not mine to give.",
		"What if they created the earth sober?",
		"And this is how you get nowhere, fast.",
		"I'll deal with the consequences later.",
		"Tout n'est pas fragile.",
		"Brightest lights cast the biggest shadows.",
		"Intentions are not expectations.",
		"La gravité fera le reste.",
		"It's never a big deal. Until it is.",
		"The future keeps coming.",
		"On ne sépare pas les gens qui ont la même odeur.",
		"Atmen nicht vergessen.",
		"Why is it hard to be who we are?",
		"The map is not the territory.",
		"All the words are true.",
		"This is the new definition of the past.",
		"Almost none of what you see is real.",
		"Sometimes things just move together.",
		"La terre tourne plus vite que ce que tu crois.",
		"Il y'a 1001 façons de se taire.",
		"Il faut jouir pour guérir.",
		"The best part isn't even my favourite part.",
		"À quoi on pense quand on a pas de problème ?",
		"It's like feeling at home in the universe.",
		"Comment on fait quand on n'aime pas ce qu'on désire?",
		"C'est comme avoir peur du passé.",
		"Sometimes crashing into a wall opens new doors.",
		"Merde merde merde.",
		"She can invent a new religion if she wants.",
		"La vengeance est un plat réchauffé.",
		"It's like falling in love on a break up song.",
		"Des filles comme toi, on en croise qu'une dans sa vie.",
		"Pleasure is no measure of success.",
		"I'm not smart, I'm paranoid.",
		"There is no such place as the now.",
		"Les bonnes personnes n'ont pas la vie facile.",
		"Time is never redeemed.",
		"An ego larger than a Prius.",
		"On est pas tous des lombrics.",
		"Go bananas.",
		"Go big or go home.",
		"Heureux ceux qui rêvent.",
		"Aimer c'est décevoir un peu.",
		"I'm not jaleaous, I'm weird.",
		"Les choses auraient pu être un peu différentes. Ou un peu pareilles.",
		"On n'enterre pas un corps tiède.",
		"You can not compare pains.",
		"Where there is will, there is a way.",
		"Allow the situation to become part of you.",
		"It doesn't happen to you, it happens for you.",
		"Answers will be given.",
		"Un oiseau au bord du précipice est serein.",
		"Thoughts lead to action.",
		"On s'habitue à tout.",
		"You want an open mind? You should have an open door.",
		"Sometimes people cross bridges.",
		"Approval comes from within.",
		"Nothing is lost forever.",
		"It can only get better from here.",
		"Actions have consequences.",
		"Failures build your sense of humor.",
		"Les bonnes choses prennent du temps.",
		"If you don't want to get burned, don't put your hand in the fire.",
		"Purpose keeps people going.",
		"People should start from where they are.",
		"It's valuable to finish what's started.",
		"Laisse rouler.",
		"It takes no time to achieve nothing.",
		"It takes trees to make matches.",
		"It takes blue to come out of the blue.",
		"It takes time to explore space.",
		"Paris is not a museum.",
		"Time is the ability to find stuff in space.",
		"You can only do one thing at a time."
	];

	const container = document.getElementById('typed-container');

	for (let i = 0; i < 5; i++) {
		const div = document.createElement('div');
		div.className = 'dynamic';
		const span = document.createElement('span');
		span.id = `typed${i + 1}`;
		div.appendChild(span);
		container.appendChild(div);

		new Typed(`#typed${i + 1}`, {
			strings: strings,
			typeSpeed: 60,
			backspeed: 90,
			smartBackspace: false,
			loop: true,
			shuffle: true
		});
	}
</script>