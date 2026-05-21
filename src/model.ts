import {
  createWidget as createWidget035,
  WidgetParams as WidgetParams035,
} from 'spay-0.3.5';
import { createWidget as createWidget037 } from 'spay-0.3.7';
import {
  createWidget as createWidget041,
  WidgetParams as WidgetParams041,
} from 'spay-0.4.1';
import {
  createWidget as createWidget051,
  WidgetParams as WidgetParams051,
} from 'spay-0.5.1';
import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
  split,
} from 'effector';
import { ChangeEvent } from 'react';
import { persist } from 'effector-storage/local';
import { prepareTimeout } from './lib/prepare-timeout';
import { createInput, createSwitch } from './lib/create-input';
import { p } from 'framer-motion/client';

type TargetTypes = 'IFT' | 'UAT' | 'PRODUCTION';
type LibraryVersions = '035' | '037' | '041' | '051';
const changeOrderId = createEvent<ChangeEvent<HTMLInputElement>>();
const changeBackUrl = createEvent<ChangeEvent<HTMLInputElement>>();
const changeIsEmbedded = createEvent<ChangeEvent<HTMLInputElement>>();
const changeIsFinishPage = createEvent<ChangeEvent<HTMLInputElement>>();
const changeFinishPageTimeOut = createEvent<ChangeEvent<HTMLInputElement>>();
const changeTarget = createEvent<ChangeEvent<HTMLSelectElement>>();
const changeLibraryVersion = createEvent<ChangeEvent<HTMLSelectElement>>();
const changeUserName = createEvent<ChangeEvent<HTMLInputElement>>();
const changeBindingId = createEvent<ChangeEvent<HTMLInputElement>>();

const [$method, changeMethod] = createInput({
  name: 'method',
  initialValue: 'open',
});

const [$phone, changePhone] = createInput({
  name: 'phone',
  initialValue: '',
});

const [$isPhoneChangeDisabled, changeIsPhoneChangeDisabled] = createSwitch({
  name: 'isPhoneChangeDisabled',
  initialValue: false,
});

const pay = createEvent();
const payByBinding = createEvent();

const $orderId = createStore('');
const $backUrl = createStore('');
const $isEmbedded = createStore(true);
const $isFinishPage = createStore(true);
const $finishPageTimeOut = createStore('');
const $target = createStore<TargetTypes>('IFT');
const $libraryVersion = createStore<LibraryVersions>('035');
const $userName = createStore('');
const $bindingId = createStore('');

persist({ store: $target, key: 'target' });
persist({ store: $isEmbedded, key: 'isEmbedded' });
persist({ store: $backUrl, key: 'backUrl' });
persist({ store: $libraryVersion, key: 'libraryVersion' });

sample({
  clock: changeOrderId,
  fn: (event) => event.target.value,
  target: $orderId,
});

sample({
  clock: changeBackUrl,
  fn: (event) => event.target.value,
  target: $backUrl,
});

sample({
  clock: changeUserName,
  fn: (event) => event.target.value,
  target: $userName,
});

sample({
  clock: changeBindingId,
  fn: (event) => event.target.value,
  target: $bindingId,
});

sample({
  clock: changeIsEmbedded,
  fn: (event) => event.target.checked,
  target: $isEmbedded,
});

sample({
  clock: changeIsFinishPage,
  fn: (event) => event.target.checked,
  target: $isFinishPage,
});

sample({
  clock: changeFinishPageTimeOut,
  fn: (event) => event.target.value,
  target: $finishPageTimeOut,
});

sample({
  clock: changeTarget,
  fn: (event) => event.target.value as TargetTypes,
  target: $target,
});

sample({
  clock: changeLibraryVersion,
  fn: (event) => event.target.value as LibraryVersions,
  target: $libraryVersion,
});

const widgetMap = {
  '035': createWidget035,
  '037': createWidget037,
  '041': createWidget041,
  '051': createWidget051,
};

const createWidgetBaseFx = createEffect(
  ({
    target,
    libraryVersion,
  }: {
    target: TargetTypes;
    libraryVersion: LibraryVersions;
  }) => widgetMap[libraryVersion](target),
);

const createWidgetByBindingFx = attach({
  effect: createWidgetBaseFx,
});

const createWidgetFx = attach({
  effect: createWidgetBaseFx,
});

sample({
  clock: payByBinding,
  source: { target: $target, libraryVersion: $libraryVersion },
  target: createWidgetByBindingFx,
});

type SberpayWidgetParams = WidgetParams035 &
  WidgetParams041 & { isEmbedded: boolean } & WidgetParams051;
type SberpayWidget = {
  open: (
    params: SberpayWidgetParams,
  ) => Promise<'success' | 'return' | 'cancel'>;
  close?: () => void;
};

