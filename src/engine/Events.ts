import { GameObject } from './GameObject';

class Events {
  callbacks: {
    id: number;
    eventName: string;
    caller: GameObject;
    callback: (value?: any) => void;
  }[] = [];
  nextId = 0;

  // emit event
  emit(eventName: string, value?: any) {
    this.callbacks.forEach((callback) => {
      if (callback.eventName === eventName) {
        callback.callback(value);
      }
    });
  }

  // subscribe to something happening
  on(eventName: string, caller: GameObject, callback: (value?: any) => void) {
    this.nextId += 1;
    this.callbacks.push({ id: this.nextId, eventName, caller, callback });
    return this.nextId;
  }

  // remove the subscription
  off(id: number) {
    this.callbacks = this.callbacks.filter((callback) => callback.id !== id);
  }

  unsubscribe(caller: GameObject) {
    this.callbacks = this.callbacks.filter(
      (callback) => callback.caller !== caller
    );
  }
}

export const events = new Events();
