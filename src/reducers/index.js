import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  groupBy, indexDuplicates, last,
} from '../utils'
import * as actions from '../actions';


const clients = handleActions({
  [actions.getClientsRequest](state) {
    return {
      ...state,
      status: 'request',
    };
  },
  [actions.getClientsFailure](state) {
    return {
      ...state,
      status: 'failure',
    };
  },
  [actions.getClientsSuccess](state, { payload: { data } }) {
    console.log(data);
    return {
      ...state,
      status: 'success',
      list: data.data,
      page: data.page,
      total: data.count,
    }
  },
  [actions.getClientDetailsRequest](state) {
    return {
      ...state,
      detailsStatus: 'request',
    }
  },
  [actions.getClientDetailsFailure](state) {
    return {
      ...state,
      detailsStatus: 'failure',
    };
  },
  [actions.getClientDetailsSuccess](state, { payload: { data, clientId } }) {
    return {
      ...state,
      detailsStatus: 'success',
      detailsData: {
        ...state.detailsData,
        [clientId]: data,
      },
    };
  },
  [actions.setIsBlockedClientRequest](state) {
    return {
      ...state,
      blockedStatus: 'request',
    }
  },
  [actions.setIsBlockedClientFailure](state) {
    return {
      ...state,
      blockedStatus: 'failure',
    };
  },
  [actions.setIsBlockedClientSuccess](state) {
    return {
      ...state,
      blockedStatus: 'success',
    }
  },
  [actions.editClientDetailsRequest](state) {
    return {
      ...state,
      editStatus: 'request',
    }
  },
  [actions.editClientDetailsFailure](state) {
    return {
      ...state,
      editStatus: 'failure',
    }
  },
  [actions.editClientDetailsSuccess](state) {
    return {
      ...state,
      editStatus: 'success',
    }
  },
}, {
  list: [],
  status: null,
  page: 1,
  detailsData: {},
});

const riders = handleActions({
  [actions.getRidersRequest](state) {
    return {
      ...state,
      status: 'request',
    }
  },
  [actions.getRidersFailure](state) {
    return {
      ...state,
      status: 'failure',
    }
  },
  [actions.getRidersSuccess](state, { payload: { data } }) {
    console.log(data);
    return {
      ...state,
      status: 'success',
      list: data.data,
      total: data.count,
      page: data.page,
    }
  },
  [actions.getRiderDetailsRequest](state) {
    return {
      ...state,
      riderDetailsStatus: 'request',
    }
  },
  [actions.getRiderDetailsFailure](state) {
    return {
      ...state,
      riderDetailsStatus: 'failure',
    };
  },
  [actions.getRiderDetailsSuccess](state, { payload: { data, riderId } }) {
    return {
      ...state,
      riderDetailsStatus: 'success',
      riderDetails: {
        ...state.riderDetails,
        [riderId]: data,
      },
      editRiderDetails: data,
    };
  },
  [actions.editRiderRequest](state) {
    return {
      ...state,
      editRiderStatus: 'request',
    };
  },
  [actions.editRiderFailure](state) {
    return {
      ...state,
      editRiderStatus: 'failure',
    };
  },
  [actions.editRiderSuccess](state) {
    return {
      ...state,
      editRiderStatus: 'success',
    };
  },
  [actions.createRiderRequest](state) {
    return {
      ...state,
      createRiderStatus: 'request',
    };
  },
  [actions.createRiderFailure](state) {
    return {
      ...state,
      createRiderStatus: 'failure',
    };
  },
  [actions.createRiderSuccess](state) {
    return {
      ...state,
      createRiderStatus: 'success',
    };
  },
  [actions.editDepositRequest](state) {
    return {
      ...state,
      depositStatus: 'request',
    };
  },
  [actions.editDepositFailure](state) {
    return {
      ...state,
      depositStatus: 'failure',
    };
  },
  [actions.editDepositSuccess](state) {
    return {
      ...state,
      depositStatus: 'success',
    };
  },
}, {
  list: [],
  status: null,
  page: 1,
  editRiderDetails: {
    tid: null,
    name: null,
    phone: null,
    notes: null,
    is_blocked: null,
  },
  riderDetailsStatus: null,
  riderDetails: {},
});


