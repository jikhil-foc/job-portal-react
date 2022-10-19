import { useContext } from "react";

import { POST } from "../../../../utils/axios";
import { AlertBoxContext } from "../../../../context/AlertBoxContext";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styleSheet from "./create-job-dialog.module.scss";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Stack } from "@mui/system";

function CreateJobDialog(props: any) {
  const { open, handleClose, locations } = props;
  const { setMessage } = useContext(AlertBoxContext);
  const formSchema = Yup.object().shape({
    title: Yup.string().required("Title Required"),
    description: Yup.string().required("Description Required"),
    experience: Yup.string().required("Experience Required"),
    company: Yup.string().required("Company Required"),
    salary: Yup.string().required("Salary Required"),
    location: Yup.string().required("Location Required"),
    shift: Yup.string().required("Shift Required"),
    jobType: Yup.string().required("Type Required"),
    skills: Yup.array(),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(formOptions);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const onSubmit = (data: any) => {
    const formData = {
      ...data,
      skills: [],
    };

    POST("job/create-job", formData).then((res) => {
      setMessage({
        displayMessage: "Job has been created",
        type: "success",
        isOpen: true,
      });
      reset();
      handleClose();
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmit)} className={styleSheet["form"]}>
          <TextField
            id="outlined-basic"
            type={"text"}
            label="Title"
            variant="outlined"
            error={errors.title ? true : false}
            helperText={errors?.title?.message?.toString() ?? ""}
            {...register("title", { required: true })}
            required
          />

          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <ReactQuill
                {...field}
                style={{ height: "130px", marginBottom: "45px" }}
                theme="snow"
              />
            )}
          />

          {errors.description && (
            <FormHelperText>
              {errors?.description?.message?.toString() ?? ""}
            </FormHelperText>
          )}

          <Stack direction="row" spacing={2} justifyContent="space-between">
            <FormControl
              error={errors.experience ? true : false}
              sx={{ width: "50%" }}
            >
              <InputLabel id="demo-simple-select-label">Experience</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Experience"
                {...register("experience", { required: true })}
                required
                defaultValue={"Fresher"}
              >
                <MenuItem key={1} value={"Fresher"}>
                  Fresher
                </MenuItem>
                <MenuItem key={2} value={"1 Year"}>
                  1 Year
                </MenuItem>
                <MenuItem key={3} value={"2 Year"}>
                  2 Year
                </MenuItem>
                <MenuItem key={4} value={"3 Year"}>
                  3 Year
                </MenuItem>
                <MenuItem key={5} value={"4+ Year"}>
                  4+ Year
                </MenuItem>
              </Select>
              {errors.experience && (
                <FormHelperText>Experience Required</FormHelperText>
              )}
            </FormControl>

            <TextField
              id="outlined-basic"
              type={"text"}
              label="Company"
              variant="outlined"
              error={errors.company ? true : false}
              helperText={errors?.company?.message?.toString() ?? ""}
              {...register("company", { required: true })}
              required
              sx={{ width: "50%" }}
            />
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Controller
              control={control}
              name="location"
              render={({ field }) => (
                <FormControl
                  error={errors.location ? true : false}
                  sx={{ width: "50%" }}
                >
                  <InputLabel id="location-select-label">Location</InputLabel>
                  <Select
                    labelId="location-select-label"
                    id="location-select"
                    label="Location"
                    {...field}
                    required
                  >
                    {locations.map((location: any) => {
                      return (
                        <MenuItem key={location.name} value={location.name}>
                          {location.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {errors.location && (
                    <FormHelperText>
                      {errors?.location?.message?.toString() ?? ""}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            ></Controller>

            <TextField
              id="outlined-basic"
              type={"text"}
              label="Salary"
              variant="outlined"
              error={errors.salary ? true : false}
              helperText={errors?.salary?.message?.toString() ?? ""}
              {...register("salary", { required: true })}
              sx={{ width: "50%" }}
            />
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Controller
              control={control}
              name="jobType"
              render={({ field }) => (
                <FormControl
                  error={errors.jobType ? true : false}
                  sx={{ width: "50%" }}
                >
                  <InputLabel id="type-select-label">Job Type</InputLabel>
                  <Select
                    labelId="type-select-label"
                    id="type-select"
                    label="Job Type"
                    {...field}
                    required
                    defaultValue={"Full Time"}
                  >
                    <MenuItem value={"Full Time"}>Full Time</MenuItem>
                    <MenuItem value={"Part Time"}>Part Time</MenuItem>
                    <MenuItem value={"Freelance"}>Freelance</MenuItem>
                  </Select>
                  {errors.location && (
                    <FormHelperText>
                      {errors?.jobType?.message?.toString() ?? ""}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            ></Controller>

            <Controller
              control={control}
              name="shift"
              render={({ field }) => (
                <FormControl
                  error={errors.shift ? true : false}
                  sx={{ width: "50%" }}
                >
                  <InputLabel id="shift-select-label">Shift</InputLabel>
                  <Select
                    labelId="shift-select-label"
                    id="shift-select"
                    label="Shift"
                    {...field}
                    required
                    defaultValue={"Day"}
                  >
                    <MenuItem value={"Day"}>Day</MenuItem>
                    <MenuItem value={"Night"}>Night</MenuItem>
                    <MenuItem value={"Flexible"}>Flexible</MenuItem>
                  </Select>
                  {errors.location && (
                    <FormHelperText>
                      {errors?.shift?.message?.toString() ?? ""}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            ></Controller>
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button className="button" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="button" variant="contained">
              Create
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}

export default CreateJobDialog;
