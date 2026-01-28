import { BadRequestException, Injectable, NotFoundException,  } from '@nestjs/common';
import { CreateParkingAvenueDto } from './dto/create-parking-avenue.dto';
import { UpdateParkingAvenueDto } from './dto/update-parking-avenue.dto';
import { DatabaseService } from '../database/database.service';
import { SearchParkingDto } from './dto/search-parking-avenue.dto';
import { ParkingAvenue } from '@prisma/client';

@Injectable()
export class ParkingAvenueService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createParkingAvenueDto: CreateParkingAvenueDto, userId: string) {
    const parkingAvenueOwnerCheck =
      await this.databaseService.parkingAvenueOwner.findUnique({
        where: { id: userId },
      });

    if (!parkingAvenueOwnerCheck) {
      throw new NotFoundException(
        'Only parking avenue owners can register parking avenues',
      );
    }

    if (!parkingAvenueOwnerCheck.isVerified){
      throw new BadRequestException("Only Verified parking avenue owners can register parking avenues")
    }

    return this.databaseService.parkingAvenue.create({
      data: { ...createParkingAvenueDto, ownerId: userId },
    });
  }

  async findNearby(searchDto: SearchParkingDto) {
    const { latitude, longitude, radius } = searchDto;

    // 6371 is the radius of the Earth in km
    const results = await this.databaseService.$queryRaw<ParkingAvenue[]>`
        SELECT *,
        (
          6371 * acos(
            cos(radians(${latitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${longitude})) +
            sin(radians(${latitude})) * sin(radians(latitude))
          )
        ) AS distance
        FROM "ParkingAvenue"
        WHERE (
          6371 * acos(
            cos(radians(${latitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${longitude})) +
            sin(radians(${latitude})) * sin(radians(latitude))
          )
        ) < ${radius}
        ORDER BY distance ASC
      `;

    return results;
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
