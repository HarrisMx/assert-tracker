import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs value={value} onChange={handleChange} indicatorColor="#262626" aria-label="simple tabs example">
        <Tab label="Active" {...a11yProps(0)} />
        <Tab label="Checkin" {...a11yProps(1)} />
        <Tab label="Checkout" {...a11yProps(2)} />
      </Tabs>
      <TabPanel classes={classes.tab} value={value} index={0}>
        Active tab content goes here
      </TabPanel>
      <TabPanel classes={classes.tab} value={value} index={1}>
        Checkin tab content goes here
      </TabPanel>
      <TabPanel classes={classes.tab} value={value} index={2}>
        Checkout tab content goes here
      </TabPanel>
    </div>
  );
}
