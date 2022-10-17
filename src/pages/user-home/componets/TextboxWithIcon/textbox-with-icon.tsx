import {
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  Paper,
  TextField,
} from "@mui/material";

function TextboxWithIcon(props: any) {
  const { placeholder, icon } = props;
  return (
    <Paper
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        width: 400,
        height: 60,
        borderRadius: "10px",
      }}
    >
      <TextField
        variant="standard"
        sx={{
          ml: 1,
          flex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>
                {placeholder}
              </InputLabel>
            </InputAdornment>
          ),
        }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        {icon}
      </IconButton>
    </Paper>
  );
}

export default TextboxWithIcon;
