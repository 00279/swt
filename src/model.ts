import { createWidget, WidgetParams } from "@sber-ecom-core/sberpay-widget";
import { createEffect, createEvent, createStore, sample } from "effector";
import { ChangeEvent } from "react";

const changeOrderId = createEvent<ChangeEvent<HTMLInputElement>>();
const changeBackUrl = createEvent<ChangeEvent<HTMLInputElement>>();
const changeIsEmbedded = createEvent<ChangeEvent<HTMLInputElement>>();

const pay = createEvent();

const $orderId = createStore("");
const $backUrl = createStore("");
const $isEmbedded = createStore(true);

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

const createWidgetFx = createEffect(() => createWidget("IFT"));

sample({
  clock: pay,
  target: createWidgetFx,
});

type SberpayWidgetParams = WidgetParams & { isIframe: boolean };
type SberpayWidget = {
  open: (
    params: SberpayWidgetParams
  ) => Promise<"success" | "return" | "cancel">;
  close?: () => void;
};

type OpenWidgetFxParams = {
  widget: SberpayWidget;
  orderId: string;
  backUrl: string;
  isEmbedded: boolean;
};

const openWidgetFx = createEffect(
  ({ widget, orderId, backUrl, isEmbedded }: OpenWidgetFxParams) =>
    widget.open({
      bankInvoiceId: orderId,
      backUrl,
      isIframe: isEmbedded,
    })
);

sample({
  clock: createWidgetFx.doneData,
  source: { orderId: $orderId, backUrl: $backUrl, isEmbedded: $isEmbedded },
  fn: ({ orderId, backUrl, isEmbedded }, widget) => ({
    widget,
    orderId,
    backUrl,
    isEmbedded,
  }),
  target: openWidgetFx,
});

export const model = {
  changeOrderId,
  changeBackUrl,
  changeIsEmbedded,
  $orderId,
  $backUrl,
  $isEmbedded,
  pay,
};
