---
title: "\"Các bài đăng\""
description: "\"Blog posts\""
---

{{< rawhtml >}}
<ul class="blog-posts">
{{< /rawhtml >}}
{{ range .Pages }}
{{< rawhtml >}}
<li><span><i><time datetime="{{ .Date.Format "2006-01-02T15:04:05.000Z" }}">{{ .Date.Format "2 Jan 2006" }}</time></i></span><a href="{{ .Permalink }}">{{ .Title }}</a></li>
{{< /rawhtml >}}
{{ end }}
</ul>