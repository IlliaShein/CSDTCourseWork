import { Button, TextField } from "@mui/material";

function MoneyDistributionPage() {
  return (
    <div>
      <TextField id="outlined-basic" label="dollar" variant="outlined" />
      <TextField id="outlined-basic" label="hryvnia" variant="outlined" />
      <TextField id="outlined-basic" label="currency rate" variant="outlined" />
      <Button
        variant="contained"
        color="success"
        size="large"
        sx={{ marginTop: '9px' }}
      >
        Add members
      </Button>
      <hr />
    </div>
  );
}

export default MoneyDistributionPage;
