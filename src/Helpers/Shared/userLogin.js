import { AdminsApi, ApiClient as CatalogApiClient } from 'catalog_api' //'@manageiq/service-portal-api';
import { DefaultApi, ApiClient as TopologicalInventoryApiClient } from '@manageiq/topological_inventory';
import { AccessApi, PrincipalApi, GroupApi, ApiClient } from 'rbac_api_jsclient';
import { TOPOLOGICAL_INVENTORY_API_BASE, CATALOG_API_BASE, RBAC_API_BASE } from '../../Utilities/Constants';

const adminApi = new AdminsApi();

const defaultClient = TopologicalInventoryApiClient.instance;
defaultClient.basePath = TOPOLOGICAL_INVENTORY_API_BASE;

const sspDefaultClient = CatalogApiClient.instance;
sspDefaultClient.basePath = CATALOG_API_BASE;

let userTopologicalApi = new DefaultApi();

export function getTopologicalUserApi() {
  return userTopologicalApi;
}

export function getUserApi() {
  return adminApi;
}
const defaultRbacClient = ApiClient.instance;
defaultRbacClient.basePath = RBAC_API_BASE;

let rbacAccessApi = new AccessApi();
let rbacPrincipalApi = new PrincipalApi();
let rbacGroupApi = new GroupApi();

export function getRbacAccessApi() {
  return rbacAccessApi;
}

export function getRbacPrincipalApi() {
  return rbacPrincipalApi;
}

export function getRbacGroupApi() {
  return rbacGroupApi;
}