const modifiers = handleActions({
  [actions.getModifierDetailsRequest](state) {
    return {
      ...state,
      modifierDetailsStatus: 'request',
    };
  },
  [actions.getModifierDetailsFailure](state) {
    return {
      ...state,
      modifierDetailsStatus: 'failure',
    };
  },
  [actions.getModifierDetailsSuccess](state, { payload: { data } }) {
    return {
      ...state,
      modifierDetailsStatus: 'success',
      modifierDetails: data,
    };
  },
  [actions.editModifierRequest](state) {
    return {
      ...state,
      editModifierStatus: 'request',
    };
  },
  [actions.editModifierFailure](state) {
    return {
      ...state,
      editModifierStatus: 'failure',
    };
  },
  [actions.editModifierSuccess](state) {
    return {
      ...state,
      editModifierStatus: 'success',
    };
  },
}, {
  list: [],
  status: null,
  modifierDetails: [],
});


const products = handleActions({
  [actions.getProductsRequest](state) {
    return {
      ...state,
      status: 'request',
    };
  },
  [actions.getProductsFailure](state) {
    return {
      ...state,
      status: 'failure',
    }
  },
  [actions.getProductsSuccess](state, { payload: { data } }) {
    return {
      ...state,
      status: 'success',
      list: data,
    }
  },
  [actions.getCategoryRequest](state) {
    return {
      ...state,
      categoryStatus: 'request',
    };
  },
  [actions.getCategoryFailure](state) {
    return {
      ...state,
      categoryStatus: 'failure',
    };
  },
  [actions.getCategorySuccess](state, { payload: { data } }) {
    return {
      ...state,
      categoryStatus: 'success',
      categories: data,
    };
  },
  [actions.getProductDetailsRequest](state) {
    return {
      ...state,
      productDetailsStatus: 'request',
    };
  },
  [actions.getProductDetailsFailure](state) {
    return {
      ...state,
      productDetailsStatus: 'failure',
    };
  },
  [actions.getProductDetailsSuccess](state, { payload: { data } }) {
    return {
      ...state,
      productDetailsStatus: 'success',
      productDetails: data,
    };
  },
  [actions.editProductRequest](state) {
    return {
      ...state,
      editProductStatus: 'request',
    };
  },
  [actions.editProductFailure](state) {
    return {
      ...state,
      editProductStatus: 'failure',
    };
  },
  [actions.editProductSuccess](state) {
    return {
      ...state,
      editProductStatus: 'success',
    };
  },
  [actions.createProductRequest](state) {
    return {
      ...state,
      productCreateStatus: 'request',
    };
  },
  [actions.createProductFailure](state) {
    return {
      ...state,
      productCreateStatus: 'failure',
    };
  },
  [actions.createProductSuccess](state) {
    return {
      ...state,
      productCreateStatus: 'success',
    };
  },
  [actions.deleteProductRequest](state) {
    return {
      ...state,
      deleteStatus: 'request',
    };
  },
  [actions.deleteProductFailure](state) {
    return {
      ...state,
      deleteStatus: 'failure',
    };
  },
  [actions.deleteProductSuccess](state) {
    return {
      ...state,
      deleteStatus: 'success',
    };
  },

  /**
   * Upload Image Request States
   */
  [actions.getSignedURLRequest](state) {
    return {
      ...state,
      getSignedURLStatus: 'request',
    };
  },
  [actions.getSignedURLSuccess](state) {
    return {
      ...state,
      getSignedURLStatus: 'success',
    };
  },
  [actions.getSignedURLFailure](state) {
    return {
      ...state,
      getSignedURLStatus: 'failure',
    };
  },

  [actions.uploadFileRequest](state) {
    return {
      ...state,
      uploadStatus: 'request',
    };
  },
  [actions.uploadFileSuccess](state) {
    return {
      ...state,
      uploadStatus: 'success',
    };
  },
  [actions.uploadFileFailure](state) {
    return {
      ...state,
      uploadStatus: 'failure',
    };
  },
  [actions.getBotsIdRequest](state) {
    return {
      ...state,
      botsRequestStatus: 'request',
    }
  },
  [actions.getBotsIdFailure](state) {
    return {
      ...state,
      botsRequestStatus: 'failure',
    }
  },
  [actions.getBotsIdSuccess](state, { payload: { data } }) {
    return {
      ...state,
      botsRequestStatus: 'success',
      botsList: data,
    }
  },
}, {
  list: [],
  status: null,
  categories: [],
  productDetails: [],
  getSignedURLStatus: null,
  uploadStatus: null,
  botsList: [],
});


