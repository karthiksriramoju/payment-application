export interface SelectProps {
    onSelect: (value: string) => void;
    options: {
        key: string;
        value: string;
    }[];
    disabled?: boolean;
}

export const Select = ({
    options,
    onSelect,
    disabled
}: SelectProps) => {
    return (
        <select
            onChange={(e) => onSelect(e.target.value)}
            disabled={disabled}
            className={`bg-gray-50 border ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
        >
            {options.map((option) => (
                <option key={option.key} value={option.key}>
                    {option.value}
                </option>
            ))}
        </select>
    );
};