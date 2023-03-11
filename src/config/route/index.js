import React from "react";
import { Routes , Route} from "react-router-dom";
import Home from "../../pages/home";
import ChooseFolder from "../../pages/choose_folder";
import Error from "../../pages/error";

const Nav = () => {
  return (
    <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/choose_folder" element={<ChooseFolder />} />
        <Route path="*" element={<Error />} />
    </Routes>
  );
};
export default Nav;
