import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import {Partitioners} from "kafkajs";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: process.env.NODE1_KAFKA_CLIENT_ID,
        brokers: [process.env.KAFKA_BROKER],
      },
      consumer: {
        groupId: process.env.NODE1_KAFKA_GROUP_ID,
      },
      producer: {
        createPartitioner: Partitioners.LegacyPartitioner,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
