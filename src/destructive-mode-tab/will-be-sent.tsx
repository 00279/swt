import { Card, CardBody, Text } from '@chakra-ui/react';

export const WillBeSent = ({ isEnabled, final }) => (
  <Card>
    <CardBody>
      {isEnabled ? (
        <Text>will be sent as: {String(final)}</Text>
      ) : (
        <Text>will not be sent</Text>
      )}
    </CardBody>
  </Card>
);
