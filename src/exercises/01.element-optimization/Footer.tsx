import React from 'react'

function DisplayTheme({ theme }: { theme: string }) {
    return (
        <div className={theme === 'light' ? 'text-black bg-green-500' : 'text-white bg-black'}>
            Current Theme: <span className={theme === 'light' ? 'text-black' : 'text-white'}>{theme}</span>
        </div>
    )
}
const Footer = ({ theme }: { theme: string }) => {
    const [footerCounter, setFooterCounter] = React.useState(0);
    return (
        <footer className="p-4 bg-gray-200 dark:bg-gray-800 flex justify-between items-center">
            <div>
                <button
                    onClick={() => setFooterCounter(footerCounter + 1)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Increment Footer Counter: {footerCounter}
                </button>
            </div>
            <DisplayTheme theme={theme} />
        </footer>
    )
}

export default Footer