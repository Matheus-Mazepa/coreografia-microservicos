import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsModule } from './logs/logs.module';
import { HealthModule } from './health/health.module';

const port = process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: port,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE_NODE1,
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    LogsModule,
    HealthModule,
  ],
})
export class AppModule {}
