# calculator
Onscreen calculator created with HTML, CSS, and Javascript

#### Final Design
<img src="/images/final-calculator-design.png" width="400">

Live: https://jinayang15.github.io/calculator/
#### Special Notes
- NaN is an error that must be cleared with the "A/C" button (e.g. dividing by zero)
- Some wackinesss may occur due to float operations being imprecise (e.g. scientific notation showing up when it doesn't seem necessary, answer is still correct though!)

#### Features
- Can perform basic operations (e.g. add, subtract, multiply, divide)
- Able to chain operations continuously (e.g. 2 + 3 * 7 - 9 + 4 = 30 (no BEDMAS))
- Rounds or converts numbers to scientific notation to prevent overflowing the display
- Backspace and percentage buttons for quality of life
- Pretty user interface :D

#### Minor Details
- Inputting something like 9x= will automatically perform 9x9=81. This goes for division, addition, and subtraction as well
- If a decimal point is already onscreen, another cannot be inputted.
- Numbers like .356 or .4 work!
- Backspace and percentage buttons will not do anything if you have an operator selected.
- If you already have an operator selected, then press another one, the calculator will save most recently pressed operator.

#### Initial Design
![](/images/calculator-design.png)

#### Notes for Next Time
- I became a little lax about variable typing by abusing Javascript's automatic String to Number conversion. I will avoid this in the future.
- I rushed to code this since I want to move onto bigger projects, so I got a little disorganized. I should plan more thoroughly from the start.
-  I used flexbox to layout the calculator but it seems like CSS grid is more suited for the task. 
- Forgot to commit more often when implementing bigger features.






