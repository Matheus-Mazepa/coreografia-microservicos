import { Producer } from 'kafkajs';
import { Repository } from 'typeorm';
import { LogsEntity } from './logs.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KafkaContext } from '@nestjs/microservices';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(LogsEntity)
    private logsRepository: Repository<LogsEntity>,
    @Inject('KAFKA_PRODUCER')
    private readonly kafkaProducer: Producer,
  ) {}

  async create(): Promise<LogsEntity> {
    const log = this.logsRepository.create(new LogsEntity());
    await this.logsRepository.save(log);
    this.kafkaProducer
      .send({
        topic: 'node-1',
        messages: [{ key: 'node-1', value: JSON.stringify(log) }],
      })
      .then(() => {
        console.log('Success');
      })
      .catch(() => {
        console.log('Failed');
      });

    return log;
  }

  async update(id: number, context: KafkaContext): Promise<void> {
    await this.logsRepository.update(id, {
      the_flow_has_ended: true,
    });

    const { offset } = context.getMessage();

    await context.getConsumer().commitOffsets([
      {
        topic: context.getTopic(),
        partition: context.getPartition(),
        offset: offset,
      },
    ]);
  }
}
