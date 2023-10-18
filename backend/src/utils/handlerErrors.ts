import {
  NotFoundException,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { messagesEnum } from './handlerMsg';

export const not_found_err = (msg: messagesEnum, desc: string) => {
  throw new NotFoundException(msg, {
    cause: new Error(msg),
    description: desc,
  });
};

export const conflict_err = (msg: messagesEnum, desc: string) => {
  throw new ConflictException(msg, {
    cause: new Error(msg),
    description: desc,
  });
};

export const bad_req_err = (msg: messagesEnum, desc: string) => {
  throw new BadRequestException(msg, {
    cause: new Error(msg),
    description: desc,
  });
};

export const unauth_err = (msg: messagesEnum, desc: string) => {
  throw new UnauthorizedException(msg, {
    cause: new Error(msg),
    description: desc,
  });
};
