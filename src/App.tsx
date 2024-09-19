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
} from "@chakra-ui/react";
import "./App.css";
import { useUnit } from "effector-react";
import { model } from "./model";

function App() {
  const changeOrderId = useUnit(model.changeOrderId);
  const orderId = useUnit(model.$orderId);
  const changeBackUrl = useUnit(model.changeBackUrl);
  const backUrl = useUnit(model.$backUrl);
  const pay = useUnit(model.pay);
  const isEmbedded = useUnit(model.$isEmbedded);
  const changeIsEmbedded = useUnit(model.changeIsEmbedded);

  return (
    <>
      <Center>
        <Card width="100%" maxWidth="500px">
          <CardBody>
            <Stack spacing={3}>
              <FormControl>
                <FormLabel>orderId</FormLabel>
                <Input type="text" value={orderId} onChange={changeOrderId} />
              </FormControl>
              <FormControl>
                <FormLabel>backUrl</FormLabel>
                <Input type="text" value={backUrl} onChange={changeBackUrl} />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="isEmbedded" mb="0">
                  isEmbedded
                </FormLabel>
                <Switch
                  id="isEmbedded"
                  isChecked={isEmbedded}
                  onChange={changeIsEmbedded}
                />
              </FormControl>
              <Button colorScheme="green" onClick={pay}>
                Pay
              </Button>
            </Stack>
          </CardBody>
        </Card>
      </Center>
    </>
  );
}

export default App;
