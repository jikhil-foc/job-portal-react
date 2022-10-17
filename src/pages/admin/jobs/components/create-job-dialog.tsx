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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styleSheet from "./create-job-dialog.module.scss";
import * as Yup from "yup";

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
    skills: Yup.array(),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
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
      console.log(res);
      setMessage({
        displayMessage: "Job has been created",
        type: "success",
        isOpen: true,
      });
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
      <Box sx={style} width={100}>
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

          <TextField
            id="outlined-basic"
            type={"text"}
            label="Description"
            variant="outlined"
            error={errors.description ? true : false}
            helperText={errors?.description?.message?.toString() ?? ""}
            {...register("description", { required: true })}
            required
          />

          <FormControl error={errors.experience ? true : false}>
            <InputLabel id="demo-simple-select-label">Experience</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Experience"
              {...register("experience", { required: true })}
              required
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
          />

          <FormControl error={errors.location ? true : false}>
            <InputLabel id="location-select-label">Location</InputLabel>
            <Select
              labelId="location-select-label"
              id="location-select"
              label="Location"
              {...register("location", { required: true })}
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

          <TextField
            id="outlined-basic"
            type={"text"}
            label="Salary"
            variant="outlined"
            error={errors.salary ? true : false}
            helperText={errors?.salary?.message?.toString() ?? ""}
            {...register("salary", { required: true })}
          />

          <Button type="submit" className="button" variant="contained">
            Create
          </Button>
          <Button className="button" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default CreateJobDialog;
