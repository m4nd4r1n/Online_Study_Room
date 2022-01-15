import React from 'react';
import styled from 'styled-components';

const CharacterContainer = styled.div`
  display: flex;
  height: 55vh;
  justify-content: center;
  background-image: url('/character/body_default.png');
  background-position: center;
  background-size: over;
  background-repeat: no-repeat;
`;

const CharacterItem = styled.div`
  position: absolute;
`;

const Character = () => {
  return (
    <CharacterContainer>
      <CharacterItem>
        <img src={'character/muffler.png'} alt="neck" />
      </CharacterItem>
      <CharacterItem>
        <img src={'character/pants1.png'} alt="pants" />
      </CharacterItem>
    </CharacterContainer>
  );
};

export default Character;
