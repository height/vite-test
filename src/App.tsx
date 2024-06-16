import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import { TabBar } from "antd-mobile";
import { AddSquareOutline, SetOutline } from "antd-mobile-icons";

import "./App.styl";

const tabs = [
  {
    key: "/",
    title: "头衔申请",
    icon: <AddSquareOutline />,
  },
  {
    key: "/settings",
    title: "国王管理",
    icon: <SetOutline />,
  },
];

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    navigate(value);
  };

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <div className="tab-bar">
        <TabBar activeKey={pathname} onChange={(key) => setRouteActive(key)}>
          {tabs.map((tab) => (
            <TabBar.Item key={tab.key} icon={tab.icon} title={tab.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
