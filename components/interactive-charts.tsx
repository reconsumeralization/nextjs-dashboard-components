/**
 * Interactive Chart Components - Hackathon Ready
 *
 * Generic, reusable chart components extracted from AgentDash
 * Works with ANY data source - just pass your data!
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  ScatterChart,
  Scatter
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Download,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

export interface ChartData {
  name: string;
  value: number;
  date?: string;
  category?: string;
  trend?: number;
  prediction?: number;
  confidence?: number;
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

export interface InteractiveChartProps {
  config: ChartConfig;
  onDataPointClick?: (data: ChartData) => void;
  onExport?: (format: 'png' | 'svg' | 'pdf') => void;
  className?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
  '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function InteractiveChart({
  config,
  onDataPointClick,
  onExport,
  className
}: InteractiveChartProps) {
  const [selectedDataPoint, setSelectedDataPoint] = useState<ChartData | null>(null);
  const [isRealTime, setIsRealTime] = useState(config.realTime);
  const [chartType, setChartType] = useState(config.type);
  const chartRef = useRef<HTMLDivElement>(null);

  // Real-time data simulation
  useEffect(() => {
    if (!isRealTime) return;

    const interval = setInterval(() => {
      console.log('Real-time update triggered');
    }, 5000);

    return () => clearInterval(interval);
  }, [isRealTime]);

  const handleDataPointClick = (data: ChartData) => {
    setSelectedDataPoint(data);
    onDataPointClick?.(data);
  };

  const handleExport = (format: 'png' | 'svg' | 'pdf') => {
    onExport?.(format);
    console.log(`Exporting chart as ${format}`);
  };

  const renderChart = () => {
    const commonProps = {
      data: config.data,
      onClick: config.interactive ? handleDataPointClick : undefined,
      style: { cursor: config.interactive ? 'pointer' : 'default' }
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={config.xAxisKey} />
            <YAxis />
            {config.showTooltip && <Tooltip />}
            {config.showLegend && <Legend />}
            <Line
              type="monotone"
              dataKey={config.yAxisKey}
              stroke="#0088FE"
              strokeWidth={2}
              dot={{ fill: '#0088FE', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            {config.data.some(d => d.prediction) && (
              <Line
                type="monotone"
                dataKey="prediction"
                stroke="#FF8042"
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={false}
              />
            )}
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={config.xAxisKey} />
            <YAxis />
            {config.showTooltip && <Tooltip />}
            {config.showLegend && <Legend />}
            <Area
              type="monotone"
              dataKey={config.yAxisKey}
              stroke="#0088FE"
              fill="#0088FE"
              fillOpacity={0.3}
            />
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={config.xAxisKey} />
            <YAxis />
            {config.showTooltip && <Tooltip />}
            {config.showLegend && <Legend />}
            <Bar
              dataKey={config.yAxisKey}
              fill="#0088FE"
              onClick={handleDataPointClick}
            />
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={config.data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey={config.yAxisKey}
              onClick={handleDataPointClick}
            >
              {config.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            {config.showTooltip && <Tooltip />}
          </PieChart>
        );

      case 'scatter':
        return (
          <ScatterChart {...commonProps}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={config.xAxisKey} />
            <YAxis dataKey={config.yAxisKey} />
            {config.showTooltip && <Tooltip />}
            {config.showLegend && <Legend />}
            <Scatter
              name="Data Points"
              dataKey={config.yAxisKey}
              fill="#0088FE"
            />
          </ScatterChart>
        );

      case 'composed':
        return (
          <ComposedChart {...commonProps}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={config.xAxisKey} />
            <YAxis />
            {config.showTooltip && <Tooltip />}
            {config.showLegend && <Legend />}
            <Bar dataKey={config.yAxisKey} fill="#0088FE" />
            <Line type="monotone" dataKey="trend" stroke="#FF8042" strokeWidth={2} />
          </ComposedChart>
        );

      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {chartType === 'line' && <LineChartIcon className="h-5 w-5" />}
              {chartType === 'bar' && <BarChart3 className="h-5 w-5" />}
              {chartType === 'pie' && <PieChartIcon className="h-5 w-5" />}
              {config.title}
            </CardTitle>
            <CardDescription>{config.description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {/* Real-time toggle */}
            {config.realTime && (
              <Button
                variant={isRealTime ? "default" : "outline"}
                size="sm"
                onClick={() => setIsRealTime(!isRealTime)}
              >
                <Activity className="h-4 w-4 mr-1" />
                {isRealTime ? 'Live' : 'Static'}
              </Button>
            )}

            {/* Chart type selector */}
            <Select value={chartType} onValueChange={(value) => setChartType(value as ChartConfig['type'])}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Line</SelectItem>
                <SelectItem value="area">Area</SelectItem>
                <SelectItem value="bar">Bar</SelectItem>
                <SelectItem value="pie">Pie</SelectItem>
                <SelectItem value="scatter">Scatter</SelectItem>
                <SelectItem value="composed">Composed</SelectItem>
              </SelectContent>
            </Select>

            {/* Export button */}
            {config.exportable && (
              <Button variant="outline" size="sm" onClick={() => handleExport('png')}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            )}
          </div>
        </div>

        {/* Selected data point info */}
        {selectedDataPoint && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{selectedDataPoint.name}</Badge>
              <span className="font-medium">{selectedDataPoint.value}</span>
              {selectedDataPoint.trend && (
                <Badge variant={selectedDataPoint.trend > 0 ? "default" : "destructive"}>
                  {selectedDataPoint.trend > 0 ?
                    <TrendingUp className="h-3 w-3 mr-1" /> :
                    <TrendingDown className="h-3 w-3 mr-1" />
                  }
                  {Math.abs(selectedDataPoint.trend).toFixed(1)}%
                </Badge>
              )}
            </div>
            {selectedDataPoint.prediction && (
              <div className="text-sm text-muted-foreground">
                Predicted: {selectedDataPoint.prediction}
                ({Math.round((selectedDataPoint.confidence || 0) * 100)}% confidence)
              </div>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div ref={chartRef} style={{ width: '100%', height: config.height }}>
          <ResponsiveContainer>
            {renderChart()}
          </ResponsiveContainer>
        </div>

        {/* Chart insights */}
        {config.data.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.max(...config.data.map(d => d.value))}
              </div>
              <div className="text-sm text-muted-foreground">Peak Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.min(...config.data.map(d => d.value))}
              </div>
              <div className="text-sm text-muted-foreground">Min Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {(config.data.reduce((sum, d) => sum + d.value, 0) / config.data.length).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Average</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {config.data.length}
              </div>
              <div className="text-sm text-muted-foreground">Data Points</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ============================================================================
// PRE-CONFIGURED COMPONENTS
// ============================================================================

export function LineChartSimple({ data }: { data: ChartData[] }) {
  return (
    <InteractiveChart
      config={{
        type: 'line',
        title: 'Trend Over Time',
        description: 'Simple line chart',
        data,
        xAxisKey: 'name',
        yAxisKey: 'value',
        colorScheme: ['#0088FE'],
        showLegend: false,
        showTooltip: true,
        showGrid: true,
        height: 300,
        interactive: true,
        realTime: false,
        exportable: true
      }}
    />
  );
}

export function BarChartSimple({ data }: { data: ChartData[] }) {
  return (
    <InteractiveChart
      config={{
        type: 'bar',
        title: 'Comparison',
        description: 'Simple bar chart',
        data,
        xAxisKey: 'name',
        yAxisKey: 'value',
        colorScheme: ['#0088FE'],
        showLegend: false,
        showTooltip: true,
        showGrid: true,
        height: 300,
        interactive: true,
        realTime: false,
        exportable: true
      }}
    />
  );
}

export function PieChartSimple({ data }: { data: ChartData[] }) {
  return (
    <InteractiveChart
      config={{
        type: 'pie',
        title: 'Distribution',
        description: 'Simple pie chart',
        data,
        xAxisKey: 'name',
        yAxisKey: 'value',
        colorScheme: COLORS,
        showLegend: true,
        showTooltip: true,
        showGrid: false,
        height: 400,
        interactive: true,
        realTime: false,
        exportable: true
      }}
    />
  );
}
