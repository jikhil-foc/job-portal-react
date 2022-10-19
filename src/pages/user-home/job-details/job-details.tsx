import {
  Card,
  CardContent,
  Chip,
  Container,
  InputLabel,
  Stack,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderComponent from "../../../component/headerComponent";
import { GET } from "../../../utils/axios";
import style from "./job-details.module.scss";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

export interface Job {
  id: number;
  title: string;
  description: string;
  experience: string;
  company: string;
  salary: string;
  location: string;
  jobType: string;
  shift: string;
  isActive: boolean;
  skills: any[];
}

function JobDetails() {
  const params = useParams();
  const jobId = params.id;
  const defaultJob: Job = {
    id: 1,
    title: "",
    description: "",
    experience: "",
    company: "",
    salary: "",
    location: "",
    jobType: "",
    shift: "",
    isActive: true,
    skills: [],
  };
  const [job, setJob] = useState(defaultJob);

  useEffect(() => {
    getJobDetails();
  }, []);

  const getJobDetails = () => {
    GET(`client-job/get-job/${jobId}`).then((res: any) => {
      setJob(res.data);
    });
  };

  return (
    <Fragment>
      <HeaderComponent></HeaderComponent>
      <div className={style["container"]}>
        <Card sx={{ minWidth: "70vh", marginTop: "25px" }}>
          <CardContent>
            <Stack direction={"column"} spacing="3" sx={{ padding: "30px" }}>
              <InputLabel className={style["title"]}>{job?.title}</InputLabel>
              <InputLabel className={style["sub-title"]}>
                {job?.company}
              </InputLabel>
              <InputLabel className={style["location"]}>
                {job.location}
              </InputLabel>
              <Stack direction="row" spacing={1}>
                <Chip
                  icon={<LocalAtmIcon />}
                  label={`Up to ₹${job.salary} a month`}
                />
                <Chip icon={<WorkIcon />} label={job.jobType} />
                <Chip icon={<AccessTimeFilledIcon />} label={job.shift} />
              </Stack>
            </Stack>
            <Container className={style["description-container"]}>
              <div dangerouslySetInnerHTML={{ __html: job.description }}></div>
            </Container>
          </CardContent>
        </Card>
      </div>
    </Fragment>
  );
}

export default JobDetails;
