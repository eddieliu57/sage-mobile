import React, {useEffect, useRef, useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {UIButton, UIInput} from '../../components';
import {
  Column,
  Image,
  Modal,
  Pressable,
  Row,
  Spinner,
  Text,
  View,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useTranslation} from 'react-i18next';
import {colors} from '../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {clearRegistrationState, sendOtp} from '../../redux/actions/login';
// import {LoginScreenType} from '../../types/login/login';
import {useNavigation} from '@react-navigation/native';
import CountryPicker from 'react-native-country-codes-picker';
import {debounce} from 'lodash';
import axios from 'axios';
import {API_URL} from '../../constants/config';

const image = require('../../assets/login.png');
// type homeScreenProp = NativeStackNavigationProp<StackParamList, 'Home'>;

function LoginScreen() {
  // const [form, setForm] = useState<LoginScreenType>({
  //   email: 'alex1@dilraj.com',
  //   password: '123456',
  // });
  const [phoneNumber, setPhoneNumber] = useState<string>();
  // const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+62');
  const [uniqueNo, setUniqueNo] = useState<boolean>(false);

  const dispatch = useDispatch();
  const {t} = useTranslation();
  const navigation = useNavigation<any>();

  // const image = require('../../assets/login.png');

  const data = useSelector((state: any) => state?.login);
  // const debounced = useRef(debounce(newValue => checkOtp(newValue), 1000));
  // // useEffect(() => debounced.current(phoneNumber), [phoneNumber]);

  const checkOtp = async () => {
    if (phoneNumber && countryCode) {
      const mainResp = await axios.post(
        `${API_URL}auth/checkMobileNoUniqueness`,
        {
          mobile_no: phoneNumber,
        },
      );

      if (mainResp.status === 200) {
        if (mainResp.data?.code === 1000) {
          setUniqueNo(true);
          return true;
        } else {
          setUniqueNo(false);
          return false;
        }
        // setDoctorsList(response.data);
      }
    }
  };
  const login = async () => {
    const otpData = await checkOtp();

    if (!otpData) {
      const formData = {
        mobileNo: phoneNumber,
        countryCode: countryCode,
      };
      dispatch(sendOtp(formData, true));
    }
  };

  useEffect(() => {
    dispatch(clearRegistrationState());
  }, [dispatch]);

  const phoneNumberChange = (value: string) => {
    // if (value === '') {
    //   setShow(false);
    // } else {
    //   setShow(true);
    // }

    setPhoneNumber(value);
  };

  return (
    <View flex={1}>
      <LinearGradient
        colors={[colors.third, colors.primary]}
        start={{x: 1, y: 0}}
        style={styles.gradientStyle}>
        <Image style={styles.image} source={image} alt="img" mt={16} />
        <Column mt={6}>
          <Text fontSize={28} fontWeight="bold" color="white">
            {t('login.welcomeText')}
          </Text>
          <Text fontSize={22} color="white">
            {t('login.welcomeDescription')}
          </Text>
        </Column>
      </LinearGradient>
      <View padding={4} backgroundColor="red">
        <View>
          <UIInput
            label={t('login.loginText')}
            placeholder={t('login.loginPlaceholder')}
            value={phoneNumber}
            onChangeText={text => phoneNumberChange(text)}
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
          {uniqueNo && (
            <Text color={colors.third} fontWeight="bold">
              Mobile number is not registered with Sage App
            </Text>
          )}

          {data?.isLoading && (
            <Modal isOpen={true}>
              <Modal.Content
                maxWidth={100}
                height={100}
                justifyContent="center">
                <Spinner size={'lg'} />
              </Modal.Content>
            </Modal>
          )}
        </View>
        {/* {!show && (
          <View>
            <UIInput
              label={t('signup.email')}
              placeholder={t('signup.emailPlaceholder')}
              value={form.email}
              onChangeText={text => setForm({...form, email: text})}
            />

            <UIInput
              label={t('signup.password')}
              placeholder={t('signup.passwordPlaceholder')}
              value={form.password}
              onChangeText={text => setForm({...form, password: text})}
            />
          </View>
        )} */}

        <Row mt={4} justifyContent="center">
          <Text fontSize={16}> {t('login.helpText')}</Text>
          <Pressable>
            <Text color={colors.third} fontSize={16} fontWeight="bold">
              {t('login.helpTextLink')}
            </Text>
          </Pressable>
        </Row>

        <View mt={6}>
          <UIButton
            name={t('login.loginButton')}
            onPress={() => login()}
            backgroundColor={colors.primary}
          />
        </View>
      </View>

      <View flex={1} justifyContent="flex-end" mb={10} alignItems="center">
        <Row>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text color={colors.third} fontSize={16} fontWeight="bold">
              {t('login.loginAs')}
            </Text>
          </Pressable>
        </Row>
      </View>

      <View>
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
    </View>
  );
}

export default LoginScreen;
