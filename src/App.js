import React, { useState } from "react";
import { uploadData, getUrl } from "@aws-amplify/storage";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

// Import your logo image (assuming it's in the src/assets folder)
import logo from ".//dot.jpg";

Amplify.configure(awsconfig);

function App({ signOut, user }) {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return alert("Please select a file to upload.");

    try {
      const fileName = `${user.username}-${file.name}`;
      await uploadData({
        key: fileName,
        data: file,
        options: { contentType: file.type }
      });
      alert("File uploaded successfully!");
      fetchFile(fileName);
    } catch (error) {
      console.error("Upload error:", error);
      alert("File upload failed.");
    }
  };

  const fetchFile = async (fileName) => {
    try {
      const url = await getUrl({ key: fileName });
      setFileUrl(url);
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  return (
    <Authenticator
      components={{
        Header() {
          return (
            <div style={authStyles.header}>
              <div style={authStyles.logoContainer}>
                <img 
                  src={logo} 
                  alt="DoT Cloud Logo" 
                  style={authStyles.logo} 
                />
              </div>
              <h1 style={authStyles.title}>DoT Cloud</h1>
              <p style={authStyles.subtitle}>Secure Cloud Storage Solution</p>
            </div>
          );
        }
      }}
      formFields={{
        signIn: {
          username: {
            placeholder: 'Enter your email',
          },
          password: {
            placeholder: 'Enter your password',
          },
        },
        signUp: {
          username: {
            placeholder: 'Enter your email',
          },
          password: {
            placeholder: 'Create your password',
          },
          confirm_password: {
            placeholder: 'Confirm your password',
          },
        },
      }}
    >
      {({ signOut, user }) => (
        <div style={styles.container}>
          {/* Background Overlay */}
          <div style={styles.backgroundOverlay}></div>

          {/* ✨ Motivational Text */}
          <h1 style={styles.tagline}>
            DoT Cloud Presents<br />"Secure, Reliable & Limitless Storage for Your Digital World!"
          </h1>

          {/* Upload Card */}
          <div style={styles.card}>
            {/* User Profile with Logo */}
            <div style={styles.profile}>
              <img 
                src={logo} 
                alt="Profile" 
                style={styles.profileImage} 
              />
              <h2 style={styles.welcomeText}>Welcome, {user.username}!</h2>
            </div>

            {/* File Upload Section */}
            <label htmlFor="fileUpload" style={styles.fileInput}>
              <input 
                type="file" 
                id="fileUpload" 
                onChange={handleFileChange} 
                style={{ display: 'none' }}
              />
              <p style={styles.uploadText}>Drag & Drop or Click to Upload</p>
            </label>
            <button onClick={uploadFile} style={styles.button}>Upload File</button>

            {/* Show Uploaded File */}
            {fileUrl && (
              <div style={styles.preview}>
                <p>✅ File Uploaded:</p>
                <a 
                  href={fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={styles.fileLink}
                >
                  View File
                </a>
              </div>
            )}

            {/* Sign Out Button */}
            <button onClick={signOut} style={styles.logoutButton}>Sign Out</button>
          </div>
        </div>
      )}
    </Authenticator>
  );
}

// Modern Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "100vh",
    background: "linear-gradient(to right, rgb(105, 199, 167), rgb(100, 151, 159))",
    position: "relative",
    textAlign: "center",
    paddingTop: "20px",
  },
  backgroundOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backdropFilter: "blur(10px)",
    zIndex: "-1",
  },
  tagline: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff",
    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
    margin: "40px 20px 0",
    zIndex: 1,
  },
  card: {
    background: "rgba(255, 255, 255, 0.2)",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "400px",
    maxWidth: "90%",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    margin: "100px 0 40px",
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  profileImage: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    border: "2px solid white",
  },
  welcomeText: {
    color: "#fff",
    marginTop: "10px",
  },
  fileInput: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px 15px",
    border: "2px dashed rgba(255, 255, 255, 0.5)",
    borderRadius: "10px",
    cursor: "pointer",
    marginBottom: "15px",
    color: "#fff",
    transition: "all 0.3s ease",
    "&:hover": {
      borderColor: "rgba(255, 255, 255, 0.8)",
    },
  },
  uploadText: {
    margin: 0,
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
    width: "100%",
    marginTop: "10px",
    "&:hover": {
      backgroundColor: "#3e8e41",
    },
  },
  logoutButton: {
    backgroundColor: "#ff4b5c",
    color: "white",
    border: "none",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
    transition: "0.3s",
    width: "100%",
    "&:hover": {
      backgroundColor: "#e03e4d",
    },
  },
  preview: {
    marginTop: "20px",
    color: "#fff",
    wordBreak: "break-word",
  },
  fileLink: {
    color: "#4CAF50",
    textDecoration: "none",
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "underline",
    },
  },
};

// Authenticator Styles
const authStyles = {
  header: {
    textAlign: 'center',
    padding: '20px 0',
    marginBottom: '20px',
    background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
    borderRadius: '10px 10px 0 0',
    color: 'white',
  },
  logoContainer: {
    marginBottom: '15px',
  },
  logo: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid white',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    margin: '0 auto',
  },
  title: {
    margin: '0',
    fontSize: '28px',
    fontWeight: '700',
    letterSpacing: '1px',
  },
  subtitle: {
    margin: '5px 0 0',
    fontSize: '14px',
    opacity: '0.9',
  },
};

export default withAuthenticator(App, {
  socialProviders: [],
  variation: 'modal',
  loginMechanisms: ['email'],
});