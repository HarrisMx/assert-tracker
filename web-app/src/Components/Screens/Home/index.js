import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Items from '../../Sections/Items';
import Department from '../../Sections/Department';
import Shelve from '../../Sections/Shelve';
import { useSelector, useDispatch } from 'react-redux';
import FormModal from '../../Sections/Forms/FormModal';
import { TextField, Button, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: '70%',
    margin: 'auto',
    marginTop: '80px',
  },
  tab: {
    padding: theme.spacing(10)
}
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>{children}</>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [shelveTag, setShelveTag] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShelveTag("");
    setDescription("");
  };
  
  const handleCancel = (e) => {
    e.preventDefault();
    setShelveTag("");
    setDescription("");
  };
  
  return (
    <div className={classes.root}>
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab label="Items" {...a11yProps(0)} />
        <Tab label="Item transfer" {...a11yProps(1)} />
        <Tab label="Department" {...a11yProps(2)} />
        <Tab label="Shelve" {...a11yProps(3)} />
      </Tabs>
      <TabPanel classes={classes.tab} value={value} index={0}>
        <Items />
      </TabPanel>
      <TabPanel classes={classes.tab} value={value} index={1}>
        Checkin tab content goes here
      </TabPanel>
      <TabPanel classes={classes.tab} value={value} index={2}>
        <Department/>
      </TabPanel>
      <TabPanel classes={classes.tab} value={value} index={3}>
        <Shelve/>
      </TabPanel>
      <FormModal open={showModal}>
      <Typography variant="h4" gutterBottom>
        Add Shelve
      </Typography>
            <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="shelve-tag"
                  label="Shelve Tag"
                  value={shelveTag}
                  onChange={(e) => setShelveTag(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" onClick={handleCancel}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
      </FormModal>
    </div>
  );
}
