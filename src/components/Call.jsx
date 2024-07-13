import {
  Box,
  Card,
  CardBody,
  Text,
  VStack,
  HStack,
  Heading,
  IconButton,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import {
  MdOutlinePhoneCallback,
  MdOutlineLocalPhone,
  MdOutlineArchive,
  MdOutlineUnarchive,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { extractTimeAMPM, extractDayAndMonth } from "../utils/dateUtils";

const PHONE_PLACE_HOLDER = "+1 477 630 1032";
const NAME_PLACE_HOLDER = "John Doe";

export const Call = ({
  id,
  direction,
  from,
  isArchived,
  callType,
  duration,
  date,
  onArchive,
}) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Card variant="elevated" width="100%">
      <CardBody>
        <HStack justifyContent="space-evenly">
          <Box
            border="1px solid"
            borderColor={callType === "answered" ? "green.500" : "red.500"}
            borderRadius="50%"
            padding={2}
          >
            {direction === "inbound" ? (
              <MdOutlinePhoneCallback />
            ) : (
              <MdOutlineLocalPhone />
            )}
          </Box>
          <VStack alignItems="flex-start" gap={0} flexGrow={1}>
            <Heading as="p" size="sm" noOfLines={1}>
              {from === 1 ? PHONE_PLACE_HOLDER : NAME_PLACE_HOLDER}
            </Heading>
            <Text fontSize="sm" color="gray.500" noOfLines={1}>
              {callType === "answered"
                ? `duration: ${duration}`
                : `tried to call ${NAME_PLACE_HOLDER}`}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {extractDayAndMonth(date)} / {extractTimeAMPM(date)}
            </Text>
          </VStack>
          {isArchived ? (
            <IconButton
              aria-label="unarchive"
              variant="ghost"
              icon={<MdOutlineUnarchive />}
              onClick={() => onArchive(id, isArchived)}
            />
          ) : (
            <IconButton
              aria-label="archive"
              variant="ghost"
              icon={<MdOutlineArchive />}
              onClick={() => onArchive(id, isArchived)}
            />
          )}
          <IconButton
            aria-label="view"
            variant="ghost"
            icon={<MdOutlineRemoveRedEye />}
            color="green.500"
            onClick={onToggle}
          />
        </HStack>
        <Collapse in={isOpen} animateOpacity>
          <HStack marginLeft="2.6rem" marginTop="1rem">
            <Text fontSize="sm">Additional call information ...</Text>
          </HStack>
        </Collapse>
      </CardBody>
    </Card>
  );
};
