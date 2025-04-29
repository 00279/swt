import {
  Card,
  FormControl,
  FormLabel,
  Switch,
  Input,
  Stack,
  Button,
  Center,
  Select,
  Divider,
  Heading,
  StackDivider,
  Box,
} from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { model } from './model';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const DestructiveModeTab = () => {
  const {
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
  } = useUnit(model);

  return (
    <>
      <Center>
        <Card width='100%' maxWidth='500px'>
          <Stack spacing={3}>
            <FormControl>
              <FormLabel>library version</FormLabel>
              <Select value={$libraryVersion} onChange={changeLibraryVersion}>
                <option value='035'>0.3.5</option>
                <option value='037'>0.3.7</option>
                <option value='041'>0.4.1</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>orderId</FormLabel>
              <Input type='text' value={$orderId} onChange={changeOrderId} />
            </FormControl>
            <FormControl>
              <FormLabel>backUrl</FormLabel>
              <Input type='text' value={$backUrl} onChange={changeBackUrl} />
            </FormControl>
            <FormControl>
              <FormLabel>target</FormLabel>
              <Select value={$target} onChange={changeTarget}>
                <option value='IFT'>IFT</option>
                <option value='UAT'>UAT</option>
              </Select>
            </FormControl>
          </Stack>
          <Divider mt={6} mb={6} />
          <Stack divider={<StackDivider />} spacing={3}>
            <Box>
              <Box mb={6}>
                <Heading size='md'>isEmbedded</Heading>
              </Box>
              <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor='isEmbeddedEnabled' mb='0'>
                  enabled
                </FormLabel>
                <Switch
                  id='isEmbeddedEnabled'
                  isChecked={$isEmbeddedEnabled}
                  onChange={setIsEmbeddedEnabled}
                />
              </FormControl>
              <FormControl>
                <FormLabel>value</FormLabel>
                <Input
                  type='text'
                  value={$isEmbedded}
                  onChange={changeIsEmbedded}
                />
              </FormControl>
              <FormControl>
                <FormLabel>convert to type</FormLabel>
                <Select value={$isEmbeddedType} onChange={setIsEmbeddedType}>
                  <option value='string'>string</option>
                  <option value='number'>number</option>
                  <option value='boolean'>boolean</option>
                  <option value='null'>null</option>
                  <option value='undefined'>undefined</option>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <Box mb={6}>
                <Heading size='md'>isFinishPage</Heading>
              </Box>
              <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor='isFinishPage' mb='0'>
                  enabled
                </FormLabel>
                <Switch
                  id='isFinishPage'
                  isChecked={$isFinishPageEnabled}
                  onChange={setIsFinishPageEnabled}
                />
              </FormControl>
              <FormControl>
                <FormLabel>value</FormLabel>
                <Input
                  type='text'
                  value={$isFinishPage}
                  onChange={changeIsFinishPage}
                />
              </FormControl>
              <FormControl>
                <FormLabel>convert to type</FormLabel>
                <Select
                  value={$isFinishPageType}
                  onChange={setIsFinishPageType}
                >
                  <option value='string'>string</option>
                  <option value='number'>number</option>
                  <option value='boolean'>boolean</option>
                  <option value='null'>null</option>
                  <option value='undefined'>undefined</option>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <Box mb={6}>
                <Heading size='md'>finishPageTimeOut</Heading>
              </Box>
              <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor='finishPageTimeOutEnabled' mb='0'>
                  enabled
                </FormLabel>
                <Switch
                  id='finishPageTimeOutEnabled'
                  isChecked={$finishPageTimeOutEnabled}
                  onChange={setFinishPageTimeOutEnabled}
                />
              </FormControl>
              <FormControl>
                <FormLabel>value</FormLabel>
                <Input
                  type='text'
                  value={$finishPageTimeOut}
                  onChange={setFinishPageTimeOut}
                />
              </FormControl>
              <FormControl>
                <FormLabel>type</FormLabel>
                <Select
                  value={$finishPageTimeOutType}
                  onChange={setFinishPageTimeOutType}
                >
                  <option value='string'>string</option>
                  <option value='number'>number</option>
                  <option value='boolean'>boolean</option>
                  <option value='null'>null</option>
                  <option value='undefined'>undefined</option>
                </Select>
              </FormControl>
            </Box>
          </Stack>

          <Box mt={6}>
            <Heading size='md'>will be sent as</Heading>
            <SyntaxHighlighter language='javascript' style={oneDark}>
              {$widgetParametresJsonString}
            </SyntaxHighlighter>
          </Box>

          <Divider mt={6} mb={6} />
          <Stack spacing={6}>
            <Button colorScheme='green' onClick={pay}>
              Pay
            </Button>
          </Stack>
        </Card>
      </Center>
    </>
  );
};
