async function loadIntro() {

    function typeWriterBulletPoints(points, speed) {
        let pointIndex = 0;  // Start with the first bullet point
    
        function typePoint(point) {
            let i = 0;  // Index of the current character in the bullet point
            const ul = intro_container.append("ul");  // Append a list element to the container
            const li = ul.append("li");  // Append a list item for the bullet point
    
            function typeChar() {
                if (i < point.length) {
                    li.text(li.text() + point.charAt(i));  // Append next character
                    i++;  // Increment character index
                    setTimeout(typeChar, speed);  // Schedule next character
                } else if (pointIndex < points.length - 1) {
                    pointIndex++;  // Move to next bullet point
                    typePoint(points[pointIndex]);  // Start typing next bullet point
                }
            }
    
            typeChar();  // Start typing characters of the current bullet point
        }
    
        if (points.length > 0) {
            typePoint(points[pointIndex]);  // Start with the first bullet point
        }
    }
    
    const bulletPoints = [
        "Founded in 1993: Transitioned from basic graphics card manufacturer to AI technology leader.",
        "Stock Performance: Significant appreciation, reflecting role in gaming, visualization, and data centers.",
        "GPU Innovations: Launched world's first GPU, continually sets new standards.",
        "Technology Impact: Essential for real-time ray tracing and AI applications.",
        "Visualization Focus: Examines stock and technological evolution, highlighting key milestones."
    ];
    
    typeWriterBulletPoints(bulletPoints, 50);
}
