import { useEffect, useState } from "react"

export const useDebounce = (value: string, delay: number) => {
    const [inputValue, setInputValue] = useState<string>("");
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setInputValue(value);
        }, delay)
        return () =>  clearTimeout(timer);
    }, [value, delay])

    return inputValue;
}
