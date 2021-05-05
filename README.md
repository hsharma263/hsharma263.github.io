# Project2
In this project we have used the USGS Earthquake Live Feed to examine different aspects of earthquakes. Initially, we wanted to create a map to visualize the recent earthquakes. We started by using Leaflet, but after searching on the web, we were able to find an interesting 3D globe and implement our code with ArcGIS API for Javascript. Additionally, we wanted to look at some of the relationships between the magnitude of the earthquakes, and the depth at which they occur. However, the results were rather inconclusive, as the depth varies greatly, while the magnitude is in a rather limited range. Additionally, as we were cleaning and going through our data, we came across a "magnitude type" column. There were a variety of different datapoints here, however there were some much more prevalent than others, and we decided to investigate this. 


While we try and use the Live Feeds for most of our visualizations, some needed the data to be cleaned and so, we downloaded a static file of the previous 30 days of earthquake data, cleaned this, and implemented it for our Flask app and other functions. 

We utilized ApexCharts Javascript Library to create the line chart for depth vs magnitude and we used AmCharts Javascript Library to create our chart of the different magnitude types. 

Presentation Deck -
https://docs.google.com/presentation/d/1aF8i48OPGWfRhniaUI-A6yTcmXMikzgWf4jByHAC2t8/edit#slide=id.p

Coding Approach -
![image](https://user-images.githubusercontent.com/71988949/116790320-18df8a80-aa79-11eb-94c1-25dccc13e247.png)
