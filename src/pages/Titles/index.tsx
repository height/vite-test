import { NavBar } from 'antd-mobile';
import { Form, Input, Button } from 'antd-mobile';
import Login from './login';
import Apply from './apply';
import Applying from './applying';
import { useState } from 'react';
import { useCache } from '../../hooks';

type TState = 'login' | 'apply' | 'applying';
export default function Titles() {
  const [state, setState] = useCache<TState>('titles.state', 'login');
  const [queryStroe, setQueryStore] = useCache<any>('titles.queryStore', {});

  return (
    <div id="titles">
      <NavBar style={{ background: '#fff' }} back={null}>
        头衔申请
      </NavBar>

      {state === 'login' && (
        <Login
          onLogged={(re) => {
            setQueryStore(re);
            re?.selfApply ? setState('applying', 10) : setState('apply', 1);
          }}
          onFailed={() => {}}
        />
      )}
      {state === 'apply' && (
        <Apply
          data={queryStroe}
          onSuccess={() => {
            setState('applying', 10);
          }}
        />
      )}
      {state === 'applying' && <Applying data={queryStroe} />}
    </div>
  );
}
