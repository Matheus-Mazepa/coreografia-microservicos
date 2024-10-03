import { Module } from '@nestjs/common';
import { LogsEntity } from './logs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partitioners, Producer } from 'kafkajs';
import { LogsController } from './logs.controller';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { LogsService } from './logs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LogsEntity]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: process.env.NODE01_KAFKA_CLIENT_ID,
            brokers: [process.env.KAFKA_BROKER],
          },
          consumer: {
            groupId: process.env.NODE01_KAFKA_GROUP_ID,
          },
          producer: {
            createPartitioner: Partitioners.LegacyPartitioner,
          },
        },
      },
    ]),
  ],
  controllers: [LogsController],
  providers: [
    LogsService,
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: async (kafkaClient: ClientKafka): Promise<Producer> => {
        return kafkaClient.connect();
      },
      inject: ['KAFKA_SERVICE'],
    },
  ],
})
export class LogsModule {}
