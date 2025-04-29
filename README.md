📊 Z-Score Line Chart with Recharts

This project visualizes line chart data (uv and pv) using Recharts and dynamically highlights data points that are statistical outliers based on Z-scores.
✨ Features

 ✅ Dual-line chart (uv and pv) rendered with recharts.

 🔴 Outliers highlighted in red when absolute z-score > 1.

 🎯 Z-score is calculated for each data series (uv and pv) separately.

🧮 Z-Score Logic

A z-score represents how many standard deviations a data point is from the mean. This chart calculates z-scores for uv and pv values individually and visually distinguishes values beyond ±1 standard deviation.

🚀 Getting Started

Install dependencies

    npm install

Start the development server

    npm run dev

Visit http://localhost:5173 (if using Vite) or the port shown in your terminal.

# zscore-linechart
