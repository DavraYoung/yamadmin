import { message } from 'antd';
import { createAction } from 'redux-actions';
import axios from 'axios';
import { httpClient } from '../http-client';
import api from '../apiRoutes';
import history from '../history';


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

export const cancelOrder = (orderId) => async (dispatch) => {
  dispatch(cancelOrderRequest());
  try {
    await httpClient.post(api.cancelOrder(orderId));
    dispatch(cancelOrderSuccess());
    message.success('Заказ успешно отменен', 3);
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
    await dispatch(deleteAdminSuccess());
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

export const acceptOrderRequest = createAction('ACCEPT_ORDER_REQUEST');
export const acceptOrderFailure = createAction('ACCEPT_ORDER_FAILURE');
export const acceptOrderSuccess = createAction('ACCEPT_ORDER_SUCCESS');

export const acceptOrder = (orderId) => async (dispatch) => {
  dispatch(acceptOrderRequest());
  try {
    await httpClient.post(api.acceptOrder(orderId));
    dispatch(acceptOrderSuccess());
    message.success('Заказ успешно принят', 3);
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
      ...params,
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
      ...params,
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

export const createKitchenRequest = createAction('CREATE_KITCHEN_REQUEST');
export const createKitchenFailure = createAction('CREATE_KITCHEN_FAILURE');
export const createKitchenSuccess = createAction('CREATE_KITCHEN_SUCCESS');

export const createKitchen = (params) => async (dispatch) => {
  dispatch(createKitchenRequest());
  try {
    await httpClient.post(api.kitchens(), {
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


export const openViewSocket = (orderID) => async () => {
  try {
    const url = api.viewOrderSocket().replace('https://', 'ws://');
    const socket = new WebSocket(url);
    socket.onopen = () => {
      const data = JSON.stringify({
        token: localStorage.getItem('token'),
        order: orderID,
      });
      socket.send(data)
    };
  } catch (error) {
    console.error(error);
    message.error('Ошибка при подключении к сокету', 3);
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
    dispatch(uploadFileFailure());
    message.error('Ошибка при загрузке', 3);
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
    message.error('Ошибка при загрузке', 3);
    return error;
  }
};
