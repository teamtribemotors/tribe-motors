'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import StaffSidebar from '../../../components/StaffSidebar';
import StaffHeader from '../../../components/StaffHeader';
import { bulkInsertVehicles } from '../../../actions/inventory';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BulkUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
      setSuccess(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        
        if (jsonData.length === 0) {
          throw new Error("File is empty or invalid format.");
        }

        // Normalize keys (lowercase and remove spaces for easy mapping)
        const normalizedData = jsonData.map((row: any) => {
          const newRow: any = {};
          for (const key in row) {
            const newKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
            newRow[newKey] = row[key];
          }
          return newRow;
        });

        const result = await bulkInsertVehicles(normalizedData);
        setSuccess(`Successfully uploaded ${result.count} vehicles.`);
        setFile(null);
        
        setTimeout(() => {
          router.push('/staff/inventory');
        }, 2000);

      } catch (err: any) {
        console.error(err);
        setError(err.message || 'An error occurred during upload.');
      } finally {
        setLoading(false);
      }
    };
    
    reader.onerror = () => {
      setError("Failed to read file.");
      setLoading(false);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface-bright text-on-surface font-body-md antialiased">
      <StaffSidebar />
      <main className="flex flex-1 flex-col overflow-hidden bg-surface-bright">
        <StaffHeader title="Bulk Upload" icon="cloud_upload" />

        <div className="flex flex-1 flex-col overflow-y-auto p-8 max-w-3xl mx-auto w-full">
          <Link href="/staff/inventory" className="flex items-center gap-2 text-primary font-label-md mb-6 hover:underline">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Inventory
          </Link>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-headline-md mb-2">Upload Inventory Data</h2>
            <p className="text-outline mb-8 font-body-md">Upload a CSV or XLSX file to mass import vehicles. The file should contain headers such as Make, Model, Year, Price, Mileage, Color, and VIN.</p>

            <div className="border-2 border-dashed border-outline-variant rounded-xl p-12 flex flex-col items-center justify-center bg-surface-container-low/50 hover:bg-surface-container-low transition-colors mb-6 relative">
              <input 
                type="file" 
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <span className="material-symbols-outlined text-5xl text-primary mb-4">upload_file</span>
              <p className="font-label-lg text-on-surface mb-1">{file ? file.name : "Drag & drop a file here"}</p>
              <p className="font-body-sm text-outline">{file ? `${(file.size / 1024).toFixed(2)} KB` : "or click to browse (.csv, .xlsx)"}</p>
            </div>

            {error && (
              <div className="bg-error-container text-on-error-container p-4 rounded-lg mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined">error</span>
                <p className="font-body-md">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-primary-container text-on-primary-container p-4 rounded-lg mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined">check_circle</span>
                <p className="font-body-md">{success}</p>
              </div>
            )}

            <div className="flex justify-end gap-4">
              <button 
                onClick={handleUpload}
                disabled={!file || loading}
                className="flex items-center gap-2 bg-primary text-on-primary font-label-lg px-6 py-3 rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">upload</span>
                    Start Upload
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
