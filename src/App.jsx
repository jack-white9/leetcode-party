import { FriendCard } from "./FriendCard/FriendCard";
import { useEffect, useState } from "react";
import { Box, Skeleton, Stack, Heading, Input, Flex } from "@chakra-ui/react";
import "./App.css";

const getUserData = async (user) => {
  const url = "https://leetcode-stats-api.herokuapp.com/" + user;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    let json = await response.json();
    json = { ...json, id: user };
    return json;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState("");
  const handleChange = (event) => setValue(event.target.value);
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      const newUser = await getUserData(value);
      if (newUser) {
        setUsers((prevUsers) => [newUser, ...prevUsers]);
        console.log(users); // Note: This might not log the updated state immediately
      }
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const inputted_user = "jekwat";
      const user = await getUserData(inputted_user);
      if (user) {
        setUsers([user]);
      } else {
        console.error("Failed to fetch user data");
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  return (
    <Flex
      direction="column"
      width={{ base: "90vw", sm: "85vw", md: "60vw", lg: "50vw" }}
      margin="0 auto"
      gap="5"
    >
      <Heading align="center" marginTop="25">
        Leetcode
        <Box as="Heading" color="#ffa115">
          Party
        </Box>
      </Heading>
      <Input
        placeholder="Add a friend..."
        size="lg"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
      />
      {isLoading ? (
        <Stack>
          <Skeleton height="118px" />
        </Stack>
      ) : (
        users.map((user) => <FriendCard key={user.id} user={user} />)
      )}
    </Flex>
  );
};
