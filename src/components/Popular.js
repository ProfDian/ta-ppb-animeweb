import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';

function Popular({}) {
    const { popularAnime, isSearch, searchResults } = useGlobalContext();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <PopularStyled>
      <motion.div 
        className="content-container"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <div className="main-content">
          <div className="popular-grid">
            {(!isSearch ? popularAnime : searchResults)?.map((anime) => (
              <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                <motion.div 
                  className="anime-card" 
                  variants={item}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="anime-image">
                    <img src={anime.images.jpg.large_image_url} alt={anime.title} />
                    <div className="overlay">
                      <div className="info">
                        <h3>{anime.title}</h3>
                        <div className="anime-stats">
                          <p>Score: {anime.score}</p>
                          <p>Ranked: {anime.rank}</p>
                        </div>
                      </div>
                      <div className="hover-info">
                        <p>{anime.synopsis?.substring(0, 150)}...</p>
                        <span className="view-btn">View Details</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
        <Sidebar />
      </motion.div>
    </PopularStyled>
  );
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PopularStyled = styled.div`
  .content-container {
    display: flex;
    gap: 2rem;
    max-width: 1800px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .main-content {
    flex: 1;
    min-width: 0; // Prevents flex item from overflowing
  }

  .popular-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }

  a {
    text-decoration: none;
  }

  .anime-card {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    animation: ${fadeInUp} 0.6s ease forwards;

    .anime-image {
      position: relative;
      height: 400px;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(
          to top,
          rgba(15, 23, 42, 0.95) 0%,
          rgba(15, 23, 42, 0.7) 50%,
          transparent 100%
        );
        padding: 1.5rem;
        transform: translateY(70%);
        transition: transform 0.3s ease;

        .info {
          h3 {
            color: #fff;
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }

          .anime-stats {
            display: flex;
            gap: 1rem;
            font-size: 0.9rem;
            color: #e2e8f0;
          }
        }

        .hover-info {
          margin-top: 1rem;
          opacity: 0;
          transition: opacity 0.3s ease;

          p {
            color: #94a3b8;
            font-size: 0.9rem;
            line-height: 1.5;
            margin-bottom: 1rem;
          }

          .view-btn {
            display: inline-block;
            background: #4f46e5;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9rem;

            &:hover {
              background: #4338ca;
              transform: translateY(-2px);
            }
          }
        }
      }

      &:hover {
        img {
          transform: scale(1.05);
        }

        .overlay {
          transform: translateY(0);
          .hover-info {
            opacity: 1;
          }
        }
      }
    }
  }

  @media (max-width: 1400px) {
    .popular-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  @media (max-width: 968px) {
    .content-container {
      flex-direction: column;
    }
  }
`;

export default Popular;