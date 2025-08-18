export type ContactRequest = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  isAttended: boolean;
  status: string;
};

export type ContactResponse = {
  id: number; // usa string porque tu backend puede exceder MAX_SAFE_INTEGER
  fullName: string;
  email: string;
  phone: string;
  message: string;
  isAttended: boolean;
  status: string;
};
