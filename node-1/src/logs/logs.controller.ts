import { Controller } from '@nestjs/common';
import { LogsService } from './logs.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {InjectRepository} from "@nestjs/typeorm";
import {LogsEntity} from "./logs.entity";
import {Repository} from "typeorm";

@Controller('/master')
export class LogsController {
  constructor(
      @InjectRepository(LogsEntity)
      private logsRepository: Repository<LogsEntity>,
      private readonly logsService: LogsService
  ) {}

  @MessagePattern('node-1')
  async consumer(@Payload() message: {id: number}): Promise<void> {
    if (message.id) {
      await this.logsService.create(message?.id);
    }
  }
}
