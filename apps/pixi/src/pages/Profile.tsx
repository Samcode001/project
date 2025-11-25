import React, { useEffect, useState } from "react";
import { useAxiosAuth } from "../api/axiosClient";

export const Profile = () => {
  const axiosAuth = useAxiosAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    axiosAuth.get("/profile").then(res => {
      if (mounted) setProfile(res.data);
    }).catch(console.error);
    return () => { mounted = false; };
  }, [axiosAuth]);

  if (!profile) return <div>Loading…</div>;
  return <div>Welcome, {profile.username}</div>;
};
