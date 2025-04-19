document.addEventListener('DOMContentLoaded', () => {
    const courseContainer = document.getElementById('course-container');
    const addCourseBtn = document.getElementById('add-course');
    const calculateBtn = document.getElementById('calculate');
    const calculateAnotherBtn = document.getElementById('calculate-another');
    const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');
    const gpaValue = document.getElementById('gpa-value');
    const percentageValue = document.getElementById('percentage-value');

    addCourseBtn.addEventListener('click', () => {
        const newCourse = document.createElement('div');
        newCourse.className = 'course';
        newCourse.innerHTML = `
            <input type="text" class="course-name" placeholder="Course Name" required>
            <input type="number" class="grade" placeholder="GPA (0.00 - 4.00)" min="0" max="4" step="0.001" required>
            <input type="number" class="credits" placeholder="Credits" min="0" required>
            <button class="remove-btn">Remove</button>
        `;
        courseContainer.appendChild(newCourse);
        void newCourse.offsetWidth;
        newCourse.style.opacity = 1;
    });
    

    courseContainer.addEventListener('click', (e) => {
        if (e.target.className === 'remove-btn') {
            if (courseContainer.children.length > 1) {
                e.target.parentElement.style.animation = 'fadeOut 0.5s ease forwards';
                setTimeout(() => {
                    e.target.parentElement.remove();
                }, 500);
            }
        }
    });

    calculateBtn.addEventListener('click', () => {
        const courses = document.querySelectorAll('.course');
        let totalPoints = 0;
        let totalCredits = 0;
        courses.forEach(course => {
            const grade = parseFloat(course.querySelector('.grade').value);
            const credits = parseFloat(course.querySelector('.credits').value) || 0;
            totalPoints += grade * credits;
            totalCredits += credits;
        });

        if (totalCredits === 0) {
            gpaValue.textContent = '0.00';
            percentageValue.textContent = '0%';
            return;
        }
        const gpa = totalPoints / totalCredits;
const gpaRounded = Math.round(gpa * 1000) / 1000; 
const percentage = Math.round((gpaRounded * 20 + 20) * 100) / 100; 

gpaValue.textContent = gpaRounded.toFixed(3); 
percentageValue.textContent = `${percentage.toFixed(2)}%`;

        document.getElementById('result').style.animation = 'popUp 0.5s ease-in-out';

        calculateBtn.style.display = 'none';
        calculateAnotherBtn.style.display = 'inline-block';
    });

    courseContainer.innerHTML = `
    <div class="course">
        <input type="text" class="course-name" placeholder="Course Name" required>
        <input type="number" class="grade" placeholder="GPA (0.00 - 4.00)" min="0" max="4" step="0.001" required>
        <input type="number" class="credits" placeholder="Credits" min="0" required>
        <button class="remove-btn">Remove</button>
    </div>
`;
    toggleDarkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});
// lokma😎