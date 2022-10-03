/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {UIButton} from '../../components';
import {Heading, Row, Text, View} from 'native-base';
import {colors} from '../../constants/colors';

import OTPTextInput from 'react-native-otp-textinput';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction, registerAction} from '../../redux/actions/login';
import styles from './styles';

function VerifyOtpScreen({route}) {
  let otpInput = useRef();
  const [otp, setOtp] = useState('');
  const [showError, setShowError] = useState(false);
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {login} = route.params;

  const loginReducer = useSelector((state: any) => state?.login);

  const setText = (val: any) => {
    setOtp(val);
  };

  const testFunc = () => {
    if (loginReducer?.otpData?.otp == otp) {
      dispatch(loginAction(loginReducer?.userRegisterData));
    } else {
      setShowError(true);
    }
  };

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [minutes, seconds]);

  return (
    <View flex={1}>
      <View backgroundColor="white" style={styles.shadowStyle}>
        <Row alignItems={'center'} py={4} px={6}>
          <Icon
            name="remove"
            size={20}
            color={colors.primary}
            onPress={() => navigation.goBack()}
          />
          <Heading ml={6}>{t('common.verification')}</Heading>
        </Row>
      </View>
      <View px={6}>
        <View mt={10}>
          <Text fontSize={16}>
            {t('common.codeSend')}
            <Text color={colors.third} fontWeight="bold">
              {loginReducer?.userRegisterData?.mobileNo}
            </Text>
          </Text>
        </View>

        <Row mt={10} justifyContent="space-between">
          <Text fontSize={20} fontWeight="bold">
            {t('common.enterCode')}
          </Text>

          <Text fontSize={16} color={colors.primary}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        </Row>

        <OTPTextInput
          ref={e => (otpInput = e)}
          handleTextChange={val => setText(val)}
          tintColor={colors.primary}
          containerStyle={{marginTop: 12}}
          textInputStyle={styles.textStyle}
        />

        {showError && (
          <Text fontSize={16} fontWeight="bold" color={colors.third}>
            Otp mismatched
          </Text>
        )}

        <View mt={12}>
          <UIButton
            // onPress={() => navigation.navigate('Home')}
            // onPress={() => console.log()}
            name={t('common.verify')}
            backgroundColor={colors.primary}
            onPress={testFunc}
          />
        </View>
      </View>
    </View>
  );
}

export default VerifyOtpScreen;
