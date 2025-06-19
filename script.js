// Enhanced Past Events Blog with Mobile-First Responsive Design

// ===== MOBILE OPTIMIZATION AND TOUCH SUPPORT =====

// Detectar si es dispositivo móvil
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0

// Variables para mejorar el rendimiento
let resizeTimer
let scrollTimer
const isScrolling = false

// Optimización de eventos de scroll
function throttle(func, limit) {
    let inThrottle
    return function () {
        const args = arguments

        if (!inThrottle) {
            func.apply(this, args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}

// Presentation data
const presentations = {
    "industrial-revolution": {
        title: "Industrial Revolution: Changing Society Forever",
        slides: [
            "industrial-1.png",
            "industrial-2.png",
            "industrial-3.png",
            "industrial-4.png",
            "industrial-5.png",
            "industrial-6.png",
            "industrial-7.png",
            "industrial-8.png",
        ],
        audio: "Jesús Olascuaga.aac",
    },
    "pompeii-destruction": {
        title: "The Destruction of Pompeii",
        slides: [
            "pompeii-1.png",
            "pompeii-2.png",
            "pompeii-3.png",
            "pompeii-4.png",
            "pompeii-5.png",
            "pompeii-6.png",
            "pompeii-7.png",
        ],
        audio: "pompeii.mp3",
    },
    "palace-justice": {
        title: "The Siege of the Palace of Justice",
        slides: [
            "palace-1.png",
            "palace-2.png",
            "palace-3.png",
            "palace-4.png",
            "palace-5.png",
            "palace-6.png",
            "palace-7.png",
            "palace-8.png",
        ],
        audio: "palace.mp3",
    },
    hitler: {
        title: "World War II: A Global Conflict",
        slides: [
            "hitler-1.png",
            "hitler-2.png",
            "hitler-3.png",
            "hitler-4.png",
            "hitler-5.png",
            "hitler-6.png",
            "hitler-7.png",
            "hitler-8.png",
            "hitler-9.png",
            "hitler-10.png",
        ],
        audio: "hitler.mp3",
    },
    bicycle: {
        title: "The Invention of the Bicycle",
        slides: [
            "lost-1.png",
            "lost-2.png",
            "lost-3.png",
            "lost-4.png",
            "lost-5.png",
        ],
        audio: "bicycle.mp3",
    },
    towers: {
        title: "The Twin Towers: A Symbol of Resilience",
        slides: [
            "towers-1.png",
            "towers-2.png",
            "towers-3.png",
            "towers-4.png",
            "towers-5.png",
            "towers-6.png",
            "towers-7.png",
            "towers-8.png",
        ],
        audio: "towers.ogg",
    },
    ancient: {
        title: "Ancient Civilizations: A Journey Through Time",
        slides: [
            "wonder-1.jpg",
            "wonder-2.jpg",
            "wonder-3.jpg",
            "wonder-4.jpg",
            "wonder-5.jpg",
            "wonder-6.jpg",
            "wonder-7.jpg",
            "wonder-8.jpg",
            "wonder-9.jpg",
        ],
        audio: "wonder.mp3",
    },
    "korean-war": {
        title: "The Korean War: A Divided Nation",
        slides: [
            "korean-1.png",
            "korean-2.png",
            "korean-3.png",
            "korean-4.png",
            "korean-5.png",
            "korean-6.png",
            "korean-7.png",
        ],
        audio: "korean.mp3",
    },
    vikings: {
        title: "The Vikings: Raiders and Explorers",
        slides: ["vikings-1.png", "vikings-2.png", "vikings-3.png", "vikings-4.png", "vikings-5.png"],
        audio: "vikings.mp3",
    },
}

// Blog data
const blogs = {
    cold: {
        title: "The Cold War: A Geopolitical Struggle",
        content: `
      <h1>The Cold War: A Geopolitical Struggle</h1>
      <p>The Cold War was a prolonged period of political and military tension between the United States and the Soviet Union, spanning from the end of World War II to the early 1990s. It shaped global alliances, technological advancements, and cultural narratives.</p>
      <p>Discover more about this pivotal era by exploring the blog.</p>
      <p><em>Audio content is embedded within the blog for an immersive experience.</em></p>
    `,
    },
    "camp-concentration": {
        title: "Concentration Camps: A Grim Legacy",
        content: `
      <h1>Concentration Camps: A Grim Legacy</h1>
      <p>During World War II, concentration camps became symbols of human suffering and atrocities. These camps were sites of forced labor, imprisonment, and mass extermination, leaving a lasting impact on history and humanity.</p>
      <p>Learn more about this dark chapter by delving into the blog.</p>
      <p><em>Audio content is included to enhance the narrative.</em></p>
    `,
    },
    "crisis-financial": {
        title: "The 2008 Financial Crisis: Lessons Learned",
        content: `
      <h1>The 2008 Financial Crisis: Lessons Learned</h1>
      <p>The global financial crisis of 2008 was a catastrophic event that exposed vulnerabilities in the economic system. It led to widespread unemployment, foreclosures, and a reevaluation of financial practices worldwide.</p>
      <p>Explore the causes and consequences of this crisis in the blog.</p>
      <p><em>Audio content is available to provide additional insights.</em></p>
    `,
    },
    ayapel: {
        title: "The Ayapel Flood: A Natural Disaster",
        content: `
      <h1>The Ayapel Flood: A Natural Disaster</h1>
      <p>The Ayapel flood in Colombia was a devastating natural disaster that affected thousands of lives. It highlighted the vulnerability of communities to climate change and the need for effective disaster management.</p>
      <p>Read more about the impact and recovery efforts in the blog.</p>
      <p><em>Audio content is embedded to enhance the storytelling experience.</em></p>
    `,
    },
    "moon-landing": {
        title: "The Moon Landing: A Giant Leap for Mankind",
        content: `
      <h1>The Moon Landing: A Giant Leap for Mankind</h1>
      <p>The Apollo 11 mission in 1969 marked a significant milestone in human history as astronauts Neil Armstrong and Buzz Aldrin became the first humans to set foot on the Moon. This achievement showcased the power of human ingenuity and exploration.</p>
      <p>Discover more about this historic event in the blog.</p>
      <p><em>Audio content is included to provide an immersive experience.</em></p>
    `,
    },
    "old-defense": {
        title: "The Old Defense: A Historical Perspective",
        content: `
      <h1>The Old Defense: A Historical Perspective</h1>
      <p>The concept of defense has evolved over centuries, from ancient fortifications to modern military strategies. Understanding the historical context of defense mechanisms provides valuable insights into current security practices.</p>
      <p>Explore the evolution of defense in the blog.</p>
      <p><em>Audio content is embedded to enhance the narrative.</em></p>
    `,
    },
    "berlin-wall": {
        title: "The Berlin Wall: A Symbol of Division",
        content: `
      <h1>The Berlin Wall: A Symbol of Division</h1>
      <p>The Berlin Wall, erected in 1961, became a powerful symbol of the Cold War and the division between East and West Germany. Its fall in 1989 marked a significant turning point in history, leading to the reunification of Germany and the end of the Cold War.</p>
      <p>Learn more about this iconic structure and its historical significance in the blog.</p>
      <p><em>Audio content is included to provide an immersive experience.</em></p>
    `,
    },
    titanic: {
        title: "The Titanic: A Tragic Maritime Disaster",
        content: `
      <h1>The Titanic: A Tragic Maritime Disaster</h1>
      <p>The sinking of the RMS Titanic in 1912 remains one of the most infamous maritime disasters in history. The ship, deemed "unsinkable," struck an iceberg on its maiden voyage, leading to the loss of over 1,500 lives.</p>
      <p>Explore the events leading up to the disaster and its aftermath in the blog.</p>
      <p><em>Audio content is embedded to enhance the storytelling experience.</em></p>
    `,
    },
}

// Presentation state
let currentPresentation = null
let currentPresentationSlideIndex = 0

// Mobile menu state
let isMobileMenuOpen = false

// Initialize the application
function initializeApp() {
    console.log("🚀 Initializing Enhanced Past Events Blog...")

    // Initialize mobile menu
    initializeMobileMenu()

    // Initialize contact form
    initializeContactForm()    // Initialize scroll effects
    initializeScrollEffects()

    // Initialize intersection observer for animations
    initializeAnimationObserver()

    // Initialize keyboard navigation
    initializeKeyboardNavigation()    // Initialize mobile optimizations
    initMobileOptimizations()

    // Initialize EmailJS
    initializeEmailJS()
    initializeEmailJS()

    console.log("✨ Application initialized successfully!")
}

// Initialize mobile menu
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
    const nav = document.querySelector(".nav")

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener("click", () => {
            mobileMenuToggle.classList.toggle("active")
            nav.classList.toggle("active")

            // Toggle body scroll
            document.body.style.overflow = nav.classList.contains("active") ? "hidden" : ""
        })

        // Close menu when clicking nav links
        document.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenuToggle.classList.remove("active")
                nav.classList.remove("active")
                document.body.style.overflow = ""
            })
        })
    }
}

