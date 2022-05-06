import { Module } from '@nestjs/common';
import { AwsService } from './providers/aws.service';
import { AwsController } from './controllers/aws.controller';
import { AppService } from 'src/app.service';

@Module({
  providers: [AppService, AwsService],
  controllers: [AwsController],
  exports: [AwsService]
})
export class AwsModule {}
