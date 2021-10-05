import React, {
  Fragment,
  useEffect,
  useState,
  useContext,
  ReactNode
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text, TextVariants } from '@patternfly/react-core';
import { SearchIcon, CogIcon } from '@patternfly/react-icons';

import { scrollToTop } from '../../helpers/shared/helpers';
import ToolbarRenderer from '../../toolbar/toolbar-renderer';
import ContentGallery from '../content-gallery/content-gallery';
import { fetchPlatforms } from '../../redux/actions/platform-actions';
import { fetchPlatforms as fetchPlatformsS } from '../../redux/actions/platform-actions-s';
import PlatformCard from '../../presentational-components/platform/platform-card';
import { createPlatformsToolbarSchema } from '../../toolbar/schemas/platforms-toolbar.schema';
import ContentGalleryEmptyState from '../../presentational-components/shared/content-gallery-empty-state';
import UserContext from '../../user-context';
import platformsMessages from '../../messages/platforms.messages';
import useFormatMessage from '../../utilities/use-format-message';
import filteringMessages from '../../messages/filtering.messages';
import { PLATFORMS_DOC_URL } from '../../utilities/constants';

const Platforms = () => {
  const formatMessage = useFormatMessage();
  const [filterValue, setFilterValue] = useState('');
  const { platforms, isLoading } = useSelector(
    ({ platformReducer: { platforms, isPlatformDataLoading } }) => ({
      platforms,
      isLoading: isPlatformDataLoading
    })
  );
  const dispatch = useDispatch();
  const {
    userIdentity: {
      identity: {
        user: { is_org_admin }
      }
    }
  } = useContext(UserContext);

  useEffect(() => {
    dispatch(window.catalog?.standalone ? fetchPlatformsS() : fetchPlatforms());
    scrollToTop();
  }, []);

  console.log('Debug - platforms: ', platforms);
  const items = window.catalog?.standalone ? platforms.results : platforms;
  console.log('Debug - items: ', items);

  const filteredItems = items
    ? {
        items: items?.map((item) => (
          <PlatformCard
            ouiaId={`platform-${item.id}`}
            key={item.id}
            {...item}
            updateData={() =>
              dispatch(
                window.catalog?.standalone
                  ? fetchPlatformsS()
                  : fetchPlatforms()
              )
            }
          />
        )),
        isLoading: isLoading && items.length === 0
      }
    : {};

  const FilterAction = () => (
    <Button
      ouiaId={'clear-filter'}
      variant="link"
      onClick={() => setFilterValue('')}
    >
      {formatMessage(filteringMessages.clearFilters)}
    </Button>
  );

  const emptyStateProps = {
    PrimaryAction: filterValue && filterValue !== '' ? FilterAction : undefined,
    title:
      filterValue && filterValue !== ''
        ? formatMessage(filteringMessages.noResults)
        : formatMessage(platformsMessages.noPlatforms),
    description:
      filterValue && filterValue !== '' ? (
        formatMessage(filteringMessages.noResultsDescription)
      ) : (
        <Text id="platform_doc_url" component={TextVariants.p}>
          {formatMessage(platformsMessages.platformsNoDataDescription)} &nbsp;
          <a href={PLATFORMS_DOC_URL} target="_blank" rel="noopener noreferrer">
            {formatMessage(platformsMessages.platformsDocTitle)}
          </a>
        </Text>
      ),
    Icon: filterValue && filterValue !== '' ? SearchIcon : CogIcon
  };
  console.log('filtered Items', filteredItems);
  return (
    <Fragment>
      <ToolbarRenderer
        schema={createPlatformsToolbarSchema({
          onFilterChange: (value) => setFilterValue(value),
          searchValue: filterValue,
          title: formatMessage(platformsMessages.title)
        })}
      />
      <ContentGallery
        {...filteredItems}
        renderEmptyState={() => {
          return <ContentGalleryEmptyState {...emptyStateProps} />;
        }}
      />
    </Fragment>
  );
};

export default Platforms;
