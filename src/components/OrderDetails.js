import React, { useEffect } from 'react';
import {
  Layout, Spin,
} from 'antd';
import { withRouter, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions'
import api from '../apiRoutes';

import OrderDetailsView from './OrderDetailsView';
import formWrap from './wrappers/formWrapper';
import { dissoc } from '../utils';
import { getAvailableProducts, patchOrderDetails, setOrderStateChanged } from '../actions';

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

const { Content } = Layout;

const openViewSocket = (orderID) => {
  try {
    const url = api.viewOrderSocket().replace('http', 'ws');
    const socket = new WebSocket(url);
    socket.onopen = () => {
      const data = JSON.stringify({
        token: localStorage.getItem('token'),
        order: orderID,
      });
      socket.send(data)
    };
    return socket;
  } catch (error) {
    console.error(error);
  }
  return null;
};


const OrderDetails = (props) => {
  const { id } = useParams();
  const order = useSelector((state) => (state.orderDetails[id] || null));
  const editStatus = useSelector((state) => state.orderDetails.editStatus);
  const editedState = useSelector((state) => state.orderDetails.editedState);

  const dispatch = useDispatch();

  const { form } = props;

  useEffect(() => {
    dispatch(actions.setMenuActive(8));
    dispatch(actions.getOrderDetails(id));
    dispatch(actions.getAvailableProducts(id));

    const socket = openViewSocket(id);

    return () => {
      socket.close()
    }
  }, [dispatch]);

  useEffect(() => {
    if (order === null) {
      return
    }

    mapboxgl.accessToken = 'pk.eyJ1Ijoia2Vuc2F5IiwiYSI6ImNrNHprbnVicTBiZG8zbW1xMW9hYjQ5dTkifQ.h--Xl_6OXBRSrJuelEKH8g';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/kensay/ck52ch6ji00o41ctc1n49mnc8',
      center: [69.2401, 41.2995],
      zoom: 10,
    });

    new mapboxgl.Marker()
      .setLngLat([order.location.longitude, order.location.latitude])
      .addTo(map);
  }, [order, id, dispatch]);

  return (
    <Layout>
      <Spin spinning={order === null} tip="Загружаем заказ">
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            height: '95vh',
            overflow: 'auto',
          }}
        >
          {order && (
            <OrderDetailsView
              order={order}
              editStatus={editStatus}
              editedState={editedState}
              form={form}
            />
          )}

        </Content>
      </Spin>

    </Layout>
  )
};


export default withRouter(formWrap(OrderDetails,
  (values, dispatch) => {
    const preparedValues = {
      ...values,
      delivery_cost: Number(values.delivery_cost),
      products: values.products?.map((product) => ({
        ...(dissoc(product, 'groupModifiers') || {}),
        payload: {
          ...product.payload,
          modifiers: product.groupModifiers
            && Object.keys(product.groupModifiers).reduce(
              (acc, gmId) => [...acc, ...product.groupModifiers[gmId]
                .map((m) => m.key)], [],
            ),
        },
        product_id: Number(product.product_id),
        count: Number(product.count),
      })),
    };

    dispatch(patchOrderDetails(values.orderId, preparedValues));
    dispatch(getAvailableProducts(values.orderId));
  },
  (e, dispatch, state) => {
    if (state.orderDetails.editedState === 'changed' || e.target.id === 'modalForm_reason') {
      return
    }
    dispatch(setOrderStateChanged());
  }));
