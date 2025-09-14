export type buyers = {
    id: string,
    fullName: string,
    email?: string,
    phone: string,
    city: "Chandigarh" | "Mohali" | "Zirakpur" | "Panchkula" | "Other",
    propertyType: "Apartment" | "Villa" | "Plot" | "Office" | "Retail",
    bhk?: "1" | "2" | "3" | "4" | "Studio",
    purpose: "buy" | "rent",
    budgetMax?: number,
    budgetMin?: number,
    timeline?: string,
    source: "Website" | "Referral" | "Walk-in" | "Call" | "Other",
    status: "New" | "Qualified" | "Contacted" | "Visited" | "Negotiation" | "Converted" | "Dropped",
    notes?: string,
    tags?: string[],
    ownerId: string,
    updatedAt: string
}