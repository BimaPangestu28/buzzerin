"use client"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { X, Upload, File, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Milestone } from "@/types"

interface FileWithPreview extends File {
  preview?: string;
}

interface UploadEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  milestone: Milestone | null;
}

export function UploadEvidenceModal({
  isOpen,
  onClose,
  milestone
}: UploadEvidenceModalProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const { toast } = useToast()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
      'application/zip': ['.zip'],
    },
    onDrop: (acceptedFiles) => {
      setFiles([
        ...files,
        ...acceptedFiles.map(file => Object.assign(file, {
          preview: file.type.startsWith('image/') 
            ? URL.createObjectURL(file)
            : undefined
        }))
      ])
    }
  })

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter(file => file !== fileToRemove))
  }

  const handleSubmit = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one file to upload",
        variant: "destructive",
      })
      return
    }
    setIsConfirmOpen(true)
  }

  const confirmUpload = async () => {
    setIsConfirmOpen(false)
    setIsUploading(true)
    try {
      // Add your file upload logic here
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate upload
      
      toast({
        title: "Success",
        description: "Evidence uploaded successfully",
      })
      onClose()
      setFiles([])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload evidence. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Evidence</DialogTitle>
            <DialogDescription>
              Upload evidence for milestone: {milestone?.title}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                transition-colors duration-200
                ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-200'}
              `}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag & drop files here, or click to select files
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supports: Images, PDF, ZIP (up to 10MB each)
              </p>
            </div>

            {files.length > 0 && (
              <div className="space-y-4">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white rounded-md">
                        {file.type.startsWith('image/') ? (
                          <img
                            src={file.preview}
                            alt={file.name}
                            className="h-8 w-8 object-cover rounded"
                          />
                        ) : (
                          <File className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium truncate max-w-[200px]">
                          {file.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isUploading || files.length === 0}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload Evidence"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Upload</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to upload {files.length} file{files.length !== 1 && 's'}?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmUpload}>
              Confirm Upload
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
