import { Module } from '@nestjs/common';

import { DatabaseService } from '@modules/database/database.service';

import { FileController } from './file.controller';
import { FileService } from './file.service';
@Module({
  imports: [],
  controllers: [FileController],
  providers: [FileService, DatabaseService],
  exports: [FileService],
})
export class fileModule {}