const admins = handleActions({
  [actions.getAdminsRequest](state) {
    return {
      ...state,
      status: 'request',
    }
  },
  [actions.getAdminsFailure](state) {
    return {
      ...state,
      status: 'failure',
    }
  },
  [actions.getAdminsSuccess](state, { payload: { data } }) {
    console.log(data);
    return {
      ...state,
      status: 'success',
      list: data,
    }
  },
  [actions.deleteAdminRequest](state) {
    return {
      ...state,
      deleteAdminStatus: 'request',
    };
  },
  [actions.deleteAdminFailure](state) {
    return {
      ...state,
      deleteAdminStatus: 'failure',
    };
  },
  [actions.deleteAdminSuccess](state) {
    return {
      ...state,
      deleteAdminStatus: 'success',
    }
  },
  [actions.getAdminPermissionsRequest](state) {
    return {
      ...state,
      permissionStatus: 'request',
    };
  },
  [actions.getAdminPermissionsFailure](state) {
    return {
      ...state,
      permissionStatus: 'failure',
    };
  },
  [actions.getAdminPermissionsSuccess](state, { payload: { data } }) {
    return {
      ...state,
      permissionStatus: 'success',
      permissions: data,
    };
  },
  [actions.getAdminEditDetails](state, { payload }) {
    return {
      ...state,
      editingAdminDetails: payload,
    };
  },
  [actions.editAdminRequest](state) {
    return {
      ...state,
      editAdminStatus: 'request',
    }
  },
  [actions.editAdminFailure](state) {
    return {
      ...state,
      editAdminStatus: 'failure',
    }
  },
  [actions.editAdminSuccess](state) {
    return {
      ...state,
      editAdminStatus: 'success',
    }
  },
  [actions.createAdminRequest](state) {
    return {
      ...state,
      createAdminStatus: 'request',
    };
  },
  [actions.createAdminFailure](state) {
    return {
      ...state,
      createAdminStatus: 'failure',
    };
  },
  [actions.createAdminSuccess](state) {
    return {
      ...state,
      createAdminStatus: 'success',
    };
  },
}, {
  list: [],
  status: null,
  permissions: [],
});

const terminals = handleActions({
  [actions.getTerminalsRequest](state) {
    return {
      ...state,
      status: 'request',
    };
  },
  [actions.getTerminalsFailure](state) {
    return {
      ...state,
      status: 'failure',
    };
  },
  [actions.getTerminalsSuccess](state, { payload: { data } }) {
    return {
      ...state,
      status: 'success',
      list: data,
    };
  },
}, {
  list: [],
  status: null,
})

