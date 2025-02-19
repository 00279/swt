import {
  createEvent,
  createStore,
  EventCallable,
  sample,
  StoreWritable,
} from 'effector';
import { persist } from 'effector-storage/local';
import { ChangeEvent } from 'react';

export type CreateInput = {
  name: string;
  initialValue: unknown;
  isPersisted?: boolean;
};
export type CreateSelect = CreateInput;
export type CreateSwitch = CreateInput;
type CreateControl = CreateInput & {
  selector: (clk: ChangeEvent) => any;
};

export const createInput = (args: CreateInput) =>
  createControl({ ...args, selector: (event) => event.target.value });

export const createSelect = (args: CreateSelect) =>
  createControl({ ...args, selector: (event) => event.target.value });

export const createSwitch = (args: CreateSwitch) =>
  createControl({ ...args, selector: (event) => event.target.checked });

export const createControl = ({
  name,
  initialValue,
  selector,
  isPersisted,
}: CreateControl): [
  StoreWritable<unknown>,
  EventCallable<ChangeEvent<Element>>
] => {
  const $value = createStore(initialValue);
  const changeValue = createEvent<ChangeEvent>();

  if (isPersisted) {
    persist({ store: $value, key: name });
  }

  sample({
    clock: changeValue,
    fn: selector,
    target: $value,
  });

  return [$value, changeValue];
};
