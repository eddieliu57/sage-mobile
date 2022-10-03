// import {DefaultEventsMap} from '@socket.io/component-emitter';
// import {io, Socket} from 'socket.io-client';

// let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

// export const initiateSocketConnection = () => {
//   socket = io('http://54.179.177.236:4200');
//   console.log('Connecting socket...');
// };
// export const disconnectSocket = () => {
//   console.log('Disconnecting socket...');
//   if (socket) {
//     socket.disconnect();
//   }
// };

// export const subscribeToChat = (data: any, cb?: any) => {
//   socket.emit('private_message', data);
//   socket.on('my broadcast', msg => {
//     return cb(null, msg);
//   });
// };

// export const receiveData = (data: any) => {
//   if (socket) {
//     socket.on('received', received => {
//       //   socket.emit('received', received);
//       console.log('data received ', received);
//       return received;
//     });
//   }
// };
