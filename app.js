
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
  console.log ('dateNumerical',dateNumerical);
  console.log ('data',d);
  return dateNumerical;
  };

const doUpdate = () => {
  const inputValue = d3.event ? d3.event.target.value : '1967';
  console.log ('inputValue',inputValue);

  const thisYearData = birthData.filter( d=>
    d.year == inputValue
  );
  if (!Object.keys(thisYearData).length)
    console.log ('Warning! thisYearData is empty');

  const arcs = d3.pie()
    .value (d => d.births)
    .sort ((a,b) => keyByMonth(a)-keyByMonth(b))
    (thisYearData);

  console.log('arcs:',arcs);

  const path = d3.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);
  console.log('path from arc:',path);

  const fill = (d,i) =>
    (d.data.births)%2? '#19cccc'
    : '#e54c85'

  const piePaths = d3.select ("#pie")
      .selectAll("path")

  console.log('paths:',piePaths);
  console.log('updated:',  piePaths
    .data (arcs,keyByMonth));
  console.log('exit:',  piePaths
    .data (arcs,keyByMonth)
    .exit());
  piePaths
    .data (arcs,keyByMonth)
    .exit()
    .remove();
  console.log('paths again:',piePaths);

// if (d3.event == null)
  piePaths
    .data (arcs)
    .enter()
    .append ("path")
      .attr ("stroke-fill",'blue')
      .attr ("transform",translation)
      .attr ("fill", fill)
      .attr ("d",path)

  console.log('paths again again:',piePaths);
}


d3.select("input")
    .property("min", minYear)
    .property("max", maxYear)
    .property("value", minYear)
    .on("change", doUpdate)
;

doUpdate();
