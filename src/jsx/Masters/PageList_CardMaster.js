import React,{ useEffect, useMemo, useState } from 'react';
import PageTitle from "../layouts/PageTitle";
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
import MOCK_DATA from '../components/table/FilteringTable/MOCK_DATA_2.json';
import { Row, Col, Button, FormControl, Table, Spinner } from "react-bootstrap";
import { GlobalFilter } from '../components/table/FilteringTable/GlobalFilter'; 
//import './table.css';
import '../components/table/FilteringTable/filtering.css';
import {ColumnFilter } from '../components/table/FilteringTable/ColumnFilter';
import {DateFilter } from '../components/table/FilteringTable/DateFilter';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_WEB_URLS } from '../../constants/constAPI';
import { Fn_FillListData } from '../../store/Functions';

export const PageList_CardMaster = () => {
	const [State, setState] = useState({
		id: 0,
		FillArray: [],
		formData: {},
		OtherDataScore: [],
		isProgress: true,
	  })
	const [gridData, setGridData] = useState([]);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const API_URL = API_WEB_URLS.MASTER + "/0/token/MainMaster";
	const rtPage_Add = "/AddCard";
	const rtPage_Edit = "/AddCard";
	const rtPage_Job = "/jobcardform";


	
	useEffect(() => {
		const fetchData = async () => {
		  setLoading(true);
		   Fn_FillListData(dispatch, setGridData, "gridData", API_URL + "/Id/0");
		  setLoading(false);
		};
	
		fetchData();
	  }, [dispatch, API_URL]);
	
	  const btnAddOnClick = () => {
		
		 navigate(rtPage_Add, { state: { Id: 0 } });
	  };
	
	  const btnEditOnClick = (Id) => {
		navigate(rtPage_Edit, { state: { Id } });
	  };
	
	  const btnCreateJobCard = (Id) => {
        navigate(rtPage_Job, { state: { Id } });
       console.log('created',Id)
	  };
	
	const COLUMNS = [
		{
			Header : 'Id',
			Footer : 'Id',
			accessor: 'Id',
			Filter: ColumnFilter,
			//disableFilters: true,
		},
		{
			Header : 'CategoryName',
			Footer : 'CategoryName',
			accessor: 'CategoryName',
			Filter: ColumnFilter,
		},
		{
			Header : 'ComponentName',
			Footer : 'ComponentName',
			accessor: 'ComponentName',
			Filter: ColumnFilter,
		},
		{
			Header : 'JobCardNo',
			Footer : 'JobCardNo',
			accessor: 'JobCardNo',
			Filter: ColumnFilter,
		},
		{
			Header : 'L1',
			Footer : 'L1',
			accessor: 'L1',
			Filter: ColumnFilter,
		},
		{
			Header : 'W1',
			Footer : 'W1',
			accessor: 'W1',
			Filter: ColumnFilter,
		},
		{
			Header : 'T1',
			Footer : 'T1',
			accessor: 'T1',
			Filter: ColumnFilter,
		},
		{
			Header : 'Qty1',
			Footer : 'Qty1',
			accessor: 'Qty1',
			Filter: ColumnFilter,
		},
		{
			Header : 'L2',
			Footer : 'L2',
			accessor: 'L2',
			Filter: ColumnFilter,
		},
		{
			Header : 'W2',
			Footer : 'W2',
			accessor: 'W2',
			Filter: ColumnFilter,
		},
		{
			Header : 'T2',
			Footer : 'T2',
			accessor: 'T2',
			Filter: ColumnFilter,
		},
		{
			Header : 'Qty2',
			Footer : 'Qty2',
			accessor: 'Qty2',
			Filter: ColumnFilter,
		},

		  {
			Header: "Edit",
			Cell: ({ row }) => (
			  <Button
				variant="warning"
				size="sm"
				onClick={() => btnEditOnClick(row.original.Id)}
			  >
				Edit
			  </Button>
			),
		  }, 
		  {
			Header: "Create",
			Cell: ({ row }) => (
			  row.original.JobCardNo === null ? (
				<Button
				  variant="warning"
				  size="sm"
				  onClick={() => btnCreateJobCard(row.original.Id)}
				>
				  Create Job Card
				</Button>
			  ) : null
			),
		  }, 

	]
	const columns = useMemo( () => COLUMNS, [] )
	const data = useMemo( () => gridData, [gridData] )
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
			
			<Row className="mb-2">
        <Col md="8">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </Col>
        <Col md="4">
          <Button
            type="button"
            onClick={btnAddOnClick}
            variant="success"
            className="mb-2"
          >
            Add New
          </Button>
        </Col>
      </Row>
			<div className="card">
				
				<div className="card-header">
					<h4 className="card-title">Table Filtering</h4>
                </div>
				<div className="card-body">
					<div className="table-responsive">
						
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
export default PageList_CardMaster;