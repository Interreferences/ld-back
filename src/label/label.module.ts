import { Module } from '@nestjs/common';
import { LabelController } from './label.controller';
import { LabelService } from './label.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Label} from "./models/label.model";

@Module({
  controllers: [LabelController],
  providers: [LabelService],
  imports: [
    SequelizeModule.forFeature([Label])
  ],
})
export class LabelModule {}
