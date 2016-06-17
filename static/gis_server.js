var flag = 1;
var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};
var map = L.map('map').setView([58.05418,56.22439], 17);

var line_way = L.polyline([
    [3.05569, 56.21787],
    [3.055, 56.22627]],
    {
        color: "#ff7800",
        weight: 5,
        opacity: 0.65
    }
    ).addTo(map);

var custom_way = L.polyline([
    ],
    {
        color: "red",
        weight: 5,
        opacity: 0.65
    }
    ).addTo(map);

    //L.geoJson(myLines, {
                    //	style: myStyle
                    //}).addTo(map);
var popup = L.popup();
var marker = L.marker([-53, -100]).addTo(map);
get_loc();

L.easyButton( '<span class="star">&neArr;</span>', function(btn, map)
{
    url = "/GIS/send/way";
    xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.send(JSON.stringify(custom_way.toGeoJSON()));

    //xhr.send(custom_way.toGeoJSON());
    xhr.onreadystatechange = function()
    {
        var loading = document.getElementById ( "wait" );
        var msg = document.getElementById ( "msg" );
        if ( xhr.readyState <= 3 )
            loading.style.visibility = "visible";
            window.setTimeout(function(){ loading.style.visibility = "hidden"; }, 3000);
            msg.style.visibility = "visible";
            window.setTimeout(function(){ msg.style.visibility = "hidden"; }, 3000);
            console.log('visible')
        if (xhr.readyState == 4)
        {
            if (xmlhttp.status == 200)
            {
                xhr.onloadend = function ()
                {
                    // done
                };
                document.getElementById("msg").innerHTML = xhr.responseText;
                loading.style.visibility = "hidden";
                //window.setTimeout(function(){ loading.style.visibility = "hidden"; }, 3000);
                window.setTimeout(function(){ msg.style.visibility = "hidden"; }, 3000);

                line_way = line_way.setLatLngs(custom_way.getLatLngs());
                custom_way = custom_way.setLatLngs([]);
                flag = 1;

            }
            else
            {
                //
            }
        }
    }
}).addTo(map);//building way button

L.easyButton( '<span class="star">&xopf;</span>', function(btn, map){
  //new L.latLng(myLines.geometry.coordinates[index][1], myLines.geometry.coordinates[index][0]);
  custom_way = custom_way.setLatLngs([]);
  flag = 1;
}).addTo(map);

L.tileLayer('TileGenPerm/{z}/{x}/{y}.png', {
    maxZoom: 17,
    minZoom: 13
}).addTo(map);

/*var CorPol = [[[58.05472, 56.21368],[58.05476, 56.21471], [58.05186, 56.21373], [58.05238, 56.21282], [58.05472, 56.21368]],
[[58.05459, 56.2151],[58.05197, 56.21427], [58.05187, 56.21451], [58.05187, 56.21732], [58.05231, 56.21732], [58.05253, 56.21764], [58.05505, 56.21734], [58.05488, 56.2162], [58.05463, 56.21615], [58.05459, 56.2151]],
[[58.05253, 56.21764], [58.05505, 56.21734], [58.05561, 56.2177], [58.0554, 56.21995], [58.05491, 56.21981], [58.05262, 56.21858], [58.05253, 56.21764]],
[[58.05539, 56.21996], [58.05488, 56.21981], [58.05262, 56.21858], [58.05238, 56.2186], [58.05238, 56.21839], [58.05183, 56.21851], [58.05182, 56.22251], [58.05517, 56.22235], [58.05539, 56.21996]],
[[58.05481, 56.22238], [58.05521, 56.22233], [58.05491, 56.22573], [58.05479, 56.22571], [58.05479, 56.22467], [58.05363, 56.22464], [58.05363, 56.2242], [58.05481, 56.22418], [58.0548, 56.22241], [58.05481, 56.22238]],
[[58.05363, 56.2242], [58.05481, 56.22418], [58.0548, 56.22241], 58.05362, 56.22244, [58.05363, 56.2242], [58.05363, 56.2242]]
];*/

