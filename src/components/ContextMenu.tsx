import { useEffect, useRef } from "react";

interface CustomContextMenuProps {
    position: { x: number; y: number };
    // Add any other props needed
  }

const ContextMenu = (props: any) => {
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const menuElement = menuRef.current;
    
        if (!menuElement) {
          return;
        }
    
        const { clientWidth, clientHeight } = menuElement;
        const { innerWidth, innerHeight } = window;
        
        // Adjust left position if the menu goes beyond the right edge
        if (props.position.x + clientWidth > innerWidth) {
          menuElement.style.left = `${innerWidth - clientWidth}px`;
        } else {
          menuElement.style.left = `${props.position.x}px`;
        }
    
        // Adjust top position if the menu goes beyond the bottom edge
        if (props.position.y + clientHeight > innerHeight) {
          menuElement.style.top = `${innerHeight - clientHeight}px`;
        } else {
          menuElement.style.top = `${props.position.y}px`;
        }
      }, [props.position]);
    return (
        <div ref={menuRef} id="dropdown" className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"  style={{top: props.position.y, left: props.position.x}}>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          <li>
            <a href="#"  onClick={props.onMessage} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
          </li>
        </ul>
    </div>
    )
}

export default ContextMenu