const kitchens = handleActions({
  [actions.getKitchensRequest](state) {
    return {
      ...state,
      status: 'request',
    }
  },
  [actions.getKitchensFailure](state) {
    return {
      ...state,
      status: 'failure',
    }
  },
  [actions.getKitchensSuccess](state, { payload: { data } }) {
    console.log(data);
    return {
      ...state,
      status: 'success',
      list: data,
    }
  },
  [actions.getKitchenDetailsRequest](state) {
    return {
      ...state,
      detailStatus: 'request',
    };
  },
  [actions.getKitchenDetailsFailure](state) {
    return {
      ...state,
      detailStatus: 'failure',
    };
  },
  [actions.getKitchenDetailsSuccess](state, { payload: { data } }) {
    return {
      ...state,
      detailStatus: 'success',
      details: data,
      disabledProducts: data.disabled_products,
    };
  },
  [actions.createKitchenRequest](state) {
    return {
      ...state,
      createStatus: 'request',
    };
  },
  [actions.createKitchenFailure](state) {
    return {
      ...state,
      createStatus: 'failure',
    };
  },
  [actions.createKitchenSuccess](state) {
    return {
      ...state,
      createStatus: 'success',
    };
  },
  [actions.editKitchenRequest](state) {
    return {
      ...state,
      editStatus: 'request',
    };
  },
  [actions.editKitchenFailure](state) {
    return {
      ...state,
      editStatus: 'failure',
    };
  },
  [actions.editKitchenSuccess](state) {
    return {
      ...state,
      editStatus: 'success',
    };
  },
  [actions.getKitchenProductsRequest](state) {
    return {
      ...state,
      productsStatus: 'request',
    };
  },
  [actions.getKitchenProductsFailure](state) {
    return {
      ...state,
      productsStatus: 'failure',
    };
  },
  [actions.getKitchenProductsSuccess](state, { payload: { data } }) {
    return {
      ...state,
      productsStatus: 'success',
      productsForModal: data,
    }
  },
  [actions.addDisabledProductRequest](state) {
    return {
      ...state,
      productsAddStatus: 'request',
    };
  },
  [actions.addDisabledProductFailure](state) {
    return {
      ...state,
      productsAddStatus: 'failure',
    };
  },
  [actions.addDisabledProductSuccess](state, { payload: { data } }) {
    return {
      ...state,
      productsAddStatus: 'success',
      disabledProducts: data.disabled_products,
    }
  },
  [actions.deleteDisabledProductRequest](state) {
    return {
      ...state,
      productsDeleteStatus: 'request',
    };
  },
  [actions.deleteDisabledProductFailure](state) {
    return {
      ...state,
      productsDeleteStatus: 'failure',
    };
  },
  [actions.deleteDisabledProductSuccess](state, { payload: { data } }) {
    return {
      ...state,
      productsDeleteStatus: 'success',
      disabledProducts: data.disabled_products,
    }
  },
  [actions.getBotsIdRequest](state) {
    return {
      ...state,
      botsRequestStatus: 'request',
    }
  },
  [actions.getBotsIdFailure](state) {
    return {
      ...state,
      botsRequestStatus: 'failure',
    }
  },
  [actions.getBotsIdSuccess](state, { payload: { data } }) {
    return {
      ...state,
      botsRequestStatus: 'success',
      botsList: data,
    }
  },
}, {
  list: [],
  status: null,
  details: {
    location: {
      longitude: null,
      latitude: null,
    },
  },
  productsForModal: [],
  disabledProducts: [],
  botsList: [],
});


const auth = handleActions({
  [actions.loginRequest](state) {
    return {
      ...state,
      status: 'request',
    }
  },
  [actions.loginFailure](state) {
    return {
      ...state,
      status: 'failure',
      token: null,
      payload: {
        permissions: [],
      },
    }
  },
  [actions.loginSuccess](state, { payload: { data } }) {
    return {
      ...state,
      status: 'success',
      ...data,
    }
  },
  [actions.getMeSuccess](state, { payload: { data } }) {
    console.log(data);
    return {
      ...state,
      status: 'success',
      ...data,
    }
  },
}, {
  token: null,
  status: null,
  payload: {
    permissions: [],
  },
});

