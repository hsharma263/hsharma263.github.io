am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    var chart = am4core.create("chartdiv", am4charts.SlicedChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
    
    chart.data = [{
        "name": "ml",
        "value": 6271
    }, {
        "name": "md",
        "value": 2870
    }, {
        "name": "mb",
        "value": 160
    }, {
        "name": "mww",
        "value": 22
    }, {
        "name": "mwr",
        "value": 13
    }, {
        "name": "mw",
        "value": 7
    }, {
        "name": "mb_lg",
        "value": 6
    }, {
        "name": "mh",
        "value": 2
    }, {
        "name": "mwb",
        "value": 1
    },];
    
    var series = chart.series.push(new am4charts.FunnelSeries());
    series.colors.step = 2;
    series.dataFields.value = "value";
    series.dataFields.category = "name";
    series.alignLabels = true;
    
    series.labelsContainer.paddingLeft = 15;
    series.labelsContainer.width = 200;
    
    //series.orientation = "horizontal";
    //series.bottomRatio = 1;
    
    chart.legend = new am4charts.Legend();
    chart.legend.position = "left";
    chart.legend.valign = "bottom";
    chart.legend.margin(5,5,20,5);
    
    }); // end am4core.ready()


// // GETTING OUR DATA
//     d3.json("../../Resources/Earthquakes.json").then((data)=> {

//         var arr = data.map(a => a.magtype);
      
//       function foo(arr) {
//           var a = [], b = [], prev;
          
//           arr.sort();
//           for ( var i = 0; i < arr.length; i++ ) {
//               if ( arr[i] !== prev ) {
//                   a.push(arr[i]);
//                   b.push(1);
//               } else {
//                   b[b.length-1]++;
//               }
//               prev = arr[i];
//           }
          
//           return [a, b];
//       }
      
//       var result = foo(arr);
//       document.write('[' + result[0] + ']<br>[' + result[1] + ']') 
//        });
      