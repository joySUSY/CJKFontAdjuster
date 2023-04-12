// Load the opentype.js library
var opentype = require ('opentype.js');

// Define a global variable to store the original font object
var originalFont;

// Define a global variable to store the modified font object
var modifiedFont;

// Define a global variable to store the preview text element
var previewText = document.getElementById ('preview-text');

// Define a global variable to store the export button element
var exportButton = document.getElementById ('export-button');

// Define a global variable to store the download link element
var downloadLink = document.getElementById ('download-link');

// Define a global variable to store the default preview text
var defaultText = '我你有永源用处出力安全没事美天日本言过其实再见物由是水谷你属怒神色布失望';

// Define a function to handle the file upload event
function handleFileUpload (event) {
  // Get the file object from the event target
  var file = event.target.files [0];

  // Check if the file is a TTF font file
  if (file.type === 'font/ttf') {
    // Read the file as an array buffer using a FileReader object
    var reader = new FileReader ();
    reader.readAsArrayBuffer (file);

    // When the file is loaded, parse it as a font object using opentype.js
    reader.onload = function () {
      // Parse the array buffer as a font object
      originalFont = opentype.parse (reader.result);

      // Clone the original font object to create a modified font object
      modifiedFont = originalFont.clone ();

      // Set the preview text element's font family to the modified font object
      previewText.style.fontFamily = modifiedFont.toStyle ();

      // Enable the slider inputs and buttons
      enableInputs ();
    };
  } else {
    // If the file is not a TTF font file, alert an error message
    alert ('Please upload a valid TTF font file.');
  }
}

// Define a function to enable the slider inputs and buttons
function enableInputs () {
  // Get all the slider inputs and buttons by their class names
  var sliders = document.getElementsByClassName ('slider');
  var buttons = document.getElementsByClassName ('button');

  // Loop through each slider input and button and remove the disabled attribute
  for (var i = 0; i < sliders.length; i++) {
    sliders [i].removeAttribute ('disabled');
  }
  for (var i = 0; i < buttons.length; i++) {
    buttons [i].removeAttribute ('disabled');
  }
}

// Define a function to handle the slider change event
function handleSliderChange (event) {
  // Get the slider input element from the event target
  var slider = event.target;

  // Get the slider's id, value, and data-parameter attributes
  var id = slider.id;
  var value = slider.value;
  var parameter = slider.dataset.parameter;

  // Call the corresponding function to adjust the font parameter according to the slider's id
  switch (id) {
    case 'contrast-slider':
      adjustContrast (value, parameter);
      break;
    case 'width-slider':
      adjustWidth (value);
      break;
    case 'face-slider':
      adjustFace (value, parameter);
      break;
    case 'counter-slider':
      adjustCounter (value);
      break;
    case 'gravity-slider':
      adjustGravity (value, parameter);
      break;
    case 'softness-slider':
      adjustSoftness (value, parameter);
      break;
    case 'opening-slider':
      adjustOpening (value);
      break;
    case 'feet-slider':
      adjustFeet (value);
      break;
    case 'tension-slider':
      adjustTension (value);
      break;
    case 'rounding-slider':
      adjustRounding (value);
      break;
    case 'curvature-slider':
      adjustCurvature (value, parameter);
      break;
    default:
      break;
  }

  // Update the preview text element's font family to reflect the changes
  previewText.style.fontFamily = modifiedFont.toStyle ();
}

