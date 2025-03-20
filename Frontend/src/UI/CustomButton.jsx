import { Button } from "@mui/material";

const CustomButton = ({ label, color, textColor }) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: color,
        color: textColor,
        width: 150,
        fontSize: "16px",
        fontWeight: "bold",
        padding: "8px 16px",
        borderRadius: "8px",
        "&:hover": {
          backgroundColor: color,
          opacity: 0.9,
        },
      }}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
