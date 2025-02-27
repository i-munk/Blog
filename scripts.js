document.addEventListener("DOMContentLoaded", function () {
    fetch("blog/blog-list.json") // ✅ JSON 파일 가져오기
        .then(response => response.json())
        .then(blogs => {
            let blogList = document.getElementById("latest-blogs");
            blogList.innerHTML = ""; // 기존 목록 초기화

            if (blogs.length === 0) {
                blogList.innerHTML = "<li>등록된 블로그 글이 없습니다.</li>";
                return;
            }

            // ✅ 최신순 정렬
            blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

            // ✅ 블로그 목록 추가
            blogs.forEach(blog => {
                let li = document.createElement("li");
                let a = document.createElement("a");
                a.href = `blog/${blog.url}`;
                a.textContent = `${blog.date} - ${blog.title}`;
                li.appendChild(a);
                blogList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("❌ 블로그 데이터를 불러오는 중 오류 발생:", error);
            document.getElementById("latest-blogs").innerHTML = "<li>블로그 데이터를 불러올 수 없습니다.</li>";
        });
});