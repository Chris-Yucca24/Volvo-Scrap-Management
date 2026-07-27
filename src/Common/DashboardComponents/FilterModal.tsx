import {
  Box,
  Checkbox,
  FormControlLabel,
  Popover,
  Typography
} from "@mui/material";

import { useState } from "react";


type Props = {
  open:boolean;
  anchorEl: HTMLElement | null;
  onClose:()=>void;

  sections:{
    title:string;
    options:string[];
  }[];

  onApply?:(
    filters:Record<string,string[]>
  )=>void;
};

export default function FilterModal({
  open,
  anchorEl,
  onClose,
  sections,
  onApply

}:Props){


const [filters,setFilters]=useState<
Record<string,string[]>
>({});



const handleChange = (
 section:string,
 option:string
)=>{


let updated = {
 ...filters
};


if(updated[section]?.includes(option)){

 updated[section] =
 updated[section].filter(
  item=>item!==option
 );

}
else{

 updated[section]=[
  ...(updated[section] || []),
  option
 ];

}


setFilters(updated);

onFilterChange?.(updated);


};



return (

<Popover

 open={open}

 anchorEl={anchorEl}

 onClose={onClose}

 anchorOrigin={{
  vertical:"bottom",
  horizontal:"left"
 }}

>


<Box
sx={{
 padding:2,
 width:250
}}
>


<Typography fontWeight={500}>
 Filter By
</Typography>



{
sections.map((section)=>(

<Box key={section.title}
mt={2}
>

<Typography>
 {section.title}
</Typography>


{
  section.options.map(option=>(

    <Box
      key={option}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >

      <FormControlLabel

        control={
          <Checkbox
            size="small"
            checked={
              filters[section.title]
              ?.includes(option)
              || false
            }

            onChange={() =>
              handleChange(
                section.title,
                option
              )
            }

            sx={{
              padding: "4px",
            }}
          />
        }


        label={
          <Typography
            sx={{
              fontSize: "13px",
              color:"#555",
            }}
          >
            {option}
          </Typography>
        }


        sx={{
          margin:0,
          height:"28px"
        }}

      />

    </Box>

  ))
}

</Box>

))

}

<Box
sx={{
  display:"flex",
  justifyContent:"flex-end",
  marginTop:2,
}}
>

<button

onClick={()=>{

  onApply?.(filters);

  onClose();

}}

style={{
  background:"#003274",
  color:"#fff",
  border:"none",
  borderRadius:"4px",
  padding:"6px 18px",
  fontSize:"13px",
  cursor:"pointer"
}}

>

Apply

</button>

</Box>

</Box>


</Popover>


);


}