import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Calendar from './components/Calendar';
import CourseSelection from './components/CourseSelection';
import SelectedCourses from './components/SelectedCourses';
import { mockCourses } from './data/mockCourses';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)); // June 2025
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [showCourseSelection, setShowCourseSelection] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const dateStr = date.toISOString().split('T')[0];
    const coursesForDate = mockCourses.filter(course => course.date === dateStr);
    setAvailableCourses(coursesForDate);
    setShowCourseSelection(coursesForDate.length > 0);
  };

  const handleCourseSelect = (course) => {
    const courseKey = `${course.id}-${course.timeSlot}`;
    const isSelected = selectedCourses.some(c => `${c.id}-${c.timeSlot}` === courseKey);

    if (isSelected) {
      setSelectedCourses(prev => 
        prev.filter(c => `${c.id}-${c.timeSlot}` !== courseKey)
      );
    } else {
      setSelectedCourses(prev => [...prev, course]);
    }
  };

  const handleRemoveCourse = (courseToRemove) => {
    const courseKey = `${courseToRemove.id}-${courseToRemove.timeSlot}`;
    setSelectedCourses(prev => 
      prev.filter(c => `${c.id}-${c.timeSlot}` !== courseKey)
    );
  };

  const handleConfirmBooking = () => {
    alert(`🎉 已成功預約 ${selectedCourses.length} 門課程！\n\n💰 總金額: ${formatPrice(getTotalPrice())}\n📚 感謝您的選擇，期待與您在課堂上見面！`);
    setSelectedCourses([]);
    setShowCourseSelection(false);
  };

  const handleCloseCourseSelection = () => {
    setShowCourseSelection(false);
    setSelectedDate(null);
  };

  const getTotalPrice = () => {
    return selectedCourses.reduce((total, course) => total + course.price, 0);
  };

  const formatPrice = (price) => {
    return `NT$ ${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-10"
        >
          <motion.h1 
            className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4 tracking-tight"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            TLI Connect Booking
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg text-gray-600 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            專業語言學習課程預約系統 ✨
          </motion.p>
          
          {/* Stats bar */}
          {selectedCourses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-gray-200/60"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  已選 {selectedCourses.length} 門課程
                </span>
              </div>
              <div className="text-sm font-bold text-blue-600">
                {formatPrice(getTotalPrice())}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">
          {/* Calendar Section */}
          <motion.div 
            className="lg:flex-[3] xl:flex-[4] w-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Calendar
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              onDateSelect={handleDateSelect}
              courses={mockCourses}
              selectedCourses={selectedCourses}
            />
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            className="hidden lg:block lg:w-80 xl:w-96 space-y-4 flex-shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {showCourseSelection && (
              <CourseSelection
                selectedDate={selectedDate}
                availableCourses={availableCourses}
                selectedCourses={selectedCourses}
                onCourseSelect={handleCourseSelect}
                onClose={handleCloseCourseSelection}
              />
            )}
            
            <SelectedCourses
              selectedCourses={selectedCourses}
              onRemoveCourse={handleRemoveCourse}
              onConfirmBooking={handleConfirmBooking}
            />
          </motion.div>

          {/* Mobile Panels */}
          <div className="lg:hidden mt-6 space-y-4 w-full">
            {showCourseSelection && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CourseSelection
                  selectedDate={selectedDate}
                  availableCourses={availableCourses}
                  selectedCourses={selectedCourses}
                  onCourseSelect={handleCourseSelect}
                  onClose={handleCloseCourseSelection}
                />
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <SelectedCourses
                selectedCourses={selectedCourses}
                onRemoveCourse={handleRemoveCourse}
                onConfirmBooking={handleConfirmBooking}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;