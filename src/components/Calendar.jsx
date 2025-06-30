import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiChevronLeft, FiChevronRight } = FiIcons;

const Calendar = ({ currentDate, onDateChange, onDateSelect, courses, selectedCourses }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const monthNames = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];
  
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const getCoursesForDate = (day) => {
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];
    return courses.filter(course => course.date === dateStr);
  };

  const hasSelectedCoursesOnDate = (day) => {
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];
    return selectedCourses.some(course => course.date === dateStr);
  };

  const getSelectedCoursesForDate = (day) => {
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];
    return selectedCourses.filter(course => course.date === dateStr);
  };

  const isToday = (day) => {
    return today.getFullYear() === year && 
           today.getMonth() === month && 
           today.getDate() === day;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(year, month + direction, 1);
    onDateChange(newDate);
  };

  const handleDateClick = (day) => {
    const selectedDate = new Date(year, month, day);
    const coursesForDate = getCoursesForDate(day);
    if (coursesForDate.length > 0) {
      onDateSelect(selectedDate);
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    
    for (let i = 0; i < 42; i++) {
      const dayNumber = i - firstDay + 1;
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
      
      if (isCurrentMonth) {
        const coursesForDate = getCoursesForDate(dayNumber);
        const selectedCoursesForDate = getSelectedCoursesForDate(dayNumber);
        const hasSelected = selectedCoursesForDate.length > 0;
        const todayClass = isToday(dayNumber);

        days.push(
          <motion.div
            key={dayNumber}
            className={`
              h-20 sm:h-24 lg:h-32 xl:h-36 p-2 border border-gray-200/60
              cursor-pointer transition-all duration-300 relative overflow-hidden
              ${todayClass 
                ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25' 
                : hasSelected 
                  ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-300/60 shadow-sm shadow-emerald-500/10'
                  : 'bg-white hover:bg-gray-50'
              }
              ${coursesForDate.length > 0 
                ? 'hover:shadow-md hover:shadow-gray-500/10 hover:-translate-y-0.5' 
                : 'cursor-default'
              }
            `}
            whileHover={coursesForDate.length > 0 ? { y: -2 } : {}}
            whileTap={coursesForDate.length > 0 ? { scale: 0.98 } : {}}
            onClick={() => handleDateClick(dayNumber)}
          >
            {/* Day number */}
            <div className={`
              text-sm sm:text-base lg:text-lg font-bold mb-1
              ${todayClass 
                ? 'text-white' 
                : hasSelected 
                  ? 'text-emerald-700' 
                  : 'text-gray-800'
              }
            `}>
              {dayNumber}
            </div>

            {/* Selected course indicator */}
            {hasSelected && !todayClass && (
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-sm"></div>
              </div>
            )}

            {/* Desktop course display */}
            <div className="hidden sm:block space-y-1">
              {coursesForDate.slice(0, 3).map((course, index) => {
                const isCourseSelected = selectedCourses.some(
                  sc => sc.id === course.id && sc.timeSlot === course.timeSlot
                );
                return (
                  <div
                    key={`${course.id}-${index}`}
                    className={`
                      flex items-center gap-1.5 text-xs py-1 px-1.5 rounded-md
                      ${todayClass 
                        ? 'text-white/90 bg-white/10' 
                        : isCourseSelected 
                          ? 'text-emerald-700 bg-emerald-100/80' 
                          : 'text-gray-700 bg-gray-100/80'
                      }
                    `}
                  >
                    <div className={`
                      text-xs font-medium whitespace-nowrap
                      ${todayClass 
                        ? 'text-white/80' 
                        : isCourseSelected 
                          ? 'text-emerald-600' 
                          : 'text-blue-600'
                      }
                    `}>
                      {course.timeSlot.split('-')[0]}
                    </div>
                    <div className={`
                      flex-1 truncate font-medium leading-tight
                      ${todayClass 
                        ? 'text-white' 
                        : isCourseSelected 
                          ? 'text-emerald-800' 
                          : 'text-gray-800'
                      }
                    `}>
                      {course.title}
                    </div>
                  </div>
                );
              })}
              
              {coursesForDate.length > 3 && (
                <div className={`
                  text-xs text-center font-medium py-1
                  ${todayClass ? 'text-white/70' : 'text-gray-500'}
                `}>
                  +{coursesForDate.length - 3} 更多
                </div>
              )}
            </div>

            {/* Mobile course indicators */}
            <div className="sm:hidden flex justify-center mt-1 space-x-1">
              {coursesForDate.slice(0, 4).map((course, index) => {
                const isCourseSelected = selectedCourses.some(
                  sc => sc.id === course.id && sc.timeSlot === course.timeSlot
                );
                return (
                  <div
                    key={`${course.id}-${course.timeSlot}`}
                    className={`
                      w-1.5 h-1.5 rounded-full
                      ${todayClass 
                        ? 'bg-white' 
                        : isCourseSelected 
                          ? 'bg-emerald-500' 
                          : 'bg-blue-500'
                      }
                    `}
                  />
                );
              })}
              {coursesForDate.length > 4 && (
                <div className={`
                  text-xs font-bold
                  ${todayClass ? 'text-white' : 'text-gray-600'}
                `}>
                  +
                </div>
              )}
            </div>
          </motion.div>
        );
      } else {
        days.push(
          <div
            key={`empty-${i}`}
            className="h-20 sm:h-24 lg:h-32 xl:h-36 border border-gray-100 bg-gray-50/30"
          />
        );
      }
    }
    return days;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-100/60 overflow-hidden"
    >
      {/* Calendar Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigateMonth(-1)}
            className="p-2.5 rounded-xl hover:bg-white/15 transition-all duration-200"
          >
            <SafeIcon icon={FiChevronLeft} className="text-xl" />
          </motion.button>
          
          <h2 className="text-xl font-bold tracking-wide">
            {year}年 {monthNames[month]}
          </h2>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigateMonth(1)}
            className="p-2.5 rounded-xl hover:bg-white/15 transition-all duration-200"
          >
            <SafeIcon icon={FiChevronRight} className="text-xl" />
          </motion.button>
        </div>
      </div>

      {/* Week days header */}
      <div className="grid grid-cols-7 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200/60">
        {weekDays.map(day => (
          <div
            key={day}
            className="p-3 text-center font-semibold text-gray-700 text-sm tracking-wide"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 grid-rows-6 bg-gray-50/20">
        {renderCalendarDays()}
      </div>
    </motion.div>
  );
};

export default Calendar;