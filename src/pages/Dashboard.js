import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RTooltip,
} from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/Dashboard.css";

// ---------- Mock data ----------
const MOCK_KPIS = [
  { label: "MAPE", value: "7.8%" },
  { label: "Hit rate", value: "59.2%" },
  { label: "Sharpe", value: "0.71" },
  { label: "Max drawdown", value: "-1.13%" },
];

const RAW_SERIES = [
  // Past
  { x: "P1", price: 172.3 },
  { x: "P2", price: 174.8 },
  { x: "P3", price: 178.6 },
  { x: "P4", price: 181.2 },
  { x: "P5", price: 179.4 },
  { x: "P6", price: 176.1 },
  { x: "P7", price: 177.8 },
  { x: "P8", price: 182.5 },
  { x: "P9", price: 185.7 },
  { x: "P10", price: 183.2 },
  { x: "P11", price: 186.9 },
  { x: "P12", price: 189.1 },
  { x: "P13", price: 188.0 },
  { x: "P14", price: 190.4 },
  { x: "P15", price: 187.7 },
  { x: "T0", price: 188.9 }, // Today

  // Forecast
  { x: "F1", price: 190.5, isFuture: true },
  { x: "F2", price: 192.1, isFuture: true },
  { x: "F3", price: 194.8, isFuture: true },
  { x: "F4", price: 197.3, isFuture: true },
  { x: "F5", price: 199.6, isFuture: true },
];


const MOCK_SIDEBAR = {
  price: 198.45,
  volume: 18.28,
  ratio: 0.47,
  dailyChangePct: 0.54,
};

// ---------- Small UI helpers ----------
function KPI({ label, value }) {
  return (
    <div className="kpi-card">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
    </div>
  );
}

function SidebarRow({ label, value, accent }) {
  return (
    <div className="sidebar-row">
      <div className={`sidebar-value ${accent || ""}`}>{value}</div>
      <div className="sidebar-label">{label}</div>
    </div>
  );
}

// ---------- Main component ----------
export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const past = useMemo(() => RAW_SERIES.filter((d) => !d.isFuture), []);
  const future = useMemo(() => RAW_SERIES.filter((d) => d.isFuture), []);

  const futureWithAnchor = useMemo(() => {
    const anchor = past[past.length - 1];
    return anchor ? [anchor, ...future] : future;
  }, [past, future]);

  return (
    <div className="dashboard">
      <div className={`dashboard-grid ${sidebarOpen ? "with-sidebar" : ""}`}>
        {/* LEFT */}
        <div className="left-column">
          <h1 className="title">Stock Predictor</h1>
          <p className="subtitle">Historical vs. forecast price</p>

          {/* KPIs */}
          <div className="kpi-grid">
            {MOCK_KPIS.map((k) => (
              <KPI key={k.label} label={k.label} value={k.value} />
            ))}
          </div>

          {/* Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Price</h3>
              <p>Past, Today, and Future (dashed)</p>
            </div>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={past}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" tick={false} />
                  <YAxis width={40} />
                  <RTooltip />
                  <Line
                    type="monotone"
                    dataKey="price"
                    dot={false}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    data={futureWithAnchor}
                    dataKey="price"
                    dot={false}
                    strokeWidth={2}
                    strokeDasharray="6 6"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        {sidebarOpen && (
          <div className="sidebar">
            <button
              className="collapse-btn"
              onClick={() => setSidebarOpen(false)}
              aria-label="Collapse sidebar"
            >
              <ChevronRight size={16} />
            </button>
            <SidebarRow label="Price" value={MOCK_SIDEBAR.price.toFixed(2)} />
            <SidebarRow label="Volume" value={MOCK_SIDEBAR.volume.toFixed(2)} />
            <SidebarRow label="Ratio" value={MOCK_SIDEBAR.ratio.toFixed(2)} />
            <SidebarRow
              label="Daily change"
              value={`${
                MOCK_SIDEBAR.dailyChangePct >= 0 ? "+" : ""
              }${MOCK_SIDEBAR.dailyChangePct.toFixed(2)}%`}
              accent={MOCK_SIDEBAR.dailyChangePct >= 0 ? "green" : "red"}
            />
          </div>
        )}
        {!sidebarOpen && (
          <div className="sidebar-toggle">
            <button onClick={() => setSidebarOpen(true)}>
              <ChevronLeft size={16} /> Show details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
