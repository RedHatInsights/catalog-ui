export const DEFAULT_PAGE_SIZE = 50;
//export const SOURCES_API_BASE = `/r/insights/platform/topological-inventory/v0.0`;

const apiHost = process.env.API_HOST || 'localhost';
const apiPort = process.env.API_PORT || '5000';
/**
 * Bse path:
 * should be r/insights/platform/service-portal/v0.0/ and redirected via proxy to localhost
 * then we can remove host and aport
 */
const basePath = process.env.BASE_PATH || '';
const apiVersion = process.env.API_VERSION || '/api/v0.0';
export const SERVICE_PORTAL_API_BASE = `https://${apiHost}:${apiPort}${basePath}${apiVersion.replace(/\/+$/, '')}`;


const topo_apiHost = process.env.TOPO_API_HOST || 'topological-inventory-api-topological-inventory-ci.10.8.96.54.nip.io';
const topo_apiPort = process.env.TOPO_API_PORT || '443';
const topo_basePath = process.env.TOPO_BASE_PATH || '';
const topo_apiVersion =  process.env.TOPO_API_VERSION || '/api/v0.0';
export const SOURCES_API_BASE = `https://${topo_apiHost}:${topo_apiPort}${topo_basePath}${topo_apiVersion.replace(/\/+$/, '')}`;