const activeOrders = handleActions({
  [actions.getActiveOrdersRequest](state) {
    return {
      ...state,
      status: 'request',
      loading: state.loading === null ? true : state.loading,
    };
  },
  [actions.getActiveOrdersFailure](state) {
    return {
      ...state,
      status: 'failure',
    };
  },
  [actions.getActiveOrdersSuccess](state, { payload: { data } }) {
    return {
      ...state,
      loading: false,
      status: 'success',
      ...data,
    };
  },
  [actions.acceptOrderRequest](state) {
    return {
      ...state,
      acceptStatus: 'request',
    };
  },
  [actions.acceptOrderFailure](state) {
    return {
      ...state,
      acceptStatus: 'failure',
    };
  },
  [actions.acceptOrderSuccess](state) {
    return {
      ...state,
      acceptStatus: 'success',
    };
  },
  [actions.cancelOrderRequest](state) {
    return {
      ...state,
      cancelStatus: 'request',
    };
  },
  [actions.cancelOrderFailure](state) {
    return {
      ...state,
      cancelStatus: 'failure',
    };
  },
  [actions.cancelOrderSuccess](state) {
    return {
      ...state,
      cancelStatus: 'success',
    };
  },
  [actions.activeOrderTab](state, { payload }) {
    return {
      ...state,
      activeTabKey: parseInt(payload, 10),
    }
  },
}, {
  status: null,
  loading: null,
  new: {
    list: [],
  },
  onKitchen: {
    list: [],
  },
  ready: {
    list: [],
  },
  onWay: {
    list: [],
  },
  activeTabKey: 1,
});

const orderDetails = handleActions({
  [actions.getOrderDetailsRequest](state) {
    return {
      ...state,
      status: 'request',
    }
  },
  [actions.getOrderDetailsFailure](state) {
    return {
      ...state,
      status: 'failure',
    }
  },
  [actions.getOrderDetailsSuccess](state, { payload: { data } }) {
    return {
      ...state,
      status: 'success',
      [data.id]: {
          ...data,
          products: indexDuplicates(data.products, 'id', 'index'),
        },
    }
  },
  [actions.getOrderLogsRequest](state) {
    return {
      ...state,
      logsStatus: 'request',
    }
  },
  [actions.getOrderLogsFailure](state) {
    return {
      ...state,
      logsStatus: 'failure',
    }
  },
  [actions.getOrderLogsSuccess](state, { payload: { data } }) {
    return {
      ...state,
      logsStatus: 'success',
      logs: data,
    }
  },
  [actions.setOrderStateChanged](state) {
    return { ...state, editedState: 'changed' };
  },
  [actions.setOrderStateUnchanged](state) {
    return { ...state, editedState: 'unchanged' }
  },
  [actions.patchOrderDetailsRequest](state) {
    return {
      ...state,
      editStatus: 'request',
    };
  },
  [actions.patchOrderDetailsFailure](state) {
    return {
      ...state,
      editStatus: 'failure',
    };
  },
  [actions.patchOrderDetailsSuccess](state, { payload: { data } }) {
    return {
      ...state,
      editStatus: 'success',
      [data.id]: {
        ...data,
        products: indexDuplicates(data.products, 'id', 'index'),
      },
    };
  },
  [actions.addOrderProduct](state, { payload }) {
    const { item, orderId } = payload;
    let lastIndex = last(groupBy(state[orderId].products, 'id')[item.id])?.index;
    if (lastIndex == null) {
      lastIndex = -1;
    }
    return {
      ...state,
      [orderId]: {
        ...state[orderId],
        products: [
          ...state[orderId].products,
          { ...item, index: lastIndex + 1 },
        ],
      },
    }
  },
  [actions.removeOrderProduct](state, { payload }) {
    const { orderId, productId, productIndex } = payload;
    return {
      ...state,
      [orderId]: {
        ...state[orderId],
        products: [
          ...state[orderId]
            .products
            .filter((product) => productId !== product.id
              || productIndex !== product.index),
        ],
      },
    }
  },
  [actions.getAvailableProductsRequest](state) {
    return {
      ...state,
      availableStatus: 'request',
    };
  },
  [actions.getAvailableProductsFailure](state) {
    return {
      ...state,
      availableStatus: 'failure',
    };
  },
  [actions.getAvailableProductsSuccess](state, { payload: { data } }) {
    return {
      ...state,
      availableStatus: 'success',
      availableList: data,
    };
  },
}, {
  status: null,
  logsStatus: null,
  editedState: 'unchanged',
});

