import React from 'react';
import './portfoliocard.scss';
import propTypes from 'prop-types';
import ItemDetails from '../Shared/CardCommon';
import { Link } from 'react-router-dom';
import { GridItem, Card, CardHeader, CardBody, CardFooter, Button } from '@patternfly/react-core';
import { EditAltIcon, TrashIcon } from '@patternfly/react-icons';
import PortfolioCardHeader from './portfolio-card-header';

const TO_DISPLAY = [ 'description', 'modified' ];
const ICON_FILL = 'white';

const createToolbarActions = (portfolioName, portfolioId) => [
  <Link key="edit-portfolio-action" to={ `/portfolios/edit/${portfolioId}` }>
    <Button
      variant="plain"
      aria-label={ `edit-portfolio-${portfolioName}` }
    >
      <EditAltIcon fill={ ICON_FILL } />
    </Button>
  </Link>,
  <Link key="remove-portfolio-action" to={ `/portfolios/remove/${portfolioId}` }>
    <Button
      key="remove-portfolio-action"
      variant="plain"
      aria-label={ `remove-portfolio-${portfolioName}` }
    >
      <TrashIcon fill={ ICON_FILL } />
    </Button>
  </Link>
];

const PortfolioCard = ({ imageUrl, name, id, products, ...props }) => (
  <GridItem sm={ 6 } md={ 4 } lg={ 4 } xl={ 3 }>
    <Link style={ { textDecoration: 'none' } } to={ `/portfolio/${id}` }>
      <Card>
        <CardHeader className="card-image-header">
          <PortfolioCardHeader
            portfolioName={ `${name} (${products})` }
            headerActions={ createToolbarActions(name, id) }
          />
        </CardHeader>
        <CardBody>
          <ItemDetails { ...{ name, imageUrl, ...props } } toDisplay={ TO_DISPLAY } />
        </CardBody>
        <CardFooter/>
      </Card>
    </Link>
  </GridItem>
);

PortfolioCard.propTypes = {
  history: propTypes.object,
  imageUrl: propTypes.string,
  name: propTypes.string,
  id: propTypes.string,
  products: propTypes.number
};

export default PortfolioCard;
