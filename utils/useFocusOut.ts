import { RefObject, useEffect } from 'react';

/**
 * @description
 * Hook running a given method when clicking outside of one or multiple elements.
 *
 * @param refs
 * Refs of the wrappers, managed with `useRef` hook.
 * If multiple refs are given, the action will not be executed as long as the user clicks in one of the elements.
 *
 * @param method
 * Function to run when clicking outside of the component
 *
 * @example
 * const Component: FC = () => {
 *    const wrapperRef = useRef<HTMLDivElement>(null);
 *    const method = () => console.log("test");
 *    useFocusOut(wrapperRef, method);
 *
 *    return (<div ref={wrapperRef}>Inner content</div>)
 * }
 */
const useFocusOut = (refs: RefObject<HTMLElement>[], method: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!refs.some((ref) => ref.current?.contains(event.target as Node))) {
        method();
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, method]);
};

export default useFocusOut;
