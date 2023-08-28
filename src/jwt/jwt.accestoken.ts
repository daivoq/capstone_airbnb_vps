import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AccessToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const headers = request.headers;
    const authorizationHeader = headers?.authorization;

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1]; // Lấy phần token sau từ "Bearer <token>"
      return token;
    }
    return null; // Trả về giá trị mặc định.
  },
);
