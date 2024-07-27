async function loadIntro() {
    
    intro_container.append("h1")
        .text("NVIDIA: A Journey Through Innovation")
        .style("text-align", "center");

    function typeWriterBulletPoints(points, speed) {
        let pointIndex = 0;
    
        function typePoint(point) {
            let i = 0;
            const ul = intro_container.append("ul");
            const li = ul.append("li");
    
            function typeChar() {
                if (i < point.length) {
                    li.text(li.text() + point.charAt(i));
                    i++;
                    setTimeout(typeChar, speed);
                } else if (pointIndex < points.length - 1) {
                    pointIndex++;
                    typePoint(points[pointIndex]);
                }
            }
    
            typeChar();
        }
    
        if (points.length > 0) {
            typePoint(points[pointIndex]);
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
