async function loadLayout() {
    try {
        // Load Header
        const navRes = await fetch('components/header.html');
        const navData = await navRes.text();
        document.getElementById('header-placeholder').innerHTML = navData;

        // Load Footer
        const footRes = await fetch('components/footer.html');
        const footData = await footRes.text();
        document.getElementById('footer-placeholder').innerHTML = footData;
    } catch (error) {
        console.error("Error loading layout components:", error);
    }
}

loadLayout();

// Filmography toggle function
function toggleFilmography(button) {
    const container = document.getElementById('full-filmography');
    const isHidden = container.style.display === 'none' || container.style.display === '';
    
    if (isHidden) {
        // Show loading state
        container.innerHTML = '<p class="text-muted text-center">Loading...</p>';
        container.style.display = 'block';
        button.textContent = 'Loading...';
        
        // Load the filmography.html file
        fetch('components/filmography.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                container.innerHTML = data;
                button.textContent = 'Show Less';
            })
            .catch(error => {
                console.error('Error loading filmography:', error);
                container.innerHTML = '<p class="text-muted text-center">Error loading projects. Please try again.</p>';
                button.textContent = 'View All Film Projects';
            });
    } else {
        // Hide the container
        container.style.display = 'none';
        container.innerHTML = ''; // Clear content
        button.textContent = 'View All Film Projects';
    }
}
