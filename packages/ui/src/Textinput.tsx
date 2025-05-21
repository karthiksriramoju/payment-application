"use client"

export interface TextInputProps {
    placeholder: string;
    onChange: (value: string) => void;
    value?: string;
    label: string;
    disabled?: boolean;
}

export const TextInput = ({
    placeholder,
    onChange,
    value,
    label,
    disabled
}: TextInputProps) => {
    return <div className="pt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
        <input 
            type="text" 
            onChange={(e) => onChange(e.target.value)} 
            placeholder={placeholder} 
            disabled={disabled}
            className={`bg-gray-50 border ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
        />
    </div>
}