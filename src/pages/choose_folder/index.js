import { PageWrapper, CanvaCont } from "./style/choose_folder";
import { useEffect, useState } from "react";
import Title from "../../components/Title";
import { Link } from "react-router-dom";
import Model from "../../components/Model/index.jsx";

function App() {
  const [filePath, setFile] = useState("");
  const [fileName, setFileName] = useState("");

  const openDialog = () => {
    window.dialog.open();
    window.dialog.getFilePath(setFile);
  };
  useEffect(() => {
    return () => {
      window.dialog.removeEventListener();
    };
  }, []);

  useEffect(() => {
    if (filePath !== "") {
      let name = filePath.split("\\");
      setFileName(name[name.length - 1]);
    }
  }, [filePath]);

  return (
    <PageWrapper>
      <Title
        margin_top={10}
        padding_bot={10}
        title="Select the .gltf that you want to view"
      />
      <Link to="/">Home</Link>
      {/* <button onClick={openDialog}>Open File Dialog</button> */}
      <CanvaCont>
        <Model />
            {/* {filePath ? 
          : null} */}
      </CanvaCont>
      {fileName ? <p>{fileName} / {filePath}</p> : null}
    </PageWrapper>
  );
}

export default App;
