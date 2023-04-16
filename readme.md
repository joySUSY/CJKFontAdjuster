
Description
This is a web project that allows users to simulate the stroke and other parameters of CJK characters using slider adjustments. 

The project enables users to:

Upload their own TTF font files for simulation adjustment
Adjust contrasts for vertical and horizontal strokes
Adjust width, more condensed or extended
Adjust horizontal and vertical character’s face
Adjust counter
Adjust vertical for visual gravity
Adjust softness of stroke and dots
Apply flat stroke openings
Remove feet for character
Adjust tension of stroke curve
Apply rounding corner to stroke
Adjust stroke curvature and stroke width
The project also allows users to preview text to visualize the effects of adjustments. 

Installation
To run this project locally, you need to have Node.js and npm installed on your machine. Then follow these steps:

Clone this repository to your local machine: git clone https:https://github.com/joySUSY/CJKFontAdjuster
Navigate to the project folder: cd CJK-font-adjuster
Install the dependencies: npm install
Start the development server: npm start
Open your browser and go to http://localhost:3000
Usage
To use this project, you need to upload a TTF font file that contains CJK characters. You can use the sample font file provided in the fonts folder, or choose your own.

Once you upload a font file, you will see a preview of the characters with the default settings. You can use the sliders on the right side to adjust various parameters of the character. You can also change the preview text by typing in the input box below.

When you are satisfied with your adjustments, you can export the modified font file by clicking on the Export button. This will run a script on the font file for further modification, and then save it as a TTF format with a numerical suffix added to its original name for compatibility purposes. You can then download it directly in TTF format.

Contributing
This project is open for contributions. If you want to contribute, please follow these steps:

Fork this repository and create a new branch: git checkout -b your-branch-name
Make your changes and commit them: git commit -m 'your-commit-message'
Push your branch to your forked repository: git push origin your-branch-name
Create a pull request from your branch to this repository’s main branch
Please make sure your code follows the style guidelines and passes the tests before submitting a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for more details.
