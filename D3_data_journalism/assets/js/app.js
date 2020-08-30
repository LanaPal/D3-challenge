// @TODO: YOUR CODE HERE!
//setting up the chart parameters
const svgWidth = 800;
const svgHeight = 400;

const margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

//creating an SVG wrapper
const svg = d3.select("#chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
  

  //reading and importing data
  d3.csv("assets/data/data.csv").then(function (healthData) {
    console.log(healthData); {
  }
  
  {
      healthData.forEach(function (data) {
          data.age =+data.age;
          data.smokes =+data.smokes;
          data.abbr =+data.abbr;
      });

    //creating scaling function
    const xLinearScale = d3.scaleLinear()
      .domain([19, d3.max(healthData, d => d.age)])
      .range([0, width]);

    const yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(healthData, d => d.smokes)])
      .range([height, 0])

      //creating axix functions 
      const bottomAxis = d3.axisBottom(xLinearScale);
      const leftAxis = d3.axisLeft(yLinearScale);

      //append axes to the chart
      chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

      chartGroup.append("g")
        .call(leftAxis);

    //creating circles
    const circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "15")
    .attr("fill", "blue")
    .text(function(d){return d.age},"yellow")
    .attr("opacity", ".5");

    //create labels
    // Create axes labels
  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 40)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .attr("class", "axisText")
  .text("Age");

  //create y labels
chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
  .attr("class", "axisText")
  .text("Smokes");
}}).catch(function (error) {
console.log(error);
});