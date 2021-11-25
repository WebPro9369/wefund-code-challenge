export const TYPES = {
  FOLDER: "folder",
  FILE: "file",
};

export const formatTreeData = (data) => {
  let filesCount = 0;
  let filesSize = 0;

  const treeData = data?.map((node) => {
    const name = node?.name;
    const type = node?.type;
    const size = node?.size;
    const children = node?.children;

    switch (type) {
      case TYPES.FOLDER: {
        const childrenTreeData = formatTreeData(children);
        filesCount += childrenTreeData.filesCount;
        filesSize += childrenTreeData.filesSize;

        return {
          title: name,
          key: Math.random(),
          children: childrenTreeData.treeData,
        };
      }

      case TYPES.FILE: {
        filesCount++;
        filesSize += size;

        return {
          title: (
            <p style={{ display: "contents" }}>
              {name}{" "}
              <span style={{ fontSize: "0.8rem", color: "grey" }}>
                {readableBytes(size)}
              </span>
            </p>
          ),
          key: Math.random(),
          isLeaf: true,
        };
      }

      default:
        return node;
    }
  });

  return {
    treeData,
    filesCount,
    filesSize,
  };
};

export function readableBytes(bytes) {
  const i = Math.floor(Math.log(bytes) / Math.log(1024)),
    sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + " " + sizes[i];
}