// Define a function to adjust the contrast for vertical and horizontal strokes
function adjustContrast (value, parameter) {
    // Convert the slider value from string to number and map it to a scale factor between 0.5 and 1.5
    var factor = Number (value) / 100 * (1.5 - 0.5) + 0.5;
  
    // Loop through each glyph in the modified font object
    for (var i = 0; i < modifiedFont.glyphs.length; i++) {
      // Get the current glyph object
      var glyph = modifiedFont.glyphs.get (i);
  
      // Loop through each point in the glyph's path commands
      for (var j = 0; j < glyph.path.commands.length; j++) {
        // Get the current command object
        var command = glyph.path.commands [j];
  
        // Check if the command has x or y coordinates
        if (command.x !== undefined && command.y !== undefined) {
          // Scale the x or y coordinate by the factor depending on the parameter
          if (parameter === 'vertical') {
            command.x *= factor;
          } else if (parameter === 'horizontal') {
            command.y *= factor;
          }
        }
      }
    }
  }
  
  // Define a function to adjust the width of the font
  function adjustWidth (value) {
    // Convert the slider value from string to number and map it to a scale factor between 0.5 and 1.5
    var factor = Number (value) / 100 * (1.5 - 0.5) + 0.5;
  
    // Loop through each glyph in the modified font object
    for (var i = 0; i < modifiedFont.glyphs.length; i++) {
      // Get the current glyph object
      var glyph = modifiedFont.glyphs.get (i);
  
      // Scale the glyph's advance width by the factor
      glyph.advanceWidth *= factor;
  
      // Loop through each point in the glyph's path commands
      for (var j = 0; j < glyph.path.commands.length; j++) {
        // Get the current command object
        var command = glyph.path.commands [j];
  
        // Check if the command has x coordinate
        if (command.x !== undefined) {
          // Scale the x coordinate by the factor
          command.x *= factor;
        }
      }
    }
  }
  
  // Define a function to adjust the horizontal and vertical character face
  function adjustFace (value, parameter) {
    // Convert the slider value from string to number and map it to an offset between -50 and 50
    var offset = Number (value) / 100 * (50 - (-50)) + (-50);
  
    // Loop through each glyph in the modified font object
    for (var i = 0; i < modifiedFont.glyphs.length; i++) {
      // Get the current glyph object
      var glyph = modifiedFont.glyphs.get (i);
  
      // Loop through each point in the glyph's path commands
      for (var j = 0; j < glyph.path.commands.length; j++) {
        // Get the current command object
        var command = glyph.path.commands [j];
  
        // Check if the command has x or y coordinates
        if (command.x !== undefined && command.y !== undefined) {
          // Translate the x or y coordinate by the offset depending on the parameter
          if (parameter === 'horizontal') {
            command.x += offset;
          } else if (parameter === 'vertical') {
            command.y += offset;
          }
        }
      }
    }
  }

  // Define a function to adjust the counter size of the font
function adjustCounter (value) {
    // Convert the slider value from string to number and map it to a scale factor between 0.5 and 1.5
    var factor = Number (value) / 100 * (1.5 - 0.5) + 0.5;
  
    // Loop through each glyph in the modified font object
    for (var i = 0; i < modifiedFont.glyphs.length; i++) {
      // Get the current glyph object
      var glyph = modifiedFont.glyphs.get (i);
  
      // Get the bounding box of the glyph's path
      var bbox = glyph.path.getBoundingBox ();
  
      // Calculate the center point of the bounding box
      var centerX = bbox.x1 + (bbox.x2 - bbox.x1) / 2;
      var centerY = bbox.y1 + (bbox.y2 - bbox.y1) / 2;
  
      // Loop through each point in the glyph's path commands
      for (var j = 0; j < glyph.path.commands.length; j++) {
        // Get the current command object
        var command = glyph.path.commands [j];
  
        // Check if the command has x or y coordinates
        if (command.x !== undefined && command.y !== undefined) {
          // Calculate the distance and angle from the center point to the current point
          var dx = command.x - centerX;
          var dy = command.y - centerY;
          var distance = Math.sqrt (dx * dx + dy * dy);
          var angle = Math.atan2 (dy, dx);
  
          // Scale the distance by the factor
          var newDistance = distance * factor;
  
          // Calculate the new x and y coordinates based on the scaled distance and angle
          var newX = centerX + newDistance * Math.cos (angle);
          var newY = centerY + newDistance * Math.sin (angle);
  
          // Assign the new coordinates to the command object
          command.x = newX;
          command.y = newY;
        }
      }
    }
  }
  
  // Define a function to adjust the vertical alignment of the font
  function adjustGravity (value, parameter) {
    // Convert the slider value from string to number and map it to an offset between -50 and 50
    var offset = Number (value) / 100 * (50 - (-50)) + (-50);
  
    // Loop through each glyph in the modified font object
    for (var i = 0; i < modifiedFont.glyphs.length; i++) {
      // Get the current glyph object
      var glyph = modifiedFont.glyphs.get (i);
  
      // Loop through each point in the glyph's path commands
      for (var j = 0; j < glyph.path.commands.length; j++) {
        // Get the current command object
        var command = glyph.path.commands [j];
  
        // Check if the command has y coordinate
        if (command.y !== undefined) {
          // Translate the y coordinate by the offset depending on the parameter
          if (parameter === 'top') {
            command.y -= offset;
          } else if (parameter === 'bottom') {
            command.y += offset;
          }
        }
      }
    }
  }

  // Define a function to adjust the softness of stroke and dots of the font
