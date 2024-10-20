/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import ReactSelect from 'react-select';

const Select = ({
  label,
  value,
  onChange,
  options,
  disabled,
}: {
  label: string;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled?: boolean;
}) => {
  return (
    <div className='z-[100]'>
      <label className='block text-sm font-medium leading-6 text-gray-900'>
        {label}
      </label>
      <div className='mt-2'>
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          classNames={{ control: () => 'text-sm' }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 8,
            colors: {
              ...theme.colors,
              primary25: '#f3f4f6',
              primary: '#fbbf24',
            },
          })}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 999 }) }}
        />
      </div>
    </div>
  );
};

export default Select;
