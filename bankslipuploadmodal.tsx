import React, { useState, useRef, ChangeEvent, DragEvent, FormEvent } from 'react';
import { 
  UploadCloud, 
  X, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Eye, 
  Trash2,
  Calendar,
  Building,
  CreditCard,
  User,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export interface BankAccountDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  branch: string;
  swiftCode?: string;
  currency: string;
}

export interface BankSlipUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (slipData: any) => void;
  tenantName?: string;
  courseTitle?: string;
  invoiceId?: string;
  amountDueLkr?: number;
  bankAccounts?: BankAccountDetails[];
}

interface SlipFormState {
  depositorName: string;
  amountPaid: string;
  depositDate: string;
  selectedBank: string;
  referenceNo: string;
  notes: string;
}

const DEFAULT_BANK_ACCOUNTS: BankAccountDetails[] = [
  {
    bankName: 'Commercial Bank of Ceylon',
    accountName: 'Apex Combined Mathematics Academy (Pvt) Ltd',
    accountNumber: '1000 8940 1254',
    branch: 'Nugegoda City Branch (Branch Code: 045)',
    currency: 'LKR',
  },
  {
    bankName: 'Bank of Ceylon (BOC)',
    accountName: 'Apex Education Services Ltd',
    accountNumber: '8492 0184 9283',
    branch: 'Bambalapitiya Corporate Branch (Branch Code: 018)',
    currency: 'LKR',
  },
  {
    bankName: 'Sampath Bank PLC',
    accountName: 'Apex Combined Mathematics Academy',
    accountNumber: '0089 1002 9941',
    branch: 'Kirulapone Branch',
    currency: 'LKR',
  }
];

