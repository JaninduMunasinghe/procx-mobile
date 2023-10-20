import React from "react";
import { Box, Button, Icon, Popover, VStack } from "native-base";
import { SORT_METHOD } from "../../utils/constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const SortButton = ({
  sortMethod,
  setSortMethod,
  isPopoverOpen,
  setIsPopoverOpen,
  handleSortMethodChange,
}) => {
  return (
    <Popover
      isOpen={isPopoverOpen}
      onClose={() => setIsPopoverOpen(false)}
      trigger={(triggerProps) => (
        <VStack space={2}>
          <Button
            {...triggerProps}
            size="sm"
            variant="ghost"
            colorScheme="blue"
            onPress={() => setIsPopoverOpen(true)} // Open Popover on button click
          >
            <Icon
              as={MaterialCommunityIcons}
              name="sort"
              color="blue.600"
              size={6}
            />
          </Button>
        </VStack>
      )}>
      <Popover.Content accessibilityLabel="Sort Orders" w="56" mr={3}>
        <Popover.Arrow />
        <Popover.CloseButton />
        <Popover.Header>Sort Orders</Popover.Header>
        <Popover.Body>
          <Button.Group space={2}>
            <Button
              colorScheme="blue"
              variant="ghost"
              onPress={() => {
                handleSortMethodChange(SORT_METHOD.ASCENDING);
                setIsPopoverOpen(false); // Close Popover after selecting an option
              }}>
              Ascending
            </Button>
            <Button
              colorScheme="blue"
              variant="ghost"
              onPress={() => {
                handleSortMethodChange(SORT_METHOD.DESCENDING);
                setIsPopoverOpen(false); // Close Popover after selecting an option
              }}>
              Descending
            </Button>
          </Button.Group>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
};

export default SortButton;
