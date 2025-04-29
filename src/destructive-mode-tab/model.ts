import {
  createWidget as createWidget035,
  WidgetParams as WidgetParams035,
} from 'spay-0.3.5';
import { createWidget as createWidget037 } from 'spay-0.3.7';
import {
  createWidget as createWidget041,
  WidgetParams as WidgetParams041,
} from 'spay-0.4.1';
import { combine, createEffect, createEvent, sample } from 'effector';
import { createInput } from '../lib/create-input';
import { createInputs } from '../lib/create-inputs';
import { stringify } from 'javascript-stringify';

type TargetTypes = 'IFT' | 'UAT';
type LibraryVersions = '035' | '037' | '041';

const pay = createEvent();

const [$libraryVersion, changeLibraryVersion] = createInput({
  name: 'libraryVersion',
  initialValue: '035',
  isPersisted: true,
});

const [$orderId, changeOrderId] = createInput({
  name: 'orderId',
  initialValue: '',
});

const [$backUrl, changeBackUrl] = createInput({
  name: 'backUrl',
  initialValue: '',
  isPersisted: true,
});

const [$target, changeTarget] = createInput({
  name: 'target',
  initialValue: 'IFT',
  isPersisted: true,
});

const [
  $isEmbedded,
  changeIsEmbedded,
  $isEmbeddedType,
  setIsEmbeddedType,
  $isEmbeddedFinal,
  $isEmbeddedEnabled,
  setIsEmbeddedEnabled,
] = createInputs({
  name: 'isEmbedded',
  initialValue: '',
});

const [
  $isFinishPage,
  changeIsFinishPage,
  $isFinishPageType,
  setIsFinishPageType,
  $isFinishPageFinal,
  $isFinishPageEnabled,
  setIsFinishPageEnabled,
] = createInputs({
  name: 'isFinishPage',
  initialValue: '',
});

const [
  $finishPageTimeOut,
  setFinishPageTimeOut,
  $finishPageTimeOutType,
  setFinishPageTimeOutType,
  $finishPageTimeOutFinal,
  $finishPageTimeOutEnabled,
  setFinishPageTimeOutEnabled,
] = createInputs({
  name: 'finishPageTimeOut',
  initialValue: '',
});

const widgetMap = {
  '035': createWidget035,
  '037': createWidget037,
  '041': createWidget041,
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

type SberpayWidgetParams = WidgetParams035 &
  WidgetParams041 & { isEmbedded: boolean };
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
  isEmbeddedEnabled: boolean;
  isFinishPageEnabled: boolean;
  finishPageTimeOutEnabled: boolean;
};

type WidgetParams = Omit<
  OpenWidgetFxParams,
  'orderId' | 'widget' | 'finishPageTimeOut'
> & {
  bankInvoiceId: string;
  finishPageTimeOut?: number;
};

const $widgetParametres = combine(
  {
    orderId: $orderId,
    backUrl: $backUrl,
    isEmbedded: $isEmbeddedFinal,
    isEmbeddedEnabled: $isEmbeddedEnabled,
    isFinishPage: $isFinishPageFinal,
    isFinishPageEnabled: $isFinishPageEnabled,
    finishPageTimeOut: $finishPageTimeOutFinal,
    finishPageTimeOutEnabled: $finishPageTimeOutEnabled,
  },
  ({
    orderId,
    backUrl,
    isEmbedded,
    isEmbeddedEnabled,
    isFinishPage,
    isFinishPageEnabled,
    finishPageTimeOut,
    finishPageTimeOutEnabled,
  }) => {
    const parameters: WidgetParams = {
      bankInvoiceId: orderId,
      backUrl,
    };

    if (isEmbeddedEnabled) {
      parameters.isEmbedded = isEmbedded;
    }

    if (isFinishPageEnabled) {
      parameters.isFinishPage = isFinishPage;
    }

    if (finishPageTimeOutEnabled) {
      parameters.finishPageTimeOut = finishPageTimeOut;
    }

    return parameters;
  }
);

export const $widgetParametresJsonString = combine(
  $widgetParametres,
  (widgetParametres) =>
    stringify(widgetParametres, null, 2, {
      maxDepth: 10,
      references: true,
    })
);

const openWidgetFx = createEffect(
  ({
    widget,
    orderId,
    backUrl,
    isEmbedded,
    isEmbeddedEnabled,
    isFinishPage,
    isFinishPageEnabled,
    finishPageTimeOut,
    finishPageTimeOutEnabled,
  }: OpenWidgetFxParams) => {
    const parameters: WidgetParams = {
      bankInvoiceId: orderId,
      backUrl,
    };

    if (isEmbeddedEnabled) {
      parameters.isEmbedded = isEmbedded;
    }

    if (isFinishPageEnabled) {
      parameters.isFinishPage = isFinishPage;
    }

    if (finishPageTimeOutEnabled) {
      parameters.finishPageTimeOut = finishPageTimeOut;
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
    isEmbedded: $isEmbeddedFinal,
    isEmbeddedEnabled: $isEmbeddedEnabled,
    isFinishPage: $isFinishPageFinal,
    isFinishPageEnabled: $isFinishPageEnabled,
    finishPageTimeOut: $finishPageTimeOutFinal,
    finishPageTimeOutEnabled: $finishPageTimeOutEnabled,
  },
  fn: (
    {
      orderId,
      backUrl,
      isEmbedded,
      isEmbeddedEnabled,
      isFinishPage,
      isFinishPageEnabled,
      finishPageTimeOut,
      finishPageTimeOutEnabled,
    },
    widget
  ) => ({
    widget,
    orderId,
    backUrl,
    isEmbedded,
    isEmbeddedEnabled,
    isFinishPage,
    isFinishPageEnabled,
    finishPageTimeOut,
    finishPageTimeOutEnabled,
  }),
  target: openWidgetFx,
});

export const model = {
  changeOrderId,
  changeBackUrl,
  changeIsEmbedded,
  changeIsFinishPage,
  setFinishPageTimeOut,
  $finishPageTimeOutType,
  setFinishPageTimeOutType,
  changeTarget,
  changeLibraryVersion,
  $orderId,
  $backUrl,
  $isEmbedded,
  $isFinishPage,
  $finishPageTimeOut,
  $isEmbeddedType,
  $isFinishPageType,
  setIsFinishPageType,
  $target,
  $libraryVersion,
  setIsEmbeddedType,
  $isEmbeddedEnabled,
  setIsEmbeddedEnabled,
  $isFinishPageEnabled,
  setIsFinishPageEnabled,
  $finishPageTimeOutEnabled,
  setFinishPageTimeOutEnabled,
  $widgetParametresJsonString,
  pay,
};
