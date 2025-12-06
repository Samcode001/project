import { useEffect, useState } from "react";
import { useAxiosAuth } from "../api/axiosClient";
import { Button } from "@mui/material";
import { useAuth } from "../auth/AuthProvider";

export const Profile = () => {
  const axiosAuth = useAxiosAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const {logout}=useAuth();

  const handleLogout = async () => {
     logout()
    window.location.reload();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosAuth.get("/profile");
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading…</div>;
  if (!profile) return <div>Not logged in</div>;

  return (
    <div>
      Welcome, {profile.username}
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
