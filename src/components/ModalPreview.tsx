"use client";
import React from "react";
import jsPDF from "jspdf";

interface FormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  description: string;
}

interface ModalPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
}

const ModalPreview: React.FC<ModalPreviewProps> = ({
  isOpen,
  onClose,
  formData,
}) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Set font and size
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("Resume", 105, 20, { align: "center" });

    // Add line separator
    doc.setLineWidth(0.5);
    doc.line(20, 30, 190, 30);

    // Personal Information
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Personal Information", 20, 45);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${formData.name}`, 20, 55);
    doc.text(`Email: ${formData.email}`, 20, 65);
    doc.text(`Phone: ${formData.phone}`, 20, 75);

    if (formData.position) {
      doc.text(`Position: ${formData.position}`, 20, 85);
    }

    // Description
    if (formData.description) {
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Description", 20, 105);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      // Split description into lines that fit the page width
      const splitDescription = doc.splitTextToSize(formData.description, 170);
      doc.text(splitDescription, 20, 115);
    }

    // Download the PDF
    doc.save(`${formData.name.replace(/\s+/g, "_")}_resume.pdf`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60  backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-end items-center p-6 border-b">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-700 cursor-pointer text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* PDF Preview Content */}
        <div className="p-6">
          <div className="bg-gray-50 p-6 rounded-lg border min-h-[500px]">
            {/* Personal Information */}
            <div className="mb-6">
              <div className="space-y-2">
                <div className="flex">
                  <span className="font-semibold w-20">Name:</span>
                  <span className="text-gray-700">{formData.name}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-20">Email:</span>
                  <span className="text-gray-700">{formData.email}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-20">Phone:</span>
                  <span className="text-gray-700">{formData.phone}</span>
                </div>
                {formData.position && (
                  <div className="flex">
                    <span className="font-semibold w-20">Position:</span>
                    <span className="text-gray-700">{formData.position}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {formData.description && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  Description
                </h2>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {formData.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer with Download Button */}
        <div className="flex justify-end p-6 border-t">
          <button
            onClick={generatePDF}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPreview;
