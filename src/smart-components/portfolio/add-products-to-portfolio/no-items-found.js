import React from 'react';
import { TextContent, Text, TextVariants } from '@patternfly/react-core';

const NoItemsFound = () => (
  <div>
    <TextContent>
      <Text component={ TextVariants.h2 }>There are no services matching given parameters.</Text>
    </TextContent>
  </div>
);

export default NoItemsFound;

