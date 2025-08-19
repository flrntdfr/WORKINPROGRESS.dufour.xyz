---
layout: chantier
title: tl;dr
started:  2015-06-06 13:59
ended: 2021-12-12 23:58
result: [list]
lib: typed.v2.1.0.min.js
description: tl;dr are one-line summaries of text conversations that happened between mid-2015 → end-2021.
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
		"There is always a \"but\".",
		"Both can be a teaching.",
		"C'est plus facile de remarquer ce qui ne va pas en premier.",
		"On commence de là où on est.",
		"Drill. Baby, drill.",
		"On vit dans la réalité qu'on se crée.",
		"La jeunesse n'a pas d'âge.",
		"Ce qui compte c'est que ça aurait pu être vrai.",
		"À chaque fois c'est indélébile.",
		"Sur ces belles paroles…",
		"Porter son attention c'est faire exister.",
		"Show don't tell.",
		"Don't assume you can't fuck up.",
		"Le verbe n'est pas l'action.",
		"Simple does not have to mean easy.",
		"La vie est une cacahuète.",
		"Some things are complicated.",
		"It's not a cooking trick, it's a secret.",
		"Stop helping me!",
		"It's not what it looks like.",
		"Qui a dit que ce serait facile ?",
		"It's too early to disagree.",
		"Tout n'a pas besoin d'être compliqué.",
		"Feed everyone.",
		"No time is free.",
		"Form always follows function (again).",
		"There's no reason to feed the wrong wolf.",
		"It is always up to the most conscious person to let go first.",
		"It all comes from within.",
		"You are the piano and the hammers.",
		"You drink a lot of water in your life.",
		"No one dies before their time.",
		"No one is in control of the narrative.",
		"That's what happens when you cultivate differences.",
		"Most of what you see is what you get.",
		"Sometimes truth doesn't fit in the narrative.",
		"C'est ça réussir sa vie ?",
		"It takes two hands to hold a baby.",
		"L'enfer c'est les autres.",
		"Technically, a meaningless quest is still a quest.",
		"All ways can be paved.",
		"It's called “poetic irony”.",
		"Les morts ne dorment pas.",
		"On se voit pas souvent mais c'est pas grave parce que je rêve de toi.",
		"It's not a cult. It's better.",
		"Here's an idea: it's not different this time.",
		"There will be suffering no more.",
		"Do you want to be right or do you want to be happy?",
		"It's better to be close to what we are doing.",
		"Si tu tombes il y aura des bras pour te rattraper.",
		"Do not hold on to what is gone.",
		"Everything is workable.",
		"I love you again.",
		"Les silences comptent aussi.",
		"You're not between your ears.",
		"What if they created the earth sober?",
		"And this is how you get nowhere, fast.",
		"Tout n'est pas fragile.",
		"Brightest lights cast the biggest shadows.",
		"Intentions are not expectations.",
		"La gravité fera le reste.",
		"It's never a big deal. Until it is.",
		"The future keeps coming!",
		"On ne sépare pas les gens qui ont la même odeur.",
		"Atmen nicht vergessen.",
		"It doesn't need to be hard to be who we are.",
		"The map is not the territory.",
		"All the words are true.",
		"This is the new definition of the past.",
		"Almost none of what you see is real.",
		"Sometimes things just move together.",
		"La terre tourne plus vite que ce que tu crois.",
		"Il y a 1001 façons de se taire.",
		"Il faut jouir pour guérir.",
		"The best part isn't even my favourite part.",
		"À quoi on pense quand on n'a pas de problème ?",
		"It's like feeling at home in the universe.",
		"Comment on fait quand on n'aime pas ce qu'on désire ?",
		"C'est comme avoir peur du passé.",
		"Sometimes crashing into a wall opens a new door.",
		"Merde merde merde!",
		"Elle pourrait inventer une nouvelle religion.",
		"La vengeance est un plat réchauffé.",
		"It's like falling in love on a break-up song.",
		"Des filles comme toi, on en croise qu'une dans sa vie.",
		"Pleasure is no measure of success.",
		"I'm not smart, I'm paranoid!",
		"There is no such place as the now.",
		"Time is never redeemed.",
		"An ego larger than a Prius.",
		"On n'est pas tous des lombrics.",
		"Go bananas.",
		"Go big or go home.",
		"Heureux ceux qui rêvent.",
		"Aimer c'est décevoir un peu.",
		"I'm not jealous, I'm weird.",
		"Les choses auraient pu être un peu différentes. Ou un peu pareilles.",
		"On n'enterre pas un corps tiède.",
		"You cannot compare pains.",
		"Where there is will, there is a way (or two).",
		"Allow the situation to become part of you.",
		"It doesn't happen to you, it happens for you.",
		"Answers will be given.",
		"Un oiseau au bord du précipice est serein.",
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
		"It's valuable to finish what is started.",
		"Laisser rouler.",
		"It takes no time to achieve nothing.",
		"It takes trees to make matches.",
		"It takes blue to come out of the blue.",
		"It takes time to explore space.",
		"Paris is not a museum.",
		"Time is the ability to find stuff in space.",
		"You can only do one thing at a time.",
		"C'est possible d'avoir un plan pour soi même.",
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