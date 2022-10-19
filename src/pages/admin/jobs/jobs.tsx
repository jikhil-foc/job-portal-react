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
import EditJobDialog from "./components/edit-job-dialog";
import locationData from "../../../assets/json/location.json";

function JobPage() {
  const [deletedJob, setDelete] = useState(false);
  const [filter, setFilter] = useState("");
  const [jobDetails, setJobsDetails] = useState();
  const [jobId, setJobId] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [locations, setLocations] = useState([
    {
      id: "1",
      name: "Mumbai",
      state: "Maharashtra",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { setMessage } = useContext(AlertBoxContext);

  useEffect(() => {
    setLocations(locationData);
  }, [locations]);

  useEffect(() => {
    if (!openCreateDialog || !openEditDialog) {
      getAllJobs();
    }
  }, [openCreateDialog, openEditDialog]);

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

        setDelete(false);
        getAllJobs();
      });
    }
  }, [deletedJob]);

  const closeCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const closeEditDialog = () => {
    setOpenEditDialog(false);
  };

  const getAllJobs = () => {
    GET("job/get-all", { filter }).then((res: any) => {
      setJobs(res.data.jobs);
    });
  };

  const onChangeFilter = (ev: any) => {
    setFilter(ev.target.value);
  };

  const onClickDeleteBtn = (id: number) => {
    setJobId(id);
    setOpen(true);
  };

  const onClickJobEdit = (data: any) => {
    setJobsDetails(data);
    setOpenEditDialog(true);
  };

  const onClickFilterBtn = () => {
    getAllJobs();
  };

  const handleClose = () => {
    setOpen(false);
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

                <StyledTableCell align="left">Company</StyledTableCell>
                <StyledTableCell align="left">Location</StyledTableCell>
                <StyledTableCell align="left">Type</StyledTableCell>
                <StyledTableCell align="left">Shift</StyledTableCell>
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
                    {row.company}
                  </TableCell>
                  <TableCell className={style["cell"]} align="left">
                    {row.location}
                  </TableCell>
                  <TableCell className={style["cell"]} align="left">
                    {row.jobType}
                  </TableCell>
                  <TableCell className={style["cell"]} align="left">
                    {row.shift}
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
                          color="error"
                          onClick={() => onClickDeleteBtn(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          aria-label="edit"
                          color="success"
                          onClick={() => {
                            onClickJobEdit(row);
                          }}
                        >
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
        locations={locations}
      ></CreateJobDialog>

      <EditJobDialog
        open={openEditDialog}
        handleClose={closeEditDialog}
        jobDetails={jobDetails}
        locations={locations}
      ></EditJobDialog>
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
