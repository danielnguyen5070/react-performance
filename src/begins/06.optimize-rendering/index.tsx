import { useState, use, useTransition, Suspense } from 'react'
import { searchCities } from './cities/index'
import './index.css'
import { useCombobox, useForceRerender } from './utils'
import { useSpinDelay } from 'spin-delay'

export default function App() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading cities...</div>}>
            <CityDisplay />
        </Suspense>
    )
}

const searchCitiesPromiseDefault = searchCities('')
function CityDisplay() {
    const forceRerender = useForceRerender()
    const [inputValue, setInputValue] = useState('')
    const [startTransition, setStartTransition] = useTransition()
    const [searchCitiesPromise, setSearchCitiesPromise] = useState(
        searchCitiesPromiseDefault,
    )
    const isPending = useSpinDelay(startTransition)
    const cities = use(searchCitiesPromise)

    const {
        selectedItem: selectedCity,
        highlightedIndex,
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        selectItem,
    } = useCombobox({
        items: cities,
        inputValue,
        onInputValueChange: ({ inputValue: newValue = '' }) => {
            setInputValue(newValue)
            setStartTransition(() => {
                setSearchCitiesPromise(searchCities(newValue))
            })
        },
        onSelectedItemChange: ({ selectedItem: selectedCity }) =>
            alert(
                selectedCity
                    ? `You selected ${selectedCity.name}`
                    : 'Selection Cleared',
            ),
        itemToString: (city) => (city ? city.name : ''),
    })

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300 p-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-slate-800">City Search</h1>
                    <button
                        onClick={forceRerender}
                        className="text-sm text-slate-500 hover:text-slate-700 transition rounded bg-slate-100 px-2 py-1"
                    >
                        Force rerender
                    </button>
                </div>

                <div>
                    <label
                        {...getLabelProps()}
                        className="block text-sm font-medium text-slate-600 mb-1"
                    >
                        Find a city
                    </label>
                    <div className="relative flex items-center">
                        <input
                            {...getInputProps({ type: 'text' })}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                            placeholder="Type to search..."
                        />
                        <button
                            onClick={() => selectItem(null)}
                            aria-label="clear selection"
                            className="absolute right-2 text-slate-400 hover:text-slate-600"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                <ul
                    {...getMenuProps({
                        style: { opacity: isPending ? 0.5 : 1 },
                    })}
                    className="max-h-100 overflow-y-auto mt-2 border border-slate-200 rounded-lg divide-y divide-slate-100 shadow-sm bg-white"
                >
                    {cities.map((city, index) => {
                        const isSelected = selectedCity?.id === city.id
                        const isHighlighted = highlightedIndex === index
                        return (
                            <li
                                key={city.id}
                                {...getItemProps({
                                    index,
                                    item: city,
                                    className: `px-3 py-2 cursor-pointer transition ${isHighlighted ? 'bg-blue-100' : ''}${isSelected ? 'font-semibold text-blue-600' : 'text-slate-700'} hover:bg-blue-50`,
                                })}
                            >
                                {city.name}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
