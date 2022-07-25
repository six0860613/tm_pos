import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControl } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import Resizer from 'react-image-file-resizer';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

function UploadImage({ onChange }) {
  const classes = useStyles();
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1920,
        1440,
        'JPEG',
        50,
        0,
        (uri) => {
          resolve(uri);
        },
        'file',
      );
    });
  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const onFileChange = async (event) => {
    if (event.target.files[0] && event.target.files.length > 0) {
      let reFile = await resizeFile(event.target.files[0]);
      readFile(reFile).then((res) => {
        onChange(res);
      });
    }
  };

  return (
    <FormControl className={classes.formControl}>
      <input
        accept="image/*;capture=camera"
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={onFileChange}
      />
      <label htmlFor="contained-button-file">
        <Button
          size="large"
          variant="contained"
          color="primary"
          component="span"
          startIcon={<PhotoCamera />}
        >
          {'上傳圖片'}
        </Button>
      </label>
      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
    </FormControl>
  );
}

UploadImage.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default UploadImage;
