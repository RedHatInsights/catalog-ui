import React from 'react';
import { Section } from '@redhat-cloud-services/frontend-components/Section';
import platformsMessages from '../../messages/platforms.messages';
import useFormatMessage from '../../utilities/use-format-message';
import { useSelector } from 'react-redux';
import {
  Card,
  CardBody,
  Grid,
  GridItem,
  Text,
  TextContent,
  TextList,
  TextListItem,
  TextListItemVariants,
  TextListVariants,
  TextVariants
} from '@patternfly/react-core';
import { DateFormat } from '@redhat-cloud-services/frontend-components/DateFormat';
import { isStandalone } from '../../helpers/shared/helpers';

const PlatformDetails = () => {
  const formatMessage = useFormatMessage();
  const platform = useSelector(
    ({ platformReducer: { selectedPlatform } }) => selectedPlatform
  );
  return (
    <Section type="content">
      <Grid hasGutter>
        <GridItem span={5} className="info-bar pf-u-p-0">
          <Card>
            <CardBody>
              <TextContent>
                <Text className="pf-u-mb-md" component={TextVariants.h2}>
                  {formatMessage(platformsMessages.platformDetails)}
                </Text>
                <TextList component={TextListVariants.dl}>
                  <TextListItem component={TextListItemVariants.dt}>
                    {formatMessage(platformsMessages.platformVersion)}
                  </TextListItem>
                  <TextListItem component={TextListItemVariants.dd}>
                    {platform?.info?.version}
                  </TextListItem>
                  {!isStandalone() && (
                    <React.Fragment>
                      <TextListItem component={TextListItemVariants.dt}>
                        {formatMessage(platformsMessages.ansibleVersion)}
                      </TextListItem>
                      <TextListItem component={TextListItemVariants.dd}>
                        {platform?.info?.ansible_version}
                      </TextListItem>
                    </React.Fragment>
                  )}
                  <TextListItem component={TextListItemVariants.dt}>
                    {formatMessage(platformsMessages.dateAdded)}
                  </TextListItem>
                  <TextListItem component={TextListItemVariants.dd}>
                    <DateFormat date={platform?.created_at} />
                  </TextListItem>
                  {!isStandalone() && (
                    <React.Fragment>
                      <TextListItem component={TextListItemVariants.dt}>
                        {formatMessage(platformsMessages.cloudConnectorId)}
                      </TextListItem>
                      <TextListItem component={TextListItemVariants.dd}>
                        {platform?.cloud_connector_id}
                      </TextListItem>
                    </React.Fragment>
                  )}
                </TextList>
              </TextContent>
            </CardBody>
          </Card>{' '}
        </GridItem>
        <GridItem span={7} className="info-bar pf-u-p-0">
          <Card>
            <CardBody>
              <TextContent>
                <Text className="pf-u-mb-md" component={TextVariants.h2}>
                  {formatMessage(platformsMessages.platformActivity)}
                </Text>
                <TextList component={TextListVariants.dl}>
                  <TextListItem component={TextListItemVariants.dt}>
                    {formatMessage(platformsMessages.refreshState)}
                  </TextListItem>
                  <TextListItem component={TextListItemVariants.dd}>
                    {platform?.refresh_state}
                  </TextListItem>
                  <TextListItem component={TextListItemVariants.dt}>
                    {formatMessage(platformsMessages.refreshStarted)}
                  </TextListItem>
                  <TextListItem component={TextListItemVariants.dd}>
                    <DateFormat
                      date={platform?.refresh_started_at}
                      variant="relative"
                    />
                  </TextListItem>
                  <TextListItem component={TextListItemVariants.dt}>
                    {formatMessage(platformsMessages.refreshFinished)}
                  </TextListItem>
                  <TextListItem component={TextListItemVariants.dd}>
                    <DateFormat
                      date={platform.refresh_finished_at}
                      variant="relative"
                    />
                  </TextListItem>
                  <TextListItem component={TextListItemVariants.dt}>
                    {formatMessage(platformsMessages.lastSuccessfulRefresh)}
                  </TextListItem>
                  <TextListItem component={TextListItemVariants.dd}>
                    <DateFormat
                      date={platform?.last_successful_refresh_at}
                      variant="relative"
                    />
                  </TextListItem>
                  <TextListItem component={TextListItemVariants.dt}>
                    {formatMessage(platformsMessages.lastRefreshMessage)}
                  </TextListItem>
                  {platform?.last_refresh_message
                    ?.split(/\n/g)
                    .map((line, idx) => (
                      <TextListItem
                        key={`message-key-${idx}`}
                        component={TextListItemVariants.dd}
                      >
                        {line}
                      </TextListItem>
                    ))}
                  <TextListItem component={TextListItemVariants.dt}>
                    {formatMessage(platformsMessages.availabilityMessage)}
                  </TextListItem>
                  {platform?.availability_message
                    ?.split(/\n/g)
                    .map((line, idx) => (
                      <TextListItem
                        key={`availability-message-key-${idx}`}
                        component={TextListItemVariants.dd}
                      >
                        {line}
                      </TextListItem>
                    ))}
                  <TextListItem component={TextListItemVariants.dt}>
                    {formatMessage(platformsMessages.lastChecked)}
                  </TextListItem>
                  <TextListItem component={TextListItemVariants.dd}>
                    <DateFormat
                      date={platform?.last_checked_at}
                      variant="relative"
                    />
                  </TextListItem>
                  <TextListItem component={TextListItemVariants.dt}>
                    {formatMessage(platformsMessages.lastAvailable)}
                  </TextListItem>
                  <TextListItem component={TextListItemVariants.dd}>
                    <DateFormat
                      date={platform?.last_available_at}
                      variant="relative"
                    />
                  </TextListItem>
                </TextList>
              </TextContent>
            </CardBody>
          </Card>{' '}
        </GridItem>
      </Grid>
    </Section>
  );
};

export default PlatformDetails;