const finishedOrders = handleActions({
  [actions.getFinishedOrdersRequest](state) {
    return {
      ...state,
      status: 'request',
    };
  },
  [actions.getFinishedOrdersFailure](state) {
    return {
      ...state,
      status: 'failed',
    };
  },
  [actions.getFinishedOrdersSuccess](state, { payload: { data } }) {
    return {
      ...state,
      status: 'success',
      list: data.data,
      total: data.count,
      page: data.page,
    }
  },
}, {
  list: [],
  page: 1,
});

const announcements = handleActions({
  [actions.getAnnouncementsRequest](state) {
    return {
      ...state,
      listStatus: 'request',
    };
  },
  [actions.getAnnouncementsFailure](state) {
    return {
      ...state,
      listStatus: 'failure',
    };
  },
  [actions.getAnnouncementsSuccess](state, { payload: { data } }) {
    console.log(data);
    return {
      ...state,
      listStatus: 'success',
      advertisements: data.data,
      page: data.page,
      count: data.count,
    };
  },
  [actions.getSignedURLRequest](state) {
    return {
      ...state,
      signedRequestStatus: 'request',
    };
  },
  [actions.getSignedURLFailure](state) {
    return {
      ...state,
      signedRequestStatus: 'failure',
    };
  },
  [actions.getSignedURLSuccess](state) {
    return {
      ...state,
      signedRequestStatus: 'success',
    };
  },
  [actions.uploadFileRequest](state) {
    return {
      ...state,
      uploadFileStatus: 'request',
    };
  },
  [actions.uploadFileFailure](state) {
    return {
      ...state,
      uploadFileStatus: 'failure',
    };
  },
  [actions.uploadFileSuccess](state) {
    return {
      ...state,
      uploadFileStatus: 'success',
    };
  },
  [actions.createAnnouncementRequest](state) {
    return {
      ...state,
      createStatus: 'request',
    }
  },
  [actions.createAnnouncementFailure](state) {
    return {
      ...state,
      createStatus: 'failure',
    }
  },
  [actions.createAnnouncementSuccess](state) {
    return {
      ...state,
      createStatus: 'success',
    }
  },
  [actions.editAnnouncementRequest](state) {
    return {
      ...state,
      editStatus: 'request',
    }
  },
  [actions.editAnnouncementFailure](state) {
    return {
      ...state,
      editStatus: 'failure',
    }
  },
  [actions.editAnnouncementSuccess](state) {
    return {
      ...state,
      editStatus: 'success',
    }
  },
  [actions.getAnnouncementDetailsRequest](state) {
    return {
      ...state,
      detailStatus: 'request',
    }
  },
  [actions.getAnnouncementDetailsFailure](state) {
    return {
      ...state,
      detailStatus: 'failure',
    }
  },
  [actions.getAnnouncementDetailsSuccess](state, { payload: { data } }) {
    return {
      ...state,
      createStatus: 'success',
      details: data,
    }
  },
  [actions.deleteAnnouncementRequest](state) {
    return {
      ...state,
      deleteStatus: 'request',
    }
  },
  [actions.deleteAnnouncementFailure](state) {
    return {
      ...state,
      deleteStatus: 'failure',
    }
  },
  [actions.deleteAnnouncementSuccess](state) {
    return {
      ...state,
      deleteStatus: 'success',
    }
  },
  [actions.getBotsIdRequest](state) {
    return {
      ...state,
      botsRequestStatus: 'request',
    }
  },
  [actions.getBotsIdFailure](state) {
    return {
      ...state,
      botsRequestStatus: 'failure',
    }
  },
  [actions.getBotsIdSuccess](state, { payload: { data } }) {
    return {
      ...state,
      botsRequestStatus: 'success',
      botsList: data,
    }
  },
}, {
  page: 1,
  advertisements: [],
  botsList: [],
});

const menu = handleActions({
  [actions.setMenuActive](state, { payload }) {
    return {
      activeMenu: payload,
    }
  },
}, {
  activeMenu: 1,
});

