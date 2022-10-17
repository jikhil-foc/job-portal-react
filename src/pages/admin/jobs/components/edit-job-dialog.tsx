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
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

import styleSheet from "./create-job-dialog.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { PATCH, POST } from "../../../../utils/axios";
import { AlertBoxContext } from "../../../../context/AlertBoxContext";

function EditJobDialog(props: any) {
  const { open, handleClose, jobDetails, locations } = props;
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
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm(formOptions);

  useEffect(() => {
    setJobDetails();
  }, [jobDetails]);

  const setJobDetails = () => {
    if (jobDetails) {
      console.log(jobDetails);

      setValue("title", jobDetails.title);
      setValue("description", jobDetails.description);
      setValue("experience", jobDetails.experience);
      setValue("company", jobDetails.company);
      setValue("salary", jobDetails.salary);
      setValue("skills", jobDetails.skills);
    }
  };

  const onSubmit = (data: any) => {
    const formData = {
      ...data,
      skills: [],
    };

    PATCH("job/update-job", jobDetails.id, formData).then((res) => {
      console.log(res);
      setMessage({
        displayMessage: "Job has been Updated",
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
              defaultValue={getValues("experience")}
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
              <FormHelperText>
                {errors?.experience?.message?.toString() ?? ""}
              </FormHelperText>
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
              {locations.map((location: any) => (
                <MenuItem key={location.name} value={location.name}>
                  {location.name}
                </MenuItem>
              ))}
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
            Update
          </Button>
          <Button className="button" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default EditJobDialog;
