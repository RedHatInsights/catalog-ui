import { getAxiosInstance, getPortfolioApi, getPortfolioItemApi } from '../shared/user-login';
import { CATALOG_API_BASE } from '../../utilities/constants';
import { sanitizeValues } from '../shared/helpers';
import { defaultSettings } from '../shared/pagination';

const axiosInstance = getAxiosInstance();
const portfolioApi = getPortfolioApi();
const portfolioItemApi = getPortfolioItemApi();

export const listPortfolios = (filter = '', { limit, offset } = defaultSettings) =>
  axiosInstance.get(`${CATALOG_API_BASE}/portfolios?filter[name][contains_i]=${filter}&limit=${limit}&offset=${offset}`);

export const listPortfolioItems = (limit = 50, offset = 0, filter = '') =>
  axiosInstance.get(`${CATALOG_API_BASE}/portfolio_items?filter[name][contains_i]=${filter}&limit=${limit}&offset=${offset}`);

export const getPortfolioItem = portfolioItemId => axiosInstance.get(`${CATALOG_API_BASE}/portfolio_items/${portfolioItemId}`);

export const getPortfolio = portfolioId => portfolioApi.showPortfolio(portfolioId);

export const getPortfolioItemsWithPortfolio = (portfolioId, { limit, offset } = {}) =>
  portfolioApi.fetchPortfolioItemsWithPortfolio(portfolioId, limit, offset);

// TO DO - change to use the API call that adds multiple items to a portfolio when available
export const addPortfolio = async (portfolioData, items) => {
  let portfolio = await portfolioApi.createPortfolio(portfolioData);
  if (!portfolio)
  {return portfolio;}

  if (items && items.length > 0) {
    return addToPortfolio(portfolio, items);
  }
};

export const addToPortfolio = async (portfolioId, items) => {
  const request = async item => {
    const newItem = await portfolioItemApi.createPortfolioItem({ service_offering_ref: item });
    if (newItem) {
      await portfolioApi.addPortfolioItemToPortfolio(portfolioId, { portfolio_item_id: newItem.id });
    }

    return newItem;
  };

  return Promise.all(items.map(item => request(item)));
};

export const updatePortfolio = async ({ id, ...portfolioData }, store) =>
  portfolioApi.updatePortfolio(id,  sanitizeValues(portfolioData, 'Portfolio', store));

export const removePortfolio = portfolioId => portfolioApi.destroyPortfolio(portfolioId);

export const removePortfolioItem = portfolioItemId => portfolioItemApi.destroyPortfolioItem(portfolioItemId);

export const removePortfolioItems = async portfolioItemIds => {
  return Promise.all(portfolioItemIds.map(async itemId => {
    const { restore_key } = await removePortfolioItem(itemId);
    return {
      portfolioItemId: itemId,
      restoreKey: restore_key
    };
  }));
};

export const fetchProviderControlParameters = portfolioItemId =>
  axiosInstance.get(`${CATALOG_API_BASE}/portfolio_items/${portfolioItemId}/provider_control_parameters`)
  .then(data => ({
    required: [],
    ...data,
    properties: {
      ...data.properties,
      namespace: {
        ...data.properties.namespace,
        enum: Array.from(new Set([ ...data.properties.namespace.enum ]))
      }
    }}
  ));

export const updatePortfolioItem = async ({ id, ...portfolioItem }, store) =>
  portfolioItemApi.updatePortfolioItem(id, sanitizeValues(portfolioItem, 'PortfolioItem', store));

export const fetchPortfolioByName = (name = '') => axiosInstance.get(`${CATALOG_API_BASE}/portfolios`, {
  params: {
    filter: {
      name
    }
  }
});

export const restorePortfolioItems = restoreData =>
  Promise.all(restoreData.map(({ portfolioItemId, restoreKey }) =>
    portfolioItemApi.portfolioItemsPortfolioItemIdUndeletePost(portfolioItemId, { restore_key: restoreKey })));

export const copyPortfolio = portfolioId => portfolioApi.postCopyPortfolio(portfolioId);

export const copyPortfolioItem = (portfolioItemId, copyObject = {}) => portfolioItemApi.postCopyPortfolioItem(portfolioItemId, copyObject);

export const uploadPortfolioItemIcon = (portfolioItemId, file) => {
  let data = new FormData();
  data.append('content', file, file.name);
  data.append('portfolio_item_id', portfolioItemId);
  return axiosInstance.post(`${CATALOG_API_BASE}/icons`, data, {
    headers: {
      accept: 'application/json',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`
    }
  });
};
