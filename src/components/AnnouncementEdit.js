import React, { useEffect } from 'react';
import {
  Form,
  Layout,
  Input,
  Button,
  DatePicker,
  Select,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import * as actions from '../actions';
import FileUploader from './shared/FileUploader';
import { contentStyle } from '../assets/style';

const { Content } = Layout;
const { TextArea } = Input;

const AnnouncementsEditForm = ({
  form,
}) => {
  const { getFieldDecorator } = form;
  const { id } = useParams();
  const dispatch = useDispatch();
  const announcement = useSelector((state) => state.announcements);
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.getAnnouncementDetails(id));
    dispatch(actions.setMenuActive(7));
    dispatch(actions.getBotsId());
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch(actions.editAnnouncement(values, id));
      }
    });
  };

  const onUpload = async (folder, file) => dispatch(actions.getSignedURL(folder, file));

  return (
    <Layout>
      <Content style={contentStyle}>
        <h1 style={{ textAlign: 'center', fontSize: 24 }}>Изменить объявление</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Item label="Текст">
            {getFieldDecorator('text', {
              initialValue: announcement.details ? announcement.details.text : null,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <TextArea
                autoSize={{ minRows: 4 }}
              />,
            )}
          </Form.Item>
          <Form.Item label="Фото">
            {getFieldDecorator('image_url', {
              initialValue: announcement.details ? announcement.details.image_url : null,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <FileUploader
                onUpload={onUpload}
                folder="announcements"
                accept=".png,.jpg"
                loading={announcement.signedURLStatus === 'request' || announcement.uploadFileStatus === 'request'}
              />,
            )}
          </Form.Item>
          <Form.Item label="Бот: " style={{ width: 200 }}>
            {getFieldDecorator('bot_id', {
              initialValue: announcement.details
                ? announcement.details.bot_id : null,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Select
                disabled={announcement.botsRequestStatus === 'request'}
                allowClear
              >
                {announcement.botsList.map((bot) => (
                  <Select.Option
                    value={bot.id}
                    key={bot.id}
                  >
                    {bot.name}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="Отправить в">
            {getFieldDecorator('send_at', {
              initialValue: announcement.details
                ? moment(announcement.details.send_at)
                : null,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <DatePicker
                showTime
                placeholder="Выберите дату"
              />,
            )}
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Item>
              <Button onClick={() => history.push('/announcements/')}>
                Назад
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                style={{ marginLeft: 10 }}
                type="primary"
                htmlType="submit"
                loading={announcement.editStatus === 'request'}
                disabled={announcement.signedURLStatus === 'request' || announcement.uploadFileStatus === 'request'}
              >
                Сохранить
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Content>
    </Layout>
  );
};

const WrappedForm = Form.create()(AnnouncementsEditForm);
export default WrappedForm;
