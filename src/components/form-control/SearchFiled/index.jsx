import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

SearchField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    fullWidth: PropTypes.bool,
    label: PropTypes.string,
    disable: PropTypes.bool,
};

function SearchField(props) {
    const { name, label, form, disable, fullWidth } = props
    const {formState : {errors, touchedFields}} = form
    const hasError = errors[name]

    return (
        <Controller name={name} control={form.control} render={({ field }) => (
            <TextField
                {...field}
                label={label}
                disabled={disable}
                fullWidth={fullWidth}
                margin='normal'
                variant='filled'
                sx={{background: 'rgba(70,70,70,.7)' }}

                error={!!hasError}
                helperText={errors[name]?.message}
            />
        )}>
        </Controller>
    );
}

export default SearchField;