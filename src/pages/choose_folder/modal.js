import React from "react";
import {
  P,
  Span,
  SpanName,
  CustomButton,
  Modal,
  ModalBackground,
} from "./style/choose_folder";

const ModalComponent = (props) => {
  return (
    <ModalBackground>
      <Modal>
        <SpanName>READ</SpanName>
        <P>
          We only Accept<Span> .GLTF </Span>files
        </P>
        <CustomButton
          onClick={() => {
            props.setModal(false);
          }}
        >
          CLOSE
        </CustomButton>
      </Modal>
    </ModalBackground>
  );
};

export default ModalComponent;
