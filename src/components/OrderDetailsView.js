import {
  Button, Descriptions, Input, Table, Tag, Radio,
} from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import * as actions from '../actions';
import CancelOrderButton from './CancelOrderButton';
import OrderAvailableModal from './OrderAvailableModal';
import GroupModifiersSelect from './GroupModifiersSelect';
import { update, groupByField } from '../utils';

const OrderDetailsView = (props) => {
  const dispatch = useDispatch();
  const activeOrders = useSelector((state) => state.activeOrders);
  const availableProducts = useSelector(
    (state) => groupByField(state
      .orderDetails
      .availableList?.map(
        (product) => ({
          modifiers: groupByField(product.groupModifiers.reduce(
            (acc, gm) => [...acc, ...gm.modifiers], [],
          ), 'id'),
          ...update(product, 'groupModifiers',
            (groupModifiers) => groupModifiers.map((gm) => update(gm, 'modifiers',
              (modifiers) => groupByField(modifiers, 'id')))),
        })), 'id'),
  );

  const {
    order,
    form,
    editedState,
    editStatus,
  } = props;
  const loading = (editStatus === 'request') || !availableProducts;
  const calculateProductPrice = (product, index) => {
    const { price, stock_price: stockPrice } = product;
    if (availableProducts && product) {
      const gms = availableProducts[product.id]?.groupModifiers || [];
      return (stockPrice || price)
        + gms.reduce(
          (acc, gm) => acc + (
            (form.getFieldValue(`products[${index}].groupModifiers[${gm.id}]`)
              || product.payload.modifiers?.filter((mId) => gm.modifiers[mId])
                ?.map((mId) => ({ key: mId, label: gm.modifiers[mId] })))
              ?.map((modifier) => gm.modifiers[modifier.key]?.price)
              ?.reduce((sum, n) => sum + n, 0) || 0), 0,
        )
    }
    return 0
  }
  const allowEdit = (order.status === 'new' && order.payment === 'cash') || order.status === 'pending';
  const totalPrice = order.products.reduce(
    (acc, product, index) => acc + (calculateProductPrice(product, index) || 0)
      * (form.getFieldValue(`products[${index}].count`) || 1), 0,
  );

  const handleCancel = (values) => {
    dispatch(actions.cancelOrder(order.id, values, '/orders/active/'));
  };

  const columns = [
    { title: 'Название', dataIndex: 'name', key: 'name' },
    {
      title: 'Комментарий',
      dataIndex: 'comment',
      key: 'comment',
      render: (value, product, index) => {
        if (allowEdit) {
          return (
            <>
              {form.getFieldDecorator(`products[${index}].comment`, { initialValue: value })(<Input />)}
              {form.getFieldDecorator(`products[${index}].payload`, { initialValue: product.payload ? product.payload : {} })(
                <Input type="hidden" />,
              )}
              {form.getFieldDecorator(`products[${index}].product_id`, { initialValue: product.id })(<Input
                type="hidden"
              />)}
            </>
          )
        }
        return value;
      },
    },
    {
      title: 'Количество',
      dataIndex: 'count',
      key: 'count',
      width: '100px',
      render: (value, product, index) => {
        if (allowEdit) {
          return form.getFieldDecorator(
            `products[${index}].count`,
            { initialValue: value || 1 },
          )(<Input type="number" disabled={!allowEdit} />)
        }
        return value;
      },
    },
    {
      title: 'Цена',
      dataIndex: 'stock_price',
      key: 'stock_price',
      render: (_, product, index) => calculateProductPrice(product, index),
    },
    {
      title: 'Итого',
      dataIndex: 'total',
      key: 'total',
      render: (total, product, index) => (calculateProductPrice(product, index) || 0)
        * (form.getFieldValue(`products[${index}].count`) || 1),
    },
  ];

  const deleteColumn = {
    title: 'Удалить',
    dataIndex: 'delete',
    key: 'delete',
    width: '80px',
    render: (arg, record) => (
      <Button
        type="link"
        onClick={() => {
          dispatch(actions.setOrderStateChanged());
          dispatch(actions.removeOrderProduct({ orderId: order.id, productId: record.id }))
        }}
      >
        <DeleteOutlined />
      </Button>
    ),
  };

  const statusTag = ({ status }) => {
    switch (status) {
      case 'pending':
        return <Tag color="#108ee9">В процессе</Tag>;
      case 'new':
        return <Tag color="#108ee9">Новый</Tag>;
      case 'onWay':
        return <Tag color="#F6F200">В пути</Tag>;
      case 'onKitchen':
        return <Tag color="#F6F200">На кухне</Tag>;
      case 'finished':
        return <Tag color="#00C01D">Завершен</Tag>;
      case 'canceled':
        return <Tag color="#FF2D00">Отменен</Tag>;
      default:
        return <Tag color="red">{order.status}</Tag>;
    }
  };


  const displayButtons = () => {
    if (editedState === 'changed') {
      return (
        <>
          <Button
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              location.reload();
              dispatch(actions.setOrderStateUnchanged());
            }}
            style={{ marginRight: 15 }}
          >
            Сбросить
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            loading={loading}
          >
            Сохранить
          </Button>
        </>
      )
    }
    return (
      <>
        {
          ['pending', 'new', 'onKitchen', 'onWay'].includes(order.status) ? (
            <CancelOrderButton
              btnType="danger"
              loading={activeOrders.cancelStatus === 'request'}
              onSubmit={handleCancel}
              disabled={activeOrders.acceptStatus === 'request'}
            >
              Отменить
            </CancelOrderButton>
          ) : null
        }
        {
          ['pending', 'new'].includes(order.status) ? (
            <Button
              type="primary"
              onClick={() => dispatch(actions.acceptOrder(order.id, '/orders/active/'))}
              loading={activeOrders.acceptStatus === 'request'}
              disabled={activeOrders.cancelStatus === 'request'
              || order.products?.length < 1}
            >
              Принять
            </Button>
          ) : null
        }
      </>
    )
  };

  const expandedModifierGroup = (product, index) => {
    if (product && availableProducts) {
      const { groupModifiers: allGroupModifiers } = availableProducts[product.id];
      if (allGroupModifiers?.length > 0) {
        return (
          <GroupModifiersSelect
            key={product.id}
            product={product}
            form={form}
            index={index}
            disabled={!allowEdit}
            allGroupModifiers={allGroupModifiers}
          />
        )
      }
    }
    return null;
  }

  const expandIcon = (_props) => {
    const {
      expanded, record: product, onExpand, prefixCls,
    } = _props;
    const cls = expanded ? 'ant-table-row-expanded' : 'ant-table-row-collapsed';
    if (availableProducts
      && Object.keys(availableProducts[product.id]?.modifiers || {})?.length > 0) {
      return (
        <button
          tabIndex={0}
          type="button"
          onClick={onExpand}
          className={`${prefixCls} ant-table-row-expand-icon ${cls}`}
        />
      )
    }
    return null
  }
  const paymentDescription = order.payment === 'cash' ? 'Наличными' : 'Картой';
  return (
    <div>
      <Link to={`/orders/${order.id}/logs/`}>Журнал</Link>
      {form.getFieldDecorator('orderId', { initialValue: order.id })(<Input type="hidden" />)}
      <div>
        <Descriptions
          title={`Заказ # ${order.id}`}
          size="small"
          column={4}
          layout="vertical"
          bordered
        >
          <Descriptions.Item label="Локация" span={2}>
            <div id="map" style={{ width: '100%', height: 250 }} />
          </Descriptions.Item>
          <Descriptions.Item label="Адрес" span={2}>
            {allowEdit
              ? (
                form.getFieldDecorator(('address'), {
                  initialValue: order.address,
                })(
                  <Input.TextArea style={{ width: '100%', height: 250 }} />,
                )
              ) : order.address}
          </Descriptions.Item>
          <Descriptions.Item label="Комментарий" span={2}>
            {order.comment ? order.comment : 'Пусто...'}
          </Descriptions.Item>
          <Descriptions.Item label="Кухня" span={2}>{order.kitchen}</Descriptions.Item>
          <Descriptions.Item label="Клиент" span={1}>{order.name}</Descriptions.Item>
          <Descriptions.Item label="Телефон" span={1}>{order.phone}</Descriptions.Item>
          <Descriptions.Item label="Курьер" span={1}>
            {order.rider_name ? order.rider_name : 'Нет курьера'}
          </Descriptions.Item>
          <Descriptions.Item label="Телефон" span={1}>
            {order.rider_phone ? order.rider_phone : 'Нет курьера'}
          </Descriptions.Item>
          <Descriptions.Item label="Сумма" span={1}>
            {order.total_sum?.toLocaleString('ru')}
            &nbsp;сум
          </Descriptions.Item>
          <Descriptions.Item label="Статус" span={1}>
            {statusTag(order)}
          </Descriptions.Item>
          <Descriptions.Item label="Тип оплаты" span={1}>
            {order.status === 'pending'
              ? (
                form.getFieldDecorator(('payment'), {
                  initialValue: order.payment,
                })(
                  <Radio.Group size="small" buttonStyle="solid">
                    <Radio.Button value="cash">Наличными</Radio.Button>
                    <Radio.Button value="card">Картой</Radio.Button>
                  </Radio.Group>,
                )
              )
              : paymentDescription}
          </Descriptions.Item>
          <Descriptions.Item label="Создан в">
            {moment(order.created_at).format('DD.MM.YYYY HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item label="Заметки" span={2}>
            {
              order.status === 'new' || order.status === 'pending'
                ? (
                  form.getFieldDecorator(('notes'), {
                    initialValue: order.notes,
                  })(
                    <Input.TextArea style={{ width: '100%', height: 50 }} />,
                  )
                ) : order.notes
            }
          </Descriptions.Item>
          <Descriptions.Item label="Доставка">
            {
              allowEdit
                ? (
                  form.getFieldDecorator(('delivery_cost'), {
                    initialValue: order.delivery_cost,
                  })(
                    <Input style={{ width: '100%' }} type="number" disabled={!allowEdit} />,
                  )
                ) : order.delivery_cost
            }
          </Descriptions.Item>
        </Descriptions>

        <br />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3><strong>Продукты</strong></h3>
          {
            allowEdit
              ? <OrderAvailableModal orderId={order.id} />
              : ''
          }
        </div>
        <Table
          // TODO allow collapse expandable row
          expandedRowKeys={
            order.products.filter(
              (product) => (availableProducts
                && Object.keys(availableProducts[product.id]?.modifiers || {})?.length > 0),
            ).map((product) => product.id)
          }
          expandIcon={expandIcon}
          dataSource={order.products.map((item) => ({
            ...item,
            key: item.id,
          }))}
          expandedRowRender={expandedModifierGroup}
          columns={allowEdit ? [...columns, deleteColumn] : columns}
          size="small"
          pagination={false}
          footer={() => (
            <div style={{ textAlign: 'right', paddingRight: 10 }}>
              Итого:&nbsp;
              {totalPrice}
              &nbsp;сум
            </div>
          )}
          bordered
        />
        <div className="order-details-buttons" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 30 }}>
          {displayButtons()}
        </div>
      </div>
    </div>
  )
};

export default OrderDetailsView;
