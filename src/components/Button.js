import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// Edição de estilo do Button
const styles = {
  root: {
    display:"flex",    
    borderRadius: 2,
    width: '100%',
    height: '2.625rem',
    padding: '0 1.25rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    background: 'rgb(20, 170, 75)',
    marginBottom: '0.5rem',
    border: 0,
    color: 'white',
    boxShadow: '0 0.1875rem 0.3125rem 0.125rem #5d8c64',
    fontFamily: "\"Quicksand\",\"∏-apple-system\", \"BlinkMacSystemFont\", \"Segoe UI\",\" Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Open Sans\", \"Helvetica Neue\", sans-serif",
    cursor: 'pointer'
  },
  label: {
    textTransform: 'capitalize',
  },
};

function ClassNames(props) {  

  const { classes, children, className, variant, ...other } = props;

  return (
    
      <Button className={clsx(classes.root, classes.label, className, variant)} {...other}>
        {children || 'class name'}
      </Button>
    
  );
}
ClassNames.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  variant: PropTypes.string,
};

export default withStyles(styles)(ClassNames);
