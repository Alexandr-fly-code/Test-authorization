import React, { useState } from 'react';
import { TextField } from "@material-ui/core";

import { v4 as uuidv4 } from 'uuid';
import Typography from "@material-ui/core/Typography";

import PropTypes from 'prop-types';

const AddNewItemComponent = ({cvInfoData, setCvInfoData}) => {
  const [inputValue, setInputValue] = useState('');

  const onChangeInput = (event) => {
    const value = event.target.value;

    setInputValue(value);
  };

  const onSubmitInput = (event) => {
    event.preventDefault();
    setCvInfoData([...cvInfoData, {id: uuidv4(), value: inputValue, isEdit: false}]);

    setInputValue('');
  };

  return (
    <>
      <form onSubmit={onSubmitInput}>
        <TextField
          size="small"
          fullWidth
          label="New info item"
          margin="normal"
          variant="outlined"
          value={inputValue}
          onChange={onChangeInput}
        />
        <Typography>
          Write text and click on Enter
        </Typography>
      </form>
    </>
  );
};

AddNewItemComponent.propTypes = {
  cvInfoData: PropTypes.array,
  setCvInfoData: PropTypes.func,
};

export default AddNewItemComponent;