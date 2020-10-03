import React, {useReducer} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function reducer(state, action) {
    const { name, value } = action;
    switch (action.name) {
      case 'Firstname':
      case 'Lastname':
      case 'Email':
          return {...state, [name]: value}
      default:
        throw new Error();
    }
  }


export default function CustomizedDialogs(props) {

const {open, setOpen, setData, data, selectedRow, setSelectedRow, title} = props;
const [state, dispatch] = useReducer(reducer, data);

const save = () => {
    data.push(state);
    setData([...data]);
    setOpen(false);
    setSelectedRow(null);
}

const update = () => {
    data[selectedRow] = state;
    setData([...data]);
    setOpen(false);
    setSelectedRow(null);
}
const handleClose = () => {
    setSelectedRow(null);
    setOpen(false);
}
  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom variant="caption">
            Note: Dont leave spaces empty!
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4} >
                <TextField 
                    variant="standard" 
                    label="First name"
                    onChange={e=> dispatch({name:'Firstname', value: e.target.value})}
                    defaultValue={selectedRow !== null? data[selectedRow].Firstname : ""}
                    />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField 
                    variant="standard" 
                    label="Last name"
                    onChange={e=> dispatch({name:'Lastname', value: e.target.value})}
                    defaultValue={selectedRow !== null? data[selectedRow].Lastname : ""}
                    />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField 
                    variant="standard" 
                    label="Email"
                    onChange={e=> dispatch({name:'Email', value: e.target.value})}
                    defaultValue={selectedRow !== null? data[selectedRow].Email : ""}
                    />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            autoFocus 
            onClick={selectedRow !== null ? update : save} 
            color="primary">
            { selectedRow !== null ? "Save changes" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}