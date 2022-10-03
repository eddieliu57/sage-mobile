export enum ActionTypes {
  ADD_TO_CART = 'ADD_TO_CART',
  CART_ITEMS = 'CART_ITEMS',
}

export type cartAction = {
  type: ActionTypes.ADD_TO_CART | ActionTypes.CART_ITEMS;
  payload: any;
};