function adjustSoftness (value, parameter) {
    // Convert the slider value from string to number and map it to a radius between 0 and 10
    var radius = Number (value) / 100 * (10 - 0) + 0;
  
    // Loop through each glyph in the modified font object
    for (var i = 0; i < modifiedFont.glyphs.length; i++) {
      // Get the current glyph object
      var glyph = modifiedFont.glyphs.get (i);
  
      // Check if the parameter is stroke or dot
      if (parameter === 'stroke') {
        // Smooth the glyph's path using opentype.js with the radius as an option
        glyph.path = opentype.Path.smoothPath (glyph.path, radius);
      } else if (parameter === 'dot') {
        // Loop through each point in the glyph's path commands
        for (var j = 0; j < glyph.path.commands.length; j++) {
          // Get the current command object
          var command = glyph.path.commands [j];
  
          // Check if the command is a move or line type
          if (command.type === 'M' || command.type === 'L') {
            // Check if there is a next command
            if (j < glyph.path.commands.length - 1) {
              // Get the next command object
              var nextCommand = glyph.path.commands [j + 1];
  
              // Check if the next command is also a move or line type
              if (nextCommand.type === 'M' || nextCommand.type === 'L') {
                // Check if the current and next commands have the same coordinates
                if (command.x === nextCommand.x && command.y === nextCommand.y) {
                  // Replace the current and next commands with a quadratic curve command that creates a circle around the point
                  var cx = command.x;
                  var cy = command.y;
                  var qx1 = cx + radius * Math.cos (Math.PI / 4);
                  var qy1 = cy + radius * Math.sin (Math.PI / 4);
                  var qx2 = cx + radius * Math.cos (Math.PI * 3 / 4);
                  var qy2 = cy + radius * Math.sin (Math.PI * 3 / 4);
                  var qx3 = cx + radius * Math.cos (Math.PI * 5 / 4);
                  var qy3 = cy + radius * Math.sin (Math.PI * 5 / 4);
                  var qx4 = cx + radius * Math.cos (Math.PI * 7 / 4);
                  var qy4 = cy + radius * Math.sin (Math.PI * 7 / 4);
                  command.type = 'Q';
                  command.x1 = qx1;
                  command.y1 = qy1;
                  command.x = qx2;
                  command.y = qy2;
                  nextCommand.type = 'Q';
                  nextCommand.x1 = qx3;
                  nextCommand.y1 = qy3;
                  nextCommand.x = qx4;
                  nextCommand.y = qy4;
                }
              }
            }
          }
        }
      }
    }
  }

  // Define a function to adjust the flat stroke openings of the font
