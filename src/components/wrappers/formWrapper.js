import React from 'react';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { dissoc } from '../../utils'
import {
  setOrderStateChanged,
  patchOrderDetails,
  getAvailableProducts,
} from '../../actions';

const formWrap = (Component) => {
  const FormWrapper = (props) => {
    const { form } = props;
    const dispatch = useDispatch();
    const orderDetails = useSelector((state) => state.orderDetails);

    const handleSubmit = (e) => {
      e.preventDefault();

      form.validateFields((err, values) => {
        if (!err) {
          const preparedValues = {
            ...values,
            delivery_cost: Number(values.delivery_cost),
            products: Object
              .values(values.products)
              .reduce((acc, v) => [...acc, ...v], [])
              .map((product) => ({
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
        }
      });
    };

    return (
      <Form
        onSubmit={handleSubmit}
        style={{ width: '100%', minHeight: '100%' }}
        onChange={(e) => {
          if (orderDetails.editedState === 'changed' || e.target.id === 'modalForm_reason') {
            return
          }
          dispatch(setOrderStateChanged());
        }}
      >
        <Component {...props} />
      </Form>
    )
  };

  return Form.create({
    name: 'formWrapper',
  })(FormWrapper);
};

export default formWrap;
