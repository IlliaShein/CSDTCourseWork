import { InputAdornment, OutlinedInput, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

interface CurrencyInputsProps {
    dollarValue: number;
    hryvniaValue: number;
    currency: number;
    onDollarChange: (value: number) => void;
    onHryvniaChange: (value: number) => void;
    onCurrencyChange: (value: number) => void;
    onInputChange: () => void;
}

const CurrencyInputs = ({dollarValue, hryvniaValue, currency, onDollarChange, onHryvniaChange, onCurrencyChange, onInputChange} : CurrencyInputsProps) => {
    const [dollarInput, setDollarInput] = useState<string>("");
    const [hryvniaInput, setHryvniaInput] = useState<string>("");
    const [currencyInput, setCurrencyInput] = useState<string>("");

    useEffect(() => {
        onInputChange();
      }, [dollarValue, hryvniaValue, currency, onInputChange]);

    const handleDollarInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDollarValue = sanitizeInput(event.target.value);
        setDollarInput(newDollarValue);

        const formattedDollar = formatSanitizedInputToNumber(newDollarValue);
        onDollarChange(formattedDollar);

        const newHryvniaValue = formattedDollar * currency;
        const RoundedHryvniaValue = newHryvniaValue.toFixed(2);
        setHryvniaInput(RoundedHryvniaValue);
        onHryvniaChange(parseFloat(RoundedHryvniaValue));
    };

    const handleHryvniaInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newHryvniaValue = sanitizeInput(event.target.value);
        setHryvniaInput(newHryvniaValue);

        const formattedHryvnia = formatSanitizedInputToNumber(newHryvniaValue);
        onHryvniaChange(formattedHryvnia);

        const newDollarValue = formattedHryvnia / currency;
        const RoundedDollarValue = newDollarValue.toFixed(2);
        setDollarInput(RoundedDollarValue);
        onDollarChange(parseFloat(RoundedDollarValue));
    };

    const handleCurrencyInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCurrencyValue = sanitizeInput(event.target.value);
        setCurrencyInput(newCurrencyValue);
        
        const formattedCurrency = formatSanitizedInputToNumber(newCurrencyValue);
        onCurrencyChange(formattedCurrency);
    };

    const formatSanitizedInputToNumber = (input: string): number => {
        if (input.endsWith('.')) {
            input.replace('.', '');
        }
        const inputNum = parseFloat(input);
        return inputNum;
    }

    const sanitizeInput = (input: string): string => {
        let sanitizedInput = input.replace(/[^\d.]+/g, '');
        sanitizedInput = sanitizedInput.replace(/\./g, (match, index) => index === sanitizedInput.indexOf('.') ? match : '');

        return sanitizedInput;
    };

    return (
        <div>
            <OutlinedInput
                sx={{ marginTop: 3, marginRight: 3 }}
                id="outlined-adornment-dollar"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                value={dollarInput}
                onChange={handleDollarInputChange}
            />
            <OutlinedInput
                sx={{ marginTop: 3, marginRight: 3 }}
                id="outlined-adornment-hryvnia"
                startAdornment={<InputAdornment position="start">₴</InputAdornment>}
                value={hryvniaInput}
                onChange={handleHryvniaInputChange}
            />
            <TextField
                sx={{ marginTop: 3, marginRight: 3 }}
                id="outlined-basic"
                label="currency rate"
                variant="outlined"
                value={currencyInput}
                onChange={handleCurrencyInputChange}
            />
        </div>
    );
};

export default CurrencyInputs;
