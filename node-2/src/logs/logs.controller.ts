import { Controller } from '@nestjs/common';
import { LogsService } from './logs.service';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

@Controller('/master')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @MessagePattern('node-2')
  async consumer(
    @Payload() message: { initial_log: number },
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    if (message.initial_log) {
      await this.logsService.create(message?.initial_log, context);
    }
  }
}
