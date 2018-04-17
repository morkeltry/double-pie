
const minYear = d3.min (birthData, d=>d.year);
const maxYear = d3.max (birthData, d=>d.year);
const outerRadius = 350;
const innerRadius = 100;



const doUpdate = () => {
  console.log (d3.event.target.value);

  const thisYearData = birthData.filter( d=>
    d.year == d3.event.target.value
  );

  const arcs = d3.pie()
    .value (d => d.births)
    (thisYearData);
  console.log(arcs);

  const path = d3.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);
  console.log(path);

  const piePaths = d3.select ("#pie")
      .selectAll("path")
        // .data (thisYearData);

  // piePaths
  //   .data (arcs)
  //   .exit()
  //   .remove();

  piePaths
    .data (arcs)
    .enter()
    .append ("path")
      .attr ("stroke-fill",'blue')
      .attr ("d",path)

  console.log(piePaths);
}


d3.select("input")
    .property("min", minYear)
    .property("max", maxYear)
    .property("value", minYear)
    .on("change", doUpdate)
;
