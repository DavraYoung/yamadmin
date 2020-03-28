import React, { useEffect } from 'react';
import {
  Button,
  Icon,
  Layout,
  Table,
} from 'antd';

import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';

const { Content } = Layout;

const KitchensList = () => {
  const dispatch = useDispatch();
  const kitchens = useSelector((state) => state.kitchens);
  const history = useHistory();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Открывается',
      dataIndex: 'start_at',
      key: 'start_at',
    },
    {
      title: 'Закрывается',
      dataIndex: 'end_at',
      key: 'end_at',
    },
    {
      title: 'Отключен',
      dataIndex: 'is_disabled',
      key: 'is_disabled',
      render: (bool) => (bool ? <p style={{ color: 'red' }}>Отключен</p> : null),
    },
  ];

  useEffect(() => {
    dispatch(actions.getKitchens());
  }, []);

  const loading = kitchens.status === 'request';

  return (
    <Layout>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          minHeight: 'auto',
        }}
      >
        <h1 style={{ fontSize: 30, textAlign: 'center' }}>Кухни</h1>
        <Button style={{ marginBottom: 20 }} onClick={() => dispatch(actions.getKitchens())}><Icon type="reload" /></Button>
        <Button
          type="primary"
          onClick={() => {
            history.push('/kitchens/create/');
          }}
          style={{ marginLeft: 10 }}
        >
          Создать Кухню
        </Button>
        <Table
          size="small"
          columns={columns}
          loading={loading}
          dataSource={kitchens.list.map((kitchen) => ({ ...kitchen, key: kitchen.id }))}
          onRow={(record) => ({
            onClick: () => {
              history.push(`${record.id}/details/`);
            },
          })}
        />
      </Content>
    </Layout>
  )
};


export default KitchensList;
