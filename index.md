---
layout: default
title: Network Joints
---

# Welcome to Network Joints

I'm **Shahzad Ali**, sharing insights on Cloud Networking, Security, and Infrastructure.

---

## Recent Posts

<ul class="post-list">
{% for post in site.posts limit:10 %}
  <li>
    <span class="post-date">{{ post.date | date: "%B %d, %Y" }}</span>
    <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    {% if post.excerpt %}
    <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 40 }}</p>
    {% endif %}
  </li>
{% endfor %}
</ul>

[View All Posts →]({{ "/blog" | relative_url }})

---

## Topics I Cover

- **Cloud Networking** – AWS, GCP, Azure, Multi-Cloud Architecture
- **Security** – Zero Trust, IAM, Privileged Access Management  
- **Aviatrix** – Transit Networks, FireNet, CloudWAN
- **Britive** – JIT Access, Access Broker, Cloud PAM
- **Kubernetes** – EKS, GKE, AKS Security
- **Agentic AI** – Bedrock Agents, MCP Security

---

## Connect With Me

- [YouTube](https://www.youtube.com/@intlcloud)
- [Udemy Courses](https://www.udemy.com/user/shahzad-ali/)
- [GitHub](https://github.com/netJoints)
