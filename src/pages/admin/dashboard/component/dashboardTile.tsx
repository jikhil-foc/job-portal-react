import { useNavigate } from "react-router-dom";

import "./dashboardTile.scss";

import { Card, CardContent, Typography } from "@mui/material";

export default function DashboardTile(props: any) {
  const { title, count, navigateUrl } = props;

  const navigate = useNavigate();

  const onClickCard = () => {
    navigate(navigateUrl);
  };

  return (
    <Card className="card-tile" onClick={onClickCard}>
      <CardContent className="card-content">
        <Typography
          height={"30%"}
          color="text.secondary"
          gutterBottom
          variant="h6"
        >
          {title}
        </Typography>
        <Typography height={"70%"} variant="h3" component="div">
          {count}
        </Typography>
      </CardContent>
    </Card>
  );
}
