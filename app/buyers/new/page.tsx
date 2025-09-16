<<<<<<< HEAD
import BuyerForm from '@/app/components/BuyerForm';

export default function NewBuyerPage() {

    return (
        <BuyerForm />
    );
=======
'use client';

import { useState } from 'react';
import { buyers } from '@/app/types/types';
import { v4 as uuidv4 } from 'uuid';

// Form interface based on buyers type
interface BuyerFormData extends Omit<buyers, 'id' | 'ownerId' | 'updatedAt' | 'budgetMin' | 'budgetMax'> {
  budgetMin: string;
  budgetMax: string;
}

export default function NewBuyerPage() {
  const [formData, setFormData] = useState<BuyerFormData>({
    fullName: '',
    email: '',
    phone: '',
    city: 'Chandigarh',
    propertyType: 'Apartment',
    bhk: undefined,
    purpose: 'buy',
    budgetMin: '',
    budgetMax: '',
    timeline: '',
    source: 'Website',
    status: 'New',
    notes: '',
    tags: [],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BuyerFormData, string>>>({});
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define required fields based on buyers type
  const requiredFields: (keyof BuyerFormData)[] = ['fullName', 'phone', 'city', 'propertyType', 'purpose', 'source', 'status'];

  const validateForm = () => {
    const newErrors: Partial<Record<keyof BuyerFormData, string>> = {};

    // Check required fields
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field} is required`;
      }
    });

    // Additional validations
    if (formData.fullName && formData.fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    const phoneRegex = /^\d{10,15}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10-15 digits';
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // BHK validation for residential properties
    if (['Apartment', 'Villa'].includes(formData.propertyType) && !formData.bhk) {
      newErrors.bhk = 'BHK is required for Apartment/Villa';
    }

    // Budget validation
    if (formData.budgetMin && formData.budgetMax) {
      if (Number(formData.budgetMax) < Number(formData.budgetMin)) {
        newErrors.budgetMax = 'Maximum budget must be greater than minimum budget';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof BuyerFormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      const updatedTags = formData.tags ? [...formData.tags, newTag.trim()] : [newTag.trim()];
      setFormData(prev => ({
        ...prev,
        tags: updatedTags
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Convert form data to buyers type
      const buyerData: Omit<buyers, 'id' | 'ownerId' | 'updatedAt'> = {
        fullName: formData.fullName,
        email: formData.email || undefined,
        phone: formData.phone,
        city: formData.city,
        propertyType: formData.propertyType,
        bhk: formData.bhk || undefined,
        purpose: formData.purpose,
        budgetMin: formData.budgetMin ? Number(formData.budgetMin) : undefined,
        budgetMax: formData.budgetMax ? Number(formData.budgetMax) : undefined,
        timeline: formData.timeline || undefined,
        source: formData.source,
        status: formData.status,
        notes: formData.notes || undefined,
        tags: formData.tags && formData.tags.length > 0 ? formData.tags : undefined,
      };

      console.log('Form ID:', uuidv4());
      console.log('Buyer Data:', buyerData);
      
      // TODO: Complete submission logic
      // 1. Get current user: const { data: { user } } = await supabase.auth.getUser();
      // 2. Add required fields: id, ownerId, updatedAt
      // 3. Insert to database
      // 4. Handle success/error

    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Add New Buyer</h1>
            <p className="text-blue-100 mt-2">Enter buyer information and requirements</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter full name"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter email (optional)"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="10-15 digit phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value as buyers['city'])}
                  className={`w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Mohali">Mohali</option>
                  <option value="Zirakpur">Zirakpur</option>
                  <option value="Panchkula">Panchkula</option>
                  <option value="Other">Other</option>
                </select>
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
            </div>

            {/* Property Requirements */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Requirements</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Property Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => handleInputChange('propertyType', e.target.value as buyers['propertyType'])}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.propertyType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Plot">Plot</option>
                    <option value="Office">Office</option>
                    <option value="Retail">Retail</option>
                  </select>
                  {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>}
                </div>

                {['Apartment', 'Villa'].includes(formData.propertyType) && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      BHK <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.bhk || ''}
                      onChange={(e) => handleInputChange('bhk', e.target.value as buyers['bhk'])}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.bhk ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select BHK</option>
                      <option value="Studio">Studio</option>
                      <option value="1">1 BHK</option>
                      <option value="2">2 BHK</option>
                      <option value="3">3 BHK</option>
                      <option value="4">4 BHK</option>
                    </select>
                    {errors.bhk && <p className="text-red-500 text-sm mt-1">{errors.bhk}</p>}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Purpose <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => handleInputChange('purpose', e.target.value as buyers['purpose'])}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.purpose ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="buy">Buy</option>
                    <option value="rent">Rent</option>
                  </select>
                  {errors.purpose && <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Timeline
                  </label>
                  <input
                    type="text"
                    value={formData.timeline || ''}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., 3 months, ASAP, flexible (optional)"
                  />
                </div>
              </div>
            </div>

            {/* Budget */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Budget Range (INR)</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Minimum Budget
                  </label>
                  <input
                    type="number"
                    value={formData.budgetMin}
                    onChange={(e) => handleInputChange('budgetMin', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="₹ 0 (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Maximum Budget
                  </label>
                  <input
                    type="number"
                    value={formData.budgetMax}
                    onChange={(e) => handleInputChange('budgetMax', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.budgetMax ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="₹ 0 (optional)"
                  />
                  {errors.budgetMax && <p className="text-red-500 text-sm mt-1">{errors.budgetMax}</p>}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Source <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.source}
                    onChange={(e) => handleInputChange('source', e.target.value as buyers['source'])}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.source ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Walk-in">Walk-in</option>
                    <option value="Call">Call</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.source && <p className="text-red-500 text-sm mt-1">{errors.source}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value as buyers['status'])}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.status ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="New">New</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Visited">Visited</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Converted">Converted</option>
                    <option value="Dropped">Dropped</option>
                  </select>
                  {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes || ''}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Any specific requirements or preferences... (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Add a tag and press Enter (optional)"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Adding Buyer...' : 'Add Buyer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
>>>>>>> parent of c49ceb5 (homepage auth fixed)
}