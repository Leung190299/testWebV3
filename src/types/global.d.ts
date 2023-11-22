import React from 'react';
import { Connector } from '@pit-ui/modules/database-ver2';
import { ModalRenderProps } from '@pit-ui/modules/modal/type';

declare module 'react' {
  interface HTMLAttributes<T> {
    'data-theme'?: 'dark' | 'light';
  }
}

declare module '@pit-ui/modules/modal/type' {
  export type ModalRenderProps<T = unknown> = {
    close(): void;
    done(data: T): void | Promise<any>;
  };
}
declare global {
  interface Window {
    __settings: HTMLElement;
    __next: HTMLElement;
    __modals: HTMLElement;
    __tooltip: HTMLElement;

    dbConnector: Connector;
  }
  var __settings: HTMLElement;
  var __next: HTMLElement;
  var __modals: HTMLElement;
  var __tooltip: HTMLElement;

  var dbConnector: Connector;
}
