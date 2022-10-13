import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  styled,
  tableCellClasses,
  Button,
  Pagination,
  Stack,
  IconButton,
  Paper,
  InputBase,
  Tooltip,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import HeaderComponent from "../../../component/headerComponent";
import { DELETE, GET } from "../../../utils/axios";
import style from "./jobs.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteConfirmation from "../../../component/deleteConfirmation";
import CreateJobDialog from "./components/create-job-dialog";
import { AlertBoxContext } from "../../../context/AlertBoxContext";
import SearchIcon from "@mui/icons-material/Search";

function JobPage() {
  const { setMessage } = useContext(AlertBoxContext);
  const [jobs, setJobs] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [deletedJob, setDelete] = useState(false);
  const [jobId, setJobId] = useState(0);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getAllJobs();
  }, [deletedJob, openCreateDialog]);

  useEffect(() => {
    if (deletedJob) {
      setOpen(false);
      DELETE("job/", jobId).then((res) => {
        setMessage({
          displayMessage: "job has been deleted successful",
          type: "success",
          isOpen: true,
        });
        setJobId(0);
        setDataLoaded(true);
        setDelete(false);
      });
    }
  }, [deletedJob]);

  const onClickDeleteBtn = (id: number) => {
    setJobId(id);
    setOpen(true);
  };

  const getAllJobs = () => {
    GET("job/get-all", { filter }).then((res: any) => {
      setJobs(res.data.jobs);
    });
  };

  const onChangeFilter = (ev: any) => {
    console.log(ev.target.value);
    setFilter(ev.target.value);
  };

  const onClickFilterBtn = () => {
    getAllJobs();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  return (
    <Box width={"100%"} className={style["container"]}>
      <HeaderComponent></HeaderComponent>
      <div>
        <div className={style["filter"]}>
          <div>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: 40,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search with Name or Company"
                inputProps={{ "aria-label": "search google maps" }}
                onChange={onChangeFilter}
              />
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={onClickFilterBtn}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
          <div>
            <Button
              variant="contained"
              onClick={() => setOpenCreateDialog(true)}
            >
              Create Job
            </Button>
          </div>
        </div>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell align="left">Company</StyledTableCell>
                <StyledTableCell align="left">Experience</StyledTableCell>
                <StyledTableCell align="left">Salary</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((row: any) => (
                <TableRow key={row?.id}>
                  <TableCell className={style["cell"]} align="left">
                    {row?.title}
                  </TableCell>
                  <TableCell className={style["cell"]} align="left">
                    {row.description}
                  </TableCell>
                  <TableCell className={style["cell"]} align="left">
                    {row.company}
                  </TableCell>
                  <TableCell className={style["cell"]} align="left">
                    {row.experience}
                  </TableCell>
                  <TableCell className={style["cell"]} align="left">
                    {row.salary}
                  </TableCell>
                  <TableCell className={style["cell"]} align="left">
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="delete"
                          type="button"
                          onClick={() => onClickDeleteBtn(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton aria-label="edit">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <DeleteConfirmation
        open={open}
        handleClose={handleClose}
        message="Are you sure you want delete job?"
        title="Delete Job"
        setDelete={setDelete}
      ></DeleteConfirmation>

      <CreateJobDialog
        open={openCreateDialog}
        handleClose={closeCreateDialog}
      ></CreateJobDialog>
    </Box>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E7E9EB",
    color: "#000",
    fontSize: 18,
    fontWeight: 800,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default JobPage;
