import { Model, Document } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';

import Responseable from 'src/utils/Ports/Responseable';
import User from 'src/modules/user/dto/user.dto';
import ObjInterface from 'src/modules/user/interfaces/user.interface';

//services
import { AppService } from 'src/app.service';

@Injectable()
export class UserService {
  constructor(private readonly utilService: AppService) {}

  getAll(model: Model<Document, {}>, aggregations: {}): Promise<Responseable> {
    return this.utilService.getAll(model, aggregations);
  }

  create(model: Model<Document, {}>, data: any, idUser: string): Promise<Responseable> {
    return this.utilService.save(data, model, model, idUser);
  }

  update(id: string, data: any, model: Model<Document, {}>, idUser: string): Promise<Responseable> {
    return this.utilService.update(id, data, model, model, idUser);
  }

  public async hashPassword(pass: string): Promise<string> {
    try {
      const passwordHashed = await hash(pass, 10);
      if (passwordHashed) return passwordHashed;
    } catch (error) {
      throw new Error(`No se pude encriptar tu contraseña. Error: ${error}`);
    }
  }

  public async isEnable(id: string, model: Model<Document, {}>): Promise<boolean> {
    let isEnable = false;
    const match = {
      _id: { $oid: id },
    };
    const limit = 1;
    const skip = 0;
    const aggregations = {
      match,
      limit,
      skip,
    };

    const responseService = await this.utilService.getAll(model, aggregations);

    if (responseService.result) {
      const user: ObjInterface = responseService.result;
      if (user.enabled) {
        isEnable = true;
      } else {
        isEnable = false;
      }
    }
    return isEnable;
  }

  public async isMatch(loginPass: string, userPass: string): Promise<boolean> {
    return await compare(loginPass, userPass);
  }

  public async getUserByEmail(
    email: string,
    model: Model<Document, {}>,
    permissionModel: Model<Document, {}>,
  ): Promise<Responseable> {
    const aggregations = {
      match: { email: email, operationType: { $ne: 'D' } },
      limit: 1,
      skip: 0,
    };
    return this.utilService.getAll(model, aggregations);
  }

  public async existUserWithThatEmail(email: string, model: Model<Document, {}>): Promise<boolean> {
    const aggregations = {
      match: { email: email, operationType: { $ne: 'D' } },
      limit: 0,
      skip: 0,
    };

    let exist = false;
    const responseService = await this.utilService.getAll(model, aggregations);

    if (Object.entries(responseService.result).length > 0) {
      exist = true;
    } else {
      exist = false;
    }

    return exist;
  }
}
