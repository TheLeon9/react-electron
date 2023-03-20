import {
  PageWrapper,
  CanvaCont,
  LeftCont,
  StyledLink,
  Left,
  Right,
  RightCont,
  P,
  Span,
  PName,
  SpanName,
  NameCont,
  DragAndDropDiv,
  Caution,
  CustomButton,
  StyledLinkCont,
  InputSelect,
} from "./style/choose_folder";
import { useEffect, useState } from "react";
import Title from "../../components/Title";
import Model from "../../components/Model/index.js";
import ModalComponent from "./modal";
import Image from "./img/background.png";
import Etoile from "./img/etoile.png";
// import { remote } from "electron";
function App() {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [modal, setModal] = useState(false);

  const openDialog = () => {
    window.dialog.open();
    window.dialog.getFilePath(setFile);
  };
  useEffect(() => {
    return () => {
      window.dialog.removeEventListener();
    };
  }, []);

  function Verif(ext, file, name) {
    if (ext === "gltf") {
      let checkName = name.split(".")[0];
      let mot = "";
      for (let char = 0; char < checkName.length; char++) {
        mot += checkName[char];
        if (char === 14) {
          mot += "..";
          break;
        }
      }
      mot += "." + ext
      setFileName(mot);
      setFile(file);
    } else {
      setModal(true);
    }
  }
  const handleClick = (event) => {
    const gltfFile = event.target.files[0];
    let ext = gltfFile.name.split(".");
    ext = ext[ext.length - 1];
    Verif(ext, gltfFile, gltfFile.name);
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const gltfFile = event.dataTransfer.files[0];
    let ext = gltfFile.name.split(".");
    ext = ext[ext.length - 1];
    Verif(ext, gltfFile, gltfFile.name);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  return (
    <PageWrapper>
      {modal ? <ModalComponent setModal={setModal} /> : null}
      <Left img={Etoile}>
        <LeftCont>
          <CanvaCont>
            <Model file={file} setFileName={setFileName} />
          </CanvaCont>
          <NameCont>
            <SpanName>Name :</SpanName>
            {fileName ? <PName>{fileName}</PName> : null}
          </NameCont>
        </LeftCont>
      </Left>
      <Right img={Image}>
        <RightCont>
          <Title margin_top={10} padding_bot={10} title="Welcome" />
          <P>
            Here you can<Span> "View" </Span>your<Span> "3D models" </Span>
          </P>
          <P>
            So Please<Span> "Select" </Span>it
          </P>
          <CustomButton onClick={openDialog}>OPEN FOLDER</CustomButton>
          <P>
            Or<Span> "Drag and Drop" </Span>it
          </P>
          <DragAndDropDiv onDrop={handleDrop} onDragOver={handleDragOver}>
            <InputSelect type="file" onChange={handleClick} />
            <Span>DROP ZONE</Span>
          </DragAndDropDiv>
          <Caution> /!\ We only Accept .GLTF files /!\ </Caution>
          <StyledLinkCont>
            <StyledLink to="/hi">Back Home</StyledLink>
          </StyledLinkCont>
        </RightCont>
      </Right>
    </PageWrapper>
  );
}

export default App;
