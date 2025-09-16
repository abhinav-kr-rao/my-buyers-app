'use client'
import { buyers } from "@/app/types/types";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const BuyerForm: React.FC = () => {
    const [formData, setFormData] = useState<Partial<buyers>>({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        propertyType: "",
        purpose: "",
        source: "",
        status: "",
        bhk: "",
        budgetMax: undefined,
        budgetMin: undefined,
        timeline: "",
        notes: "",
        tags: [],
    });

    const userId = "logged-in-user-id"; // Replace with actual logged-in user ID
    const updatedAt = new Date().toISOString();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tags = e.target.value.split(",").map((tag) => tag.trim());
        setFormData((prev) => ({ ...prev, tags }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        const requiredFields: (keyof buyers)[] = ["fullName", "phone", "city", "propertyType", "purpose", "source", "status"];
        for (const field of requiredFields) {
            if (!formData[field]) {
                alert(`Please fill out the required field: ${field}`);
                return;
            }
        }

        const buyerData: buyers = {
            id: uuidv4(),
            ...formData,
            ownerId: userId,
            updatedAt,
        } as buyers;

        console.log("Form submitted:", buyerData);
        // Add your form submission logic here (e.g., API call)
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl text-black font-bold text-center mb-6">Buyer Intake Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName || ""}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        className=" text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        placeholder="Enter email"
                        className=" text-black  mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone || ""}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className=" text-black  mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">City:</label>
                    <select
                        name="city"
                        value={formData.city || ""}
                        onChange={handleChange}
                        className=" text-black  mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="">Select City</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Mohali">Mohali</option>
                        <option value="Zirakpur">Zirakpur</option>
                        <option value="Panchkula">Panchkula</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Property Type:</label>
                    <select
                        name="propertyType"
                        value={formData.propertyType || ""}
                        onChange={handleChange}
                        className=" text-black  mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="">Select Property Type</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="Plot">Plot</option>
                        <option value="Office">Office</option>
                        <option value="Retail">Retail</option>
                    </select>
                </div>
                <div>
                    <label className=" block text-sm font-medium text-gray-700">Purpose:</label>
                    <select
                        name="purpose"
                        value={formData.purpose || ""}
                        onChange={handleChange}
                        className=" text-black  mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="">Select Purpose</option>
                        <option value="buy">Buy</option>
                        <option value="rent">Rent</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">BHK:</label>
                    <select
                        name="bhk"
                        value={formData.bhk || ""}
                        onChange={handleChange}
                        className="  text-black  mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select BHK</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="Studio">Studio</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status:</label>
                    <select
                        name="status"
                        value={formData.status || ""}
                        onChange={handleChange}
                        className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="New">New</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Visited">Visited</option>
                        <option value="Negotiation">Negotiation</option>
                        <option value="Converted">Converted</option>
                        <option value="Dropped">Dropped</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Source:</label>
                    <select
                        name="source"
                        value={formData.source || ""}
                        onChange={handleChange}
                        className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="">Select Source</option>
                        <option value="Website">Website</option>
                        <option value="Referral">Referral</option>
                        <option value="Walk-in">Walk-in</option>
                        <option value="Call">Call</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Budget Min:</label>
                    <input
                        type="number"
                        name="budgetMin"
                        value={formData.budgetMin || ""}
                        onChange={handleChange}
                        placeholder="Enter minimum budget"
                        className=" text-black  mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Budget Max:</label>
                    <input
                        type="number"
                        name="budgetMax"
                        value={formData.budgetMax || ""}
                        placeholder="Enter maximum budget"
                        onChange={handleChange}
                        className=" text-black  mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Timeline:</label>
                    <select
                        name="timeline"
                        value={formData.timeline || ""}
                        onChange={handleChange}
                        className=" text-black  mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select Timeline</option>
                        <option value="0 - 3 months">0 - 3 months</option>
                        <option value="3 - 6 months">3 - 6 months</option>
                        <option value="more than 6 months">More than 6 months</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tags (comma-separated):</label>
                    <input
                        type="text"
                        name="tags"
                        placeholder="Enter tags"
                        value={(formData.tags || []).join(",")}
                        onChange={handleTagsChange}
                        className=" text-black  mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Notes:</label>
                    <textarea
                        name="notes"
                        value={formData.notes || ""}
                        onChange={handleChange}
                        className=" text-black  mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Add Buyer
                </button>
            </form>
        </div>
    );
};

export default BuyerForm;