type OpenWidgetFxParams = {
  widget: SberpayWidget;
  orderId: string;
  backUrl: string;
  isEmbedded: boolean;
  isFinishPage: boolean;
  finishPageTimeOut: any;
};

type WidgetParams = Omit<
  OpenWidgetFxParams,
  'orderId' | 'widget' | 'finishPageTimeOut'
> & {
  bankInvoiceId: string;
  finishPageTimeOut?: number;
};

const openWidgetFx = createEffect(
  ({
    widget,
    orderId,
    backUrl,
    isEmbedded,
    isFinishPage,
    finishPageTimeOut,
    phone,
    isPhoneChangeDisabled,
  }: OpenWidgetFxParams) => {
    const parameters: WidgetParams = {
      bankInvoiceId: orderId,
      backUrl,
      isEmbedded,
      isFinishPage,
      isPhoneChangeDisabled,
    };

    const timeOut = prepareTimeout(finishPageTimeOut);
    if (Number.isInteger(timeOut)) {
      parameters.finishPageTimeOut = timeOut;
    }
    if (phone) {
      parameters.phone = phone;
    }
    console.table(parameters);
    widget.open(parameters);
  },
);

const openWidgetByBindingFx = createEffect(
  ({
    widget,
    orderId,
    backUrl,
    isEmbedded,
    isFinishPage,
    finishPageTimeOut,
    bindingId,
    userName,
    phone,
    isPhoneChangeDisabled,
  }: OpenWidgetFxParams) => {
    const parameters: WidgetParams = {
      bankInvoiceId: orderId,
      backUrl,
      isEmbedded,
      isFinishPage,
      phone,
      isPhoneChangeDisabled,
    };

    const timeOut = prepareTimeout(finishPageTimeOut);
    if (Number.isInteger(timeOut)) {
      parameters.finishPageTimeOut = timeOut;
    }
    if (userName) {
      parameters.userName = userName;
    }
    if (bindingId) {
      parameters.bindingId = bindingId;
    }
    if (phone) {
      parameters.phone = phone;
    }
    console.table(parameters);
    widget.openBoundCardPayment(parameters);
  },
);

sample({
  clock: createWidgetByBindingFx.doneData,
  source: {
    orderId: $orderId,
    backUrl: $backUrl,
    isEmbedded: $isEmbedded,
    isFinishPage: $isFinishPage,
    finishPageTimeOut: $finishPageTimeOut,
    bindingId: $bindingId,
    userName: $userName,
    phone: $phone,
    isPhoneChangeDisabled: $isPhoneChangeDisabled,
  },
  fn: (
    {
      orderId,
      backUrl,
      isEmbedded,
      isFinishPage,
      finishPageTimeOut,
      bindingId,
      userName,
      phone,
      isPhoneChangeDisabled,
    },
    widget,
  ) => ({
    widget,
    orderId,
    backUrl,
    isEmbedded,
    isFinishPage,
    finishPageTimeOut,
    bindingId,
    userName,
    phone,
    isPhoneChangeDisabled,
  }),
  target: openWidgetByBindingFx,
});

sample({
  clock: createWidgetFx.doneData,
  source: {
    orderId: $orderId,
    backUrl: $backUrl,
    isEmbedded: $isEmbedded,
    isFinishPage: $isFinishPage,
    finishPageTimeOut: $finishPageTimeOut,
    phone: $phone,
    isPhoneChangeDisabled: $isPhoneChangeDisabled,
  },
  fn: (
    {
      orderId,
      backUrl,
      isEmbedded,
      isFinishPage,
      finishPageTimeOut,
      phone,
      isPhoneChangeDisabled,
    },
    widget,
  ) => ({
    widget,
    orderId,
    backUrl,
    isEmbedded,
    isFinishPage,
    finishPageTimeOut,
    phone,
    isPhoneChangeDisabled,
  }),
  target: openWidgetFx,
});

const startPay = sample({
  clock: pay,
  source: { target: $target, libraryVersion: $libraryVersion },
});

split({
  source: startPay,
  match: $method,
  cases: {
    open: createWidgetFx,
    openBoundCardPayment: createWidgetByBindingFx,
  },
});

export const model = {
  changeOrderId,
  changeBackUrl,
  changeIsEmbedded,
  changeIsFinishPage,
  changeFinishPageTimeOut,
  changeTarget,
  changeLibraryVersion,
  changeUserName,
  changeBindingId,
  $orderId,
  $backUrl,
  $isEmbedded,
  $isFinishPage,
  $finishPageTimeOut,
  $target,
  $libraryVersion,
  $userName,
  $bindingId,
  $method,
  $phone,
  changePhone,
  $isPhoneChangeDisabled,
  changeIsPhoneChangeDisabled,
  changeMethod,
  pay,
  payByBinding,
};
