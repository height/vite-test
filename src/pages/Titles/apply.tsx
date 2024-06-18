import { Form, Input, Button, Selector, Space, Toast } from 'antd-mobile';
import { applyRequest, loginRequest } from '../../services';
import { useBeforeMount, useCache } from '../../hooks';
import { getCache, setCache } from '../../utils/cache';
import { useEffect } from 'react';

interface IProps {
  data: any;
  onSuccess: () => void;
}

export const _options = [
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
  const [form] = Form.useForm();
  const [inputs, setInputs] = useCache('titles.inputs', {});
  const { data, onSuccess } = props;
  const {
    expiration_date = '',
    map_code = '',
    apply_pwd = '',
    open_title_config = [],
  } = data || {};

  const onFinish = async (values: any) => {
    console.log(values);
    const titleType = values.titleType?.[0] || '';
    const re = await applyRequest({
      sessionId: getCache('titles.sessionId') || '',
      kvkMapCode: values.kvkMapCode,
      mapCode: map_code,
      x: values.x,
      y: values.y,
      titleType,
      applyPWD: apply_pwd,
    });

    console.log(re);

    if (re.resolve?.success === true) {
      Toast.show('申请成功');
      setInputs({
        x: values.x,
        y: values.y,
        kvkMapCode: values.kvkMapCode,
        titleType,
      });
      onSuccess();
      return;
    }
    Toast.show(re.resolve?.message);

    // 提交
  };
  const options = open_title_config?.map((item: any) => {
    return {
      label: item?.titleName,
      description: `当前已申请${item.applyCount || 0}个`,
      value: item?.titleType,
    };
  });

  return (
    <div className="content" style={{ marginTop: 100 }}>
      <Form
        form={form}
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
        <Form.Header>
          服务器: {map_code} | {expiration_date} 到期
        </Form.Header>
        <Form.Item
          name="x"
          label="X"
          initialValue={inputs.x}
          rules={[{ required: true, message: '请输入X坐标' }]}
        >
          <Input type="number" placeholder="请输入X坐标" />
        </Form.Item>
        <Form.Item
          name="y"
          label="Y"
          initialValue={inputs.y}
          rules={[{ required: true, message: '请输入Y坐标' }]}
        >
          <Input type="number" placeholder="请输入X坐标" />
        </Form.Item>
        <Form.Item
          name="kvkMapCode"
          label="失落坐标"
          initialValue={inputs.kvkMapCode}
        >
          <Input type="text" placeholder="可选，如：C10302" />
        </Form.Item>
        <Form.Item
          name="titleType"
          layout="vertical"
          label="头衔"
          rules={[{ required: true, message: '请选择头衔' }]}
          initialValue={[inputs.titleType || '1']}
        >
          <Selector columns={2} options={options} />
        </Form.Item>
      </Form>
    </div>
  );
}
