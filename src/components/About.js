import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaInstagram, FaFacebookF, FaGithub, FaSpotify, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();

  return (
    <AboutStyled>
      <div className="background-overlay"></div>
      <button className="back-home" onClick={() => navigate('/')}>
        <FaHome className="home-icon"/>
        <span>Back to Home</span>
      </button>
      <div className="container">
        <div className="description">
          <h1>About My Anime App</h1>
          <p>
            Our Anime app is designed to provide you with the ultimate anime experience. Discover the latest
            and greatest anime shows, stay up-to-date with airing episodes, and explore a vast library of
            popular and upcoming titles.
          </p>
          <p>
            With our intuitive user interface and powerful search features, you can easily find your next
            favorite anime. Stay connected with the anime community, share your thoughts, and dive into
            in-depth discussions.
          </p>
        </div>
        <div className="about-me">
          <div className="photo-container">
            <img src="./images/fattah.jpg" alt="Fattah" />
          </div>
          <div className="profile-info">
            <h2>May The Force Be With You</h2>
            <h3>Abdul Fattah Rahmadiansyah</h3>
            <p>Aliases: Oppenheimer, MNDV, MNDLV, MADMANBEDLULMNDLV</p>
            <p>Occupation: Computer Engineering Student</p>
            <p>Hobby: AI Model Training, Music Listening</p>
            <p>API: JIKAN MOE</p>
            <div className="social-links">
              <a href="https://www.instagram.com/fth_ra/" target="_blank" rel="noopener noreferrer" className="icon-link">
                <FaInstagram className="icon instagram" />
              </a>
              <a href="https://www.facebook.com/fattah.afr/" target="_blank" rel="noopener noreferrer" className="icon-link">
                <FaFacebookF className="icon facebook" />
              </a>
              <a href="https://github.com/ProfDian" target="_blank" rel="noopener noreferrer" className="icon-link">
                <FaGithub className="icon github" />
              </a>
              <a href="https://open.spotify.com/user/31vgbklgtvrcbktexz64z2gargb4?si=d8bc39d02e3740ee" target="_blank" rel="noopener noreferrer" className="icon-link">
                <FaSpotify className="icon spotify" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </AboutStyled>
  );
}

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  0% { transform: translateX(-100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const AboutStyled = styled.div`
  min-height: 100vh;
  padding: 1rem;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  position: relative;
  overflow-x: hidden;
  background: linear-gradient(135deg, #1a1c2c 0%, #2a3c54 100%);

  .background-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #1a1c2c 0%, #2a3c54 100%);
    z-index: -1;
  }

  .back-home {
    position: fixed;
    top: 1rem;
    left: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.2rem;
    background: #4f46e5;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 100;
    animation: ${slideIn} 0.5s ease-out;

    .home-icon {
      font-size: 1.2rem;
    }

    &:hover {
      transform: translateY(-2px);
      background: #4338ca;
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
    }

    @media (max-width: 768px) {
      padding: 0.6rem 1rem;
      
      span {
        display: none;
      }
      
      .home-icon {
        font-size: 1.5rem;
      }
    }
  }

  .container {
    max-width: 1200px;
    margin: 4rem auto;
    background: rgba(255, 255, 255, 0.95);
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: ${fadeIn} 0.7s ease-out;

    @media (max-width: 768px) {
      margin: 3rem auto;
      padding: 1.5rem;
    }
  }

  .description {
    h1 {
      font-size: 2.5rem;
      color: #4f46e5;
      text-align: center;
      margin-bottom: 1.5rem;
      animation: ${float} 3s ease-in-out infinite;

      @media (max-width: 768px) {
        font-size: 1.8rem;
      }
    }

    p {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #4b5563;
      margin-bottom: 1rem;

      @media (max-width: 768px) {
        font-size: 0.95rem;
      }
    }
  }

  .about-me {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    .photo-container {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      overflow: hidden;
      border: 4px solid #4f46e5;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      animation: ${pulse} 2s ease-in-out infinite;

      @media (max-width: 768px) {
        width: 150px;
        height: 150px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    .profile-info {
      text-align: center;

      h2 {
        font-size: 2rem;
        color: #4f46e5;
        margin-bottom: 0.5rem;
        
        @media (max-width: 768px) {
          font-size: 1.5rem;
        }
      }

      h3 {
        font-size: 1.5rem;
        color: #4b5563;
        margin-bottom: 1rem;
        
        @media (max-width: 768px) {
          font-size: 1.2rem;
        }
      }

      p {
        font-size: 1rem;
        color: #6b7280;
        margin-bottom: 0.5rem;
        
        @media (max-width: 768px) {
          font-size: 0.9rem;
        }
      }

      .social-links {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        margin-top: 2rem;

        .icon-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #f3f4f6;
          transition: all 0.3s ease;
          
          @media (max-width: 768px) {
            width: 50px;
            height: 50px;
          }

          .icon {
            font-size: 2rem;
            transition: all 0.3s ease;
            
            @media (max-width: 768px) {
              font-size: 1.8rem;
            }

            &.instagram { color: #E1306C; }
            &.facebook { color: #1877F2; }
            &.github { color: #333; }
            &.spotify { color: #1DB954; }
          }

          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

            .icon {
              animation: ${pulse} 0.5s ease-in-out;
            }

            &:nth-child(1) { background: #E1306C; .icon { color: white; } }
            &:nth-child(2) { background: #1877F2; .icon { color: white; } }
            &:nth-child(3) { background: #333; .icon { color: white; } }
            &:nth-child(4) { background: #1DB954; .icon { color: white; } }
          }
        }
      }
    }
  }
`;

export default About;