export type UserType = {
  _id: string;
  email: string;
  token: string;
  username: string;
};
export type LoginReducerType = {
  isLoading: boolean;
  user: UserType;
  userRegisterData: any;
  otpData: any;
  token: string | null;
  signupError: string;
  userCreated: boolean;
};
