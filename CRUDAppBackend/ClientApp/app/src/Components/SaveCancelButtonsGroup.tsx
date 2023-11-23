import { Button, Stack } from '@mui/material';

interface SaveCancelButtonsGroupProps {
  SaveClick: () => void;
  CancelClick: () => void;
}

export default function SaveCancelButtonsGroup({ SaveClick, CancelClick }: SaveCancelButtonsGroupProps) {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" color="success" onClick={SaveClick}>
        Save
      </Button>
      <Button variant="contained" color="error" onClick={CancelClick}>
        Cancel
      </Button>
    </Stack>
  );
}
