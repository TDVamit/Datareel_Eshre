import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  Fade,
  Collapse,
} from "@mui/material";

import {
  MessageCircle,
  Copy,
  Mail,
  ChevronDown,
  ChevronUp,
  Lock,
  Users,
  Building,
} from "lucide-react";

interface ShareVideoDialogProps {
  open: boolean;
  onClose: () => void;
  videoUrl: string | "";
}

const ShareVideoDialog: React.FC<ShareVideoDialogProps> = ({
  open,
  onClose,
  videoUrl,
}) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFynancialExpanded, setIsFynancialExpanded] = useState(false);

  const handleCopy = async (text: string, type: string) => {
    // Reset states
    setCopyError(false);
    setCopied(null);
    
    // Check if text is available
    if (!text || text.trim() === '') {
      setCopyError(true);
      setShowSnackbar(true);
      console.error("No text available to copy");
      return;
    }
    
    try {
      // Check if the Clipboard API is available
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(type);
        setShowSnackbar(true);
        setTimeout(() => setCopied(null), 2000);
      } else {
        // Fallback method for older browsers
        fallbackCopyTextToClipboard(text, type);
      }
    } catch (err) {
      console.error("Failed to copy text:", err);
      // Try fallback method if clipboard API fails
      fallbackCopyTextToClipboard(text, type);
    }
  };

  const fallbackCopyTextToClipboard = (text: string, type: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      
      // Avoid scrolling to bottom
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopied(type);
        setCopyError(false);
        setShowSnackbar(true);
        setTimeout(() => setCopied(null), 2000);
      } else {
        // Show error message to user
        setCopyError(true);
        setShowSnackbar(true);
        console.error("Fallback copy failed");
      }
    } catch (err) {
      console.error("Fallback copy failed:", err);
      // Show error message to user
      setCopyError(true);
      setShowSnackbar(true);
    }
  };

  const handleSocialShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(videoUrl);
    const text = encodeURIComponent("Check out this awesome video!");

    const shareUrls = {
      whatsapp: `https://wa.me/?text=${text}%20${encodedUrl}`,
      mail: `mailto:?subject=${encodeURIComponent("Check out this video!")}&body=${encodeURIComponent(`Check out this awesome video: ${videoUrl}`)}`,
    };

    window.open(
      shareUrls[platform as keyof typeof shareUrls],
      "_blank",
      "width=600,height=400"
    );
  };

  const embedCode = `<iframe src="${videoUrl}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`;

  const socialOptions = [
    {
      icon: Mail,
      color: "#0078d4",
      platform: "mail",
      label: "Mail (Outlook)",
      action: () => handleSocialShare("mail")
    },
    {
      icon: MessageCircle,
      color: "#25d366",
      platform: "whatsapp",
      label: "WhatsApp",
      action: () => handleSocialShare("whatsapp")
    },
  ];

  const fynancialOptions = [
    {
      icon: Users,
      color: "#4ec48f",
      platform: "team",
      label: "Share with Team",
      action: () => {}
    },
    {
      icon: Building,
      color: "#4ec48f",
      platform: "organization",
      label: "Share with Organization",
      action: () => {}
    },
  ];

  if (!open) return null;

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          border: "2px solid #e5e7eb",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          mb: 3,
        }}
      >
        {/* Header with Toggle Button */}
        <Box
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            p: 3,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#f8fafc",
            borderBottom: isExpanded ? "1px solid #e5e7eb" : "none",
            "&:hover": {
              backgroundColor: "#f1f5f9",
            },
            transition: "background-color 0.2s ease-in-out",
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              color: "#1f2937",
              fontSize: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            Share Your Video
          </Typography>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Box>

        {/* Collapsible Content */}
        <Collapse in={isExpanded}>
          <Box sx={{ p: 4 }}>
            {/* Social Media Icons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                mb: 4,
              }}
            >
              {socialOptions.map(({ icon: Icon, color, platform, label, action }) => (
                <Box
                  key={platform}
                  onClick={action}
                  sx={{
                    width: 48,
                    height: 48,
                    backgroundColor: color,
                    color: "white",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: color,
                      opacity: 0.9,
                      transform: "scale(1.05)",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <Icon size={24} />
                </Box>
              ))}
            </Box>

            {/* URL Copy Section */}
            <Box
              sx={{
                backgroundColor: "#f9fafb",
                border: "2px solid #e5e7eb",
                borderRadius: 2,
                p: 2,
                boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
                mb: 3,
              }}
            >
              <TextField
                fullWidth
                value={videoUrl}
                variant="outlined"
                size="medium"
                InputProps={{
                  readOnly: true,
                  sx: {
                    backgroundColor: "white",
                    "& .MuiOutlinedInput-input": {
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#d1d5db",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#9ca3af",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#3b82f6",
                      borderWidth: 2,
                    },
                  },
                }}
                onClick={() => handleCopy(videoUrl, "link")}
              />
            </Box>

            {/* Copy Buttons */}
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <Button
                onClick={() => handleCopy(videoUrl, "link")}
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: copied === "link" ? "#10b981" : "#4ec48f",
                  color: "white",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 1.5,
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: copied === "link" ? "#059669" : "#3db37f",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
                startIcon={<Copy size={18} />}
              >
                <Fade in={copied !== "link"} timeout={200}>
                  <span
                    style={{
                      position: copied === "link" ? "absolute" : "static",
                      opacity: copied === "link" ? 0 : 1,
                    }}
                  >
                    Copy Link
                  </span>
                </Fade>
                <Fade in={copied === "link"} timeout={200}>
                  <span
                    style={{
                      position: copied !== "link" ? "absolute" : "static",
                      opacity: copied !== "link" ? 0 : 1,
                    }}
                  >
                    Copied!
                  </span>
                </Fade>
              </Button>

              <Button
                onClick={() => handleCopy(embedCode, "embed")}
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: copied === "embed" ? "#10b981" : "#4ec48f",
                  color: "white",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 1.5,
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: copied === "embed" ? "#059669" : "#3db37f",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
                startIcon={<Copy size={18} />}
              >
                <Fade in={copied !== "embed"} timeout={200}>
                  <span
                    style={{
                      position: copied === "embed" ? "absolute" : "static",
                      opacity: copied === "embed" ? 0 : 1,
                    }}
                  >
                    Copy Embed Code
                  </span>
                </Fade>
                <Fade in={copied === "embed"} timeout={200}>
                  <span
                    style={{
                      position: copied !== "embed" ? "absolute" : "static",
                      opacity: copied !== "embed" ? 0 : 1,
                    }}
                  >
                    Copied!
                  </span>
                </Fade>
              </Button>
            </Box>

            {/* Embed Code Preview */}
            <Box
              sx={{
                backgroundColor: "#f8fafc",
                border: "2px solid #e2e8f0",
                borderRadius: 2,
                p: 3,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: "#374151",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                Embed Code Preview
              </Typography>
              
              <Box
                sx={{
                  backgroundColor: "white",
                  border: "1px solid #d1d5db",
                  borderRadius: 1,
                  p: 2,
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                  color: "#374151",
                  overflow: "auto",
                  maxHeight: "120px",
                  "&::-webkit-scrollbar": {
                    width: "4px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#f1f5f9",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#cbd5e1",
                    borderRadius: "2px",
                  },
                }}
              >
                {embedCode}
              </Box>
              
              <Typography
                variant="caption"
                sx={{
                  color: "#6b7280",
                  mt: 1,
                  display: "block",
                  fontStyle: "italic",
                }}
              >
                This embed code can be used on websites, blogs, or any platform that supports iframe embedding.
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </Box>

      {/* Fynancial Share Section */}
      <Box
        sx={{
          backgroundColor: "white",
          border: "2px solid #4ec48f",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          mb: 3,
          position: "relative",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#f0fdf4",
            borderBottom: "1px solid #4ec48f",
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              color: "#166534",
              fontSize: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Lock size={20} />
            Share with Fynancial
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#6b7280",
              fontStyle: "italic",
              backgroundColor: "rgba(78, 196, 143, 0.1)",
              px: 2,
              py: 0.5,
              borderRadius: 1,
              border: "1px solid rgba(78, 196, 143, 0.2)",
            }}
          >
            Enterprise Feature
          </Typography>
        </Box>

        {/* Content with Lock Overlay */}
        <Box sx={{ p: 4, position: "relative" }}>
          {/* Background Sharing Options */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              mb: 4,
              opacity: 0.3,
            }}
          >
            {fynancialOptions.map(({ icon: Icon, color, platform, label, action }) => (
              <Box
                key={platform}
                sx={{
                  width: 56,
                  height: 56,
                  backgroundColor: color,
                  color: "white",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <Icon size={28} />
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    bottom: "-20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#6b7280",
                    fontSize: "0.75rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Lock Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0 0 12px 12px",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                p: 3,
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.1)",
                border: "2px solid #4ec48f",
                maxWidth: "300px",
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  backgroundColor: "#4ec48f",
                  color: "white",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                  boxShadow: "0 4px 12px rgba(78, 196, 143, 0.3)",
                }}
              >
                <Lock size={32} />
              </Box>
              
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#166534",
                  mb: 1,
                }}
              >
                Feature Locked
              </Typography>
              
              <Typography
                variant="body2"
                sx={{
                  color: "#6b7280",
                  mb: 3,
                  lineHeight: 1.5,
                }}
              >
                Contact your administrator to enable Fynancial sharing capabilities
              </Typography>

              <Button
                variant="outlined"
                sx={{
                  borderColor: "#4ec48f",
                  color: "#4ec48f",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  "&:hover": {
                    borderColor: "#3db37f",
                    backgroundColor: "rgba(78, 196, 143, 0.05)",
                  },
                }}
              >
                Contact Admin
              </Button>
            </Box>
          </Box>

          {/* Enterprise Features Info */}
          <Box
            sx={{
              backgroundColor: "#f0fdf4",
              border: "1px solid #4ec48f",
              borderRadius: 2,
              p: 3,
              mt: 3,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: "#166534",
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Building size={16} />
              Enterprise Features
            </Typography>
            
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#374151",
                  fontSize: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box sx={{ width: 6, height: 6, backgroundColor: "#4ec48f", borderRadius: "50%" }} />
                Team sharing
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#374151",
                  fontSize: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box sx={{ width: 6, height: 6, backgroundColor: "#4ec48f", borderRadius: "50%" }} />
                Custom permissions
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#374151",
                  fontSize: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box sx={{ width: 6, height: 6, backgroundColor: "#4ec48f", borderRadius: "50%" }} />
                Engagement tracking
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#374151",
                  fontSize: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box sx={{ width: 6, height: 6, backgroundColor: "#4ec48f", borderRadius: "50%" }} />
                Workflow integration
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          setShowSnackbar(false);
          setCopyError(false);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setShowSnackbar(false);
            setCopyError(false);
          }}
          severity={copyError ? "error" : "success"}
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {copyError ? "Failed to copy. Please try again or copy manually." : `${copied === "embed" ? "Embed code" : "URL"} copied to clipboard!`}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShareVideoDialog;
