import { useEffect } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signIn, signOut } from "../../api/auth.api.mjs";
import {
  Box,
  IconButton,
  Typography,
  Avatar,
  Button,
  Drawer,
  Divider,
} from "@mui/material";

const User = () => {
  const { login, register, isAuthenticated, user, logout, getToken } =
    useKindeAuth();

  console.log(user);

  const SignMutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {},
    onError: () => {},
  });

  const SignOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {},
    onError: () => {},
  });

  useEffect(() => {
    const fetchTokenAndAuthenticate = async () => {
      const accessToken = await getToken();

      console.log(accessToken);

      if (isAuthenticated) {
        await SignMutation.mutateAsync(user);
      } else if (!isAuthenticated) {
        await SignOutMutation.mutateAsync();
      }
    };

    fetchTokenAndAuthenticate();
  }, [isAuthenticated]);

  return (
    <Box>
      {isAuthenticated && (
        <>
          <IconButton color="inherit">
            <Avatar src={user.picture} />
          </IconButton>
          <Button color="inherit" onClick={logout}>
            Log Out
          </Button>
        </>
      )}
    </Box>
  );
};

export default User;
