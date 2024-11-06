export class ApiResponse<T> {
  success: boolean;
  status: number;
  message?: string;
  result?: T;

  constructor(success: boolean, status: number, message?: string, result?: T) {
    this.success = success;
    this.status = status;
    this.message = message;
    this.result = result;
  }
}

export class Goal {
  id: number;
  text: string;

  constructor(id: number, text: string) {
    this.id = id;
    this.text = text;
  }
}
