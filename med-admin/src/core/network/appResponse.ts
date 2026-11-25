// src/core/api/appResponse.ts

export class AppResponse<T = any> {
  readonly data: T;
  readonly statusCode: number;
  readonly headers?: any;
  readonly fetchedAt: Date;

  constructor({ data, statusCode, headers }: { data: T; statusCode: number; headers?: any }) {
    this.data = data;
    this.statusCode = statusCode;
    this.headers = headers;
    this.fetchedAt = new Date();
    console.log(data);
  }
}