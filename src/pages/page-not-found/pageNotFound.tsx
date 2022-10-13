import style from "./pageNotFound.module.scss";

function PageNotFound() {
  return (
    <div className={style.container}>
      <h1 className={style["heading-line"]}>Whoops!</h1>
      <p className={style["para"]}>Something went wrong</p>
    </div>
  );
}

export default PageNotFound;