var CorPol = [[[58.05472, 56.21368],[58.05476, 56.21471], [58.05186, 56.21373], [58.05238, 56.21282], [58.05472, 56.21368]],
[[58.05459, 56.2151],[58.05197, 56.21427], [58.05187, 56.21451], [58.05187, 56.21732], [58.05231, 56.21732], [58.05253, 56.21764], [58.05505, 56.21734], [58.05488, 56.2162], [58.05463, 56.21615], [58.05459, 56.2151]],
[[58.05253, 56.21764], [58.05505, 56.21734], [58.05561, 56.2177], [58.0554, 56.21995], [58.05491, 56.21981], [58.05262, 56.21858], [58.05253, 56.21764]],
[[58.05539, 56.21996], [58.05488, 56.21981], [58.05262, 56.21858], [58.05238, 56.2186], [58.05238, 56.21839], [58.05183, 56.21851], [58.05182, 56.22251], [58.05517, 56.22235], [58.05539, 56.21996]],
[[58.05481, 56.22238], [58.05521, 56.22233], [58.05491, 56.22573], [58.05479, 56.22571], [58.05479, 56.22467], [58.05363, 56.22464], [58.05363, 56.2242], [58.05481, 56.22418], [58.0548, 56.22241], [58.05481, 56.22238]],
[[58.05363, 56.2242], [58.05481, 56.22418], [58.0548, 56.22241], [58.05362, 56.22244], [58.05363, 56.2242]],
[[58.05182, 56.22253], [58.05362, 56.22243], [58.05356, 56.22585], [58.05345, 56.22613], [58.05266, 56.22613], [58.05224, 56.22642], [58.05183, 56.22529], [58.05182, 56.22253]],
];

var statesData = {"type":"FeatureCollection","features":[
{"type":"Feature","id":"01","properties":{"name":"Alabama","density":1},"geometry":{"type":"Polygon","coordinates":[[ [56.21368, 58.05472],[56.21471, 58.05476], [56.21373, 58.05186], [56.21282, 58.05238], [56.21368, 58.05472] ]]}},
{"type":"Feature","id":"02","properties":{"name":"Alabama","density":2},"geometry":{"type":"Polygon","coordinates":[[ [56.2151, 58.05459],[56.21427, 58.05197], [56.21451, 58.05187], [56.21732, 58.05187], [56.21732, 58.05231], [56.21764, 58.05253], [56.21734, 58.05505], [56.2162, 58.05488], [56.21615, 58.05463], [56.2151, 58.05459] ]]}},
{"type":"Feature","id":"03","properties":{"name":"Alabama","density":3},"geometry":{"type":"Polygon","coordinates":[[ [56.21764, 58.05253], [56.21734, 58.05505], [56.2177, 58.05561], [56.21995, 58.0554], [56.21981, 58.05491], [56.21858, 58.05262], [56.21764, 58.05253]]]}},
{"type":"Feature","id":"04","properties":{"name":"Alabama","density":1},"geometry":{"type":"Polygon","coordinates":[[ [56.21996, 58.05539], [56.21981, 58.05488], [56.21858, 58.05262], [56.2186, 58.05238], [56.21839, 58.05238], [56.21851, 58.05183], [56.22251, 58.05182], [56.22235, 58.05517], [56.21996, 58.05539]]]}},
{"type":"Feature","id":"05","properties":{"name":"Alabama","density":2},"geometry":{"type":"Polygon","coordinates":[[ [56.22238, 58.05481], [56.22233, 58.05521], [56.22573, 58.05491], [56.22571, 58.05479], [56.22467, 58.05479], [56.22464, 58.05363], [56.2242, 58.05363], [56.22418, 58.05481], [56.22241, 58.0548], [56.22238, 58.05481]]]}},
{"type":"Feature","id":"06","properties":{"name":"Alabama","density":3},"geometry":{"type":"Polygon","coordinates":[[ [56.2242, 58.05363], [56.22418, 58.05481], [56.22241, 58.0548], [56.22244, 58.05362], [56.2242, 58.05363]]]}},
{"type":"Feature","id":"07","properties":{"name":"Alabama","density":3},"geometry":{"type":"Polygon","coordinates":[[ [56.22253, 58.05182], [56.22243, 58.05362], [56.22585, 58.05356], [56.22613, 58.05345], [56.22613, 58.05266], [56.22642, 58.05224], [56.22529, 58.05183], [56.22253, 58.05182]]]}},
]};


