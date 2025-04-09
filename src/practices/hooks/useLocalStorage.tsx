import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    // 이렇게 useState 초기값을 함수로 설정하면 렌더링할 때 한번만 실행
    const [value, setValue] = useState<T>(() => {
        const item = localStorage.getItem(key);
        // 값이 있으면 원래 타입으로 변경 -> JSON.parse()
        return item ? JSON.parse(item) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value]);

    return [value, setValue] as const;
}