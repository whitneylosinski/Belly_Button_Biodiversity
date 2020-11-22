function init() {
    // Select the dropdown menu and assign it a variable
    var selector = d3.select("#selDataset");
  
    // Read the data from the JSON file
    d3.json("samples.json").then((data) => {
      // Assing a variable to the "names" array (containing ID numbers)
      var sampleNames = data.names;

      // Cycle through each element of the "names" array
      sampleNames.forEach((sample) => {
        selector
          // Append a dropdown menu option for each element of the array (ID number)
          .append("option")
          // Assign the ID number as the text of each dropdown option
          .text(sample)
          // Assign the ID number as the value of each dropdown option
          .property("value", sample);
      });
  });
}
  
// Initialize the dashboard
init();

// Take in new argument and log to the browser console
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
//  buildCharts(newSample);
}

// Demographics Panel
function buildMetadata(sample) {
  // Read the data from the JSON file
  d3.json("samples.json").then((data) => {
    // Assign the metadata array in the dataset to a variable
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    // Assign the first item in the array as "result"
    var result = resultArray[0];
    // Use d3 to select the panel with the id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");
  
    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use Object.entries to add each key and value pair to the panel
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text([`${key.toUpperCase()}: ${value}`]);
    });
  });
}