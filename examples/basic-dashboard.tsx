/**
 * Basic Dashboard Example
 *
 * Simple 4-card + 2-chart layout
 * Perfect starting point for any hackathon
 */

'use client';

import React from 'react';
import {
  MetricsGrid,
  TotalUsersCard,
  RevenueCard,
  ConversionRateCard,
  ActiveUsersCard
} from '../components/metrics-cards';
import { LineChartSimple, BarChartSimple } from '../components/interactive-charts';

// Sample data - replace with your API calls
const trendData = [
  { name: 'Mon', value: 120 },
  { name: 'Tue', value: 150 },
  { name: 'Wed', value: 180 },
  { name: 'Thu', value: 160 },
  { name: 'Fri', value: 200 },
  { name: 'Sat', value: 190 },
  { name: 'Sun', value: 170 }
];

const categoryData = [
  { name: 'Category A', value: 450 },
  { name: 'Category B', value: 320 },
  { name: 'Category C', value: 280 },
  { name: 'Category D', value: 150 }
];

export default function BasicDashboard() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Metrics Cards */}
      <MetricsGrid>
        <TotalUsersCard value={12543} change={15.2} />
        <RevenueCard value={45231} change={22.1} />
        <ConversionRateCard value={3.24} change={0.5} />
        <ActiveUsersCard current={8542} max={12543} />
      </MetricsGrid>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartSimple data={trendData} />
        <BarChartSimple data={categoryData} />
      </div>
    </div>
  );
}
