import { VStack } from "@chakra-ui/react";
import { Call } from "./Call";

export const CallsList = ({ calls, onArchive }) => {
  return (
    <VStack>
      {calls?.map(
        ({
          id,
          direction,
          from,
          is_archived,
          call_type,
          duration,
          created_at,
        }) => (
          <Call
            key={id}
            id={id}
            direction={direction}
            from={from}
            isArchived={is_archived}
            callType={call_type}
            duration={duration}
            date={created_at}
            onArchive={onArchive}
          />
        )
      )}
    </VStack>
  );
};
