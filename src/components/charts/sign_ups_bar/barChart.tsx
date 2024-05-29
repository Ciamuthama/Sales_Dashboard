import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { School } from '../../cards/schools';



export default function AnalyticsBars() {
  const [schools, setSchools] = React.useState<School[]>([]);
 

  React.useEffect(() => {
    fetch("http://localhost:8080/schools")
      .then((res) => res.json())
      .then((data) => setSchools(data));
  }, []);

  const getDataForProduct = (product: string) => {
    const primaryData = schools.filter(
      (school) => school.type === "Primary" && school.product === product
    ).length;
    const secondaryData = schools.filter(
      (school) => school.type === "Secondary" && school.product === product
    ).length;
    const igcseData = schools.filter(
      (school) => school.type === "IGCSE" && school.product === product
    ).length;
    return [primaryData, secondaryData, igcseData];
  };

  return (
    <>
    <BarChart
      width={600}
      height={400}
      series={[
        { data: getDataForProduct("Zeraki Analytics"), label: 'Zeraki Analytics', id: 'Analytics',stack:"stack1",color:"#2ea5de" },
      ]}
      xAxis={[{ data: ["Primary","Secondary","IGCSE"], scaleType: 'band' }]}
    />
    <BarChart
      width={600}
      height={400}
      series={[
        { data: getDataForProduct("Zeraki Finance"), label: 'Zeraki Finance', id: 'Finance',stack:"stack1",color:"#43ab49" },
      ]}
      xAxis={[{ data: ["Primary","Secondary","IGCSE"], scaleType: 'band' }]}
    />
    <BarChart
      width={600}
      height={400}
      series={[
        { data: getDataForProduct("Zeraki Timetable"), label: 'Zeraki Timetable', id: 'timetable',stack:"stack1", color:"#172b4c"  },
      ]}
      xAxis={[{ data: ["Primary","Secondary","IGCSE"], scaleType: 'band' }]}
    />
    </>
  );
}
