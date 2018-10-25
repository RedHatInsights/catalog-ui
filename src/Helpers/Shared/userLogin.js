import React from 'react';

const ServicePortalApi = require('../../../service_portal-api-js');
const defaultClient = ServicePortalApi.ApiClient.instance;

// Configure HTTP basic authorization: UserSecurity
const AdminSecurity = defaultClient.authentications['AdminSecurity'];

// TODO - replace with actual login info when available
let admin_hash = {'x-rh-auth-identity': btoa(JSON.stringify({'identity': {'is_org_admin': true }}))};
const adminApi = new ServicePortalApi.AdminsApi();
Object.assign(adminApi.apiClient.defaultHeaders, admin_hash);

export function getUserApi(){
  return adminApi;
}



var TopologicalInventory = require('../../../topological_inventory-api');

var topologicalDefaultClient = TopologicalInventory.ApiClient.instance;

// Configure HTTP basic authorization: UserSecurity
var UserSecurity = topologicalDefaultClient.authentications['UserSecurity'];
//UserSecurity.username = 'YOUR USERNAME'
//UserSecurity.password = 'YOUR PASSWORD'

var userTopologicalApi = new TopologicalInventory.DefaultApi()


export function getTopologicalUserApi(){
  return userTopologicalApi;
}


