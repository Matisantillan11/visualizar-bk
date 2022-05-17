import { Module } from '@nestjs/common';
import { ConnectionProvider } from 'src/application/database/connectionProvider.service';
import { Config } from 'src/config';
import { CourseService } from './providers/course.service';

@Module({
  imports: [ConnectionProvider],
  providers: Config.services.course,
  controllers: Config.controllers.course,
  exports: [CourseService],
})
export class CourseModule {}
