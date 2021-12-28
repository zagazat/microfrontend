import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import terminalStore, { ITerminalStore } from "../core/store/Terminal";
import { Box, Button, Input, makeStyles, TextField } from "@material-ui/core";

type Props = {
  terminal?: ITerminalStore;
  onSubmit?: (e: React.FormEvent, values: AppFormData) => void;
};

const useStyles = makeStyles({
  formGroup: {
    marginBottom: "16px",
  },
});

const terminal = terminalStore;

const initialFormState = {
  type: "remote",
  email: "",
  text: "",
};

type AppFormData = typeof initialFormState;

const AppComponent: React.FC<Props> = (props) => {
  const [formState, setFormState] = useState<AppFormData>(initialFormState);
  const s = useStyles();

  const onSubmitHandler = (e: React.FormEvent) => {
    if (!props.onSubmit) {
      return;
    }
    terminal.set("mode", "detectFace");
    return props.onSubmit(e, formState);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Box component="form" onSubmit={onSubmitHandler}>
      <div>{terminal.params.mode}</div>
      <p>formData remote:</p>
      <pre>{JSON.stringify(formState, null, 2)}</pre>
      <Box className={s.formGroup}>
        <TextField
          variant="outlined"
          name="email"
          type="email"
          label="From"
          placeholder="email@domain.zo"
          onChange={onChangeHandler}
        />
      </Box>
      <Box className={s.formGroup}>
        <TextField
          variant="outlined"
          multiline
          name="text"
          rows="10"
          label="Text"
          placeholder="How are you"
          onChange={onChangeHandler}
        />
      </Box>
      <Button
        type="submit"
        variant="contained"
        // onClick={() => terminal.set("mode", "detectFace")}
      >
        Send
      </Button>
    </Box>
  );
};

export default observer(AppComponent);
