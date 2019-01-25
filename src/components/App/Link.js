import React from 'react';
import Button from '@material-ui/core/Button';

const Link = ({ active, children, onClick }) => (
  <Button color="primary"
    onClick={onClick}
    disabled={active}
    style={{
      marginLeft: '4px'
    }}
  >
    {children}
  </Button>
)
export default Link
