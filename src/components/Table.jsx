import React, {useState} from 'react'
import {useEffect} from "react";

import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination } from 'react-table'
import { ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid'
import { PageButton } from '../shared/Button'
import { SortIcon, SortUpIcon, SortDownIcon } from '../shared/Icons'
import Spinner from "../shared/Spinner";
import {nFormatter, truncate} from "../shared/Utils";

function Table({ columns, data, list, setList }) {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,

        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize

    } = useTable({
            columns,
            data,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
    )
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(false)
        setPageSize(20)
    }, [setPageSize])

    const handleCheckbox = (e) => {
        if(e.target.checked){
            let copy = [...list];
            copy = [...copy, e.target.value];
            setList(copy);
        }
        else{
            let filtered = list.filter(list => {
                return list !== e.target.value;
            });
            setList(filtered);
        }
    }

    if(!loading) {
        return (
            <>
                <div className="mt-4 flex flex-col">
                    <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-500">
                                    {headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map(column => (
                                                <th
                                                    scope="col"
                                                    className="group px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        {column.render('Header')}
                                                        {/* Add a sort direction indicator */}
                                                        <span>
                                                            { column.isSorted ? column.isSortedDesc
                                                                ? <SortDownIcon className="w-4 h-4 text-gray-400" />
                                                                : <SortUpIcon className="w-4 h-4 text-gray-400" />
                                                                : (
                                                                    <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                                                                )
                                                            }
                                                        </span>
                                                    </div>
                                                </th>
                                            ))}
                                            <th/>
                                        </tr>
                                    ))}
                                    </thead>
                                    <tbody
                                        {...getTableBodyProps()}
                                        className="bg-gray-700 divide-y divide-gray-200"
                                    >
                                    {page.map((row, i) => {  // new
                                        prepareRow(row)
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {
                                                    <>
                                                        <td className="px-4 py-2 whitespace-nowrap" role="cell">
                                                            <div className="flex items-center">
                                                                <div className="text-sm font-medium text-gray-200">
                                                                    {truncate(row.cells[0].value)}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap" role="cell">
                                                            <div className="text-sm text-gray-400">{nFormatter(row.cells[1].value, 1)}</div>
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap" role="cell">
                                                            <p className={`w-full w-1/5 text-sm ${row.cells[2].value ? ("text-success") : ("text-error")}`}>{row.cells[2].value ? ("On-chain") : ("Off-chain")}</p>
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap" role="cell">
                                                            <div className="flex justify-center">
                                                                <input type="checkbox"
                                                                       onChange={handleCheckbox}
                                                                       value={row.cells[0].value}
                                                                       className="checkbox"
                                                                />
                                                            </div>
                                                        </td>
                                                    </>
                                                }
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Pagination */}
                <div className="flex items-center my-4">
                    <div className="mx-auto">
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <PageButton
                                className="rounded-l-md"
                                onClick={() => gotoPage(0)}
                                disabled={!canPreviousPage}
                            >
                                <span className="sr-only">First</span>
                                <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </PageButton>
                            <PageButton
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </PageButton>
                            <PageButton
                                onClick={() => nextPage()}
                                disabled={!canNextPage
                                }>
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </PageButton>
                            <PageButton
                                className="rounded-r-md"
                                onClick={() => gotoPage(pageCount - 1)}
                                disabled={!canNextPage}
                            >
                                <span className="sr-only">Last</span>
                                <ChevronDoubleRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </PageButton>
                        </nav>
                    </div>
                </div>
            </>
        )
    }
    else{
        return (
            <div className="mt-8">
                <div className="flex justify-center">
                    <Spinner/>
                </div>
            </div>
        )
    }
}

export default Table;