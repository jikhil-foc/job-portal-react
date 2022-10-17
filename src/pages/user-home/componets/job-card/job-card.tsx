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

function JobCard(props: any) {
  const { job } = props;
  return (
    <Card
      sx={{ width: "30%", height: 360, borderRadius: 5, cursor: "pointer" }}
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
          <Chip icon={<WorkIcon />} label="Full Time" />
          <Chip icon={<AccessTimeFilledIcon />} label="Day shift" />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default JobCard;
