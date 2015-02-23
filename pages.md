---
layout: page
title: Pages
---

<div class="posts">
  {% for post in site.pages %}
  <div class="post">
    <h1 class="post-title">
      <a href="{{ post.url }}">
        {{ post.title }}
      </a>
    </h1>

    {{ post.content }}
  </div>
  {% endfor %}
</div>
