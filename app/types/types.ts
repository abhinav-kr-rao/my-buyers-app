export type buyers = {
    id: string,
    fullName: string,
    email?: string,
    phone: string,
    city: "Chandigarh" | "Mohali" | "Zirakpur" | "Panchkula" | "Other" | string,
    propertyType: "Apartment" | "Villa" | "Plot" | "Office" | "Retail" | string,
    bhk?: "1" | "2" | "3" | "4" | "Studio" | string,
    purpose: "buy" | "rent" | string,
    budgetMax?: number,
    budgetMin?: number,
    timeline?: string,
    source: "Website" | "Referral" | "Walk-in" | "Call" | "Other" | string,
    status: "New" | "Qualified" | "Contacted" | "Visited" | "Negotiation" | "Converted" | "Dropped" | string,
    notes?: string,
    tags?: string[],
    ownerId: string,
    updatedAt: string
}