import { NavBar } from 'antd-mobile';
import { Form, Input, Button, Toast } from 'antd-mobile';
import { loginRequest } from '../../services';
import { getCache, setCache } from '../../utils/cache';
import { generateRandomStr } from '../../utils/str';
import { useEffect } from 'react';
import { useBeforeMount } from '../../hooks';

interface IProps {
  onLogged: (re: any) => void;
  onFailed: () => void;
}
export default function Login(props: IProps) {
  const { onLogged } = props;
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

    if (re.resolve?.success === true) {
      Toast.show('登录成功');
      setCache('titles.sessionId', sessionId, 1);
      setCache('titles.name', name);
      setCache('titles.pwd', pwd);

      // 判断登录成功
      if (re.resolve?.success && re.resolve?.data) {
        onLogged(re.resolve?.data);
      }
      return;
    }

    Toast.show(re.resolve?.message || '登录失败，请稍后重试');
    console.log(re);
  };

  useEffect(() => {
    const _name = getCache('titles.name');
    const _pwd = getCache('titles.pwd');
    _name && form.setFieldValue('name', _name);
    _pwd && form.setFieldValue('pwd', _pwd);
  }, []);

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
