'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { debounce } from "lodash";

type Buyer = {
    id: string;
    fullName: string;
    phone: string;
    email?: string;
    city: string;
    propertyType: string;
    budgetMin?: number;
    budgetMax?: number;
    timeline?: string;
    status: string;
    updatedAt: string;
};

type BuyersListProps = {
    buyers: Buyer[];
    total: number;
    page: number;
    pageSize: number;
};

const BuyersList = ({ buyers, total, page, pageSize }: BuyersListProps) => {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        city: "",
        propertyType: "",
        status: "",
        timeline: "",
    });

    const handleSearchChange = debounce((value: string) => {
        setSearch(value);
        router.push({
            pathname: "/buyers/list",
            query: { ...router.query, search: value, page: 1 },
        });
    }, 300);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
        router.push({
            pathname: "/buyers/list",
            query: { ...router.query, [name]: value, page: 1 },
        });
    };

    const handlePageChange = (newPage: number) => {
        router.push({
            pathname: "/buyers/list",
            query: { ...router.query, page: newPage },
        });
    };

    const handleSort = (field: string) => {
        const currentSort = router.query.sort || "updatedAt";
        const currentOrder = router.query.order || "desc";
        const newOrder = currentSort === field && currentOrder === "desc" ? "asc" : "desc";

        router.push({
            pathname: "/buyers/list",
            query: { ...router.query, sort: field, order: newOrder },
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Buyers List</h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by Name, Phone, or Email"
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => handleSearchChange(e.target.value)}
                />
                <select
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">All Cities</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Mohali">Mohali</option>
                    <option value="Zirakpur">Zirakpur</option>
                    <option value="Panchkula">Panchkula</option>
                    <option value="Other">Other</option>
                </select>
                <select
                    name="propertyType"
                    value={filters.propertyType}
                    onChange={handleFilterChange}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">All Property Types</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Plot">Plot</option>
                    <option value="Office">Office</option>
                    <option value="Retail">Retail</option>
                </select>
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Visited">Visited</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Converted">Converted</option>
                    <option value="Dropped">Dropped</option>
                </select>
                <select
                    name="timeline"
                    value={filters.timeline}
                    onChange={handleFilterChange}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">All Timelines</option>
                    <option value="0 - 3 months">0 - 3 months</option>
                    <option value="3 - 6 months">3 - 6 months</option>
                    <option value="more than 6 months">More than 6 months</option>
                </select>
            </div>

            {/* Table */}
            <table className="w-full bg-white rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-200">
                        <th
                            className="p-2 cursor-pointer"
                            onClick={() => handleSort("fullName")}
                        >
                            Name
                        </th>
                        <th className="p-2">Phone</th>
                        <th className="p-2">City</th>
                        <th className="p-2">Property Type</th>
                        <th className="p-2">Budget</th>
                        <th className="p-2">Timeline</th>
                        <th
                            className="p-2 cursor-pointer"
                            onClick={() => handleSort("status")}
                        >
                            Status
                        </th>
                        <th
                            className="p-2 cursor-pointer"
                            onClick={() => handleSort("updatedAt")}
                        >
                            Updated At
                        </th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {buyers.map((buyer) => (
                        <tr key={buyer.id} className="border-t">
                            <td className="p-2">{buyer.fullName}</td>
                            <td className="p-2">{buyer.phone}</td>
                            <td className="p-2">{buyer.city}</td>
                            <td className="p-2">{buyer.propertyType}</td>
                            <td className="p-2">
                                {buyer.budgetMin} – {buyer.budgetMax}
                            </td>
                            <td className="p-2">{buyer.timeline}</td>
                            <td className="p-2">{buyer.status}</td>
                            <td className="p-2">{new Date(buyer.updatedAt).toLocaleString()}</td>
                            <td className="p-2">
                                <button
                                    className="text-blue-500 hover:underline"
                                    onClick={() => router.push(`/buyers/view/${buyer.id}`)}
                                >
                                    View
                                </button>{" "}
                                |{" "}
                                <button
                                    className="text-blue-500 hover:underline"
                                    onClick={() => router.push(`/buyers/edit/${buyer.id}`)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    className="p-2 bg-gray-300 rounded-md"
                    disabled={page <= 1}
                    onClick={() => handlePageChange(page - 1)}
                >
                    Previous
                </button>
                <span>
                    Page {page} of {Math.ceil(total / pageSize)}
                </span>
                <button
                    className="p-2 bg-gray-300 rounded-md"
                    disabled={page >= Math.ceil(total / pageSize)}
                    onClick={() => handlePageChange(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BuyersList;