// Initialize mobile optimizations
function initMobileOptimizations() {
    if (isMobile || isTouch) {
        // Optimize animations
        document.documentElement.style.setProperty("--animation-duration", "0.3s")

        // Add class for touch-specific styles
        document.body.classList.add("touch-device")

        // Optimize images
        document.querySelectorAll("img").forEach((img) => {
            img.loading = "lazy"
            img.decoding = "async"
        })

        // Increase touch target sizes
        document.querySelectorAll("button, a, .card").forEach((el) => {
            el.style.minHeight = "48px"
            el.style.minWidth = "48px"
        })
    }
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId)
    const headerHeight = document.querySelector(".header").offsetHeight
    const offsetTop = element.offsetTop - headerHeight

    window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
    })

    // Close mobile menu if open
    if (isMobileMenuOpen) {
        closeMobileMenu()
    }

    // Add visual feedback
    element.style.transform = "scale(1.02)"
    setTimeout(() => {
        element.style.transform = "scale(1)"
    }, 300)
}

// Open presentation modal
function openPresentation(presentationId) {
    currentPresentation = presentations[presentationId]
    currentPresentationSlideIndex = 0

    const modalId = `presentation-modal-${presentationId}`
    const modal = document.getElementById(modalId)

    if (!modal) {
        console.error(`Modal not found: ${modalId}`)
        return
    }

    const slideImg = modal.querySelector(`#current-slide-${presentationId}`)
    const slideNum = modal.querySelector(`#current-slide-num-${presentationId}`)
    const totalSlidesElement = modal.querySelector(`#total-slides-${presentationId}`)
    const audio = modal.querySelector(`#presentation-audio-${presentationId}`)

    // Set up slides with loading animation
    if (slideImg) {
        slideImg.style.opacity = "0"
        slideImg.src = currentPresentation.slides[0]
        slideImg.onload = () => {
            slideImg.style.transition = "opacity 0.5s ease"
            slideImg.style.opacity = "1"
        }
    }

    if (slideNum) slideNum.textContent = "1"
    if (totalSlidesElement) totalSlidesElement.textContent = currentPresentation.slides.length

    // Set up audio
    if (audio) audio.src = currentPresentation.audio

    // Update navigation buttons
    updatePresentationNavigationButtons(modal, presentationId)

    // Show modal
    modal.style.display = "block"
    document.body.style.overflow = "hidden"

    console.log(`🎬 Opening presentation: ${currentPresentation.title}`)
}

