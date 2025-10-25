---
slug: "/coding-virtual-worlds-vr-projects"
date: "2025-10-25 23:00"
title: "Coding Virtual Worlds at Aalto University"
type: "blogs"
language: "en"
tags: [VR, Unity, Interaction Design]
home_image: "https://miever.s3.ap-east-1.amazonaws.com/static/blogs/coding-virtual-world.webp"
description: A reflection on my Coding Virtual Worlds course at Aalto University — from building Beat Saber and Bowling in VR to creating an Escape Room, exploring interaction and immersion through Unity and C#.
---

# Coding Virtual Worlds at Aalto University 🎮 

This semester I took *Coding Virtual Worlds* at Aalto, a course that introduced me to how interaction works in immersive environments.  

From **Beat Saber** to **Bowling in VR**, and finally an **Escape Room**, each project offered a new way to think about space, motion, and user experience in VR.

It was also a great opportunity to get hands-on with **Unity** and **C#**, and to see how small design decisions can completely change how players feel inside a virtual world.

---

## Beat Saber 🎵

The first project in the *Coding Virtual Worlds* course was inspired by **Beat Saber**, but rather than focusing on rhythm detection, the version explored the core **interaction mechanics**, how players use controllers to hit moving targets in 3D space.

I focused on building the basic block slicing system and experimented with different visual feedback styles to make the hits feel more responsive and satisfying.  

This project gave me a better understanding of **collision detection**, **object spawning**, and **interaction timing** in Unity.

Even though it was a simplified version, it was really rewarding to see how small adjustments to movement speed or hit feedback could change the overall sense of immersion.

<video width="100%" controls>
  <source src="https://miever.s3.ap-east-1.amazonaws.com/static/blogs/beatsaber.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

[Download APK](https://miever.s3.ap-east-1.amazonaws.com/static/blogs/beat-saber.apk)

---

## Bowling in VR 🎳

The second project was to build a small **Bowling** game in VR. The core tasks included setting up locomotion and interaction with XR, creating bowling pins and a ball, and managing resets for both objects after each throw.

I implemented the XR setup with teleportation, interactors, and grab mechanics, allowing players to pick up and throw the bowling ball naturally. After each roll, the ball automatically resets to its starting position, and fallen pins respawn for the next round, creating a smooth, replayable loop.

To enhance the experience, I added **audio feedback** for realism:  
- Rolling sounds play only when the ball is released.  
- A special sound effect triggers when all pins are knocked down in a single throw.  
- Additional lighting and ambient color were introduced to simulate a real bowling alley atmosphere.

This project helped me understand how **physics, sound, and spatial feedback** combine to create immersion in VR. It also gave me more practice working with **XR Interaction Toolkit** and scene lighting in Unity.

<video width="100%" controls>
  <source src="https://miever.s3.ap-east-1.amazonaws.com/static/blogs/bowling.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

[Download APK](https://miever.s3.ap-east-1.amazonaws.com/static/blogs/bowling.apk)

---

## Escape Room 🔐

The third project was to build an **Escape Room** experience in VR, combining interaction design, object logic, and atmosphere.  

Core features included:
- **Grab + Distance Checker:** placing a grabbable object near a specific location triggers an action (e.g., unlocking a door).  
- **Music UI:** background music with play, pause, and volume controls.  
- **Door Handle:** physical handle interaction for opening and closing doors.  
- **Action Button:** toggles the room light.  

Extra features added a new **room scene** with ambient audio and a simple **enemy AI** that follows the player and triggers an attack animation when close.  

This version combined interaction logic, spatial triggers, and environmental storytelling, and it became the foundation for my final project.

<video width="100%" controls>
  <source src="https://miever.s3.ap-east-1.amazonaws.com/static/blogs/escape-room.MP4" type="video/mp4">
  Your browser does not support the video tag.
</video>

[Download APK](https://miever.s3.ap-east-1.amazonaws.com/static/blogs/escape-room.apk)

---

### Final Project — Escape Room: Combat Expansion ⚔️ 

For the final project, I expanded on the previous *Escape Room* and turned it into a more dynamic, game-like experience with **combat and player presence** at its core.

The first step was adding a controllable **player avatar**, allowing free movement within the environment. To strengthen immersion, I also placed a **mirror** in the scene so the player could see their own reflection, a simple addition that made the world feel much more alive.

The biggest upgrade came from introducing **enemy zombies** that detect and attack the player. When attacked, the player’s **health bar** decreases, and a **red particle effect** simulates blood impact, giving immediate visual feedback and intensity. To balance this, I added a **sword pickup system**, players can grab the sword and fight back. Each zombie takes multiple hits before disappearing from the scene.

These mechanics made the experience feel more like a complete VR game. Combining interaction, feedback, and combat systems taught me a lot about how to design **player agency** and **game flow** in virtual environments.

---

**Demo Video:**  

<video width="100%" controls>
  <source src="https://miever.s3.ap-east-1.amazonaws.com/static/blogs/final-escape-room.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

---

## ✨ Reflection

Looking back, Coding Virtual Worlds was a great way to explore how creativity, design, and programming come together in VR.

Big thanks to **Markus Kirjonen** for his thoughtful guidance throughout the course.