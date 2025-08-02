# Resume Mate - Frontend Form Component

A modern React application built with Next.js and TypeScript that allows users to create professional resumes by filling out a form, previewing the content in a modal, and downloading it as a PDF.

## 🚀 Features

- **Interactive Form**: User-friendly form with real-time validation
- **PDF Generation**: Create professional PDF resumes using jsPDF
- **Modal Preview**: Preview resume before downloading
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Icon Integration**: Beautiful icons for better user experience
- **Form Validation**: Comprehensive validation for all required fields

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **jsPDF** - PDF generation library

## 📁 Project Structure

```
resume_mate_frontend_assingnment/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main page component
│   │   └── globals.css         # Global styles
│   └── components/
│       ├── Form.tsx            # Main form component
│       └── ModalPreview.tsx    # Modal preview component
├── public/
│   └── assets/
│       └── icons/              # SVG icons for UI
└── package.json
```

## 🎯 Component Explanation

### Form Component (`src/components/Form.tsx`)

This React component, written in TypeScript for a Next.js application, creates a responsive form allowing users to input personal resume data, preview it in a modal, and download it as a PDF.

#### 1. **Imports and Setup**
- React, useState for state management
- `jsPDF` to generate PDF files
- `ModalPreview` is a custom modal component to preview the resume
- Next.js `Image` component for optimized icon rendering

#### 2. **Types Defined**
- `FormData` interface defines structure for form input fields
- `FormErrors` defines optional error messages

#### 3. **State Management**
- `formData` stores input values
- `errors` tracks validation messages
- `isModalOpen` toggles the preview modal

#### 4. **Validation Functions**
- `validateEmail` uses regex to validate email format
- `validatePhone` ensures phone number has at least 10 digits
- `validateForm` checks required fields and sets `errors` if validation fails

#### 5. **Event Handlers**
- `handleInputChange` updates the form state and clears field-level errors
- `handleViewPDF` validates and opens the modal
- `handleDownloadPDF` validates and triggers PDF download

#### 6. **PDF Generation (`generatePDF`)**
- Uses jsPDF to layout text fields with titles and formatting
- Handles multi-line text via `splitTextToSize`
- Saves the file as "{name}_resume.pdf"

#### 7. **UI Layout**
- Built with Tailwind CSS
- Uses `<Image />` from Next.js for optimized icon rendering
- Displays field-specific errors conditionally
- Includes interactive buttons to view/download the resume

#### 8. **Modal Integration**
- The `ModalPreview` component is shown conditionally when `isModalOpen` is true

### ModalPreview Component (`src/components/ModalPreview.tsx`)

A modal component that displays a preview of the resume with professional styling and icons.

#### Features:
- **Professional Layout**: Clean, structured resume preview
- **Icon Integration**: Visual icons for better user experience
- **PDF Download**: Direct PDF generation from modal
- **Responsive Design**: Adapts to different screen sizes

## 📋 Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Name | Text | ✅ | Required |
| Email | Email | ✅ | Valid email format |
| Phone | Tel | ✅ | Minimum 10 digits |
| Position | Text | ❌ | Optional |
| Description | Textarea | ❌ | Optional |

## 🎨 UI Features

### Icons Used
- **User Icon** - Name field and Personal Information section
- **Mail Icon** - Email field
- **Phone Icon** - Phone number field
- **Position Icon** - Position field
- **Description Icon** - Description section
- **View Icon** - View PDF button
- **Download Icon** - Download PDF button

### Styling
- **Modern Design**: Clean, professional appearance
- **Error States**: Red borders and error messages for invalid fields
- **Focus States**: Blue ring indicators for active fields
- **Hover Effects**: Smooth transitions on interactive elements

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resume_mate_frontend_assingnment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Usage

1. **Fill the Form**: Enter your personal information in the form fields
2. **Validate**: All required fields are validated in real-time
3. **Preview**: Click "View PDF" to see a preview in the modal
4. **Download**: Click "Download PDF" to generate and download your resume

## 🔧 Customization

### Adding New Fields
1. Update the `FormData` interface
2. Add the field to the form state
3. Create the input element with proper validation
4. Update the PDF generation function

### Styling
- Modify Tailwind classes in the components
- Update icon paths in the Image components
- Customize color scheme in the CSS classes

## 📄 PDF Output

The generated PDF includes:
- Professional header with "Resume" title
- Personal information section
- Description section (if provided)
- Proper formatting and spacing
- Named file: `{name}_resume.pdf`

## 🧪 Best Practices Demonstrated

- **Type Safety**: Full TypeScript implementation
- **Component Modularity**: Separated concerns between Form and Modal
- **Form Validation**: Comprehensive client-side validation
- **Error Handling**: User-friendly error messages
- **Performance**: Optimized images with Next.js Image component
- **Accessibility**: Proper labels, alt text, and semantic HTML
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Resume Mate** - Create professional resumes with ease! 🚀