function adjustOpening (value) {
    // Convert the slider value from string to number and map it to an angle between -45 and 45 degrees
    var angle = Number (value) / 100 * (45 - (-45)) + (-45);
  
    // Convert the angle from degrees to radians
    var radian = angle * Math.PI / 180;
  
    // Loop through each glyph in the modified font object
    for (var i = 0; i < modifiedFont.glyphs.length; i++) {
      // Get the current glyph object
      var glyph = modifiedFont.glyphs.get (i);
  
      // Loop through each point in the glyph's path commands
      for (var j = 0; j < glyph.path.commands.length; j++) {
        // Get the current command object
        var command = glyph.path.commands [j];
  
        // Check if the command is a move type
        if (command.type === 'M') {
          // Check if there is a previous and a next command
          if (j > 0 && j < glyph.path.commands.length - 1) {
            // Get the previous and next command objects
            var prevCommand = glyph.path.commands [j - 1];
            var nextCommand = glyph.path.commands [j + 1];
  
            // Check if the previous and next commands are line types
            if (prevCommand.type === 'L' && nextCommand.type === 'L') {
              // Calculate the distance and angle from the previous point to the current point
              var dx1 = command.x - prevCommand.x;
              var dy1 = command.y - prevCommand.y;
              var distance1 = Math.sqrt (dx1 * dx1 + dy1 * dy1);
              var angle1 = Math.atan2 (dy1, dx1);
  
              // Calculate the distance and angle from the current point to the next point
              var dx2 = nextCommand.x - command.x;
              var dy2 = nextCommand.y - command.y;
              var distance2 = Math.sqrt (dx2 * dx2 + dy2 * dy2);
              var angle2 = Math.atan2 (dy2, dx2);
  
              // Calculate the average distance and angle of the two lines
              var distance = (distance1 + distance2) / 2;
              var angle = (angle1 + angle2) / 2;
  
              // Rotate the average angle by the radian value
              var newAngle = angle + radian;
  
              // Calculate the new x and y coordinates based on the average distance and new angle
              var newX = command.x + distance * Math.cos (newAngle);
              var newY = command.y + distance * Math.sin (newAngle);
  
              // Replace the current command with a line command that creates a flat opening at the new coordinates
              command.type = 'L';
              command.x = newX;
              command.y = newY;
            }
          }
        }
      }
    }
  }

  // Define a function to remove the feet of the font
function adjustFeet (value) {
    // Convert the slider value from string to number and map it to a threshold between 0 and 10
    var threshold = Number (value) / 100 * (10 - 0) + 0;
  
    // Loop through each glyph in the modified font object
    for (var i = 0; i < modifiedFont.glyphs.length; i++) {
      // Get the current glyph object
      var glyph = modifiedFont.glyphs.get (i);
  
      // Loop through each point in the glyph's path commands
      for (var j = 0; j < glyph.path.commands.length; j++) {
        // Get the current command object
        var command = glyph.path.commands [j];
  
        // Check if the command is a line type
        if (command.type === 'L') {
          // Check if there is a previous and a next command
          if (j > 0 && j < glyph.path.commands.length - 1) {
            // Get the previous and next command objects
            var prevCommand = glyph.path.commands [j - 1];
            var nextCommand = glyph.path.commands [j + 1];
  
            // Check if the previous and next commands are also line types
            if (prevCommand.type === 'L' && nextCommand.type === 'L') {
              // Calculate the distance and angle from the previous point to the current point
              var dx1 = command.x - prevCommand.x;
              var dy1 = command.y - prevCommand.y;
              var distance1 = Math.sqrt (dx1 * dx1 + dy1 * dy1);
              var angle1 = Math.atan2 (dy1, dx1);
  
              // Calculate the distance and angle from the current point to the next point
              var dx2 = nextCommand.x - command.x;
              var dy2 = nextCommand.y - command.y;
              var distance2 = Math.sqrt (dx2 * dx2 + dy2 * dy2);
              var angle2 = Math.atan2 (dy2, dx2);
  
              // Calculate the difference between the two angles
              var angleDiff = Math.abs (angle1 - angle2);
  
              // Check if the difference is smaller than the threshold
              if (angleDiff < threshold) {
                // Replace the current command with a quadratic curve command that creates a smooth transition between the two lines
                var cx = command.x;
                var cy = command.y;
                var qx = cx + distance1 / 2 * Math.cos (angle1 + angleDiff / 2);
                var qy = cy + distance1 / 2 * Math.sin (angle1 + angleDiff / 2);
                command.type = 'Q';
                command.x1 = qx;
                command.y1 = qy;
                command.x = nextCommand.x;
                command.y = nextCommand.y;
  
                // Remove the next command from the path commands array
                glyph.path.commands.splice (j + 1, 1);
              }
            }
          }
        }
      }
    }
  }

  // Define a function to adjust the tension of stroke curve of the font
