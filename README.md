# 🌐 Progressive Image Gallery – Mobile Optimization Mini Project

This project is a **static, responsive image gallery** that uses **lazy loading** and **searchable tags** to optimize image loading for mobile devices.

Built as part of our Mobile Optimization Mini Project, it simulates a Pinterest-style interface with performance-first best practices like low-res preview images, high-res lazy loading, and real-time search filtering.

---

## 🚀 Features

- 📱 Mobile-friendly, performance-optimized layout
- 🖼️ Lazy loading of high-resolution images via Intersection Observer API
- 🧠 Smart filtering using `alt` tags with a dynamic search bar and tag checkboxes
- ⚡ Seamless transition from low-res preview to high-res image
- 🗂️ Organized project structure for scalability and clarity

---

## 🏗️ Folder Structure

progressive-image-gallery/
├── index.html
├── README.md
│
├── /assets/
│ └── /images/
│ ├── /high-res/ → Full-quality images (e.g., img01-high.webp)
│ └── /low-res/ → Blurred/low-res previews (e.g., img01-low.webp)
│
├── /css/
│ └── style.css → Styles for layout, responsiveness, hover effects
│
├── /js/
│ ├── lazyload.js → JS for lazy loading logic using IntersectionObserver
│ └── search.js → JS for tag-based image search and filtering
│
└── /lib/ → (Optional) Third-party libraries (e.g., Masonry.js)

## Team Members
- Hirthikk 42130695
- Nancy    ECE
- Ashwanth 42130682
- Priya v 42130360
- Priya Dharshini
## Team Roles and Contributions

Name            | Role                           | Responsibilities                                                                 
----------------|--------------------------------|---------------------------------------------------------------------------------- 
H (Team Lead)   | Integration & Lazy Loading     | Project setup, integration, Intersection Observer for lazy loading, final testing, GitHub management 
Nancy           | Frontend – HTML Layout         | Builds base index.html, image grid layout, and HTML structure                  
Priya V         | Frontend – CSS Styling         | Styles Pinterest-like layout, responsive design, transitions, and hover effects. Assists with integration if time permits 
Ashwanth        | Lazy Loading Logic             | Implements Intersection Observer API for lazy loading images. Documents lazy loading setup and usage in README.md 
Priya Dharshini | Assets & Optimization          | Collects, optimizes, and organizes images (low-res + high-res). Compresses images and ensures efficient formats (e.g., WebP). Ensures consistent naming conventions and tests images. Collaborates on integrating images with layout and lazy loading system
