import { Injectable } from '@nestjs/common';
import {configService} from "./config/config.service";

@Injectable()
export class AppService {
  getHello(): string {
    return JSON.stringify(configService.getTypeOrmConfig());
  }
}
