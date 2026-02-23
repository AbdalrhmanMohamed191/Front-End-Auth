import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../../apis/api";
import { Button } from "react-bootstrap";
import { baseUrlHandler } from "../../utils/baseUrlHandler";
import { errorHandler } from "../../utils/errorHandler";
import { setUser } from "../../store/slices/userSlice";

const Connections = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseUrl = baseUrlHandler();
  const location = useLocation();

  const [tab, setTab] = useState("followers"); // followers / following
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  // Read tab from query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialTab = params.get("tab") || "followers";
    setTab(initialTab);
  }, [location.search]);

  // Fetch connections
  useEffect(() => {
    async function fetchConnections() {
      try {
        const res = await api.get(`/api/v1/user/${id}/connections`);
        setFollowers(res.data.followers);
        setFollowing(res.data.following);
      } catch (err) {
        errorHandler(err);
      }
    }
    fetchConnections();
  }, [id]);

  const handleFollow = async (targetId, isFollowing) => {
    try {
      const token = localStorage.getItem("token");
      const url = isFollowing
        ? `/api/v1/user/${targetId}/unfollow`
        : `/api/v1/user/${targetId}/follow`;

      const res = await api.patch(url, {}, { headers: { Authorization: `Bearer ${token}` } });

      // Update followers/following count
      const updateCount = (list) => list.map((u) => u._id === targetId ? { ...u, followersCount: res.data.followersCount } : u);
      setFollowers(prev => updateCount(prev));
      setFollowing(prev => updateCount(prev));

      // Update Redux
      dispatch(setUser({
        ...user,
        following: isFollowing ? user.following.filter(u => u !== targetId) : [...user.following, targetId]
      }));

      // Update UI immediately
      if (tab === "following") {
        setFollowing(prev => isFollowing ? prev.filter(u => u._id !== targetId) : prev);
      } else {
        setFollowers(prev => prev);
      }
    } catch (err) {
      errorHandler(err);
    }
  };

  const list = tab === "followers" ? followers : following;

  return (
    <div className="container mt-5" style={{ maxWidth: 600 }}>
      {/* Tabs */}
      <div className="d-flex justify-content-around mb-4 border-bottom">
        <button className={`btn ${tab === "followers" ? "fw-bold" : ""}`} onClick={() => setTab("followers")}>
          Followers
        </button>
        <button className={`btn ${tab === "following" ? "fw-bold" : ""}`} onClick={() => setTab("following")}>
          Following
        </button>
      </div>

      {/* List */}
      {list.length > 0 ? (
        list.map(u => {
          const isFollowing = user.following?.includes(u._id);
          return (
            <div key={u._id} className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-3" onClick={() => navigate(`/user/${u._id}`)} style={{ cursor: "pointer" }}>
                <img src={`${baseUrl}/${u.profileImage}`} alt="" width="45" height="45" className="rounded-circle" style={{ objectFit: "cover" }} />
                <strong>{u.username}</strong>
              </div>
              {u._id !== user._id && (
                <Button size="sm" variant={isFollowing ? "outline-secondary" : "dark"} onClick={() => handleFollow(u._id, isFollowing)}>
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-center text-muted">No {tab} yet</p>
      )}
    </div>
  );
};

export default Connections;
