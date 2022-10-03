import * as React from 'react';

export const navigationRef = React.createRef() as React.RefObject<any>;

export function navigate(name: string, params?: any): void {
  navigationRef.current?.navigate(name, params);
}
