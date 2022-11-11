import React from 'react'
import PropertyTypeDropdown from './PropertyTypeDropdown';
import LocationDropdown from './LocationDropdown';
import PriceDropdown from './PriceDropdown';

const Search = () => {
    return (
        <div className='py-10'>
            <div className='px-[100px] py-4 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop-blur rounded-lg'>
                <span className='font-semibold text-2xl'>Search properties to rent</span>
                <div class="flex justify-center">
                    <div class="mb-3 xl:w-96">
                        <div class="input-group relative flex flex-wrap items-stretch w-full mb-4">
                            <input type="search" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search with search bar" aria-label="Search" aria-describedby="button-addon2" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-[100px] py-6 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop-blur rounded-lg'>
                <LocationDropdown />
                <PropertyTypeDropdown />
                <PriceDropdown />
                <button
                    className='bg-violet-700 hover:bg-violet-800 transition w-full lg:max-w-[162px] h-10 rounded-lg flex justify-center items-center text-white text-lg'
                >
                    Search
                </button>
            </div>
        </div>

    )
}

export default Search