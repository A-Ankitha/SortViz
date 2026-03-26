# 📊 SortViz — Interactive Sorting Visualizer

An interactive, web-based visualization tool designed to demonstrate the inner workings of fundamental sorting algorithms. Built with **React** and deployed via **GitHub Pages**, this project bridges the gap between theoretical complexity and practical execution.

🚀 **[View Live Demo](https://A-Ankitha.github.io/SortViz/)**

---

## 🛠️ Tech Stack
* **Frontend:** React.js (Hooks, Functional Components)
* **Styling:** Modern CSS3 (Flexbox, Dynamic Transitions)
* **Algorithms:** JavaScript ES6+ (Asynchronous Animation Engine)
* **Deployment:** GitHub Pages / `gh-pages`

---

## ✨ Features
* **Real-Time Visualization:** Watch the bars move, swap, and compare with distinct color-coding.
* **Manual Input Mode:** Test specific edge cases by entering custom comma-separated numbers (e.g., `10, 50, 30`).
* **Dynamic Scalability:** Use the slider to adjust the array size ($n$) from 5 to 50 elements.
* **Speed Control:** Throttled animation speed from 1x to 5x.
* **Live Analytics:** Real-time counters for **Comparisons** and **Swaps**.

---

## 🧠 Supported Algorithms & Analysis
| Algorithm | Time Complexity (Avg) | Space Complexity | Best For |
| :--- | :--- | :--- | :--- |
| **Bubble Sort** | $O(n^2)$ | $O(1)$ | Educational simplicity |
| **Selection Sort** | $O(n^2)$ | $O(1)$ | Minimizing swap operations |
| **Insertion Sort** | $O(n^2)$ | $O(1)$ | Small or nearly sorted data |
| **Merge Sort** | $O(n \log n)$ | $O(n)$ | Stability and large datasets |
| **Quick Sort** | $O(n \log n)$ | $O(\log n)$ | General purpose high-speed sorting |
| **Heap Sort** | $O(n \log n)$ | $O(1)$ | Memory-constrained environments |

---

## 🎨 Color Guide
* <kbd>█</kbd> **Purple:** Default state / Unsorted
* <kbd>█</kbd> **Red:** Comparison in progress
* <kbd>█</kbd> **Yellow:** Swap / Overwrite operation
* <kbd>█</kbd> **Green:** Sorted position confirmed

---

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/A-Ankitha/SortViz.git](https://github.com/A-Ankitha/SortViz.git)

2. **Install dependencies:**
   ```bash
   npm install

3. **Start the development server:**
   ```bash
   npm start

4. **Build and Deploy:**
   ```bash
   npm run deploy