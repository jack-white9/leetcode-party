import { FriendCard } from "./FriendCard/FriendCard";
import { useEffect, useState } from "react";
import { Box, Skeleton, Stack, Heading, Input, Flex } from "@chakra-ui/react";
import "./App.css";

export const App = () => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");

  console.log(users);

  const handleChange = (event) => setValue(event.target.value);

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      const newUser = await getUserData(value);
      if (newUser) {
        setUsers((prevUsers) => [newUser, ...prevUsers]);
      }
      setValue("");
    }
  };

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

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

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
