import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/global';
import Popular from './Popular';
import Upcoming from './Upcoming';
import Airing from './Airing';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaSearch, FaFire, FaBroadcastTower, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';

function Homepage() {
  const {
    handleSubmit,
    search,
    handleChange,
    getUpcomingAnime,
    getAiringAnime,
    getPopularAnime,
  } = useGlobalContext();

  const [rendered, setRendered] = React.useState('popular');
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <div className="logo">
          <div className="logo-text">
            <span className="main-text">A</span>
            <span className="sub-text">mba</span>
            <span className="accent-text">Nime</span>
          </div>
        </div>

        <div className="nav-links">
          <button
            onClick={() => {
              setRendered('popular');
              getPopularAnime();
            }}
            className={`nav-btn ${rendered === 'popular' ? 'active' : ''}`}
          >
            <FaFire />
            <span>Popular</span>
          </button>
          <button
            onClick={() => {
              setRendered('airing');
              getAiringAnime();
            }}
            className={`nav-btn ${rendered === 'airing' ? 'active' : ''}`}
          >
            <FaBroadcastTower />
            <span>Airing</span>
          </button>
          <button
            onClick={() => {
              setRendered('upcoming');
              getUpcomingAnime();
            }}
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
      </nav>

      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            MAS
            <span className="highlight"> AMBATU</span> KAM
          </h1>
          <p className="hero-subtitle">
            Ba Dum Tss
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

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
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

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(10px);
    z-index: 1000;
    transition: all 0.3s ease;
    animation: ${slideIn} 0.5s ease-out;

    &.scrolled {
      background: rgba(15, 23, 42, 0.95);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .logo {
      .logo-text {
        font-size: 3rem;
        font-weight: 700;
        
        .main-text {
          color: #4f46e5;
          animation: ${glowAnimation} 2s infinite;
        }
        
        .sub-text {
          color: #e2e8f0;
        }
        
        .accent-text {
          background: linear-gradient(to right, #4f46e5, #818cf8);
          -webkit-background-clip: text;
          color: transparent;
        }
      }
    }

    .nav-links {
      display: flex;
      gap: 1rem;

      .nav-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        background: transparent;
        color: #e2e8f0;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(79, 70, 229, 0.1);
          transform: translateY(-2px);
        }

        &.active {
          background: #4f46e5;
          color: white;
        }

        svg {
          font-size: 2.1rem;
        }
      }
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1rem;

      .search-container {
        position: relative;
        width: 0;
        overflow: hidden;
        transition: all 0.3s ease;

        &.show {
          width: 300px;
        }

        form {
          display: flex;
          align-items: center;

          input {
            width: 100%;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            
            &::placeholder {
              color: rgba(255, 255, 255, 0.5);
            }
          }

          button {
            position: absolute;
            right: 0.5rem;
            background: transparent;
            border: none;
            color: white;
            cursor: pointer;
          }
        }
      }

      .search-toggle,
      .about-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        background: transparent;
        color: #e2e8f0;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(79, 70, 229, 0.1);
          transform: translateY(-2px);
        }

        svg {
          font-size: 1.1rem;
        }
      }
    }
  }

  .hero-section {
    height: 28vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1rem;
    margin-top: 20px;
    background: linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)),
                url('/path-to-your-hero-image.jpg') center/cover;

    .hero-content {
      animation: ${fadeIn} 1s ease-out;

      .hero-title {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1rem;

        .highlight {
          color: #4f46e5;
          animation: ${glowAnimation} 2s infinite;
        }
      }

      .hero-subtitle {
        font-size: 1.2rem;
        color: #94a3b8;
        max-width: 600px;
        margin: 0 auto;
      }
    }
  }

  .content-section {
    padding: 2rem;
    animation: ${fadeIn} 1s ease-out;
  }

  @media (max-width: 768px) {
    .navbar {
      padding: 1rem;

      .nav-links {
        display: none;
      }

      .nav-actions {
        .search-container.show {
          width: 200px;
        }

        .about-btn span {
          display: none;
        }
      }
    }

    .hero-section {
      .hero-content {
        .hero-title {
          font-size: 2.5rem;
        }

        .hero-subtitle {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Homepage;