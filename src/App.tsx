import React from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const RemoteSider = React.lazy(() => import('./components/RemoteSider'));
const TodoApp = React.lazy(() => import('./components/TodoList/TodoApp'));
const FinanceApp = React.lazy(() => import('./components/FinanceApp/FinanceApp'));

const App = () => {
  return (
    <Layout className='h-screen overflow-hidden'>
      <Header className="header bg-slate-700">
        <div className="logo" />
        <h1 className="text-white">微前端</h1>
      </Header>
      <Layout className='p-0'>
        <Sider>
          <RemoteSider />
        </Sider>
        <Content
          className="site-layout-background flex overflow-scroll"
          style={{
            padding: 0,
            margin: 0,
            height: 'calc(100vh - 100px)',
          }}
        >
          <Switch>
            <Route path="/" exact render={() => <div>首頁</div>} />
            <Route path="/todoList" exact render={() => <TodoApp />} />
            <Route path="/financeApp" exact render={() => <FinanceApp />} />
            <Route path="/mediaPanel" exact render={() => <div>To be continue...</div>} />
          </Switch>
        </Content>
      </Layout>
      <Footer className='absolute bottom-0 bg-slate-700 w-screen text-white h-10 flex justify-center items-center'>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
}

export default App;
