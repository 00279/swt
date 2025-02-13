import {
  createWidget as createWidget035,
  WidgetParams as WidgetParams035,
} from 'spay-0.3.5';
import { createWidget as createWidget037 } from 'spay-0.3.7';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { ChangeEvent } from 'react';
import { persist } from 'effector-storage/local';
import { prepareTimeout } from './lib/prepare-timeout';

type TargetTypes = 'IFT' | 'UAT';
type LibraryVersions = '035' | '037';
const changeOrderId = createEvent<ChangeEvent<HTMLInputElement>>();
const changeBackUrl = createEvent<ChangeEvent<HTMLInputElement>>();
const changeIsEmbedded = createEvent<ChangeEvent<HTMLInputElement>>();
const changeIsFinishPage = createEvent<ChangeEvent<HTMLInputElement>>();
const changeFinishPageTimeOut = createEvent<ChangeEvent<HTMLInputElement>>();
const changeTarget = createEvent<ChangeEvent<HTMLSelectElement>>();
const changeLibraryVersion = createEvent<ChangeEvent<HTMLSelectElement>>();

const pay = createEvent();

const $orderId = createStore('');
const $backUrl = createStore('');
const $isEmbedded = createStore(true);
const $isFinishPage = createStore(true);
const $finishPageTimeOut = createStore('');
const $target = createStore<TargetTypes>('IFT');
const $libraryVersion = createStore<LibraryVersions>('035');

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
};

const createWidgetFx = createEffect(
  ({
    target,
    libraryVersion,
  }: {
    target: TargetTypes;
    libraryVersion: LibraryVersions;
  }) => widgetMap[libraryVersion](target)
);

sample({
  clock: pay,
  source: { target: $target, libraryVersion: $libraryVersion },
  target: createWidgetFx,
});

type SberpayWidgetParams = WidgetParams035 & { isEmbedded: boolean };
type SberpayWidget = {
  open: (
    params: SberpayWidgetParams
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
  }: OpenWidgetFxParams) => {
    const parameters: WidgetParams = {
      bankInvoiceId: orderId,
      backUrl,
      isEmbedded,
      isFinishPage,
    };

    const timeOut = prepareTimeout(finishPageTimeOut);
    if (Number.isInteger(timeOut)) {
      parameters.finishPageTimeOut = timeOut;
    }
    console.table(parameters);
    widget.open(parameters);
  }
);

sample({
  clock: createWidgetFx.doneData,
  source: {
    orderId: $orderId,
    backUrl: $backUrl,
    isEmbedded: $isEmbedded,
    isFinishPage: $isFinishPage,
    finishPageTimeOut: $finishPageTimeOut,
  },
  fn: (
    { orderId, backUrl, isEmbedded, isFinishPage, finishPageTimeOut },
    widget
  ) => ({
    widget,
    orderId,
    backUrl,
    isEmbedded,
    isFinishPage,
    finishPageTimeOut,
  }),
  target: openWidgetFx,
});

export const model = {
  changeOrderId,
  changeBackUrl,
  changeIsEmbedded,
  changeIsFinishPage,
  changeFinishPageTimeOut,
  changeTarget,
  changeLibraryVersion,
  $orderId,
  $backUrl,
  $isEmbedded,
  $isFinishPage,
  $finishPageTimeOut,
  $target,
  $libraryVersion,
  pay,
};
