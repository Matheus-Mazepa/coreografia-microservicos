import { Producer } from 'kafkajs';
import { Repository } from 'typeorm';
import { LogsEntity } from './logs.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(LogsEntity)
    private logsRepository: Repository<LogsEntity>,
    @Inject('KAFKA_PRODUCER')
    private readonly kafkaProducer: Producer,
  ) {}

  async create(id: number): Promise<LogsEntity> {
    const log = this.logsRepository.create({initial_log: id});
    await this.logsRepository.save(log);
    this.kafkaProducer
      .send({
        topic: 'node-2',
        messages: [
          { key: 'node-2', value: JSON.stringify(log) },
        ],
      })
      .then(() => {
        console.log('Success');
      })
      .catch(() => {
        console.log('Failed');
      });

    return log;
  }
}
