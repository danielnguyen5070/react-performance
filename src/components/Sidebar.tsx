import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Settings, User, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useState } from 'react';

// Array of menu items
const menuItems = [
    {
        label: 'Managing UI State',
        submenu: [
            { label: '01. useState', path: '/managing-ui-state/usestate' },
            { label: '02. Controlling Inputs', path: '/managing-ui-state/controlling-input' },
            { label: '03. Derive State', path: '/managing-ui-state/derive-state' },
            { label: '04. Initialize State', path: '/managing-ui-state/initialize-state' },
            { label: '05. Init Callback', path: '/managing-ui-state/init-callback' },
        ],
    },
    {
        label: 'Side-Effects',
        submenu: [
            { label: '01. useEffect', path: '/effect/use-effect' },
            { label: '02. Effect Cleanup', path: '/effect/effect-clean-up' },
        ],
    },
    {
        label: 'Lifting State',
        submenu: [
            { label: '01. Lift State', path: '/lifting-state/lift-state' },
            { label: '02. Lift More State', path: '/lifting-state/more-state' },
            { label: '03. Colocate State', path: '/lifting-state/colocate-state' },
        ],
    },
    {
        label: 'DOM Side-Effects',
        submenu: [
            { label: '01. Refs', path: '/dom-effect/refs' },
            { label: '02. Dependencies', path: '/dom-effect/dependencies' },
            { label: '03. Primitive Dependencies', path: '/dom-effect/primitive-dependency' },
        ],
    },
    {
        label: 'Unique IDs',
        submenu: [
            { label: '01. useId', path: '/unique-ids/use-id' },
        ]
    },
    {
        label: 'Tic Tac Toe',
        submenu: [
            { label: '01. setState callback', path: '/tictactos/setstate' },
            { label: '02. Preserve State in localStorage', path: '/tictactos/preserve-state' },
            { label: '03. Add Game History Feature', path: '/tictactos/history' },
        ],
    },
];

const Sidebar = () => {
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    const toggleSubmenu = (name: string) => {
        setOpenSubmenu((prev) => (prev === name ? null : name));
    };

    return (
        <>

            <div
                className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white z-40 transform transition-transform duration-300 ease-in-out`}
            >
                {/* Main nav */}
                <nav className="p-4 space-y-2">
                    {menuItems.map((menu, index) => (
                        <div key={index}>
                            <button
                                onClick={() => toggleSubmenu(menu.label)}
                                className={`flex my-1 items-center justify-between w-full p-2 rounded-r transition-all duration-300 ease-in-out ${openSubmenu === menu.label ? 'border-l-4 border-blue-500 bg-gray-800' : 'border-l-2 border-transparent hover:border-l-4 hover:border-blue-500 hover:bg-gray-800'
                                    }`}
                            >
                                <span className="flex items-center space-x-3">
                                    <span>{menu.label}</span>
                                </span>
                                {openSubmenu === menu.label ? <ChevronUp /> : <ChevronDown />}
                            </button>
                            <div
                                className={`pl-6 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${openSubmenu === menu.label ? '' : 'max-h-0'
                                    }`}
                            >
                                {menu.submenu.map((item, subIndex) => (
                                    <NavLink
                                        key={subIndex}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `block p-2 my-1 pl-4 rounded-r border-l-4 transition-all duration-300 ease-in-out ${isActive
                                                ? 'border-blue-500 bg-gray-800 text-blue-200'
                                                : 'border-transparent hover:bg-gray-800 hover:border-blue-500'
                                            }`
                                        }
                                        end // Ensures exact matching for active state
                                    >
                                        {item.label}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
