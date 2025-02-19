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
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import './App.css';
import { useUnit } from 'effector-react';
import { model } from './model';
import { NormalModeTab } from './normal-mode-tab';
import { DestructiveModeTab } from './destructive-mode-tab/destructive-mode-tab';

function App() {
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
          <CardBody>
            <Tabs>
              <TabList>
                <Tab>Normal mode</Tab>
                <Tab>Destructive mode</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <NormalModeTab />
                </TabPanel>
                <TabPanel>
                  <DestructiveModeTab />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      </Center>
    </>
  );
}

export default App;
