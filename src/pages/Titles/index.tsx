import { NavBar } from 'antd-mobile';
import { Form, Input, Button } from 'antd-mobile';
import Login from './login';
import Apply from './apply';
import Applying from './applying';

export default function Titles() {
  const onLogged = () => {
    console.log('已登录');
  };

  return (
    <div id="titles">
      <NavBar style={{ background: '#fff' }} back={null}>
        头衔申请
      </NavBar>
      {/* <Apply /> */}
      <Applying />

      {/* <Login onLogged={onLogged} /> */}
    </div>
  );
}
