import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import styleSheet from "./create-job-dialog.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { POST } from "../../../../utils/axios";
import { AlertBoxContext } from "../../../../context/AlertBoxContext";

function CreateJobDialog(props: any) {
  const { open, handleClose } = props;
  const { setMessage } = useContext(AlertBoxContext);
  const [receivers, setReceivers] = useState<string[]>([]);

  const formSchema = Yup.object().shape({
    title: Yup.string().required("Title Required"),
    description: Yup.string().required("Description Required"),
    experience: Yup.string().required("Experience Required"),
    company: Yup.string().required("Company Required"),
    salary: Yup.string().required("Salary Required"),
    skills: Yup.array(),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

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

  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
  ];

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
            helperText={errors.title ? "Please Enter Title" : ""}
            {...register("title", { required: true })}
            required
          />

          <TextField
            id="outlined-basic"
            type={"text"}
            label="Description"
            variant="outlined"
            error={errors.description ? true : false}
            helperText={errors.description ? "Please Enter Description" : ""}
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
            helperText={errors.company ? "Please Enter Company" : ""}
            {...register("company", { required: true })}
            required
          />

          <TextField
            id="outlined-basic"
            type={"text"}
            label="Salary"
            variant="outlined"
            error={errors.salary ? true : false}
            helperText={errors.salary ? "Please Enter Salary" : ""}
            {...register("salary", { required: true })}
          />

          {/* <Autocomplete
            multiple
            onChange={(e, value) => setReceivers((state) => value)}
            id="outlined-basic"
            options={top100Films.map((option) => option.title)}
            defaultValue={[top100Films[1].title]}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="freeSolo"
                placeholder="Favorites"
                {...register("skills", { required: true })}
              />
            )}
          /> */}

          {/* <TextField
            id="outlined-basic"
            type={"text"}
            label="Skills"
            variant="outlined"
            {...register("skills", { required: true })}
          /> */}

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
