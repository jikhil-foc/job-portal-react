import { Fragment, useEffect, useState } from "react";
import HeaderComponent from "../../component/headerComponent";
import { GET } from "../../utils/axios";
import JobCard from "./componets/job-card/job-card";
import SearchComponent from "./componets/search/search";
import style from "./user-home.module.scss";

function UserHome() {
  const [jobs, setJob] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    GET("client-job/get-all", { title, location }).then((res: any) => {
      setJob(res.data.jobs);
    });
  }, []);

  return (
    <Fragment>
      <HeaderComponent></HeaderComponent>
      <SearchComponent></SearchComponent>
      <div className={style["job-container"]}>
        {jobs?.map((job: any) => (
          <JobCard job={job} key={job.id}></JobCard>
        ))}
      </div>
    </Fragment>
  );
}

export default UserHome;
