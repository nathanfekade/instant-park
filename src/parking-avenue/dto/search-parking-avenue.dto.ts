import { IsNumber, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchParkingDto {
  @ApiPropertyOptional({
    description: 'Latitude of the user',
    example: 9.005401,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiPropertyOptional({
    description: 'Longitude of the user',
    example: 38.763611,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @ApiPropertyOptional({
    description: 'Search radius in kilometers',
    default: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  radius?: number = 5;
}
