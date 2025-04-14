import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Film, Upload, X, Check, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const totalSteps = 3;

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

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 1) {
      if (!formData.title.trim()) newErrors.title = 'Film title is required';
      if (!formData.director.trim()) newErrors.director = 'Director name is required';
    }
    
    if (currentStep === 2) {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      
      if (!formData.description.trim()) newErrors.description = 'Description is required';
    }
    
    if (currentStep === 3) {
      if (!formData.file) newErrors.file = 'Please upload your film or trailer';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateCurrentStep()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // Show toast after a slight delay
        setTimeout(() => {
          toast({
            title: "Submission Successful!",
            description: "Your film has been submitted for consideration.",
            variant: "default",
          });
        }, 1500);
        
        // Auto close after success animation
        setTimeout(() => {
          onClose();
          // Reset form
          setFormData({
            title: '',
            director: '',
            email: '',
            description: '',
            file: null,
          });
          setCurrentStep(1);
          setIsSuccess(false);
        }, 2500);
      }, 1500);
    }
  };
  
  const handleModalClose = () => {
    // Reset form state
    setCurrentStep(1);
    setIsSuccess(false);
    onClose();
  };
  
  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95, 
      transition: { duration: 0.2 } 
    }
  };
  
  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.3 } 
    },
    exit: { 
      opacity: 0, 
      x: -20, 
      transition: { duration: 0.2 } 
    }
  };
  
  const successVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1, 
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 10,
        delay: 0.2
      } 
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="bg-[#0c0c0c] border-white/10 text-white sm:max-w-lg p-0 overflow-hidden">
        <div className="relative">
          {/* Background texture */}
          <div className="absolute inset-0 bg-[url('/film-grain.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
          
          <div className="p-6">
            <DialogHeader className="mb-6">
              <div className="flex items-center">
                <Film className="w-5 h-5 text-festival-red mr-2" />
                <DialogTitle className="text-xl font-medium text-white">Submit Your Film</DialogTitle>
              </div>
              <DialogDescription className="text-white/70 mt-2">
                Fill out the form below to submit your film for consideration.
              </DialogDescription>
            </DialogHeader>
            
            {/* Progress indicator */}
            <div className="relative h-1 bg-white/10 mb-8 overflow-hidden">
              <motion.div 
                className="absolute h-full bg-festival-red"
                initial={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step indicators */}
                <div className="flex justify-between mb-6">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-8 h-8 rounded-full flex items-center justify-center border text-sm ${
                        i + 1 === currentStep 
                          ? 'border-festival-red bg-festival-red/10 text-white' 
                          : i + 1 < currentStep 
                            ? 'border-festival-red bg-festival-red text-white' 
                            : 'border-white/20 text-white/50'
                      }`}
                    >
                      {i + 1 < currentStep ? <Check className="w-4 h-4" /> : i + 1}
                    </div>
                  ))}
                </div>
                
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div 
                      key="step1"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-white">Film Title</Label>
                        <Input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          className={`bg-black border-white/20 text-white h-12 ${errors.title ? 'border-red-500' : ''}`}
                          placeholder="Enter your film title"
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
                          className={`bg-black border-white/20 text-white h-12 ${errors.director ? 'border-red-500' : ''}`}
                          placeholder="Enter director's name"
                        />
                        {errors.director && <p className="text-red-500 text-sm">{errors.director}</p>}
                      </div>
                    </motion.div>
                  )}
                  
                  {currentStep === 2 && (
                    <motion.div 
                      key="step2"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Contact Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`bg-black border-white/20 text-white h-12 ${errors.email ? 'border-red-500' : ''}`}
                          placeholder="Enter your email address"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-white">Film Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          className={`bg-black border-white/20 text-white min-h-32 ${errors.description ? 'border-red-500' : ''}`}
                          placeholder="Provide a brief description of your film"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                      </div>
                    </motion.div>
                  )}
                  
                  {currentStep === 3 && (
                    <motion.div 
                      key="step3"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="file" className="text-white">Upload Your Film</Label>
                        <div className={`border-2 border-dashed rounded-md p-6 ${
                          formData.file ? 'border-festival-red bg-festival-red/5' : 'border-white/20'
                        } ${errors.file ? 'border-red-500' : ''}`}>
                          <div className="flex flex-col items-center justify-center">
                            {formData.file ? (
                              <>
                                <div className="bg-festival-red/10 rounded-full p-3 mb-4">
                                  <Check className="h-6 w-6 text-festival-red" />
                                </div>
                                <p className="text-white font-medium mb-1">{formData.file.name}</p>
                                <p className="text-white/60 text-sm mb-4">
                                  {(formData.file.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                                <Button 
                                  type="button" 
                                  onClick={() => setFormData(prev => ({ ...prev, file: null }))}
                                  variant="outline"
                                  className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-festival-red"
                                >
                                  <X className="mr-2 h-4 w-4" /> Remove File
                                </Button>
                              </>
                            ) : (
                              <>
                                <div className="bg-white/5 rounded-full p-3 mb-4">
                                  <Upload className="h-6 w-6 text-white/70" />
                                </div>
                                <p className="text-white font-medium mb-1">Drag and drop your file or</p>
                                <Input
                                  id="file"
                                  name="file"
                                  type="file"
                                  accept="video/*,.mp4,.mov,.avi"
                                  onChange={handleFileChange}
                                  className="hidden"
                                />
                                <label 
                                  htmlFor="file" 
                                  className="cursor-pointer text-festival-red hover:text-festival-red/80 transition-colors"
                                >
                                  Browse files
                                </label>
                                <p className="text-white/60 text-sm mt-4 text-center">
                                  Max file size: 500MB<br />
                                  Supported formats: MP4, MOV, AVI
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                        {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4 mt-8 border-t border-white/10">
                  {currentStep > 1 && (
                    <Button 
                      type="button" 
                      onClick={handlePrevStep}
                      variant="outline" 
                      className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                    >
                      Back
                    </Button>
                  )}
                  
                  {currentStep < totalSteps ? (
                    <Button 
                      type="button" 
                      onClick={handleNextStep}
                      className="bg-white text-black hover:bg-white/90 transition-all duration-300"
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      className="bg-festival-red hover:bg-festival-red/90 text-white transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : 'Submit Film'}
                    </Button>
                  )}
                </DialogFooter>
              </form>
            ) : (
              <motion.div
                className="py-8 flex flex-col items-center justify-center text-center"
                initial="hidden"
                animate="visible"
                variants={successVariants}
              >
                <div className="w-16 h-16 rounded-full bg-festival-red/20 flex items-center justify-center mb-6">
                  <Check className="w-8 h-8 text-festival-red" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Submission Successful!</h3>
                <p className="text-white/70 mb-6">
                  Your film has been submitted for consideration. We'll review your submission and get back to you soon.
                </p>
                <Button 
                  onClick={handleModalClose}
                  className="bg-white text-black hover:bg-white/90 transition-all duration-300"
                >
                  Close
                </Button>
              </motion.div>
            )}
          </div>
          
          {/* Decorative film strip at bottom */}
          <div className="h-4 bg-black flex overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="h-full w-4 border-r border-white/10"></div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitFilmModal;