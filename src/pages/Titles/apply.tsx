import { Form, Input, Button, Selector, Space } from 'antd-mobile';
import { loginRequest } from '../../services';

interface IProps {}

export const options = [
  {
    label: '选项一',
    description: '当前已申请0个',
    value: '1',
  },
  {
    label: '选项二',
    description: '当前已申请0个',
    value: '2',
  },
  {
    label: '选项三',
    description: '当前已申请0个',
    value: '3',
  },
  {
    label: '选项四',
    description: '当前已申请0个',
    value: '4',
  },
];

export default function Apply(props: IProps) {
  const onFinish = (values: any) => {
    console.log(values);

    loginRequest({
      mapCode: values?.name,
      applyPWD: values?.pwd,
    });
  };

  return (
    <div className="content" style={{ marginTop: 100 }}>
      <Form
        layout="horizontal"
        mode="card"
        onFinish={onFinish}
        footer={
          <Button block type="submit" color="primary" size="large">
            测试测试
          </Button>
        }
      >
        <Form.Header>头衔申请</Form.Header>
        <Form.Header>服务器: 394 | 2024-06-17 到期</Form.Header>
        <Form.Item
          name="x"
          label="X"
          rules={[{ required: true, message: '请输入X坐标' }]}
        >
          <Input type="number" placeholder="请输入X坐标" />
        </Form.Item>
        <Form.Item
          name="y"
          label="Y"
          rules={[{ required: true, message: '请输入Y坐标' }]}
        >
          <Input type="number" placeholder="请输入X坐标" />
        </Form.Item>
        <Form.Item
          name="lostPos"
          label="失落坐标"
          // rules={[{ required: false, message: '请输入Y坐标' }]}
        >
          <Input type="text" placeholder="可选，如：C10302" />
        </Form.Item>
        <Form.Item
          name="titleType"
          layout="vertical"
          label="头衔"
          rules={[{ required: true, message: '请选择头衔' }]}
          initialValue={['1']}
        >
          <Selector columns={2} options={options} />
        </Form.Item>
      </Form>
    </div>
  );
}
