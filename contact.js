document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            email: contactForm.querySelector('input[name="email"]').value,
            phone: contactForm.querySelector('input[name="text"]').value,
            package: contactForm.querySelector('select').value,
            date: contactForm.querySelector('input[type="date"]').value,
            message: contactForm.querySelector('textarea').value
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Message sent successfully! Thank you for contacting me.');
                contactForm.reset();
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });

    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navWrapper = document.querySelector('.nav-wrapper');

    menuBtn.addEventListener('click', () => {
        navWrapper.classList.toggle('active');
        // Change icon when menu is open
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !navWrapper.contains(e.target)) {
            navWrapper.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navWrapper.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
});
