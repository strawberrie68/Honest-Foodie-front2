![Screenshot of Honest Foodie](https://github.com/strawberrie68/Honest-Foodie-front2/assets/42231000/bb8ddcf5-c493-46b2-8f48-479f28581a1f)

# 🍦 Honest Foodie

![Honest Foodie](https://github.com/strawberrie68/Honest-Foodie-front2/assets/42231000/52deeb0d-7f5f-454e-a31a-8e279c899705)
&nbsp;

## Table of Contents

1. [Project Info](#project-info)
2. [Project Links](#project-links)
3. [Tech Stack](#tech-stack)
4. [Future Improvements And Reflections](#future-improvements-and-reflections)

   - [Standardizing Icon Sizes](#1-standardizing-icon-sizes)
   - [Using clsx to Organize Tailwind Classes](#2-using-clsx-to-organize-tailwind-classes)
   - [Improving Tab Navigation: UX & Accessibility](#3-improving-tab-navigation-ux--accessibility)

   - [Update the design for better contrast on picture](#4-update-the-design-for-better-contrast-on-picture)
   - [Design margin](#5-design-margin)
   - [Create a Shared Layout Component](#6-create-a-shared-layout-component)

5. [Things I Learned](#things-i-learned)

   - [Why I Switched from MongoDB to PostgreSQL](#why-i-switched-from-mongodb-to-postgresql)
   - [The Switch to Prisma and PostgreSQL](#the-switch-to-prisma-and-postgresql)
   - [The Importance of Avoiding Non-Functional Feature](#the-importance-of-avoiding-non-functional-feature)

6. [Conclusion](#conclusion)

   &nbsp;

🧠 TL;DR :

> ⛰ Honest Foodie is a recipe review social media app I began while self-teaching myself web development. I got stuck — Git issues, an overly complex backend due to my lack of knowledge in the type of databases — and eventually paused it. After completing a bootcamp, I came back with fresh knowledge and challenged myself to fix the features I couldn’t before. This version is still an MVP, but it represents a big win: I finished something I once couldn’t. Since then, I’ve grown even more — and in the repo, I’ve noted what I’d now approach differently, especially around accessibility, structure, and reusability. It’s not perfect, but it’s proof of my growth.

&nbsp;

## Project Info

### 🍦 Why I built Honest Foodie

Before I knew how to code, I’d often try recipes online—only to realize they looked good, but didn’t _taste_ good. I started wondering:

> "What if there was a community where people reviewed recipes not for clicks, but for **actual flavor**?"

That idea sparked **Honest Foodie** — a web app where users can post and review recipes from any platform, based solely on how delicious they are.

This was also my chance to put everything I’d learned into practice — and then push myself even further.

---

&nbsp;

## Project Links

- [<kbd><img src="https://cdn-icons-png.flaticon.com/128/527/527589.png" height="12px" /> Frontend Repository</kbd>](https://github.com/strawberrie68/Honest-Foodie-front2)
- [<kbd><img src="https://cdn-icons-png.flaticon.com/128/527/527589.png" height="12px" /> Old Backend Repository</kbd>](https://github.com/strawberrie68/Honest-Foodie-backend)
- [<kbd><img src="https://cdn-icons-png.flaticon.com/128/527/527589.png" height="12px" /> New Backend Repository</kbd>](https://github.com/strawberrie68/honest-foodie-backend-relational)
- [<kbd><img src="https://cdn-icons-png.flaticon.com/128/527/527589.png" height="12px" /> Live Site</kbd>](https://leafy-marshmallow-52ef5f.netlify.app/)

&nbsp;

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Redux
- **Backend:** Node.js, Express, Prisma ORM
- **Database:** MongoDB → PostgreSQL (more below!)
- **Deployment:** Netlify (frontend), Supabase (backend)

---

## Future Improvements And Reflections

### 🛠️ Fixes

This project was created during my self-learning journey, before attending a web development bootcamp. Since then, I’ve grown significantly in both coding skills and design thinking. Although I haven’t had time to fully refactor everything, here are the improvements I’d make if I were to revisit this project today — and why they matter.

---

&nbsp;

### 1. **Standardizing Icon Sizes**

**Before:**

```jsx
<CaretLeft size={28} />
```

**Issue:** Inconsistent icon sizes across components.

**After (Improvement):**

```jsx
const IconSize = {
  small: 18,
  medium: 20,
  large: 24,
  xLarge: 28,
};
```

```jsx
<CaretLeft size={IconSize.xLarge} />
```

#### 🕵️‍♀️ Why It's an Improvement

- **Consistency**: Centralized control of icon sizes means no more `"magic numbers"` scattered throughout the code.

- Clarity: `IconSize.xLarge` is self-explanatory, while 28 isn’t.

- Maintainability: Update one value, and every x-large icon updates automatically.

---

&nbsp;

### 2. Using `clsx` to Organize Tailwind Classes

**Before:**

```jsx
<div className="flex items-center justify-between px-4 py-2 bg-white text-sm rounded-lg shadow-md hover:bg-gray-50 transition duration-200">
```

**After:**

```tsx
import clsx from "clsx";

const cardStyles = clsx(
  "flex items-center justify-between",
  "px-4 py-2",
  "bg-white text-sm rounded-lg shadow-md",
  "hover:bg-gray-50 transition duration-200"
);

<div className={cardStyles}>
```

#### Why It’s Better:

- Cleaner and more readable.
- Easier to manage when styles get complex.
- Helps with reusability and debugging.

---

&nbsp;

### 3. Improving Tab Navigation: UX & Accessibility

**Before:**
A basic button-based category filter with minimal accessibility.

```jsx
<nav className="grid w-full grid-cols-4 gap-1 overflow-x-scroll sm:flex sm:w-[500px] sm:grid-cols-5">
  {categoriesIconOnly.map(({ name, icon }) => (
    <button
      key={name}
      onClick={() => handleCategoryClick(name)}
      className={`CategoryCard outline-none`}
      aria-label={`Filter by ${name} category`}
    >
      <CategoryCard
        icon={icon}
        name={name}
        isSelected={selectedCategory === name}
      />
    </button>
  ))}
</nav>
```

Category Card Component

```jsx
<div className="m-px flex flex-col items-center justify-center p-4">
  <div className="flex h-[50px] w-[50px] items-center justify-center rounded-3xl bg-primary-gray-100 text-2xl">
    <span>{icon}</span>
    <p className="mt-2 text-xxs font-semibold">{name}</p>
  </div>
</div>
```

&nbsp;

**Improvement Goals:**

- Add hover and selected visual states.
- Follow proper ARIA roles for accessible tab systems.
- Support keyboard navigation (←, →, Home, End).
- Use semantic HTML and dynamic class handling.

**💡 Highlights of the Updated Design:**

- Uses aria-selected, tabIndex, role="tablist" etc.
- Supports keyboard navigation.
- Improves visual feedback and mobile responsiveness.
- Icons now have aria-hidden for screen readers.
- Selection and hover states are visually distinct.

```jsx
const CategoryCard = ({ icon, name, isSelected }) => {
  return (
    <div
      className={`
        group m-px flex flex-col items-center justify-center rounded-lg p-4
      `}
      aria-selected={isSelected}
    >
      <div
        className={`
          flex h-[50px] w-[50px] items-center justify-center
          rounded-3xl text-2xl transition-colors duration-200
          ${
            isSelected
              ? "bg-primary-600 text-white shadow-md shadow-gray-400"
              : "bg-primary-gray-100 group-hover:bg-primary-gray-300"
          }
        `}
      >
        <span aria-hidden="true">{icon}</span>
      </div>
      <p
        className={`mt-2 text-xxs font-semibold ${isSelected ? "text-primary-600" : ""}`}
      >
        {name}
      </p>
    </div>
  );
};
```

✅ Result: More intuitive, inclusive, and polished navigation.

---

&nbsp;

### 4. Improving Image Contrast for Text Readability

Problem:
Text overlaying images was often unreadable due to poor contrast.

Before:

```jsx
const RecipeCard = ({ title, image }) => {
  return (
    <div className="relative h-64 w-80 overflow-hidden rounded-xl shadow-lg">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute bottom-4 left-4 z-10">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
    </div>
  );
};
```

**After:**

```jsx
const RecipeCard = ({ title, image }) => {
  return (
    <div className="relative h-64 w-80 overflow-hidden rounded-xl shadow-lg">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      {/* Text with Shadow */}
      <div className="absolute bottom-4 left-4 z-20">
        <h3 className="text-xl font-semibold text-white drop-shadow-md">
          {title}
        </h3>
      </div>
    </div>
  );
};
```

**Why It’s Better:**

- A gradient overlay improves contrast.
- Text shadow ensures legibility on various backgrounds.
- Elevates the overall visual quality without losing the image’s impact.

---

&nbsp;

### 5. Standardizing Margins & Using Containers

In the current design, the lack of a standardized container has caused inconsistencies with spacing and alignment across different sections. To improve this, I would introduce a consistent container and margin system. By using a Layout component to wrap content, I can ensure that each page follows the same structure, reducing layout shifts and improving overall design consistency.

### 👩‍💻 Plan for Future Implementation:

- Create a Layout component that wraps content and enforces standardized margins.
- Define a consistent container width and responsive behavior for different screen sizes.
- Ensure that the layout components are reusable across different pages to keep the design cohesive and maintainable.

By implementing a standardized layout, I can maintain consistent margins across all pages, providing a cleaner and more cohesive user experience.

---

&nbsp;

### 6. Create a Shared Layout Component

Why:

- Avoids repetitive layout structures across pages.
- Keeps the NavBar and global structure consistent.
- Makes future layout adjustments easier.

**Example:**

```jsx
const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-5xl px-4">{children}</main>
    </>
  );
};
```

**Result:** Cleaner, DRY-er, and easier to maintain page structure.

---

&nbsp;

## Things I Learned

### Why I Switched from MongoDB to PostgreSQL

**👩‍🔧 My MongoDB Experience (And What Broke)**

When I first built the backend, I used MongoDB. It felt simple — no strict schemas, easy to get started. But I quickly hit problems:

- I had to do **manual aggregation** to get things like top or trending recipes.
- Fetching related data (like users and their reviews) became messy.
- I was doing **too much filtering and combining data on the frontend**.

It became clear: my data was relational, and MongoDB was fighting me.

&nbsp;

### The Switch to Prisma and PostgreSQL

🧠 Changing to a relational database was _transformative_:

- I could define relationships **clearly and safely**.
- Writing queries became **1-2 lines**, not 10+.
- Prisma’s schema helped me **catch mistakes early** with type safety.
- Everything just felt more structured.
- Performance and reliability improved significantly.
- Schema enforcement helped maintain data integrity.

It wasn’t just a new tool — it changed how I **think about data**.
This wasn’t just a change in technology—it was a mindset shift in how I approach data modeling and backend logic. Choosing the right database architecture early on can make or break developer efficiency.

&nbsp;

### The Importance of Avoiding Non-Functional Feature

#### ♺ Importance of Feedback to the user

After reviewing Honest Foodie, I realized that some decisions I made earlier, like adding non-functional features, weren't the best choice. For example, I included an "edit" button and a URL scraper that didn’t actually work. At the time, I thought these features would give users a glimpse of the app's potential and future capabilities. However, looking back, I see how adding incomplete or non-functional features can confuse users and make the app seem unreliable.

Now, I understand that it's crucial not to introduce features that aren't fully functional. Even though it may seem tempting to showcase potential, leaving unfinished features in place can frustrate users and erode trust in the product. Moving forward, I will make sure that everything I add is either fully implemented or not included at all. Consistent, reliable user feedback — like hover states, default states, and visual cues — is key to building a solid user experience that users can trust and engage with confidently.

---

&nbsp;

## Conclusion

### ✨ Final Thoughts and Overview

This project spans my whole learning journey — from self-taught to bootcamp to post-grad. It’s where I first experimented with React, where I hit my limits, and where I returned stronger to push past them. Fixing this project after bootcamp wasn’t just about shipping features — it was about proving to myself that I could. I’ve since learned even more and noted what I’d now improve in the repo. Honest Foodie remains a snapshot of where I was, how far I’ve come, and how much I care about learning and leveling up.
