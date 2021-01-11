import React, { useContext } from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText, TextField
} from "@material-ui/core";
import { useStyles } from "./template.style";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import { AppContext } from "../../App";

import { Redirect } from 'react-router-dom';
import AddNewItemComponent from "./components/AddNewItemComponent";

const CVComponent = () => {
  const classes = useStyles();

  const appContext = useContext(AppContext);

  const registrationUsers = appContext.registrationUsers;

  const cvInfoData = appContext.cvInfoData;
  const setCvInfoData = appContext.setCvInfoData;

  if (!registrationUsers.length) {
    return (
      <Redirect to="/" />
    )
  }

  const deleteItemClick = (id) => {
    const cvInfoDataWithDeletedItem = cvInfoData.filter(element => element.id !== id);

    setCvInfoData(cvInfoDataWithDeletedItem);
  };

  const isActiveEditItemClick = (id) => {
    const cvInfoDataWithIsEditActiveItem = cvInfoData.map(element => element.id === id ? {...element, isEdit: !element.isEdit} : element);

    setCvInfoData(cvInfoDataWithIsEditActiveItem);
  };

  const editChangeOnInput = (event, id) => {
    const value = event.target.value;

    const cvInfoDataWithEditItem = cvInfoData.map(element => element.id === id ? {...element, value} : element);

    setCvInfoData(cvInfoDataWithEditItem);
  };

  return (
    <div className={classes.root}>
      <Grid>
        <Typography variant="h6" className={classes.title}>
          Avatar with text and icon
        </Typography>

        <AddNewItemComponent cvInfoData={cvInfoData} setCvInfoData={setCvInfoData}/>

        <div className={classes.demo}>
          <List>
            {cvInfoData.length ? cvInfoData.map(({value, id, isEdit}) => (
              <ListItem key={id}>
                {isEdit ? (
                  <>
                    <ListItemAvatar>
                      <Avatar onClick={() => isActiveEditItemClick(id)}>
                        <CheckIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="text"
                      label="Text"
                      name="email"
                      autoFocus
                      value={value ? value : ''}
                      onChange={(event) => editChangeOnInput(event, id)}
                    />
                  </>
                ):(
                  <>
                    <ListItemAvatar>
                      <Avatar onClick={() => isActiveEditItemClick(id)}>
                        <EditIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={value}
                    />
                  </>
                )}
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteItemClick(id)}>
                    <DeleteIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )): 'Data is empty'}
          </List>
        </div>
      </Grid>
    </div>
  );
};

export default CVComponent;