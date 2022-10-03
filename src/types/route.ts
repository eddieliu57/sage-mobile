import {DoctorList} from './doctor/doctorList';

export type StackParamList = {
  Login: undefined;
  HomeTab: undefined;
  Signup: undefined;
  Product: {id: number};
  ProductDetails: undefined;
  Cart: undefined;
  Shipping: undefined;
  AddressList: undefined | any;
  AddressForm: undefined | any;
  Chat: undefined | DoctorList;
  VerifyOtp: undefined;
};
