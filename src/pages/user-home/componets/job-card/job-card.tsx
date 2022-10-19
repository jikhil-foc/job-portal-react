import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  InputLabel,
  Stack,
} from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import style from "./job-card.module.scss";
import { useNavigate } from "react-router-dom";

function JobCard(props: any) {
  const { job } = props;
  const navigate = useNavigate();

  const onClickNavigate = () => {
    navigate(`./${job.id}`);
  };
  return (
    <Card
      sx={{
        width: "25%",
        height: " 240px",
        borderRadius: 5,
        cursor: "pointer",
      }}
      onClick={onClickNavigate}
    >
      <CardHeader></CardHeader>
      <CardContent className={style["content"]}>
        <InputLabel className={style["title"]}>{job.title}</InputLabel>
        <InputLabel className={style["sub-title"]}>{job.company}</InputLabel>
        <InputLabel className={style["location"]}>{job.location}</InputLabel>
        <Stack direction="row" spacing={1}>
          <Chip
            icon={<LocalAtmIcon />}
            label={`Up to ₹${job.salary} a month`}
          />
          <Chip icon={<WorkIcon />} label={job.jobType} />
          <Chip icon={<AccessTimeFilledIcon />} label={job.shift} />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default JobCard;
