import {
  Card,
  CardHeader,
  Flex,
  Box,
  Heading,
  Text,
  Stack,
} from "@chakra-ui/react";

export const FriendCard = ({ user }) => {
  const getLatestSolve = () => {
    // Get largest time from epoch object
    const epochTimes = Object.keys(user.submissionCalendar).map(Number);
    const latestEpochTime = Math.max(...epochTimes);
    const date = new Date(0); // 0 sets the date to the epoch
    date.setUTCSeconds(latestEpochTime);

    // Get the current date
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Remove the time part of the date for comparison
    const solvedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    // Format date to "Today", "Yesterday", or "26 July 2024"
    let formattedDate;
    if (solvedDate.getTime() === today.getTime()) {
      formattedDate = "Today";
    } else if (solvedDate.getTime() === yesterday.getTime()) {
      formattedDate = "Yesterday";
    } else {
      formattedDate = date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    return formattedDate;
  };

  return (
    <Stack spacing="4">
      <Card
        key={user.id}
        variant="elevated"
        paddingTop="15"
        paddingBottom="15"
        paddingLeft="10"
        paddingRight="10"
      >
        <CardHeader>
          <Flex
            justify="space-between"
            align="center"
            direction={{ base: "column", md: "row" }}
          >
            <Box align="center" width="40%">
              <Heading size="md">{user.id}</Heading>
              <Text size="sm" as="i" color="grey">
                Last solve: {getLatestSolve()}
              </Text>
            </Box>
            <Text
              display="flex"
              flexDirection={"column"}
              textAlign={"center"}
              color="#27241c"
            >
              {user.easySolved}
              <Box as="b" color="green">
                easy
              </Box>
            </Text>
            <Text
              display="flex"
              flexDirection={"column"}
              textAlign={"center"}
              color="#27241c"
            >
              {user.mediumSolved}
              <Box as="b" color="darkorange">
                medium
              </Box>
            </Text>
            <Text
              display="flex"
              flexDirection={"column"}
              textAlign={"center"}
              color="#27241c"
            >
              {user.hardSolved}
              <Box as="b" color="tomato">
                hard
              </Box>
            </Text>
            <Text
              display="flex"
              flexDirection={"column"}
              textAlign={"center"}
              color="#27241c"
            >
              {user.totalSolved}
              <Box as="b" color="black">
                total
              </Box>
            </Text>
          </Flex>
        </CardHeader>
      </Card>
    </Stack>
  );
};
