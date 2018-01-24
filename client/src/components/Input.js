import React from 'react';
import {TextField} from 'material-ui/';



const Input = (props)=>{
  return(
    <TextField  
    floatingLabelFocusStyle={{color:"rgb(237,187,0)"}}
    underlineFocusStyle={{borderColor:"rgb(237,187,0)"}}
    
    {...props} />
  )
}

export default Input;