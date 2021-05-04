// construct and read in data
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        let metadata = data.metadata;
        let resultArr = metadata.filter(sampObject => sampObject.id == sample);
        let result = resultArr[0];
        let PANEL = d3.select("sample-metadata");
        //empty panel
        PANEL.html("");
        Object.entries(result).forEach(([key, value]) => {
            d3.select("#sample-metadata").append("h4").text(`${key}: ${value}`);
        })
    })
};

// build bar chart, define values and labels
function buildCharts(sample) {
    d3.json("samples.json").then(data => {
        let metadata = data.metadata;
        let samples = data.samples;
        let sampleArr = samples.filter(sampObject => sampObject.id == sample);
        let resultArr = metadata.filter(sampObject => sampObject.id == sample);
        console.log("sampleArr: ", sampleArr);
        let result = resultArr[0];
        // required variables in result
        let values = result.sample_values;
        let ids = result.otu_ids;
        let labels = result.otu_labels;
        
        let bardata = {
                y: ids.slice(0, 10).map(otuID => `OTU ${otuId}`).reverse(),
                x: values.slice(0, 10).reverse(),
                text: labels.slice(0, 10).reverse(),
                type:"bar",
                orientation: "h",
                marker: {
                    color: 'rgba(60,114,83,.7)',
                    width: 1
                    } 
            };

        let barlayout = {
            title: "Top 10 Operational Taxonomic Units (OTU)",
            xaxis: {title: "Bacteria Amount"},
            yaxis: {title: "Bacteria ID"},
        };

        Plotly.newPlot("bar", [bardata], barlayout);
        
    });

        //bubble Chart
        let values = result.sample_values;
        let ids = result.otu_ids;
        let result = resultArr[0]
        let labels = result.otu_labels;
        let bubbledata = 
        {
            x: ids,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
                color: ids,
                size: values,  
            },
        };

        let bubblelayout = {
            title: "Individual's Demographic Information",
            xaxis: {title: "OTU ID", gridcolor: 'rgb(200,200,200)',gridwidth: 1},
            yaxis: {gridcolor: 'rgb(200,200,200)',gridwidth: 1},
            showlegend: false,
        };

        Plotly.newPlot("bubble", [bubbledata], bubblelayout)};

// gather, filter and select sampleNames
function init() {   
            d3.json("samples.json").then((data) => {
                var sampleNames = data.names;
                sampleNames.forEach((sample) => {
            d3.select("#selDataset")
                .append("option")
                .text(sample)
                .property("value", sample);
                });
            var sample1 = sampleNames[0];
            buildCharts(sample1);
            buildMetadata(sample1);
            });
        };

// change data
function optionChanged(newSample) {
            // Fetch new data, charts and metadata
            buildCharts(newSample);
            buildMetadata(newSample);
}        
init();