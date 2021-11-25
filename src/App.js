import React, { useState, useEffect, useCallback } from "react";
import { getDirInfo } from "./service/api";
import { formatTreeData } from "./utils";
import DirTree from "./components/DirTree";

import "antd/dist/antd.css";
import "./index.css";

function App() {
  const [treeData, setTreeData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await getDirInfo();
      setTreeData(formatTreeData(data));
      setError(null);
    } catch (error) {
      setError(error?.message || "Something went wrong, please try again.");
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [fetchData, setLoading]);

  return <DirTree loading={loading} treeData={treeData} error={error} />;
}

export default App;
