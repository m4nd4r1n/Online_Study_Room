import React from 'react';
import tw from 'tailwind-styled-components';

const Container = tw.div`
  flex
  h-[55vh]
  justify-center
  bg-[url('../public/character/body_default.png')]
  bg-center
  bg-contain
  bg-no-repeat
`;

const Item = tw.div`
  flex
  flex-col
  relative
  mt-[4vmax]
  pointer-events-none
  select-none
`;

const Character = () => {
  return (
    <Container>
      <Item>
        {/* <img className="bg-contain" src={'character/muffler.png'} alt="neck" />
        <img src={'character/pants1.png'} alt="pants" /> */}
      </Item>
    </Container>
  );
};

export default Character;
