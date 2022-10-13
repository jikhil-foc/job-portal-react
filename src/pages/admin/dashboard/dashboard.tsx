import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import HeaderComponent from "../../../component/headerComponent";
import { GET } from "../../../utils/axios";
import DashboardTile from "./component/dashboardTile";

import style from "./dashboard.module.scss";

function DashboardPage() {
  const [dashboard, setDashboard] = useState({
    jobs: 0,
    users: 0,
  });
  useEffect(() => {
    GET("job/get-dashboard").then((res: any) => {
      setDashboard(res.data);
    });
  }, []);

  return (
    <Box width={"100%"}>
      <HeaderComponent></HeaderComponent>
      <div className={style["container-dashboard"]}>
        <DashboardTile
          title={"Jobs"}
          count={dashboard.jobs}
          navigateUrl={"/portal/admin/jobs"}
        ></DashboardTile>
        <DashboardTile
          title={"Users"}
          count={dashboard.users}
          navigateUrl={"/portal/admin/users"}
        ></DashboardTile>
      </div>
    </Box>
  );
}

export default DashboardPage;
