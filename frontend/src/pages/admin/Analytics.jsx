import { useEffect, useState, useCallback } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [period, setPeriod] = useState('daily');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchAnalytics = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/analytics/summary"
    );
    setData(res.data);
  };

  const fetchSalesTrend = useCallback(async () => {
    const params = new URLSearchParams();
    params.append('period', period);
    if (category) params.append('category', category);
    
    const res = await axios.get(
      `http://localhost:5000/api/analytics/sales-trend?${params}`
    );
    setTrendData(res.data);
  }, [period, category]);

  const fetchCategories = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/analytics/categories"
    );
    setCategories(res.data);
  };

  useEffect(() => {
    fetchAnalytics();
    fetchCategories();
    fetchSalesTrend();
  }, [fetchSalesTrend]);

  if (!data) return null;

  return (
    <AdminLayout>
      <h2 className="page-title">Analytics Dashboard</h2>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Total Revenue</h3>
          <p className="analytics-value">₹{data.totalRevenue}</p>
        </div>

        <div className="analytics-card">
          <h3>Total Expense</h3>
          <p className="analytics-value">₹{data.totalExpense}</p>
        </div>

        <div className="analytics-card">
          <h3>Profit / Loss</h3>
          <p className={`analytics-value ${data.profit >= 0 ? 'profit' : 'loss'}`}>
            ₹{data.profit}
          </p>
        </div>

        <div className="analytics-card">
          <h3>Total Products</h3>
          <p className="analytics-value">{data.totalProducts}</p>
        </div>

        <div className="analytics-card">
          <h3>Low Stock Items</h3>
          <p className="analytics-value">{data.lowStockCount}</p>
        </div>
      </div>

      <div className="chart-container" style={{ marginTop: '30px', padding: '20px', background: 'white', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>Sales Trend Analysis</h3>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div>
              <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Period:</label>
              <select 
                value={period} 
                onChange={(e) => setPeriod(e.target.value)}
                style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc' }}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div>
              <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Category:</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc' }}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              label={{ value: 'Sales Amount (₹)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={(value) => [`₹${value}`, 'Sales Amount']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#8884d8" 
              strokeWidth={2}
              dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </AdminLayout>
  );
};

export default Analytics;
