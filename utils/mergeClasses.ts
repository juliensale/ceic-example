const mergeClasses = (...classes: (string | undefined)[]): string => {
	return classes.filter(c => !!c).join(' ');
}

export default mergeClasses;