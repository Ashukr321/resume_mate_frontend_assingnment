"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import ModalPreview from './ModalPreview'
import jsPDF from 'jspdf'
interface FormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  description: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

const Form = () => {
  // form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    position: '',
    description: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    return phone.replace(/\D/g, '').length >= 10;
  };

  const validateForm: () => boolean = () => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Set font and size
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Resume', 105, 20, { align: 'center' });
    
    // Add line separator
    doc.setLineWidth(0.5);
    doc.line(20, 30, 190, 30);
    
    // Personal Information
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Personal Information', 20, 45);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${formData.name}`, 20, 55);
    doc.text(`Email: ${formData.email}`, 20, 65);
    doc.text(`Phone: ${formData.phone}`, 20, 75);
    
    if (formData.position) {
      doc.text(`Position: ${formData.position}`, 20, 85);
    }
    
    // Description
    if (formData.description) {
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Description', 20, 105);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      
      const splitDescription = doc.splitTextToSize(formData.description, 170);
      doc.text(splitDescription, 20, 115);
    }
    
    // Download the PDF
    doc.save(`${formData.name.replace(/\s+/g, '_')}_resume.pdf`);
  };

  const handleViewPDF = () => {
    if (validateForm()) {
      setIsModalOpen(true);
    }
  };

  const handleDownloadPDF = () => {
    if (validateForm()) {
      generatePDF();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Add Your Details</h1>
      
      <form className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Image src="/assets/icons/user.svg" alt="User" width={20} height={20} className="mr-2" />
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Image src="/assets/icons/mail.svg" alt="Email" width={20} height={20} className="mr-2" />
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone Number Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Image src="/assets/icons/phone-call.svg" alt="Phone" width={20} height={20} className="mr-2" />
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Position Field */}
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Image src="/assets/icons/position.svg" alt="Position" width={20} height={20} className="mr-2" />
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your desired position"
          />
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Image src="/assets/icons/Description.svg" alt="Description" width={20} height={20} className="mr-2" />
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your professional description or summary"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={handleViewPDF}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
          >
            <Image src="/assets/icons/view.svg" alt="View" width={20} height={20} className="mr-2" />
            View PDF
          </button>
          <button
            type="button"
            onClick={handleDownloadPDF}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
          >
            <Image src="/assets/icons/Download.svg" alt="Download" width={20} height={20} className="mr-2" />
            Download PDF
          </button>
        </div>
      </form>
      
     
      <ModalPreview
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
      />
    </div>
  )
}

export default Form
