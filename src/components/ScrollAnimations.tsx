
import React, { useEffect } from 'react';

const ScrollAnimations = () => {
  useEffect(() => {
    // Function to handle elements that animate on scroll
    const handleScrollAnimations = () => {
      // Select all elements with the animate-on-scroll class
      const animateElements = document.querySelectorAll('.animate-on-scroll');
      const staggerContainers = document.querySelectorAll('.animated-section');
      
      // Create an IntersectionObserver for smooth animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          // Add the is-visible class when the element is in the viewport
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            
            // If it's a staggered animation container, add active class
            if (entry.target.classList.contains('animated-section')) {
              entry.target.classList.add('is-active');
            }
            
            // Stop observing once the animation has played
            // Comment this out if you want animations to replay when scrolling back up
            // observer.unobserve(entry.target);
          } else {
            // Optional: Remove the class when scrolling back up
            // entry.target.classList.remove('is-visible');
            // if (entry.target.classList.contains('animated-section')) {
            //   entry.target.classList.remove('is-active');
            // }
          }
        });
      }, {
        root: null, // viewport
        threshold: 0.1, // 10% of the item must be visible
        rootMargin: '-50px 0px' // trigger animation slightly before elements come into view
      });
      
      // Observe all elements with the animate-on-scroll class
      animateElements.forEach((element) => {
        observer.observe(element);
      });
      
      // Observe all stagger containers
      staggerContainers.forEach((container) => {
        observer.observe(container);
      });
      
      // Apply staggered visibility classes for elements that have them on page load
      document.querySelectorAll('.stagger-item').forEach((element, index) => {
        const delay = (index % 5) + 1;
        element.classList.add(`stagger-delay-${delay}`);
      });
      
      // Find all elements with a delay class already applied and add the stagger-visible class
      const visibleElements = document.querySelectorAll('[class*="stagger-delay-"]');
      setTimeout(() => {
        visibleElements.forEach(element => {
          element.classList.add('stagger-visible');
        });
      }, 100);
      
      return () => {
        // Clean up
        animateElements.forEach((element) => {
          observer.unobserve(element);
        });
        staggerContainers.forEach((container) => {
          observer.unobserve(container);
        });
      };
    };

    // Initialize scroll animations
    handleScrollAnimations();
    
    // Apply initial animations for above-the-fold content
    setTimeout(() => {
      document.querySelectorAll('.stagger-item').forEach(element => {
        element.classList.add('stagger-visible');
      });
    }, 100);
    
    // Apply smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the target element
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          // Smooth scroll to the target
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
    
    // Clean up event listeners
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    };
  }, []);

  // This component doesn't render anything, it just adds the behavior
  return null;
};

export default ScrollAnimations;