// Update presentation navigation buttons
function updatePresentationNavigationButtons(modal, presentationId) {
    const prevBtn = modal.querySelector(".presentation-controls .nav-btn:first-child")
    const nextBtn = modal.querySelector(".presentation-controls .nav-btn:last-child")

    if (prevBtn) {
        prevBtn.disabled = currentPresentationSlideIndex === 0
    }

    if (nextBtn) {
        nextBtn.disabled = currentPresentationSlideIndex === currentPresentation.slides.length - 1
    }
}

// Navigate to next presentation slide
function nextSlidePresentation(presentationId) {
    if (currentPresentationSlideIndex < currentPresentation.slides.length - 1) {
        currentPresentationSlideIndex++
        updateSlideWithAnimation(presentationId)
    }
}

// Navigate to previous presentation slide
function previousSlidePresentation(presentationId) {
    if (currentPresentationSlideIndex > 0) {
        currentPresentationSlideIndex--
        updateSlideWithAnimation(presentationId)
    }
}

// Update slide with animation
function updateSlideWithAnimation(presentationId) {
    const modalId = `presentation-modal-${presentationId}`
    const modal = document.getElementById(modalId)

    if (!modal) return

    const slideImg = modal.querySelector(`#current-slide-${presentationId}`)
    const slideNum = modal.querySelector(`#current-slide-num-${presentationId}`)

    if (!slideImg || !slideNum) return

    // Fade out current slide
    slideImg.style.opacity = "0"
    slideImg.style.transform = "scale(0.95)"

    setTimeout(() => {
        slideImg.src = currentPresentation.slides[currentPresentationSlideIndex]
        slideNum.textContent = (currentPresentationSlideIndex + 1).toString()

        slideImg.onload = () => {
            slideImg.style.opacity = "1"
            slideImg.style.transform = "scale(1)"
        }

        updatePresentationNavigationButtons(modal, presentationId)
    }, 200)
}

