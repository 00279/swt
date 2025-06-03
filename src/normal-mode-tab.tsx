import {
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Switch,
  Input,
  Stack,
  Button,
  Center,
  Select,
  Divider,
} from '@chakra-ui/react';
import './App.css';
import { useUnit } from 'effector-react';
import { model } from './model';

export const NormalModeTab = () => {
  const changeOrderId = useUnit(model.changeOrderId);
  const orderId = useUnit(model.$orderId);
  const changeBackUrl = useUnit(model.changeBackUrl);
  const backUrl = useUnit(model.$backUrl);
  const pay = useUnit(model.pay);
  const isEmbedded = useUnit(model.$isEmbedded);
  const changeIsEmbedded = useUnit(model.changeIsEmbedded);
  const changeFinishPageTimeOut = useUnit(model.changeFinishPageTimeOut);
  const finishPageTimeOut = useUnit(model.$finishPageTimeOut);
  const isFinishPage = useUnit(model.$isFinishPage);
  const changeIsFinishPage = useUnit(model.changeIsFinishPage);
  const target = useUnit(model.$target);
  const changeTarget = useUnit(model.changeTarget);
  const libraryVersion = useUnit(model.$libraryVersion);
  const changeLibraryVersion = useUnit(model.changeLibraryVersion);

  return (
    <>
      <Center>
        <Card width='100%' maxWidth='500px'>
          {/* <CardBody> */}
            <Stack spacing={3}>
              <FormControl>
                <FormLabel>library version</FormLabel>
                <Select value={libraryVersion} onChange={changeLibraryVersion}>
                  <option value='035'>0.3.5</option>
                  <option value='037'>0.3.7</option>
                  <option value='041'>0.4.1</option>
                  <option value='041'>0.5.1</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>orderId</FormLabel>
                <Input type='text' value={orderId} onChange={changeOrderId} />
              </FormControl>
              <FormControl>
                <FormLabel>backUrl</FormLabel>
                <Input type='text' value={backUrl} onChange={changeBackUrl} />
              </FormControl>
              <FormControl>
                <FormLabel>target</FormLabel>
                <Select value={target} onChange={changeTarget}>
                  <option value='IFT'>IFT</option>
                  <option value='UAT'>UAT</option>
                </Select>
              </FormControl>
              <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor='isEmbedded' mb='0'>
                  isEmbedded
                </FormLabel>
                <Switch
                  id='isEmbedded'
                  isChecked={isEmbedded}
                  onChange={changeIsEmbedded}
                />
              </FormControl>
              <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor='isFinishPage' mb='0'>
                  isFinishPage
                </FormLabel>
                <Switch
                  id='isFinishPage'
                  isChecked={isFinishPage}
                  onChange={changeIsFinishPage}
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  finishPageTimeOut (always convert to integer)
                </FormLabel>
                <Input
                  type='text'
                  value={finishPageTimeOut}
                  onChange={changeFinishPageTimeOut}
                />
              </FormControl>
              <Stack spacing={6}>
                <Divider />
                <Button colorScheme='green' onClick={pay}>
                  Pay
                </Button>
              </Stack>
            </Stack>
          {/* </CardBody> */}
        </Card>
      </Center>
    </>
  );
}
