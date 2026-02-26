/**
 * Sterling & Associates - Law Firm Website
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // Header Scroll Effect
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for styling
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate Elements on Scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(
            '.practice-card, .team-member, .testimonial, .about-content, .contact-form'
        );

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-in');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run on load

    // Counter Animation for Stats
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);

        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.ceil(start).toLocaleString() + (element.dataset.suffix || '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString() + (element.dataset.suffix || '');
            }
        };

        updateCounter();
    };

    // Intersection Observer for Stats Animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/[^0-9]/g, ''));
                    const suffix = text.includes('+') ? '+' : text.includes('%') ? '%' : '';
                    stat.dataset.suffix = suffix;
                    if (number && !stat.classList.contains('animated')) {
                        stat.classList.add('animated');
                        animateCounter(stat, number);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // Form Handling
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            submitBtn.textContent = 'Request Sent!';
            submitBtn.style.background = '#28a745';
            submitBtn.style.borderColor = '#28a745';

            // Reset form
            contactForm.reset();

            // Reset button after delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.borderColor = '';
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // Active Navigation Highlighting
    const sections = document.querySelectorAll('section[id]');

    const highlightNav = () => {
        const scrollPos = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.querySelectorAll('a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav);

    // Practice Card Hover Effects
    const practiceCards = document.querySelectorAll('.practice-card');

    practiceCards.forEach(card => {
        card.style.cursor = 'pointer';

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });

        // Make practice cards clickable to navigate to contact form
        card.addEventListener('click', () => {
            const practiceTitle = card.querySelector('h3').textContent;
            const practiceDesc = card.querySelector('p').textContent;
            const contactForm = document.querySelector('.contact-form');

            if (contactForm) {
                const practiceSelect = contactForm.querySelector('select');
                const messageField = contactForm.querySelector('textarea');

                if (practiceSelect) {
                    practiceSelect.value = practiceTitle;
                }

                if (messageField) {
                    messageField.value = `I am interested in learning more about ${practiceTitle}. ${practiceDesc}`;
                    messageField.focus();
                }

                const contactSection = document.querySelector('#contact');
                const headerHeight = header.offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Team Member Bio Modal
    const teamMembers = document.querySelectorAll('.team-member');

    const attorneyData = {
        'robert-sterling': {
            name: 'Robert Sterling',
            title: 'Managing Partner',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=750&fit=crop',
            barAdmissions: 'New York, New Jersey, U.S. Supreme Court',
            lawSchool: 'Columbia Law School, J.D. 1987',
            experience: '37 Years',
            practiceAreas: ['Corporate Law', 'Mergers & Acquisitions', 'Securities', 'Private Equity'],
            bio: 'Robert Sterling founded the firm in 1984 after a distinguished tenure at Sullivan & Cromwell. Nationally recognised for his expertise in complex mergers and acquisitions, Robert has advised on transactions exceeding $40 billion in combined deal value throughout his career. He has been consistently named a "Top 100 Super Lawyer" by New York Magazine and recognised by Chambers USA for his Corporate/M&A work. Robert serves on the board of the New York Legal Aid Society and is a frequent lecturer at Columbia Law School.'
        },
        'patricia-chen': {
            name: 'Patricia Chen',
            title: 'Senior Partner',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=750&fit=crop',
            barAdmissions: 'New York, California, Federal Courts',
            lawSchool: 'Yale Law School, J.D. 1995',
            experience: '29 Years',
            practiceAreas: ['Litigation', 'Intellectual Property', 'Commercial Disputes', 'Trade Secrets'],
            bio: 'Patricia Chen joined Sterling & Associates in 1998 after serving as a federal law clerk in the Southern District of New York. She has tried over 60 cases to verdict and has an unparalleled record in high-stakes IP litigation. Patricia is widely regarded as one of the foremost intellectual property litigators in the country, with successful representations before the U.S. Court of Appeals and the International Trade Commission. She lectures annually at Yale Law School and publishes extensively in leading legal journals.'
        },
        'michael-thompson': {
            name: 'Michael Thompson',
            title: 'Partner',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=750&fit=crop',
            barAdmissions: 'New York, Connecticut',
            lawSchool: 'NYU School of Law, J.D. 2003',
            experience: '21 Years',
            practiceAreas: ['Real Estate', 'Employment Law', 'Lease Negotiation', 'Land Use'],
            bio: 'Michael Thompson leads the firm\'s real estate and employment practice groups, bringing a cross-disciplinary approach that has proven especially valuable for corporate clients navigating complex workplace and property matters simultaneously. He has overseen real estate transactions exceeding $2 billion in aggregate value, including landmark commercial developments across Manhattan and Brooklyn. Michael is a member of the New York State Bar Association\'s Real Property Law Committee.'
        },
        'sarah-williams': {
            name: 'Sarah Williams',
            title: 'Associate',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=750&fit=crop',
            barAdmissions: 'New York',
            lawSchool: 'Georgetown University Law Center, J.D. 2018',
            experience: '6 Years',
            practiceAreas: ['Estate Planning', 'Trusts & Estates', 'Probate Administration', 'Wealth Transfer'],
            bio: 'Sarah Williams joined the firm in 2019 following a clerkship with the New York Surrogate\'s Court. She has developed a highly regarded estate planning practice serving high-net-worth individuals and multigenerational families. Sarah takes a holistic approach to estate planning, working closely with clients\' financial advisors and accountants to ensure comprehensive wealth transfer strategies. She is a member of the Society of Trusts and Estate Practitioners (STEP).'
        }
    };

    const bioModal = document.getElementById('bio-modal');
    const bioModalClose = document.querySelector('.bio-modal-close');

    function openBioModal(memberKey) {
        const data = attorneyData[memberKey];
        if (!data || !bioModal) return;

        document.getElementById('bio-modal-img').src = data.image;
        document.getElementById('bio-modal-img').alt = data.name;
        document.getElementById('bio-modal-title').textContent = data.title;
        document.getElementById('bio-modal-name').textContent = data.name;
        document.getElementById('bio-modal-bar').textContent = data.barAdmissions;
        document.getElementById('bio-modal-school').textContent = data.lawSchool;
        document.getElementById('bio-modal-exp').textContent = data.experience;
        document.getElementById('bio-modal-areas-list').innerHTML =
            data.practiceAreas.map(a => `<span>${a}</span>`).join('');
        document.getElementById('bio-modal-bio').textContent = data.bio;

        bioModal.setAttribute('aria-hidden', 'false');
        bioModal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => bioModalClose.focus());
    }

    function closeBioModal() {
        bioModal.classList.remove('is-open');
        bioModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    teamMembers.forEach(member => {
        member.style.cursor = 'pointer';

        const image = member.querySelector('.member-image img');

        member.addEventListener('mouseenter', () => {
            if (image) {
                image.style.filter = 'grayscale(0%)';
                image.style.transform = 'scale(1.08)';
            }
        });

        member.addEventListener('mouseleave', () => {
            if (image) {
                image.style.filter = 'grayscale(20%)';
                image.style.transform = 'scale(1)';
            }
        });

        member.addEventListener('click', () => {
            if (member.dataset.member) openBioModal(member.dataset.member);
        });
    });

    if (bioModalClose) {
        bioModalClose.addEventListener('click', closeBioModal);
    }

    if (bioModal) {
        bioModal.addEventListener('click', (e) => {
            if (e.target === bioModal) closeBioModal();
        });

        // "Schedule Consultation" closes modal and scrolls to contact
        const bioCta = bioModal.querySelector('.bio-modal-cta');
        if (bioCta) {
            bioCta.addEventListener('click', (e) => {
                e.preventDefault();
                closeBioModal();
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    window.scrollTo({ top: contactSection.offsetTop - headerHeight, behavior: 'smooth' });
                }
            });
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (bioModal && bioModal.classList.contains('is-open')) closeBioModal();
        }
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            const isOpen = btn.getAttribute('aria-expanded') === 'true';

            // Close all open items
            document.querySelectorAll('.faq-question').forEach(b => {
                b.setAttribute('aria-expanded', 'false');
                b.nextElementSibling.hidden = true;
            });

            // Toggle clicked item
            if (!isOpen) {
                btn.setAttribute('aria-expanded', 'true');
                answer.hidden = false;
            }
        });
    });

    // Parallax Effect for Hero Background
    const heroBg = document.querySelector('.hero-bg img');

    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    }

    // Testimonial Carousel (if more testimonials are added)
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');

    const showTestimonial = (index) => {
        testimonials.forEach((t, i) => {
            t.style.opacity = i === index ? '1' : '0.7';
            t.style.transform = i === index ? 'scale(1.02)' : 'scale(1)';
        });
    };

    // Initialize testimonial display
    if (testimonials.length > 0) {
        showTestimonial(currentTestimonial);
    }

    // Accessibility: Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.scrollBehavior = 'auto';

        // Disable animations
        document.querySelectorAll('*').forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }

    console.log('Sterling & Associates website initialized');
});
