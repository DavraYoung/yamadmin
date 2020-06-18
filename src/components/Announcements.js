import React, { useEffect } from 'react';
import {
  Layout,
  Table,
  Button,
  Icon,
  Popconfirm,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import moment from 'moment';
import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import Title from './shared/Title';
import { contentStyle } from '../assets/style';
import pagination from './pagination';
import * as actions from '../actions';

const { Content } = Layout;

const Announcements = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const announcements = useSelector((state) => state.announcements);
  const { advertisements } = announcements;

  useEffect(() => {
    dispatch(actions.getAnnouncements());
    dispatch(actions.setMenuActive(8));
  }, []);

  const statusesMap = {
    scheduled: <p style={{ fontWeight: 'bold', color: 'blue' }}>Запланирован</p>,
    sending: <p style={{ fontWeight: 'bold', color: 'yellow' }}>Рассылается</p>,
    sent: <p style={{ fontWeight: 'bold', color: 'green' }}>Отправлен</p>,
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Фото',
      dataIndex: 'image_url',
      key: 'image_url',
      render: (image) => <img alt="" style={{ width: 100 }} src={image} />,
    },
    { title: 'Бот', dataIndex: 'bot', key: 'bot' },
    { title: 'Текст', dataIndex: 'text', key: 'text' },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status) => statusesMap[status],
    },
    {
      title: 'Отправить в',
      dataIndex: 'send_at',
      key: 'send_at',
      render: (time) => moment(time).format('DD.MM.YYYY HH:mm:ss'),
    },
    {
      title: 'Изменить',
      dataIndex: 'edit',
      key: 'edit',
      render: (arg, announcement) => {
        if (announcement.status === 'scheduled') {
          return (
            <span>
              <Link
                to={`/announcements/${announcement.id}/edit/`}
              >
                <EditOutlined />
              </Link>
            </span>
          )
        }
        return ''
      },
    },
    {
      title: 'Удалить',
      dataIndex: 'delete',
      key: 'delete',
      render: (arg, announcement) => {
        if (announcement.status === 'scheduled') {
          return (
            <Popconfirm
              title="Вы уверены в удалении?"
              onConfirm={() => dispatch(actions.deleteAnnouncement(announcement.id))}
              okText="Да"
              cancelText="Нет"
            >
              <Button
                type="link"
              >
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          )
        }
        return ''
      },
    },
  ]

  return (
    <>
      <Title headTitle="Объявления" />
      <Layout>
        <Content
          style={contentStyle}
        >
          <h1 style={{ fontSize: 30, textAlign: 'center' }}>Объявления</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <Button
                style={{ marginBottom: 20 }}
                onClick={() => dispatch(actions.getAnnouncements({ page: 1 }))}
              >
                <Icon type="reload" />
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  history.push('/announcements/create/');
                }}
                style={{ marginLeft: 10 }}
              >
                Создать объявление
              </Button>
            </div>
            <p style={{ marginRight: '1%', fontSize: 14, marginTop: '1%' }}>
              <b>Кол-во:  </b>
              {announcements.count}
            </p>
          </div>
          <Table
            columns={columns}
            loading={announcements.listStatus === 'request' || announcements.deleteStatus === 'request'}
            dataSource={advertisements.map((adv) => ({ ...adv, key: `${adv.id}` }))}
            pagination={pagination(
              announcements.count,
              15,
              actions.getAnnouncements,
              announcements.page,
              dispatch,
            )}
          />
        </Content>
      </Layout>
    </>
  )
};

export default Announcements;
