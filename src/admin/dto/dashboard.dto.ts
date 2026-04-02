export class AdminKpiDto {
  wardensOnDuty: number;
  activeCheckIns: number;
  confirmedReservations: number;
  overallUtilizationRate: number; // Percentage (0-100)
}

export class WeeklyUtilizationDto {
  date: string;
  onStreetRate: number;
  offStreetRate: number;
  overallRate: number;
}

export class ChartDataPointDto {
  label: string | number;
  value: number;
}

export class DetailedAnalyticsDto {
  averageUtilization: number;
  revenueGrowth: number;
  hottestZone: {
    subCity: string;
    utilization: number;
  };
  peakHours: ChartDataPointDto[];
  zoneUtilization: ChartDataPointDto[];
  parkingDistribution: ChartDataPointDto[];
}