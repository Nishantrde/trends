'use client';

import { useEffect } from 'react';
import { select } from 'd3-selection';
import { geoPath, geoEquirectangular } from 'd3-geo';
import { json } from 'd3-fetch';

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
    const geojson = json('https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json')
    .then((geojson: any) => {
        update(geojson, geoGenerator);
      });
    const width = window.innerWidth;
    const height = window.innerHeight;

    const projection = geoEquirectangular()
      .scale(300)
      .translate([width/2, height/2]);

    const geoGenerator = geoPath()
      .projection(projection);

    update(geojson, geoGenerator);
  }, []);

  return(
    <div id="content" style={{width:'100vw', height:'100vh'}}>
      <svg width="100%" height="100%">
        <g className="map"></g>
      </svg>
    </div>
  )
}
