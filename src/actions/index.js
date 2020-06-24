import { message } from 'antd';
import { createAction } from 'redux-actions';
import axios from 'axios';
import { httpClient } from '../http-client';
import api from '../apiRoutes';
import history from '../history';

export const logout = () => async (dispatch) => {
  dispatch(loginFailure());
  localStorage.removeItem('token');
};

export const loginRequest = createAction('LOGIN_REQUEST');
export const loginFailure = createAction('LOGIN_FAILURE');
export const loginSuccess = createAction('LOGIN_SUCCESS');

export const login = (username, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await httpClient.post(api.login(), {
      login: username,
      password,
    });
    localStorage.setItem('token', response.data.token);
    dispatch(loginSuccess({ data: response.data }));
  } catch (e) {
    console.log(e);
    dispatch(loginFailure());
    message.error('Логин/Пароль введен неправильно');
  }
};


export const getClientsRequest = createAction('GET_CLIENTS_REQUEST');
export const getClientsFailure = createAction('GET_CLIENTS_FAILURE');
export const getClientsSuccess = createAction('GET_CLIENTS_SUCCESS');

export const getClients = (params) => async (dispatch) => {
  dispatch(getClientsRequest());
  try {
    const response = await httpClient.get(api.clients(), {
      params: {
        ...params,
        per_page: 15,
      },
    });
    dispatch(getClientsSuccess({ data: response.data }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
  }
};


export const getKitchensRequest = createAction('GET_KITCHENS_REQUEST');
export const getKitchensFailure = createAction('GET_KITCHENS_FAILURE');
export const getKitchensSuccess = createAction('GET_KITCHENS_SUCCESS');

export const getKitchens = () => async (dispatch) => {
  dispatch(getKitchensRequest());
  try {
    const response = await httpClient.get(api.kitchens());
    dispatch(getKitchensSuccess({ data: response.data }));
  } catch (error) {
    console.log(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getKitchensFailure());
  }
};


export const editModifierRequest = createAction('EDIT_MODIFIER_REQUEST');
export const editModifierFailure = createAction('EDIT_MODIFIER_FAILURE');
export const editModifierSuccess = createAction('EDIT_MODIFIER_SUCCESS');

export const editModifier = (params, modifierId) => async (dispatch) => {
  dispatch(editModifierRequest());
  try {
    await httpClient.patch(api.modifierDetails(modifierId), {
      name: {
        ru: params.name_ru,
        uz: params.name_uz,
        en: params.name_en,
      },
      price: parseInt(params.price, 10),
    });
    dispatch(editModifierSuccess());
    message.success('Модификатор успешно изменен', 3);
    history.push('/products');
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(editModifierFailure());
    message.error('Ошибка при изменении продукта', 3);
  }
};


export const getRegionsRequest = createAction('GET_REGIONS_REQUEST');
export const getRegionsFailure = createAction('GET_REGIONS_FAILURE');
export const getRegionsSuccess = createAction('GET_REGIONS_SUCCESS');

export const getRegions = () => async (dispatch) => {
  dispatch(getRegionsRequest());
  try {
    const response = await httpClient.get(api.regions());
    dispatch(getRegionsSuccess({ data: response.data }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getRegionsFailure());
  }
};


export const getModifierDetailsRequest = createAction('GET_MODIFIER_DETAILS_REQUEST');
export const getModifierDetailsFailure = createAction('GET_MODIFIER_DETAILS_FAILURE');
export const getModifierDetailsSuccess = createAction('GET_MODIFIER_DETAILS_SUCCESS');

export const getModifierDetails = (modifierId) => async (dispatch) => {
  dispatch(getModifierDetailsRequest());
  try {
    const response = await httpClient.get(api.modifierDetails(modifierId));
    dispatch(getModifierDetailsSuccess({ data: response.data }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getModifierDetailsFailure());
  }
};


export const getProductsRequest = createAction('GET_PRODUCTS_REQUEST');
export const getProductsFailure = createAction('GET_PRODUCTS_FAILURE');
export const getProductsSuccess = createAction('GET_PRODUCTS_SUCCESS');

export const getProducts = () => async (dispatch) => {
  dispatch(getProductsRequest());
  try {
    const response = await httpClient.get(api.products());
    dispatch(getProductsSuccess({ data: response.data }));
  } catch (error) {
    console.log(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getProductsFailure());
  }
};


export const syncProducts = () => async (dispatch) => {
  dispatch(getProductsRequest());
  try {
    await httpClient.get(api.syncProducts());
    message.success('Продукты синхронизированны', 3);
    dispatch(getProducts());
  } catch (error) {
    console.log(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getProductsFailure());
    message.error('Ошибка синхронизации', 3);
  }
};


export const getRidersRequest = createAction('GET_RIDERS_REQUEST');
export const getRidersFailure = createAction('GET_RIDERS_FAILURE');
export const getRidersSuccess = createAction('GET_RIDERS_SUCCESS');

export const getRiders = (params) => async (dispatch) => {
  dispatch(getRidersRequest());
  try {
    const response = await httpClient.get(api.riders(), {
      params: {
        ...params,
        per_page: 15,
      },
    });
    dispatch(getRidersSuccess({ data: response.data }));
  } catch (error) {
    console.log(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getRidersFailure());
  }
};


export const getAdminsRequest = createAction('GET_ADMINS_REQUEST');
export const getAdminsFailure = createAction('GET_ADMINS_FAILURE');
export const getAdminsSuccess = createAction('GET_ADMINS_SUCCESS');

export const getAdmins = () => async (dispatch) => {
  dispatch(getAdminsRequest());
  try {
    const response = await httpClient.get(api.admins());
    dispatch(getAdminsSuccess({ data: response.data }));
  } catch (error) {
    console.log(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getAdminsFailure());
  }
};


export const getOrderDetailsRequest = createAction('GET_ORDER_DETAILS_REQUEST');
export const getOrderDetailsFailure = createAction('GET_ORDER_DETAILS_FAILURE');
export const getOrderDetailsSuccess = createAction('GET_ORDER_DETAILS_SUCCESS');

export const getOrderDetails = (id) => async (dispatch) => {
  dispatch(getOrderDetailsRequest());
  try {
    const response = await httpClient.get(api.orderDetails(id));
    dispatch(getOrderDetailsSuccess({ data: response.data }));
  } catch (error) {
    console.log(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getOrderDetailsFailure());
  }
};


export const getOrderLogsRequest = createAction('GET_ORDER_LOGS_REQUEST');
export const getOrderLogsFailure = createAction('GET_ORDER_LOGS_FAILURE');
export const getOrderLogsSuccess = createAction('GET_ORDER_LOGS_SUCCESS');

export const getOrderLogs = (id) => async (dispatch) => {
  dispatch(getOrderLogsRequest());
  try {
    const response = await httpClient.get(api.orderLogs(id));
    dispatch(getOrderLogsSuccess({ data: response.data, id }));
  } catch (error) {
    console.log(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getOrderLogsFailure());
  }
};


export const setOrderStateUnchanged = createAction('ORDER_STATE_UNCHANGED_SET');

export const patchOrderDetailsRequest = createAction('PATCH_ORDER_DETAILS_REQUEST');
export const patchOrderDetailsFailure = createAction('PATCH_ORDER_DETAILS_FAILURE');
export const patchOrderDetailsSuccess = createAction('PATCH_ORDER_DETAILS_SUCCESS');

export const patchOrderDetails = (id, body) => async (dispatch) => {
  dispatch(patchOrderDetailsRequest());
  try {
    const response = await httpClient.patch(api.orderDetails(id), body);
    dispatch(patchOrderDetailsSuccess({ data: response.data }));
    message.success('Заказ успешно изменен', 3);
    dispatch(setOrderStateUnchanged());
  } catch (error) {
    console.log(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    message.error('Ошибка при изменение заказа', 3);
    dispatch(patchOrderDetailsFailure());
  }
};

export const getActiveOrdersRequest = createAction('GET_ACTIVE_ORDERS_REQUEST');
export const getActiveOrdersFailure = createAction('GET_ACTIVE_ORDERS_FAILURE');
export const getActiveOrdersSuccess = createAction('GET_ACTIVE_ORDERS_SUCCESS');

export const getActiveOrders = () => async (dispatch) => {
  dispatch(getActiveOrdersRequest());
  try {
    const response = await httpClient.get(api.orders());
    dispatch(getActiveOrdersSuccess({ data: response.data }));
  } catch (error) {
    console.log(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getActiveOrdersFailure());
  }
};

export const getClientDetailsRequest = createAction('GET_CLIENTDETAILS_REQUEST');
export const getClientDetailsFailure = createAction('GET_CLIENTDETAILS_FAILURE');
export const getClientDetailsSuccess = createAction('GET_CLIENTDETAILS_SUCCESS');

export const getClientDetails = (clientId) => async (dispatch) => {
  dispatch(getClientDetailsRequest());
  try {
    const response = await httpClient.get(api.clientDetails(clientId));
    dispatch(getClientDetailsSuccess({ data: response.data, clientId }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getClientDetailsFailure());
  }
};

export const setIsBlockedClientRequest = createAction('SET_IS_BLOCKED_CLIENT_REQUEST');
export const setIsBlockedClientFailure = createAction('SET_IS_BLOCKED_CLIENT_FAILURE');
export const setIsBlockedClientSuccess = createAction('SET_IS_BLOCKED_CLIENT_SUCCESS');

export const setIsBlockedClient = (clientId, params) => async (dispatch) => {
  dispatch(setIsBlockedClientRequest());
  try {
    await httpClient.patch(api.clientDetails(clientId), params);
    dispatch(setIsBlockedClientSuccess());
    message.success('Клиент успешно блокирован', 3);
    dispatch(getClientDetails(clientId));
  } catch (error) {
    console.error(error);
    message.error('Ошибка при блокировании клиента', 3);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(setIsBlockedClientFailure());
  }
};

export const getRiderDetailsRequest = createAction('GET_RIDER_DETAILS_REQUEST');
export const getRiderDetailsFailure = createAction('GET_RIDER_DETAILS_FAILURE');
export const getRiderDetailsSuccess = createAction('GET_RIDER_DETAILS_SUCCESS');

export const getRiderDetails = (riderId) => async (dispatch) => {
  dispatch(getRiderDetailsRequest());
  try {
    const response = await httpClient.get(api.riderDetails(riderId));
    dispatch(getRiderDetailsSuccess({ data: response.data, riderId }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getRiderDetailsFailure());
  }
};

export const editRiderRequest = createAction('EDIT_RIDER_REQUEST');
export const editRiderFailure = createAction('EDIT_RIDER_FAILURE');
export const editRiderSuccess = createAction('EDIT_RIDER_SUCCESS');

export const editRider = (riderParams, id) => async (dispatch) => {
  dispatch(editRiderRequest());
  try {
    await httpClient.patch(api.riderDetails(id), {
      is_blocked: riderParams.is_blocked,
      ...riderParams,
    });
    dispatch(editRiderSuccess());
    history.push('/riders/');
    dispatch(getRiderDetails(id));
    message.success('Курьер успешно изменён', 3);
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(editRiderFailure());
  }
};

export const createRiderRequest = createAction('CREATE_RIDER_REQUEST');
export const createRiderFailure = createAction('CREATE_RIDER_FAILURE');
export const createRiderSuccess = createAction('CREATE_RIDER_SUCCESS');

export const createRider = (params) => async (dispatch) => {
  dispatch(createRiderRequest());
  try {
    await httpClient.post(api.riders(), params);
    dispatch(createRiderSuccess());
    message.success('Курьер успешно создан', 3);
    history.push('/riders/')
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(createRiderFailure());
    message.error('Ошибка при создании курьера', 3);
  }
};

export const editDepositRequest = createAction('EDIT_DEPOSIT_REQUEST');
export const editDepositFailure = createAction('EDIT_DEPOSIT_FAILURE');
export const editDepositSuccess = createAction('EDIT_DEPOSIT_SUCCESS');

export const editDeposit = (deposit, id) => async (dispatch) => {
  dispatch(editDepositRequest());
  try {
    await httpClient.post(api.riderDeposit(id), deposit);
    dispatch(editDepositSuccess());
    message.success('Депозит успешно изменен', 3);
    dispatch(getRiderDetails(id));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(editDepositFailure());
    message.error('Ошибка при изменение депозита', 3);
  }
};

export const cancelOrderRequest = createAction('CANCEL_ORDER_REQUEST');
export const cancelOrderFailure = createAction('CANCEL_ORDER_FAILURE');
export const cancelOrderSuccess = createAction('CANCEL_ORDER_SUCCESS');

export const cancelOrder = (orderId, body, successURL) => async (dispatch) => {
  dispatch(cancelOrderRequest());
  try {
    await httpClient.post(api.cancelOrder(orderId), body);
    dispatch(cancelOrderSuccess());
    message.success('Заказ успешно отменен', 3);
    history.push(successURL);
    dispatch(getActiveOrders());
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(cancelOrderFailure());
    message.error('Ошибка при отмене заказа', 3);
  }
};

export const deleteAdminRequest = createAction('DELETE_ADMIN_REQUEST');
export const deleteAdminFailure = createAction('DELETE_ADMIN_FAILURE');
export const deleteAdminSuccess = createAction('DELETE_ADMIN_SUCCESS');

export const deleteAdmin = (id) => async (dispatch) => {
  dispatch(deleteAdminRequest());
  try {
    await httpClient.delete(api.deleteAdmin(id));
    dispatch(deleteAdminSuccess());
    message.success('Админ успешно удален', 3);
    dispatch(getAdmins());
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(deleteAdminFailure());
    message.error('Ошибка при удалении админа', 3);
  }
};

export const getAdminEditDetails = createAction('GET_ADMIN_EDIT_DETAILS');

export const getAdminPermissionsRequest = createAction('GET_ADMIN_PERMISSIONS_REQUEST');
export const getAdminPermissionsFailure = createAction('GET_ADMIN_PERMISSIONS_FAILURE');
export const getAdminPermissionsSuccess = createAction('GET_ADMIN_PERMISSIONS_SUCCESS');

export const getAdminPermissions = () => async (dispatch) => {
  dispatch(getAdminPermissionsRequest());
  try {
    const response = await httpClient.get(api.adminPermissions());
    dispatch(getAdminPermissionsSuccess({ data: response.data }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getAdminPermissionsFailure());
  }
};


export const editAdminRequest = createAction('EDIT_ADMIN_REQUEST');
export const editAdminFailure = createAction('EDIT_ADMIN_FAILURE');
export const editAdminSuccess = createAction('EDIT_ADMIN_SUCCESS');

export const editAdmin = (params, id) => async (dispatch) => {
  dispatch(editAdminRequest());
  try {
    await httpClient.patch(api.editAdmin(id), params);
    dispatch(editAdminSuccess());
    message.success('Админ успешно изменен', 3);
    history.push('/admins/');
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(editAdminFailure());
    message.error('Ошибка при изменении админа', 3);
  }
};

export const createAdminRequest = createAction('CREATE_ADMIN_REQUEST');
export const createAdminFailure = createAction('CREATE_ADMIN_FAILURE');
export const createAdminSuccess = createAction('CREATE_ADMIN_SUCCESS');

export const createAdmin = (params) => async (dispatch) => {
  dispatch(createAdminRequest());
  try {
    await httpClient.post(api.admins(), params);
    dispatch(createAdminSuccess());
    message.success('Админ успешно создан', 3);
    history.push('/admins/');
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(createAdminFailure());
    message.error('Ошибка при создании админа', 3);
  }
};


export const setMenuActive = createAction('SET_MENU_ACTIVE');
export const setOrderStateChanged = createAction('ORDER_STATE_CHANGED_SET');


export const getAvailableProductsRequest = createAction('GET_AVAILABLE_PRODUCTS_REQUEST');
export const getAvailableProductsFailure = createAction('GET_AVAILABLE_PRODUCTS_FAILURE');
export const getAvailableProductsSuccess = createAction('GET_AVAILABLE_PRODUCTS_SUCCESS');

export const getAvailableProducts = (orderId) => async (dispatch) => {
  dispatch(getAvailableProductsRequest());
  try {
    const response = await httpClient.get(api.availableProducts(orderId));
    dispatch(getAvailableProductsSuccess({ data: response.data }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getAvailableProductsFailure());
  }
};


export const acceptOrderRequest = createAction('ACCEPT_ORDER_REQUEST');
export const acceptOrderFailure = createAction('ACCEPT_ORDER_FAILURE');
export const acceptOrderSuccess = createAction('ACCEPT_ORDER_SUCCESS');

export const acceptOrder = (orderId, successURL) => async (dispatch) => {
  dispatch(acceptOrderRequest());
  try {
    await httpClient.post(api.acceptOrder(orderId));
    dispatch(acceptOrderSuccess());
    message.success('Заказ успешно принят', 3);
    history.push(successURL);
    dispatch(getOrderDetails(orderId));
    dispatch(getAvailableProducts(orderId));
    dispatch(getActiveOrders());
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(acceptOrderFailure());
    message.error('Ошибка при принятии заказа', 3);
  }
};

export const getCategoryRequest = createAction('GET_CATEGORY_REQUEST');
export const getCategoryFailure = createAction('GET_CATEGORY_FAILURE');
export const getCategorySuccess = createAction('GET_CATEGORY_SUCCESS');

export const getCategory = () => async (dispatch) => {
  dispatch(getCategoryRequest());
  try {
    const response = await httpClient.get(api.productsCategory());
    dispatch(getCategorySuccess({ data: response.data }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getCategoryFailure());
  }
};

export const getProductDetailsRequest = createAction('GET_PRODUCT_DETAILS_REQUEST');
export const getProductDetailsFailure = createAction('GET_PRODUCT_DETAILS_FAILURE');
export const getProductDetailsSuccess = createAction('GET_PRODUCT_DETAILS_SUCCESS');

export const getProductDetails = (productId) => async (dispatch) => {
  dispatch(getProductDetailsRequest());
  try {
    const response = await httpClient.get(api.product(productId));
    dispatch(getProductDetailsSuccess({ data: response.data }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getProductDetailsFailure());
  }
};

export const createProductRequest = createAction('CREATE_PRODUCT_REQUEST');
export const createProductFailure = createAction('CREATE_PRODUCT_FAILURE');
export const createProductSuccess = createAction('CREATE_PRODUCT_SUCCESS');

export const createProduct = (params) => async (dispatch) => {
  dispatch(createProductRequest());
  try {
    await httpClient.post(api.products(), {
      photo: params.photo,
      thumbnail: params.thumbnail,
      name: {
        ru: params.name_ru,
        uz: params.name_uz,
        en: params.name_en,
      },
      description: {
        ru: params.description_ru,
        uz: params.description_uz,
        en: params.description_en,
      },
      position: parseInt(params.position, 10),
      price: parseInt(params.price, 10),
      energy: params.energy ? parseInt(params.energy, 10) : undefined,
      category_id: params.category_id ? parseInt(params.category_id, 10) : undefined,
    });
    dispatch(createProductSuccess());
    message.success('Продукт успешно создан', 3);
    history.push('/products/');
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(createProductFailure());
    message.error('Ошибка при создании продукта', 3);
  }
};


export const deleteProductRequest = createAction('DELETE_PRODUCT_REQUEST');
export const deleteProductFailure = createAction('DELETE_PRODUCT_FAILURE');
export const deleteProductSuccess = createAction('DELETE_PRODUCT_SUCCESS');

export const deleteProduct = (id) => async (dispatch) => {
  dispatch(deleteProductRequest());
  try {
    await httpClient.delete(api.product(id));
    dispatch(deleteProductSuccess());
    message.success('Продукт успешно удален', 3);
    dispatch(getProducts());
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(deleteProductFailure());
    message.error('Ошибка при удалении продукта', 3);
  }
};

export const editProductRequest = createAction('EDIT_PRODUCT_REQUEST');
export const editProductFailure = createAction('EDIT_PRODUCT_FAILURE');
export const editProductSuccess = createAction('EDIT_PRODUCT_SUCCESS');

export const editProduct = (params, productId) => async (dispatch) => {
  dispatch(editProductRequest());
  try {
    await httpClient.patch(api.product(productId), {
      photo: params.photo,
      thumbnail: params.thumbnail,
      name: {
        ru: params.name_ru,
        uz: params.name_uz,
        en: params.name_en,
      },
      description: {
        ru: params.description_ru,
        uz: params.description_uz,
        en: params.description_en,
      },
      position: parseInt(params.position, 10),
      price: parseInt(params.price, 10),
      energy: params.energy ? parseInt(params.energy, 10) : undefined,
      category_id: params.category_id === undefined ? null : params.category_id,
    });
    dispatch(editProductSuccess());
    message.success('Продукт успешно изменен', 3);
    history.push('/products');
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(editProductFailure());
    message.error('Ошибка при изменении продукта', 3);
  }
};


export const getKitchenDetailsRequest = createAction('GET_KITCHEN_DETAILS_REQUEST');
export const getKitchenDetailsFailure = createAction('GET_KITCHEN_DETAILS_FAILURE');
export const getKitchenDetailsSuccess = createAction('GET_KITCHEN_DETAILS_SUCCESS');

export const getKitchenDetails = (kitchenId) => async (dispatch) => {
  dispatch(getKitchenDetailsRequest());
  try {
    const response = await httpClient.get(api.kitchenDetails(kitchenId));
    dispatch(getKitchenDetailsSuccess({ data: response.data }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getKitchenDetailsFailure());
  }
};

export const getTerminalsRequest = createAction('GET_TERMINALS_REQUEST');
export const getTerminalsFailure = createAction('GET_TERMINALS_FAILURE');
export const getTerminalsSuccess = createAction('GET_TERMINALS_SUCCESS');

export const getTerminals = () => async (dispatch) => {
  dispatch(getTerminalsRequest());
  try {
    const response = await httpClient.get(api.terminals());
    dispatch(getTerminalsSuccess({ data: response.data }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getTerminalsFailure());
  }
};

export const createKitchenRequest = createAction('CREATE_KITCHEN_REQUEST');
export const createKitchenFailure = createAction('CREATE_KITCHEN_FAILURE');
export const createKitchenSuccess = createAction('CREATE_KITCHEN_SUCCESS');

export const createKitchen = (params) => async (dispatch) => {
  dispatch(createKitchenRequest());
  try {
    await httpClient.post(api.kitchens(), {
      bot_id: params.bot_id,
      name: params.name,
      location: {
        longitude: parseFloat(params.longitude),
        latitude: parseFloat(params.latitude),
      },
      start_at: params.startAt,
      end_at: params.endAt,
      payload: JSON.parse(params.payload),
    });
    dispatch(createKitchenSuccess());
    message.success('Кухня успешно создана', 3);
    history.push('/kitchens/');
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(createKitchenFailure());
    message.error('Ошибка при создании кухни', 3);
  }
};

export const activeOrderTab = createAction('ACTIVE_ORDER_TAB');

export const getFinishedOrdersRequest = createAction('GET_FINISHED_ORDERS_REQUEST');
export const getFinishedOrdersFailure = createAction('GET_FINISHED_ORDERS_FAILURE');
export const getFinishedOrdersSuccess = createAction('GET_FINISHED_ORDERS_SUCCESS');

export const getFinishedOrders = (params) => async (dispatch) => {
  dispatch(getFinishedOrdersRequest());
  try {
    const response = await httpClient.get(api.getFinishedOrder(), {
      params: {
        ...params,
        per_page: 15,
      },
    });
    dispatch(getFinishedOrdersSuccess({ data: response.data }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getFinishedOrdersFailure());
  }
};

export const editKitchenRequest = createAction('EDIT_KITCHEN_REQUEST');
export const editKitchenFailure = createAction('EDIT_KITCHEN_FAILURE');
export const editKitchenSuccess = createAction('EDIT_KITCHEN_SUCCESS');

export const editKitchen = (params) => async (dispatch) => {
  dispatch(editKitchenRequest());
  try {
    await httpClient.patch(api.kitchenDetails(params.id), {
      bot_id: params.bot_id,
      name: params.name,
      location: {
        longitude: parseFloat(params.longitude),
        latitude: parseFloat(params.latitude),
      },
      start_at: params.start_at,
      end_at: params.end_at,
      payload: JSON.parse(params.payload),
      is_disabled: params.is_disabled,
    });
    dispatch(editKitchenSuccess());
    message.success('Кухня успешно изменена', 3);
    history.push('/kitchens/');
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(editKitchenFailure());
    message.error('Ошибка при изменении кухни', 3);
  }
};


export const getKitchenProductsRequest = createAction('GET_KITCHEN_PRODUCTS_REQUEST');
export const getKitchenProductsFailure = createAction('GET_KITCHEN_PRODUCTS_FAILURE');
export const getKitchenProductsSuccess = createAction('GET_KITCHEN_PRODUCTS_SUCCESS');

export const getKitchenProducts = (kitchenId) => async (dispatch) => {
  dispatch(getKitchenProductsRequest());
  try {
    const response = await httpClient.get(api.kitchenProducts(kitchenId));
    dispatch(getKitchenProductsSuccess({ data: response.data }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getKitchenProductsFailure());
  }
};


export const addDisabledProductRequest = createAction('ADD_DISABLED_PRODUCT_REQUEST');
export const addDisabledProductFailure = createAction('ADD_DISABLED_PRODUCT_FAILURE');
export const addDisabledProductSuccess = createAction('ADD_DISABLED_PRODUCT_SUCCESS');

export const addDisabledProduct = (kitchenId, productId) => async (dispatch) => {
  dispatch(addDisabledProductRequest());
  try {
    const response = await httpClient.post(api.kitchenDisabledAction(kitchenId, productId));
    dispatch(addDisabledProductSuccess({ data: response.data }));
    message.success('Успешно добавлено', 3);
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(addDisabledProductFailure());
    message.error('Ошибка при добавлении', 3);
  }
};

export const deleteDisabledProductRequest = createAction('DELETE_DISABLED_PRODUCT_REQUEST');
export const deleteDisabledProductFailure = createAction('DELETE_DISABLED_PRODUCT_FAILURE');
export const deleteDisabledProductSuccess = createAction('DELETE_DISABLED_PRODUCT_SUCCESS');

export const deleteDisabledProduct = (kitchenId, productId) => async (dispatch) => {
  dispatch(deleteDisabledProductRequest());
  try {
    const response = await httpClient.delete(api.kitchenDisabledAction(kitchenId, productId));
    dispatch(deleteDisabledProductSuccess({ data: response.data }));
    message.success('Успешно удалено', 3);
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(deleteDisabledProductFailure());
    message.error('Ошибка при удалении', 3);
  }
};


export const getAnnouncementsRequest = createAction('GET_ANNOUNCEMENTS_REQUEST');
export const getAnnouncementsFailure = createAction('GET_ANNOUNCEMENTS_FAILURE');
export const getAnnouncementsSuccess = createAction('GET_ANNOUNCEMENTS_SUCCESS');

export const getAnnouncements = (params) => async (dispatch) => {
  dispatch(getAnnouncementsRequest());
  try {
    const response = await httpClient.get(api.announcements(), {
      params: {
        ...params,
        per_page: 15,
      },
    });
    dispatch(getAnnouncementsSuccess({ data: response.data }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getAnnouncementsFailure());
  }
};

export const uploadFileRequest = createAction('UPLOAD_FILE_REQUEST');
export const uploadFileFailure = createAction('UPLOAD_FILE_FAILURE');
export const uploadFileSuccess = createAction('UPLOAD_FILE_SUCCESS');

export const uploadFile = (file, signedURL) => async (dispatch) => {
  dispatch(uploadFileRequest());
  try {
    await axios.put(signedURL, file);
    dispatch(uploadFileSuccess());
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(uploadFileFailure());
    message.error('Ошибка при загрузке файла', 3);
  }
};

export const getSignedURLRequest = createAction('GET_SIGNED_URL_REQUEST');
export const getSignedURLSuccess = createAction('GET_SIGNED_URL_SUCCESS');
export const getSignedURLFailure = createAction('GET_SIGNED_URL_FAILURE');

export const getSignedURL = (folder, file) => async (dispatch) => {
  dispatch(getSignedURLRequest());
  try {
    const response = await httpClient.get(api.getSignedURL(), {
      params: {
        folder,
        'file-name': file.name,
      },
    });
    dispatch(getSignedURLSuccess());
    await dispatch(uploadFile(file, response.data.signedRequest));
    return response.data.url;
  } catch (error) {
    dispatch(getSignedURLFailure());
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    message.error('Ошибка во время подготовки запроса на загрузку', 3);
    return error;
  }
};

export const createAnnouncementRequest = createAction('CREATE_ANNOUNCEMENT_REQUEST');
export const createAnnouncementFailure = createAction('CREATE_ANNOUNCEMENT_FAILURE');
export const createAnnouncementSuccess = createAction('CREATE_ANNOUNCEMENT_SUCCESS');


export const createAnnouncement = (params) => async (dispatch) => {
  dispatch(createAnnouncementRequest());
  try {
    await httpClient.post(api.announcements(), params);
    dispatch(createAnnouncementSuccess());
    message.success('Объявление успешно создано', 3);
    history.push('/announcements/');
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(createAnnouncementFailure());
    message.error('Ошибка при создании объявления', 3);
  }
};


export const getAnnouncementDetailsRequest = createAction('GET_ANNOUNCEMENT_DETAILS_REQUEST');
export const getAnnouncementDetailsFailure = createAction('GET_ANNOUNCEMENT_DETAILS_FAILURE');
export const getAnnouncementDetailsSuccess = createAction('GET_ANNOUNCEMENT_DETAILS_SUCCESS');


export const getAnnouncementDetails = (id) => async (dispatch) => {
  dispatch(getAnnouncementDetailsRequest());
  try {
    const response = await httpClient.get(api.announcementDetails(id));
    dispatch(getAnnouncementDetailsSuccess({ data: response.data }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getAnnouncementDetailsFailure());
  }
};


export const editAnnouncementRequest = createAction('EDIT_ANNOUNCEMENT_REQUEST');
export const editAnnouncementFailure = createAction('EDIT_ANNOUNCEMENT_FAILURE');
export const editAnnouncementSuccess = createAction('EDIT_ANNOUNCEMENT_SUCCESS');


export const editAnnouncement = (params, announcementsId) => async (dispatch) => {
  dispatch(editAnnouncementRequest());
  try {
    await httpClient.patch(api.announcementDetails(announcementsId), params);
    dispatch(editAnnouncementSuccess());
    message.success('Объявление успешно изменено', 3);
    history.push('/announcements/');
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(editAnnouncementFailure());
    message.error('Ошибка при изменении объявление', 3);
  }
};


export const deleteAnnouncementRequest = createAction('DELETE_ANNOUNCEMENT_REQUEST');
export const deleteAnnouncementFailure = createAction('DELETE_ANNOUNCEMENT_FAILURE');
export const deleteAnnouncementSuccess = createAction('DELETE_ANNOUNCEMENT_SUCCESS');

export const deleteAnnouncement = (announcementsId) => async (dispatch) => {
  dispatch(deleteAnnouncementRequest());
  try {
    await httpClient.delete(api.announcementDetails(announcementsId));
    dispatch(deleteAnnouncementSuccess());
    message.success('Объявление успешно удалено', 3);
    dispatch(getAnnouncements());
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(deleteAnnouncementFailure());
    message.error('Ошибка при удалении объявления', 3);
  }
};


export const getParamsRequest = createAction('GET_PARAMS_REQUEST');
export const getParamsFailure = createAction('GET_PARAMS_FAILURE');
export const getParamsSuccess = createAction('GET_PARAMS_SUCCESS');

export const getParams = () => async (dispatch) => {
  dispatch(getParamsRequest());
  try {
    const response = await httpClient.get(api.params());
    dispatch(getParamsSuccess({ data: response.data }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getParamsFailure());
  }
};

export const addOrderProduct = createAction('ADD_ORDER_PRODUCT');
export const removeOrderProduct = createAction('REMOVE_ORDER_PRODUCT');


export const openSettingModal = createAction('OPEN_SETTING_MODAL');
export const closeSettingModal = createAction('CLOSE_SETTING_MODAL');

export const editParametersRequest = createAction('EDIT_PARAMETERS_REQUEST');
export const editParametersFailure = createAction('EDIT_PARAMETERS_FAILURE');
export const editParametersSuccess = createAction('EDIT_PARAMETERS_SUCCESS');

export const editParameters = (editId, value) => async (dispatch) => {
  dispatch(editParametersRequest());
  try {
    await httpClient.patch(api.editParam(editId), value);
    dispatch(editParametersSuccess());
    message.success('Настройка успешно изменено', 3);
    dispatch(getParams());
    dispatch(closeSettingModal());
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(editParametersFailure());
    message.error('Ошибка при измении настройки', 3);
  }
};

export const getBotsIdRequest = createAction('GET_BOTS_ID_REQUEST');
export const getBotsIdFailure = createAction('GET_BOTS_ID_FAILURE');
export const getBotsIdSuccess = createAction('GET_BOTS_ID_SUCCESS');

export const getBotsId = () => async (dispatch) => {
  dispatch(getBotsIdRequest());
  try {
    const response = await httpClient.get(api.getBot());
    dispatch(getBotsIdSuccess({ data: response.data }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getBotsIdFailure());
  }
};

export const editClientDetailsRequest = createAction('EDIT_CLIENT_DETAILS_REQUEST');
export const editClientDetailsFailure = createAction('EDIT_CLIENT_DETAILS_FAILURE');
export const editClientDetailsSuccess = createAction('EDIT_CLIENT_DETAILS_SUCCESS');

export const editClientDetails = (clientId, body) => async (dispatch) => {
  dispatch(editClientDetailsRequest());
  try {
    await httpClient.patch(api.clientDetails(clientId), body);
    dispatch(editClientDetailsSuccess());
    message.success('Клиент успешно изменен', 3);
    history.push('/clients/');
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(editClientDetailsFailure());
    message.error('Ошибка при измении клиента', 3);
  }
};

export const getMeRequest = createAction('GET_ME_REQUEST');
export const getMeFailure = createAction('GET_ME_FAILURE');
export const getMeSuccess = createAction('GET_ME_SUCCESS');

export const getMe = () => async (dispatch) => {
  dispatch(getMeRequest());
  try {
    const response = await httpClient.get(api.getMe());
    dispatch(getMeSuccess({ data: response.data }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getMeFailure());
  }
};

export const createCategoryRequest = createAction('CREATE_CATEGORY_REQUEST');
export const createCategoryFailure = createAction('CREATE_CATEGORY_FAILURE');
export const createCategorySuccess = createAction('CREATE_CATEGORY_SUCCESS');

export const createCategory = (params) => async (dispatch) => {
  dispatch(createCategoryRequest());
  try {
    await httpClient.post(api.productsCategory(), {
      name: {
        ru: params.name_ru,
        uz: params.name_uz,
        en: params.name_en,
      },
      bot_id: params.bot_id,
      position: parseInt(params.position, 10),
      emoji: params.emoji,
      is_delivery_free: params.shipping,
    });
    dispatch(createCategorySuccess());
    message.success('Категория успешно создана', 3);
    history.push('/products/categories/');
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(createCategoryFailure());
    message.error('Ошибка при создании категории', 3);
  }
};

export const deleteCategoryRequest = createAction('DELETE_Category_REQUEST');
export const deleteCategoryFailure = createAction('DELETE_Category_FAILURE');
export const deleteCategorySuccess = createAction('DELETE_Category_SUCCESS');

export const deleteCategory = (id) => async (dispatch) => {
  dispatch(deleteCategoryRequest());
  try {
    await httpClient.delete(api.categoryDetails(id));
    dispatch(deleteCategorySuccess());
    message.success('Категория успешно удалена', 3);
    dispatch(getCategory());
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(deleteCategoryFailure());
    message.error('Ошибка при удалении категории', 3);
  }
};

export const getCategoryDetailsRequest = createAction('GET_CATEGORY_DETAILS_REQUEST');
export const getCategoryDetailsFailure = createAction('GET_CATEGORY_DETAILS_FAILURE');
export const getCategoryDetailsSuccess = createAction('GET_CATEGORY_DETAILS_SUCCESS');

export const getCategoryDetails = (id) => async (dispatch) => {
  dispatch(getCategoryDetailsRequest());
  try {
    const response = await httpClient.get(api.categoryDetails(id));
    dispatch(getCategoryDetailsSuccess({ data: response.data }));
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    dispatch(getCategoryDetailsFailure());
  }
};

export const editCategoryDetailsRequest = createAction('EDIT_CATEGORY_DETAILS_REQUEST');
export const editCategoryDetailsFailure = createAction('EDIT_CATEGORY_DETAILS_FAILURE');
export const editCategoryDetailsSuccess = createAction('EDIT_CATEGORY_DETAILS_SUCCESS');

export const editCategoryDetails = (params, id) => async (dispatch) => {
  dispatch(editCategoryDetailsRequest());
  try {
    await httpClient.patch(api.categoryDetails(id), {
      name: {
        ru: params.name_ru,
        uz: params.name_uz,
        en: params.name_en,
      },
      bot_id: params.bot_id,
      position: parseInt(params.position, 10),
      emoji: params.emoji,
      is_delivery_free: params.shipping,
    });
    dispatch(editCategoryDetailsSuccess());
    history.push('/products/categories/');
    message.success('Категория успешно изменена', 3);
  } catch (error) {
    console.error(error);
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(loginFailure());
    }
    message.success('Ошибка при изменеии категории', 3);
    dispatch(editCategoryDetailsFailure());
  }
};
