import { Fragment } from "react";
import HeaderComponent from "../../component/headerComponent";
import style from "./page401.module.scss";

function Page401() {
  return (
    <Fragment>
      <HeaderComponent></HeaderComponent>
      <div className={style.container}>
        <img
          src="https://stories.freepiklabs.com/storage/23247/401-error-unauthorized-rafiki-2845.png"
          alt=""
        />
      </div>
    </Fragment>
  );
}

export default Page401;
