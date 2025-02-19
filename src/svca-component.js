import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample SVCA results with real gene names
const sampleResults = [
  {
    gene: 'Pdgfra',
    intrinsic_pct: 65,
    environmental_pct: 25,
    interaction_pct: 10
  },
  {
    gene: 'Aox1',
    intrinsic_pct: 45,
    environmental_pct: 35,
    interaction_pct: 20
  },
  {
    gene: 'Efnb2',
    intrinsic_pct: 55,
    environmental_pct: 30,
    interaction_pct: 15
  },
  {
    gene: 'Cyp51',
    intrinsic_pct: 70,
    environmental_pct: 20,
    interaction_pct: 10
  },
  {
    gene: 'Itfg2',
    intrinsic_pct: 40,
    environmental_pct: 40,
    interaction_pct: 20
  },
  {
    gene: 'Tcirg1',
    intrinsic_pct: 50,
    environmental_pct: 35,
    interaction_pct: 15
  }
];

// Calculate average percentages
const averagePercentages = {
  intrinsic: sampleResults.reduce((acc, curr) => acc + curr.intrinsic_pct, 0) / sampleResults.length,
  environmental: sampleResults.reduce((acc, curr) => acc + curr.environmental_pct, 0) / sampleResults.length,
  interaction: sampleResults.reduce((acc, curr) => acc + curr.interaction_pct, 0) / sampleResults.length
};

const pieData = [
  { name: 'Intrinsic', value: averagePercentages.intrinsic },
  { name: 'Environmental', value: averagePercentages.environmental },
  { name: 'Interaction', value: averagePercentages.interaction }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const SVCAVisualization = () => {
  const [selectedGene, setSelectedGene] = useState(sampleResults[0].gene);

  const geneData = sampleResults.find(g => g.gene === selectedGene);
  const geneChartData = [
    { name: 'Intrinsic', percentage: geneData.intrinsic_pct },
    { name: 'Environmental', percentage: geneData.environmental_pct },
    { name: 'Interaction', percentage: geneData.interaction_pct }
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">SVCA Analysis Results</h1>
      
      {/* Overview Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Global Average Variance Components</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gene-specific Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Gene-specific Analysis</h2>
        <select 
          value={selectedGene}
          onChange={(e) => setSelectedGene(e.target.value)}
          className="mb-4 p-2 border rounded"
        >
          {sampleResults.map(gene => (
            <option key={gene.gene} value={gene.gene}>{gene.gene}</option>
          ))}
        </select>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={geneChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="percentage" fill="#8884d8">
                {geneChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparative View */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Genes Comparison</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleResults}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="gene" />
              <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="intrinsic_pct" name="Intrinsic" fill={COLORS[0]} />
              <Bar dataKey="environmental_pct" name="Environmental" fill={COLORS[1]} />
              <Bar dataKey="interaction_pct" name="Interaction" fill={COLORS[2]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Key Observations</h2>
        <ul className="list-disc pl-5">
          <li className="mb-2">Average intrinsic effect: {averagePercentages.intrinsic.toFixed(1)}%</li>
          <li className="mb-2">Average environmental effect: {averagePercentages.environmental.toFixed(1)}%</li>
          <li className="mb-2">Average interaction effect: {averagePercentages.interaction.toFixed(1)}%</li>
          <li className="mb-2">Highest intrinsic effect: {sampleResults.reduce((max, curr) => curr.intrinsic_pct > max.intrinsic_pct ? curr : max).gene} ({sampleResults.reduce((max, curr) => curr.intrinsic_pct > max.intrinsic_pct ? curr : max).intrinsic_pct}%)</li>
          <li className="mb-2">Highest environmental effect: {sampleResults.reduce((max, curr) => curr.environmental_pct > max.environmental_pct ? curr : max).gene} ({sampleResults.reduce((max, curr) => curr.environmental_pct > max.environmental_pct ? curr : max).environmental_pct}%)</li>
        </ul>
      </div>
    </div>
  );
};

export default SVCAVisualization;