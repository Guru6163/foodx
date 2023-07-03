import React, { useState, useEffect, useRef } from 'react';

const CustomDropdown = ({ options, label, selectedValue, onSelectedValueChange, filterSearch1, filterSearch2 }) => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Filter the options based on the searchValue
    setFilteredOptions(
      options.filter(
        (option) =>
          option[filterSearch1]?.toLowerCase().includes(searchValue.toLowerCase()) ||
          option[filterSearch2]?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [options, searchValue, filterSearch1, filterSearch2]);

  const handleOptionSelect = (option) => {
    setSearchValue(`${option[filterSearch1]} - ${option[filterSearch2]}`); // Set the selected value as the searchValue
    onSelectedValueChange(option); // Update the selected value
    setIsDropdownVisible(false); // Hide the dropdown after selecting an option
  };

  const handleOutsideClick = (event) => {
    // Close the dropdown when clicking outside of it
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <label htmlFor="dropdown" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsDropdownVisible(true)}
          className="border  px-3 py-2 bg-gray-100 w-full"
          placeholder="Search..."
        />
        {isDropdownVisible && filteredOptions.length > 0 && (
          <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {filteredOptions.map((option) => (
              <li
                key={option.id} // Make sure to use a unique key for each option
                onClick={() => handleOptionSelect(option)}
                className="cursor-pointer select-none relative px-4 py-2 text-sm text-gray-900"
              >
                <div className="flex flex-wrap  align-items-center gap-3">
                  <span className="font-bold">{option[filterSearch1]}</span>
                  <div>-</div>
                  <span className="font-bold text-900">{option[filterSearch2]}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
