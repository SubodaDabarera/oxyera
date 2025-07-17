export class ApiResponse<T> {
  constructor(
    public statusCode: number,
    public message: string,
    public success: boolean,
    public data?: T,
  ) {}
}

export class ApiSuccessResponse<T> extends ApiResponse<T> {
  constructor(
    public message: string,
    public data?: T,
    public success: boolean = true,
    public statusCode: number = 200,
  ) {
      super(statusCode, message, success, data);
  }
}

export class ApiFailedResponse<T> extends ApiResponse<T>{
  constructor(
      public message: string,
      public data?: T,
      public success: boolean = false,
      public statusCode: number = 404,
  ) {
      super(statusCode, message, success, data);
  }
}
