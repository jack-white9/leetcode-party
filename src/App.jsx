import { FriendCard } from "./FriendCard/FriendCard";
import { useEffect, useState } from "react";
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
    <main>
      <h1 className="main-header">LeetcodeParty</h1>
      {users.map((user) => (
        <FriendCard key={user.id} user={user} isLoading={isLoading} />
      ))}
    </main>
  );
};
