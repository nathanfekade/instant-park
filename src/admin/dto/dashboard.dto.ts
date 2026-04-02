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