import React from 'react';
import Select from 'react-select';
import { ClearIndicator } from './styles';
import { priorityOptions } from './constants';

const FilterTodo = ({ handleSortPriority, handleFilterPriority }) => (
  <>
    <div className="flex mb-4 items-center">
      <Select
        options={[
          { value: 'low', label: 'Low to High' },
          { value: 'high', label: 'High to Low' },
        ]}
        onChange={handleSortPriority}
        isClearable={true}
        className="w-50 mr-2"
        placeholder="Sort by priority"
        components={{ ClearIndicator }}
      />

      <Select
        options={priorityOptions}
        onChange={handleFilterPriority}
        isMulti={true}
        isClearable={true}
        className="w-50 mr-2"
        placeholder="Filter By Priority"
        components={{ ClearIndicator }}
      />
    </div>
  </>
);

export default React.memo(FilterTodo);
