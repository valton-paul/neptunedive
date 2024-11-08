import React from "react";
import { Input } from "@/components/ui/input";

export function InputField({ label, value, onChange, type, max, step }) {
    return (
        <div>
            <label>{label}</label>
            <Input type={type} step={step} max={max ? max : ''} defaultValue={value} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
}
