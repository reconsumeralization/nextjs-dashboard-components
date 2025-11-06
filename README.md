# Next.js Dashboard Template

**Setup Time**: 5 minutes
**Copy-Paste Ready**: ✅ Yes
**Tech Stack**: Next.js 14 + shadcn/ui + Recharts
**Last Tested**: 2025-10-24

---

## 🎯 What This Does

Production-ready dashboard UI components extracted from AgentDash. Perfect for:
1. **Analytics Dashboards** - Real-time metrics and charts
2. **Admin Panels** - Data visualization and monitoring
3. **Business Intelligence** - Interactive reports
4. **Data Exploration** - Multi-chart layouts

---

## ⚡ Quick Start

### Prerequisites (2 minutes)

```bash
# Initialize Next.js project
npx create-next-app@latest my-dashboard --typescript --tailwind --app

# Install dependencies
cd my-dashboard
npm install recharts lucide-react
npx shadcn@latest init
npx shadcn@latest add card button badge tabs select
```

### Copy Components (1 minute)

```bash
# Copy dashboard components
cp -r components/* your-project/components/
```

### Test It Works (2 minutes)

Create `app/dashboard/page.tsx`:

```typescript
import { AnalyticsDashboard } from '@/components/analytics-dashboard';

export default function DashboardPage() {
  return <AnalyticsDashboard />;
}
```

Run:
```bash
npm run dev
```

**Expected**: Dashboard with 4 tabs (Overview, Traffic, Engagement, Conversions) at http://localhost:3000/dashboard

---

## 📁 Files Included

```
nextjs-dashboard/
├── README.md                     # This file
├── components/
│   ├── analytics-dashboard.tsx   # Full analytics dashboard
│   ├── interactive-charts.tsx    # Reusable chart components
│   └── chart-config.tsx          # Chart configuration types
├── examples/
│   ├── basic-dashboard.tsx       # Simple 4-card layout
│   ├── realtime-charts.tsx       # Live updating charts
│   └── export-example.tsx        # Export to PNG/PDF
└── lib/
    └── mock-data.ts              # Sample data generators
```

---

## 🔥 Copy-Paste Examples

### Example 1: Simple Metrics Dashboard

```typescript
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, TrendingUp } from 'lucide-react';

export default function MetricsDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Total Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">12,543</div>
          <p className="text-sm text-muted-foreground">
            <TrendingUp className="inline h-3 w-3 text-green-500" /> +15%
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">$45,231</div>
          <p className="text-sm text-muted-foreground">
            <TrendingUp className="inline h-3 w-3 text-green-500" /> +22%
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conversion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">3.2%</div>
          <p className="text-sm text-muted-foreground">
            +0.5% from last week
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
```

### Example 2: Interactive Charts

```typescript
'use client';

import { InteractiveChart } from '@/components/interactive-charts';
import { Card } from '@/components/ui/card';

const data = [
  { name: 'Jan', value: 4000, trend: 12.5 },
  { name: 'Feb', value: 3000, trend: -8.2 },
  { name: 'Mar', value: 5000, trend: 15.8 },
  { name: 'Apr', value: 4500, trend: 5.3 },
  { name: 'May', value: 6000, trend: 20.1 }
];

export default function ChartsPage() {
  return (
    <div className="p-6 space-y-6">
      <InteractiveChart
        config={{
          type: 'line',
          title: 'Revenue Trend',
          description: 'Monthly revenue over time',
          data,
          xAxisKey: 'name',
          yAxisKey: 'value',
          colorScheme: ['#0088FE'],
          showLegend: true,
          showTooltip: true,
          showGrid: true,
          height: 400,
          interactive: true,
          realTime: false,
          exportable: true
        }}
        onDataPointClick={(point) => console.log('Clicked:', point)}
        onExport={(format) => console.log('Export as:', format)}
      />
    </div>
  );
}
```

### Example 3: Real-Time Dashboard

