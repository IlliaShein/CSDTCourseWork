import { InputAdornment, OutlinedInput, TextField } from '@mui/material';
import { useEffect } from 'react';

interface CurrencyButtonsProps {
    dollarValue: number;
    hryvniaValue: number;
    currency: number;
    onDollarChange: (value: number) => void;
    onHryvniaChange: (value: number) => void;
    onCurrencyChange: (value: number) => void;
    onInputChange: () => void;
}

const CurrencyButtons = ({dollarValue, hryvniaValue, currency, onDollarChange, onHryvniaChange, onCurrencyChange, onInputChange} : CurrencyButtonsProps) => {

    useEffect(() => {
        onInputChange();
      }, [dollarValue, hryvniaValue, currency, onInputChange]);

    const handleDollarInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDollarValue = Number(event.target.value);
        onDollarChange(newDollarValue);

        const newHryvniaValue = newDollarValue * currency;
        const RoundedHryvniaValue = parseFloat(newHryvniaValue.toFixed(2));
        onHryvniaChange(RoundedHryvniaValue);
    };

    const handleHryvniaInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newHryvniaValue = Number(event.target.value);
        onHryvniaChange(newHryvniaValue);

        const newDollarValue = newHryvniaValue / currency;
        const RoundedDollarValue = parseFloat(newDollarValue.toFixed(2));
        onDollarChange(RoundedDollarValue);
    };

    const handleCurrencyInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCurrencyValue = Number(event.target.value);
        onCurrencyChange(newCurrencyValue);
    };

    return (
        <div>
            <OutlinedInput
                sx={{ marginTop: 3, marginRight: 3 }}
                id="outlined-adornment-dollar"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                value={dollarValue !== null ? dollarValue : ''}
                onChange={handleDollarInputChange}
            />
            <OutlinedInput
                sx={{ marginTop: 3, marginRight: 3 }}
                id="outlined-adornment-hryvnia"
                startAdornment={<InputAdornment position="start">₴</InputAdornment>}
                value={hryvniaValue !== null ? hryvniaValue : ''}
                onChange={handleHryvniaInputChange}
            />
            <TextField
                sx={{ marginTop: 3, marginRight: 3 }}
                id="outlined-basic"
                label="currency rate"
                variant="outlined"
                value={currency !== null ? currency : ''}
                onChange={handleCurrencyInputChange}
            />
        </div>
    );
};

export default CurrencyButtons;
