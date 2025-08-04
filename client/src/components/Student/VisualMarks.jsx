import React from "react";
import Plot from "react-plotly.js";

const VisualMarks = ({ marksData }) => {
  const examTitles = marksData.map((item)=> item.exam_name);
  const obatinedMarks = marksData.map((item)=> item.marks_obtained);
  const totalMarks = marksData.map((item)=> item.total_marks - item.marks_obtained)

  const data = [
    {
      x: examTitles,
      y: obatinedMarks,
      type: 'bar',
      name : 'Marks Scored',
      marker: { color: '#60a5fa'},
    },
    {
      x: examTitles,
      y: totalMarks,
      type: 'bar',
      name : 'Total Marks',
      marker: { color: '#d1d5db'},        
    }
  ];

  const layout = {
    title: 'Marks Overview',
    barmode: 'stack',
    xaxis: {
      title: 'Exam Name',
    },
    yaxis: {
      title: 'Marks',
    },
    height: 400,
    width: 500,
  };

  return (
    <div className=" flex justify-center items-center mt-3 pt-2 font-outfit overflow-x-scroll scrollbar-hide">
      <Plot className="font-outfit" data={data} layout={layout} />
    </div>
  );
};

export default VisualMarks;
