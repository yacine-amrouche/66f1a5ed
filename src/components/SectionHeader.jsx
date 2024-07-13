import { HStack, Heading, Button } from "@chakra-ui/react";
import { MdOutlineArchive } from "react-icons/md";

export const SectionHeader = ({ title, buttonText, handleButtonClick }) => {
  return (
    <HStack justifyContent="space-between">
      <Heading as="h1" size="md">
        {title}
      </Heading>
      <Button
        leftIcon={<MdOutlineArchive />}
        variant="ghost"
        size="sm"
        onClick={() => handleButtonClick()}
      >
        {buttonText}
      </Button>
    </HStack>
  );
};
