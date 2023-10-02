import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule.forRoot({isGlobal:true })],
    inject:[ConfigService],
    useFactory:async (configServive:ConfigService)=>({
      type:"postgres",
      database:configServive.get("DATABASE_NAME"),
      password:configServive.get("DATABASE_PASSWORD"),

      entities:[__dirname + '/../**/*.entity.{js,ts}'],
      autoLoadEntities:true,
      synchronize:true,
      logging:true,

    })
  })
],
  
})
export class AppModule {}
