---
layout: chantier
title: IS THIS ART?
type: street art, promotion
started: 2024-02-14 13:30
ended: 2024-12-20 17:45
location: Munich
tags: promotion
tech: stickers
description: |
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet dignissim eros in feugiat. Cras at fringilla mauris, sit amet venenatis mi. Duis consectetur, justo ut pellentesque ultrices, neque nunc faucibus mauris, eget iaculis dolor ipsum ac tellus. Suspendisse eget pharetra orci. Mauris vel vehicula urna. Cras congue elit in tortor mattis ornare. Nulla tincidunt, metus non sagittis varius, nisl lorem dapibus lorem, vel molestie turpis odio eu lacus. Nunc sagittis, dolor at laoreet pulvinar, elit dolor lobortis lorem, ut volutpat leo metus non neque. Duis non accumsan nisl, eget viverra ipsum. Nulla in magna sodales nunc feugiat facilisis vel a mauris. Phasellus consequat iaculis felis, sit amet eleifend lorem pulvinar at. Vestibulum et nulla eget nunc volutpat efficitur eget vel enim. Sed pretium lacus ut metus rhoncus auctor.

    <center><img style="max-width&#x3a;200px; padding&#x3a; 2em"src="/2024/assets/ISTHISART/ISTHISART.html.svg"></center>

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet dignissim eros in feugiat. Cras at fringilla mauris, sit amet venenatis mi. Duis consectetur, justo ut pellentesque ultrices, neque nunc faucibus mauris, eget iaculis dolor ipsum ac tellus. Suspendisse eget pharetra orci. Mauris vel vehicula urna. Cras congue elit in tortor mattis ornare. Nulla tincidunt, metus non sagittis varius, nisl lorem dapibus lorem, vel molestie turpis odio eu lacus. Nunc sagittis, dolor at laoreet pulvinar, elit dolor lobortis lorem, ut volutpat leo metus non neque. Duis non accumsan nisl, eget viverra ipsum. Nulla in magna sodales nunc feugiat facilisis vel a mauris. Phasellus consequat iaculis felis, sit amet eleifend lorem pulvinar at. Vestibulum et nulla eget nunc volutpat efficitur eget vel enim. Sed pretium lacus ut metus rhoncus auctor.
---

<div id="random-image-container"></div>

<style>
  #random-image-container {
    margin: 20px 0;
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const images = [
      "{% link _chantiers/2024/assets/ISTHISART/1.jpg %}",
      "{% link _chantiers/2024/assets/ISTHISART/2.jpg %}",
      "{% link _chantiers/2024/assets/ISTHISART/3.jpg %}",
      "{% link _chantiers/2024/assets/ISTHISART/4.jpg %}",
      "{% link _chantiers/2024/assets/ISTHISART/5.jpg %}",
      "{% link _chantiers/2024/assets/ISTHISART/6.jpg %}",
      "{% link _chantiers/2024/assets/ISTHISART/7.jpg %}"
    ];
    
    const container = document.getElementById('random-image-container');
    let autoRefreshTimer;
    
    function displayRandomImage() {
      if (images.length > 1) {
        const randomIndex = 1 + Math.floor(Math.random() * (images.length - 1));
        [images[0], images[randomIndex]] = [images[randomIndex], images[0]];
      }
      const img = document.createElement('img');
      img.src = images[0];
      container.innerHTML = '';
      container.appendChild(img);
      clearTimeout(autoRefreshTimer);
      autoRefreshTimer = setTimeout(displayRandomImage, 20000);
    }
    displayRandomImage();
    container.addEventListener('click', displayRandomImage);
  });
</script>