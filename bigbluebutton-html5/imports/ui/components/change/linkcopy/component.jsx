import React from "react";
import LinkCopyComponent from './styles';
// import { toast } from 'react-toastify';
// import { useTranslation } from 'react-i18next';

export default function LinkCopyContainer() {
  // const { t } = useTranslation();
  
  const copyInvite = () => {
    navigator.clipboard.writeText(`${window.location}`);
    // toast.success(t('toast.success.room.copied_meeting_url'));
    alert('This web page link is copied!');
  }
	
	return (
    <div style={{ position : "relative" }}>
      <LinkCopyComponent onClick={() => copyInvite()} />
    </div>
	);
};