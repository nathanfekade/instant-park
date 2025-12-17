import { Injectable, NotFoundException,  } from '@nestjs/common';
import { CreateParkingAvenueDto } from './dto/create-parking-avenue.dto';
import { UpdateParkingAvenueDto } from './dto/update-parking-avenue.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ParkingAvenueService {

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createParkingAvenueDto: CreateParkingAvenueDto, userId: string) {
    
    const parkingAvenueOwnerCheck = await this.databaseService.parkingAvenueOwner.findUnique({
      where: { id: userId },
    });
    
    if (!parkingAvenueOwnerCheck) {
      throw new NotFoundException('Only parking avenue owners can register parking avenues');
    }

    return this.databaseService.parkingAvenue.create({
      data: { ...createParkingAvenueDto, ownerId: userId },
    });
  }

  findAll() {
    return `This action returns all parkingAvenue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parkingAvenue`;
  }

  update(id: number, updateParkingAvenueDto: UpdateParkingAvenueDto) {
    return `This action updates a #${id} parkingAvenue`;
  }

  remove(id: number) {
    return `This action removes a #${id} parkingAvenue`;
  }
}
