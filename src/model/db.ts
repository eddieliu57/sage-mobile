/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Realm from 'realm';

// class User {
//   public _id: string = '';
//   public name: string = '';
//   public avatar: string = '';
//   public static schema: Realm.ObjectSchema = {
//     name: 'User',
//     primaryKey: '_id',
//     properties: {
//       _id: 'objectId',
//       name: 'string?',
//       avatar: 'string?',
//     },
//   };
// }

// class Chat {
//   public _id: string = '';
//   public text: string = '';
//   public createdAt = new Date();
//   public user!: Realm.Results<User>;
//   public avatar?: string = '';
//   public static schema: Realm.ObjectSchema = {
//     name: 'Chat',
//     primaryKey: '_id',
//     properties: {
//       _id: 'objectId',
//       text: 'string',
//       createdAt: 'string',
//       user: 'User?',
//     },
//   };
// }

export const User = {
  name: 'User',
  properties: {
    _id: 'string',
    name: 'string?',
    avatar: 'string?',
  },
};
export const Chat = {
  name: 'Chat',
  properties: {
    _id: 'string',
    text: 'string',
    createdAt: {type: 'date', default: new Date()},
    user: {type: 'User', optional: true},
  },
};

// Create realm
let realm = new Realm({schema: [Chat, User], schemaVersion: 2});

// Export the realm
export default realm;