function adjustTension (value) {
    // Convert the slider value from string to number and map it to a tension factor between 0 and 1
    var tension = Number (value) / 100 * (1 - 0) + 0;
  
    // Loop through each glyph in the modified font object
    for (var i = 0; i < modifiedFont.glyphs.length; i++) {
      // Get the current glyph object
      var glyph = modifiedFont.glyphs.get (i);
  
      // Simplify the glyph's path using opentype.js with the tension factor as an option
      glyph.path = opentype.Path.simplifyPath (glyph.path, tension);
    }
  }

  // Define a function to apply rounding corner to stroke of the font
function adjustRounding (value) {
    // Convert the slider value from string to number and map it to a radius between 0 and 10
    var radius = Number (value) / 100 * (10 - 0) + 0;
  
    // Loop through each glyph in the modified font object
    for (var i = 0; i < modifiedFont.glyphs.length; i++) {
      // Get the current glyph object
      var glyph = modifiedFont.glyphs.get (i);
  
      // Loop through each point in the glyph's path commands
      for (var j = 0; j < glyph.path.commands.length; j++) {
        // Get the current command object
        var command = glyph.path.commands [j];
  
        // Check if the command is a line type
        if (command.type === 'L') {
          // Check if there is a previous and a next command
          if (j > 0 && j < glyph.path.commands.length - 1) {
            // Get the previous and next command objects
            var prevCommand = glyph.path.commands [j - 1];
            var nextCommand = glyph.path.commands [j + 1];
  
            // Check if the previous and next commands are also line types
            if (prevCommand.type === 'L' && nextCommand.type === 'L') {
              // Calculate the distance and angle from the previous point to the current point
              var dx1 = command.x - prevCommand.x;
              var dy1 = command.y - prevCommand.y;
              var distance1 = Math.sqrt (dx1 * dx1 + dy1 * dy1);
              var angle1 = Math.atan2 (dy1, dx1);
  
              // Calculate the distance and angle from the current point to the next point
              var dx2 = nextCommand.x - command.x;
              var dy2 = nextCommand.y - command.y;
              var distance2 = Math.sqrt (dx2 * dx2 + dy2 * dy2);
              var angle2 = Math.atan2 (dy2, dx2);
  
              // Calculate the difference between the two angles
              var angleDiff = Math.abs (angle1 - angle2);
  
              // Check if the difference is larger than a threshold
              if (angleDiff > Math.PI / 180) {
                // Calculate the intersection point of the two lines using basic geometry
                var ix = ((prevCommand.x * dy1 - prevCommand.y * dx1) * dx2 - (command.x * dy2 - command.y * dx2) * dx1) / (dx2 * dy1 - dx1 * dy2);
                var iy = ((prevCommand.x * dy1 - prevCommand.y * dx1) * dy2 - (command.x * dy2 - command.y * dx2) * dy1) / (dx2 * dy1 - dx1 * dy2);
  
                // Calculate the distance from the intersection point to the current point
                var dix = command.x - ix;
                var diy = command.y - iy;
                var di = Math.sqrt (dix * dix + diy * diy);
  
                // Check if the distance is larger than the radius
                if (di > radius) {
                  // Calculate the new x and y coordinates based on the radius and angles
                  var nx1 = ix + radius * Math.cos (angle1);
                  var ny1 = iy + radius * Math.sin (angle1);
                  var nx2 = ix + radius * Math.cos (angle2);
                  var ny2 = iy + radius * Math.sin (angle2);
  
                  // Replace the current command with a quadratic curve command that creates a rounded corner at the new coordinates
                  command.type = 'Q';
                  command.x1 = nx1;
                  command.y1 = ny1;
                  command.x = nx2;
                  command.y = ny2;
  
                  // Insert a new line command after the current command that connects to the next point
                  glyph.path.commands.splice (j + 1, 0, {type: 'L', x: nextCommand.x, y: nextCommand.y});
                }
              }
            }
          }
        }
      }
    }
  }

  // Define a function to adjust the stroke curvature and width of the font
