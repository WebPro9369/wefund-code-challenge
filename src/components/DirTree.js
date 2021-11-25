import React from "react";
import { Tree, Spin, Divider } from "antd";
import { readableBytes } from "../utils";

import "./styles.css";

const { DirectoryTree } = Tree;

const DirTree = ({ loading, error, treeData }) => {
  return (
    <div className="dir-tree-container">
      <div className="header" />
      {loading ? (
        <div className="spinner-container">
          <Spin />
        </div>
      ) : (
        <>
          {error ? (
            <div className="error">{error}</div>
          ) : (
            <>
              <DirectoryTree multiple treeData={treeData?.treeData} />
              <Divider />
              <p>Total Files: {treeData?.filesCount}</p>
              <p>Total File Size: {readableBytes(treeData?.filesSize)}</p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DirTree;