// Open blog modal
function openBlog(blogId) {
    const blog = blogs[blogId]
    const modalId = `blog-modal-${blogId}`
    const modal = document.getElementById(modalId)

    if (!modal) {
        console.error(`Blog modal not found for blogId: ${blogId}`)
        return
    }

    const contentId = `blog-content-${blogId}`
    const content = document.getElementById(contentId)

    if (!content) {
        console.error(`Blog content container not found for blogId: ${blogId}`)
        return
    }

    content.innerHTML = blog.content

    // Show modal
    modal.style.display = "block"
    document.body.style.overflow = "hidden"

    // Animate content appearance
    setTimeout(() => {
        const elements = content.querySelectorAll("h1, h2, p")
        elements.forEach((el, index) => {
            el.style.opacity = "0"
            el.style.transform = "translateY(20px)"
            setTimeout(() => {
                el.style.transition = "all 0.6s ease"
                el.style.opacity = "1"
                el.style.transform = "translateY(0)"
            }, index * 100)
        })
    }, 100)

    console.log(`📖 Opening blog: ${blog.title}`)
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId)

    if (!modal) return

    // Add closing animation
    const modalContent = modal.querySelector(".modal-content")
    if (modalContent) {
        modalContent.style.transform = "scale(0.9)"
        modalContent.style.opacity = "0"
    }

    setTimeout(() => {
        modal.style.display = "none"
        if (modalContent) {
            modalContent.style.transform = "scale(1)"
            modalContent.style.opacity = "1"
        }
    }, 300)

    document.body.style.overflow = "auto"

    // Stop audio
    const audio = modal.querySelector("audio")
    if (audio) {
        audio.pause()
        audio.currentTime = 0
    }
}

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.getElementById("contactForm")

    if (contactForm) {
        contactForm.addEventListener("submit", handleContactFormSubmit)
    }
}

// Handle contact form submission
function handleContactFormSubmit(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")    // Validation
    const nameRegex = /^[A-Za-zÀ-ÿ\u00f1\u00d1\s]+$/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com|live\.com|icloud\.com|protonmail\.com)$/

    if (!nameRegex.test(name)) {
        showAlert("Name must contain only letters and spaces.", "error")
        return
    }

    if (!emailRegex.test(email)) {
        showAlert("Please enter a valid email with domains like @gmail.com, @outlook.com, @hotmail.com, etc.", "error")
        return
    }

    if (!subject.trim()) {
        showAlert("Subject cannot be empty.", "error")
        return
    }

    if (!message.trim()) {
        showAlert("Message cannot be empty.", "error")
        return
    }

    // Send email
    const submitBtn = e.target.querySelector(".submit-btn")
    const originalText = submitBtn.innerHTML

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
    submitBtn.disabled = true

    // Prepare email data
    const emailData = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: "osoriohoyosorlandodavid207@gmail.com"
    }    // Send email using EmailJS
    if (typeof EMAILJS_CONFIG !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY !== "TU_PUBLIC_KEY_AQUI") {        emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, emailData)
            .then(function(response) {
                showAlert("Thank you for your message! We will get back to you soon.", "success")
                e.target.reset()
            }, function(error) {
                console.error('Error:', error)
                showAlert("There was an error sending the message. Please try again.", "error")
            })
            .finally(() => {
                submitBtn.innerHTML = originalText
                submitBtn.disabled = false
            })
    } else {        // Fallback si EmailJS no está configurado
        setTimeout(() => {
            showAlert("Email configuration pending. Your message has been logged locally.", "info")
            console.log("Form data:", emailData)
            e.target.reset()
            submitBtn.innerHTML = originalText
            submitBtn.disabled = false
        }, 1000)
    }
}

// Initialize scroll effects
function initializeScrollEffects() {
    window.addEventListener("scroll", throttle(handleScroll, 16))
}

