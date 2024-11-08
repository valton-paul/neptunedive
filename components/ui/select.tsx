// File: components/ui/select.tsx

import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, options, className, ...props }) => {
    return (
        <label className="block">
            {label && <span className="text-sm">{label}</span>}
            <select
                className={`form-select mt-1 block w-full ${className || ''}`}
                {...props}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
};
