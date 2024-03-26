// Function to manipulate the DOM based on task deadlines
function applyDeadlineStyling() {
    const today = new Date();
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // One week from today

    const taskDeadlineElements = document.querySelectorAll('.task .deadline');

    taskDeadlineElements.forEach(deadlineElement => {
        const taskDeadline = new Date(deadlineElement.textContent);

        // Check if task deadline is less than one week from now
        if (taskDeadline < oneWeekFromNow) {
            // Apply styling
            deadlineElement.style.backgroundColor = 'red';
            deadlineElement.style.color = 'white';
            deadlineElement.style.fontWeight = 'bold';
        }
    });
}

// Call the function to apply the styling initially
applyDeadlineStyling();