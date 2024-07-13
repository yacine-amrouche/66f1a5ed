import { useEffect, useState } from "react";
import {
  fetchData,
  updateActivityArchiveStatus,
  updateMultipleActivityArchiveStatuses,
  unarchiveAll,
} from "./api/api";
import {
  useToast,
  Box,
  Tabs,
  TabList,
  Tab,
  TabIndicator,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { Header } from "./Header";
import { CallsList } from "./components/CallsList";
import { SectionHeader } from "./components/SectionHeader";
import { Loader } from "./components/Loader";
import { EmptyList } from "./components/EmptyList";

const TOAST_CONFIG = {
  title: "An error occured",
  status: "error",
  position: "top",
  isClosable: true,
};

export const App = () => {
  const [calls, setCalls] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const getCalls = async () => {
    setIsLoading(true);
    try {
      const data = await fetchData();
      setCalls(data);
    } catch (error) {
      toast(TOAST_CONFIG);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCalls();
  }, []);

  const activeCalls = calls.filter((call) => !call.is_archived);
  const archivedCalls = calls.filter((call) => call.is_archived);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  const handleArchiveButtonClick = async (id, isArchived) => {
    setIsLoading(true);
    try {
      await updateActivityArchiveStatus(id, isArchived);
      getCalls();
    } catch (error) {
      toast(TOAST_CONFIG);
    }
    setIsLoading(false);
  };

  const handleBulkArchive = async () => {
    setIsLoading(true);
    const ids = activeCalls.map((call) => call.id);
    try {
      await updateMultipleActivityArchiveStatuses(ids);
      getCalls();
    } catch (error) {
      toast(TOAST_CONFIG);
    }
    setIsLoading(false);
  };

  const handleUnarchiveAll = async () => {
    setIsLoading(true);
    try {
      await unarchiveAll();
      getCalls();
      setTabIndex(0);
    } catch (error) {
      toast(TOAST_CONFIG);
    }
    setIsLoading(false);
  };

  return (
    <Box
      width="376px"
      height="666px"
      zIndex="100"
      background="white"
      borderRadius="3px"
      boxShadow="md"
    >
      <Header />
      <Box>
        <Tabs
          index={tabIndex}
          onChange={handleTabsChange}
          position="relative"
          variant="line"
          size="md"
          colorScheme="green"
        >
          <TabList>
            <Tab>Activity</Tab>
            <Tab>Archived calls</Tab>
          </TabList>
          <TabIndicator mt="-1.5px" height="2px" borderRadius="1px" />
          <TabPanels>
            <TabPanel>
              <SectionHeader
                title="Calls"
                buttonText="Archive all"
                handleButtonClick={handleBulkArchive}
              />
              {isLoading && <Loader />}
              {activeCalls.length > 0 ? (
                <CallsList
                  calls={activeCalls}
                  onArchive={handleArchiveButtonClick}
                />
              ) : (
                <EmptyList text="No activity" />
              )}
            </TabPanel>
            <TabPanel>
              <SectionHeader
                title="Archived calls"
                buttonText="Unarchive all"
                handleButtonClick={handleUnarchiveAll}
              />
              {isLoading && <Loader />}
              {archivedCalls.length > 0 ? (
                <CallsList
                  calls={archivedCalls}
                  onArchive={handleArchiveButtonClick}
                />
              ) : (
                <EmptyList text="No archived activity" />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
