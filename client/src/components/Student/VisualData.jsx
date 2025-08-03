import React from "react";
import Plot from "react-plotly.js";

const VisualData = ({ attendanceData }) => {
  const presentCount = attendanceData.filter(a => a.status?.toLowerCase() === 'present').length;
  const absentCount = attendanceData.filter(a => a.status?.toLowerCase() === 'absent').length;

  const data = [
    {
      x: ['Present', 'Absent'],
      y: [presentCount, absentCount],
      type: 'bar',
      marker: {
        color: ['#4ade80', '#f87171']
      }
    }
  ];

  const layout = {
    title: 'Attendance Overview',
    xaxis: {
      title: 'Status',
    },
    yaxis: {
      title: 'Count',
    },
    height: 400,
    width: 400,
  };

  return (
    <div className=" flex justify-center items-center mt-3 pt-2 font-outfit">
      <Plot className="font-outfit" data={data} layout={layout} />
    </div>
  );
};

export default VisualData;
