import { createContext } from "react";

export type DropDownContext = {
	setOpen: (open: boolean) => void;
	open: boolean;
	value: string;
}

const dropDownContext = createContext<DropDownContext>({
	setOpen: () => { },
	open: false,
	value: '',
})

export default dropDownContext;