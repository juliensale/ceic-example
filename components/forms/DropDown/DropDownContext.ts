import { createContext } from "react";

export type DropDownContext = {
	setOpen: (open: boolean) => void;
	open: boolean;
	setValue: (value: string) => void;
	value: string;
}

const dropDownContext = createContext<DropDownContext>({
	setOpen: () => { },
	open: false,
	setValue: () => { },
	value: '',
})

export default dropDownContext;