const params = handleActions({
  [actions.getParamsRequest](state) {
    return {
      ...state,
      listStatus: 'request',
    };
  },
  [actions.getParamsFailure](state) {
    return {
      ...state,
      listStatus: 'failure',
    };
  },
  [actions.getParamsSuccess](state, { payload: { data } }) {
    console.log(data);
    return {
      ...state,
      listStatus: 'success',
      list: data,
    };
  },
  [actions.openSettingModal](state, { payload }) {
    return {
      ...state,
      editParam: payload,
      isEditVisible: true,
    }
  },
  [actions.closeSettingModal](state) {
    return {
      ...state,
      isEditVisible: false,
      editParam: '',
    }
  },
  [actions.editParametersRequest](state) {
    return {
      ...state,
      editStatus: 'request',
    }
  },
  [actions.editParametersFailure](state) {
    return {
      ...state,
      editStatus: 'failure',
    }
  },
  [actions.editParametersSuccess](state) {
    return {
      ...state,
      editStatus: 'success',
    }
  },
}, {
  list: [],
  editParam: {
    name: '',
  },
});

const category = handleActions({
  [actions.getCategoryRequest](state) {
    return {
      ...state,
      getRequestStatus: 'request',
    }
  },
  [actions.getCategoryFailure](state) {
    return {
      ...state,
      getRequestStatus: 'failure',
    }
  },
  [actions.getCategorySuccess](state, { payload: { data } }) {
    return {
      ...state,
      getRequestStatus: 'success',
      list: data,
    }
  },
  [actions.getBotsIdRequest](state) {
    return {
      ...state,
      botsRequestStatus: 'request',
    }
  },
  [actions.getBotsIdFailure](state) {
    return {
      ...state,
      botsRequestStatus: 'failure',
    }
  },
  [actions.getBotsIdSuccess](state, { payload: { data } }) {
    return {
      ...state,
      botsRequestStatus: 'success',
      botsList: data,
    }
  },
  [actions.createCategoryRequest](state) {
    return {
      ...state,
      createRequestStatus: 'request',
    }
  },
  [actions.createCategoryFailure](state) {
    return {
      ...state,
      createRequestStatus: 'failure',
    }
  },
  [actions.createCategorySuccess](state) {
    return {
      ...state,
      createRequestStatus: 'success',
    }
  },
  [actions.deleteCategoryRequest](state) {
    return {
      ...state,
      deleteRequestStatus: 'request',
    };
  },
  [actions.deleteCategoryFailure](state) {
    return {
      ...state,
      deleteRequestStatus: 'failure',
    };
  },
  [actions.deleteCategorySuccess](state) {
    return {
      ...state,
      deleteRequestStatus: 'success',
    };
  },
  [actions.getCategoryDetailsRequest](state) {
    return {
      ...state,
      getDetailsStatus: 'request',
    }
  },
  [actions.getCategoryDetailsFailure](state) {
    return {
      ...state,
      getDetailsStatus: 'failure',
    }
  },
  [actions.getCategoryDetailsSuccess](state, { payload: { data } }) {
    return {
      ...state,
      getDetailsStatus: 'success',
      details: data,
    }
  },
  [actions.editCategoryDetailsRequest](state) {
    return {
      ...state,
      editRequestStatus: 'request',
    }
  },
  [actions.editCategoryDetailsFailure](state) {
    return {
      ...state,
      editRequestStatus: 'failure',
    }
  },
  [actions.editCategoryDetailsSuccess](state) {
    return {
      ...state,
      editRequestStatus: 'success',
    }
  },
}, {
  list: [],
  botsList: [],
});


const regions = handleActions({
  [actions.getRegionsSuccess](state, { payload: { data } }) {
    return data
  },
}, null);


export default combineReducers({
  clients,
  riders,
  kitchens,
  products,
  auth,
  admins,
  activeOrders,
  orderDetails,
  finishedOrders,
  announcements,
  menu,
  params,
  category,
  terminals,
  modifiers,
  regions,
});
