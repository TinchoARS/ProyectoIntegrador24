import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { getProfileData, updateProfile } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import defaultProfileImage from '../assets/default-profile.jpg';

// Global Styles
const GlobalStyle = createGlobalStyle`
  body,
  html {
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    background: linear-gradient(-140deg, #ff65c5, #fa909d, #fcce6c);
    color: #575556;
    font-family: "Euclid Circular A", "Poppins";
  }

  @media (max-width: 720px) {
    .profile-card {
      margin: 0 40px;
      padding-left: 50px;
      padding-right: 50px;
      width: 100%;
      text-align: center;
      flex-direction: column;
    }

    .profile-card h2 {
      font-size: 30px;
    }

    .profile-card img {
      margin: -100px 0 30px 0;
      width: 100%;
      max-width: 1000px;
    }

    .profile-card .profile-stats var {
      min-width: 90px;
    }

    .profile-card button {
      min-width: 160px;
    }
  }
`;

// Styled Components
const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  width: 75vw;
  max-width: 650px;
  padding: 50px 30px 50px 20px;
  background: #ffffff;
  border-radius: 24px;
`;

const ProfileImage = styled.img`
  max-width: 280px;
  width: 32vw;
  height: 270px;
  object-fit: cover;
  margin-left: -60px;
  margin-right: 40px;
  border-radius: inherit;
`;

const ProfileHeading = styled.h2`
  font-size: 28px;
  font-weight: 400;
  margin: 0;
`;

const ProfileSubheading = styled.h3`
  font-size: 16px;
  font-weight: 400;
  opacity: 0.5;
  margin: 0 0 20px;
`;

const ProfileParagraph = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: rgb(0 0 0 / 70%);
  margin-bottom: 24px;
`;

const ProfileButtons = styled.div`
  display: inline-flex;
  gap: 10px;
`;

const Button = styled.button`
  border: 1px solid #a7a7a7;
  background: transparent;
  color: #a7a7a7;
  font-family: inherit;
  padding: 16px 20px;
  font-size: 18px;
  border-radius: 6px;
  min-width: 120px;

  &.profile-primary {
    background: #fe5c89;
    color: #f9f9f9;
    border: 0;
  }
`;

const ProfileStats = styled.ul`
  display: flex;
  gap: 24px;
  list-style: none;
  margin: 0 0 24px;
  padding: 0;
`;

const StatsValue = styled.var`
  display: block;
  font-style: normal;
  font-size: 26px;
`;

const StatsLabel = styled.label`
  opacity: 0.5;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 400;
`;

const FormInput = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #a7a7a7;
  font-size: 16px;
`;

const FormTextarea = styled.textarea`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #a7a7a7;
  font-size: 16px;
`;

const FileInput = styled.input`
  padding: 10px;
`;

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (token) {
        try {
          const profileData = await getProfileData(token);
          setProfile(profileData);
        } catch (error) {
          console.error('Failed to fetch profile data:', error);
        }
      } else {
        navigate('/login');
      }
    };

    fetchProfileData();
  }, [token, navigate]);

  useEffect(() => {
    const handlePopState = (event) => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        navigate('/login');
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (token && profile) {
      try {
        const updatedProfile = await updateProfile(token, profile, profile.user__id);
        setProfile(updatedProfile);
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update profile:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfile((prevProfile) => ({ ...prevProfile, image: URL.createObjectURL(file) }));
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GlobalStyle />
      <ProfileContainer>
        {isEditing ? (
          <ProfileForm>
            <FormGroup>
              <FormLabel>First Name:</FormLabel>
              <FormInput type="text" name="first_name" value={profile.first_name} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Last Name:</FormLabel>
              <FormInput type="text" name="last_name" value={profile.last_name} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Username:</FormLabel>
              <FormInput type="text" name="username" value={profile.username} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Email:</FormLabel>
              <FormInput type="email" name="email" value={profile.email} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Fecha de nacimiento:</FormLabel>
              <FormInput type="date" name="dob" value={profile.dob} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Biografía:</FormLabel>
              <FormTextarea name="bio" value={profile.bio} onChange={handleChange}></FormTextarea>
            </FormGroup>
            <FormGroup>
              <FormLabel>Estado:</FormLabel>
              <FormInput type="number" name="state" value={profile.state} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Imagen de perfil:</FormLabel>
              <FileInput type="file" name="image" onChange={handleImageChange} />
            </FormGroup>
            <Button type="button" onClick={handleSaveClick}>Save</Button>
          </ProfileForm>
        ) : (
          <div>
            <ProfileImage src={profile.image || defaultProfileImage} alt="Profile" />
            <div>
              <ProfileHeading>{profile.first_name} {profile.last_name}</ProfileHeading>
              <ProfileSubheading>{profile.username}</ProfileSubheading>
              <ProfileParagraph>Email: {profile.email}</ProfileParagraph>
              <ProfileParagraph>Fecha de nacimiento: {profile.dob || 'N/A'}</ProfileParagraph>
              <ProfileParagraph>Biografía: {profile.bio || 'N/A'}</ProfileParagraph>
              <ProfileStats>
                <li>
                  <StatsValue>{profile.state}</StatsValue>
                  <StatsLabel>Estado</StatsLabel>
                </li>
              </ProfileStats>
              <ProfileButtons>
                <Button className="profile-primary" onClick={handleEditClick}>Editar Perfil</Button>
                <Button onClick={handleLogoutClick}>Cerrar Sesión</Button>
              </ProfileButtons>
            </div>
          </div>
        )}
      </ProfileContainer>
    </>
  );
};

export default Profile;
