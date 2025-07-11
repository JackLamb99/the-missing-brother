# The Missing Brother

**The Missing Brother** is a narrative-driven, noir-style detective game set in 1950s London. Built entirely in HTML, CSS, and JavaScript, the game lets players take on the role of a private investigator. Through branching narratives, item collection, clue-based decision-making, and dice-roll risk systems, players uncover a dark conspiracy. View the live site [here](https://jacklamb99.github.io/the-missing-brother/index.html).

![Mockup](docs/images/mockup.png)

## User Stories

The game was developed with a player-focused approach, below are the user stories that guided the development process, along with explanations and visual examples of how each one was addressed.

1. "As a new player first opening the website, I want easily understand where to go next, so that I can start a game without unnecessary navigation."

- The landing page for the wesbite features a simple menu ui with the title of the game and three simply named buttons to start a new game, continue an existing game and navigate to a 'How to Play' page.

    <details><summary>Landing Page</summary>

    ![Landing Page](docs/images/feature-landing.png)

    </details>

2. "As a new player, I want to be able to understand what the game is about and how to play, so that I am as prepared as possible when starting a new game."

- The site includes a detailed 'How to Play' page which gives an overview of the game, how to get started, the icons to look for in the game and what they mean.

    <details><summary>'How to Play' Page</summary>

    !['How to Play' Page](docs/images/feature-how-to-play.png)

    </details>

3. "As a new player, I want to input my name and pronouns at the start, so that the game can personalise the story to reflect mine or my character's identity."

- Upon starting a new game, players are taken to a character creation menu, allowing them to enter a name for their character and choose their pronouns, both of which will then be used throughout the game to create a more immersive experience. There is also logic in place to 'normalise' name inputs *(i.e. convert "jOhN sMiTh" to "John Smith").*

    <details><summary>Character Creation</summary>

    ![Character Creation](docs/images/feature-character.png)

    </details>

4. "As a player exploring the game, I want to experience different types of scenes, so that gameplay feels varied and not monotonous."

- A variety of scene 'types' are incorporated into the game, including 'Searches', 'Dialogue' and 'Action'.

    <details><summary>Varied Scenes</summary>

    ![Varied Scenes](docs/images/feature-scenes.png)

    </details>

5. "As a player interacting with NPCs, I want to make dialogue choices, so that I can influence the outcome of scenes and learn critical information."

- From the start of the game, players are given scenes with multiple dialogue option that lead to a variety of outcomes and chances to learn new information.

    <details><summary>Choice-Based Dialogue</summary>

    ![Choice-Based Dialogue](docs/images/feature-choice-based.png)

    </details>

6. "As a player exploring scenes, I want to collect items in an inventory, so that I can use them to unlock new paths or survive later encounters."

- Some scenes, through searches or action, result in the player collecting an item that is vital to the success of later decisions.

    <details><summary>Inventory System</summary>

    ![Inventory System](docs/images/feature-inventory.png)

    </details>

7. "As a player choosing different actions, I want to experience consequences that affect the storyline, so that my decisions lead to different outcomes, including potential failure states."

- The game includes choices with branching outcomes that can result in success or game-ending failure, dependent on their previous choices and items collected.

    <details><summary>Branching Narratives</summary>

    ![Branching Narratives](docs/images/feature-branching.png)

    </details>

8. "As a player in a detective themed game, I want to collect clues or evidence, so that I can access additional choices or make more informed decisions."

- Some scenes, accessed through searches or correct dialogue choices, result in the player collecting clues and evidence that allow them to make the correct choices elsewhere.

    <details><summary>Clue and Evidence Tracking</summary>

    ![Clue and Evidence Tracking](docs/images/feature-clue.png)

    </details>

9. "As a player attempting risky actions, I want a chance-based system to determine the outcome, so that I feel tension and unpredictability during critical scenes."

- The game features 'Action' scenes that require the player to pick between a low-risk dice roll with a lower threshold for success but no second chance, or a high-risk roll with a higher threshold but a second chance if it fails.

    <details><summary>Dice Roll Mechanics</summary>

    ![Dice Roll Mechanics](docs/images/feature-dice.png)

    </details>

10. "As a player progressing through a linear story, I want to be locked out of scenes once I choose to leave them, so that my choices carry real weight and the game maintains narrative tension."

- Throughout the game, players are provided with the option to leave the location, but most can't be returned to once that decision is made.

    <details><summary>Scene Locking</summary>

    ![Scene Locking](docs/images/feature-scene-locking.png)

    </details>

11. "As a player moving through the story, I want to see a unique background image for each scene or location, so that I stay immersed in the noir atmosphere of 1950s London."

- The game incorporates multiple unique backgrounds based on the location in which the scene takes place, allowing the players to immerse themselves in the theme of the game while they progress through the narrative. Additional logic is in place to change the background dynamically based on the orientation of their chosen device, meaning the most appropriately sized image is always used.

    <details><summary>Background Example</summary>

    ![Background Example](docs/images/feature-example-bg.png)

    </details>

12. "As a player returning to the game, I want to be able to continue an existing game, so that I can pick up where I left off without having to repeat scenes I've already completed."

- Whenever the game is advanced to a new scene, logic is in place to save the player's progress to their local storage. So if players choose to navigate to the landing page or leave the game entirely, they can return to their latest scene by simply selecting the 'Continue' option from the main menu.

    <details><summary>Continued Progress</summary>

    ![Continued Progress](docs/images/feature-continue.png)

    </details>

## Design

### Wireframes

The follwing wireframes guided the site’s structure and layout across desktop, tablet and mobile devices.

<details><summary>Index Page Wireframes</summary>

![Index Page Wireframes](docs/images/wireframe-index.png)

</details>

<details><summary>Game Page Wireframes</summary>

![Game Page Wireframes](docs/images/wireframe-game.png)

</details>

<details><summary>'How to Play' Page Wireframes</summary>

![Cars Page Wireframe](docs/images/wireframe-how-to-play.png)

</details>

### Colour Palette

The colour scheme draws inspiration from vintage noir cinema, 1950s pulp fiction, and cold war-era detective thrillers. It uses deep, muted tones and strong contrast to reinforce the dark, moody atmosphere of a mystery set in post-war London. The palette is consistent with the game's themes of mystery and tension, enhancing immersion at every stage.

![Colour Palette](docs/images/colour-palette.png)

- **#302442** - Used for buttons, this deep purple-grey evokes a sense of secrecy and subdued tension, aligning with the game’s noir aesthetic.
- **#563457** - A richer, more saturated variation used for button hover states, giving the user clear feedback and drawing attention to interactive elements.
- **#522D17** - A dark brown-red used for headings, reminiscent of classic 'file folders' or tobacco, both classic staples of noir imagery.
- **#0B0201** - A near-black tone but a hint of brown used for body text, ensuring high readability while visually complimenting the headings.

**Contrast and Legibility** - All game headers, text and buttons are set over a light, semi-transparent overlay, allowing background visuals to be seen but not interfere with text legibility. Meeting WCAG contrast guidelines to support accessibility.

**Consistency** - The colour palette is applied across buttons, text, and backgrounds to maintain visual cohesion and narrative tone.

**Focus** - Accent tones are used for hover states to help guide player attention without breaking immersion.

### Background Imagery

The scene backgrounds complement the core palette with desaturated hues, low lighting, and muted contrasts - often depicting fog, rain, or artificial light. These visual themes reinforce a feeling of urban isolation and moral ambiguity consistent with 1950s noir.

### Typography

The site uses two fonts imported from Google Fonts to support both clarity and aesthetic impact:

- **Special Elite** for headers (typewriter/pulp look)
- **Lato** for readable body text

### Responsive UI

Headings, text and interactive elements adapt based on screen size. Game layout is fully responsive across:

- Desktop
- Tablet
- Mobile