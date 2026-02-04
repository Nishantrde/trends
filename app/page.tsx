'use client';

import { useEffect } from 'react';
import { select } from 'd3-selection';
import { geoPath, geoEquirectangular } from 'd3-geo';

function update(geojson: any, geoGenerator: any) {
  let u = select('#content g.map')
    .selectAll('path')
    .data(geojson.features);

  u.enter()
    .append('path')
    .attr('d', geoGenerator);
}

export default function Home(){
  useEffect(() => {
    const geojson = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "name": "Africa"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [[[-6, 36], [33, 30], [43, 11], [51, 12], [29, -33], [18, -35], [7, 5], [-17, 14], [-6, 36]]]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Australia"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [[[143, -11], [153, -28], [144, -38], [131, -31], [116, -35], [114, -22], [136, -12], [140, -17], [143, -11]]]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Timbuktu"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [-3.0026, 16.7666]
          }
        }
      ]
    };

    const projection = geoEquirectangular()
      .scale(200)
      .translate([200, 150]);

    const geoGenerator = geoPath()
      .projection(projection);

    update(geojson, geoGenerator);
  }, []);

  return(
    <div id="content">
      <svg width="800px" height="400px">
        <g className="map"></g>
      </svg>
    </div>
  )
}