# color-picker
Github: https://github.com/remi-deltombe/color-picker 

## Project structure
- index.html: Main HTML file
- src/: TypeScript source folder
   - main.ts: Entry file for TypeScript
   - utils.ts: General utilities for TypeScript
   - color-picker/: Folder containing color picker logic
      - color-picker.ts: Main class for the color picker
      - renderer.ts: Handles canvas rendering for the color picker
      - interactions.ts: Manages canvas events for the color picker
      - types.ts: Defines types and interfaces used by color picker components

## External libraries
This project is designed to showcase my canvas skills, so I opted for a library-free solution. 
The goal is to demonstrate that if I can implement a solution without external libraries, I can certainly do so with them as well.

However, I used Vite to streamline the setup, allowing for quick project initialization and fast-refresh development within minutes.

## Installation 
```
git clone https://github.com/remi-deltombe/color-picker.git
cd color-picker
npm i
```

## Running the project
```
npm start
```

## Areas for Improvement
1. Canvas Refresh Handling
   - Currently, if an offscreen canvas is used as input and is modified elsewhere, the color picker won’t update until the mouse moves over it.
   - A request rendering frame mechanism could be implemented for easier integration, though it may be less optimized.
2. Magic Numbers
   - Hardcoded numbers should be replaced with constants.
   - Meaningful constant names should be used instead of arbitrary numerical values.
3. Error Handling
   - Errors should be displayed to the user instead of only logging them in the console.
4. Pixel Alignment (renderer.ts:108)
   - Alignment should be properly computed for better accuracy.
5. Configurable Constants
   - Some constants (e.g., border size, radius) could be passed as options to the color picker for greater flexibility.