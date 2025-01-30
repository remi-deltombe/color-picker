# color-picker

## Project structure
- index.html: Main html file
- src/: typescript sources folder
   - main.ts: ts entry file
   - utils.ts: generic ts utilities
   - color-picker/: color picker sources folder
      - color-picker.ts: Color picker main class
      - renderer.ts: Handle canvas rendering for the color picker
      - interactions.ts: Handle canvas event for the color picker
      - types.ts: contains all type and interfaces used by color pickes elements

## External libraries
Since this exercice is suppose to highlight my canvas skills, I decided to go for a libraryless solution.
Believeing if I can show that I can provide a solution without library, I automatically proove I could do with.

- Vite: help me to start quickly a ts project with refresh under 1 minute setup

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

## Point of improvement
1. Refresh should be possible to ask to the ColorPicker.
- As example, if an offscreencanvas is provided as input to the color picker, and been rendered meanwhile, color picker won't update the displayed canvas until mouse if moving on it. requestrenderingframe may be implemented instead for easier implementation, but less optimized solution

2. Number should be replaced with constant, Proper constant naming should be used instead of flat number in code

3. Error handling
Error should be displayed to the user instead of just printing them in the console.

4. pixelAlignment (renderer.ts:108) should be properly computed

5. Some constants could be passed as option of the color picker
as example: borderSize, radius,..