export interface Request {
  userId: string;
  sitterId: string;
  start: Date;
  end: Date;
  accepted: boolean;
  declined: boolean;
  paid: boolean;
}
