import * as client from "./client";
import { useEffect, useState, useCallback  } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
export default function Session({ children }: { children: any }) {
  
  const [pending, setPending] = useState(true);
  
  const dispatch = useDispatch();
  
  const fetchProfile = useCallback(async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err) {
      console.error(err);
    }
    setPending(false);
  }, [dispatch])


  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (!pending) {
    return children;
  }
   // Added return statement for when pending is true
   return null;
}
