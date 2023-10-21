import { Button, Text } from "native-base";
import { Box, Center, HStack, Heading, Image, Stack } from "native-base";
import React from "react";
import { ITEM_RESTRICTION } from "../utils/constants";
import { formatPrice } from "../utils/helpers/supplier/formatPrice";

const OrderItem = (Props) => {
  return (
    <Stack
      direction={["row", "row", "row"]}
      rounded="lg"
      overflow="hidden"
      height={["40", "96", "48"]}
      //   shadow="2"
      _light={{
        backgroundColor: "coolGray.50",
      }}>
      <Box w={["40%", "50%", "40"]} h={["40", "50%", "48"]}>
        <Image
          w={["40", "100%", "40"]}
          h="40"
          src={Props.item?.imageUrl}
          roundedTopLeft={8}
          roundedBottomLeft={8}
          alt="image"
        />
        {Props.item?.restricted && (
          <Center
            bg="red.500"
            _text={{
              color: "white",
              fontWeight: "700",
              fontSize: "xs",
            }}
            position="absolute"
            bottom="0"
            roundedTopRight={8}
            roundedBottomLeft={8}
            px="3"
            py="1.5">
            {ITEM_RESTRICTION.RESTRICTED}
          </Center>
        )}
      </Box>
      <Stack flex="1" p="4" space={[3, 3, 1.5]}>
        <Stack space="2">
          <Heading size="sm">{Props.item?.itemName}</Heading>
          <Text fontSize="xs" color="gray.500" fontWeight="500">
            {Props.item?.description}
          </Text>
        </Stack>
        <HStack>
          <Text fontWeight="400">Unit Price: </Text>
          <Heading size="sm">{formatPrice(Props.item?.price)} LKR</Heading>
        </HStack>
        <HStack mt={-2}>
          <Text fontWeight="400">Qty: </Text>
          <Heading size="sm">{Props.item?.qty}</Heading>
          <Text ml={1} fontWeight="400">
            Units
          </Text>
        </HStack>
        <Text fontSize={12}>ID: {Props.item?.id}</Text>
      </Stack>
    </Stack>
  );
};

export default OrderItem;
