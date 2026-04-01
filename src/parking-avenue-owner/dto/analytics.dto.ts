export class AnalyticsKpiDto {
  averageOccupancyRate: number;
  totalVisitors: number;
  averageStayDurationHours: number;
  totalRevenue: number;
  visitorSplit: {
    reservations: number;
    walkIns: number;
  };
}

export class ChartDataPointDto {
  label: string | number; // e.g., 'Monday' or hour '14'
  value: number;
}

export class RevenueTrendDto {
  date: string;
  reservationRevenue: number;
  walkInRevenue: number;
}