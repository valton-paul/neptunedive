import React from "react";
import { Input } from "@/components/ui/input";

export function InputField({ label, value, onChange }) {
    return (
        <div>
            <label>{label}</label>
            <Input defaultValue={value} onChange={(e) => onChange(parseInt(e.target.value))} />
        </div>
    );
}
