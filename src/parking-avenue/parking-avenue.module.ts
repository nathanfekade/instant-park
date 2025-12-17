import { Module } from '@nestjs/common';
import { ParkingAvenueService } from './parking-avenue.service';
import { ParkingAvenueController } from './parking-avenue.controller';
import { DatabaseModule } from 'src/database/database.module';


@Module({
  imports: [ DatabaseModule],
  controllers: [ParkingAvenueController],
  providers: [ParkingAvenueService],
})
export class ParkingAvenueModule {}
