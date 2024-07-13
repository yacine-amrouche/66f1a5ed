import { Flex, VStack, Text } from "@chakra-ui/react";
import { MdCropFree } from "react-icons/md";

export const EmptyList = ({ text }) => {
  return (
    <Flex justifyContent="center" paddingTop="4rem">
      <VStack>
        <MdCropFree />
        <Text fontSize="md" color="gray.500">
          {text}
        </Text>
      </VStack>
    </Flex>
  );
};
