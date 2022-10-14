import { Fragment } from "react";
import HeaderComponent from "../../component/headerComponent";
import style from "./pageNotFound.module.scss";

function PageNotFound() {
  return (
    <Fragment>
      <HeaderComponent></HeaderComponent>
      <div className={style.container}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/580/580185.png"
          alt=""
        />
      </div>
    </Fragment>
  );
}

export default PageNotFound;
