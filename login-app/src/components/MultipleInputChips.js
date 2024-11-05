import React, { useState } from 'react';
import { TextField, Chip, Box } from '@mui/material';

function MultipleInputChips({ label, values, setValues }) {
    const [inputValue, setInputValue] = useState('');

    const handleAddChip = () => {
        if (inputValue.trim() !== '' && !values.includes(inputValue.trim())) {
            setValues([...values, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleDeleteChip = (chipToDelete) => {
        setValues(values.filter((chip) => chip !== chipToDelete));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddChip();
        }
    };

    return (
        <Box>
            <TextField
                label={label}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                fullWidth
                margin="normal"
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {values.map((value, index) => (
                    <Chip
                        key={index}
                        label={value}
                        onDelete={() => handleDeleteChip(value)}
                    />
                ))}
            </Box>
        </Box>
    );
}

export default MultipleInputChips;