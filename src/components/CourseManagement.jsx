import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {
  FiBook,
  FiCalendar,
  FiClock,
  FiUser,
  FiUsers,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiSave,
  FiX,
  FiCheck,
  FiEye,
  FiBookOpen,
  FiLink,
  FiFileText,
  FiAlertTriangle,
  FiInfo,
  FiFilter,
  FiSearch,
  FiDownload,
  FiUpload,
  FiRotateCcw,
  FiSend,
  FiArchive
} = FiIcons;

const CourseManagement = () => {
  // 主要狀態
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [showAddInstructorModal, setShowAddInstructorModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // 新課程表單狀態 - 重新組織結構
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    startDate: '',
    totalSessions: 1,
    excludeDates: [],
    endDate: '',
    status: 'draft',
    category: '',
    level: 'intermediate',
    // 全局時間設置
    globalSchedules: [
      {
        weekdays: [],
        startTime: '',
        endTime: '',
        instructorId: ''
      }
    ],
    // 每堂課的內容設置
    sessions: [
      {
        title: '',
        classroom: '',
        materials: ''
      }
    ],
    generatedSessions: []
  });

  // 新教師表單狀態
  const [newInstructor, setNewInstructor] = useState({
    name: '',
    email: '',
    expertise: '',
    availability: {}
  });

  // 載入模擬數據
  useEffect(() => {
    // 模擬課程數據 - 更新結構
    const mockCourses = [
      {
        id: 1,
        title: '商務華語會話',
        description: '提升商務溝通技巧，學習專業商務用語及會議表達',
        startDate: '2024-01-15',
        endDate: '2024-06-15',
        totalSessions: 24,
        excludeDates: ['2024-02-10', '2024-04-05'],
        status: 'active',
        category: '商務華語',
        level: 'intermediate',
        globalSchedules: [
          {
            weekdays: ['2', '4'],
            startTime: '09:00',
            endTime: '10:30',
            instructorId: 1
          }
        ],
        sessions: [
          { title: '商務會議對話基礎', classroom: 'https://meet.google.com/abc-def-ghi', materials: 'https://drive.google.com/folder/d/example1' },
          { title: '商務電話溝通', classroom: 'https://meet.google.com/abc-def-ghi', materials: 'https://drive.google.com/folder/d/example1' },
          { title: '商務簡報技巧', classroom: 'https://meet.google.com/abc-def-ghi', materials: 'https://drive.google.com/folder/d/example1' }
        ],
        generatedSessions: []
      },
      {
        id: 2,
        title: '華語文法精修',
        description: '系統性學習華語文法結構與語法應用',
        startDate: '2024-02-01',
        endDate: '2024-07-01',
        totalSessions: 20,
        excludeDates: ['2024-03-15'],
        status: 'active',
        category: '華語文法',
        level: 'advanced',
        globalSchedules: [
          {
            weekdays: ['1', '3'],
            startTime: '14:00',
            endTime: '15:30',
            instructorId: 2
          }
        ],
        sessions: [
          { title: '華語句型結構', classroom: 'https://meet.google.com/def-ghi-jkl', materials: 'https://drive.google.com/folder/d/example2' },
          { title: '語法應用練習', classroom: 'https://meet.google.com/def-ghi-jkl', materials: 'https://drive.google.com/folder/d/example2' }
        ],
        generatedSessions: []
      }
    ];

    // 模擬教師數據
    const mockInstructors = [
      {
        id: 1,
        name: '張老師',
        email: 'zhang@example.com',
        expertise: '商務華語、華語會話',
        availability: {
          '1': ['09:00-12:00', '14:00-17:00'],
          '2': ['09:00-12:00', '14:00-17:00'],
          '3': ['09:00-12:00', '14:00-17:00'],
          '4': ['09:00-12:00', '14:00-17:00'],
          '5': ['09:00-12:00', '14:00-17:00']
        },
        rating: 4.8,
        courses: [1]
      },
      {
        id: 2,
        name: '王老師',
        email: 'wang@example.com',
        expertise: '華語文法、華語寫作',
        availability: {
          '1': ['09:00-12:00', '14:00-17:00'],
          '2': ['09:00-12:00', '14:00-17:00'],
          '3': ['09:00-12:00', '14:00-17:00'],
          '4': ['09:00-12:00', '14:00-17:00'],
          '5': ['09:00-12:00', '14:00-17:00']
        },
        rating: 4.9,
        courses: [2]
      },
      {
        id: 3,
        name: '李老師',
        email: 'li@example.com',
        expertise: '基礎華語、華語發音',
        availability: {
          '1': ['09:00-12:00', '14:00-17:00'],
          '2': ['09:00-12:00', '14:00-17:00'],
          '3': ['09:00-12:00', '14:00-17:00'],
          '4': ['09:00-12:00', '14:00-17:00'],
          '5': ['09:00-12:00', '14:00-17:00']
        },
        rating: 4.7,
        courses: []
      },
      {
        id: 4,
        name: '陳老師',
        email: 'chen@example.com',
        expertise: '商務華語、華語聽力',
        availability: {
          '1': ['09:00-12:00', '14:00-17:00'],
          '2': ['09:00-12:00', '14:00-17:00'],
          '3': ['09:00-12:00', '14:00-17:00'],
          '4': ['09:00-12:00', '14:00-17:00'],
          '5': ['09:00-12:00', '14:00-17:00']
        },
        rating: 4.6,
        courses: []
      }
    ];

    setCourses(mockCourses);
    setInstructors(mockInstructors);
  }, []);

  // 自動計算結束日期函數
  const calculateEndDate = (courseData) => {
    const course = courseData || newCourse;
    const { startDate, totalSessions, globalSchedules, excludeDates } = course;
    
    if (!startDate || totalSessions <= 0 || globalSchedules.length === 0) return;
    
    // 計算每週上課天數
    const weekdaysCount = globalSchedules.reduce((total, schedule) => {
      return total + schedule.weekdays.length;
    }, 0);
    
    if (weekdaysCount === 0) return;
    
    // 估算需要的週數
    const weeksNeeded = Math.ceil(totalSessions / weekdaysCount);
    
    // 計算結束日期
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + (weeksNeeded * 7));
    
    // 考慮排除日期
    if (excludeDates && excludeDates.length > 0) {
      const excludeDaysCount = excludeDates.length;
      const additionalDays = Math.ceil(excludeDaysCount / weekdaysCount) * 7;
      end.setDate(end.getDate() + additionalDays);
    }
    
    const endDateStr = end.toISOString().split('T')[0];
    
    setNewCourse(prev => ({
      ...prev,
      endDate: endDateStr
    }));
    
    return endDateStr;
  };

  // 處理總堂數變化
  const handleTotalSessionsChange = (total) => {
    const currentSessions = [...newCourse.sessions];
    const newTotal = parseInt(total) || 1;
    
    if (newTotal > currentSessions.length) {
      // 增加課程
      const additional = Array(newTotal - currentSessions.length).fill(0).map(() => ({
        title: '',
        classroom: '',
        materials: ''
      }));
      
      const updatedCourse = {
        ...newCourse,
        totalSessions: newTotal,
        sessions: [...currentSessions, ...additional]
      };
      
      setNewCourse(updatedCourse);
      setTimeout(() => calculateEndDate(updatedCourse), 0);
    } else if (newTotal < currentSessions.length) {
      // 減少課程
      const updatedCourse = {
        ...newCourse,
        totalSessions: newTotal,
        sessions: currentSessions.slice(0, newTotal)
      };
      
      setNewCourse(updatedCourse);
      setTimeout(() => calculateEndDate(updatedCourse), 0);
    }
  };

  // 處理排除日期
  const handleExcludeDate = (date) => {
    if (!date) return;
    
    setNewCourse(prev => {
      const excludeDates = [...prev.excludeDates];
      let updatedCourse;
      
      if (excludeDates.includes(date)) {
        updatedCourse = {
          ...prev,
          excludeDates: excludeDates.filter(d => d !== date)
        };
      } else {
        updatedCourse = {
          ...prev,
          excludeDates: [...excludeDates, date].sort()
        };
      }
      
      // 自動計算結束日期
      setTimeout(() => calculateEndDate(updatedCourse), 0);
      return updatedCourse;
    });
  };

  // 處理每堂課內容變化
  const handleSessionChange = (sessionIndex, field, value) => {
    const updatedSessions = [...newCourse.sessions];
    updatedSessions[sessionIndex] = {
      ...updatedSessions[sessionIndex],
      [field]: value
    };

    setNewCourse(prev => ({
      ...prev,
      sessions: updatedSessions
    }));
  };

  // 處理全局時間段變化
  const handleGlobalScheduleChange = (scheduleIndex, field, value) => {
    const updatedSchedules = [...newCourse.globalSchedules];
    
    updatedSchedules[scheduleIndex] = {
      ...updatedSchedules[scheduleIndex],
      [field]: value
    };
    
    const updatedCourse = {
      ...newCourse,
      globalSchedules: updatedSchedules
    };
    
    setNewCourse(updatedCourse);
    
    // 如果修改了星期或時間，重新計算結束日期
    if (field === 'weekdays') {
      setTimeout(() => calculateEndDate(updatedCourse), 0);
    }
  };

  // 新增全局時間段
  const addGlobalSchedule = () => {
    const updatedSchedules = [...newCourse.globalSchedules];
    
    updatedSchedules.push({
      weekdays: [],
      startTime: '',
      endTime: '',
      instructorId: ''
    });
    
    setNewCourse(prev => ({
      ...prev,
      globalSchedules: updatedSchedules
    }));
  };

  // 移除全局時間段
  const removeGlobalSchedule = (scheduleIndex) => {
    if (newCourse.globalSchedules.length <= 1) {
      alert('課程至少需要一個時間段');
      return;
    }
    
    const updatedSchedules = [...newCourse.globalSchedules];
    updatedSchedules.splice(scheduleIndex, 1);
    
    setNewCourse(prev => ({
      ...prev,
      globalSchedules: updatedSchedules
    }));
  };

  // 處理星期選擇
  const handleWeekdayToggle = (scheduleIndex, day) => {
    const updatedSchedules = [...newCourse.globalSchedules];
    const currentWeekdays = [...updatedSchedules[scheduleIndex].weekdays];
    
    const dayIndex = currentWeekdays.indexOf(day);
    if (dayIndex >= 0) {
      currentWeekdays.splice(dayIndex, 1);
    } else {
      currentWeekdays.push(day);
      currentWeekdays.sort();
    }
    
    updatedSchedules[scheduleIndex].weekdays = currentWeekdays;
    
    const updatedCourse = {
      ...newCourse,
      globalSchedules: updatedSchedules
    };
    
    setNewCourse(updatedCourse);
    
    // 重新計算結束日期
    setTimeout(() => calculateEndDate(updatedCourse), 0);
  };

  // 新增教師
  const handleAddInstructor = () => {
    if (!newInstructor.name || !newInstructor.email) {
      alert('請填寫教師姓名和電子郵件');
      return;
    }
    
    const newInstructorData = {
      id: Math.max(...instructors.map(i => i.id), 0) + 1,
      name: newInstructor.name,
      email: newInstructor.email,
      expertise: newInstructor.expertise,
      availability: {
        '1': ['09:00-17:00'],
        '2': ['09:00-17:00'],
        '3': ['09:00-17:00'],
        '4': ['09:00-17:00'],
        '5': ['09:00-17:00']
      },
      rating: 5.0,
      courses: []
    };
    
    setInstructors(prev => [...prev, newInstructorData]);
    setShowAddInstructorModal(false);
    setNewInstructor({
      name: '',
      email: '',
      expertise: '',
      availability: {}
    });
    
    alert('✅ 教師已成功新增！');
  };

  // 生成課程實例
  const generateCourseSessions = (courseData) => {
    const course = courseData || newCourse;
    const { startDate, endDate, globalSchedules, sessions, excludeDates, totalSessions } = course;
    
    if (!startDate || !endDate || globalSchedules.length === 0 || sessions.length === 0) return [];
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const generatedSessions = [];
    let sessionCount = 0;
    let currentSessionIndex = 0;
    
    // 遍歷日期範圍內的每一天
    let currentDate = new Date(start);
    
    while (currentDate <= end && sessionCount < totalSessions) {
      const dateStr = currentDate.toISOString().split('T')[0];
      
      // 檢查是否是排除日期
      if (!excludeDates || !excludeDates.includes(dateStr)) {
        const dayOfWeek = currentDate.getDay().toString();
        
        // 遍歷每個全局時間段
        for (const schedule of globalSchedules) {
          // 檢查當前日期是否是指定的上課日
          if (schedule.weekdays.includes(dayOfWeek)) {
            // 獲取教師資訊
            const instructor = instructors.find(i => i.id === parseInt(schedule.instructorId));
            const instructorName = instructor ? instructor.name : '未指定';
            
            // 獲取對應的課程內容
            const sessionContent = sessions[currentSessionIndex % sessions.length];
            
            generatedSessions.push({
              date: dateStr,
              title: sessionContent.title || `第 ${sessionCount + 1} 堂課`,
              startTime: schedule.startTime,
              endTime: schedule.endTime,
              instructorId: schedule.instructorId,
              instructorName,
              classroom: sessionContent.classroom,
              materials: sessionContent.materials
            });
            
            sessionCount++;
            currentSessionIndex++;
            
            // 如果已達到總課程數，跳出
            if (sessionCount >= totalSessions) break;
          }
        }
      }
      
      // 移至下一天
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // 按日期排序
    return generatedSessions.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, totalSessions);
  };

  // 表單驗證
  const validateCourseForm = () => {
    const errors = [];
    
    if (!newCourse.title.trim()) errors.push('課程標題');
    if (!newCourse.startDate) errors.push('開始日期');
    if (newCourse.totalSessions <= 0) errors.push('總堂數');
    
    // 驗證全局時間段
    let hasScheduleErrors = false;
    
    newCourse.globalSchedules.forEach((schedule, index) => {
      if (schedule.weekdays.length === 0) {
        errors.push(`第 ${index + 1} 個時間段的上課星期`);
        hasScheduleErrors = true;
      }
      
      if (!schedule.startTime) {
        errors.push(`第 ${index + 1} 個時間段的開始時間`);
        hasScheduleErrors = true;
      }
      
      if (!schedule.endTime) {
        errors.push(`第 ${index + 1} 個時間段的結束時間`);
        hasScheduleErrors = true;
      }
      
      if (!schedule.instructorId) {
        errors.push(`第 ${index + 1} 個時間段的教師`);
        hasScheduleErrors = true;
      }
      
      // 檢查時間格式
      if (schedule.startTime && schedule.endTime && schedule.startTime >= schedule.endTime) {
        errors.push(`第 ${index + 1} 個時間段的結束時間必須晚於開始時間`);
        hasScheduleErrors = true;
      }
    });
    
    // 驗證每堂課內容
    newCourse.sessions.forEach((session, index) => {
      if (!session.title.trim()) {
        errors.push(`第 ${index + 1} 堂課的標題`);
      }
    });
    
    // 生成課程實例並檢查數量
    const generatedSessions = generateCourseSessions();
    
    if (generatedSessions.length === 0 && !hasScheduleErrors) {
      errors.push('沒有生成任何課程實例，請檢查日期範圍和上課星期');
    } else if (generatedSessions.length < newCourse.totalSessions) {
      errors.push(`生成的課程實例數量(${generatedSessions.length})少於總堂數(${newCourse.totalSessions})，請調整日期範圍或新增更多上課時間`);
    }
    
    return errors;
  };

  // 提交課程表單
  const handleSubmitCourse = (isDraft = false) => {
    // 更新生成的課程實例
    const generatedSessions = generateCourseSessions();
    setNewCourse(prev => ({ ...prev, generatedSessions }));
    
    // 表單驗證
    const errors = validateCourseForm();
    
    if (errors.length > 0 && !isDraft) {
      alert(`請檢查以下欄位：\n\n${errors.join('\n')}`);
      return;
    }
    
    // 創建新課程對象
    const newCourseData = {
      ...newCourse,
      id: Math.max(0, ...courses.map(c => c.id)) + 1,
      status: isDraft ? 'draft' : 'active',
      generatedSessions
    };
    
    // 更新課程列表
    setCourses([...courses, newCourseData]);
    
    // 重置表單並關閉模態框
    resetCourseForm();
    setShowAddCourseModal(false);
    
    alert(`課程已${isDraft ? '儲存為草稿' : '發布'}`);
  };

  // 編輯課程
  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setNewCourse({
      ...course,
      generatedSessions: generateCourseSessions(course)
    });
    setShowEditCourseModal(true);
  };

  // 更新課程
  const handleUpdateCourse = (isDraft = false) => {
    // 更新生成的課程實例
    const generatedSessions = generateCourseSessions();
    setNewCourse(prev => ({ ...prev, generatedSessions }));
    
    // 表單驗證
    const errors = validateCourseForm();
    
    if (errors.length > 0 && !isDraft) {
      alert(`請檢查以下欄位：\n\n${errors.join('\n')}`);
      return;
    }
    
    // 更新課程對象
    const updatedCourse = {
      ...newCourse,
      status: isDraft ? 'draft' : 'active',
      generatedSessions
    };
    
    // 更新課程列表
    setCourses(courses.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    
    // 重置表單並關閉模態框
    resetCourseForm();
    setShowEditCourseModal(false);
    
    alert(`課程已${isDraft ? '儲存為草稿' : '更新'}`);
  };

  // 刪除課程
  const handleDeleteCourse = (courseId) => {
    if (confirm('確定要刪除此課程嗎？此操作無法撤銷。')) {
      setCourses(courses.filter(c => c.id !== courseId));
      alert('課程已刪除');
    }
  };

  // 重置課程表單
  const resetCourseForm = () => {
    setNewCourse({
      title: '',
      description: '',
      startDate: '',
      totalSessions: 1,
      excludeDates: [],
      endDate: '',
      status: 'draft',
      category: '',
      level: 'intermediate',
      globalSchedules: [
        {
          weekdays: [],
          startTime: '',
          endTime: '',
          instructorId: ''
        }
      ],
      sessions: [
        {
          title: '',
          classroom: '',
          materials: ''
        }
      ],
      generatedSessions: []
    });
    
    setEditingCourse(null);
  };

  // 發布課程
  const handlePublishCourse = (courseId) => {
    if (confirm('確定要發布此課程嗎？發布後將對學生可見。')) {
      setCourses(courses.map(c => c.id === courseId ? { ...c, status: 'active' } : c));
      alert('課程已發布');
    }
  };

  // 過濾課程
  const getFilteredCourses = () => {
    return courses.filter(course => {
      // 狀態過濾
      if (filterStatus !== 'all' && course.status !== filterStatus) {
        return false;
      }
      
      // 搜尋過濾
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          course.title.toLowerCase().includes(searchLower) ||
          course.description.toLowerCase().includes(searchLower) ||
          course.category.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  };

  // 獲取狀態標籤顏色
  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // 獲取狀態標籤文字
  const getStatusText = (status) => {
    switch (status) {
      case 'draft': return '草稿';
      case 'active': return '進行中';
      case 'completed': return '已完成';
      default: return '未知';
    }
  };

  // 獲取等級標籤顏色
  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // 獲取等級標籤文字
  const getLevelText = (level) => {
    switch (level) {
      case 'beginner': return '初級';
      case 'intermediate': return '中級';
      case 'advanced': return '高級';
      default: return '未知';
    }
  };

  // 格式化星期文字
  const formatWeekdays = (weekdays) => {
    const weekdayNames = {
      '0': '週日',
      '1': '週一',
      '2': '週二',
      '3': '週三',
      '4': '週四',
      '5': '週五',
      '6': '週六'
    };
    
    return weekdays.map(day => weekdayNames[day]).join('、');
  };

  // 導出課程數據
  const handleExportCourses = () => {
    const filteredCourses = getFilteredCourses();
    const coursesJson = JSON.stringify(filteredCourses, null, 2);
    
    const blob = new Blob([coursesJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `courses_export_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    alert('課程數據已導出');
  };

  return (
    <div className="space-y-6">
      {/* 標題和操作按鈕 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">課程管理</h2>
          <p className="text-sm text-gray-600 mt-1">創建和管理華語文課程</p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExportCourses}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <SafeIcon icon={FiDownload} className="text-sm" />
            <span>導出數據</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              resetCourseForm();
              setShowAddCourseModal(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <SafeIcon icon={FiPlus} className="text-sm" />
            <span>新增課程</span>
          </motion.button>
        </div>
      </div>

      {/* 過濾和搜尋 */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜尋課程標題、描述或分類..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">全部狀態</option>
          <option value="draft">草稿</option>
          <option value="active">進行中</option>
          <option value="completed">已完成</option>
        </select>
      </div>

      {/* 課程列表 */}
      {getFilteredCourses().length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredCourses().map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-white rounded-xl shadow-lg border border-gray-100/60 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 truncate pr-2">{course.title}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}>
                    {getStatusText(course.status)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <label className="block text-xs text-gray-500">開始日期</label>
                    <span className="text-sm font-medium text-gray-700">{course.startDate}</span>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">結束日期</label>
                    <span className="text-sm font-medium text-gray-700">{course.endDate}</span>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">總堂數</label>
                    <span className="text-sm font-medium text-blue-600">{course.totalSessions} 堂</span>
                  </div>
                  {course.category && (
                    <div>
                      <label className="block text-xs text-gray-500">分類</label>
                      <span className="text-sm font-medium text-blue-600">{course.category}</span>
                    </div>
                  )}
                  <div>
                    <label className="block text-xs text-gray-500">級別</label>
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${getLevelColor(course.level)}`}>
                      {getLevelText(course.level)}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-gray-500 mb-1">上課時間</label>
                  <div className="space-y-1">
                    {course.globalSchedules && course.globalSchedules.map((schedule, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-2 text-xs">
                        <div className="text-gray-800">
                          {formatWeekdays(schedule.weekdays)} {schedule.startTime}-{schedule.endTime}
                        </div>
                        <div className="text-blue-600">
                          教師: {instructors.find(i => i.id === parseInt(schedule.instructorId))?.name || '未指定'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEditCourse(course)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="編輯課程"
                    >
                      <SafeIcon icon={FiEdit2} className="text-sm" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteCourse(course.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="刪除課程"
                    >
                      <SafeIcon icon={FiTrash2} className="text-sm" />
                    </motion.button>
                  </div>
                  {course.status === 'draft' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePublishCourse(course.id)}
                      className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-xs"
                    >
                      <SafeIcon icon={FiSend} className="text-xs" />
                      <span>發布</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100/60 p-8 text-center">
          <SafeIcon icon={FiBook} className="text-4xl text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">暫無課程</h3>
          <p className="text-gray-600 mb-4">點擊"新增課程"按鈕創建第一個課程</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              resetCourseForm();
              setShowAddCourseModal(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <SafeIcon icon={FiPlus} className="inline mr-2" /> 新增課程
          </motion.button>
        </div>
      )}

      {/* 新增課程模態框 */}
      {showAddCourseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-xl sticky top-0 z-10">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">新增課程</h3>
                <button onClick={() => setShowAddCourseModal(false)}>
                  <SafeIcon icon={FiX} className="text-white text-xl" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <form className="space-y-6">
                {/* 課程基本資訊 */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <SafeIcon icon={FiBookOpen} className="mr-2 text-blue-600" />
                    課程基本資訊
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        課程標題 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newCourse.title}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="請輸入課程標題"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        課程描述
                      </label>
                      <textarea
                        rows="3"
                        value={newCourse.description}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="簡要描述課程內容和目標..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        開始日期 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={newCourse.startDate}
                        onChange={(e) => {
                          const updatedCourse = { ...newCourse, startDate: e.target.value };
                          setNewCourse(updatedCourse);
                          setTimeout(() => calculateEndDate(updatedCourse), 0);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        總堂數 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={newCourse.totalSessions}
                        onChange={(e) => handleTotalSessionsChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        排除日期
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <input
                          type="date"
                          onChange={(e) => handleExcludeDate(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex flex-wrap gap-1 mt-2">
                          {newCourse.excludeDates.map((date) => (
                            <div
                              key={date}
                              className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs"
                            >
                              <span>{date}</span>
                              <button
                                type="button"
                                onClick={() => handleExcludeDate(date)}
                                className="ml-1 text-gray-500 hover:text-red-500"
                              >
                                <SafeIcon icon={FiX} className="text-xs" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        結束日期（自動計算）
                      </label>
                      <input
                        type="date"
                        value={newCourse.endDate}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        課程分類
                      </label>
                      <input
                        type="text"
                        value={newCourse.category}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="例：商務華語、基礎華語..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        課程級別
                      </label>
                      <select
                        value={newCourse.level}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, level: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="beginner">初級</option>
                        <option value="intermediate">中級</option>
                        <option value="advanced">高級</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 全局上課時間設置 */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                      <SafeIcon icon={FiClock} className="mr-2 text-purple-600" />
                      全局上課時間設置
                    </h4>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={addGlobalSchedule}
                      className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                    >
                      <SafeIcon icon={FiPlus} className="inline mr-1 text-xs" />
                      新增時間段
                    </motion.button>
                  </div>
                  
                  <div className="space-y-4">
                    {newCourse.globalSchedules.map((schedule, scheduleIndex) => (
                      <div key={scheduleIndex} className="bg-white rounded-lg p-4 border border-purple-200">
                        <div className="flex justify-between items-center mb-4">
                          <h6 className="font-medium text-gray-900">時間段 {scheduleIndex + 1}</h6>
                          {scheduleIndex > 0 && (
                            <button
                              type="button"
                              onClick={() => removeGlobalSchedule(scheduleIndex)}
                              className="text-red-600 hover:text-red-800 p-1"
                            >
                              <SafeIcon icon={FiTrash2} className="text-sm" />
                            </button>
                          )}
                        </div>
                        
                        {/* 星期選擇 */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            上課星期 <span className="text-red-500">*</span>
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {['1', '2', '3', '4', '5', '6', '0'].map((day) => (
                              <button
                                key={day}
                                type="button"
                                onClick={() => handleWeekdayToggle(scheduleIndex, day)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  schedule.weekdays.includes(day)
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {['週日', '週一', '週二', '週三', '週四', '週五', '週六'][parseInt(day)]}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* 時間和教師選擇 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              開始時間 <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="time"
                              value={schedule.startTime}
                              onChange={(e) => handleGlobalScheduleChange(scheduleIndex, 'startTime', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              結束時間 <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="time"
                              value={schedule.endTime}
                              onChange={(e) => handleGlobalScheduleChange(scheduleIndex, 'endTime', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              選擇教師 <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-2">
                              <select
                                value={schedule.instructorId}
                                onChange={(e) => handleGlobalScheduleChange(scheduleIndex, 'instructorId', e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                              >
                                <option value="">請選擇教師</option>
                                {instructors.map((instructor) => (
                                  <option key={instructor.id} value={instructor.id}>
                                    {instructor.name} - {instructor.expertise}
                                  </option>
                                ))}
                              </select>
                              <button
                                type="button"
                                onClick={() => setShowAddInstructorModal(true)}
                                className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                              >
                                <SafeIcon icon={FiPlus} className="text-sm" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 每堂課內容設置 */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <SafeIcon icon={FiCalendar} className="mr-2 text-green-600" />
                    每堂課內容設置
                  </h4>
                  
                  <div className="space-y-4">
                    {newCourse.sessions.map((session, sessionIndex) => (
                      <div key={sessionIndex} className="bg-white rounded-lg p-4 border border-green-200">
                        <h5 className="font-semibold text-gray-900 mb-3">第 {sessionIndex + 1} 堂課</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              課程標題 <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={session.title}
                              onChange={(e) => handleSessionChange(sessionIndex, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                              placeholder="請輸入課程標題"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              虛擬教室連結
                            </label>
                            <input
                              type="text"
                              value={session.classroom}
                              onChange={(e) => handleSessionChange(sessionIndex, 'classroom', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                              placeholder="請輸入虛擬教室連結"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              教材連結
                            </label>
                            <input
                              type="text"
                              value={session.materials}
                              onChange={(e) => handleSessionChange(sessionIndex, 'materials', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                              placeholder="請輸入教材連結"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 生成的課程預覽 */}
                <button
                  type="button"
                  onClick={() => {
                    const generatedSessions = generateCourseSessions();
                    setNewCourse(prev => ({ ...prev, generatedSessions }));
                  }}
                  className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <SafeIcon icon={FiRotateCcw} className="inline mr-2" />
                  生成課程預覽
                </button>
                
                {newCourse.generatedSessions.length > 0 && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                        <SafeIcon icon={FiCalendar} className="mr-2 text-yellow-600" />
                        預覽生成的課程
                        <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                          共 {newCourse.generatedSessions.length} 堂課
                        </span>
                      </h4>
                    </div>
                    <div className="overflow-y-auto max-h-60">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">標題</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">時間</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">教師</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {newCourse.generatedSessions.map((session, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-3 py-2 text-sm text-gray-900">{session.date}</td>
                              <td className="px-3 py-2 text-sm text-gray-900">{session.title}</td>
                              <td className="px-3 py-2 text-sm text-gray-900">{session.startTime}-{session.endTime}</td>
                              <td className="px-3 py-2 text-sm text-gray-900">{session.instructorName}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 操作按鈕 */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => handleSubmitCourse(false)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <SafeIcon icon={FiSend} />
                    <span>發布課程</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => handleSubmitCourse(true)}
                    className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-xl hover:bg-gray-300 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <SafeIcon icon={FiArchive} />
                    <span>儲存為草稿</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setShowAddCourseModal(false)}
                    className="px-8 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium"
                  >
                    取消
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* 編輯課程模態框 - 與新增課程完全相同的結構 */}
      {showEditCourseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-gradient-to-r from-green-600 to-teal-700 text-white p-6 rounded-t-xl sticky top-0 z-10">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">編輯課程</h3>
                <button onClick={() => setShowEditCourseModal(false)}>
                  <SafeIcon icon={FiX} className="text-white text-xl" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <form className="space-y-6">
                {/* 課程基本資訊 - 與新增課程相同 */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <SafeIcon icon={FiBookOpen} className="mr-2 text-blue-600" />
                    課程基本資訊
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        課程標題 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newCourse.title}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="請輸入課程標題"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        課程描述
                      </label>
                      <textarea
                        rows="3"
                        value={newCourse.description}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="簡要描述課程內容和目標..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        開始日期 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={newCourse.startDate}
                        onChange={(e) => {
                          const updatedCourse = { ...newCourse, startDate: e.target.value };
                          setNewCourse(updatedCourse);
                          setTimeout(() => calculateEndDate(updatedCourse), 0);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        總堂數 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={newCourse.totalSessions}
                        onChange={(e) => handleTotalSessionsChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        排除日期
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <input
                          type="date"
                          onChange={(e) => handleExcludeDate(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex flex-wrap gap-1 mt-2">
                          {newCourse.excludeDates.map((date) => (
                            <div
                              key={date}
                              className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs"
                            >
                              <span>{date}</span>
                              <button
                                type="button"
                                onClick={() => handleExcludeDate(date)}
                                className="ml-1 text-gray-500 hover:text-red-500"
                              >
                                <SafeIcon icon={FiX} className="text-xs" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        結束日期（自動計算）
                      </label>
                      <input
                        type="date"
                        value={newCourse.endDate}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        課程分類
                      </label>
                      <input
                        type="text"
                        value={newCourse.category}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="例：商務華語、基礎華語..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        課程級別
                      </label>
                      <select
                        value={newCourse.level}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, level: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="beginner">初級</option>
                        <option value="intermediate">中級</option>
                        <option value="advanced">高級</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 全局上課時間設置 */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                      <SafeIcon icon={FiClock} className="mr-2 text-purple-600" />
                      全局上課時間設置
                    </h4>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={addGlobalSchedule}
                      className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                    >
                      <SafeIcon icon={FiPlus} className="inline mr-1 text-xs" />
                      新增時間段
                    </motion.button>
                  </div>
                  
                  <div className="space-y-4">
                    {newCourse.globalSchedules.map((schedule, scheduleIndex) => (
                      <div key={scheduleIndex} className="bg-white rounded-lg p-4 border border-purple-200">
                        <div className="flex justify-between items-center mb-4">
                          <h6 className="font-medium text-gray-900">時間段 {scheduleIndex + 1}</h6>
                          {scheduleIndex > 0 && (
                            <button
                              type="button"
                              onClick={() => removeGlobalSchedule(scheduleIndex)}
                              className="text-red-600 hover:text-red-800 p-1"
                            >
                              <SafeIcon icon={FiTrash2} className="text-sm" />
                            </button>
                          )}
                        </div>
                        
                        {/* 星期選擇 */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            上課星期 <span className="text-red-500">*</span>
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {['1', '2', '3', '4', '5', '6', '0'].map((day) => (
                              <button
                                key={day}
                                type="button"
                                onClick={() => handleWeekdayToggle(scheduleIndex, day)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  schedule.weekdays.includes(day)
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {['週日', '週一', '週二', '週三', '週四', '週五', '週六'][parseInt(day)]}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* 時間和教師選擇 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              開始時間 <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="time"
                              value={schedule.startTime}
                              onChange={(e) => handleGlobalScheduleChange(scheduleIndex, 'startTime', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              結束時間 <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="time"
                              value={schedule.endTime}
                              onChange={(e) => handleGlobalScheduleChange(scheduleIndex, 'endTime', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              選擇教師 <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-2">
                              <select
                                value={schedule.instructorId}
                                onChange={(e) => handleGlobalScheduleChange(scheduleIndex, 'instructorId', e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                              >
                                <option value="">請選擇教師</option>
                                {instructors.map((instructor) => (
                                  <option key={instructor.id} value={instructor.id}>
                                    {instructor.name} - {instructor.expertise}
                                  </option>
                                ))}
                              </select>
                              <button
                                type="button"
                                onClick={() => setShowAddInstructorModal(true)}
                                className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                              >
                                <SafeIcon icon={FiPlus} className="text-sm" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 每堂課內容設置 */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <SafeIcon icon={FiCalendar} className="mr-2 text-green-600" />
                    每堂課內容設置
                  </h4>
                  
                  <div className="space-y-4">
                    {newCourse.sessions.map((session, sessionIndex) => (
                      <div key={sessionIndex} className="bg-white rounded-lg p-4 border border-green-200">
                        <h5 className="font-semibold text-gray-900 mb-3">第 {sessionIndex + 1} 堂課</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              課程標題 <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={session.title}
                              onChange={(e) => handleSessionChange(sessionIndex, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                              placeholder="請輸入課程標題"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              虛擬教室連結
                            </label>
                            <input
                              type="text"
                              value={session.classroom}
                              onChange={(e) => handleSessionChange(sessionIndex, 'classroom', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                              placeholder="請輸入虛擬教室連結"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              教材連結
                            </label>
                            <input
                              type="text"
                              value={session.materials}
                              onChange={(e) => handleSessionChange(sessionIndex, 'materials', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                              placeholder="請輸入教材連結"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 生成的課程預覽 */}
                <button
                  type="button"
                  onClick={() => {
                    const generatedSessions = generateCourseSessions();
                    setNewCourse(prev => ({ ...prev, generatedSessions }));
                  }}
                  className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <SafeIcon icon={FiRotateCcw} className="inline mr-2" />
                  生成課程預覽
                </button>
                
                {newCourse.generatedSessions.length > 0 && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                        <SafeIcon icon={FiCalendar} className="mr-2 text-yellow-600" />
                        預覽生成的課程
                        <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                          共 {newCourse.generatedSessions.length} 堂課
                        </span>
                      </h4>
                    </div>
                    <div className="overflow-y-auto max-h-60">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">標題</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">時間</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">教師</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {newCourse.generatedSessions.map((session, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-3 py-2 text-sm text-gray-900">{session.date}</td>
                              <td className="px-3 py-2 text-sm text-gray-900">{session.title}</td>
                              <td className="px-3 py-2 text-sm text-gray-900">{session.startTime}-{session.endTime}</td>
                              <td className="px-3 py-2 text-sm text-gray-900">{session.instructorName}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 操作按鈕 */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => handleUpdateCourse(false)}
                    className="flex-1 bg-gradient-to-r from-green-600 to-teal-700 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <SafeIcon icon={FiSave} />
                    <span>更新課程</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => handleUpdateCourse(true)}
                    className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-xl hover:bg-gray-300 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <SafeIcon icon={FiArchive} />
                    <span>儲存為草稿</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setShowEditCourseModal(false)}
                    className="px-8 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium"
                  >
                    取消
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* 新增教師模態框 */}
      {showAddInstructorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-md w-full"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">新增教師</h3>
                <button onClick={() => setShowAddInstructorModal(false)}>
                  <SafeIcon icon={FiX} className="text-white text-xl" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    教師姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newInstructor.name}
                    onChange={(e) => setNewInstructor(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="請輸入教師姓名"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    電子郵件 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={newInstructor.email}
                    onChange={(e) => setNewInstructor(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="請輸入電子郵件"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    專業領域
                  </label>
                  <input
                    type="text"
                    value={newInstructor.expertise}
                    onChange={(e) => setNewInstructor(prev => ({ ...prev, expertise: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="例：商務華語、華語文法（用逗號分隔）"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleAddInstructor}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    新增教師
                  </motion.button>
                  <button
                    type="button"
                    onClick={() => setShowAddInstructorModal(false)}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    取消
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;