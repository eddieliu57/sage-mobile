export enum ActionTypes {
  ADD_DEFAULT_ADDRESS = 'ADD_DEFAULT_ADDRESS',
}

export type addressAction = {
  type: ActionTypes.ADD_DEFAULT_ADDRESS;
  payload?: any;
};
