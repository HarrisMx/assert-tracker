import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Active from '../../Sections/Active';
import AddItem from '../../Sections/Forms/AddItem';
import { Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

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
  const [addItem, setAddItem] = useState(false);
  const user = useSelector((state)=> state.user.user);
  const appState = useSelector((state)=> state.app);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(user, appState);
  }, 200);

  return (
    <div className={classes.root}>
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab label="Active" {...a11yProps(0)} />
        <Tab label="Check-in" {...a11yProps(1)} />
        <Tab label="Check-out" {...a11yProps(2)} />
      </Tabs>
      <TabPanel classes={classes.tab} value={value} index={0}>
        <Active openAddItem={setAddItem}/>
      </TabPanel>
      <TabPanel classes={classes.tab} value={value} index={1}>
        Checkin tab content goes here
      </TabPanel>
      <TabPanel classes={classes.tab} value={value} index={2}>
        Checkout tab content goes here
      </TabPanel>
      <AddItem open={addItem} onClose={false} onSubmit={()=>{<Alert severity="warning">This is a warning alert — check it out!</Alert>}}/>
    </div>
  );
}
