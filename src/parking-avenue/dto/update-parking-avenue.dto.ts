import { PartialType } from '@nestjs/swagger';
import { CreateParkingAvenueDto } from './create-parking-avenue.dto';

export class UpdateParkingAvenueDto extends PartialType(CreateParkingAvenueDto) {}
