import { getAxiosInstance, getPortfolioApi } from '../shared/user-login';
import { CATALOG_API_BASE } from '../../utilities/constants';

const axiosInstance = getAxiosInstance();
const userApi = getPortfolioApi();

export const getShareInfo = portfolioId => axiosInstance.get(`${CATALOG_API_BASE}/portfolios/${portfolioId}/share_info`);

export const sharePortfolio = data => {
  let policy = { permissions: data.permissions.split(','), group_uuids: [ data.group_uuid ]};
  return userApi.sharePortfolio(data.id, policy);
};

export const unsharePortfolio = data => {
  let policy = { permissions: data.permissions, group_uuids: [ data.group_uuid ]};
  return userApi.unsharePortfolio(data.id, policy);
};
