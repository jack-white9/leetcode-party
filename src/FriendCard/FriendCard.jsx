import {
  Card,
  CardHeader,
  CardBody,
  Stack,
  Heading,
  Text,
  Skeleton,
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

  console.log(user);

  return (
    <Stack spacing="4">
      <Card key={user.id} variant="outline">
        <CardHeader>
          <Heading size="md">{user.id}</Heading>
          <Text size="sm" as="i">
            Last solve: {getLatestSolve()}
          </Text>
        </CardHeader>
        <CardBody>
          <Text>Total: {user.totalSolved}</Text>
          <Text>Easy: {user.easySolved}</Text>
          <Text>Medium: {user.mediumSolved}</Text>
          <Text>Hard: {user.hardSolved}</Text>
        </CardBody>
      </Card>
    </Stack>
  );
};
