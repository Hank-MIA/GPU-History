async function loadIntro() {
    intro_container.html("");
    intro_container.append("h1")
        .text("NVIDIA Stock Trend Visualization")
        .style("text-align", "center");

    function typeWriterBulletPoints(points, speed) {
        let pointIndex = 0;

        function typePoint(point) {
            if (skipAnimation) {
                const ul = intro_container.append("ul");
                ul.append("li").text(point);
                pointIndex++;
                if (pointIndex < points.length) {
                    typePoint(points[pointIndex]);
                } else {
                    skipAnimation = false;
                }
                return;
            }
            let i = 0;
            const ul = intro_container.append("ul");
            const li = ul.append("li");
    
            function typeChar() {
                if (skipAnimation){
                    li.text(point)
                    pointIndex++;
                    typePoint(points[pointIndex]);
                }
                else if (i < point.length) {
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
    ];
    
    typeWriterBulletPoints(bulletPoints, 50);
}
