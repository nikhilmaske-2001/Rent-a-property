import React, { useState, useContext } from 'react';
import { RiWallet3Line, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { Menu } from '@headlessui/react';
import { HouseContext } from './HouseContext';

const PriceDropdown = () => {
    const { price, setPrice } = useContext(HouseContext);
    const [isOpen, setIsOpen] = useState(false);

    const prices = [
        {
            value: 'Price range (any)',
        },
        {
            value: '500 - 1000',
        },
        {
            value: '1000 - 1500',
        },
        {
            value: '1500 - 2000',
        },
        {
            value: '2000 - 2500',
        },
        {
            value: '2500 - 3000',
        },
    ]

    return (
        <Menu as='div' className='dropdown relative'>
            <Menu.Button
                onClick={() => setIsOpen(!isOpen)}
                className='dropdown-btn w-full text-left'
            >
                <RiWallet3Line className='dropdown-icon-primary' />
                <div>
                    <div className='text-[15px] font-medium leading-tight'>${price}</div>
                    <div className='text-[13px]'>Choose price range</div>
                </div>
                {isOpen ? (
                    <RiArrowUpSLine className='dropdown-icon-secondary' />
                ) : (
                    <RiArrowDownSLine className='dropdown-icon-secondary' />
                )}
            </Menu.Button>

            <Menu.Items className='dropdown-menu'>
                {prices.map((price, index) => {
                    return (
                        <Menu.Item
                            as='li'
                            onClick={() => setPrice(price.value)}
                            key={index}
                            className='cursor-pointer hover:text-violet-700 transition'
                        >
                            ${price.value}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    )
}

export default PriceDropdown;