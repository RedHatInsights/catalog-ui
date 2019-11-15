import React, { Fragment, useState } from 'react';
import propTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownItem,
  DropdownPosition,
  GalleryItem,
  KebabToggle
} from '@patternfly/react-core';
import DefaultPlatformImg from '../../assets/images/platform-default.svg';
import OpenshiftPlatformImg from '../../assets/images/platform-openshift.svg';
import AmazonPlatformImg from '../../assets/images/platform-amazon.png';
import TowerPlatformImg from '../../assets/images/platform-tower.png';
import ItemDetails from '../shared/card-common';
import PlatformCardHeader from './platform-card-header';
import './platform-card.scss';

const TO_DISPLAY = [ 'description', 'modified' ];

// TO DO - use webpack to load all images
const platformTypeImg = {
  1: OpenshiftPlatformImg,
  2: AmazonPlatformImg,
  3: TowerPlatformImg
};

const createToolbarActions = (platformId, isOpen, setOpen) => [
  <Dropdown
    key="portfolio-dropdown"
    isOpen={ isOpen }
    isPlain
    onSelect={ () => setOpen(false) }
    position={ DropdownPosition.right }
    toggle={ <KebabToggle onToggle={ isOpen => setOpen(isOpen) }/> }
    dropdownItems={ [
      <DropdownItem
        key="workflow-portfolio-action"
        component={ <Link to={ `/platforms/${platformId}/edit-workflow` }>Edit approval</Link> }
      />
    ] }/>
];

const PlatformCard = ({ name, id, ...props }) => {
  const [ isOpen, setOpen ] = useState(false);
  return (
    <GalleryItem>
      <Link to={ `/platforms/detail/${id}` } className="card-link">
        <Card key={ id } className="content-gallery-card">
          <CardHeader>
            <PlatformCardHeader
              image={ platformTypeImg[props.source_type_id] || DefaultPlatformImg }
              headerActions={ createToolbarActions(id, isOpen, setOpen) }
            />
          </CardHeader>
          <CardBody>
            <h4>{ name }</h4>
            <ItemDetails { ...{ name, ...props } } toDisplay={ TO_DISPLAY }/>
          </CardBody>
          <CardFooter/>
        </Card>
      </Link>
    </GalleryItem>);
};

PlatformCard.propTypes = {
  history: propTypes.object,
  imageUrl: propTypes.string,
  name: propTypes.string,
  source_type_id: propTypes.string,
  id: propTypes.string
};

export default PlatformCard;
