import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ParkingAvenueService } from './parking-avenue.service';
import { CreateParkingAvenueDto } from './dto/create-parking-avenue.dto';
import { UpdateParkingAvenueDto } from './dto/update-parking-avenue.dto';
import type { RequestWithUser } from '../auth/express-request-with-user.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';



@Controller('parking-avenue')
export class ParkingAvenueController {
  constructor(private readonly parkingAvenueService: ParkingAvenueService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Register a new parking avenue' })
  @ApiBody({ type: CreateParkingAvenueDto })
  @ApiResponse({ status: 201, description: 'Parking avenue registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Conflict, parking avenue already exists' })
  @ApiBearerAuth('JWT-auth')
  create(@Body() createParkingAvenueDto: CreateParkingAvenueDto, @Req() req: RequestWithUser) {
    return this.parkingAvenueService.create(createParkingAvenueDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.parkingAvenueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingAvenueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParkingAvenueDto: UpdateParkingAvenueDto) {
    return this.parkingAvenueService.update(+id, updateParkingAvenueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingAvenueService.remove(+id);
  }
}
