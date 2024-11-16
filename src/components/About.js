import React from 'react';
import styled, { keyframes } from 'styled-components';
import {FaInstagram, FaFacebookF, FaGithub, FaSpotify } from 'react-icons/fa';

function About() {
  return (
    <AboutStyled>
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
                <FaInstagram className="icon" />
              </a>
              <a href="https://www.facebook.com/fattah.afr/" target="_blank" rel="noopener noreferrer" className="icon-link">
                <FaFacebookF className="icon" />
              </a>
              <a href="https://github.com/ProfDian" target="_blank" rel="noopener noreferrer" className="icon-link">
                <FaGithub className="icon" />
              </a>
              <a href="https://open.spotify.com/user/31vgbklgtvrcbktexz64z2gargb4?si=d8bc39d02e3740ee" target="_blank" rel="noopener noreferrer" className="icon-link">
                <FaSpotify className="icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </AboutStyled>
  );
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const colorAnimation = keyframes`
  0% {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  50% {
    text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  }
  100% {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const iconAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const AboutStyled = styled.div`
  background-size: 400% 400%;
  animation: ${fadeIn} 0.5s ease-in-out, ${colorAnimation} 10s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a1c2c 0%, #2a3c54 100%);
  min-height: 100vh;
  padding: 2rem;
  color: #fff;
  font-family: 'Poppins', sans-serif;

  .container {
    width: 80%;
    max-width: 1300px;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 3rem;
    border-radius: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    animation: ${fadeIn} 0.7s ease-in-out;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  .description {
    margin-bottom: 2rem;

    h1 {
      font-size: 3rem;
      color: #4f46e5;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 4px;
      animation: ${colorAnimation} 10s ease infinite;
    }

    p {
      font-size: 1.2rem;
      line-height: 1.6;
      color: #4b5563;
    }
  }

  .about-me {
    animation: ${slideIn} 0.7s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    .photo-container {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .profile-info {
      text-align: center;

      h2 {
        font-size: 2rem;
        color: #4f46e5;
        margin-bottom: 0.5rem;
        animation: ${colorAnimation} 10s ease infinite;
      }

      h3 {
        font-size: 1.6rem;
        color: #4b5563;
        margin-bottom: 0.5rem;
      }

      p {
        font-size: 1.1rem;
        color: #6b7280;
        margin-bottom: 0.5rem;
      }

      .social-links {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;

        .icon-link {
          font-size: 1.5rem;
          color: #4f46e5;
          transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;

          .icon {
            &:hover {
              animation: ${iconAnimation} 0.5s ease-in-out;
              color: #4338ca;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .container {
      width: 90%;
      grid-template-columns: 1fr;
    }

    .about-me {
      animation: none;
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media screen and (max-width: 768px) {
    .container {
      padding: 2rem;
    }

    .description h1 {
      font-size: 2.5rem;
    }

    .about-me .photo-container {
      width: 150px;
      height: 150px;
    }

    .about-me .profile-info h2 {
      font-size: 1.8rem;
    }

    .about-me .profile-info h3 {
      font-size: 1.4rem;
    }

    .about-me .profile-info p {
      font-size: 1rem;
    }
  }
`;

export default About;