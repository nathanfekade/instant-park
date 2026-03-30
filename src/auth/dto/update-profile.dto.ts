import { OmitType, PartialType } from '@nestjs/swagger'; 
import { RegisterDto } from './register.dto'; 

export class UpdateProfileDto extends PartialType(OmitType(RegisterDto, ['phoneNo'] as const),
) {  }