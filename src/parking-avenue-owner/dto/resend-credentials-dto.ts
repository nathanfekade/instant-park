import { IsNotEmpty, IsEmail} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; 

export class ResendCredentialsDto {
  
     @ApiProperty({
            description: 'Email of parking avenue owner',
            example: 'john@gmail.com',
        })
        @IsEmail()
        @IsNotEmpty()
        email: string;
}