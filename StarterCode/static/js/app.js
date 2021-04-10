const path = "../../data/samples.json";

function make_plots(subject){
    d3.json(path).then((data) => {
        var data_array = data
        .samples
        .filter(subjects => {
          return subjects.id == subject
        });
        
        var result = data_array[0];

        var bar_otu_ids = result.otu_ids.slice(0,10).map(id_num => {
            return "OTU " + id_num;
        }).reverse();

        var sample_values = result.sample_values;
        var otu_labels = result.otu_labels;

        var bar_values = sample_values.slice(0, 10).reverse();
        var bar_labels = otu_labels.slice(0, 10).reverse();


        var bar_trace = [{
            x: bar_values,  
            y: bar_otu_ids,
            text: bar_labels,
            type: 'bar',
            orientation: 'h'
        }];
    
        var bar_layout = {
            title: "Top 10 OTUs",
       
        };
        Plotly.newPlot("bar", bar_trace, bar_layout)
        
        
        var otu_ids = result.otu_ids.map(id_num => {
            return id_num;
        })
        var bubble_trace = {
            x: otu_ids,  
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
              color: otu_ids,
              size: sample_values
            }
        };
      
        var bubble_layout = {
            xaxis: {
                title: "OTU ID"
            }
        };
            
        Plotly.newPlot("bubble", [bubble_trace], bubble_layout)
    });
};

function metadata(subject) {
    d3.json(path).then((data) => {
        var metadata = data.metadata;
        var data_array = metadata.filter(subjects => subjects.id == subject);
        var result = data_array[0];
        var demo_data = d3.select("#sample-metadata");

        demo_data.html("");
      
        Object.entries(result).forEach(([key, value]) => {
            demo_data.append("h6").text(key + ': ' + value); 
        })
    });
};

function optionChanged(new_subject) {
    metadata(new_subject);
    make_plots(new_subject);
};

function init() {
    var subject_selector = d3.select("#selDataset");
          
    d3.json(path).then((data) => {
        console.log(data);
        var names = data.names;
        names.forEach((subject) => {
            subject_selector
                .append("option")
                .text(subject)
                .property("value", subject);
        });
    })
};

init();


