import { Spinner, Flex } from "@chakra-ui/react";

export const Loader = () => {
  return (
    <Flex justifyContent="center">
      <Spinner size="lg" />
    </Flex>
  );
};
