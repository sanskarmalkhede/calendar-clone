'use client';

import { useEffect } from 'react';
import { EventModalProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEventContext } from '@/context/EventContext';
import { Trash2 } from 'lucide-react';

// Zod validation schema
const eventFormSchema = z.object({
  title: z.string().min(1, 'Event title is required'),
  description: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  color: z.string().optional(),
}).refine((data) => {
  // Validate that start time is before end time
  const [startHour, startMinute] = data.startTime.split(':').map(Number);
  const [endHour, endMinute] = data.endTime.split(':').map(Number);
  
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;
  
  return startMinutes < endMinutes;
}, {
  message: 'Start time must be before end time',
  path: ['endTime'], // Show error on endTime field
});

type EventFormData = z.infer<typeof eventFormSchema>;

export default function EventModal({
  isOpen,
  onClose,
  event,
  selectedDate
}: EventModalProps) {
  const { createEvent, updateEvent, deleteEvent } = useEventContext();
  
  const isEditing = !!event;
  const modalTitle = isEditing ? 'Edit Event' : 'Create New Event';
  const defaultDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');

  // Initialize form with React Hook Form and Zod validation
  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: event?.title || '',
      description: event?.description || '',
      date: event?.date || defaultDate,
      startTime: event?.startTime || '09:00',
      endTime: event?.endTime || '10:00',
      color: event?.color || '#3b82f6',
    },
  });

  // Reset form when modal opens/closes or event changes
  useEffect(() => {
    if (isOpen) {
      form.reset({
        title: event?.title || '',
        description: event?.description || '',
        date: event?.date || defaultDate,
        startTime: event?.startTime || '09:00',
        endTime: event?.endTime || '10:00',
        color: event?.color || '#3b82f6',
      });
    }
  }, [isOpen, event, defaultDate, form]);

  // Handle form submission
  const onSubmit = async (data: EventFormData) => {
    try {
      if (isEditing && event) {
        // Update existing event
        await updateEvent(event.id, data);
      } else {
        // Create new event
        await createEvent(data);
      }
      
      // Close modal and reset form
      onClose();
      form.reset();
    } catch (error) {
      console.error('Failed to save event:', error);
      // You could add toast notification here for user feedback
    }
  };

  // Handle event deletion with confirmation
  const handleDelete = async () => {
    if (!event) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.title}"? This action cannot be undone.`
    );
    
    if (confirmed) {
      try {
        await deleteEvent(event.id);
        onClose();
        form.reset();
      } catch (error) {
        console.error('Failed to delete event:', error);
        // You could add toast notification here for user feedback
      }
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
            {modalTitle}
          </h2>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
            {/* Event Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter event title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Event Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <textarea
                      rows={3}
                      className="w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter event description (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time Fields */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time *</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time *</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Color Picker */}
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Color</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-3">
                      <Input
                        type="color"
                        className="w-12 h-9 p-1 cursor-pointer"
                        {...field}
                      />
                      <span className="text-sm text-gray-600">
                        Choose a color for your event
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex justify-between pt-4 border-t border-gray-200">
              {/* Delete Button (only show when editing) */}
              {isEditing && event && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={form.formState.isSubmitting}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Event
                </Button>
              )}
              
              {/* Right side buttons */}
              <div className="flex space-x-3 ml-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={form.formState.isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting 
                    ? 'Saving...' 
                    : isEditing ? 'Update Event' : 'Create Event'
                  }
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}