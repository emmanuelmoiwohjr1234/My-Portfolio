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
                alert('Message sent successfully!');
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
});
