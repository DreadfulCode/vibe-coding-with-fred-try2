---
title: "Getting Started with Modern React Patterns"
description: "Learn the latest React patterns and best practices for building scalable applications in 2025."
pubDate: 2025-04-10
image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
tags: ["react", "javascript", "frontend"]
featured: true
---

## Contents

## Introduction

React has evolved significantly over the years, and keeping up with modern patterns is essential for building maintainable and efficient applications. In this post, we'll explore some of the most useful patterns in React development for 2025.

### Why Modern Patterns Matter

Using the right patterns can:

- Reduce code duplication
- Improve performance
- Make components more reusable
- Simplify testing and maintenance

## Compound Components

Compound components are a pattern where components are used together such that they share an implicit state that lets them communicate with each other in the background.

### Example of Compound Components

Let's create a simple Tab component:

```jsx
// Tab.jsx
import React, { createContext, useState, useContext } from 'react';
import { useState } from 'react';
const TabContext = createContext();

export function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs-container">
        {children}
      </div>
    </TabContext.Provider>
  );
}

export function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

export function Tab({ children, value }) {
  const { activeTab, setActiveTab } = useContext(TabContext);
  
  return (
    <button 
      className={`tab ${activeTab === value ? 'active' : ''}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

export function TabPanels({ children }) {
  return <div className="tab-panels">{children}</div>;
}

export function TabPanel({ children, value }) {
  const { activeTab } = useContext(TabContext);
  
  return activeTab === value ? <div className="tab-panel">{children}</div> : null;
}
```

Now you can use these components together:

```jsx
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './Tab';

function MyTabs() {
  return (
    <Tabs defaultTab="tab1">
      <TabList>
        <Tab value="tab1">First Tab</Tab>
        <Tab value="tab2">Second Tab</Tab>
        <Tab value="tab3">Third Tab</Tab>
      </TabList>
      
      <TabPanels>
        <TabPanel value="tab1">
          <h2>First Tab Content</h2>
          <p>This is the content for the first tab.</p>
        </TabPanel>
        <TabPanel value="tab2">
          <h2>Second Tab Content</h2>
          <p>Content for the second tab goes here.</p>
        </TabPanel>
        <TabPanel value="tab3">
          <h2>Third Tab Content</h2>
          <p>And here's the content for the third tab.</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
```

## Custom Hooks for Logic Reuse

Custom hooks are one of the most powerful features in React. They allow you to extract component logic into reusable functions.

### Example: useLocalStorage Hook

```javascript
function useLocalStorage(key, initialValue) {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}
```

## Server Components and React Server Actions

React Server Components are a game-changer for data fetching and rendering. They allow components to run on the server, reducing bundle sizes and improving performance.

### Example of Using Server Components

```jsx
// This is a Server Component
async function BlogPost({ slug }) {
  const post = await fetchBlogPost(slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div className="metadata">
        <span>Posted on {post.date}</span>
        <span>By {post.author}</span>
      </div>
      <div className="content">{post.content}</div>
    </article>
  );
}
```

## Conclusion

Modern React patterns help us build more maintainable, performant, and developer-friendly applications. By leveraging patterns like compound components, custom hooks, and server components, we can create better user experiences while keeping our code clean and reusable.

Stay tuned for more in-depth explorations of these patterns in future posts!