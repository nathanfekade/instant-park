import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReassignWardenDto {
  @ApiProperty({
    description: 'The UUID of the new parking avenue the warden is being assigned to',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    format: 'uuid',
  })
  @IsUUID()
  newParkingAvenueId: string;

  @ApiProperty({
    description: 'The unique identifier of the warden being reassigned',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsUUID()
  wardenId: string;
}