import { combine } from 'effector';
import { createInput, createSelect, createSwitch } from './create-input';
import { convertToType } from '../destructive-mode-tab/convert-to-type';

export type CreateInputs = {
  name: string;
  initialValue: unknown;
};

export const createInputs = ({ name, initialValue }: CreateInputs) => {
  const [$value, setValue] = createInput({
    name,
    initialValue,
  });
  const [$typeValue, setTypeValue] = createSelect({
    name: `${name}Type`,
    initialValue: 'string',
  });
  const $finalValue = combine([$value, $typeValue], convertToType, {
    skipVoid: false,
  });

  const [$enabled, setEnabled] = createSwitch({
    name: `${name}Enabled`,
    initialValue: true,
  });

  return [
    $value,
    setValue,
    $typeValue,
    setTypeValue,
    $finalValue,
    $enabled,
    setEnabled,
  ];
};
