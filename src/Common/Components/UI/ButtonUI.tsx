import { Button, ButtonProps } from "@mui/material";

type AppButtonProps = Omit<ButtonProps, "variant"> & {
  variant?: "filled" | "outlined" | "text";
};

export default function AppButton({
  variant = "filled",
  sx,
  ...rest
}: AppButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "filled":
        return {
          backgroundColor: "#202A44",
          color: "#fff",
          
        };

      case "outlined":
        return {
          border: "1px solid #202A44",
          color: "#202A44",
          backgroundColor: "transparent",
          
        };

      case "text":
        return {
          color: "#6C757D",
         
        };

      default:
        return {};
    }
  };

  return (
    <Button
      disableElevation
      sx={{
        textTransform: "none",
        fontWeight: 500,
        padding: "5px 18px",
        ...getVariantStyles(),
        ...sx,
      }}
      {...rest}
    />
  );
}
