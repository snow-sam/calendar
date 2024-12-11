import { ReactNode, ButtonHTMLAttributes } from "react";

interface TitleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export const Title = ({ children, ...rest }: TitleProps) => {
    return <button className="w-fit" {...rest}>
        {children}
    </button>;
}