function adjustCurvature (value, parameter) {
    // Convert the slider value from string to number and map it to a factor between -0.5 and 0.5
    var factor = Number (value) / 100 * (0.5 - (-0.5)) + (-0.5);
  
    // Loop through each glyph in the modified font object
    for (var i = 0; i < modifiedFont.glyphs.length; i++) {
      // Get the current glyph object
      var glyph = modifiedFont.glyphs.get (i);
  
      // Loop through each point in the glyph's path commands
      for (var j = 0; j < glyph.path.commands.length; j++) {
        // Get the current command object
        var command = glyph.path.commands [j];
  
        // Check if the command is a quadratic curve type
        if (command.type === 'Q') {
          // Check if there is a previous and a next command
          if (j > 0 && j < glyph.path.commands.length - 1) {
            // Get the previous and next command objects
            var prevCommand = glyph.path.commands [j - 1];
            var nextCommand = glyph.path.commands [j + 1];
  
            // Check if the previous and next commands are line types
            if (prevCommand.type === 'L' && nextCommand.type === 'L') {
              // Calculate the distance and angle from the previous point to the control point
              var dx1 = command.x1 - prevCommand.x;
              var dy1 = command.y1 - prevCommand.y;
              var distance1 = Math.sqrt (dx1 * dx1 + dy1 * dy1);
              var angle1 = Math.atan2 (dy1, dx1);
  
              // Calculate the distance and angle from the control point to the next point
              var dx2 = nextCommand.x - command.x1;
              var dy2 = nextCommand.y - command.y1;
              var distance2 = Math.sqrt (dx2 * dx2 + dy2 * dy2);
              var angle2 = Math.atan2 (dy2, dx2);
  
              // Calculate the average distance and angle of the two lines
              var distance = (distance1 + distance2) / 2;
              var angle = (angle1 + angle2) / 2;
  
              // Rotate the average angle by 90 degrees clockwise or counterclockwise depending on the parameter
              var newAngle;
              if (parameter === 'clockwise') {
                newAngle = angle - Math.PI / 2;
              } else if (parameter === 'counterclockwise') {
                newAngle = angle + Math.PI / 2;
              }
  
              // Calculate the new x and y coordinates based on the average distance, new angle, and factor
              var newX = command.x1 + distance * factor * Math.cos (newAngle);
              var newY = command.y1 + distance * factor * Math.sin (newAngle);
  
              // Assign the new coordinates to the command object
              command.x1 = newX;
              command.y1 = newY;
            }
          }
        }
      }
    }
  }

  // Define a function to handle the export button click event
function handleExportButtonClick (event) {
    // Generate a new name for the modified font file by adding a numerical suffix to its original name
    var originalName = originalFont.names.fullName.en;
    var modifiedName = originalName + '-' + Date.now ();
  
    // Set the modified font object's name properties to the new name
    modifiedFont.names.fontFamily.en = modifiedName;
    modifiedFont.names.fontSubfamily.en = modifiedName;
    modifiedFont.names.uniqueID.en = modifiedName;
    modifiedFont.names.fullName.en = modifiedName;
    modifiedFont.names.postScriptName.en = modifiedName;
  
    // Convert the modified font object to an array buffer using opentype.js
    var arrayBuffer = modifiedFont.toArrayBuffer ();
  
    // Convert the array buffer to a blob object with type 'font/ttf'
    var blob = new Blob ([arrayBuffer], {type: 'font/ttf'});
  
    // Create a URL for the blob object using URL.createObjectURL method
    var url = URL.createObjectURL (blob);
  
    // Set the download link element's href attribute to the URL and download attribute to the new name with '.ttf' extension
    downloadLink.href = url;
    downloadLink.download = modifiedName + '.ttf';
  
    // Click the download link element to trigger the download process
    downloadLink.click ();
  
    // Revoke the URL after a delay using URL.revokeObjectURL method
    setTimeout (function () {
      URL.revokeObjectURL (url);
    }, 1000);
  }
  
  // Add an event listener to the file input element that calls the handleFileUpload function when a file is selected
  document.getElementById ('file-input').addEventListener ('change', handleFileUpload);
  
  // Add an event listener to each slider input element that calls the handleSliderChange function when the value is changed
  var sliders = document.getElementsByClassName ('slider');
  for (var i = 0; i < sliders.length; i++) {
    sliders [i].addEventListener ('input', handleSliderChange);
  }
  
  // Add an event listener to the export button element that calls the handleExportButtonClick function when it is clicked
  exportButton.addEventListener ('click', handleExportButtonClick);
  
  // Set the preview text element's content to the default text
  previewText.textContent = defaultText;
}