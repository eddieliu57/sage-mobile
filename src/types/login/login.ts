export type LoginScreenType = {
  email: string;
  password: string;
};

export type SignupScreenType = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  countryCode: string;
  mobileNo: string;
  gender: number | string;
};

export type OtpType = {
  mobile_no: string;
  country_code: string;
};
