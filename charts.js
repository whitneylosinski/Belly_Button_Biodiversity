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

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

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

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample); 
    //  5. Create a variable that holds the first sample in the samples array.
    var Result = resultArray[0];
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuID = Result.otu_ids;
    var otuLabel = Result.otu_labels;
    var sampleValue = Result.sample_values.map((value) => parseInt(value));
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var yticks = otuID.slice(0,10).map((id) => "OTU " + id).reverse();
   
    // 8. Create the trace for the bar chart. 
    var barData = {
      x: sampleValue.slice(0,10).reverse(),
      y: yticks,
      hovertemplate: otuLabel,
      type: "bar",
      orientation: "h",
      backgroundColor: "rgb(192, 189, 189)"
    };
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: {
        text: "<b>Top 10 Bacteria Cultures Found</b>",
        y: 0.90
      },
      width: 425,
      margin: {
        l: 150,
        r: 35,
        b: 50,
        t: 75,
        pad: 50
      },
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", [barData], barLayout);

// ---------------------------------------------------------------------------------------


    // 1. Create the trace for the bubble chart.
    var bubbleData = {
      x: otuID,
      y: sampleValue,
      type: "bubble",
      text: otuLabel,
      hoverinfo: "x+y+text",
      mode: "markers",
      marker: {size: sampleValue, color: otuID, colorscale: "Earth"}
    };

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: {
        text: "<b>Bacteria Cultures Per Sample</b>",
        y:0.95,
      },
      xaxis: {title: "OTU ID"},
      margin: {
        l: 75,
        r: 50,
        b: 60,
        t: 60,
        pad: 10
      },
      hovermode: "closest"
      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", [bubbleData], bubbleLayout);

    //-----------------------------------------------------------------------------------
    // Create a variable that holds the metadata array.
    var metadata = data.metadata;

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);

    // 2. Create a variable that holds the first sample in the metadata array.
    var Result = resultArray[0];

    // 3. Create a variable that holds the washing frequency.
    var wFreq = parseFloat(Result.wfreq);
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = {
      type: "indicator",
      value: wFreq,
      mode: "gauge+number",
      gauge: {
        axis: {range: [0,10], dtick: 2},
        bar: {color: "black"},
        steps: [
          {range: [0,2], color: "red"},
          {range: [2,4], color: "orange"},
          {range: [4,6], color: "yellow"},
          {range: [6,8], color: "yellowgreen"},
          {range: [8,10], color: "green"}
        ],
      }
    };
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      title: {
        text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
        y: 0.75,
      },
      margin: {
        l: 50,
        r: 50,
        b: 0,
        t: 50,
        pad: 50
      },
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", [gaugeData], gaugeLayout);
  });
}
