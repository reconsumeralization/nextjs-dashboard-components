/**
 * Metrics Cards - Hackathon Ready
 *
 * Reusable metric card components for dashboards
 * Copy-paste and customize with your data
 */

'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  LucideIcon
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: LucideIcon;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export interface ProgressMetricProps {
  title: string;
  value: number;
  max: number;
  label?: string;
  color?: 'blue' | 'green' | 'red' | 'yellow';
  icon?: LucideIcon;
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Standard metric card with optional trend indicator
 */
export function MetricCard({
  title,
  value,
  change,
  changeLabel = 'from last period',
  icon: Icon,
  description,
  trend = 'neutral',
  className
}: MetricCardProps) {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-500';
    if (trend === 'down') return 'text-red-500';
    return 'text-gray-500';
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Activity;

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <p className="text-xs text-muted-foreground mt-1">
            <TrendIcon className={`inline h-3 w-3 ${getTrendColor()}`} />
            {' '}
            {change > 0 ? '+' : ''}{change}% {changeLabel}
          </p>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Progress metric card with progress bar
 */
export function ProgressMetric({
  title,
  value,
  max,
  label,
  color = 'blue',
  icon: Icon
}: ProgressMetricProps) {
  const percentage = (value / max) * 100;

  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600'
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className={`text-2xl font-bold ${colorClasses[color]}`}>
            {value}
          </div>
          <div className="text-sm text-muted-foreground">
            / {max}
          </div>
        </div>
        <Progress value={percentage} className="mt-3" />
        {label && (
          <p className="text-xs text-muted-foreground mt-2">{label}</p>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Status metric card with status indicator
 */
export function StatusMetric({
  title,
  value,
  status,
  description
}: {
  title: string;
  value: string | number;
  status: 'success' | 'warning' | 'error' | 'info';
  description?: string;
}) {
  const statusConfig = {
    success: { icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-50 dark:bg-green-950/20' },
    warning: { icon: AlertCircle, color: 'text-yellow-500', bgColor: 'bg-yellow-50 dark:bg-yellow-950/20' },
    error: { icon: AlertCircle, color: 'text-red-500', bgColor: 'bg-red-50 dark:bg-red-950/20' },
    info: { icon: Activity, color: 'text-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-950/20' }
  };

  const { icon: StatusIcon, color, bgColor } = statusConfig[status];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <StatusIcon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <div className={`mt-2 p-2 rounded ${bgColor}`}>
            <p className="text-xs">{description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Comparison metric card showing two values
 */
export function ComparisonMetric({
  title,
  current,
  previous,
  currentLabel = 'Current',
  previousLabel = 'Previous',
  icon: Icon
}: {
  title: string;
  current: number;
  previous: number;
  currentLabel?: string;
  previousLabel?: string;
  icon?: LucideIcon;
}) {
  const change = ((current - previous) / previous) * 100;
  const isPositive = change > 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{current}</div>
            <p className="text-xs text-muted-foreground">{currentLabel}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-medium text-muted-foreground">{previous}</div>
            <p className="text-xs text-muted-foreground">{previousLabel}</p>
          </div>
        </div>
        <div className="mt-3">
          <Badge variant={isPositive ? "default" : "destructive"}>
            {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {Math.abs(change).toFixed(1)}% {isPositive ? 'increase' : 'decrease'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// PRE-CONFIGURED METRIC CARDS
// ============================================================================

export function TotalUsersCard({ value, change }: { value: number; change: number }) {
  return (
    <MetricCard
      title="Total Users"
      value={value.toLocaleString()}
      change={change}
      trend={change > 0 ? 'up' : 'down'}
      icon={Users}
    />
  );
}

export function RevenueCard({ value, change }: { value: number; change: number }) {
  return (
    <MetricCard
      title="Revenue"
      value={`$${value.toLocaleString()}`}
      change={change}
      trend={change > 0 ? 'up' : 'down'}
      icon={DollarSign}
    />
  );
}

export function ConversionRateCard({ value, change }: { value: number; change: number }) {
  return (
    <MetricCard
      title="Conversion Rate"
      value={`${value.toFixed(2)}%`}
      change={change}
      trend={change > 0 ? 'up' : 'down'}
      icon={Target}
    />
  );
}

export function ActiveUsersCard({ current, max }: { current: number; max: number }) {
  return (
    <ProgressMetric
      title="Active Users"
      value={current}
      max={max}
      label={`${((current / max) * 100).toFixed(1)}% of capacity`}
      color="green"
      icon={Users}
    />
  );
}

export function SystemHealthCard({ uptime }: { uptime: number }) {
  const status = uptime >= 99 ? 'success' : uptime >= 95 ? 'warning' : 'error';
  return (
    <StatusMetric
      title="System Health"
      value={`${uptime.toFixed(2)}%`}
      status={status}
      description={status === 'success' ? 'All systems operational' : 'Some issues detected'}
    />
  );
}

// ============================================================================
// LAYOUT HELPERS
// ============================================================================

/**
 * Standard 4-card metrics grid
 */
export function MetricsGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {children}
    </div>
  );
}

/**
 * 3-card metrics row
 */
export function MetricsRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {children}
    </div>
  );
}
