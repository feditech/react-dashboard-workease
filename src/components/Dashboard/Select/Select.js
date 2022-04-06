import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
  const [gender, setGender] = React.useState('');
  const listItems = props.options.map((v) =><MenuItem value={v}>{v}</MenuItem>);


  return (
    <Box sx={{width:'100%' }}>
    <FormControl sx={{width:'100%' }}>
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <Select
        sx={{width:'100%' }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={props.label}
        {...props}
        
      >{listItems}
      </Select>
    </FormControl>
  </Box>
  );
}