var states = {
    "type":"Feature",
   "properties": {"party": "dd"},
   "geometry": {
       "type": "Polygon",
       "coordinates": [[
           [58.05472, 56.21368], [58.05476, 56.21471], [58.05186, 56.21373], [58.05238, 56.21282],
           [58.05472, 56.21368]
       ]]
   }
};
console.log(statesData);
L.geoJson(statesData).addTo(map);
//L.polygon(CorPol).addTo(map);

/*var PolygonData = {"type":"FeatureCollection","features":[
{"type":"Feature","id":"01","properties":{"name":"Alabama","density":94.65},"geometry":{"type":"Polygon","coordinates":[[  [58.05465, 56.21698],[58.05408, 56.21618], [58.05373, 56.21683], [58.0537, 56.21764], [58.05423, 56.21822], [58.05465, 56.21698]   ]]}},
{"type":"Feature","id":"02","properties":{"name":"Alaska","density":1.264},"geometry":{"type":"MultiPolygon","coordinates":[[[   [58.05465, 56.21698],[58.05408, 56.21618], [58.05373, 56.21683], [58.0537, 56.21764], [58.05423, 56.21822], [58.05465, 56.21698]  ]]]}}
]};
L.geoJson(PolygonData).addTo(map);
console.log(PolygonData);
*/

function get_loc() {
    xmlhttp = new XMLHttpRequest();
    try
    {
        xmlhttp.open("GET", "/GIS/get/current_loc");
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4)
            {
                if (xmlhttp.status == 200)
                {
                    console.log("xmlhttp.readyState == 4");
                    //var marker = L.marker([lat,lng]).addTo(map);
                    //console.log(xmlhttp.responseText)
                    geojsonFeature = JSON.parse(xmlhttp.responseText);
                    //console.log(geojsonFeature)
                    //L.marker([51.5, -0.09]).addTo(map)

                    //x = L.geoJson(geojsonFeature).addTo(map);
                    //console.log(geojsonFeature.geometry.coordinates[0], geojsonFeature.geometry.coordinates[1]);
                    //console.log(geojsonFeature['coordinates'][0]);
                    //marker.setLatLng(L.geoJson(geojsonFeature));
                    cur_loc = new L.LatLng(geojsonFeature.geometry.coordinates[1], geojsonFeature.geometry.coordinates[0]);
                    //console.log(cur_loc)

                    marker.setLatLng(cur_loc);
                }
                else
                {
                    //delete marker
                }
            }
        }

        xmlhttp.send(null);
    }
    catch (e)
    {
        //delete marker
    }
}

function get_way()
{
    xmlhttp = new XMLHttpRequest();
    try
    {
        xmlhttp.open("GET", "/GIS/get/way");
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4)
            {
                if (xmlhttp.status == 200)
                {
                    myLines = JSON.parse(xmlhttp.responseText);
                    //L.geoJson(myLines, {
                    //	style: myStyle
                    //}).addTo(map);

                    ///set line
                    //console.log(myLines.geometry.coordinates)
                    var Arr1 = myLines.geometry.coordinates

                    var LtLnArray = new Array(Arr1.length);
                    var index = 0;
                    //console.log(myLines)
                    while(index < LtLnArray.length){
                        LtLnArray[index] = new L.latLng(myLines.geometry.coordinates[index][1], myLines.geometry.coordinates[index][0]);
                        //console.log(LtLnArray[index])
                        index++;
                    }
                    //console.log(LtLnArray);
                    //latlng_way = new L.latLng(myLines.geometry.coordinates);
                    //console.log(latlng_way)
                    //console.log('DO')
                    //console.log(line_way);
                    line_way = line_way.setLatLngs(LtLnArray);
                    //console.log('POSLE')
                    //console.log(line_way);
                }

                else
                {
                    //delete marker
                }
            }
        }
        xmlhttp.send(null);
    }

    catch (e)
    {
        //delete marker
    }
}

var timer_loc = window.setInterval("get_loc();", 3000);
var timer_way = window.setInterval("get_way();", 5000);

function cust_way(){
    if(flag == 1){
        get_loc();
        custom_way.addLatLng(marker.getLatLng());
        //custom_way.setLatLngs(marker.getLatLng());
        console.log(flag)
        flag = 0
        console.log(flag)
    }
}

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("New way point " + e.latlng.toString())
        .openOn(map);
        console.log(e);
    cust_way();
    custom_way.addLatLng(e.latlng);
}



map.on('click', onMapClick);