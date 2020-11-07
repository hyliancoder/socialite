import { Text } from '@chakra-ui/core';

import HeaderLayout from 'src/layouts/HeaderLayout';
import MainLayout from 'src/layouts/MainLayout';

const HomePage = ({ name }) => {
  return (
    <>
      <HeaderLayout>{name}</HeaderLayout>
      <MainLayout>
        <Text>homepage yee</Text>
      </MainLayout>
    </>
  );
};

export default HomePage;
