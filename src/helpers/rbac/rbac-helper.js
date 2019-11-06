import { getRbacGroupApi } from '../shared/user-login';

const api = getRbacGroupApi();

export const getRbacGroups = () =>api.listGroups();
