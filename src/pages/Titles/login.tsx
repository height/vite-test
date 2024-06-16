import { NavBar } from 'antd-mobile';
import { Form, Input, Button } from 'antd-mobile';
import { loginRequest } from '../../services';

interface IProps {
  onLogged: () => void;
}
export default function Login(props: IProps) {
  const onFinish = (values: any) => {
    console.log(values);

    loginRequest({
      mapCode: values?.name,
      applyPWD: values?.pwd,
    });
  };

  return (
    <div className="content" style={{ marginTop: 200 }}>
      <Form
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