export const BankSlipUploadModal: React.FC<BankSlipUploadModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  tenantName = 'Apex Combined Mathematics',
  courseTitle = '2026 A/L Theory & Revision • Combined Mathematics Masterclass',
  invoiceId = 'INV-2025-NOV-8941',
  amountDueLkr = 4500,
  bankAccounts = DEFAULT_BANK_ACCOUNTS,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeAccountTab, setActiveAccountTab] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<SlipFormState>({
    depositorName: 'Kavindu Nirmal Perera',
    amountPaid: amountDueLkr.toString(),
    depositDate: new Date().toISOString().split('T')[0],
    selectedBank: bankAccounts[0]?.bankName || 'Commercial Bank of Ceylon',
    referenceNo: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleFileValidation = (file: File) => {
    setErrorMessage(null);
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    const maxSizeBytes = 5 * 1024 * 1024; // 5MB limit

    if (!validMimeTypes.includes(file.type)) {
      setErrorMessage('Unsupported file format. Please upload a clear JPG, PNG or PDF document.');
      return false;
    }

    if (file.size > maxSizeBytes) {
      setErrorMessage('File size exceeds the 5MB maximum limit. Please compress or take a clearer snapshot.');
      return false;
    }

    setSelectedFile(file);

    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setFilePreviewUrl(url);
    } else {
      setFilePreviewUrl(null);
    }
    return true;
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileValidation(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileValidation(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
    }
    setSelectedFile(null);
    setFilePreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMessage('Please upload your bank deposit slip or transaction receipt.');
      return;
    }

    if (!formData.depositorName.trim()) {
      setErrorMessage('Depositor name is required as per the bank slip.');
      return;
    }

    if (!formData.amountPaid || Number(formData.amountPaid) <= 0) {
      setErrorMessage('Please enter a valid deposit amount in LKR.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Production API multipart form payload
      const payload = new FormData();
      payload.append('file', selectedFile);
      payload.append('invoiceId', invoiceId);
      payload.append('depositorName', formData.depositorName);
      payload.append('amountPaid', formData.amountPaid);
      payload.append('depositDate', formData.depositDate);
      payload.append('selectedBank', formData.selectedBank);
      payload.append('referenceNo', formData.referenceNo);
      payload.append('notes', formData.notes);

      // Simulated client-side submission delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (onSubmitSuccess) {
        onSubmitSuccess({
          file: selectedFile,
          ...formData,
          status: 'PENDING_REVIEW',
          submittedAt: new Date().toISOString(),
        });
      }

      onClose();
    } catch (err) {
      setErrorMessage('Failed to submit slip for review. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-3xl bg-surface-lowest text-tx-primary rounded-modal border border-stroke shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stroke bg-surface-low">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 id="modal-title" className="text-base sm:text-lg font-bold tracking-tight">
                  Upload Offline Bank Deposit Slip
                </h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container">
                  Manual Audit
                </span>
              </div>
              <p className="text-xs text-tx-muted mt-0.5">
                {tenantName} • Reference #{invoiceId}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-tx-muted hover:text-tx-primary hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-6">
          {/* Institution Banking Guidelines Accordion / Box */}
          <div className="rounded-card border border-stroke bg-surface p-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-tx-muted">
                  Designated Institute Bank Accounts
                </span>
                <p className="text-xs text-tx-secondary mt-0.5">
                  Transfer or deposit exactly <strong className="text-tx-primary font-bold">LKR {amountDueLkr.toLocaleString()}</strong> to any account below:
                </p>
              </div>
              <div className="flex items-center space-x-1 text-xs text-primary font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Payee</span>
              </div>
            </div>

            {/* Bank Select Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
              {bankAccounts.map((acc, index) => (
                <button
                  key={acc.bankName}
                  type="button"
                  onClick={() => {
                    setActiveAccountTab(index);
                    setFormData((prev) => ({ ...prev, selectedBank: acc.bankName }));
                  }}
                  className={`text-left p-2.5 rounded-card border transition-all text-xs ${
                    activeAccountTab === index
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : 'border-stroke bg-surface-lowest hover:border-tx-muted'
                  }`}
                >
                  <p className="font-bold truncate text-tx-primary">{acc.bankName}</p>
                  <p className="text-[11px] font-mono text-primary font-semibold mt-0.5">{acc.accountNumber}</p>
                  <p className="text-[10px] text-tx-muted truncate mt-0.5">{acc.branch}</p>
                </button>
              ))}
            </div>

            {/* Active Account Detail Strip */}
            <div className="mt-3 pt-2.5 border-t border-stroke/70 flex flex-wrap items-center justify-between text-xs text-tx-secondary">
              <div>
                Beneficiary Name: <strong className="text-tx-primary">{bankAccounts[activeAccountTab]?.accountName}</strong>
              </div>
              <div className="text-[11px] text-tx-muted">
                Branch: {bankAccounts[activeAccountTab]?.branch}
              </div>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-card bg-feedback-error-container text-feedback-error border border-feedback-error/30 flex items-start space-x-2.5 text-xs animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          {/* 2-Column Layout: Dropzone Left & Form Inputs Right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* File Dropzone (Left: 5 Cols) */}
            <div className="md:col-span-5 flex flex-col">
              <label className="block text-xs font-bold uppercase tracking-wider text-tx-secondary mb-1.5">
                Bank Deposit Slip Image / PDF <span className="text-feedback-error">*</span>
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,application/pdf"
                className="hidden"
                onChange={handleFileInputChange}
              />

              {!selectedFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex-1 min-h-[220px] rounded-card border-2 border-dashed flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-primary bg-primary/10 scale-[0.99]'
                      : 'border-stroke hover:border-primary/80 bg-surface-low hover:bg-surface-container'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-3 shadow-inner">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-tx-primary">
                    Tap or Drag & Drop Deposit Slip
                  </p>
                  <p className="text-[11px] text-tx-muted mt-1 leading-relaxed">
                    Clear photo of physical cash deposit slip, bank counterfoil, or online banking confirmation screenshot.
                  </p>
                  <div className="mt-3 inline-flex items-center space-x-1.5 text-[10px] font-semibold text-tx-secondary bg-surface px-2.5 py-1 rounded-pill border border-stroke">
                    <span>JPEG, PNG, PDF</span>
                    <span>•</span>
                    <span>Max 5MB</span>
                  </div>
                </div>
              ) : (
                <div className="flex-1 min-h-[220px] rounded-card border border-stroke bg-surface-low p-3 flex flex-col">
                  {/* File Preview */}
                  <div className="relative flex-1 bg-surface-lowest rounded border border-stroke flex items-center justify-center overflow-hidden min-h-[140px]">
                    {filePreviewUrl ? (
                      <img
                        src={filePreviewUrl}
                        alt="Deposit slip preview"
                        className="w-full h-full object-contain max-h-[180px]"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-center">
                        <FileText className="w-10 h-10 text-primary mb-1" />
                        <span className="text-xs font-semibold text-tx-primary">PDF Document Attached</span>
                        <span className="text-[11px] text-tx-muted mt-0.5">{selectedFile.name}</span>
                      </div>
                    )}
                  </div>

                  {/* File Metadata Bar */}
                  <div className="mt-2.5 flex items-center justify-between text-xs">
                    <div className="truncate pr-2">
                      <p className="font-medium text-tx-primary truncate">{selectedFile.name}</p>
                      <p className="text-[10px] text-tx-muted font-mono">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready for audit
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-1.5 text-feedback-error hover:bg-feedback-error-container/30 rounded transition-colors"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <p className="text-[10px] text-tx-muted mt-2 flex items-center space-x-1">
                <HelpCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Ensure the bank teller rubber stamp & reference code are visible.</span>
              </p>
            </div>

            {/* Form Inputs (Right: 7 Cols) */}
            <div className="md:col-span-7 space-y-3.5">
              {/* Depositor Name */}
              <div>
                <label htmlFor="depositorName" className="block text-xs font-semibold text-tx-secondary mb-1">
                  Depositor / Student Full Name <span className="text-feedback-error">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-tx-muted" />
                  <input
                    id="depositorName"
                    name="depositorName"
                    type="text"
                    required
                    value={formData.depositorName}
                    onChange={handleInputChange}
                    placeholder="e.g. Kavindu Nirmal Perera"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-card border border-stroke bg-surface-lowest text-tx-primary placeholder:text-tx-muted focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Amount & Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Deposit Amount (LKR) */}
                <div>
                  <label htmlFor="amountPaid" className="block text-xs font-semibold text-tx-secondary mb-1">
                    Amount Paid (LKR) <span className="text-feedback-error">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-tx-muted font-mono">
                      Rs.
                    </span>
                    <input
                      id="amountPaid"
                      name="amountPaid"
                      type="number"
                      required
                      min="1"
                      step="any"
                      value={formData.amountPaid}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 text-xs font-semibold rounded-card border border-stroke bg-surface-lowest text-tx-primary focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Deposit Date */}
                <div>
                  <label htmlFor="depositDate" className="block text-xs font-semibold text-tx-secondary mb-1">
                    Deposit Date <span className="text-feedback-error">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-tx-muted" />
                    <input
                      id="depositDate"
                      name="depositDate"
                      type="date"
                      required
                      value={formData.depositDate}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-card border border-stroke bg-surface-lowest text-tx-primary focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Deposited Bank & Branch */}
              <div>
                <label htmlFor="selectedBank" className="block text-xs font-semibold text-tx-secondary mb-1">
                  Deposited Bank <span className="text-feedback-error">*</span>
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-tx-muted" />
                  <select
                    id="selectedBank"
                    name="selectedBank"
                    value={formData.selectedBank}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-8 py-2 text-xs rounded-card border border-stroke bg-surface-lowest text-tx-primary focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none appearance-none"
                  >
                    {bankAccounts.map((b) => (
                      <option key={b.bankName} value={b.bankName}>
                        {b.bankName}
                      </option>
                    ))}
                    <option value="Other Bank Deposit">Other Commercial Bank</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-tx-muted pointer-events-none" />
                </div>
              </div>

              {/* Transaction Reference / Teller Slip Number */}
              <div>
                <label htmlFor="referenceNo" className="block text-xs font-semibold text-tx-secondary mb-1">
                  Slip / Transaction Reference No. <span className="text-tx-muted font-normal">(Optional)</span>
                </label>
                <input
                  id="referenceNo"
                  name="referenceNo"
                  type="text"
                  value={formData.referenceNo}
                  onChange={handleInputChange}
                  placeholder="e.g. BOC-TXN-902481 or Teller Seq #41"
                  className="w-full px-3 py-2 text-xs rounded-card border border-stroke bg-surface-lowest text-tx-primary placeholder:text-tx-muted focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none font-mono"
                />
              </div>

              {/* Optional Notes for Cashier */}
              <div>
                <label htmlFor="notes" className="block text-xs font-semibold text-tx-secondary mb-1">
                  Notes for Institute Cashier <span className="text-tx-muted font-normal">(Optional)</span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Mention branch details, twin sibling ID, or late payment explanation if applicable..."
                  className="w-full px-3 py-2 text-xs rounded-card border border-stroke bg-surface-lowest text-tx-primary placeholder:text-tx-muted focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Audit SLA Notice Strip */}
          <div className="rounded-card bg-surface-low border border-stroke p-3 flex items-center justify-between text-xs text-tx-muted">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-feedback-success flex-shrink-0" />
              <span>
                Manual cashier verification typically clears within <strong>2 to 4 business hours</strong>.
              </span>
            </div>
            <span className="text-[11px] font-mono text-tx-secondary hidden sm:inline-block">
              Course unlocked immediately upon approval
            </span>
          </div>

          {/* Modal Actions Footer */}
          <div className="pt-4 border-t border-stroke flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold rounded-card border border-stroke bg-surface-lowest text-tx-secondary hover:text-tx-primary hover:bg-surface-container transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !selectedFile}
              className="px-5 py-2 text-xs font-bold rounded-card bg-primary text-on-primary hover:bg-primary-hover shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting Slip...</span>
                </>
              ) : (
                <span>Submit Slip for Review</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankSlipUploadModal;
