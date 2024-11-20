import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/global';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaSearch, FaFire, FaBroadcastTower, FaCalendarAlt, FaInfoCircle, FaBars, FaTimes } from 'react-icons/fa';
import Popular from './Popular';
import Upcoming from './Upcoming';
import Airing from './Airing';

function Homepage() {
    const {
        handleSubmit,
        search,
        handleChange,
        getUpcomingAnime,
        getAiringAnime,
        getPopularAnime,
    } = useGlobalContext();

    const [rendered, setRendered] = useState('popular');
    const [isScrolled, setIsScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMenuClick = (type) => {
        setRendered(type);
        switch (type) {
            case 'popular':
                getPopularAnime();
                break;
            case 'airing':
                getAiringAnime();
                break;
            case 'upcoming':
                getUpcomingAnime();
                break;
            default:
                break;
        }
        setIsMobileMenuOpen(false); // Close menu after selection
    };

    const switchComponent = () => {
        switch (rendered) {
            case 'popular':
                return <Popular rendered={rendered} />;
            case 'airing':
                return <Airing rendered={rendered} />;
            case 'upcoming':
                return <Upcoming rendered={rendered} />;
            default:
                return <Popular rendered={rendered} />;
        }
    };

    return (
        <HomepageStyled isMobileMenuOpen={isMobileMenuOpen} showSearch={showSearch}>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="nav-content">
                    <div className="logo">
                        <div className="logo-text">
                            <span className="main-text">A</span>
                            <span className="sub-text">mba</span>
                            <span className="accent-text">Nime</span>
                        </div>
                    </div>

                    <button 
                        className="mobile-menu-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    <div className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                        <div className="nav-links">
                            <button
                                onClick={() => handleMenuClick('popular')}
                                className={`nav-btn ${rendered === 'popular' ? 'active' : ''}`}
                            >
                                <FaFire />
                                <span>Popular</span>
                            </button>
                            <button
                                onClick={() => handleMenuClick('airing')}
                                className={`nav-btn ${rendered === 'airing' ? 'active' : ''}`}
                            >
                                <FaBroadcastTower />
                                <span>Airing</span>
                            </button>
                            <button
                                onClick={() => handleMenuClick('upcoming')}
                                className={`nav-btn ${rendered === 'upcoming' ? 'active' : ''}`}
                            >
                                <FaCalendarAlt />
                                <span>Upcoming</span>
                            </button>
                        </div>

                        <div className="nav-actions">
                            <div className={`search-container ${showSearch ? 'show' : ''}`}>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Search anime..."
                                        value={search}
                                        onChange={handleChange}
                                    />
                                    <button type="submit">
                                        <FaSearch />
                                    </button>
                                </form>
                            </div>
                            <button 
                                className="search-toggle"
                                onClick={() => setShowSearch(!showSearch)}
                            >
                                <FaSearch />
                            </button>
                            <button
                                onClick={() => navigate('/about')}
                                className="about-btn"
                            >
                                <FaInfoCircle />
                                <span>About</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <header className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Website Info
                        <span className="highlight"> Animek </span>
                    </h1>
                    <p className="hero-subtitle">
                        For The Weebs
                    </p>
                </div>
            </header>

            <main className="content-section">
                {switchComponent()}
            </main>
        </HomepageStyled>
    );
}

const glowAnimation = keyframes`
    0% { text-shadow: 0 0 10px rgba(79, 70, 229, 0.5); }
    50% { text-shadow: 0 0 20px rgba(79, 70, 229, 0.8); }
    100% { text-shadow: 0 0 10px rgba(79, 70, 229, 0.5); }
`;
const navbarSlideDown = keyframes`
    from {
        transform: translateY(-100%);
    }
    to {
        transform: translateY(0);
    }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const HomepageStyled = styled.div`
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    min-height: 100vh;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    

    /* ---------- NAVBAR STYLING ---------- */
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(10px);
        z-index: 1000;
        padding: 0.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        .nav-content {
            max-width: 1800px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 1rem;
            position: relative;

            @media (max-width: 768px) {
                padding: 0.5rem;
                justify-content: center;
            }
        }

        /* Logo Styling */
        .logo {
            .logo-text {
                font-size: 2rem;
                font-weight: 700;
                display: flex;
                align-items: center;
                
                @media (max-width: 768px) {
                    font-size: 1.5rem;
                }
                
                .main-text { 
                    background: linear-gradient(45deg, #4f46e5, #818cf8);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .sub-text { color: #e2e8f0; }
                .accent-text {
                    background: linear-gradient(45deg, #4f46e5, #818cf8);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }
        }

        /* Mobile Menu Toggle Button */
        .mobile-menu-toggle {
            display: none;
            background: none;
            border: none;
            color: #4f46e5;
            cursor: pointer;
            
            @media (max-width: 768px) {
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                left: 1rem;
                padding: 0.5rem;
                z-index: 2000;

                .icon {
                    width: 1.5rem;
                    height: 1.5rem;
                }
            }
        }

        /* Navigation Menu */
        .nav-menu {
            display: flex;
            align-items: center;
            gap: 2rem;

            @media (max-width: 768px) {
                position: fixed;
                top: 0;
                left: -100%;
                width: 200px;
                height: 80vh;
                background: rgba(15, 23, 42, 0.98);
                backdrop-filter: blur(10px);
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                padding: 5rem 1.5rem 2rem;
                transition: left 0.3s ease;
                overflow-y: auto;

                &.open {
                    left: 0;
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
                }
            }
        }

        /* Navigation Links */
        .nav-links {
            display: flex;
            gap: 1rem;

            @media (max-width: 768px) {
                width: 100%;
                flex-direction: column;
                gap: 0.5rem;
            }

            .nav-btn {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 0.75rem 1.2rem;
                border-radius: 8px;
                background: transparent;
                color: #e2e8f0;
                border: none;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.95rem;

                .icon {
                    width: 1.2rem;
                    height: 1.2rem;
                    transition: transform 0.3s ease;
                }

                &:hover {
                    color: #4f46e5;
                    background: rgba(79, 70, 229, 0.1);

                    .icon {
                        transform: scale(1.1);
                    }
                }

                &.active {
                    color: #4f46e5;
                    background: rgba(79, 70, 229, 0.15);
                    font-weight: 500;
                }

                @media (max-width: 768px) {
                    width: 100%;
                    padding: 0.75rem 1rem;
                }
            }
        }

        /* Search and Actions */
        .nav-actions {
            display: flex;
            align-items: center;
            gap: 1rem;

            @media (max-width: 768px) {
                width: 100%;
                flex-direction: column;
                align-items: stretch;
                margin-top: 2rem;
            }

            /* Search Container */
            .search-container {
                position: relative;
                width: 0;
                overflow: hidden;
                transition: all 0.3s ease;

                .search-title {
                    display: none;
                    color: #4f46e5;
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                    font-weight: 500;

                    @media (max-width: 768px) {
                        display: block;
                    }
                }

                &.show {
                    width: 300px;

                    @media (max-width: 768px) {
                        width: 100%;
                    }
                }

                form {
                    display: flex;
                    align-items: center;
                    position: relative;

                    input {
                        width: 100%;
                        padding: 0.75rem 2.5rem 0.75rem 1rem;
                        border: 1px solid rgba(79, 70, 229, 0.3);
                        border-radius: 8px;
                        background: rgba(255, 255, 255, 0.1);
                        color: white;
                        font-size: 0.95rem;
                        transition: all 0.3s ease;

                        &:focus {
                            border-color: #4f46e5;
                            background: rgba(255, 255, 255, 0.15);
                            box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
                        }

                        &::placeholder {
                            color: rgba(255, 255, 255, 0.5);
                        }
                    }

                    .search-submit {
                        position: absolute;
                        right: 0.75rem;
                        background: none;
                        border: none;
                        padding: 0.5rem;
                        color: #4f46e5;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.3s ease;

                        .icon {
                            width: 1.1rem;
                            height: 1.1rem;
                        }

                        &:hover {
                            color: #818cf8;
                            transform: scale(1.1);
                        }
                    }
                }
            }

            /* Search Toggle and About Button */
            .search-toggle,
            .about-btn {
                background: rgba(79, 70, 229, 0.1);
                border: none;
                padding: 0.6rem;
                border-radius: 8px;
                color: #4f46e5;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.75rem;
                transition: all 0.3s ease;

                .icon {
                    width: 1.2rem;
                    height: 1.2rem;
                }

                &:hover {
                    background: rgba(79, 70, 229, 0.2);
                    transform: translateY(-2px);
                }

                /* Desktop View */
                @media (min-width: 769px) {
                    width: 40px;
                    height: 40px;
                    padding: 0;
                    border-radius: 50%;

                    span {
                        display: none;
                    }
                }

                /* Mobile View */
                @media (max-width: 768px) {
                    width: 100%;
                    justify-content: flex-start;
                    padding: 0.75rem 1rem;
                    background: transparent;
                    color: #e2e8f0;

                    .icon {
                        width: 1.1rem;
                        height: 1.1rem;
                        margin-right: 0.5rem;
                    }

                    span {
                        font-size: 0.95rem;
                    }

                    &:hover {
                        background: rgba(79, 70, 229, 0.1);
                        color: #4f46e5;
                        transform: none;
                    }
                }
            }
        }
    }

    /* ---------- HERO SECTION STYLING ---------- */
    .hero-section {
        height: 20vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 1rem;
        margin-top: 70px;
        position: relative;

        @media (max-width: 768px) {
            height: 15vh;
            margin-top: 60px;
            padding: 2rem 1rem;
        }

        .hero-content {
            position: relative;
            z-index: 2;

            .hero-title {
                font-size: clamp(1.8rem, 4vw, 2.5rem);
                font-weight: 700;
                margin-bottom: 1rem;
                line-height: 1.2;

                .highlight {
                    color: #4f46e5;
                    animation: ${glowAnimation} 3s infinite;
                }
            }

            .hero-subtitle {
                font-size: clamp(0.9rem, 2vw, 1.1rem);
                color: #94a3b8;
                max-width: 600px;
                margin: 0 auto;
                line-height: 1.6;
            }
        }
    }

    /* ---------- CONTENT SECTION STYLING ---------- */
    .content-section {
        padding: 1rem;
        max-width: 1800px;
        margin: 0 auto;

        @media (max-width: 768px) {
            padding: 0.5rem;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }
    }
`;

export default Homepage;