<?php
$blogDir = __DIR__; // 현재 blog 폴더 경로
$files = scandir($blogDir);
$blogs = [];

foreach ($files as $file) {
    if (preg_match('/^\\d{4}-\\d{2}-\\d{2}\\.html$/', $file)) {
        $date = str_replace(".html", "", $file);
        $title = str_replace("-", "/", $date) . " 블로그 글"; // 기본 제목
        $blogs[] = ["date" => $date, "title" => $title, "url" => "blog/" . $file];
    }
}

// 최신순 정렬
usort($blogs, function ($a, $b) {
    return strtotime($b['date']) - strtotime($a['date']);
});

// JSON 출력
header('Content-Type: application/json');
echo json_encode($blogs, JSON_PRETTY_PRINT);
?>