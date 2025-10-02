
import styled from 'styled-components';

export const ProfileContainer = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 40px;
    color: #333;
`;

export const ProfileCard = styled.div`
    background: #fff;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid #eee;
`;

export const ProfileHeader = styled.header`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
`;

export const ProfileAvatar = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 30px;
    border: 4px solid #d4a574;
`;

export const ProfileInfo = styled.div`
    h2 {
        margin: 0;
        font-size: 2em;
        color: #030303ff;
        font-family: 'Crimson Text', serif;
    }

    p {
        margin: 0;
        font-size: 1.1em;
        color: #888;
    }
`;

export const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid #eee;

    &:last-child {
        border-bottom: none;
    }
`;

export const InfoLabel = styled.span`
    font-weight: bold;
    color: #6b4423;
    font-family: 'Crimson Text', serif;
`;

export const InfoValue = styled.span`
    color: #555;
`;

export const StatsContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
`;

export const StatBox = styled.div`
    background: #f8f5f0;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    flex: 1;
    border: 1px solid #d4a574;

    h3 {
        margin: 0;
        font-size: 2.5em;
        color: #6b4423;
    }

    p {
        margin: 0;
        color: #888;
    }
`;
