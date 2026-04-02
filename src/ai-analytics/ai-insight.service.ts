import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiInsightService {
  private readonly logger = new Logger(AiInsightService.name);
  private genAI: GoogleGenerativeAI;

  constructor(private readonly databaseService: DatabaseService) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      this.logger.warn('GEMINI_API_KEY is not defined in environment variables.');
    }
    this.genAI = new GoogleGenerativeAI(apiKey || '');
  }

  async generateProviderInsight(ownerId: string): Promise<{ insight: string }> {
    try {
      const avenues = await this.databaseService.parkingAvenue.findMany({
        where: { ownerId },
        select: { id: true, name: true, totalSpots: true, currentSpots: true },
      });

      if (!avenues.length) {
        return { insight: "You currently do not have any registered parking avenues. Add a location to start receiving insights." };
      }

      const avenueIds = avenues.map(a => a.id);
      
      const activeCheckIns = await this.databaseService.checkIn.count({
        where: { parkingAvenueId: { in: avenueIds }, status: 'ACTIVE' },
      });

      const pendingReservations = await this.databaseService.reservation.count({
        where: { parkingAvenueId: { in: avenueIds }, status: 'CONFIRMED' },
      });

      const todayRevenue = await this.databaseService.checkIn.aggregate({
        where: { 
          parkingAvenueId: { in: avenueIds }, 
          status: 'COMPLETED',
          createdAt: { gte: new Date(new Date().setHours(0,0,0,0)) } 
        },
        _sum: { calculatedAmount: true },
      });

      const totalCapacity = avenues.reduce((sum, a) => sum + a.totalSpots, 0);
      const availableCapacity = avenues.reduce((sum, a) => sum + a.currentSpots, 0);
      const occupancyRate = totalCapacity > 0 ? Math.round(((totalCapacity - availableCapacity) / totalCapacity) * 100) : 0;

      const prompt = `
        You are an expert parking management and business optimization AI assistant.
        Analyze the following real-time data for a parking provider who owns ${avenues.length} locations.
        
        Current Status:
        - Total Capacity: ${totalCapacity} spots
        - Current Occupancy Rate: ${occupancyRate}%
        - Active Parked Vehicles: ${activeCheckIns}
        - Upcoming Confirmed Reservations: ${pendingReservations}
        - Revenue Today: ${todayRevenue._sum.calculatedAmount || 0} Birr
        
        Provide a brief, actionable insight report for the dashboard. 
        Tone: Professional, encouraging, and highly concise.
        Format: Use short paragraphs or 2-3 bullet points. Do not include a generic introduction or greeting. Focus immediately on the analysis and 1 or 2 recommendations (e.g., dynamic pricing, space allocation, predicting peak hours). Maximum 150 words.
      `;

      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      
      return { insight: result.response.text().trim() };

    } catch (error) {
      this.logger.error('Failed to generate provider insight', error);
      throw new InternalServerErrorException('Could not generate AI insights at this time.');
    }
  }

  async generateAdminInsight(): Promise<{ insight: string }> {
    try {
      const [totalAvenues, checkIns, wardens] = await Promise.all([
        this.databaseService.parkingAvenue.aggregate({
          _sum: { totalSpots: true, currentSpots: true },
          _count: { id: true }
        }),
        this.databaseService.checkIn.count({ where: { status: 'ACTIVE' } }),
        this.databaseService.warden.count({ where: { wardenStatus: 'ONDUTY' } })
      ]);

      const totalSpots = totalAvenues._sum.totalSpots || 0;
      const availableSpots = totalAvenues._sum.currentSpots || 0;
      const sysOccupancyRate = totalSpots > 0 ? Math.round(((totalSpots - availableSpots) / totalSpots) * 100) : 0;

      const prompt = `
        You are the Chief Operations AI for a city-wide smart parking system.
        Analyze the following real-time system data and provide a brief executive summary for the system administrators.

        System Status:
        - Total Registered Parking Avenues: ${totalAvenues._count.id}
        - Global Occupancy Rate: ${sysOccupancyRate}%
        - Total Active Parked Vehicles: ${checkIns}
        - Wardens Currently On-Duty: ${wardens}

        Provide a brief, strategic insight report.
        Tone: Authoritative, analytical, and concise.
        Format: Use short paragraphs or 2-3 bullet points. Focus on system health, resource allocation (e.g., are there enough wardens for the current occupancy?), and overall utilization trends. Maximum 150 words. No pleasantries.
      `;

      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      
      return { insight: result.response.text().trim() };

    } catch (error) {
      this.logger.error('Failed to generate admin insight', error);
      throw new InternalServerErrorException('Could not generate AI insights at this time.');
    }
  }
}