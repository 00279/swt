import {
  Card,
  CardBody,
  Center,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import './App.css';
import { NormalModeTab } from './normal-mode-tab';
import { DestructiveModeTab } from './destructive-mode-tab/destructive-mode-tab';

function App() {
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