```typescript
'use client';

import { useState, useEffect } from 'react';
import { InteractiveChart } from '@/components/interactive-charts';

export default function RealtimeDashboard() {
  const [data, setData] = useState([
    { name: '10:00', value: 100 },
    { name: '10:05', value: 120 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => [
        ...prev.slice(-9),
        {
          name: new Date().toLocaleTimeString(),
          value: Math.floor(Math.random() * 200) + 50
        }
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <InteractiveChart
      config={{
        type: 'area',
        title: 'Live Metrics',
        description: 'Updates every 5 seconds',
        data,
        xAxisKey: 'name',
        yAxisKey: 'value',
        colorScheme: ['#00C49F'],
        showLegend: false,
        showTooltip: true,
        showGrid: true,
        height: 300,
        interactive: true,
        realTime: true,
        exportable: true
      }}
    />
  );
}
```

### Example 4: Multi-Tab Analytics

```typescript
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InteractiveChart } from '@/components/interactive-charts';

export default function AnalyticsTabs() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Visits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">125,000</div>
              </CardContent>
            </Card>
            {/* Add more cards */}
          </div>
        </TabsContent>

        <TabsContent value="traffic">
          <InteractiveChart
            config={{
              type: 'bar',
              title: 'Traffic Sources',
              description: 'Where visitors come from',
              data: [
                { name: 'Organic', value: 4500 },
                { name: 'Direct', value: 2500 },
                { name: 'Social', value: 1500 }
              ],
              xAxisKey: 'name',
              yAxisKey: 'value',
              colorScheme: ['#0088FE'],
              showLegend: false,
              showTooltip: true,
              showGrid: true,
              height: 400,
              interactive: true,
              realTime: false,
              exportable: true
            }}
          />
        </TabsContent>

        <TabsContent value="engagement">
          {/* Engagement charts */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

---

## 🎨 Customization

### Change Color Scheme

```typescript
const config = {
  // ... other config
  colorScheme: ['#FF6384', '#36A2EB', '#FFCE56'] // Custom colors
};
```

### Add Export Functionality

```typescript
<InteractiveChart
  config={...}
  onExport={(format) => {
    // Custom export logic
    if (format === 'png') {
      // Download as PNG
    }
  }}
/>
```

### Custom Tooltips

```typescript
<Tooltip
  content={({ active, payload }) => {
    if (active && payload) {
      return (
        <div className="bg-white p-3 border rounded shadow">
          <p className="font-bold">{payload[0].value}</p>
          <p className="text-sm text-gray-500">Custom info here</p>
        </div>
      );
    }
    return null;
  }}
/>
```

---

## 📊 Chart Types Available

1. **Line Chart** - Trends over time
2. **Area Chart** - Filled trend visualization
3. **Bar Chart** - Categorical comparisons
4. **Pie Chart** - Distribution percentages
5. **Scatter Chart** - Correlation analysis
6. **Composed Chart** - Multiple chart types combined

---

## 🏆 Demo Tips

**Show in demo:**
1. Real-time data updates (live dashboard)
2. Interactive hover effects
3. One-click export to PNG
4. Responsive mobile layout
5. Say: "Built with Next.js + shadcn/ui"

**Code snippet for judges:**
```typescript
// Show how simple
<InteractiveChart
  config={{
    type: 'line',
    title: 'Key Metrics',
    data: myData,
    xAxisKey: 'date',
    yAxisKey: 'value',
    realTime: true,
    exportable: true
  }}
/>
// Production-ready in 5 lines!
```

---

## 🔗 Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "recharts": "^2.10.0",
    "lucide-react": "^0.300.0",
    "tailwindcss": "^3.4.0"
  }
}
```

Install shadcn/ui components:
```bash
npx shadcn@latest add card button badge tabs select
```

---

## 📝 TypeScript Types

```typescript
export interface ChartData {
  name: string;
  value: number;
  date?: string;
  category?: string;
  trend?: number;
  prediction?: number;
}

export interface ChartConfig {
  type: 'line' | 'area' | 'bar' | 'pie' | 'scatter' | 'composed';
  title: string;
  description: string;
  data: ChartData[];
  xAxisKey: string;
  yAxisKey: string;
  colorScheme: string[];
  showLegend: boolean;
  showTooltip: boolean;
  showGrid: boolean;
  height: number;
  interactive: boolean;
  realTime: boolean;
  exportable: boolean;
}
```

---

**✅ Template Complete!**

**Ready to use**: Copy to your Next.js project
**Integration time**: 5 minutes
**Win potential**: High (judges love dashboards!)
