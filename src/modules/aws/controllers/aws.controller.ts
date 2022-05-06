import { Controller, HttpStatus, Inject, Res } from '@nestjs/common';
import { Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import Responseable from 'src/utils/Ports/Responseable';
import { AwsService } from '../providers/aws.service';

@Controller('aws')
export class AwsController {
  private responseService: Responseable;

  constructor(private readonly awsService: AwsService){}
  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  private async upload(@UploadedFile() file, @Res() response) {

    try {
      const uploaded: any = await this.awsService.upload(file);
      if(uploaded.Location) {
        this.responseService = {
          result: uploaded.Location,
          status:  HttpStatus.CREATED,
          message: 'File uploaded successfully',
          error: null,
        }
      } else {
        this.responseService = {
          result: null,
          status:  HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'File upload failed',
          error: uploaded,
        }
      }
    } catch (error) {
      console.log(error)
      this.responseService = {
        result: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'File upload failed',
        error: error,
      }
    }

    if(this.responseService.status){
      response.status(this.responseService.status).send(this.responseService);
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.responseService);
    }
  }
}
