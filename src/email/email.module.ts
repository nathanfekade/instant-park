import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  providers: [EmailService],
  exports: [EmailService], // This is crucial: it lets other modules use it
})
export class EmailModule {}