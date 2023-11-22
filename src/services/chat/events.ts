import EventEmitter from 'events';

export enum Event {
  Open = 'open',
  Close = 'close',
  Data = 'data',
  Message = 'message'
}

const emitter = new EventEmitter();
export function openChat() {
  emitter.emit(Event.Open);
}
export function addMessage(message: string, extraData?: { sender?: string }) {
  emitter.emit(Event.Message, message, extraData);
}
export const messageListener = <T extends AnyVoidFunction>(eventName: Event, fn: T) => {
  emitter.on(eventName, fn);
  return () => {
    emitter.off(eventName, fn);
  };
};
export { emitter };
