// File: components/ui/checkbox.tsx

import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    function CheckboxComponent({ label, className, ...props }, ref) {
        return (
            <label className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    ref={ref}
                    className={`form-checkbox h-4 w-4 text-blue-600 ${className || ''}`}
                    {...props}
                />
                {label && <span className="text-sm">{label}</span>}
            </label>
        );
    }
);

Checkbox.displayName = 'Checkbox';
