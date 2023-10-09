import { createContext } from "react";

export type DropDownContext = {
	setOpen: (open: boolean) => void;
	open: boolean;
	type: 'select' | 'checkbox';
	setValue: ((value: string[]) => void) | ((value: string) => void);
	value: string[] | string;
}

const dropDownContext = createContext<DropDownContext>({
	setOpen: () => { },
	open: false,
	type: 'select',
	setValue: () => { },
	value: '',
})

export default dropDownContext;