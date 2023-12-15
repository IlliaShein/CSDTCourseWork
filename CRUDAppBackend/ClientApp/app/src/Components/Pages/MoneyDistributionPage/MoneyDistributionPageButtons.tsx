import { Box, Button, Stack } from '@mui/material';

interface MoneyDistributionPageButtonsProps {
    handleAddButtonClick: () => void;
    createTransaction: () => void;
}

const MoneyDistributionPageButtons = ({handleAddButtonClick, createTransaction}: MoneyDistributionPageButtonsProps) => {

    return (
        <Box sx={{ marginTop: 3 }}>
            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={handleAddButtonClick}
                >
                    Add members
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={createTransaction}
                >
                    Save
                </Button>
            </Stack>
        </Box>
    );
};

export default MoneyDistributionPageButtons;
