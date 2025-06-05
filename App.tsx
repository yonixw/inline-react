import { CreateTimer } from "./src/CreateTimer";
import { theme, ConfigProvider } from "antd";
const { defaultAlgorithm, darkAlgorithm } = theme;

const App = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: true ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <CreateTimer />
    </ConfigProvider>
  );
};

// @ts-ignore
const root = window.ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
