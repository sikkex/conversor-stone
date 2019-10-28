import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

// Edição do estilo da Box
const styles = {
  root:{
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '100%'
  }

};

function ClassNames(props) {
  const { classes, children, className, ...other } = props;

  return (
    <Box className={clsx(classes.root, className)} {...other}>
      {children || 'class name'}
    </Box>
  );
}
ClassNames.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default withStyles(styles)(ClassNames);
