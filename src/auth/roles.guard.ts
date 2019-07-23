import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { User } from '@nest-experiment/users/user.entity';
import { UserRolesService } from '@nest-experiment/user-roles/user-roles.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles || roles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    if (user) {
      console.log('User roles', user.roles);
    }
    return true;
    // return (
    //   user && user.roles && user.roles.some(role => roles.includes(role.role))
    // );
  }
}