// Handle scroll events
function handleScroll() {
    const header = document.querySelector(".header")
    const scrolled = window.scrollY

    if (header) {
        if (scrolled > 100) {
            header.style.background = "rgba(255, 255, 255, 0.98)"
            header.style.backdropFilter = "blur(25px)"
        } else {
            header.style.background = "rgba(255, 255, 255, 0.95)"
            header.style.backdropFilter = "blur(20px)"
        }
    }
}

// Initialize animation observer
function initializeAnimationObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-in")

                // Special animation for cards
                if (entry.target.classList.contains("presentation-card") || entry.target.classList.contains("blog-card")) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`
                }
            }
        })
    }, observerOptions)

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(".section, .presentation-card, .blog-card, .hero-content")

    animatedElements.forEach((el) => {
        observer.observe(el)
    })
}

// Initialize keyboard navigation
function initializeKeyboardNavigation() {
    document.addEventListener("keydown", handleKeyDown)
}

// Handle keyboard events
function handleKeyDown(e) {
    const openModal = document.querySelector('.modal[style*="block"]')

    if (openModal && openModal.id.includes("presentation-modal")) {
        const presentationId = openModal.id.replace("presentation-modal-", "")

        if (e.key === "ArrowRight" || e.key === " ") {
            e.preventDefault()
            nextSlidePresentation(presentationId)
        } else if (e.key === "ArrowLeft") {
            e.preventDefault()
            previousSlidePresentation(presentationId)
        } else if (e.key === "Escape") {
            closeModal(openModal.id)
        }
    }

    // Close mobile menu with Escape
    if (e.key === "Escape" && isMobileMenuOpen) {
        closeMobileMenu()
    }
}

// Handle window resize with debouncing
function handleResize() {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && isMobileMenuOpen) {
            closeMobileMenu()
        }
    }, 150)
}

// Handle modal clicks outside content
function handleModalClick(e) {
    const modals = document.querySelectorAll(".modal")
    modals.forEach((modal) => {
        if (e.target === modal) {
            closeModal(modal.id)
        }
    })
}

// Initialize event listeners
function initializeEventListeners() {
    window.addEventListener("resize", handleResize)
    window.addEventListener("click", handleModalClick)

    // Add click animations to interactive elements
    const clickableElements = document.querySelectorAll("button, .presentation-card, .blog-card, .nav-link")

    clickableElements.forEach((element) => {
        element.addEventListener("click", createRippleEffect)
    })
}

// Create ripple effect on click
function createRippleEffect(e) {
    const ripple = document.createElement("div")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: rgba(52, 152, 219, 0.3);
    transform: scale(0);
    animation: rippleEffect 0.6s linear;
    left: ${x}px;
    top: ${y}px;
    width: ${size}px;
    height: ${size}px;
    pointer-events: none;
  `

    this.style.position = "relative"
    this.style.overflow = "hidden"
    this.appendChild(ripple)

    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple)
        }
    }, 600)
}

// Close mobile menu function
function closeMobileMenu() {
    isMobileMenuOpen = false
    const toggle = document.querySelector(".mobile-menu-toggle")
    const nav = document.querySelector(".nav")

    if (toggle && nav) {
        toggle.classList.remove("active")
        nav.classList.remove("active")
        document.body.style.overflow = "auto"
    }
}

// Show custom alert
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.custom-alert')
    if (existingAlert) {
        existingAlert.remove()
    }

    // Create alert element
    const alert = document.createElement('div')
    alert.className = `custom-alert alert-${type}`
    alert.innerHTML = `
        <div class="alert-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="alert-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `

    // Add to page
    document.body.appendChild(alert)

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.style.opacity = '0'
            setTimeout(() => alert.remove(), 300)
        }
    }, 5000)
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    initializeApp()
    initializeEventListeners()
})

// Export functions for global access
window.scrollToSection = scrollToSection
window.openPresentation = openPresentation
window.openBlog = openBlog
window.closeModal = closeModal
window.nextSlidePresentation = nextSlidePresentation
window.previousSlidePresentation = previousSlidePresentation

console.log("🎉 Enhanced Past Events blog loaded with full responsive carousel centering!")

// Initialize EmailJS
function initializeEmailJS() {
    // Check if EmailJS configuration exists
    if (typeof EMAILJS_CONFIG !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY !== "TU_PUBLIC_KEY_AQUI") {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
        console.log("✅ EmailJS initialized successfully")
    } else {
        console.warn("⚠️ EmailJS configuration not found. Please check emailjs-config.js")
    }
}