import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { UsersService } from "../../users/users.service";

import { Roles } from "../../roles/roles.enum";

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext) {

    const request = context.switchToHttp().getRequest();

    const { username } = request.user

    const user = await this.usersService.findOne(username);

    return user.role == Roles.ADMIN || user.role == Roles.USER;

  }

}
