## JS Project Proposal: Chip's Challenge:  ReactJS Edition

### Background

Chip's Challenge is a classic tile-based puzzle game originally published by Epyx, and was later included in the Windows 3.1 Microsoft Entertainment Pack 4.    The original Chips Challenge is a 1-player game that plays out on a grid.  Each grid item can be either chip, a key, a block, a door, or a wall.  There are also special items.
Chip's goal is to find the keys to unlock doors, and must move blocks in order to gain access to keys.

I want to show how effectively React components can enable dry, well-organized code, and picked a game that strongly favors a great deal of object-oriented programming.  Additionally, as an aspiring front-end developer who loves writing React, I believe that demonstrating a very strong understanding of ReactJS beyond my original fullstack project will help drive home
to recruiters that I have an extremely solid understanding of React and Redux fundamentals and and have solid CSS skills that can flex well beyond traditional web applications.  By heavily leveraging ReactJS's underlying Render logic, I can quickly and easily write ChipJS by simply managing state of my underlying components!  As a turn-based, tile-based game, Chip's Challenge is a perfect ReactJS candidate.  Note that no back-end requests are expected.

### Functionality & MVP  

With Chip's Challenge, users will be able to do the following:

- [ ] Start and reset the game board.  Since the game is turn-based, it's always 'paused'.
- [ ] Move chip around with arrows and WASD keys.
- [ ] Move blocks, pick up keys, open doors.
- [ ] See a display with their information, like current keys and current level.

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production README

### Wireframes

This app will consist of a single screen with game board, game controls, and nav links to the Github, my LinkedIn,
and the About modal.

Time permitting, this game will attempt to exactly replicate the Windows 3.1 interface and menubar.

![wireframes](https://upload.wikimedia.org/wikipedia/en/f/f7/Chip%27s_Challenge.png)

### Architecture and Technologies


This project will be implemented with the following technologies:

- `JavaScript` and `ReactJS` for game logic,
- `ReactJS` and `CSS` for effects rendering,

In addition to the entry file, there will be three components involved in this project:

`game.jsx`: this component will hander overall game logic including tracking keys, the global store, etc.

`board.jsx`: this component will handle the logic for creating and updating the necessary `Foo.js` elements and rendering them to the DOM.

`chip.jsx`: this component will handle the logic for the Chip protagonist.

`door.jsx`: this component will handle the logic for the door object.

`key.jsx`: this component will handle the logic for the key object.


### Implementation Timeline

**Day 1**: Set up ReactJS basic components, get webpack config to work.  Set up initial game logic around levels, etc.

- 2-3 different 'level' components.
- Set up extremely basic CSS board.

**Day 2**: Get initial state of Chip and components set up. Get Sprites working. Movement should work.

- Chip should be able to hold keys and a location.
- Board will re-render board based on updated location of Chip.
- Write various Redux loops to enable Chip to move.


**Day 3**: Component interaction

- Components will have specific interactions when they are pushed around.  This will require many Redux cycles.


**Day 4**: Finish component interaction + board logic interaction.

- Create controls for game speed, stop, start, reset, and shape type
- Have a styled `HTML Baz`, nice looking controls and title
- If time: include buttons on the side to toggle the color scheme of the cells


### Bonus features

There are many directions this cellular automata engine could eventually go.  Some anticipated updates are:
- [ ] Add options for different rule sets
- [ ] Add multiple choices for starting states that are interesting
- [ ] Explore multi-state versions of the game, such as the ones outlined [here](https://cs.stanford.edu/people/eroberts/courses/soco/projects/2008-09/modeling-natural-systems/gameOfLife2.html)
