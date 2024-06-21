import {Module} from "@nestjs/common";
import { LabelModule } from './label/label.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {Label} from "./label/models/label.model";

@Module({


  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Label],
      autoLoadModels: true,
    }),
      LabelModule
  ]
})
export class AppModule {}