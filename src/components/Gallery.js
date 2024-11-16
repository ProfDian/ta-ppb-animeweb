import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useGlobalContext } from '../context/global';

function Gallery() {
    const { getAnimePictures, pictures } = useGlobalContext();
    const { id } = useParams();
    const [index, setIndex] = useState(0);
    const [characterData, setCharacterData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleImageClick = (i) => {
        setIndex(i);
    }

    const fetchCharacterData = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/characters/${id}`);
            const data = await response.json();
            setCharacterData(data.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
        }
    }
    

    useEffect(() => {
        getAnimePictures(id);
        fetchCharacterData();
    }, [id]);

    if (isLoading) {
        return <LoadingSpinner>Loading...</LoadingSpinner>;
    }

    return (
        <GalleryStyled>
            <BackButton to="/">
                <i className="fas fa-arrow-left"></i>
                Back to Home
            </BackButton>

            <ContentContainer>
                <GallerySection>
                    <MainImage>
                        <img src={pictures[index]?.jpg.image_url} alt={characterData?.name} />
                        <ImageOverlay>
                            <h2>{characterData?.name}</h2>
                        </ImageOverlay>
                    </MainImage>

                    <ThumbnailGrid>
                        {pictures?.map((picture, i) => (
                            <ThumbnailContainer 
                                key={i} 
                                onClick={() => handleImageClick(i)}
                                isActive={i === index}
                            >
                                <img src={picture?.jpg.image_url} alt="" />
                            </ThumbnailContainer>
                        ))}
                    </ThumbnailGrid>
                </GallerySection>

                <InfoSection>
                    <CharacterHeader>
                        <h1>{characterData?.name}</h1>
                        {characterData?.name_kanji && (
                            <KanjiName>{characterData.name_kanji}</KanjiName>
                        )}
                    </CharacterHeader>

                    <StatsContainer>
                        <FavoritesCount>
                            <i className="fas fa-heart"></i>
                            {characterData?.favorites?.toLocaleString()} Favorites
                        </FavoritesCount>
                        
                        {characterData?.nicknames?.length > 0 && (
                            <NicknameContainer>
                                <h3>Also Known As:</h3>
                                <NicknameTags>
                                    {characterData.nicknames.map((nickname, idx) => (
                                        <NicknameTag key={idx}>{nickname}</NicknameTag>
                                    ))}
                                </NicknameTags>
                            </NicknameContainer>
                        )}
                    </StatsContainer>

                    <AboutSection>
                        <h3>Character Background</h3>
                        <ScrollContent>{characterData?.about}</ScrollContent>
                    </AboutSection>
                </InfoSection>
            </ContentContainer>
        </GalleryStyled>
    );
}

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

const shine = keyframes`
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
`;

const float = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
`;

const heartbeat = keyframes`
    0% { transform: scale(1); }
    25% { transform: scale(1.1); }
    50% { transform: scale(1); }
    75% { transform: scale(1.1); }
    100% { transform: scale(1); }
`;

const LoadingSpinner = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    color: #4a5568;
    animation: ${heartbeat} 1.5s infinite;
`;

const GalleryStyled = styled.div`
    background: linear-gradient(135deg, #1a1c2c 0%, #2a3c54 100%);
    min-height: 100vh;
    padding: 2rem;
    color: #fff;
    font-family: 'Poppins', sans-serif;
`;

const BackButton = styled(Link)`
    position: fixed;
    top: 2rem;
    left: 2rem;
    text-decoration: none;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateX(-5px);
    }

    i {
        font-size: 1.2rem;
    }
`;

const ContentContainer = styled.div`
    max-width: 1400px;
    margin: 3rem auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    animation: ${fadeIn} 0.6s ease-out;

    @media (max-width: 1200px) {
        grid-template-columns: 1fr;
    }
`;

const GallerySection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const MainImage = styled.div`
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }

    img {
        width: 100%;
        height: auto;
        display: block;
        transition: transform 0.3s ease;
    }

    &:hover img {
        transform: scale(1.05);
    }
`;

const ImageOverlay = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    padding: 2rem 1rem 1rem;
    transform: translateY(100%);
    transition: transform 0.3s ease;

    h2 {
        color: #fff;
        font-size: 1.5rem;
        margin: 0;
    }

    ${MainImage}:hover & {
        transform: translateY(0);
    }
`;

const ThumbnailGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 15px;
    backdrop-filter: blur(10px);
`;

const ThumbnailContainer = styled.div`
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s ease;

    img {
        width: 100%;
        height: 100px;
        object-fit: cover;
        transition: all 0.3s ease;
        filter: ${props => props.isActive ? 'grayscale(0)' : 'grayscale(60%)'};
        border: ${props => props.isActive ? '3px solid #60a5fa' : '3px solid transparent'};
        transform: ${props => props.isActive ? 'scale(1.1)' : 'scale(1)'};
    }

    &:hover img {
        filter: grayscale(0);
        transform: scale(1.1);
    }
`;

const InfoSection = styled.div`
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 2rem;
    animation: ${fadeIn} 0.6s ease-out;
`;

const CharacterHeader = styled.div`
    margin-bottom: 2rem;
    
    h1 {
        font-size: 2.5rem;
        margin: 0;
        background: linear-gradient(to right, #60a5fa, #93c5fd);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 200% auto;
        animation: ${shine} 3s linear infinite;
    }
`;

const KanjiName = styled.h2`
    font-size: 1.8rem;
    color: rgba(255, 255, 255, 0.7);
    margin: 0.5rem 0;
    font-weight: 400;
`;

const StatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
`;

const FavoritesCount = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.1rem;
    color: #f87171;

    i {
        animation: ${heartbeat} 2s infinite;
    }
`;

const NicknameContainer = styled.div`
    h3 {
        color: #60a5fa;
        margin-bottom: 0.5rem;
    }
`;

const NicknameTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

const NicknameTag = styled.span`
    background: rgba(96, 165, 250, 0.2);
    color: #93c5fd;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    animation: ${float} 3s ease infinite;
    animation-delay: ${props => Math.random() * 2}s;

    &:hover {
        background: rgba(96, 165, 250, 0.3);
        transform: translateY(-3px);
    }
`;

const AboutSection = styled.div`
    h3 {
        color: #60a5fa;
        margin-bottom: 1rem;
    }
`;

const ScrollContent = styled.div`
    max-height: 300px;
    overflow-y: auto;
    padding-right: 1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(96, 165, 250, 0.5);
        border-radius: 3px;
        
        &:hover {
            background: rgba(96, 165, 250, 0.7);
        }
    }
`;

export default Gallery;