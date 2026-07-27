import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from "@mui/material";

import AppButton from "./ButtonUI";


export type PopupField = {
  label: string;
  name: string;

  type?:
    | "text"
    | "select"
    | "textarea"
    | "file"
    | "radio";

  multiline?: boolean;

  options?: string[];
};


type Props = {
  open: boolean;
  message: string;

  fields: PopupField[];

  formData: Record<string, any>;

  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  onClose: () => void;

  onConfirm: () => void;
};



export default function Popup({
  open,
  message,
  fields = [],
  formData,
  onChange,
  onClose,
  onConfirm,
}: Props)
{

  const fieldStyles = {

    "& .MuiOutlinedInput-root": {

      height: 40,

      backgroundColor: "#FFFFFF",

      borderRadius: "8px",

      "& fieldset": {
        borderColor: "#D7E3F0",
      },

      "&:hover fieldset": {
        borderColor: "#AFC4DA",
      },

    

    },


    "& .MuiInputBase-input": {

      fontSize: "14px",

      padding: "9px 12px",

    },


    "& textarea": {

      fontSize: "14px",

      padding: "10px 12px",

    },

  };



  return (

    <Dialog

      open={open}

      onClose={onClose}

      maxWidth="lg"

      fullWidth

      PaperProps={{

        sx: {

          width: "1050px",

          maxWidth: "95vw",

          borderRadius: "8px",

          backgroundColor: "#F5F9FD",

          overflow: "hidden",

        },

      }}

    >


      <DialogContent

        sx={{

          px:4,

          py:3.5,

        }}

      >


        <Typography

          sx={{

            fontSize:"20px",

            fontWeight:500,

            color:"#1F2937",

            mb:3,

          }}

        >

          {message}

        </Typography>



        <Box

          sx={{

            display:"grid",

            gridTemplateColumns:{

              xs:"1fr",

              sm:"repeat(2,1fr)",

              md:"repeat(3,1fr)",

            },

            gap:2.5,

          }}

        >



          {

            fields.map((field)=>(


              <Box

                key={field.name}

                sx={{

                  display:"flex",

                  flexDirection:"column",

                  gap:0.8,

                }}

              >


                <Typography

                  sx={{

                    fontSize:"13px",

                    fontWeight:400,

                    color:"#4B5563",

                  }}

                >

                  {field.label}

                </Typography>



                {/* SELECT */}

                {
                  field.type === "select" && (

                    <TextField

                      select

                      size="small"

                      fullWidth

                      sx={fieldStyles}

                      name={field.name}

                      value={
                        formData[field.name] || ""
                      }

                      onChange={onChange}

                      SelectProps={{
                        native:true
                      }}

                    >

                      <option value="">
                        Select
                      </option>


                      {
                        field.options?.map(
                          (option)=>(

                            <option

                              key={option}

                              value={option}

                            >

                              {option}

                            </option>

                          )
                        )
                      }


                    </TextField>

                  )
                }



                {/* RADIO */}

                {
                  field.type === "radio" && (

                    <FormControl>

                      <RadioGroup

                        row

                        name={field.name}

                        value={
                          formData[field.name] || ""
                        }

                        onChange={onChange}

                      >

                        {
                          field.options?.map(
                            (option)=>(

                              <FormControlLabel

                                key={option}

                                value={option}

                                control={

                                  <Radio

                                    size="small"

                                    sx={{

                                      "&.Mui-checked":{
                                        color:"#4B5CEB"
                                      }

                                    }}

                                  />

                                }

                                label={option}

                              />

                            )
                          )
                        }

                      </RadioGroup>

                    </FormControl>

                  )
                }




                {/* FILE */}

                {
                  field.type === "file" && (

                    <Box

                      sx={{

                        position:"relative",

                        width:"100%",

                      }}

                    >

                      <TextField

                        fullWidth

                        size="small"

                        sx={fieldStyles}

                        value={
                          formData[field.name]?.name || ""
                        }

                        placeholder="Select JPG, PNG, PDF"

                        InputProps={{

                          readOnly:true,

                        }}

                      />


                      <input

                        type="file"

                        accept=".jpg,.jpeg,.png,.pdf"

                        name={field.name}

                        style={{

                          position:"absolute",

                          inset:0,

                          opacity:0,

                          cursor:"pointer",

                        }}

                        onChange={onChange}

                      />


                    </Box>

                  )
                }





                {/* TEXT / TEXTAREA */}

                {
                  (!field.type ||
                  field.type === "text" ||
                  field.type === "textarea") && (


                    <TextField

                      size="small"

                      fullWidth

                      sx={{

                        ...fieldStyles,

                        "& .MuiOutlinedInput-root":{

                          ...fieldStyles[
                            "& .MuiOutlinedInput-root"
                          ],

                          height:
                          field.multiline
                          ? "auto"
                          : 40,

                        }

                      }}

                      multiline={
                        field.multiline
                      }

                      minRows={
                        field.multiline
                        ? 2
                        : 1
                      }

                      placeholder="Enter"

                      name={field.name}

                      value={
                        formData[field.name] || ""
                      }

                      onChange={onChange}

                    />

                  )
                }



              </Box>


            ))

          }


        </Box>


      </DialogContent>




      <DialogActions

        sx={{

          px:4,

          py:2.5,

          backgroundColor:"#F5F9FD",

          borderTop:"1px solid #E3EBF5",

        }}

      >


        <Box

          sx={{

            display:"flex",

            gap:2,

            ml:"auto",

          }}

        >


          <AppButton

            variant="outlined"

            onClick={onClose}

            sx={{

              height:"36px",

              borderRadius:"8px",

            }}

          >

            Cancel

          </AppButton>



          <AppButton

            variant="filled"

            onClick={onConfirm}

            sx={{

              height:"36px",

              borderRadius:"8px",

            }}

          >

            + Add

          </AppButton>


        </Box>


      </DialogActions>


    </Dialog>
  );

}