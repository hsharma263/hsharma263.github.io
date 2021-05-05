require([
    "esri/Map",
    "esri/layers/GeoJSONLayer",
    "esri/views/SceneView",
    "esri/Basemap",
    "esri/layers/TileLayer",
    "esri/widgets/Legend",
    "esri/widgets/HistogramRangeSlider",
    "esri/smartMapping/statistics/histogram",
    "esri/core/promiseUtils"],
    function(Map, GeoJSONLayer, SceneView, Basemap, TileLayer, Legend, 
      HistogramRangeSlider, histogram, promiseUtils) {
  
  // Creating map 
  
    const map = new Map({
      basemap: new Basemap({
        baseLayers: [new TileLayer({
          url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
          opacity: 0.7,
          minScale: 0
        })]
      })
    });

    const view = new SceneView({
      container: "viewDiv",
      camera: {
        position: [-96.22, 15.26, 20000000],
        heading: 0,
        tilt: 0
      },
      qualityProfile: "high",
      map: map,
      alphaCompositingEnabled: true,
      environment: {
        background: {
          type: "color",
          color: [0, 0, 0, 0]
        },
        starsEnabled: false,
        atmosphereEnabled: false
      },
      highlightOptions: {
        fillOpacity: 0,
        color: "#ffffff"
      },
      constraints: {
        altitude: {
          min: 400000
        }
      }
    });
  
  
    // Get data from USGS feed
  
    // const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson";
    const url =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
  
    const earthquakesLayer = new GeoJSONLayer({
      url: url,
      copyright: "USGS Earthquakes",
      screenSizePerspectiveEnabled: false,
      title: "Global Earthquakes in the past 30 days",
      popupTemplate: {
        title: "Earthquake Info",
        content: "Magnitude <b>{mag}</b> {type}. <br> <b>{place}</b> <br> <b>{time}</b>",
        fieldInfos: [
          {
            fieldName: "time",
            format: {
              dateFormat: "short-date-short-time"
            }
          }
        ]
      }
    });
    map.add(earthquakesLayer);
    
    const statDefinitions = [{
      onStatisticField:
        "CASE WHEN mag < 5.0 THEN 1 ELSE 0 END",
      outStatisticFieldName: "minor",
      statisticType: "sum"
    }, {
      onStatisticField:
        "CASE WHEN mag < 7.0 AND mag >= 5.0 THEN 1 ELSE 0 END",
      outStatisticFieldName: "medium",
      statisticType: "sum"
    }, {
      onStatisticField:
        "CASE WHEN mag >= 7.0 THEN 1 ELSE 0 END",
      outStatisticFieldName: "major",
      statisticType: "sum"
    }, {
      onStatisticField: "mag",
      outStatisticFieldName: "total",
      statisticType: "count"
    }];
  
  
    const lowRiskSymbolLayer = {
      type: "icon",
      resource: { primitive: "circle"},
      material: { color: "#33FF3F" },
      size: 3
    };

    const mediumRiskSymbolLayer = {
      type: "icon",
      resource: { primitive: "circle"},
      material: { color: "#0F930D" },
      size: 3
    };

    const highRiskSymbolLayer = {
      type: "icon",
      resource: { primitive: "circle"},
      material: { color: "#B90AE0" },
      size: 3
    };

    const severeRiskSymbolLayer = {
      type: "icon",
      resource: { primitive: "circle"},
      material: { color: "#FB0000" },
      size: 3
    };
  
    const secondSymbolLayer = {
      type: "icon",
      resource: { primitive: "circle"},
      material: { color: [245, 116, 73, 0] },
      outline: {color: "#000000", size: 1},
      size: 20
    };
  
    const thirdSymbolLayer = {
      type: "icon",
      resource: { primitive: "circle"},
      material: { color: [245, 116, 73, 0] },
      outline: {color: [245, 116, 73, 0.5], size: 1},
      size: 40
    };
  
    earthquakesLayer.queryFeatures({where: "1=1", outStatistics: statDefinitions})
      .then(function(result){
        statResults = result.features[0].attributes;
        const renderer = {
          type: "class-breaks",
          field: "mag",
          legendOptions: {
            title: "Legend"
          },
          classBreakInfos: [{
            minValue: -2,
            maxValue: 2,
            symbol: {
              type: "point-3d",
              symbolLayers: [lowRiskSymbolLayer]
            },
            label: annotate(statResults.minor) + " lower than 2. These are not usually felt, but can be detected. There are estimated to be around 900,000 per year."
          },{
            minValue: 2,
            maxValue: 5,
            symbol: {
              type: "point-3d",
              symbolLayers: [mediumRiskSymbolLayer]
            },
            label: annotate(statResults.minor) + " between 2 and 5. These are felt, but only cause minor damage. Estimated 30,000 per year "
          }, {
            minValue: 5,
            maxValue: 7,
            symbol: {
              type: "point-3d",
              symbolLayers: [highRiskSymbolLayer, secondSymbolLayer]
            },
            label: annotate(statResults.medium) + " between 5 and 7. They can damage buildings and other structures in populated areas. Estimated 600 per year"
          },
            {
            minValue: 7,
            maxValue: 10,
            symbol: {
              type: "point-3d",
              symbolLayers: [severeRiskSymbolLayer, secondSymbolLayer, thirdSymbolLayer]
            },
            label: annotate(statResults.major) + " larger than 7. These cause serious damage and can destroy communities. Estimated to occur once in every 5 to 10 years."
          }]
        }
        earthquakesLayer.renderer = renderer;
      });
  
      function annotate(no) {
        if (no && no !== 0) {
          if (no === 1) {
            return "1 earthquake";
          }
          return no.toString() + " earthquakes";
        }
        return "0 earthquakes";
      }
  
//  Histogram Slider
  
    view.whenLayerView(earthquakesLayer).then(function(layerView) {
      const min = -2;
      const max = 10;
      histogram({
        layer: earthquakesLayer,
        field: "mag",
        numBins: 40,
        minValue: min,
        maxValue: max
      }).then(function(histogramResponse) {
        const slider = new HistogramRangeSlider({
          bins: histogramResponse.bins,
          min: min,
          max: max,
          values: [min, max],
          includedBarColor: [245, 116, 73],
          excludedBarColor: [200, 200, 200],
          rangeType: "between",
          container: document.getElementById("histogram")
        });
  
        slider.on(["thumb-change", "thumb-drag", "segment-drag"], function() {
          filterByHistogramRange().catch(function(error) {
            if (error.name !== "AbortError") {
              console.error(error);
            }
          });
        });
  
        const filterByHistogramRange = promiseUtils.debounce(function() {
          const filterClause = slider.generateWhereClause("mag");
          layerView.filter = {
            where: filterClause
          };
          return updateHistogramCount(filterClause, slider.values);
        });
  
        updateHistogramCount("1=1", [min, max]);
      })
      .catch(console.error);
    });
  
    function updateHistogramCount(clause, values) {
      const query = earthquakesLayer.createQuery();
      query.where = clause;
      query.outStatistics = statDefinitions;
      return earthquakesLayer.queryFeatures(query)
        .then(function(result){
          document.getElementById("histCount").innerHTML = annotate(result.features[0].attributes.total) + " with magnitude between " + transform(values[0]) + " and " + transform(values[1]);
        });
    }
  
    function transform(number) {
      return (Math.round(number * 100)/100).toString();
    }
  
    const sidePanelInfo = document.getElementById("sidePanelInfo");
    view.ui.add(sidePanelInfo, "top-right");
  
    new Legend({
      view: view,
      container: document.getElementById("legend")
    });
  });