// Enhance the hero area with playful animations
function addPlayfulAnimations() {
    // Add subtle floating animation to all buttons
    const allButtons = document.querySelectorAll('.btn, .language-bubble, .app-download-btn');
    allButtons.forEach((btn) => {
      btn.addEventListener('mouseover', function() {
        this.classList.add('hover-effect');
      });
      
      btn.addEventListener('mouseout', function() {
        this.classList.remove('hover-effect');
      });
    });
    
    // Typewriter effect for the highlighted word
    const highlightedWord = document.querySelector('.highlight');
    if (highlightedWord) {
      const words = ['playful', 'smart', 'adaptive', 'fun'];
      let wordIndex = 0;
      
      setInterval(() => {
        highlightedWord.classList.add('changing');
        
        setTimeout(() => {
          wordIndex = (wordIndex + 1) % words.length;
          highlightedWord.textContent = words[wordIndex];
          highlightedWord.classList.remove('changing');
        }, 500);
      }, 3000);
    }
    
    // Add floating animation to mascot image
    const mascotImage = document.querySelector('.mascot-image');
    if (mascotImage) {
      mascotImage.classList.add('floating');
    }
    
    // Add ripple effect to primary buttons
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size/2;
        const y = e.clientY - rect.top - size/2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }