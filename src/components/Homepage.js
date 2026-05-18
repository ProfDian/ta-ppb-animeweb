import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/global';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
    FaSearch,
    FaFire,
    FaBroadcastTower,
    FaCalendarAlt,
    FaInfoCircle,
    FaBars,
    FaTimes
} from 'react-icons/fa';
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
        getPopularAnime
    } = useGlobalContext();

    const [rendered, setRendered] = useState('popular');
    const [isScrolled, setIsScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 24);
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
        setIsMobileMenuOpen(false);
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
        <HomepageStyled>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="nav-content">
                    <div className="brand-block">
                        <span className="brand-mark">A</span>
                        <div className="brand-text">
                            <span className="brand-name">AmbaNime</span>
                            <span className="brand-subtitle">anime discovery index</span>
                        </div>
                    </div>

                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
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
                                        placeholder="Search title..."
                                        value={search}
                                        onChange={handleChange}
                                    />
                                    <button type="submit" className="search-submit" aria-label="Search">
                                        <FaSearch />
                                    </button>
                                </form>
                            </div>
                            <button
                                className="search-toggle"
                                onClick={() => setShowSearch(!showSearch)}
                                aria-label="Toggle search"
                            >
                                <FaSearch />
                                <span>Search</span>
                            </button>
                            <button onClick={() => navigate('/about')} className="about-btn">
                                <FaInfoCircle />
                                <span>About</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="content-section">{switchComponent()}</main>
        </HomepageStyled>
    );
}

const HomepageStyled = styled.div`
    min-height: 100dvh;
    color: var(--text-primary);

    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        padding: 0.85rem 1rem;
        border-bottom: 1px solid transparent;
        transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    }

    .navbar.scrolled {
        background: rgba(9, 14, 21, 0.86);
        border-color: rgba(201, 149, 91, 0.24);
        box-shadow: 0 18px 38px rgba(4, 7, 13, 0.52);
        backdrop-filter: blur(14px);
    }

    .nav-content {
        max-width: 1320px;
        margin: 0 auto;
        border: 1px solid rgba(255, 255, 255, 0.06);
        background: rgba(13, 19, 28, 0.8);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 0.65rem 0.8rem;
        box-shadow: 0 12px 24px var(--shadow-tint);
    }

    .brand-block {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        padding-left: 0.4rem;
        min-width: 0;
    }

    .brand-mark {
        width: 2rem;
        height: 2rem;
        border-radius: 8px;
        background: linear-gradient(145deg, rgba(201, 149, 91, 0.4), rgba(201, 149, 91, 0.18));
        border: 1px solid var(--border-soft);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--accent-strong);
        font-size: 1.1rem;
        font-weight: 700;
        line-height: 1;
    }

    .brand-text {
        display: flex;
        flex-direction: column;
        line-height: 1;
        gap: 0.32rem;
    }

    .brand-name {
        font-size: 1.02rem;
        letter-spacing: -0.03em;
        font-weight: 700;
    }

    .brand-subtitle {
        color: var(--text-muted);
        font-size: 0.75rem;
        letter-spacing: 0.04em;
        text-transform: lowercase;
    }

    .mobile-menu-toggle {
        display: none;
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 10px;
        border: 1px solid var(--border-soft);
        background: var(--accent-soft);
        color: var(--accent-strong);
    }

    .nav-menu {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.25rem;
        flex: 1;
        min-width: 0;
    }

    .nav-links {
        display: flex;
        gap: 0.45rem;
        min-width: 0;
    }

    .nav-btn {
        border: 1px solid transparent;
        border-radius: 11px;
        background: transparent;
        color: var(--text-secondary);
        padding: 0.5rem 0.85rem;
        font-size: 0.92rem;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        transition: transform 0.24s ease, border-color 0.24s ease, background 0.24s ease, color 0.24s ease;
    }

    .nav-btn svg {
        font-size: 0.9rem;
    }

    .nav-btn:hover {
        transform: translateY(-1px);
        border-color: rgba(201, 149, 91, 0.25);
        background: rgba(201, 149, 91, 0.12);
        color: var(--text-primary);
    }

    .nav-btn:active {
        transform: scale(0.98);
    }

    .nav-btn.active {
        border-color: var(--border-soft);
        background: rgba(201, 149, 91, 0.2);
        color: var(--accent-strong);
    }

    .nav-actions {
        display: flex;
        align-items: center;
        gap: 0.55rem;
        margin-left: auto;
        min-width: 0;
    }

    .search-container {
        width: 0;
        overflow: hidden;
        transition: width 0.3s ease;
    }

    .search-container.show {
        width: 280px;
    }

    .search-container form {
        position: relative;
    }

    .search-container input {
        width: 100%;
        border-radius: 11px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(13, 20, 30, 0.9);
        color: var(--text-primary);
        font-size: 0.91rem;
        padding: 0.58rem 2.35rem 0.58rem 0.8rem;
        transition: border-color 0.24s ease, box-shadow 0.24s ease;
    }

    .search-container input::placeholder {
        color: var(--text-muted);
    }

    .search-container input:focus {
        outline: none;
        border-color: var(--border-soft);
        box-shadow: 0 0 0 3px rgba(201, 149, 91, 0.17);
    }

    .search-submit {
        position: absolute;
        top: 50%;
        right: 0.28rem;
        transform: translateY(-50%);
        width: 1.8rem;
        height: 1.8rem;
        border: none;
        border-radius: 8px;
        background: transparent;
        color: var(--accent-strong);
    }

    .search-toggle,
    .about-btn {
        border-radius: 11px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(19, 27, 37, 0.85);
        color: var(--text-secondary);
        padding: 0.5rem 0.75rem;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.9rem;
        transition: border-color 0.24s ease, background 0.24s ease, color 0.24s ease, transform 0.24s ease;
    }

    .search-toggle:hover,
    .about-btn:hover {
        border-color: rgba(201, 149, 91, 0.3);
        background: rgba(201, 149, 91, 0.14);
        color: var(--text-primary);
        transform: translateY(-1px);
    }

    .search-toggle:active,
    .about-btn:active {
        transform: scale(0.98);
    }

    .content-section {
        max-width: 1320px;
        margin: 0 auto;
        padding: 7.2rem 1.15rem 2.25rem;
    }

    button:focus-visible,
    input:focus-visible {
        outline: 2px solid rgba(201, 149, 91, 0.72);
        outline-offset: 2px;
    }

    @media (max-width: 900px) {
        .nav-content {
            padding: 0.55rem 0.6rem;
        }

        .mobile-menu-toggle {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-left: auto;
            z-index: 1200;
        }

        .nav-menu {
            position: fixed;
            top: 5.2rem;
            right: 1rem;
            width: min(320px, calc(100vw - 2rem));
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(10, 16, 24, 0.96);
            box-shadow: 0 24px 48px rgba(3, 5, 10, 0.58);
            backdrop-filter: blur(14px);
            padding: 1rem;
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
            transform: translateY(-8px) scale(0.96);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.24s ease, transform 0.24s ease;
        }

        .nav-menu.open {
            transform: translateY(0) scale(1);
            opacity: 1;
            pointer-events: auto;
        }

        .nav-links {
            flex-direction: column;
            width: 100%;
        }

        .nav-btn {
            width: 100%;
            justify-content: flex-start;
        }

        .nav-actions {
            width: 100%;
            margin-left: 0;
            flex-direction: column;
            align-items: stretch;
        }

        .search-container,
        .search-container.show {
            width: 100%;
        }

        .search-toggle,
        .about-btn {
            width: 100%;
            justify-content: flex-start;
        }

    }

    @media (max-width: 560px) {
        .content-section {
            padding-left: 0.85rem;
            padding-right: 0.85rem;
        }

        .brand-subtitle {
            display: none;
        }
    }
`;

export default Homepage;
