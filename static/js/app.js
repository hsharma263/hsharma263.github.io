

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // the below function will build both and Bubble and Map charts
    function buildPlot(country){
        
        d3.json("../../Resources/Earthquakes.json").then((data)=> {
            //console.log(data)

            // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            // Pull the required data for the plots

            // filter sample values by country 
            var samples = data.filter(s => s.country === country);
            // console.log(samples);

            // get sample id's
            // var sampleId = samples.slice(0, 10).map(c => (c.id))
            // console.log(sampleId);

            // get magnitude
            // var sampleMag = samples.slice(0, 10).map(c => (c.mag))
            var sampleMag = samples.map(c => (c.mag))
            // console.log(sampleMag);

            // get cities
            var sampleCity = samples.map(c => (c.city))
            // console.log(sampleCity);


            // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            // Bubble Plot

            var trace1 = {
                x: sampleCity,
                y: sampleMag,
                mode: "markers",
                marker: {
                    size: sampleMag.map(a => a*40),
                    color: [10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 240],
                    colorscale: "Earth"
                },
                text: sampleCity

            };

            // create the data variable 
            var bubble_data = [trace1];

            // set the layout for the bubble plot
            var bubble_layout = {
                title: "Countrywise Earthquakes (Cities vs Magnitudes)",
                xaxis: {
                    title: 'Affected Cities (Nearby)',
                    automargin: false
                  },
                  yaxis: {
                    title: 'Magnitudes'
                  },
                height: 600,
                width: 1000,
                font: {
                    family: 'Arial',
                    size: 15,
                    color: '#7f7f7f'
                  }
            };

            // create the bubble plot
            Plotly.newPlot("bubble", bubble_data, bubble_layout);



            // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            // Map Plot

            // get longitude
            var longitude = samples.map(c => (c.longitude))
            console.log(longitude);

            // get latitude
            var latitude = samples.map(c => (c.latitude))
            console.log(latitude);

            var data = [{
                type: "scattermapbox",
                mode: "lines",
                fill: "toself",
                lon: longitude,
                lat: latitude,
                marker: { size: 10, color: "blue" }
                }]
        
            var layout = {
                title: "Countrywise Filled Area Map For Earthquakes",
                mapbox: {style: "stamen-terrain", center: {lon: 40, lat: 20}, 'zoom': 1.5},
                showlegend: false,
                width:1000, height: 700,
                font: {
                    family: 'Arial',
                    size: 15,
                    color: '#7f7f7f'
                  }
            }
            
            Plotly.newPlot("map", data, layout)

                        
        });
    };

    // Test Run
    // buildPlot('AU');

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    

    // below function will build the Earthquake Info table
    function metadata(subject) {
        d3.json("../../Resources/Earthquakes.json").then((data) => {

            // filter sample values by country 
            var samples = data.filter(s => s.country === subject);
            // console.log(samples);

            // get only 1 country out of multiple country records
            var sampleCountry = samples.slice(0, 1)
            // console.log(sampleCountry[0]);

            // select the demo table 
            var demoTable = d3.select("#sample-metadata");
            
            // Clear the html demo table
            demoTable.html("");
            
            // attach the required fields to demo table
            Object.entries(sampleCountry[0]).forEach(([key, value]) => {
                if (key === "mindepth" || key === "maxdepth" || key === "minmag" || key === "maxmag" || key === "count" || key === "mindate" || key === "maxdate") {
                    
                    demoTable.append("h6").append("b").text(key + ': ' + value);

                }
                

            });
            
        })
    };


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    // the below function will be called once user selects any name from dropdown
    // It will inturn call child build plot function to display Bubble and Map charts
    function optionChanged(newCountry) {
        buildPlot(newCountry);
        metadata(newCountry);
    };

    
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
         

    // the below function will show all the names under dropdown
    // it will append all those names to dropdown
    // it will also display default Bubble, Map charts and Earthquake Info table for - AU
    function init() {
        
        var selectSubject = d3.select("#selDataset");
       
        d3.json("../../Resources/Earthquakes.json").then((data) => {

            var country = data[0].country;

            // Get the all countries
            var countryList = data.map(a => a.country);
            // console.log(countryList);

            // Get the Unique list
            var uniqueCountryList = Array.from(new Set(countryList));
            // console.log(uniqueCountryList);
                        
            // Append the countries to the dropdown
            uniqueCountryList.forEach((subject) => {
                // var country = data.country;
                // console.log(subject.country);
                
                selectSubject.append("option").text(subject);
            });

            // call the function to display the data and the plots for default country
            buildPlot(country);
            metadata(country);
            
        })
    };
    
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    // call the init function to display default Bubble, Map charts and Earthquake Info table for - AU
    init();





    