import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // obtener metadata de roles
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // si viene vacio dejar pasar (staff)
    if (!requiredRoles) return true;
    if (requiredRoles.length === 0) return true;

    // obtener el usuario en la request
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const userRoles: Role[] = user.roles;

    const hasRole =
      requiredRoles.filter((role) => user.role.incldues(role)).length > 0;

    if (!hasRole) throw new ForbiddenException('No autorizado');

    return true;
  }
}
