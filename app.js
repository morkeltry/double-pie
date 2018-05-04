
const minYear = d3.min (birthData, d=>d.year);
const maxYear = d3.max (birthData, d=>d.year);
const outerRadius = 350;
const innerRadius = 100;
const translation = `translate (${outerRadius+100},${outerRadius+100})`;

const keyByMonth = (d,idx) => {
  let months = ['','January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  let month = months.indexOf(d.month);
  let dateNumerical = d.year*100+month
  return dateNumerical;
};

const keyByRandom = (d,idx) => {
  return Math.floor (Math.random()*12)
};

const doUpdate = () => {
  const inputValue = d3.event ? d3.event.target.value : '1967';
  // console.log ('inputValue',inputValue);

  const thisYearData = birthData.filter( d=>
    d.year == inputValue
  );
  if (!Object.keys(thisYearData).length)
    console.log ('Warning! thisYearData is empty');

  const arcs = d3.pie()
    .value (d => d.births)
    .sort ((a,b) => keyByMonth(a)-keyByMonth(b))
    (thisYearData);

  const path = d3.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);

  const fill = (d,i) =>
    (keyByMonth(d.data))%2? '#19cccc'
    : '#e54c85'

  const piePaths = d3.select ("#pie")
      .selectAll("path")
        .data (arcs)

        //This VV part of the line caused paths bloat. Why was it in there?
        // , d=>keyByMonth(d.data))

  piePaths
    .enter()
    .append ("path")
      .attr ("id",  d=>keyByMonth(d.data))
      .attr ("stroke-fill",'blue')
      .attr ("transform",translation)
      .attr ("fill", fill)
      .attr ("d",path)

    .merge (piePaths)
      .attr ("d",path);
}


d3.select("input")
    .property("min", minYear)
    .property("max", maxYear)
    .property("value", minYear)
    .on("change", doUpdate)
;

doUpdate();
