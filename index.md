---
layout: default
title: Network Joints
---

# Welcome to Network Joints

I'm **Shahzad Ali**, a Cisco AgenticOps product-management leader connecting AI-assisted network operations, cloud-managed switching, automation, and customer-centered technical strategy.

Explore the work:

- [AI Projects]({{ "/ai-projects-overview/" | relative_url }}) – AI, AgenticOps, RAG, and automation projects.
- [Project Overviews]({{ "/project-overviews/" | relative_url }}) – the superset portfolio across AI, networking, security, and technical leadership.

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
- **AgenticOps Product Management** – customer pain points, technical strategy, and execution
- **Agentic AI** – RAG, Bedrock Agents, MCP security, and operational automation
- **Cisco Networking** – campus switching, Catalyst Center, Meraki, and secure reference architectures

---

## Connect With Me

- [YouTube](https://www.youtube.com/@intlcloud)
- [Udemy Courses](https://www.udemy.com/user/shahzad-ali/)
- [GitHub](https://github.com/netJoints)
