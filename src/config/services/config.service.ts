import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  getDatabaseConfiguration():
    | Promise<TypeOrmModuleOptions>
    | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.get('DATABASE_URL'),
      entities: ['src/**/*.entity{.ts,.js}'],
      synchronize: true
    };
  }
}
