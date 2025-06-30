
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertCircle, Download, Eye, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: string;
  document_type: string;
  document_name: string;
  file_url: string;
  file_size: number;
  upload_date: string;
  expiry_date?: string;
  verification_status: 'pending' | 'verified' | 'rejected';
  verification_notes?: string;
  is_required: boolean;
}

const DocumentsPage = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const documentTypes = [
    { key: 'company_profile', label: 'Company Profile', required: true },
    { key: 'bee_certificate', label: 'B-BBEE Certificate', required: true },
    { key: 'company_registration', label: 'Company Registration', required: true },
    { key: 'affidavit_bee', label: 'Affidavit BEE', required: false },
    { key: 'tax_registration', label: 'Tax Registration', required: true },
    { key: 'tax_clearance', label: 'Tax Clearance Certificate', required: true },
    { key: 'ekurhuleni_letter', label: 'Ekurhuleni Letter', required: false },
    { key: 'compensation_letter', label: 'Compensation Letter', required: false },
    { key: 'ewasa_membership', label: 'eWASA Membership', required: true },
  ];

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Use type assertion to work around the TypeScript issue
      const { data, error } = await (supabase as any)
        .from('company_documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        title: "Error",
        description: "Failed to load documents",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File, documentType: string) => {
    if (!file) return;

    setUploading(documentType);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Upload file to Supabase storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${documentType}_${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('company-documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('company-documents')
        .getPublicUrl(filePath);

      // Save document record using type assertion
      const { error: insertError } = await (supabase as any)
        .from('company_documents')
        .insert([
          {
            user_id: user.id,
            document_type: documentType,
            document_name: file.name,
            file_url: publicUrl,
            file_size: file.size,
            mime_type: file.type,
            is_required: documentTypes.find(t => t.key === documentType)?.required || false
          }
        ]);

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });

      fetchDocuments();
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive",
      });
    } finally {
      setUploading(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Company Documents
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload and manage your compliance documents for verification and record keeping.
            </p>
          </div>

          <div className="grid gap-8">
            {documentTypes.map((docType) => {
              const existingDoc = documents.find(d => d.document_type === docType.key);
              
              return (
                <motion.div
                  key={docType.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-green-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {docType.label}
                          {docType.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </h3>
                        {docType.required && (
                          <p className="text-sm text-gray-500">Required document</p>
                        )}
                      </div>
                    </div>
                    
                    {existingDoc && (
                      <div className="flex items-center gap-2">
                        {getStatusIcon(existingDoc.verification_status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(existingDoc.verification_status)}`}>
                          {existingDoc.verification_status.charAt(0).toUpperCase() + existingDoc.verification_status.slice(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  {existingDoc ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{existingDoc.document_name}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span>{formatFileSize(existingDoc.file_size)}</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(existingDoc.upload_date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => window.open(existingDoc.file_url, '_blank')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Document"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = existingDoc.file_url;
                              link.download = existingDoc.document_name;
                              link.click();
                            }}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Download Document"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {existingDoc.verification_notes && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>Note:</strong> {existingDoc.verification_notes}
                          </p>
                        </div>
                      )}

                      {existingDoc.expiry_date && (
                        <div className="p-3 bg-yellow-50 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <strong>Expires:</strong> {new Date(existingDoc.expiry_date).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <div className="text-center">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">
                          Upload your {docType.label.toLowerCase()}
                        </p>
                        <input
                          type="file"
                          id={`file-${docType.key}`}
                          className="hidden"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, docType.key);
                          }}
                          disabled={uploading === docType.key}
                        />
                        <label
                          htmlFor={`file-${docType.key}`}
                          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {uploading === docType.key ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 mr-2" />
                              Choose File
                            </>
                          )}
                        </label>
                        <p className="text-xs text-gray-500 mt-2">
                          Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-blue-50 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Document Verification Process
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <Upload className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">1. Upload</p>
                  <p className="text-blue-700">Submit your documents securely</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">2. Review</p>
                  <p className="text-blue-700">Our team verifies your documents</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">3. Approval</p>
                  <p className="text-blue-700">Documents approved for compliance</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DocumentsPage;
