import {
  AspectRatio,
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Image,
  Stack,
} from "native-base";
import { Text } from "react-native";
import { calculateOrderTotal } from "../utils/helpers/supplier/calculateOrderTotal";
import { getNoOfDays } from "../utils/helpers/supplier/getNoOfDays";
import { getDeliveryUrgency } from "../utils/helpers/supplier/getDeliveryUrgency";
import { URGENT_STATUS } from "../utils/constants";
import { useEffect, useState } from "react";
import { formatPrice } from "../utils/helpers/supplier/formatPrice";

const OrderCard = (Props) => {
  const [urgency, setUrgency] = useState(URGENT_STATUS.LOW);

  useEffect(() => {
    setUrgency(getDeliveryUrgency(Props.date));
  }, []);

  return (
    <Box p={0} mb={3} alignItems="center">
      <Box
        w="100%"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md">Order no: {Props.orderId}</Heading>
            <Text>for {Props.supplierName || "Supplier"}</Text>
            <HStack flex={1} alignItems="center">
              {Props.date && (
                <>
                  <Box mr={2}>Delivery</Box>
                  <Center
                    bg={
                      urgency === URGENT_STATUS.LOW
                        ? "green.400" // green
                        : urgency === URGENT_STATUS.MEDIUM
                        ? "yellow.400" // yellow
                        : urgency === URGENT_STATUS.URGENT
                        ? "orange.400" // orange
                        : urgency === URGENT_STATUS.PAST
                        ? "red.400" // red
                        : "" // gray
                    }
                    _dark={{
                      bg: "yellow.400",
                    }}
                    _text={{
                      color: "black",
                      textTransform: "uppercase",
                      fontWeight: "500",
                      fontSize: "xs",
                    }}
                    bottom="0"
                    px="1.5"
                    py="0.5"
                    rounded={5}>
                    {getNoOfDays(Props.date)}
                  </Center>
                </>
              )}
            </HStack>
            <Heading size="sm">
              Order total: {formatPrice(calculateOrderTotal(Props.items))} LKR
            </Heading>
          </Stack>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="end" w="100%" space={2}>
              {Props.items.map((item) => (
                <Box position="relative" shadow={3}>
                  <Image
                    rounded={6}
                    w={16}
                    h={16}
                    src={item.imageUrl}
                    alt={item.itemName}
                  />
                  <Center
                    bg="green.600"
                    _dark={{
                      bg: "yellow.400",
                    }}
                    _text={{
                      color: "white",
                      fontWeight: "500",
                      fontSize: "xs",
                    }}
                    bottom={1}
                    position="absolute"
                    right={1}
                    w="6"
                    px="1"
                    py="0.5"
                    rounded={5}>
                    {item.qty}
                  </Center>
                </Box>
              ))}
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};

export default OrderCard;
