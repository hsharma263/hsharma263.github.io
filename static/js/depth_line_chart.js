var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
// var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
// var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
// var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";


d3.json(url).then(function(data){
 
    magnitudes(data.features);
    console.log(data.features)
    console.log(data.features[0].properties.mag);
});

function magnitudes(earthquakeData){
    var magnitude_data = [];
    var depth_data = []
    var date_array = [];
    console.log("EarthquakeData", earthquakeData[0]);
    for (var i = 0; i < earthquakeData.length; i++) {
        magnitude_data.push(Math.round((earthquakeData[i].properties.mag) * 100) / 100)
        depth_data.push((earthquakeData[i].geometry.coordinates[2]) / 10)
        
        var timestamp = earthquakeData[i].properties.time;
        var convertedDate = new Date(timestamp);

        var day = convertedDate.getDate();
        var month =  convertedDate.getMonth() + 1;
        var year = convertedDate.getFullYear();
        var hours = convertedDate.getHours();
        var minutes = "0" + convertedDate.getMinutes();
        var seconds = "0" + convertedDate.getSeconds();
        var formattedTime = day + "/" + month + "/" + year + ":" + hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
        
        date_array.push(formattedTime);
    }
   
    var options = {
   
    series: [{
        name: 'Magnitude',
        data: magnitude_data
      }, {
        name: 'Depth (km, x10)',
        data: depth_data
      }],
        chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        // type: 'datetime',
        categories: date_array
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm:ss'
        },
      },
      title: {
        text: "Magnitude vs Depth of Earthquakes in the Past Week"
      }
      };

      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
}

