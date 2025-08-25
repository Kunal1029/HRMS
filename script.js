class LeaveCalendar {
    constructor() {
        this.currentDate = new Date(2024, 8, 1); // September 2024
        this.months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        
        // Sample leave data - you can modify this
        this.leaveData = {
            '2024-9-9': true, // September 9, 2024 has leave
            // Add more leave dates as needed
        };
        
        this.selectedDay = 9; // Default selected day
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateCalendar();
    }
    
    bindEvents() {
        const prevBtn = document.getElementById('prevMonth');
        const nextBtn = document.getElementById('nextMonth');
        
        prevBtn.addEventListener('click', () => this.navigateMonth(-1));
        nextBtn.addEventListener('click', () => this.navigateMonth(1));
    }
    
    navigateMonth(direction) {
        this.currentDate.setMonth(this.currentDate.getMonth() + direction);
        this.updateCalendar();
    }
    
    getDaysInMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }
    
    getFirstDayOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    }
    
    hasLeave(year, month, day) {
        const key = `${year}-${month + 1}-${day}`;
        return this.leaveData[key] || false;
    }
    
    updateCalendar() {
        // Update month/year display
        const monthDisplay = document.getElementById('currentMonth');
        monthDisplay.textContent = `${this.months[this.currentDate.getMonth()]}, ${this.currentDate.getFullYear()}`;
        
        // Update calendar grid
        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';
        
        const daysInMonth = this.getDaysInMonth(this.currentDate);
        const firstDay = this.getFirstDayOfMonth(this.currentDate);
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            // Check if this day is selected
            const isCurrentMonth = this.currentDate.getMonth() === 8 && this.currentDate.getFullYear() === 2024;
            if (isCurrentMonth && day === this.selectedDay) {
                dayElement.classList.add('selected');
            }
            
            // Check if this day has leave
            if (this.hasLeave(this.currentDate.getFullYear(), this.currentDate.getMonth(), day)) {
                dayElement.classList.add('has-leave');
            }
            
            // Add click event
            dayElement.addEventListener('click', () => {
                // Remove previous selection
                const previousSelected = calendarGrid.querySelector('.selected');
                if (previousSelected) {
                    previousSelected.classList.remove('selected');
                }
                
                // Add selection to clicked day
                dayElement.classList.add('selected');
                this.selectedDay = day;
            });
            
            calendarGrid.appendChild(dayElement);
        }
    }
    
    // Method to add leave for a specific date
    addLeave(year, month, day) {
        const key = `${year}-${month}-${day}`;
        this.leaveData[key] = true;
        this.updateCalendar();
    }
    
    // Method to remove leave for a specific date
    removeLeave(year, month, day) {
        const key = `${year}-${month}-${day}`;
        delete this.leaveData[key];
        this.updateCalendar();
    }
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const calendar = new LeaveCalendar();
    
    // Make calendar instance globally available if needed
    window.leaveCalendar = calendar;
});

// Additional utility functions

// Function to format date
function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
}

// Function to handle responsive behavior
function handleResize() {
    // Add any responsive logic here if needed
    const container = document.querySelector('.calendar-container');
    const windowWidth = window.innerWidth;
    
    if (windowWidth <= 360) {
        container.classList.add('small-screen');
    } else {
        container.classList.remove('small-screen');
    }
}

// Listen for window resize
window.addEventListener('resize', handleResize);
document.addEventListener('DOMContentLoaded', handleResize);