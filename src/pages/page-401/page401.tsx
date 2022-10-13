import style from "./page401.module.scss";

function Page401() {
  return (
    <div className={style.container}>
      <h1 className={style["heading-line"]}>Whoops!</h1>
      <p className={style["para"]}>Something went wrong</p>
    </div>
  );
}

export default Page401;
