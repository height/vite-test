import { Form, Input, Button, Selector, Space } from 'antd-mobile';
import { applyingRequest, loginRequest } from '../../services';
import styles from './index.module.styl';
import { useEffect } from 'react';
import { useBeforeMount, useCache } from '../../hooks';

interface IProps {
  data: any;
}

export default function Applying(props: IProps) {
  const [sessionId, setSessionId] = useCache('titles.sessionId', '');
  const [mapCode, setMapCode] = useCache('titles.name', '');
  const { data } = props;
  const {} = data || {};
  const onFinish = (values: any) => {
    console.log(values);
  };

  useBeforeMount(async () => {
    const res = await applyingRequest({
      sessionId,
      mapCode,
    });

    console.log(res);
  });

  return (
    <div className={styles.applying}>
      <div className={styles.titleHead}>申请状态：</div>
      <div className={styles.applyingCard}>
        <div>您申请的[建造大师]头衔</div>
        <div className={styles.applyingCardH1}>使用中</div>
        <div>预计等待 0 分钟，请及时关注</div>
      </div>
      <Button block>释放头衔</Button>
      <Button block style={{ marginTop: 10 }}>
        查看记录
      </Button>
    </div>
  );
}
