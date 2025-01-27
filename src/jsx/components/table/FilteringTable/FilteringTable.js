import React,{ useMemo } from 'react';
import PageTitle from "../../../layouts/PageTitle";
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA_2.json';

import { GlobalFilter } from './GlobalFilter'; 
//import './table.css';
import './filtering.css';
import {ColumnFilter } from './ColumnFilter';
import {DateFilter } from './DateFilter';

export const FilteringTable = () => {
	const COLUMNS = [
		{
			Header : 'Id',
			Footer : 'Id',
			accessor: 'id',
			Filter: ColumnFilter,
			//disableFilters: true,
		},
		{
			Header : 'First Name',
			Footer : 'First Name',
			accessor: 'first_name',
			Filter: ColumnFilter,
		},
		{
			Header : 'Last Name',
			Footer : 'Last Name',
			accessor: 'last_name',
			Filter: ColumnFilter,
		},
		{
			Header : 'Email Id',
			Footer : 'Email Id',
			accessor: 'email',
			Filter: ColumnFilter,
		},
		{
			Header: 'Date of Birth',
			Footer: 'Date of Birth',
			accessor: 'date_of_birth',
			Cell: ({ value }) => {
			  const date = new Date(value);
			  return date.toLocaleDateString('en-GB'); // Converts to dd/mm/yyyy format
			},
			Filter: DateFilter,
			filter: (rows, id, filterValue) => {
			  const [startDate, endDate] = filterValue;
			  return rows.filter(row => {
				const rowDate = new Date(row.values[id]);
				return (
				  (!startDate || rowDate >= new Date(startDate)) &&
				  (!endDate || rowDate <= new Date(endDate))
				);
			  });
			},
		  },
	
		  
		{
			Header : 'Country',
			Footer : 'Country',
			accessor: 'country',
			Filter: ColumnFilter,
		},
		{
			Header : 'Phone',
			Footer : 'Phone',
			accessor: 'phone',
			Filter: ColumnFilter,
		},
	]
	const columns = useMemo( () => COLUMNS, [] )
	const data = useMemo( () => MOCK_DATA, [] )
	const tableInstance = useTable({
		columns,
		data,	
		initialState : {pageIndex : 0}
	}, useFilters, useGlobalFilter, usePagination)
	
	const { 
		getTableProps, 
		getTableBodyProps, 
		headerGroups, 
		prepareRow,
		state,
		page,
		gotoPage,
		pageCount,
		pageOptions,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		setGlobalFilter,
	} = tableInstance
	
	
	const {globalFilter, pageIndex} = state
	
	
	return(
		<>
			<PageTitle activeMenu="Filtering" motherMenu="Table" />
			<div className="card">
				<div className="card-header">
					<h4 className="card-title">Table Filtering</h4>
                </div>
				<div className="card-body">
					<div className="table-responsive">
						<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
						<table {...getTableProps()} className="table dataTable display">
							<thead>
							   {headerGroups.map(headerGroup => (
									<tr {...headerGroup.getHeaderGroupProps()}>
										{headerGroup.headers.map(column => (
											<th {...column.getHeaderProps()}>
												{column.render('Header')}
												{column.canFilter ? column.render('Filter') : null}
											</th>
										))}
									</tr>
							   ))}
							</thead> 
							<tbody {...getTableBodyProps()} className="" >
							
								{page.map((row) => {
									prepareRow(row)
									return(
										<tr {...row.getRowProps()}>
											{row.cells.map((cell) => {
												return <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
											})}
										</tr>
									)
								})}
							</tbody>
						</table>
						<div className="d-flex justify-content-between">
							<span>
								Page{' '}
								<strong>
									{pageIndex + 1} of {pageOptions.length}
								</strong>{''}
							</span>
							<span className="table-index">
								Go to page : {' '}
								<input type="number" 
									className="ml-2"
									defaultValue={pageIndex + 1} 
									onChange = {e => { 
										const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0 
										gotoPage(pageNumber)
									} } 
								/>
							</span>
						</div>
						<div className="text-center">	
							<div className="filter-pagination  mt-3">
								<button className=" previous-button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
								
								<button className="previous-button" onClick={() => previousPage()} disabled={!canPreviousPage}>
									Previous
								</button>
								<button className="next-button" onClick={() => nextPage()} disabled={!canNextPage}>
									Next
								</button>
								<button className=" next-button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
	
}
export default FilteringTable;