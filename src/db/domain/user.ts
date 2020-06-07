export type User = {
  id: string; //uuid
  username: string;
  email: string | null;
  phone_number: number | null;
  fullname: string | null;
  password: string;
  email_confirmed: boolean;
  phone_number_confirmed: boolean;
  email_hash: string | null;
  otp_secret: string | null;
  created_at: Date;
  updated_at: Date;
};
