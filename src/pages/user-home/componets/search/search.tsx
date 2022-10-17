import { Button, Container } from "@mui/material";
import React from "react";
import TextboxWithIcon from "../TextboxWithIcon/textbox-with-icon";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import style from "./search.module.scss";

function SearchComponent() {
  return (
    <Container className={style["container"]}>
      <div className={style["filter-container"]}>
        <TextboxWithIcon
          placeholder="What"
          icon={<SearchIcon />}
        ></TextboxWithIcon>

        <TextboxWithIcon
          placeholder="Where"
          icon={<LocationOnIcon />}
        ></TextboxWithIcon>

        <Button variant="contained">Find jobs</Button>
      </div>
    </Container>
  );
}

export default SearchComponent;
