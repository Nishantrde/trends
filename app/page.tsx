'use client';

import { useEffect } from 'react';
import { select } from 'd3-selection';
import { geoPath, geoEquirectangular } from 'd3-geo';
import { json } from 'd3-fetch';
import { zoom } from 'd3-zoom';


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
    const width = window.innerWidth; 
    const height = window.innerHeight;
    const svg = select("#content")
    const g = select("#content g.map");
    const extent: [[number, number], [number, number]] = [[0, 0], [width, height]];
    const projection = geoEquirectangular()
      .scale(300)
      .translate([width/2, height/2]);

    const geoGenerator = geoPath()
      .projection(projection);
    
    svg.call(zoom()
    .scaleExtent([1 ,8])
    .extent(extent)
    .translateExtent(extent)
    .on("zoom",  (event)=> {
      g.attr("transform", event.transform)
    }))


    json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then((geojson: any) => {
        update(geojson, geoGenerator);
      });
  }, []);

  return(
    <div id="content" style={{width:'100vw', height:'100vh'}}>
      <svg width="100%" height="100%">
        <g className="map"></g>
      </svg>
    </div>
  )
}

