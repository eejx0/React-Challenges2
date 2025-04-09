import { useState } from "react"

export const useInput = (inputValue: string, buttonAction: (value: string) => void) => {
    const [value, setValue] = useState<string>(inputValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const handleClick = () => {
        setValue("")
        buttonAction(value)
    }

    return [value, handleChange, handleClick] as const;
}