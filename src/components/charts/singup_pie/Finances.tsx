import React from "react";
import { CChart } from "@coreui/react-chartjs";
import { School } from "../../cards/schools";


const Finances = () => {
  const [schools, setSchools] = React.useState<School[]>([]);
 

  React.useEffect(() => {
    fetch("https://zeraki-api.onrender.com/schools")
      .then((res) => res.json())
      .then((data) => setSchools(data));
  }, []);

   const primaryData =(product:string)=> schools.filter(
    (school) => school.type === "Primary" && school.product === product
  ).length;

  const secondaryData =(product:string)=> schools.filter(
    (school) => school.type === "Secondary" && school.product === product
  ).length;

  const igcseData = (product:string)=>schools.filter(
    (school) => school.type === "IGCSE" && school.product === product
  ).length;
  
  return (
<CChart
  type="pie"
  className=" h-[35vh] flex flex-row justify-center"
  data={{
    labels: ['Primary', 'Secondary', 'IGCSE'],
    datasets: [
      {
        backgroundColor: ['#2ea5de', '#43ab49', '#172b4c'],
        data: [primaryData("Zeraki Finance"),secondaryData("Zeraki Finance"),igcseData("Zeraki Finance")],
      },
    ],
  }}
  options={{
    plugins: {
      tooltip:{
        position:"average",
        xAlign:"right",
        yAlign:"top",
        mode:"y",
        footerColor:"#172b4c"
      },
      legend: {
        labels: {
          color: "black",
          
          
        }
      }
    },
  }}
/>
  );
};

export default Finances;
