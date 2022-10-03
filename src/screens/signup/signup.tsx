import * as React from 'react';

import {ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {Layout, UIButton, UIInput} from '../../components';
import {
  Box,
  Column,
  FormControl,
  Heading,
  Image,
  Radio,
  Row,
  Stack,
  Text,
  Pressable,
  View,
  Modal,
} from 'native-base';
import {colors, textColors} from '../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearRegistrationState,
  registerAction,
} from '../../redux/actions/login';
import CountryPicker from 'react-native-country-codes-picker';
import {API_URL} from '../../constants/config';
import axios from 'axios';

// type homeScreenProp = NativeStackNavigationProp<StackParamList, 'Home'>;

function SignupScreen() {
  const [form, setForm] = React.useState<any>({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    mobileNo: '',
    gender: '1',
  });
  const [show, setShow] = React.useState(false);
  const [countryCode, setCountryCode] = React.useState('+62');
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [uniqueNo, setUniqueNo] = React.useState<boolean>(false);
  const [uniqueEmail, setUniqueEmail] = React.useState<boolean>(false);

  // const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const data = useSelector((state: any) => state?.login);
  const image = require('../../assets/login.png');

  const login = async () => {
    if (
      form.firstname &&
      form.lastname &&
      form.username &&
      form.email &&
      form.password &&
      form.mobileNo &&
      countryCode
    ) {
      const formData = {
        ...form,
        gender: parseInt(form.gender, 10),
        mobile_no: form.mobileNo,
        countryCode: countryCode,
      };
      const resp2 = await checkEmail();
      const resp1 = await checkMobile();
      // validateData()

      console.log(resp2);
      if (resp1 && resp2) {
        dispatch(registerAction(formData));
      }
    }
  };

  // React.useEffect(() => {
  //   return () => {
  //     dispatch(clearRegistrationState());
  //   };
  // });

  // const validateData = () => {
  //   if (form.firstname === undefined || form.firstname === '') {
  //     setErrors({...errors, firstname: 'Name is required'});
  //     return false;
  //   } else if (form.lastname === undefined || form.lastname === '') {
  //     setErrors({...errors, name: 'Name is too short'});
  //     return false;
  //   }

  //   return true;
  // };

  // const validate = text => {
  //   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  //   if (reg.test(text) === false) {
  //     console.log('Email is Not Correct');
  //     setFormError({...formError, email: true});
  //     return false;
  //   } else {
  //     setForm({...form, email: text});
  //     console.log('Email is Correct');
  //   }
  // };

  const checkMobile = async () => {
    if (form.mobileNo && countryCode) {
      const mainResp = await axios.post(
        `${API_URL}auth/checkMobileNoUniqueness`,
        {
          mobile_no: form.mobileNo,
        },
      );

      if (mainResp.status === 200) {
        if (mainResp.data?.code === 1000) {
          setUniqueNo(false);
          return true;
        } else {
          setUniqueNo(true);
          return false;
        }
      }
    }
  };
  const checkEmail = async () => {
    if (form.email) {
      const mainResp = await axios.post(`${API_URL}auth/checkEmailUniqueness`, {
        email: form.email,
      });
      console.log('RESP ', mainResp);
      if (mainResp.status === 200) {
        if (mainResp.data?.code === 1000) {
          setUniqueEmail(false);
          return true;
        } else {
          setUniqueEmail(true);
          return false;
        }
      }
    }
  };

  return (
    <Layout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Box>
          <Image style={styles.image} source={image} alt="img" />
        </Box>

        <Column>
          <Heading mb={6}>{t('signup.register')}</Heading>
        </Column>

        <View flex={1}>
          <FormControl mb={6}>
            <Stack space={4}>
              <Row justifyContent={'space-between'}>
                <UIInput
                  isRequired
                  stackWidth={'45%'}
                  label={t('signup.firstName')}
                  placeholder={t('signup.firstNamePlaceholder')}
                  value={form.firstname}
                  maxLength={20}
                  onChangeText={text => setForm({...form, firstname: text})}
                />
                <UIInput
                  isRequired
                  stackWidth={'45%'}
                  label={t('signup.lastName')}
                  placeholder={t('signup.lastNamePlaceholder')}
                  value={form.lastname}
                  maxLength={20}
                  onChangeText={text => setForm({...form, lastname: text})}
                />
              </Row>

              <UIInput
                isRequired
                label={t('signup.username')}
                placeholder={t('signup.usernamePlaceholder')}
                value={form.username}
                maxLength={20}
                onChangeText={text => setForm({...form, username: text})}
              />

              <UIInput
                isRequired
                label={t('signup.email')}
                placeholder={t('signup.emailPlaceholder')}
                value={form.email}
                maxLength={30}
                onChangeText={text => setForm({...form, email: text})}
              />

              <UIInput
                isRequired
                label={t('signup.password')}
                placeholder={t('signup.passwordPlaceholder')}
                secureTextEntry={passwordVisible ? false : true}
                value={form.password}
                maxLength={20}
                onChangeText={text => setForm({...form, password: text})}
                rightElement={
                  <Icon
                    name={passwordVisible ? 'eye' : 'eye-slash'}
                    color={textColors.third}
                    size={22}
                    style={{marginRight: 8}}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  />
                }
              />

              <UIInput
                isRequired
                label={t('signup.mobileNumber')}
                placeholder={t('signup.mobileNumber')}
                value={form.mobileNo}
                onChangeText={text => setForm({...form, mobileNo: text})}
                maxLength={12}
                keyboardType="numeric"
                leftElement={
                  <Pressable
                    onPress={() => setShow(true)}
                    padding={2}
                    borderRightWidth={1}
                    borderRightColor="grey">
                    <Row justifyContent={'center'} alignItems="center">
                      <Text fontSize={16}>{countryCode}</Text>
                      <Icon
                        name="angle-down"
                        size={22}
                        color="grey"
                        style={{marginLeft: 10}}
                      />
                    </Row>
                  </Pressable>
                }
              />

              <Text>{t('signup.gender')}</Text>
              <Radio.Group
                name="exampleGroup"
                defaultValue="1"
                accessibilityLabel="pick a gender">
                <Stack
                  direction={{
                    base: 'row',
                    md: 'row',
                  }}
                  space={8}>
                  <Radio value="1" colorScheme="green" size="sm" my={1}>
                    Laki -Laki
                  </Radio>
                  <Radio value="2" colorScheme="green" size="sm" my={1}>
                    Perempuan
                  </Radio>
                </Stack>
              </Radio.Group>
            </Stack>
          </FormControl>

          {uniqueEmail && (
            <Text color={colors.third} fontWeight="bold">
              Email already in use
            </Text>
          )}
          {uniqueNo && (
            <Text color={colors.third} fontWeight="bold">
              Mobile Number already in use
            </Text>
          )}

          {data?.userCreated && (
            <Text color={colors.primary} fontWeight="bold" mb={2}>
              User Created Successfully
            </Text>
          )}

          <UIButton
            // onPress={() => navigation.navigate('Home')}
            onPress={() => login()}
            name={t('signup.register')}
            backgroundColor={colors.primary}
          />
        </View>

        {/* {data?.userCreated && (
          <Modal isOpen={true}>
            <Modal.Content maxWidth={200} height={100} justifyContent="center">
              <Text>User Created Successfully</Text>
             
            </Modal.Content>
          </Modal>
        )} */}
        {/* </View>

        {/* <Divider />
        <Row space={3} mt={2} justifyContent="center">
          <Text fontSize={16}>{t('login.noAccount')}</Text>
          <Pressable>
            <Text fontSize={16} color={colors.primary}>
              {t('login.signUpNow')}
            </Text>
          </Pressable>
        </Row> */}
      </ScrollView>
      <View style={{flex: 1}}>
        <CountryPicker
          show={show}
          // when picker button press you will get the country object with dial code
          pickerButtonOnPress={(item: any) => {
            setCountryCode(item.dial_code);
            setShow(false);
          }}
          style={{
            modal: {
              height: 500,
            },
            backdrop: {
              backgroundColor: '#00000080',
            },
          }}
        />
      </View>
    </Layout>
  );
}

export default SignupScreen;
