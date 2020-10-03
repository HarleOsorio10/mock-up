import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FormDialog from "./reusables/DialogForm";
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Table from "./reusables/Table";
import { Grid, Typography, AppBar, Toolbar } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        minHeight: "100vh",
        flexGrow: 1,
        overflow: "hidden",
      },
      fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
      container: {
          padding: 5,
          marginTop: 20,
          display: "flex",
      }
}));

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <div className={classes.root}>
        <AppBar position="static">
        <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
                ABC Mock
            </Typography>
        </Toolbar>
        </AppBar>
        <Grid container spacing={2} justify="center" className={classes.container}>
            <Grid item md={6} style={{textAlign: "center"}}>
                { data.length > 0 ?
                    <Table 
                        data={data} 
                        setData={setData} 
                        setOpen={setOpen} 
                        setSelectedRow={setSelectedRow}
                    />
                : <Typography variant="overline"> No records </Typography>
                }
            </Grid>
            <FormDialog 
                open={open} 
                setOpen={setOpen} 
                data={data}
                setData={setData}
                selectedRow={selectedRow}
                setSelectedRow={setSelectedRow}
                title={selectedRow === null ? "Add" : "Update"}
            />
            <Zoom
            in
            timeout={transitionDuration}
            unmountOnExit
            >
                <Fab 
                    color="secondary"  
                    onClick={e=>setOpen(true)} 
                    className={classes.fab}
                >
                    <AddIcon/>
            </Fab>
            </Zoom>
        </Grid>
    </div>
  );
}