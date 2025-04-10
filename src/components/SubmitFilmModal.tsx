
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface SubmitFilmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmitFilmModal: React.FC<SubmitFilmModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    email: '',
    description: '',
    file: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files ? e.target.files[0] : null }));
      if (errors.file) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.file;
          return newErrors;
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Film title is required';
    if (!formData.director.trim()) newErrors.director = 'Director name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.file) newErrors.file = 'Please upload your film or trailer';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        toast({
          title: "Submission Successful!",
          description: "Your film has been submitted for consideration.",
          variant: "default",
        });
        onClose();
        // Reset form
        setFormData({
          title: '',
          director: '',
          email: '',
          description: '',
          file: null,
        });
      }, 1500);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-festival-card border-white/20 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Submit Your Film</DialogTitle>
          <DialogDescription className="text-white/70">
            Fill out the form below to submit your film for consideration.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Film Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`bg-white/10 border-white/20 text-white ${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="director" className="text-white">Director Name</Label>
            <Input
              id="director"
              name="director"
              value={formData.director}
              onChange={handleChange}
              className={`bg-white/10 border-white/20 text-white ${errors.director ? 'border-red-500' : ''}`}
            />
            {errors.director && <p className="text-red-500 text-sm">{errors.director}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`bg-white/10 border-white/20 text-white ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Short Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`bg-white/10 border-white/20 text-white min-h-24 ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file" className="text-white">Upload Video/File</Label>
            <Input
              id="file"
              name="file"
              type="file"
              accept="video/*,.mp4,.mov,.avi"
              onChange={handleFileChange}
              className={`bg-white/10 border-white/20 text-white file:text-white file:bg-festival-red hover:file:bg-red-700 file:border-0 file:rounded-md file:px-4 file:py-2 ${errors.file ? 'border-red-500' : ''}`}
            />
            {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
            <p className="text-white/60 text-xs">Max file size: 500MB. Supported formats: MP4, MOV, AVI</p>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="bg-transparent border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-festival-red hover:bg-red-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Film'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitFilmModal;
