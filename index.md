---
layout: default
title: Network Joints
---

# Welcome to Network Joints

Cloud Networking, Security, and Infrastructure Insights by Shahzad Ali.

---

## Recent Posts

<ul>
{% for post in site.posts limit:10 %}
  <li>
    <strong><a href="{{ post.url | relative_url }}">{{ post.title }}</a></strong><br>
    <small>{{ post.date | date: "%B %d, %Y" }}</small>
    {% if post.excerpt %}
    <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
    {% endif %}
  </li>
{% endfor %}
</ul>

---

## All Posts

| Date | Title |
|------|-------|
{% for post in site.posts %}| {{ post.date | date: "%Y-%m-%d" }} | [{{ post.title }}]({{ post.url | relative_url }}) |
{% endfor %}

---

## Topics Covered

- **Cloud Networking**: AWS, GCP, Azure, Multi-Cloud Architecture
- **Security**: Zero Trust, IAM, Privileged Access Management
- **Aviatrix**: Transit Networks, FireNet, CloudWAN
- **Britive**: JIT Access, Access Broker, Cloud PAM
- **Kubernetes**: EKS, GKE, AKS Security
- **Agentic AI**: Bedrock Agents, MCP Security

---

[View on GitHub](https://github.com/netJoints/netjoints.github.io)
