/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Pressable,
  Row,
  Image,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Column,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IonicIcon from 'react-native-vector-icons/Ionicons';

import Layout from '../../components/Layout/Layout';
import AppBar from '../../components/Layout/AppBar';
import {io} from 'socket.io-client';
import {colors} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {DoctorList} from '../../types/doctor/doctorList';

import {GiftedChat} from 'react-native-gifted-chat/lib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import realm, {Chat, User} from '../../model/db';
import {
  Dimensions,
  ListRenderItem,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
const {width, height} = Dimensions.get('window');

let socket: any;
function ChatScreen(props: any) {
  const [messages, setMessages] = useState<any>([]);
  const [userId, setUserId] = useState<any>('');

  const [msg, setMsg] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    async function getUserId() {
      const id = await AsyncStorage.getItem('id');

      console.log('USER ID ', id);
      console.log('SENDER ID ', props?.route?.params?._id);
      console.log('SENDER NAME ', props?.route?.params);
      setUserId(id);
      // setMessages([
      //   {
      //     _id: props?.route?.params?._id,
      //     text: 'Hello developer',
      //     createdAt: new Date(),
      //     user: {
      //       _id: userId,
      //       name: 'React Native',
      //       avatar: 'https://placeimg.com/140/140/any',
      //     },
      //   },
      // ]);
    }

    getUserId();

    // console.log('READ FROM REALM', cats);

    socket = io('http://54.179.177.236:4200', {transports: ['websocket']});
    console.log('Connecting socket...');

    if (socket) {
      socket.on('received', (received: any) => {
        //   socket.emit('received', received);
        console.log('received 111', received);
        // const findData = messages.find(
        //   (data: any) => data._id === received._id,
        // );
        // if (!findData) {

        setMessages([...messages, received]);

        // }
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [messages, props?.route?.params, props?.route?.params?._id]);

  useEffect(() => {
    // Realm.open({schema: [Chat, User], schemaVersion: 2}).then(realm => {
    //   const messagesFromDb = realm.objects('Chat');
    //   // setMessages([...messagesFromDb]);
    //   try {
    //     messagesFromDb.addListener(() => {
    //       // update state of tasks to the updated value
    //       setMessages(messagesFromDb);
    //     });
    //   } catch (error) {
    //     console.error(
    //       `Unable to update the tasks' state, an exception was thrown within the change listener: ${error}`,
    //     );
    //   }
    //   return () => {
    //     // Remember to remove the listener when you're done!
    //     messagesFromDb.removeAllListeners();
    //     // Call the close() method when done with a realm instance to avoid memory leaks.
    //     realm.close();
    //   };
    // });
    // const messagesFromDb = realm.objects('Chat');
    // try {
    //   messagesFromDb.addListener(() => {
    //     // update state of tasks to the updated value
    //     setMessages(messagesFromDb);
    //   });
    // } catch (error) {
    //   console.error(
    //     `Unable to update the tasks' state, an exception was thrown within the change listener: ${error}`,
    //   );
    // }
    // return () => {
    //   messagesFromDb.removeAllListeners();
    // };
  });
  const onSend = useCallback((messages: any[] = []) => {
    console.log('MESSAGE ', messages);
    // const message = {...messages[0], _id: props?.route?.params?._id};
    socket.emit('private_message', messages);
    // realm.write(() => {
    //   realm.create('Chat', {
    //     _id: messages[0]._id,
    //     text: messages[0].text,
    //     createdAt: messages[0].createdAt,
    //     user: {
    //       _id: messages[0].user._id,
    //       name: messages[0].user.name,
    //       avatar: messages[0].user.avatar,
    //     },
    //   });
    // });

    setMessages((previousMessages: any[]) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const _renderItem: ListRenderItem<any> = ({item}: any) => {
    if (item.receiver === userId) {
      return (
        <View>
          <View style={styles.eachMsg}>
            <View style={styles.msgBlock}>
              <Text style={styles.msgTxt}>{item.message}</Text>
            </View>
          </View>
          <Text style={{fontSize: 11, color: '#BDBDBD'}}>{item.createdAt}</Text>
        </View>
      );
    } else if (item.sender === userId) {
      return (
        <View alignItems={'flex-end'}>
          <View style={styles.rightMsg}>
            <View style={styles.rightBlock}>
              <Text style={styles.rightTxt}>{item.message}</Text>
            </View>
          </View>
          <Text style={{fontSize: 11, color: '#BDBDBD'}}>{item.createdAt}</Text>
        </View>
      );
    }
  };

  const sendMessage = () => {
    if (msg) {
      const message = {
        key: Math.floor(Math.random() * 1000000),
        sender: userId,
        receiver: props?.route?.params?._id,
        message: msg,
        createdAt: new Date(),
      };
      socket.emit('private_message', message);
      setMsg('');
    }
  };

  return (
    <Layout padding={0}>
      <View p={4}>
        <Row alignItems={'center'}>
          <Icon
            name="arrow-left"
            size={20}
            color={colors.primary}
            onPress={() => navigation.goBack()}
          />
          <View ml={6}>
            <View flexDirection={'row'}>
              <Image
                resizeMode="contain"
                borderRadius={100}
                source={{
                  width: 30,
                  height: 30,
                  // uri: props?.route?.params?.avatar,
                  uri: 'https://xsgames.co/randomusers/avatar.php?g=male',
                }}
                alt="img"
              />
              <Column ml={4}>
                <Text fontSize={18}>
                  {props?.route?.params?.firstname +
                    ' ' +
                    props?.route?.params?.lastname}
                </Text>
                <Text
                  style={
                    props?.route?.params?.status === 'Active'
                      ? {color: 'green'}
                      : {color: 'red'}
                  }>
                  {props?.route?.params?.status === 'Active'
                    ? 'Active'
                    : 'Offline'}
                </Text>
              </Column>
            </View>
          </View>

          <Pressable
            onPress={() => navigation.goBack()}
            style={{marginLeft: 'auto'}}>
            <Text color={colors.third} fontWeight="bold">
              END
            </Text>
          </Pressable>
        </Row>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboard}>
        <FlatList
          contentContainerStyle={styles.list}
          // extraData={this.state}
          data={messages}
          keyExtractor={(item: any) => {
            return item.id;
          }}
          renderItem={_renderItem}
          inverted
        />
        <View style={styles.input}>
          <TextInput
            style={{flex: 1, paddingLeft: 10}}
            value={msg}
            placeholderTextColor="grey"
            onChangeText={msg => setMsg(msg)}
            blurOnSubmit={true}
            onSubmitEditing={() => sendMessage()}
            placeholder="Tulis Pesan..."
            returnKeyType="send"
          />
          <Pressable
            style={{
              backgroundColor: colors.primary,
              padding: 10,
              borderRadius: 10,
              height: 40,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <IonicIcon
              name="send"
              color="grey"
              size={16}
              style={{
                color: 'white',
              }}
              onPress={() => sendMessage()}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      {/* <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: userId,
          }}
        /> */}
    </Layout>
  );
}
const styles = StyleSheet.create({
  list: {
    flexDirection: 'column-reverse',
  },
  keyboard: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 25,
    justifyContent: 'center',
  },
  image: {
    width,
    height,
  },
  header: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#075e54',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
  },
  chatTitle: {
    color: '#fff',
    fontWeight: '600',
    margin: 10,
    fontSize: 15,
  },
  chatImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  input: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    // padding: 10,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#F4F4F4',
    margin: 10,
  },
  eachMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
  },
  rightMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    alignSelf: 'flex-end',
  },
  userPic: {
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  msgBlock: {
    width: 220,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: colors.primary,
    padding: 10,
  },
  rightBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: colors.fourth,
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  msgTxt: {
    fontSize: 15,
    color: '#ffffff',
  },
  rightTxt: {
    fontSize: 15,
    color: '#202020',
  },
});

export default ChatScreen;
