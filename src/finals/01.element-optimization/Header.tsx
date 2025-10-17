import React from 'react'

function SearchBar() {
    return (
        <div className="flex items-cente bg-amber-300">
            <label className="mr-2 text-lg font-medium">Search</label>
            <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white"
            />
        </div>
    )
}

const Header = ({ theme, setTheme }: { theme: string, setTheme: (theme: string) => void }) => {
    return (
        <header className="p-4 bg-gray-200 dark:bg-gray-800 flex justify-between items-center" >
            <SearchBar />
            <select
                className="p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
            >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </header>
    )
}

export default Header