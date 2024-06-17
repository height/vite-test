import { NavBar } from 'antd-mobile';
import { Form, Input, Button } from 'antd-mobile';
import { loginRequest } from '../../services';
import { getCache } from '../../utils/cache';
import { generateRandomStr } from '../../utils/str';
import { useEffect } from 'react';
import { useBeforeMount } from '../../hooks';

interface IProps {
  onLogged: () => void;
}
export default function Login(props: IProps) {
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    const { name = '', pwd = '' } = values || {};
    const sessionId =
      getCache('titles.sessionId') || `${name}-${generateRandomStr(8)}`;

    const re = await loginRequest({
      mapCode: name,
      applyPWD: pwd,
      sessionId,
    });
    console.log(re);
  };

  useBeforeMount(() => {});

  return (
    <div className="content" style={{ marginTop: 200 }}>
      <Form
        form={form}
        layout="horizontal"
        mode="card"
        onFinish={onFinish}
        footer={
          <Button block type="submit" color="primary" size="large">
            验证口令
          </Button>
        }
      >
        <Form.Header>头衔申请登录</Form.Header>
        <Form.Item
          name="name"
          label="服务器"
          rules={[{ required: true, message: '服务器不能为空' }]}
        >
          <Input placeholder="请输入服务器号" />
        </Form.Item>
        <Form.Item
          name="pwd"
          label="口令"
          rules={[{ required: true, message: '口令不能为空' }]}
        >
          <Input placeholder="请输入口令" />
        </Form.Item>
      </Form>
    </div>
  );
}
