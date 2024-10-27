import { Controller } from '@nestjs/common';
import { LogsService } from './logs.service';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsEntity } from './logs.entity';
import { Repository } from 'typeorm';

@Controller('/master')
export class LogsController {
  constructor(
    @InjectRepository(LogsEntity)
    private logsRepository: Repository<LogsEntity>,
    private readonly logsService: LogsService,
  ) {}

  @MessagePattern('node-1')
  async consumer(
    @Payload() message: { id: number },
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    if (message.id) {
      await this.logsService.create(message?.id, context);
    }
  }
}
