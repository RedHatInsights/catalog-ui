import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import { IntlProvider } from 'react-intl';

import { TableToolbarView as TableToolbarViewOriginal } from '../../../presentational-components/shared/table-toolbar-view';
import { ListLoader } from '../../../presentational-components/shared/loader-placeholders';

describe('<TableToolbarView />', () => {
  let initialProps;

  const TableToolbarView = (props) => (
    <IntlProvider locale="en">
      <TableToolbarViewOriginal {...props} />
    </IntlProvider>
  );

  beforeEach(() => {
    initialProps = {
      createRows: () => [],
      rows: [],
      request: () => new Promise((resolve) => resolve([])),
      columns: [],
      fetchData: () => new Promise((resolve) => resolve([])),
      data: [],
      pagination: {
        limit: 50,
        offset: 0,
        count: 51
      }
    };
  });

  it('should display the table', async () => {
    let wrapper;
    const rows = [
      {
        id: 1,
        cells: ['name', 'description']
      }
    ];

    await act(async () => {
      wrapper = mount(
        <TableToolbarView
          {...initialProps}
          columns={[{ title: 'Name' }, 'Description']}
          rows={rows}
        />
      );
    });

    act(() => {
      wrapper.update();
    });
    expect(wrapper.find(Table)).toHaveLength(1);
    expect(wrapper.find(TableHeader)).toHaveLength(1);
    expect(wrapper.find(TableBody)).toHaveLength(1);
  });

  it('should display the empty state', async () => {
    let wrapper;
    const renderEmptyState = jest.fn();
    await act(async () => {
      wrapper = mount(
        <TableToolbarView
          {...initialProps}
          isLoading={false}
          renderEmptyState={renderEmptyState}
        />
      );
    });

    act(() => {
      wrapper.update();
    });

    expect(renderEmptyState).toHaveBeenCalled();
    expect(wrapper.find(Table)).toHaveLength(0);
    expect(wrapper.find(TableHeader)).toHaveLength(0);
    expect(wrapper.find(TableBody)).toHaveLength(0);
  });

  it('should mount correctly in loading state', async () => {
    let wrapper;

    await act(async () => {
      wrapper = mount(<TableToolbarView {...initialProps} isLoading={true} />);
    });
    expect(wrapper.find(Table)).toHaveLength(0);
    expect(wrapper.find(ListLoader)).toHaveLength(1);
  });

  it('should call filtering callback', async () => {
    const onFilterChange = jest.fn();
    let wrapper;

    await act(async () => {
      wrapper = mount(
        <TableToolbarView {...initialProps} onFilterChange={onFilterChange} />
      );
    });
    const input = wrapper.find('input').first();
    input.getDOMNode().value = 'foo';
    input.simulate('change');
    expect(onFilterChange).toHaveBeenCalledWith('foo');
  });

  it('should send async requests on pagination', async () => {
    const request = jest
      .fn()
      .mockImplementation(() => new Promise((resolve) => resolve([])));
    let wrapper;

    await act(async () => {
      wrapper = mount(
        <TableToolbarView {...initialProps} fetchData={request} />
      );
    });

    const paginationInput = wrapper.find('button').last();

    await act(async () => {
      paginationInput.simulate('click');
    });

    setTimeout(() => {
      expect(request).toHaveBeenCalledWith({
        count: 51,
        limit: 50,
        offset: 50
      });
    }, 251);
  });
});
