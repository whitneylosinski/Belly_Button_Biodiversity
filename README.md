# Belly Button Biodiversity Dashboard

## Purpose
The purpose of this project was to create a web application dashboard using Javascript and Plotly to display belly button bacteria data from several different research volunteers.  The dashboard was to be interactive where the user could select the Test Subject ID number and the dashboard would display the results for that specific ID number.  The requested results to be displayed were:

1. Demographic Information
2. Bar chart of the top 10 bacteria cultures found
3. Indicator chart of belly button washing frequency
4. Bubble chart of bacteria cultures per sample

## Resources
Data Source: samples.json
Software: VS Code, Javascript (ECMAScript 6), Plotly, Bootstrap, d3, HTML

## Results
Creating the belly button bacteria dashboard was completed in seven major steps as follows.  

1. The first step in creating the dashboard was to create a basic html page containing a jumbotron for the title, a well where the Test Subject ID number would be selected, a panel for the demographic information to be displayed and 3 graphs to display the data.  Bootstrap was used as a stylesheet to help format the html page and d3, plotly and samples.json were included as script tags to read the data.

   One important note about the HTML file is that in order to select the correct dataset when a Test Subject ID No. is chosen, the html `onchange` code calls the JavaScript function `optionChanged()`.  The argument for the `optionChanged()` function is set as `this.value` in the html code, meaning that the new ID number that is selected from the drowdown menu, now becomes the new argument for the JavaScript function.  See the code below.

   ```html
        <h4>Test Subject<br>ID No.:</h4>
        <!-- <select id="selDataset"></select> -->
        <select id="selDataset" style="color: black"; onchange="optionChanged(this.value)"></select>
   ```

2. The second step of creating the dashboard was to write a function to initialize the dashboard as shown below.  The variable `selector` was assigned to the html element with an id equal to "selDataset" to grab a reference to the dropdown select element.  The samples.json file was then read and assigned the variable `data`.  From `data`, the names array was assigned to the variable `sampleNames` and for each sample name, a dropdown menu option wass appended to the html code,  with the sample ID assigned as the "text" and the "value" property.  The first sample from the list was then used to build the initial plots and the dashboard was initialized.

   ```js
      function init() {
        // Grab a reference to the dropdown select element
        var selector = d3.select("#selDataset");

        // Use the list of sample names to populate the select options
        d3.json("samples.json").then((data) => {
          var sampleNames = data.names;

        sampleNames.forEach((sample) => {
          selector
            .append("option")
            .text(sample)
            .property("value", sample);
        });

        // Use the first sample from the list to build the initial plots
        var firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
      });
    }

    // Initialize the dashboard
    init();

   ```
   
3.  The third step of creating the dashboard was to write a function to define what happens when a different Test Subject ID is selected from the dropdown menu.  This was done using the `optionChanged()` function to take in the `newSample` argument and build the metaData and Charts using functions that are defined later.
   
      ```js
      function optionChanged(newSample) {
         // Fetch new data each time a new sample is selected
         buildMetadata(newSample);
         buildCharts(newSample);  
      }
      ```
  
4. The fourth step of creating the dashboard was to create the demographics panel that would display the general information about each test subject.  Again, a function was written to take in the argument of the Test Subject ID number and read the json file.  The metadata array from the data file was assigned the variable `metadata` and filtered for the desired sample number.  The panel with an id equal to `sample-metadata` was then selected from the html file and assigned to the variable `PANEL`.  The panel data was cleared and then the data array for the sample number was iterated through to display each key and value as a new h6 tag on the PANEL in the html file.
 
   ```js
   // Demographics Panel 
   function buildMetadata(sample) {
      d3.json("samples.json").then((data) => {
         var metadata = data.metadata;
         // Filter the data for the object with the desired sample number
         var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
         var result = resultArray[0];
         // Use d3 to select the panel with id of `#sample-metadata`
         var PANEL = d3.select("#sample-metadata");

         // Use `.html("") to clear any existing metadata
         PANEL.html("");

         // Use `Object.entries` to add each key and value pair to the panel
         // Hint: Inside the loop, you will need to use d3 to append new
         // tags for each key-value in the metadata.
         Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
         });
      });
     }
     ```
  
5. The fifth step of creating the dashboard was to create a function to build each of the charts.


## Summary
