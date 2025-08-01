import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const VisualData = () => {

  const data = [
    { name: 'Present', value: 5 },
    { name: 'Absent', value: 2 }
  ];
  const colors = ['#4ade80', '#f87171'];

  return (
    <div style={{ width: 300, height: 300 }}>
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          cx={125}
          cy={125}
          outerRadius={90}
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" />
      </PieChart>
    </div>
  );
};

export default VisualData;
